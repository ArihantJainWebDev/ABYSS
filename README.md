# ABYSS — Deep Sea Exploration Co.

> **"In 1960, humanity touched the ocean floor for 20 minutes. At ABYSS, we invite you to stay."**

ABYSS is a cinematic, playable web expedition into the unexplored depths of the ocean. Built for the **HackOcean Hackathon**, this project replaces traditional static web sections with a **continuous, 60 FPS playable movie** where scrolling equals diving deeper into the sea.

---

## Project Vision & Experience

Instead of scrolling past disconnected landing page blocks, the entire web application represents **one continuous submarine expedition**. As the user scrolls:

- **0M (Surface)**: Sunlight reflects off gentle ocean waves. A luxury titanium submersible awaits.
- **200M (Epipelagic Zone)**: Natural light refracts into deep emerald cyan as pressure seals lock automatically.
- **600M (Mesopelagic Zone)**: Sun fades into twilight. Bioluminescent pyrosomes and jellyfish illuminate the dark like living galaxies.
- **1500M (Bathypelagic Zone)**: Sunken 17th-century galleon shipwrecks and giant blue whale silhouettes locked in eternal ocean silence.
- **3000M (Abyssopelagic Zone)**: Complete pitch darkness. The user's mouse cursor acts as a **submarine spotlight**, shining a light beam to discover hidden abyssal species.
- **4000M+ (Hadal Zone — The Abyss)**: The Hadal floor ecosystem, interactive vessel architecture configurator, and Mission Control booking terminal.

---

## Key Features & Technical Accomplishments

### 1. Frame-Accurate Canvas Video Engine
- **Zero Video Buffering / Stuttering**: Videos are converted into 30fps JPG image sequences and painted onto a fixed full-viewport HTML5 canvas using dynamic `coverFit()` math.
- **Cinematic Scene Crossfading**: Smooth `globalAlpha` cross-dissolve transitions blend adjacent scenes as you scroll, eliminating abrupt video jumps.

### 2. Persistent Submarine Cockpit HUD
- **Real-Time Depth Telemetry**: Displays continuous depth in meters and feet with live depth zone badges (*Epipelagic* → *Mesopelagic* → *Bathypelagic* → *Abyssopelagic* → *Hadal*).
- **Hydrostatic Pressure Gauge**: Live calculations for **BAR** and **PSI** (`BAR = 1 + depth / 10`).
- **Telemetry Diagnostics Bar**: Real-time readings for Oxygen % (`98.4%`), Battery Power %, Water Temp (`24°C` → `1.2°C`), and Hull Stress %.
- **Gyroscopic Compass & Sonar Radar**: Rotating directional ring and interactive radar sweep with audio pings.
- **Sector Quick Jump**: Dropdown navigator allowing instant smooth scroll jumps to key depth benchmarks.

### 3. Web Audio Procedural Soundscape
- Built with native **Web Audio API** (zero external sound file dependencies):
  - 42Hz sub-bass engine rumble.
  - High-frequency sonar ping echoes.
  - Hull pressure creak pitch slides during deep scrolling.
  - HUD button click pops and sound mute/unmute toggle.

### 4. Interactive Cursor Spotlight (3000m)
- A fixed radial-gradient spotlight tracks the user's cursor in pitch darkness, illuminating deep sea anomalies:
  - *Anglerfish (Melanocetus johnsonii)* glowing lure.
  - *Giant Abyssal Squid (Architeuthis dux)* shadow.
  - *380°C Hydrothermal Black Smoker Vent*.

### 5. Interactive Vessel Architecture Configurator
- Interactive cutaway schematic of the **Neptune Prime Submersible** with live SVG highlight animations:
  - **Dual Titanium Pressure Capsule** (Grade 5 forged titanium, 120mm wall thickness, 1,100 BAR rating).
  - **360° Optical Acrylic Dome** (210mm optical quartz acrylic).
  - **Acoustic Mag-Drive Thrusters** (Magnetic levitation, < 5 dB).
  - **96-Hour Redundant Life Support** (Quadruple CO2 scrubbing matrix).

### 6. SpaceX / Apple-Grade Mission Control Booking Terminal
- Futuristic reservation system with submersible vessel selection, passenger count selector, launch window date picker, titanium safety ratings, and launch confirmation screen.

