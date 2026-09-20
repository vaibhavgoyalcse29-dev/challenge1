import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Award,
  Flame
} from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { formatCurrency, formatDate } from '../utils/formatters';
import { playThermalPrintSound, playPaperTearSound, playBellChime } from '../utils/soundEffects';

export default function PrintableReceipt({ receipts = [] }) {
  const [scope, setScope] = useState('full'); // 'full', 'act1', 'act2', 'act3', 'act4'
  const [stampStyle, setStampStyle] = useState('PAID IN SWEAT');
  const [isExporting, setIsExporting] = useState(false);
  const receiptRef = useRef(null);

  // Filter receipts for the printed roll
  const printedItems = React.useMemo(() => {
    let list = receipts;
    if (scope === 'act1') list = receipts.filter(r => r.year <= 2016);
    else if (scope === 'act2') list = receipts.filter(r => r.year === 2017);
    else if (scope === 'act3') list = receipts.filter(r => r.year === 2018 && (r.amount > 500 || r.facet === 'Career'));
    else if (scope === 'act4') list = receipts.filter(r => (r.note || '').toLowerCase().includes('marathon') || r.category === 'Self-development' || (r.note || '').toLowerCase().includes('shoes'));

    // Pick top representative moments for clean print aesthetic
    return list.slice(0, 18);
  }, [receipts, scope]);

  const totalSum = printedItems.reduce((acc, r) => acc + (r.amount || 0), 0);

  const handleDownloadPNG = async () => {
    if (!receiptRef.current) return;
    playPaperTearSound();
    setIsExporting(true);

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#0f172a',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `RECEIPTIFY_Life_Receipt_${scope}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      playBellChime();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    playThermalPrintSound();
    window.print();
  };

  return (
    <section className="printable-receipt-view space-y-6 animate-in fade-in duration-300">
      {/* Configuration Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Printer className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white font-mono">
              Thermal Life Receipt Generator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate an authentic physical-style supermarket/ATM thermal receipt of your life chapters to print or save.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Scope selection */}
          <select
            value={scope}
            onChange={(e) => {
              playThermalPrintSound();
              setScope(e.target.value);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="full">📜 Full Journey (Curated)</option>
            <option value="act1">Act I: Vadodara Hustle</option>
            <option value="act2">Act II: Quiet Caregiver</option>
            <option value="act3">Act III: Career Leap</option>
            <option value="act4">Act IV: Marathon Win</option>
          </select>

          {/* Stamp selector */}
          <select
            value={stampStyle}
            onChange={(e) => setStampStyle(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="PAID IN SWEAT">★ PAID IN SWEAT</option>
            <option value="DUTIFUL SON">★ DUTIFUL SON</option>
            <option value="MARATHON FINISHER">★ MARATHON FINISHER</option>
            <option value="CORE MEMORIES">★ CORE MEMORIES</option>
          </select>

          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Download PNG'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Printable Thermal Receipt Canvas Display */}
      <div className="flex justify-center p-4">
        <div 
          ref={receiptRef}
          className="w-full max-w-md bg-[#faf7f2] text-zinc-900 rounded-t-sm shadow-2xl border border-[#e2ddd3] p-6 sm:p-8 font-mono-receipt space-y-4 relative overflow-hidden select-none"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#dcd5c9_1px,transparent_0)] bg-[size:14px_14px] opacity-35 pointer-events-none" />

          {/* Receipt Store Header */}
          <div className="text-center border-b-2 border-dashed border-zinc-500 pb-4 space-y-1 relative z-10">
            <div className="text-3xl mb-1">🧾</div>
            <h1 className="text-xl font-black tracking-widest uppercase text-zinc-950">
              RECEIPTIFY STORE #04
            </h1>
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
              OFFICIAL LIFE AUDITOR LEDGER
            </p>
            <p className="text-[10px] text-zinc-500">
              TERMINAL: MUMBAI_CENTRAL • CASHIER: DESTINY
            </p>
            <p className="text-[10px] text-zinc-500">
              DATE: 2015-01-01 TO 2018-09-20 • INR
            </p>
          </div>

          {/* Stamp Badge */}
          <div className="relative z-10 flex justify-center py-2">
            <span className="stamp stamp-amber text-xs font-black tracking-widest">
              ★ {stampStyle} ★
            </span>
          </div>

          {/* Itemized Table Header */}
          <div className="relative z-10 border-b border-dashed border-zinc-400 pb-1 text-[11px] font-bold text-zinc-600 flex justify-between uppercase">
            <span>MEMORABLE MOMENT</span>
            <span>AMT (INR)</span>
          </div>

          {/* Itemized Moments List */}
          <div className="relative z-10 space-y-2 text-xs divide-y divide-dotted divide-zinc-300">
            {printedItems.map((item, idx) => (
              <div key={idx} className="pt-2 first:pt-0 flex justify-between items-start gap-2">
                <div>
                  <div className="font-bold text-zinc-900 leading-tight">
                    {item.note || item.category}
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                    <span>{formatDate(item.date)}</span>
                    <span>•</span>
                    <span>{item.facet}</span>
                    {item.connectedSong && (
                      <span className="truncate max-w-[140px] text-zinc-600">
                        • 🎵 {item.connectedSong.track}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-extrabold text-zinc-950 whitespace-nowrap">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* Emotional Subtotal & Tax Calculation */}
          <div className="relative z-10 border-t-2 border-dashed border-zinc-500 pt-4 space-y-1.5 text-xs text-zinc-800">
            <div className="flex justify-between font-bold">
              <span>FINANCIAL SUB-TOTAL:</span>
              <span className="font-extrabold">{formatCurrency(totalSum)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>EMOTIONAL RESILIENCE TAX (0%):</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>CUTTING CHAI CONSUMED:</span>
              <span>148 CUPS</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>FAMILY PROMISE KEPT:</span>
              <span className="font-bold text-emerald-800">100% UNBROKEN</span>
            </div>
            <div className="flex justify-between font-black text-sm pt-2 border-t border-dashed border-zinc-400 text-zinc-950">
              <span>GRAND LIFE TOTAL:</span>
              <span>PRICELESS</span>
            </div>
          </div>

          {/* Barcode & Signature */}
          <div className="relative z-10 border-t-2 border-dashed border-zinc-500 pt-4 text-center space-y-2">
            <div className="flex justify-center items-center gap-[3px] h-10 w-48 mx-auto opacity-85 overflow-hidden">
              {[3, 1, 5, 2, 4, 1, 6, 2, 3, 5, 2, 4, 1, 5, 3, 2, 6, 1, 4, 2, 5, 3].map((w, idx) => (
                <div key={idx} className="bg-zinc-900 h-full" style={{ width: `${w}px` }} />
              ))}
            </div>
            <p className="text-[10px] tracking-widest text-zinc-600 uppercase font-bold">
              * AUTHENTICATED BY RECEIPTIFY *
            </p>
            <p className="text-[9px] text-zinc-500 italic">
              "Your digital life is made up of hundreds of tiny moments. Individually they mean little. Together, they are unforgettable."
            </p>
          </div>

          {/* Realistic Serrated Bottom Edge */}
          <div className="serrated-edge-bottom w-full h-[12px] -mb-8 sm:-mb-10" />
        </div>
      </div>
    </section>
  );
}
