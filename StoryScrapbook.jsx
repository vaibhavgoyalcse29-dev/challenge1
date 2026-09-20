import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Camera, 
  Quote, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { formatCurrency } from '../utils/formatters';
import { playClickSound, playBellChime } from '../utils/soundEffects';

export default function StoryScrapbook({ onInspectReceipt }) {
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const chapter = STORY_CHAPTERS[currentActIndex];

  const handleNextAct = () => {
    playClickSound();
    if (currentActIndex < STORY_CHAPTERS.length - 1) {
      setCurrentActIndex(prev => prev + 1);
    } else {
      // Completed all 4 acts! Launch celebratory confetti
      playBellChime();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrevAct = () => {
    playClickSound();
    if (currentActIndex > 0) {
      setCurrentActIndex(prev => prev - 1);
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      {/* Chapter Navigator Ribbon */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-mono">
                The 4-Act Life Scrapbook
              </h2>
              <p className="text-xs text-slate-400">
                A true human story decoded from thousands of daily transactions & late-night tracks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevAct}
              disabled={currentActIndex === 0}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-amber-400 font-bold px-2">
              {currentActIndex + 1} / {STORY_CHAPTERS.length}
            </span>
            <button
              onClick={handleNextAct}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Act Progress Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {STORY_CHAPTERS.map((act, idx) => {
            const isCurrent = idx === currentActIndex;
            const isCompleted = idx < currentActIndex;
            return (
              <button
                key={act.id}
                onClick={() => {
                  playClickSound();
                  setCurrentActIndex(idx);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'bg-slate-950 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/60'
                }`}
              >
                {/* Active Indicator Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all"
                  style={{ 
                    backgroundColor: isCurrent ? act.color : isCompleted ? '#10b981' : 'transparent' 
                  }}
                />

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>{act.act}</span>
                  <span>{act.timeframe}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate">
                  {act.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Content Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Glow Accent */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: chapter.color }}
        />

        {/* Act Header Banner */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span 
              className="px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase tracking-wider text-slate-950"
              style={{ backgroundColor: chapter.color }}
            >
              {chapter.act} • {chapter.timeframe}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs">
              Theme: {chapter.theme}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {chapter.title}
          </h2>
          <p className="text-sm sm:text-base text-amber-400/90 font-medium mt-1">
            {chapter.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-3xl">
            {chapter.summary}
          </p>

          {/* Quote Callout */}
          <div className="mt-5 bg-slate-950/80 border-l-4 rounded-r-xl p-4 flex items-start gap-3"
               style={{ borderLeftColor: chapter.color }}>
            <Quote className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-sm italic text-slate-200 leading-relaxed">
              "{chapter.quote}"
            </p>
          </div>
        </div>

        {/* Forensic Chapter Stats Bar */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Act {currentActIndex + 1} Forensic Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(chapter.stats).map(([k, val]) => (
              <div key={k} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block capitalize">
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Moments in this Act */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Pivotal Story Moments Discovered In This Chapter
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chapter.milestones.map((m, idx) => (
              <div 
                key={idx}
                className="bg-[#faf7f2] text-zinc-900 rounded-xl p-4 border border-[#e2ddd3] font-mono-receipt shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-dashed border-zinc-400 pb-1.5 mb-2">
                    <span className="font-bold uppercase tracking-wider text-zinc-800">{m.facet}</span>
                    <span>{m.date}</span>
                  </div>

                  <h4 className="text-sm font-black text-zinc-950 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-zinc-700 font-sans mt-1.5 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-dashed border-zinc-400 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-zinc-950">
                    {formatCurrency(m.amount)}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-amber-800 uppercase">
                    Verified Receipt
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Act Navigation */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrevAct}
            disabled={currentActIndex === 0}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Chapter
          </button>

          <button
            onClick={handleNextAct}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            {currentActIndex < STORY_CHAPTERS.length - 1 ? (
              <>Continue to Act {currentActIndex + 2} <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Celebrate Story Completion 🎉</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
