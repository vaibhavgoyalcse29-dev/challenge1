import React from 'react';
import { 
  X, 
  Music, 
  MapPin, 
  Camera, 
  MessageSquare, 
  Search, 
  Calendar, 
  Clock, 
  CreditCard, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { playPaperTearSound } from '../utils/soundEffects';

export default function ReceiptModal({ receipt, onClose, onNavigateThread }) {
  if (!receipt) return null;

  const handleClose = () => {
    playPaperTearSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold">
              Receipt Forensic Dossier #{receipt.id}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Receipt Summary Card */}
          <div className="bg-[#faf7f2] text-zinc-900 p-5 rounded-xl border border-[#e5dfd5] font-mono-receipt shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-zinc-400 pb-3 mb-3">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-bold block">
                  TRANSACTION ITEM
                </span>
                <h2 className="text-xl font-bold text-zinc-950">
                  {receipt.note || receipt.category}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-600 mt-0.5">
                  <span className="bg-zinc-200 px-1.5 py-0.5 rounded text-[11px] font-sans font-semibold">
                    {receipt.category}
                  </span>
                  {receipt.subcategory && <span>• {receipt.subcategory}</span>}
                </div>
              </div>

              <div className="text-right sm:self-center">
                <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-bold block">
                  AMOUNT RECORDED
                </span>
                <span className={`text-2xl font-black ${
                  receipt.type === 'income' ? 'text-emerald-700' : 'text-zinc-900'
                }`}>
                  {receipt.type === 'income' ? '+' : ''}{formatCurrency(receipt.amount)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-zinc-700">
              <div>
                <span className="text-zinc-500 block text-[10px]">PAYMENT MODE</span>
                <span className="font-semibold">{receipt.mode}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">DATE</span>
                <span className="font-semibold">{formatDate(receipt.date)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">LOCAL TIME</span>
                <span className="font-semibold">{formatTime(receipt.date)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">EMOTIONAL MOOD</span>
                <span className="font-semibold text-amber-800">{receipt.mood}</span>
              </div>
            </div>

            {receipt.stamp && (
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-400 flex items-center justify-between">
                <span className="text-[11px] text-zinc-600 font-sans italic">
                  Auditor's Verified Stamp:
                </span>
                <span className="stamp stamp-amber text-xs">
                  {receipt.stamp}
                </span>
              </div>
            )}
          </div>

          {/* Connected Multi-Facet Grid (The 9 Hackathon Activity Types) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Connected Digital Life Facets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 1. Music (Spotify track) */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold block">
                    1. Music Streaming At That Hour
                  </span>
                  <p className="text-xs font-bold text-white truncate mt-0.5">
                    {receipt.connectedSong?.track || 'Midnight City'}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {receipt.connectedSong?.artist} • {receipt.connectedSong?.album}
                  </p>
                </div>
              </div>

              {/* 2. Places (Transit / Coordinates) */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                    2. Location & Transit Node
                  </span>
                  <p className="text-xs font-bold text-white truncate mt-0.5">
                    {receipt.connectedLocation?.name || 'Central Railway Line'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {receipt.connectedLocation?.city || 'Mumbai'} • [{receipt.connectedLocation?.coords?.join(', ') || '19.07, 72.87'}]
                  </p>
                </div>
              </div>

              {/* 3. Messages */}
              {receipt.connectedMessage && (
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold block">
                      3. Preserved Message Fragment
                    </span>
                    <p className="text-xs text-slate-200 italic mt-0.5">
                      "{receipt.connectedMessage}"
                    </p>
                  </div>
                </div>
              )}

              {/* 4. Searches */}
              {receipt.connectedSearch && (
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold block">
                      4. Correlated Google Search
                    </span>
                    <p className="text-xs font-mono text-blue-300 mt-0.5">
                      🔍 "{receipt.connectedSearch}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Photo Snapshot (Polaroid frame if present) */}
          {receipt.connectedPhoto && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-lg border-2 border-white flex items-center justify-center text-zinc-400 shrink-0 shadow-md transform -rotate-3">
                <Camera className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">
                  5. Connected Photo Snapshot
                </span>
                <p className="text-xs text-slate-200 mt-0.5">
                  {receipt.connectedPhoto.caption}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[10px]">
                  Tag: #{receipt.connectedPhoto.tag}
                </span>
              </div>
            </div>
          )}

          {/* Forensic Narrative Note */}
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500 p-4 rounded-r-xl">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
              Forensic Auditor Story Note
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              This receipt represents a critical micro-moment in the user's timeline. It captures the balance between personal austerity and family support during the {receipt.year} transition period. Notice the temporal alignment between the purchase and the reflective music track playing in the background.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            RECEIPTIFY Forensic Ledger Engine
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
