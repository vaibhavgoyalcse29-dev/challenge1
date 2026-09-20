import React from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Film, 
  HeartPulse, 
  Heart, 
  Trophy, 
  Coins, 
  Sparkles, 
  Receipt, 
  Music, 
  ExternalLink 
} from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { playThermalPrintSound } from '../utils/soundEffects';

const FACET_ICONS = {
  Purchases: ShoppingBag,
  Places: MapPin,
  Entertainment: Film,
  'Health & Care': HeartPulse,
  Family: Heart,
  Events: Trophy,
  Career: Coins
};

export default function ReceiptCard({ receipt, onInspect }) {
  const Icon = FACET_ICONS[receipt.facet] || Receipt;

  const handleClick = () => {
    playThermalPrintSound();
    onInspect(receipt);
  };

  const getStampClasses = (stamp) => {
    if (!stamp) return '';
    if (stamp.includes('PAYDAY') || stamp.includes('MARATHONER')) return 'stamp-green';
    if (stamp.includes('FAMILY') || stamp.includes('DUTY')) return 'stamp-red';
    if (stamp.includes('LEVEL') || stamp.includes('CORE')) return 'stamp-purple';
    return 'stamp-amber';
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Physical Thermal Paper Shell */}
      <div className="relative bg-[#faf7f2] text-zinc-800 rounded-t-sm shadow-md border border-[#e5dfd5] p-4 flex flex-col justify-between font-mono-receipt select-none overflow-hidden min-h-[290px]">
        {/* Paper subtle grain overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#dcd5c9_1px,transparent_0)] bg-[size:12px_12px] opacity-40 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 border-b border-dashed border-zinc-400/80 pb-2 mb-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
            <span className="tracking-widest uppercase font-bold text-zinc-700 flex items-center gap-1">
              <Icon className="w-3 h-3 text-amber-700" />
              {receipt.facet}
            </span>
            <span>#{receipt.id}</span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm text-zinc-900 leading-snug line-clamp-2">
              {receipt.note || receipt.category}
            </h3>
            <span className={`text-base font-extrabold whitespace-nowrap ${
              receipt.type === 'income' ? 'text-emerald-700' : 'text-zinc-900'
            }`}>
              {receipt.type === 'income' ? '+' : ''}{formatCurrency(receipt.amount)}
            </span>
          </div>
        </div>

        {/* Stamp Badge (if any) */}
        {receipt.stamp && (
          <div className="relative z-10 my-1 flex justify-center">
            <span className={`stamp text-[10px] tracking-wider font-mono ${getStampClasses(receipt.stamp)}`}>
              ★ {receipt.stamp} ★
            </span>
          </div>
        )}

        {/* Middle Metadata */}
        <div className="relative z-10 space-y-1.5 text-[11px] text-zinc-600 my-2">
          <div className="flex justify-between">
            <span className="text-zinc-500">CATEGORY:</span>
            <span className="font-semibold text-zinc-800 uppercase">{receipt.category}</span>
          </div>
          {receipt.subcategory && (
            <div className="flex justify-between">
              <span className="text-zinc-500">SUB:</span>
              <span className="text-zinc-700">{receipt.subcategory}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-zinc-500">MODE:</span>
            <span className="text-zinc-700">{receipt.mode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">TIMESTAMP:</span>
            <span>{formatDate(receipt.date)} {formatTime(receipt.date)}</span>
          </div>
        </div>

        {/* Connected Song Ribbon */}
        {receipt.connectedSong && (
          <div className="relative z-10 bg-zinc-200/70 rounded p-1.5 mt-1 border border-zinc-300 text-[10px] flex items-center gap-1.5 text-zinc-700">
            <Music className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate font-sans font-medium">
              {receipt.connectedSong.track} • {receipt.connectedSong.artist}
            </span>
          </div>
        )}

        {/* Bottom Barcode & Footer */}
        <div className="relative z-10 mt-3 pt-2 border-t border-dashed border-zinc-400/80 flex items-center justify-between">
          {/* Simulated Barcode Stripes */}
          <div className="flex items-center gap-[2px] h-6 w-32 opacity-80 overflow-hidden">
            {[4, 2, 6, 1, 3, 5, 2, 4, 1, 6, 3, 2, 5, 1, 4, 2, 6, 2, 3, 5, 1, 4].map((w, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-800 h-full" 
                style={{ width: `${w}px` }} 
              />
            ))}
          </div>

          <span className="text-[10px] font-sans font-semibold text-amber-800 group-hover:text-amber-950 flex items-center gap-0.5">
            Dossier <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* Realistic Serrated Zig-Zag Bottom Edge */}
      <div className="serrated-edge-bottom w-full h-[10px]" />
    </div>
  );
}
