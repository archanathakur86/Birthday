import { useEffect, useRef, useCallback, useState } from 'react';

export type SoundType = 'type' | 'alarm' | 'beep' | 'launch' | 'sparkle' | 'fireworks' | 'ambient';

export function useSoundEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const initCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted) return;
    initCtx();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;

    switch (type) {
      case 'type': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, t);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }
      case 'alarm': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.linearRampToValueAtTime(600, t + 0.2);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        break;
      }
      case 'beep': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
      }
      case 'launch': {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, t);
        filter.frequency.linearRampToValueAtTime(1000, t + 2);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 2);
        gain.gain.linearRampToValueAtTime(0, t + 4);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
        break;
      }
      case 'sparkle': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + Math.random() * 800, t);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        break;
      }
      case 'fireworks': {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800 + Math.random()*400, t);
        filter.frequency.linearRampToValueAtTime(100, t + 0.5);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
        break;
      }
      case 'ambient': {
        if (!ambientOscRef.current) {
          ambientOscRef.current = ctx.createOscillator();
          ambientGainRef.current = ctx.createGain();
          ambientOscRef.current.type = 'sine';
          ambientOscRef.current.frequency.setValueAtTime(200, t);
          ambientGainRef.current.gain.setValueAtTime(0, t);
          ambientGainRef.current.gain.linearRampToValueAtTime(0.05, t + 2);
          
          ambientOscRef.current.connect(ambientGainRef.current);
          ambientGainRef.current.connect(ctx.destination);
          ambientOscRef.current.start(t);
        }
        break;
      }
    }
  }, [isMuted, initCtx]);

  const stopAmbient = useCallback(() => {
    if (ambientOscRef.current && ambientGainRef.current && audioCtxRef.current) {
      const t = audioCtxRef.current.currentTime;
      ambientGainRef.current.gain.linearRampToValueAtTime(0, t + 1);
      ambientOscRef.current.stop(t + 1.1);
      ambientOscRef.current = null;
      ambientGainRef.current = null;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(m => !m);
    if (!isMuted && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    } else if (isMuted && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    }
  }, [isMuted]);

  return { playSound, stopAmbient, toggleMute, isMuted, initCtx };
}
