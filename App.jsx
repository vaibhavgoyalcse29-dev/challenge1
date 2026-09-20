import React, { useState } from 'react';
import Header from './components/Header';
import CinematicReplay from './components/CinematicReplay';
import ThermalRollView from './components/ThermalRollView';
import ConstellationGraph from './components/ConstellationGraph';
import StoryScrapbook from './components/StoryScrapbook';
import LifeAuditor from './components/LifeAuditor';
import PrintableReceipt from './components/PrintableReceipt';
import DatasetUploader from './components/DatasetUploader';
import ReceiptModal from './components/ReceiptModal';
import defaultDataset from './data/dataset.json';

export default function App() {
  const [currentMode, setCurrentMode] = useState('roll'); // 'roll', 'constellation', 'story', 'auditor', 'print', 'upload'
  const [receipts, setReceipts] = useState(defaultDataset);
  const [inspectedReceipt, setInspectedReceipt] = useState(null);
  const [isCustomData, setIsCustomData] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);

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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Global Header */}
      <Header
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        totalReceipts={receipts.length}
        onResetData={handleResetData}
        isCustomData={isCustomData}
      />

      <div className="border-y border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-pink-900/30 px-4 py-3">
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

      {/* Footer with Concept Tribute */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500 font-mono space-y-2">
        <p className="text-slate-400 font-semibold">
          RECEIPTIFY 🧾 // "Your Life, In Receipts" — Frontend Hackathon Submission
        </p>
        <p className="max-w-xl mx-auto text-slate-500 leading-relaxed text-[11px]">
          Every moment leaves a receipt: a late-night cutting chai, an EdTech course EMI, a father's eye surgery, a marathon finish line. Disconnected numbers turned into human story.
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-600 pt-2">
          <span>React 18 + Vite</span>
          <span>•</span>
          <span>Web Audio API</span>
          <span>•</span>
          <span>Canvas Graph Engine</span>
          <span>•</span>
          <span>100% Frontend Only</span>
        </div>
      </footer>
    </div>
  );
}
