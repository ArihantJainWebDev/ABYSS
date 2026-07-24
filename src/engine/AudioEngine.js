// Web Audio API Procedural Submarine Sound Engine
class AudioEngine {
  constructor() {
    this.ctx = null
    this.isMuted = true
    this.ambientGain = null
    this.rumbleOsc = null
    this.noiseNode = null
    this.isInitialized = false
  }

  init() {
    if (this.isInitialized) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioCtx()

      // Ambient Master Gain
      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.05, this.ctx.currentTime)
      this.ambientGain.connect(this.ctx.destination)

      // Low frequency submarine engine rumble
      this.rumbleOsc = this.ctx.createOscillator()
      this.rumbleOsc.type = 'sine'
      this.rumbleOsc.frequency.setValueAtTime(42, this.ctx.currentTime) // 42Hz sub bass
      
      const rumbleGain = this.ctx.createGain()
      rumbleGain.gain.setValueAtTime(0.12, this.ctx.currentTime)
      
      this.rumbleOsc.connect(rumbleGain)
      rumbleGain.connect(this.ambientGain)
      this.rumbleOsc.start()

      // Water noise generator
      const bufferSize = this.ctx.sampleRate * 2
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      this.noiseNode = this.ctx.createBufferSource()
      this.noiseNode.buffer = noiseBuffer
      this.noiseNode.loop = true

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(180, this.ctx.currentTime)

      const noiseGain = this.ctx.createGain()
      noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime)

      this.noiseNode.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.ambientGain)
      this.noiseNode.start()

      this.isInitialized = true
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e)
    }
  }

  toggleSound() {
    if (!this.isInitialized) {
      this.init()
    }
    if (!this.ctx) return false

    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    this.isMuted = !this.isMuted
    if (this.ambientGain) {
      const targetGain = this.isMuted ? 0 : 0.08
      this.ambientGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1)
    }
    return !this.isMuted
  }

  playSonarPing() {
    if (this.isMuted || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1240, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4)

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.9)
    } catch (e) {}
  }

  playPressureCreak() {
    if (this.isMuted || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(65, this.ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(45, this.ctx.currentTime + 0.8)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(220, this.ctx.currentTime)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.8)
    } catch (e) {}
  }

  playClick() {
    if (this.isMuted || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, this.ctx.currentTime)
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch (e) {}
  }

  updateDepthFrequency(depth) {
    if (!this.ctx || !this.rumbleOsc) return
    // As depth increases, lower the pitch slightly and increase filter resonance
    const freq = Math.max(25, 48 - (depth / 3000) * 18)
    this.rumbleOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.5)
  }
}

export const audioEngine = new AudioEngine()
