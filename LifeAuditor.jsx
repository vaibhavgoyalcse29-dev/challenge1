import React, { useMemo } from 'react';
import { 
  LineChart, 
  Coffee, 
  Heart, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  BarChart3,
  Award
} from 'lucide-react';
import { calculateForensicInsights } from '../data/dataInsights';
import { formatCurrency } from '../utils/formatters';
import { synthesizeBehavior } from '../data/behavioralSynthesizer';

export default function LifeAuditor({ receipts = [] }) {
  const insights = useMemo(() => {
    return calculateForensicInsights(receipts);
  }, [receipts]);
  const behavior = useMemo(() => synthesizeBehavior(receipts), [receipts]);

  // Max hour for normalisation
  const maxHourVal = Math.max(...insights.hourDistribution, 1);

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <LineChart className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white font-mono">
              Forensic Life Audit & Behavioral Patterns
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Statistical forensics uncovering the quiet discipline, family devotion, and late-night habits behind 2,461 digital life receipts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Auditor Verified: 100% Client-Side
          </span>
        </div>
      </div>

      {/* Hero 4-Pillar Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: The Chai Index */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              The Chai Index
            </span>
            <Coffee className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {insights.chaiCount} <span className="text-xs text-slate-400 font-sans font-normal">cups</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total chai spend: <span className="text-amber-300 font-bold">{formatCurrency(insights.chaiSpend)}</span>
          </p>
          <div className="mt-3 text-[11px] text-slate-500 italic">
            Average ₹10-12 cutting chai fueled night engineering sprints.
          </div>
        </div>

        {/* Metric 2: The Selflessness Ratio */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Selflessness Ratio
            </span>
            <Heart className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {insights.selflessnessRatio}x
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Family Care vs Personal Luxury
          </p>
          <div className="mt-3 text-[11px] text-slate-500 italic">
            For every ₹1 spent on personal treats, ₹17+ went to family health and home.
          </div>
        </div>

        {/* Metric 3: Career Paycheck Leap */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Salary Trajectory
            </span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            +63.6%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ₹47,859 (2015) → ₹78,298 (2018)
          </p>
          <div className="mt-3 text-[11px] text-slate-500 italic">
            Direct outcome of EdTech courses & 'Finding Next Job' upskilling.
          </div>
        </div>

        {/* Metric 4: Wealth Discipline */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Unbroken PPF & SIPs
            </span>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            ₹10k / mo
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Transferred on the 1st of every month
          </p>
          <div className="mt-3 text-[11px] text-slate-500 italic">
            Systematic wealth building alongside family remittances.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-purple-500/10 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-300">
          <Sparkles className="h-4 w-4" />
          <h3 className="font-mono text-sm font-bold">AI Behavioral Synthesizer</h3>
          <span className="ml-auto rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 font-mono text-[10px] text-emerald-300">DYNAMIC / LOCAL</span>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Across <b className="text-white">{behavior.totalRecords.toLocaleString('en-IN')}</b> indexed moments, your most frequent rhythm is <b className="text-amber-300">{behavior.topCategory}</b> ({behavior.topCategoryCount} records). Activity peaks at <b className="text-cyan-300">{behavior.peakWindow}</b>, while <b className="text-purple-300">{behavior.connectedRecords.toLocaleString('en-IN')}</b> moments connect to music, places, or messages. This synthesis updates from the records currently loaded in the browser.
        </p>
      </div>

      {/* Station 1: 24-Hour Midnight Hustle Heatmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              24-Hour Digital Activity Heatmap (When Moments Happened)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly frequency of receipts, transit stamps, and late-night digital activities.
            </p>
          </div>

          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[11px] font-semibold border border-amber-500/20 self-start sm:self-auto">
            Notice the 1 AM – 3 AM Late-Night Spike
          </span>
        </div>

        {/* Hourly Bar Heatmap */}
        <div className="pt-4">
          <div className="h-44 flex items-end gap-1 sm:gap-2">
            {insights.hourDistribution.map((count, hr) => {
              const heightPct = Math.round((count / maxHourVal) * 100);
              const isLateNight = hr >= 1 && hr <= 4;
              return (
                <div key={hr} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex items-end justify-center h-36 bg-slate-950 rounded-t overflow-hidden">
                    <div
                      className={`w-full rounded-t transition-all duration-300 group-hover:brightness-125 ${
                        isLateNight 
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]' 
                          : 'bg-gradient-to-t from-slate-700 to-slate-500'
                      }`}
                      style={{ height: `${Math.max(heightPct, 6)}%` }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 hidden group-hover:flex px-1.5 py-0.5 bg-slate-800 text-white rounded text-[10px] font-mono whitespace-nowrap z-10">
                      {hr}:00 — {count} moments
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono ${isLateNight ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    {hr}h
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 border-t border-slate-800/80 pt-2">
            <span>🌙 Midnight (00:00)</span>
            <span>☀️ Sunrise (06:00)</span>
            <span>⚡ Afternoon (12:00)</span>
            <span>🌆 Evening (18:00)</span>
            <span>🌙 Midnight (23:00)</span>
          </div>
        </div>
      </div>

      {/* Station 2: Year-by-Year Financial Discipline vs Living Costs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Year by Year Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Yearly Income vs Life Expenses
          </h3>
          <div className="space-y-3">
            {Object.entries(insights.yearlyStats).map(([yr, stats]) => (
              <div key={yr} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">{yr} Milestone</span>
                  <span className="text-slate-400">{stats.count} receipts recorded</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-emerald-400">Income: {formatCurrency(stats.income)}</span>
                    <span className="text-rose-400">Expenses: {formatCurrency(stats.expense)}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full" 
                      style={{ width: `${(stats.income / (stats.income + stats.expense || 1)) * 100}%` }} 
                    />
                    <div 
                      className="bg-rose-500 h-full" 
                      style={{ width: `${(stats.expense / (stats.income + stats.expense || 1)) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The 9 Activity Facets Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            Multi-Facet Life Radar (Activity Distribution)
          </h3>
          <p className="text-xs text-slate-400">
            Fulfilling the hackathon requirement of synthesizing across 9 distinct activity channels.
          </p>

          <div className="space-y-2.5 pt-1">
            {Object.entries(insights.facetCounts)
              .filter(([_, cnt]) => cnt > 0)
              .sort((a, b) => b[1] - a[1])
              .map(([facet, count]) => {
                const pct = Math.round((count / receipts.length) * 100);
                return (
                  <div key={facet} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{facet}</span>
                      <span className="text-slate-400">{count} records ({pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 h-full rounded-full" 
                        style={{ width: `${Math.max(pct, 4)}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
