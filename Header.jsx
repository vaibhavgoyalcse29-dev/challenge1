import React, { useState } from 'react';
import { 
  Receipt, 
  Network, 
  BookOpen, 
  LineChart, 
  Printer, 
  UploadCloud, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles,
  Flame
} from 'lucide-react';
import { 
  setSoundMuted, 
  getSoundMuted, 
  toggleAmbientAtmosphere, 
  playClickSound 
} from '../utils/soundEffects';

export default function Header({ 
  currentMode, 
  setCurrentMode, 
  totalReceipts = 2461,
  onResetData,
  isCustomData = false 
}) {
  const [muted, setMuted] = useState(getSoundMuted());
  const [ambientActive, setAmbientActive] = useState(false);

  const handleMuteToggle = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (next && ambientActive) {
      setAmbientActive(false);
      toggleAmbientAtmosphere(false);
    }
  };

  const handleAmbientToggle = () => {
    playClickSound();
    const next = !ambientActive;
    setAmbientActive(next);
    toggleAmbientAtmosphere(next);
  };

  const modes = [
    { id: 'roll', label: 'Receipt Roll', icon: Receipt, badge: `${totalReceipts}` },
    { id: 'constellation', label: 'Connection Web', icon: Network, badge: 'Interactive' },
    { id: 'story', label: 'Story Cinema', icon: BookOpen, badge: '4 Acts' },
    { id: 'auditor', label: 'Forensic Auditor', icon: LineChart, badge: 'Insights' },
    { id: 'print', label: 'Print Tape', icon: Printer, badge: 'Export' },
    { id: 'upload', label: 'Judge Dropper', icon: UploadCloud, badge: isCustomData ? 'Custom' : 'CSV/JSON' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-purple-500/20 px-4 py-1 text-xs text-slate-300 flex items-center justify-between border-b border-slate-800/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-emerald-400 uppercase tracking-widest text-[11px] font-semibold">
            Dataset Live: 2015 – 2018 Archive Loaded
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
            Vadodara → Mumbai | 2,461 Micro-Moments
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isCustomData && (
            <button
              onClick={onResetData}
              className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              Reset to Arena Dataset
            </button>
          )}

          {/* Procedural Audio Controls */}
          <button
            onClick={handleAmbientToggle}
            title="Toggle Late-Night Lo-Fi Synth Drone"
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              ambientActive 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <Radio className={`w-3 h-3 ${ambientActive ? 'animate-spin' : ''}`} />
            <span>{ambientActive ? '432Hz Synth ON' : 'Ambient'}</span>
          </button>

          <button
            onClick={handleMuteToggle}
            title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Concept Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 border border-amber-300/30">
            🧾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
                RECEIPTIFY
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-semibold uppercase tracking-wider">
                Hackathon Edition
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Your Life, In Receipts • <span className="text-slate-300 italic">Raw Data → Connections → Story</span>
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  playClickSound();
                  setCurrentMode(mode.id);
                }}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-amber-400' : 'text-slate-400'
                }`} />
                <span>{mode.label}</span>
                <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                  isActive
                    ? 'bg-amber-500/30 text-amber-200'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {mode.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
