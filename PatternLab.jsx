import { useState } from 'react';
import { ArrowRight, Lightbulb, Radio, Sparkles } from 'lucide-react';

const patterns = [
  {
    eyebrow: 'TIME + MOOD',
    title: 'Small hours leave a signature.',
    body: 'Late-night purchases, transit, and listening history form a distinct rhythm in the archive.',
    color: 'amber',
    action: 'Inspect the roll',
    mode: 'roll'
  },
  {
    eyebrow: 'PLACE + ROUTINE',
    title: 'A route is more than a transaction.',
    body: 'Repeated places and transport receipts turn isolated amounts into a map of everyday movement.',
    color: 'emerald',
    action: 'Open the connection web',
    mode: 'constellation'
  },
  {
    eyebrow: 'RECORD + MEMORY',
    title: 'The numbers become chapters.',
    body: 'The same archive can be read as a personal timeline: effort, care, celebration, and change.',
    color: 'purple',
    action: 'Enter story cinema',
    mode: 'story'
  }
];

export default function PatternLab({ onModeChange }) {
  const [active, setActive] = useState(0);
  const pattern = patterns[active];

  const revealNext = () => setActive((current) => (current + 1) % patterns.length);

  return (
    <section className="pattern-lab mb-8" aria-labelledby="pattern-lab-title">
      <div className="pattern-lab-heading">
        <div>
          <p className="pattern-lab-kicker"><Lightbulb size={13} /> Pattern Lab / live interpretation</p>
          <h2 id="pattern-lab-title">The archive is telling you something.</h2>
        </div>
        <span className="pattern-lab-status"><Radio size={12} /> 3 lenses online</span>
      </div>

      <div className="pattern-lab-grid">
        <div className={`pattern-lab-card pattern-lab-${pattern.color}`} key={active}>
          <div className="pattern-lab-card-top">
            <span>{pattern.eyebrow}</span>
            <Sparkles size={17} />
          </div>
          <h3>{pattern.title}</h3>
          <p>{pattern.body}</p>
          <button
            onClick={() => onModeChange(pattern.mode)}
            className="pattern-lab-action"
          >
            {pattern.action} <ArrowRight size={15} />
          </button>
        </div>

        <div className="pattern-lab-controls">
          <p className="pattern-lab-question">What changes when you look at the same data differently?</p>
          <div className="pattern-lab-dots" role="tablist" aria-label="Pattern interpretations">
            {patterns.map((item, index) => (
              <button
                key={item.eyebrow}
                role="tab"
                aria-selected={active === index}
                aria-label={`Show ${item.eyebrow} pattern`}
                onClick={() => setActive(index)}
                className={active === index ? 'active' : ''}
              />
            ))}
          </div>
          <button onClick={revealNext} className="pattern-lab-next">
            Reveal another pattern <ArrowRight size={14} />
          </button>
          <p className="pattern-lab-note">No backend. The experience is powered by local, inspectable archive data.</p>
        </div>
      </div>
    </section>
  );
}
