// Plantasia Advanced Presets – each embodies a botanical concept via sound design
const plantasiaAdvancedPresets = [
  {
    name: 'Root Phonotropism',
    description: 'Stereo pans a 200 Hz sine to simulate roots growing toward moisture',
    waveform: 'sine',
    frequency: 200,
    panning: { lfoFrequency: 0.1, lfoWaveform: 'sine', depth: 1 } // 10 s L→R sweep
  },
  {
    name: 'Germination Kickstart',
    description: '125 Hz sine with dynamic low-pass filter envelope mimicking seed crack',
    waveform: 'sine',
    frequency: 125,
    filterEnvelope: {
      type: 'lowpass',
      attack: 0.01,
      decay: 0.3,
      sustain: 0.2,
      release: 0.5
    },
    amplitudeGate: { onTime: 0.5, offTime: 0.5 } // 500 ms bursts
  },
  {
    name: 'Biomass Builder',
    description: '500 Hz sine thickened by an octave-down sub-oscillator',
    waveform: 'sine',
    frequency: 500,
    subOscillator: { type: 'sine', octave: -1, level: 0.5 }
  },
  {
    name: 'Hormonal Harmony',
    description: '500 Hz sine with slow FM drift to echo ebbing hormone levels',
    waveform: 'sine',
    frequency: 500,
    fmModulation: { lfoFrequency: 0.5, depthHz: 5, lfoWaveform: 'sine' }
  },
  {
    name: 'Leaf Resonance',
    description: '3.5 kHz sine convolved with a bean-leaf impulse for natural shimmer',
    waveform: 'sine',
    frequency: 3500,
    convolution: { impulseResponseFile: 'beanLeafIR.wav' }
  },
  {
    name: 'Algal Bloom',
    description: '2.2 kHz sine granulated into 50 ms grains with pitch randomness',
    waveform: 'sine',
    frequency: 2200,
    granular: { grainSize: 0.05, overlap: 0.5, pitchRandom: 0.02 }
  },
  {
    name: 'Leaf Growth Accelerator',
    description: '250 Hz sine with polyrhythmic tremolo (0.4 Hz & 0.6 Hz)',
    waveform: 'sine',
    frequency: 250,
    amplitudeModulation: [
      { lfoFrequency: 0.4, lfoWaveform: 'triangle', depth: 0.2 },
      { lfoFrequency: 0.6, lfoWaveform: 'triangle', depth: 0.2 }
    ]
  },
  {
    name: 'Nectar Boost',
    description: '200 Hz sine whose AM depth scales with ambient light level',
    waveform: 'sine',
    frequency: 200,
    sensorModulation: {
      sensor: 'light',
      parameter: 'amplitudeDepth',
      range: [0.1, 0.5]
    }
  },
  {
    name: 'Cereal Sprout',
    description: '5 kHz carrier tuned via 7:5 just-intonation above a 3 kHz reference',
    waveform: 'sine',
    frequency: 5000,
    tuning: { type: 'justIntonation', ratio: [7, 5], referenceFrequency: 3000 }
  },
  {
    name: 'Fruiting Uplift',
    description: '12 kHz sine overlaid with a generative three-note motif',
    waveform: 'sine',
    frequency: 12000,
    melodyLayer: { notes: [12000, 14000, 10000], rateHz: 1, pattern: 'sequence' }
  },
  {
    name: 'Buzz Pollination',
    description: '200–300 Hz sine band that shifts over the day to mirror bee activity',
    waveform: 'sine',
    diurnalModulation: {
      sunrise:   { freqRange: [200, 200] },
      midday:    { freqRange: [200, 300] },
      sunset:    { freqRange: [200, 200] }
    }
  },
  {
    name: 'Alyssum Sprouter Surround',
    description: '5 kHz fundamental front-center & 13.3 kHz harmony in rear surrounds',
    waveform: 'sine',
    spatialZones: [
      { frequency: 5000, output: 'frontCenter' },
      { frequency: 13300, output: 'rearSurround' }
    ]
  }
];

// Usage: feed one of these objects into your oscillator + effect chains to apply the preset.