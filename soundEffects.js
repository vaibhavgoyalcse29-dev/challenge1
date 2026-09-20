// Web Audio API Procedural Sound Engine
// Zero external mp3 dependencies - 100% synthesized in the browser

let audioCtx = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientGain = null;
let isMuted = false;

function getContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted) {
  isMuted = muted;
  if (muted && ambientGain) {
    ambientGain.gain.setValueAtTime(0, audioCtx ? audioCtx.currentTime : 0);
  }
}

export function getSoundMuted() {
  return isMuted;
}

// Thermal receipt printer paper advance & head vibration sound
export function playThermalPrintSound() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.35;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Stepped burst to mimic stepper motor steps
    const step = Math.sin(i * 0.05) > 0 ? 1 : -1;
    data[i] = (Math.random() * 2 - 1) * 0.2 * step;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, ctx.currentTime);
  filter.Q.setValueAtTime(4.0, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}

// Paper tear sound effect
export function playPaperTearSound() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(2200, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start();
}

// Soft tactile click
export function playClickSound() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}

// Metallic bell chime (stamp / milestone unlocked)
export function playBellChime() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const freqs = [1046.5, 1318.5, 1567.98]; // C6, E6, G6
  freqs.forEach((f, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.05);

    gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.05);
    osc.stop(ctx.currentTime + idx * 0.05 + 0.8);
  });
}

// Ambient warm background synth loop
export function toggleAmbientAtmosphere(enable) {
  const ctx = getContext();
  if (!ctx) return false;

  if (!enable) {
    if (ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      setTimeout(() => {
        try {
          if (ambientOsc1) ambientOsc1.stop();
          if (ambientOsc2) ambientOsc2.stop();
          ambientOsc1 = null;
          ambientOsc2 = null;
          ambientGain = null;
        } catch (e) {}
      }, 1050);
    }
    return false;
  }

  try {
    if (ambientOsc1) ambientOsc1.stop();
    if (ambientOsc2) ambientOsc2.stop();
  } catch (e) {}

  ambientOsc1 = ctx.createOscillator();
  ambientOsc2 = ctx.createOscillator();
  ambientGain = ctx.createGain();

  // Gentle pentatonic drone: D3 (146.83Hz) + A3 (220Hz)
  ambientOsc1.type = 'triangle';
  ambientOsc1.frequency.setValueAtTime(146.83, ctx.currentTime);

  ambientOsc2.type = 'sine';
  ambientOsc2.frequency.setValueAtTime(220.00, ctx.currentTime);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, ctx.currentTime);

  ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 2.0);

  ambientOsc1.connect(filter);
  ambientOsc2.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(ctx.destination);

  ambientOsc1.start();
  ambientOsc2.start();
  return true;
}
