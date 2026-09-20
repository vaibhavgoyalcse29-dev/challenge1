import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Calendar, 
  Sparkles, 
  ShoppingBag, 
  MapPin, 
  Film, 
  HeartPulse, 
  Heart, 
  Trophy, 
  Coins, 
  ArrowUpDown,
  LayoutGrid,
  Scroll,
  RotateCcw
} from 'lucide-react';
import ReceiptCard from './ReceiptCard';
import ScrollReveal from '../ScrollReveal';
import { formatCurrency } from '../utils/formatters';
import { playClickSound } from '../utils/soundEffects';

const FACETS = [
  'All',
  'Purchases',
  'Places',
  'Entertainment',
  'Health & Care',
  'Family',
  'Events',
  'Career'
];

const YEARS = ['All', '2015', '2016', '2017', '2018'];

const MOODS = [
  'All',
  'Late Night Hustle',
  'Caregiver',
  'Victory',
  'Devotion',
  'Street Comfort',
  'Growth'
];

export default function ThermalRollView({ receipts = [], onInspect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacet, setSelectedFacet] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMood, setSelectedMood] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' or 'tape'
  const [page, setPage] = useState(1);
  const pageSize = 24;

  // Filter & Sort Logic
  const filteredReceipts = useMemo(() => {
    return receipts.filter((r) => {
      // Facet filter
      if (selectedFacet !== 'All' && r.facet !== selectedFacet) return false;

      // Year filter
      if (selectedYear !== 'All' && String(r.year) !== selectedYear) return false;

      // Mood filter
      if (selectedMood !== 'All' && r.mood !== selectedMood) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchNote = (r.note || '').toLowerCase().includes(query);
        const matchCat = (r.category || '').toLowerCase().includes(query);
        const matchSub = (r.subcategory || '').toLowerCase().includes(query);
        const matchSong = (r.connectedSong?.track || '').toLowerCase().includes(query);
        const matchPlace = (r.connectedLocation?.name || '').toLowerCase().includes(query);
        if (!matchNote && !matchCat && !matchSub && !matchSong && !matchPlace) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'highest') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'lowest') return (a.amount || 0) - (b.amount || 0);
      return 0;
    });
  }, [receipts, selectedFacet, selectedYear, selectedMood, searchTerm, sortBy]);

  // Aggregate stats for filtered view
  const { totalFilteredAmount, avgAmount } = useMemo(() => {
    let sum = 0;
    filteredReceipts.forEach(r => sum += (r.amount || 0));
    return {
      totalFilteredAmount: sum,
      avgAmount: filteredReceipts.length ? sum / filteredReceipts.length : 0
    };
  }, [filteredReceipts]);

  // Paginated slice
  const paginatedReceipts = useMemo(() => {
    return filteredReceipts.slice(0, page * pageSize);
  }, [filteredReceipts, page]);

  const handleResetFilters = () => {
    playClickSound();
    setSearchTerm('');
    setSelectedFacet('All');
    setSelectedYear('All');
    setSelectedMood('All');
    setSortBy('newest');
    setPage(1);
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      {/* Search & Control Command Center */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl space-y-4">
        {/* Top Search & Layout Toggle Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search receipts, cutting chai, marathon, eye clinic, songs, Vadodara..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  playClickSound();
                  setSortBy(e.target.value);
                }}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="newest">📅 Newest Date</option>
                <option value="oldest">⏳ Oldest Date</option>
                <option value="highest">💎 Highest Amount</option>
                <option value="lowest">🪙 Lowest Amount</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-0.5 flex items-center">
              <button
                onClick={() => {
                  playClickSound();
                  setViewLayout('grid');
                }}
                title="Grid Layout"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewLayout === 'grid' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setViewLayout('tape');
                }}
                title="Continuous Thermal Tape Spool"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewLayout === 'tape' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scroll className="w-4 h-4" />
              </button>
            </div>

            {(selectedFacet !== 'All' || selectedYear !== 'All' || selectedMood !== 'All' || searchTerm) && (
              <button
                onClick={handleResetFilters}
                title="Reset All Filters"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills: Facets */}
        <div className="space-y-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400" />
              Activity Facet (9 Types):
            </span>
            <span>{filteredReceipts.length} matches</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {FACETS.map((facet) => {
              const active = selectedFacet === facet;
              return (
                <button
                  key={facet}
                  onClick={() => {
                    playClickSound();
                    setSelectedFacet(facet);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  {facet}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Pills: Years & Moods */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" /> Year:
            </span>
            <div className="flex items-center gap-1">
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    playClickSound();
                    setSelectedYear(yr);
                    setPage(1);
                  }}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-all ${
                    selectedYear === yr
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> Mood:
            </span>
            <div className="flex items-center gap-1">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    playClickSound();
                    setSelectedMood(m);
                    setPage(1);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-all ${
                    selectedMood === m
                      ? 'bg-purple-500 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Filtered Moments
          </span>
          <span className="text-lg font-bold font-mono text-white">
            {filteredReceipts.length} <span className="text-xs text-slate-500 font-sans">receipts</span>
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Volume In Scope
          </span>
          <span className="text-lg font-bold font-mono text-amber-400">
            {formatCurrency(totalFilteredAmount)}
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Average Per Moment
          </span>
          <span className="text-lg font-bold font-mono text-emerald-400">
            {formatCurrency(avgAmount)}
          </span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Current Scope
          </span>
          <span className="text-sm font-semibold text-purple-300 truncate block mt-0.5">
            {selectedFacet} • {selectedYear} • {selectedMood}
          </span>
        </div>
      </div>

      {/* Receipt Output Container */}
      {filteredReceipts.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 font-mono text-sm mb-2">
            No receipts matched this query.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewLayout === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedReceipts.map((receipt, index) => (
            <ScrollReveal key={receipt.id} index={index % 12}>
              <ReceiptCard
                receipt={receipt}
                onInspect={onInspect}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Continuous Thermal Tape Spool Mode */
        <div className="max-w-md mx-auto relative bg-[#faf7f2] text-zinc-900 rounded-t-sm shadow-2xl border border-[#e2ddd3] p-6 font-mono-receipt space-y-6">
          {/* Top Tape Header */}
          <div className="text-center border-b-2 border-dashed border-zinc-500 pb-4">
            <h2 className="text-lg font-black tracking-widest uppercase">
              RECEIPTIFY TAPE SPOOL
            </h2>
            <p className="text-[11px] text-zinc-600">
              UNBROKEN CHRONOLOGICAL FEED
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              TERMINAL #004 • HACKATHON LIVE
            </p>
          </div>

          {/* Continuous list */}
          <div className="space-y-4 divide-y divide-dashed divide-zinc-400">
            {paginatedReceipts.map((receipt) => (
              <div 
                key={receipt.id}
                onClick={() => onInspect(receipt)}
                className="pt-4 first:pt-0 cursor-pointer group hover:bg-amber-500/10 p-2 rounded transition-colors"
              >
                <div className="flex justify-between items-start text-xs font-bold">
                  <span className="text-zinc-900 group-hover:text-amber-900">
                    {receipt.note || receipt.category}
                  </span>
                  <span className="font-extrabold text-zinc-950 whitespace-nowrap">
                    {formatCurrency(receipt.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                  <span>{receipt.facet} • {receipt.mode}</span>
                  <span>{receipt.displayDate}</span>
                </div>
                {receipt.connectedSong && (
                  <div className="text-[10px] text-amber-800 font-sans mt-0.5 truncate">
                    🎵 {receipt.connectedSong.track}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tape Serrated Bottom */}
          <div className="serrated-edge-bottom w-full h-[12px] -mb-6" />
        </div>
      )}

      {/* Load More Button */}
      {paginatedReceipts.length < filteredReceipts.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => {
              playClickSound();
              setPage(prev => prev + 1);
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all border border-slate-700 hover:border-amber-500/50 shadow-lg"
          >
            Load More Receipts ({filteredReceipts.length - paginatedReceipts.length} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
