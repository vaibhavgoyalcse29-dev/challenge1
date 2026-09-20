import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clapperboard, Pause, Play, SkipForward, X } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { playBellChime, playClickSound } from '../utils/soundEffects';

const STEP_DURATION = 5000;

export default function CinematicReplay({ onExit, onOpenStory }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const chapter = STORY_CHAPTERS[chapterIndex];

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setInterval(() => {
      setChapterIndex((current) => {
        if (current === STORY_CHAPTERS.length - 1) {
          setIsPlaying(false);
          return current;
        }
        playBellChime();
        return current + 1;
      });
    }, STEP_DURATION);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const togglePlayback = () => {
    playClickSound();
    setIsPlaying((playing) => !playing);
  };

  const advance = () => {
    playClickSound();
    setChapterIndex((current) => Math.min(current + 1, STORY_CHAPTERS.length - 1));
  };

  const finishReplay = () => {
    playClickSound();
    onExit();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05070c]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 35%, ${chapter.color}, transparent 55%)` }} />
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/90 shadow-2xl">
        <div className="h-1 bg-slate-800">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${((chapterIndex + 1) / STORY_CHAPTERS.length) * 100}%`, backgroundColor: chapter.color }}
          />
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <Clapperboard className="w-4 h-4" style={{ color: chapter.color }} />
            Memory Replay // {chapterIndex + 1} of {STORY_CHAPTERS.length}
          </div>
          <button onClick={onExit} className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close memory replay">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 p-6 sm:p-10 min-h-[420px] items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full px-3 py-1 text-xs font-mono font-bold tracking-widest" style={{ color: chapter.color, backgroundColor: `${chapter.color}20`, border: `1px solid ${chapter.color}55` }}>
              {chapter.act} • {chapter.timeframe}
            </span>
            <div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">{chapter.title}</h2>
              <p className="mt-3 text-lg text-slate-300">{chapter.subtitle}</p>
            </div>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">{chapter.summary}</p>
            <blockquote className="border-l-2 pl-4 text-sm italic text-slate-300" style={{ borderColor: chapter.color }}>
              “{chapter.quote}”
            </blockquote>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Chapter evidence</div>
            {Object.entries(chapter.stats).map(([label, value]) => (
              <div key={label} className="flex items-end justify-between gap-3 border-b border-slate-800 pb-3">
                <span className="text-xs capitalize text-slate-400">{label.replace(/([A-Z])/g, ' $1')}</span>
                <strong className="text-right font-mono text-sm" style={{ color: chapter.color }}>{value}</strong>
              </div>
            ))}
            <button
              onClick={() => { onExit(); onOpenStory(); }}
              className="w-full rounded-xl py-2.5 text-xs font-bold transition hover:brightness-110"
              style={{ backgroundColor: chapter.color, color: '#071018' }}
            >
              Open full story chapter →
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4">
          <button onClick={togglePlayback} className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800">
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause replay' : 'Resume replay'}
          </button>
          <button
            onClick={chapterIndex === STORY_CHAPTERS.length - 1 ? finishReplay : advance}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-mono transition ${
              chapterIndex === STORY_CHAPTERS.length - 1
                ? 'bg-emerald-400 font-bold text-slate-950 hover:bg-emerald-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {chapterIndex === STORY_CHAPTERS.length - 1 ? (
              <>Finish replay <CheckCircle2 className="w-3.5 h-3.5" /></>
            ) : (
              <>Next chapter <SkipForward className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
