import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import CinematicReplay from './components/CinematicReplay';
import ThermalRollView from './components/ThermalRollView';
import ConstellationGraph from './components/ConstellationGraph';
import StoryScrapbook from './components/StoryScrapbook';
import LifeAuditor from './components/LifeAuditor';
import PrintableReceipt from './components/PrintableReceipt';
import DatasetUploader from './components/DatasetUploader';
import ReceiptModal from './components/ReceiptModal';
import MemoryCursor from './components/MemoryCursor';
import PatternLab from './components/PatternLab';
import AnalyticsSummary from './components/AnalyticsSummary';
import GuidedTour from './components/GuidedTour';
import defaultDataset from './data/enrichedDataset';

import ParallaxBackground from './ParallaxBackground';
import './glass-parallax.css';

export default function App() {
  const [currentMode, setCurrentMode] = useState('roll'); // 'roll', 'constellation', 'story', 'auditor', 'print', 'upload'
  const [receipts, setReceipts] = useState(defaultDataset);
  const [inspectedReceipt, setInspectedReceipt] = useState(null);
  const [isCustomData, setIsCustomData] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const lenisRef = useRef(null);

  // --- Lenis smooth scroll ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false, // native touch scroll feels better on real phones
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Snap scroll to top (via Lenis) whenever the mode changes, so a long
  // scrolled-down Roll view doesn't leave you mid-page after switching tabs
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [currentMode]);

  const handleCustomDataLoaded = (newReceipts) => {
    setReceipts(newReceipts);
    setIsCustomData(true);
    setCurrentMode('roll');
  };

  const handleResetData = () => {
    setReceipts(defaultDataset);
    setIsCustomData(false);
  };

  return (
    // bg is now transparent here — ParallaxBackground supplies the dark base
    // and sits fixed behind everything (z-0). Everything below is z-10.
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 relative">
      <ParallaxBackground />
      <MemoryCursor />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Header */}
        <Header
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          totalReceipts={receipts.length}
          onResetData={handleResetData}
          isCustomData={isCustomData}
        />

        <div className="border-y border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-pink-900/30 backdrop-blur-md px-4 py-3">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
            <span className="text-xs font-medium text-slate-300 sm:text-sm">
              Dataset analysis complete: <strong className="text-purple-300">4 life chapters and cross-domain connections discovered.</strong>
            </span>
            <button
              onClick={() => setIsReplayOpen(true)}
              className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-300 transition hover:bg-purple-500/20"
            >
              ▶ Start Memory Replay
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {currentMode === 'roll' && (
            <section className="mb-8 overflow-hidden rounded-3xl border border-amber-300/15 bg-gradient-to-br from-amber-500/12 via-slate-950/70 to-purple-500/10 p-5 shadow-2xl shadow-amber-950/20 sm:p-8" aria-labelledby="journey-title">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300/80">
                    A living memory museum
                  </p>
                  <h2 id="journey-title" className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    Turn everyday spending into a story.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                    Receiptify connects purchases, places, music, and milestones so you can see the human pattern hidden inside your archive.
                  </p>
                </div>
                <button
                  onClick={() => setIsReplayOpen(true)}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Watch the 60-second story →
                </button>
                <button
                  onClick={() => setIsTourOpen(true)}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Start guided tour <span className="ml-2">↗</span>
                </button>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  ['01', 'Browse the roll', 'Find the small moments.'],
                  ['02', 'Open the web', 'See what each moment connects to.'],
                  ['03', 'Read the story', 'Understand the life behind the data.']
                ].map(([step, title, description], index) => (
                  <button
                    key={step}
                    onClick={() => setCurrentMode(['roll', 'constellation', 'story'][index])}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-amber-300/40 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-300/70"
                  >
                    <span className="font-mono text-xs font-bold text-amber-300">{step}</span>
                    <span className="mt-2 block text-sm font-bold text-white">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                <span><b className="text-amber-300">2,461</b> moments indexed</span>
                <span><b className="text-emerald-300">9</b> activity facets</span>
                <span><b className="text-purple-300">4</b> story chapters</span>
                <span className="flex items-center gap-1.5 text-emerald-300"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> correlation engine online</span>
              </div>
            </section>
          )}
          {currentMode === 'roll' && <PatternLab onModeChange={setCurrentMode} />}
          {currentMode === 'roll' && <AnalyticsSummary receipts={receipts} />}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {currentMode === 'roll' && (
                <ThermalRollView
                  receipts={receipts}
                  onInspect={setInspectedReceipt}
                />
              )}

              {currentMode === 'constellation' && (
                <ConstellationGraph
                  onInspectReceipt={setInspectedReceipt}
                />
              )}

              {currentMode === 'story' && (
                <StoryScrapbook
                  onInspectReceipt={setInspectedReceipt}
                />
              )}

              {currentMode === 'auditor' && (
                <LifeAuditor
                  receipts={receipts}
                />
              )}

              {currentMode === 'print' && (
                <PrintableReceipt
                  receipts={receipts}
                />
              )}

              {currentMode === 'upload' && (
                <DatasetUploader
                  onCustomDataLoaded={handleCustomDataLoaded}
                  onResetData={handleResetData}
                  isCustomData={isCustomData}
                  currentCount={receipts.length}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Detailed Receipt Modal (Dossier Inspector) */}
        {inspectedReceipt && (
          <ReceiptModal
            receipt={inspectedReceipt}
            onClose={() => setInspectedReceipt(null)}
            onNavigateThread={() => {
              setInspectedReceipt(null);
              setCurrentMode('constellation');
            }}
          />
        )}

        {isReplayOpen && (
          <CinematicReplay
            onExit={() => setIsReplayOpen(false)}
            onOpenStory={() => setCurrentMode('story')}
          />
        )}
        {isTourOpen && (
          <GuidedTour
            onModeChange={setCurrentMode}
            onReplay={() => setIsReplayOpen(true)}
            onClose={() => setIsTourOpen(false)}
          />
        )}

        {/* Footer with Concept Tribute */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-8 px-4 text-center text-xs text-slate-500 font-mono space-y-2">
          <p className="text-slate-400 font-semibold">
            RECEIPTIFY 🧾 // "Your Life, In Receipts" — Frontend Hackathon Submission
          </p>
          <p className="max-w-xl mx-auto text-slate-500 leading-relaxed text-[11px]">
            Every moment leaves a receipt: a late-night cutting chai, an EdTech course EMI, a father's eye surgery, a marathon finish line. Disconnected numbers turned into human story.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-600 pt-2">
            <span>React 19 + Vite</span>
            <span>•</span>
            <span>Web Audio API</span>
            <span>•</span>
            <span>Canvas Graph Engine</span>
            <span>•</span>
            <span>100% Frontend Only</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
