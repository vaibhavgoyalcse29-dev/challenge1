import { useEffect } from 'react';
import { ArrowRight, BookOpen, Network, X } from 'lucide-react';

export default function WelcomePanel({ onClose, onStartTour }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="welcome-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="welcome-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-description"
      >
        <button className="welcome-close" onClick={onClose} aria-label="Close welcome message">
          <X size={18} />
        </button>
        <div className="welcome-mark" aria-hidden="true">🧾</div>
        <p className="welcome-eyebrow">A personal archive, made visible</p>
        <h2 id="welcome-title">Welcome to your life in receipts.</h2>
        <p id="welcome-description" className="welcome-description">
          Receiptify turns everyday transactions, places, music, care, travel, and milestones into an interactive story you can explore.
        </p>
        <div className="welcome-highlights">
          <span><BookOpen size={15} /> Read four life chapters</span>
          <span><Network size={15} /> Follow connected moments</span>
        </div>
        <div className="welcome-actions">
          <button className="welcome-primary" onClick={onClose}>
            Explore my archive <ArrowRight size={16} />
          </button>
          <button className="welcome-secondary" onClick={onStartTour}>
            Take the guided tour
          </button>
        </div>
        <p className="welcome-footnote">Everything runs locally in your browser. No account or backend required.</p>
      </section>
    </div>
  );
}
