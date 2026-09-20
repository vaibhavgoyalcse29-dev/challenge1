import { useEffect, useState } from 'react';
import { ArrowRight, CircleHelp, X } from 'lucide-react';

const steps = [
  {
    label: '01 / THE ROLL',
    title: 'Start with the raw moments.',
    body: 'Browse the thermal receipt archive, search a memory, and use the facets to find the details behind a chapter.',
    mode: 'roll'
  },
  {
    label: '02 / THE WEB',
    title: 'Follow the hidden connections.',
    body: 'The constellation view turns isolated purchases, places, songs, and messages into one connected human moment.',
    mode: 'constellation'
  },
  {
    label: '03 / THE STORY',
    title: 'Let the data become a story.',
    body: 'Open the scrapbook to see how small receipts accumulate into chapters, turning a dataset into a lived timeline.',
    mode: 'story'
  },
  {
    label: '04 / THE AUDIT',
    title: 'End with the evidence.',
    body: 'The behavioral audit calculates patterns locally from the loaded records, so the story is grounded in the data.',
    mode: 'auditor'
  }
];

export default function GuidedTour({ onModeChange, onReplay, onClose }) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  useEffect(() => {
    onModeChange(current.mode);
  }, [current.mode, onModeChange]);

  const next = () => {
    if (step === steps.length - 1) {
      onClose();
      onReplay();
      return;
    }
    setStep((value) => value + 1);
  };

  return (
    <div className="guided-tour-backdrop" role="dialog" aria-modal="true" aria-labelledby="guided-tour-title">
      <div className="guided-tour-card">
        <button className="guided-tour-close" onClick={onClose} aria-label="Close guided tour"><X size={18} /></button>
        <div className="guided-tour-orbit"><CircleHelp size={22} /></div>
        <p className="guided-tour-label">{current.label}</p>
        <h2 id="guided-tour-title">{current.title}</h2>
        <p className="guided-tour-body">{current.body}</p>
        <div className="guided-tour-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
          {steps.map((item, index) => <span className={index <= step ? 'is-active' : ''} key={item.label} />)}
        </div>
        <div className="guided-tour-footer">
          <span>{step + 1} / {steps.length}</span>
          <button className="guided-tour-next" onClick={next}>
            {step === steps.length - 1 ? 'Launch Memory Replay' : 'Next chapter'} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
