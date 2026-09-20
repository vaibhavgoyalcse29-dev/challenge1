import React, { useState } from 'react';
import Header from './components/Header';
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
