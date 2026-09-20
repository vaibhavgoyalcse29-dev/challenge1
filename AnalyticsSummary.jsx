import { useMemo } from 'react';
import { BarChart3, Copy, Check, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { synthesizeBehavior } from '../data/behavioralSynthesizer';
import { useState } from 'react';

export default function AnalyticsSummary({ receipts = [] }) {
  const [copied, setCopied] = useState(false);
  const summary = useMemo(() => synthesizeBehavior(receipts), [receipts]);
  const distribution = useMemo(() => {
    const counts = {};
    receipts.forEach((receipt) => {
      const key = receipt.subcategory || receipt.category || 'Other';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [receipts]);

  const share = async () => {
    const text = `My Receipt Story: ${summary.totalRecords} moments, ${formatCurrency(summary.totalSpend)} tracked, peak activity ${summary.peakWindow}, top rhythm ${summary.topCategory}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="analytics-summary mb-8" aria-labelledby="analytics-title">
      <div className="analytics-summary-head">
        <div><p className="analytics-kicker"><BarChart3 size={13} /> Data signal / generated locally</p><h2 id="analytics-title">Your archive, in numbers.</h2></div>
        <button onClick={share} className="analytics-share">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy share card'}</button>
      </div>
      <div className="analytics-metrics">
        <div><span>Tracked spend</span><strong>{formatCurrency(summary.totalSpend)}</strong></div>
        <div><span>Indexed moments</span><strong>{summary.totalRecords.toLocaleString('en-IN')}</strong></div>
        <div><span>Peak activity</span><strong>{summary.peakWindow}</strong></div>
        <div><span>Connected records</span><strong>{summary.connectedRecords.toLocaleString('en-IN')}</strong></div>
      </div>
      <div className="analytics-bars">
        <div className="analytics-bars-title"><span>Most frequent rhythms</span><span><TrendingUp size={13} /> live calculation</span></div>
        {distribution.map(([label, count]) => <div className="analytics-bar-row" key={label}><span>{label}</span><div><i style={{ width: `${Math.max((count / distribution[0][1]) * 100, 5)}%` }} /></div><b>{count}</b></div>)}
      </div>
    </section>
  );
}
