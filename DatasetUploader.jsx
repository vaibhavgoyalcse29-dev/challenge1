import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBellChime, playClickSound } from '../utils/soundEffects';

export default function DatasetUploader({ onCustomDataLoaded, onResetData, isCustomData, currentCount }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successCount, setSuccessCount] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setErrorMsg('');
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target.result;
        let parsedReceipts = [];

        if (file.name.endsWith('.json')) {
          const raw = JSON.parse(text);
          const list = Array.isArray(raw) ? raw : (raw.receipts || raw.transactions || raw.data || []);
          parsedReceipts = list.map((item, idx) => ({
            id: `custom-${idx + 1}`,
            date: item.date || item.trans_date_trans_time || new Date().toISOString(),
            displayDate: item.date || item.trans_date_trans_time || 'Recent',
            year: new Date(item.date || Date.now()).getFullYear() || 2024,
            mode: item.mode || 'Card',
            category: item.category || 'General',
            subcategory: item.subcategory || item.merchant || '',
            note: item.note || item.merchant || item.category || 'Custom record',
            amount: parseFloat(item.amount || item.amt || 0) || 0,
            type: item.type || (item.amt ? 'expense' : 'expense'),
            currency: item.currency || 'INR',
            facet: item.facet || 'Purchases',
            mood: item.mood || 'Everyday',
            stamp: item.stamp || null,
            connectedSong: item.connectedSong || { track: 'Stargazing', artist: 'Travis Scott', album: 'Astroworld' },
            connectedLocation: item.connectedLocation || { name: item.city || 'Digital Hub', city: item.state || 'India' }
          }));
        } else {
          // Parse CSV
          const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
          if (lines.length < 2) {
            throw new Error('CSV file contains no data rows.');
          }
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',');
            if (cols.length < 2) continue;
            const item = {};
            headers.forEach((h, idx) => {
              item[h] = cols[idx] ? cols[idx].trim() : '';
            });

            const amount = parseFloat(item.amount || item.amt || cols[5] || 0) || 0;
            const rawDate = item.date || item.ts || cols[0] || '';

            parsedReceipts.push({
              id: `custom-${i}`,
              date: new Date().toISOString(),
              displayDate: rawDate || 'Record',
              year: 2024,
              mode: item.mode || cols[1] || 'Digital',
              category: item.category || cols[2] || 'Activity',
              subcategory: item.subcategory || cols[3] || '',
              note: item.note || cols[4] || 'Life moment',
              amount: amount,
              type: 'expense',
              currency: 'INR',
              facet: item.category?.includes('Train') ? 'Places' : 'Purchases',
              mood: 'Custom Discovery',
              stamp: amount > 5000 ? 'SIGNIFICANT' : null,
              connectedSong: { track: item.track_name || 'Midnight City', artist: item.artist_name || 'M83' }
            });
          }
        }

        if (parsedReceipts.length === 0) {
          throw new Error('Could not parse any valid receipts from file.');
        }

        setSuccessCount(parsedReceipts.length);
        playBellChime();
        confetti({ particleCount: 80, spread: 60 });
        onCustomDataLoaded(parsedReceipts);
      } catch (err) {
        console.error(err);
        setErrorMsg(`Failed to parse file: ${err.message}`);
      }
    };

    reader.readAsText(file);
  };

  return (
    <section className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white font-mono">
          Judge Dataset Playground & File Dropper
        </h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Testing your own dataset? Drag and drop any <span className="text-amber-300 font-semibold">CSV</span> or <span className="text-amber-300 font-semibold">JSON</span> file below to see RECEIPTIFY parse, categorize, and weave it into stories in real time.
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${
          dragOver 
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]' 
            : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700'
        }`}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept=".csv,.json"
          onChange={handleFileChange}
          className="hidden"
        />

        <Database className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-sm font-semibold text-white font-mono">
          Drop your test CSV or JSON file here
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Supports Daily Household Transactions CSV, Spotify history, or custom JSON.
        </p>

        <button
          type="button"
          className="mt-5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 transition-colors"
        >
          Select File from Computer
        </button>
      </div>

      {/* Success Notification */}
      {successCount > 0 && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between text-emerald-300 text-xs font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Successfully loaded <strong>{successCount}</strong> receipts from <strong>{fileName}</strong>!
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold">
            Live in app
          </span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-4 flex items-center gap-2 text-rose-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Active Dataset Status & Reset */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            CURRENT DATASET IN MEMORY
          </span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">
            {isCustomData ? `Custom: ${fileName}` : 'Official Hackathon Dataset (Arena 2015-2018)'}
          </p>
          <span className="text-xs text-slate-400 font-mono">
            {currentCount} total life receipts active
          </span>
        </div>

        {isCustomData && (
          <button
            onClick={() => {
              playClickSound();
              onResetData();
              setSuccessCount(0);
              setFileName('');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official Arena Data</span>
          </button>
        )}
      </div>
    </section>
  );
}