---

## 🛠 Technology Stack & Architecture

| Technology | Purpose | Why It Was Chosen |
| :--- | :--- | :--- |
| **React 18** | UI Framework | Component-based state management for HUD, modals, and craft configurator. |
| **Vite** | Build Tool | Instant HMR, lightning-fast ES module bundling. |
| **GSAP + ScrollTrigger** | Scroll Animation Engine | Frame-accurate scroll scrubbing and timeline synchronization. |
| **Lenis** | Smooth Scroll | Buttery-smooth wheel physics synchronized with GSAP's ticker loop. |
| **HTML5 Canvas API** | Rendering Engine | 60 FPS GPU-accelerated cover-fit frame rendering & crossfade blending. |
| **Web Audio API** | Sound Synthesizer | Zero-latency procedural audio generation for submarine ambience and pings. |
| **FFmpeg** | Asset Pipeline | High-efficiency 30fps image sequence extraction script (`extract-frames.ps1`). |
| **Lucide React** | Icons | Minimalist glassmorphic vector icon set. |

---

## Project Structure

```
abyss/
├── public/
│   ├── video/               # Source Hailuo MP4 videos (01-surface.mp4 -> 07-abyss.mp4)
│   └── frames/              # Extracted 30fps JPG image sequences per scene
├── scripts/
│   └── extract-frames.ps1   # PowerShell FFmpeg frame extraction script
├── src/
│   ├── engine/
│   │   ├── MasterScrollEngine.jsx  # Master full-viewport canvas & GSAP timeline engine
│   │   ├── useLenis.js             # Lenis smooth scroll + GSAP ticker synchronization
│   │   └── AudioEngine.js          # Web Audio API procedural sound synthesizer
│   ├── hud/
│   │   ├── SubmarineHUD.jsx        # Persistent glass cockpit HUD header
│   │   ├── DepthCounter.jsx        # Depth telemetry meter
│   │   ├── PressureGauge.jsx       # Hydrostatic pressure gauge
│   │   ├── TelemetryBar.jsx        # Submarine diagnostic readings
│   │   ├── Compass.jsx             # Gyroscopic compass
│   │   └── SonarRadar.jsx          # Radar sweep line & blip targets
│   ├── scenes/
│   │   ├── Scene01Surface.jsx      # 0m Surface Opening Hero
│   │   ├── Scene02Dive.jsx         # 200m Water Barrier Crossing
│   │   ├── Scene03Reef.jsx         # 600m Epipelagic Living Reef
│   │   ├── Scene04Bioluminescence.jsx # 1500m Mesopelagic Bioluminescence
│   │   ├── Scene05Ruins.jsx        # 3000m Bathypelagic Sunken Galleons & Whales
│   │   ├── Scene06Darkness.jsx     # 3500m Abyssopelagic Spotlight Flashlight
│   │   └── Scene07AbyssTerminal.jsx # 4000m Hadal Zone & Mission Booking
│   ├── components/
│   │   ├── CraftConfigurator.jsx   # Interactive vessel cutaway explorer
│   │   ├── MarineModal.jsx         # Biological telemetry detail popup
│   │   └── BookingModal.jsx        # Mission Control reservation terminal
│   ├── App.jsx                     # Root application assembly
│   ├── index.css                   # Design tokens, glassmorphism, & vignette overlays
│   └── main.jsx                    # React entry point
└── package.json
```

---

## Quick Start & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **FFmpeg** (optional, only needed if re-extracting frames from new video files)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ArihantJainWebDev/Disaster-relief-resource-finder.git
cd abyss/abyss
npm install
```

### 2. Run Local Development Server
Start the Vite dev server:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Build for Production
Create an optimized production build:
```bash
npm run build
npm run preview
```

### 4. (Optional) Re-extract Frames from Videos
If you add or update `.mp4` videos in `public/video/`, run the extraction script:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\extract-frames.ps1
```

---

## License & Credits

Created by **Team ABYSS** for **HackOcean**. Designed with inspiration from Apple product launches, *Interstellar*, *Avatar: The Way of Water*, and National Geographic deep ocean research expeditions.