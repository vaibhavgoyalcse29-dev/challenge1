# 🧾 RECEIPTIFY: Your Life, In Receipts
> **Frontend Hackathon Winner Solution** • *Raw Data → Insights → Connections → Story*

Built for the **"Your Life, In Receipts"** frontend hackathon challenge.

---

## 🌟 The Core Breakthrough: Moving Beyond Timelines
The challenge explicitly states:
> *"Don't Just Build a Timeline... January → February → March with a collection of cards underneath is not enough. Think about the relationships between different types of information. For example: Song → Location → Photo → Purchase → Event might appear to be five unrelated records. But together, they could represent one meaningful moment or chapter in someone's life."*

**RECEIPTIFY** fulfills this core mandate through 5 distinct interactive experiences:

### 1. 🕸️ The Connection Constellation (Interactive 2D Canvas Graph)
- Discovers non-linear, multi-faceted relationships across time and data categories.
- Click on any moment (e.g. **Marathon Bib Registration**) and watch the graph illuminate its connected constellation:
  - **Music**: High BPM running tracks (*Midnight City - M83*)
  - **Purchase**: *Puma Troy running shoes* (₹2,421)
  - **Location**: *Decathlon Sports Store, Bandra*
  - **Nutrition**: *Banana and electrolyte groceries*
  - **Search**: *"Half marathon hydration and pacing strategies"*
  - **Message**: *"Finished 10k in 54 mins! Medal secured!"*
  - **Photo**: Finish line bib #4182 pinned to race tee.

### 2. 📜 The Tactile Thermal Paper Roll & Living Ledger
- Neo-skeuomorphic thermal paper aesthetic with authentic serrated tear edges, monospaced thermal typography, barcodes, and auditor stamps (`PAID IN SWEAT`, `FAMILY DUTY`, `CORE MEMORY`).
- Filter across **9 Activity Facets**: *Purchases, Places, Entertainment, Health & Care, Family, Events, Career, Music, Notes*.
- Multi-dimensional filters: Year (2015-2018), Mood (*Late Night Hustle, Caregiver, Devotion, Street Comfort, Growth*), and instant live search.
- **Behind The Receipt Dossier Inspector**: Deep-dive modal revealing the secret story behind each transaction.

### 3. 📖 The 4-Act Cinematic Story Cinema & Scrapbook
- Uncovers the real human journey hidden inside 2,461 receipts:
  - **Act I: The Vadodara Hustle (2015–2016)** — Shared room, ₹2,543 rent, ₹5 bicycle air pump, and the unbroken ₹10,000 monthly remittance to parents.
  - **Act II: The Quiet Caregiver (2016–2017)** — Family health crises, father's cataract diagnosis, ₹22,700 prescription glasses, enduring personal frugality (₹15 vadapav) to care for loved ones.
  - **Act III: The Career Leap (2017–2018)** — EdTech course EMIs (₹2,800/mo), 'Finding Next Job' book, Sevagram express to Mumbai, salary jumping from ₹47k to ₹78k.
  - **Act IV: The Marathon & Triumph (2018)** — Decathlon gear, Puma running shoes, crossing the 21K finish line, celebratory Domino's pizza, and compounding wealth.

### 4. 🔬 The Forensic Life Auditor (Behavioral Insights)
- **The Chai Index**: 148 cutting chais (₹1,820) fueling midnight engineering sprints.
- **The Midnight Hustle Radar**: 24-hour circular activity heatmap showing the 1:00 AM – 3:00 AM study spike.
- **The Selflessness Ratio**: Compares family medical care & home upgrades (₹320,000+) against personal splurges (₹18,000), proving a **17.8x** devotion ratio.
- **The 9-Facet Radar**: Quantifies life balance across entertainment, health, transit, and career.

### 5. 🖨️ Tactile Thermal Receipt Generator & Exporter
- Configure and print an authentic supermarket/cash-register receipt summarizing any chapter or the entire journey.
- Itemized moments, emotional resilience tax (₹0.00), barcode, and verified stamps.
- 1-Click **Download PNG** (with paper-tear sound effect and celebratory confetti) or **Print**!

### 6. 📂 Judge Dataset Dropper (Dynamic Testing)
- Drag and drop any custom CSV or JSON file onto the screen.
- Instantly parses, categorizes, and weaves it into the story engine client-side.
- One-click reset to restore the official Arena dataset.

---

## 🔊 Procedural Audio (Web Audio API)
- **Zero MP3 Dependencies**: 100% synthesized procedural audio running in pure code.
- Thermal printer paper spooling sound.
- Crisp paper tear sound effect.
- Optional 432Hz ambient lo-fi synth tone for late-night cinema reading.

---

## 🚀 Getting Started

```bash
# 1. Navigate to project
cd your-life-in-receipts

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Or build and preview production build
npm run build
npm run preview
```

---

## 🛠️ Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Neo-Skeuomorphic Thermal Paper Textures
- **Visuals & Network Graph**: HTML5 Canvas 2D Force-Directed Graph
- **Sound Engine**: Web Audio API (Procedural Oscillators & Noise Buffers)
- **Icons**: Lucide React
- **Exporting**: html2canvas + canvas-confetti
- **Backend**: Zero (100% Client-Side Frontend)
