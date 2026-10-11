/**
 * All sound is made with the Web Audio API. There are no audio files.
 * A browser only allows sound after a user gesture, so call `unlock()` inside the first tap.
 */

const STORAGE_KEY = 'namma-auto-muted';
const MASTER_GAIN = 0.09075;
const MUTE_FADE_S = 0.05;
const NOISE_SECONDS = 2;

/** Engine tuning. The rpm value 0..1 moves pitch, putt rate and brightness together. */
const ENGINE = {
  baseHz: 44,
  hzPerRpm: 78,
  puttBaseHz: 10,
  puttPerRpm: 26,
  lowpassBase: 380,
  lowpassPerRpm: 1500,
  idleVolume: 0.2,
  puttDepth: 0.55,
};

interface EngineVoice {
  saw: OscillatorNode;
  square: OscillatorNode;
  putt: OscillatorNode;
  lowpass: BiquadFilterNode;
  gain: GainNode;
}

type AudioContextCtor = typeof AudioContext;

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export class Sound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private engine: EngineVoice | null = null;
  private muted = readMuted();

  get isMuted(): boolean {
    return this.muted;
  }

  /** Create or resume the audio engine. Must run inside a user gesture. */
  unlock(): void {
    if (!this.ctx) this.init();
    void this.ctx?.resume();
  }

  setActive(active: boolean): void {
    if (!this.ctx) return;
    void (active ? this.ctx.resume() : this.ctx.suspend()).catch(() => {});
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      /* Storage can be blocked. The choice then lasts for this visit only. */
    }
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : MASTER_GAIN, this.ctx.currentTime, MUTE_FADE_S);
    }
  }

  private init(): void {
    const Ctor: AudioContextCtor | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : MASTER_GAIN;
    const limiter = ctx.createDynamicsCompressor();
    master.connect(limiter);
    limiter.connect(ctx.destination);

    const noise = ctx.createBuffer(1, ctx.sampleRate * NOISE_SECONDS, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    this.master = master;
    this.noise = noise;
  }

  private noiseSource(loop = false): AudioBufferSourceNode | null {
    if (!this.ctx || !this.noise) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = loop;
    return src;
  }

  /** A short decaying burst of filtered noise. */
  private noiseBurst(opts: {
    freq: number;
    q: number;
    type: BiquadFilterType;
    peak: number;
    attack: number;
    decay: number;
    delay?: number;
  }): void {
    const { ctx, master } = this;
    const src = this.noiseSource();
    if (!ctx || !master || !src) return;
    const t0 = ctx.currentTime + (opts.delay ?? 0);
    const filter = ctx.createBiquadFilter();
    filter.type = opts.type;
    filter.frequency.value = opts.freq;
    filter.Q.value = opts.q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(opts.peak, t0 + opts.attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.attack + opts.decay);
    src.connect(filter).connect(gain).connect(master);
    src.start(t0, Math.random() * (NOISE_SECONDS - 1));
    src.stop(t0 + opts.attack + opts.decay + 0.05);
  }

  /** A single decaying tone. */
  private tone(freq: number, type: OscillatorType, peak: number, decay: number, delay = 0, endFreq = freq): void {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + decay);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + decay);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + decay + 0.05);
  }

  /** Starts the idling engine. Safe to call twice. */
  engineOn(): void {
    const { ctx, master } = this;
    if (!ctx || !master || this.engine) return;
    const saw = ctx.createOscillator();
    saw.type = 'sawtooth';
    const square = ctx.createOscillator();
    square.type = 'square';
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const squareLevel = ctx.createGain();
    squareLevel.gain.value = 0.45;

    // The "putt putt" is an oscillator that pulses the engine's volume.
    const putt = ctx.createOscillator();
    putt.type = 'sine';
    const puttDepth = ctx.createGain();
    puttDepth.gain.value = ENGINE.puttDepth;
    const pulse = ctx.createGain();
    pulse.gain.value = 1 - ENGINE.puttDepth * 0.5;
    putt.connect(puttDepth).connect(pulse.gain);

    saw.connect(lowpass);
    square.connect(squareLevel).connect(lowpass);
    lowpass.connect(pulse).connect(gain).connect(master);
    for (const o of [saw, square, putt]) o.start();

    this.engine = { saw, square, putt, lowpass, gain };
    this.setRpm(0, 1);
  }

  /** rpm 0..1. volume 0..1. glide is the smoothing time in seconds. */
  setRpm(rpm: number, volume: number, glide = 0.09): void {
    const { ctx, engine } = this;
    if (!ctx || !engine) return;
    const t = ctx.currentTime;
    const hz = ENGINE.baseHz + ENGINE.hzPerRpm * rpm;
    engine.saw.frequency.setTargetAtTime(hz, t, glide);
    engine.square.frequency.setTargetAtTime(hz * 0.5, t, glide);
    engine.putt.frequency.setTargetAtTime(ENGINE.puttBaseHz + ENGINE.puttPerRpm * rpm, t, glide);
    engine.lowpass.frequency.setTargetAtTime(ENGINE.lowpassBase + ENGINE.lowpassPerRpm * rpm, t, glide);
    engine.gain.gain.setTargetAtTime((ENGINE.idleVolume + rpm * 0.35) * volume, t, glide);
  }

  engineOff(fade = 0.3): void {
    const { ctx, engine } = this;
    if (!ctx || !engine) return;
    engine.gain.gain.setTargetAtTime(0, ctx.currentTime, fade / 3);
    const stopAt = ctx.currentTime + fade * 2;
    for (const o of [engine.saw, engine.square, engine.putt]) o.stop(stopAt);
    this.engine = null;
  }

  /** Rubber bulb horn: two quick squeaks. */
  honk(count = 2): void {
    for (let i = 0; i < count; i += 1) {
      const delay = i * 0.2;
      this.tone(392, 'sawtooth', 0.22, 0.17, delay, 452);
      this.tone(588, 'square', 0.09, 0.15, delay, 640);
      this.noiseBurst({ freq: 1500, q: 1.4, type: 'bandpass', peak: 0.05, attack: 0.01, decay: 0.12, delay });
    }
  }

  /** Tyre screech. */
  skid(duration = 1.1): void {
    const { ctx, master } = this;
    const src = this.noiseSource(true);
    if (!ctx || !master || !src) return;
    const t0 = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 7;
    filter.frequency.setValueAtTime(1500, t0);
    filter.frequency.linearRampToValueAtTime(2300, t0 + duration * 0.5);
    filter.frequency.linearRampToValueAtTime(1300, t0 + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.28, t0 + 0.12);
    gain.gain.setValueAtTime(0.28, t0 + duration * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter).connect(gain).connect(master);
    src.start(t0);
    src.stop(t0 + duration + 0.05);
  }

  /** Taxi meter flag: a bright bell. */
  ding(): void {
    this.noiseBurst({ freq: 3200, q: 1, type: 'highpass', peak: 0.12, attack: 0.002, decay: 0.03 });
    this.tone(2637, 'sine', 0.22, 0.9);
    this.tone(3951, 'sine', 0.1, 0.55);
    this.tone(1319, 'sine', 0.08, 1.1);
  }

  /** One backfire pop from the exhaust. */
  backfire(): void {
    this.noiseBurst({ freq: 900, q: 0.7, type: 'lowpass', peak: 0.5, attack: 0.004, decay: 0.11 });
    this.tone(110, 'sine', 0.4, 0.14, 0, 45);
  }

  /** Engine screams up, then falls away as the auto leaves. */
  launch(rev: number, away: number): void {
    const { ctx } = this;
    if (!ctx) return;
    this.setRpm(1, 1.25, 0.25);
    window.setTimeout(() => this.setRpm(1, 0.9, 0.2), rev * 1000);
    window.setTimeout(() => {
      this.setRpm(0.7, 0.05, away / 3);
    }, (rev + 0.25) * 1000);
    this.whoosh(away, rev);
  }

  whoosh(duration: number, delay = 0): void {
    const { ctx, master } = this;
    const src = this.noiseSource(true);
    if (!ctx || !master || !src) return;
    const t0 = ctx.currentTime + delay;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.6;
    filter.frequency.setValueAtTime(260, t0);
    filter.frequency.exponentialRampToValueAtTime(3400, t0 + duration * 0.7);
    filter.frequency.exponentialRampToValueAtTime(700, t0 + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.32, t0 + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter).connect(gain).connect(master);
    src.start(t0);
    src.stop(t0 + duration + 0.05);
  }

}
