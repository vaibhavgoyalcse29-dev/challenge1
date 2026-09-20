const fs = require('fs');

const copy = (source, target) => {
  fs.mkdirSync(target.substring(0, target.lastIndexOf('/')), { recursive: true });
  fs.copyFileSync(source, target);
};

[
  ['main.jsx', 'src/main.jsx'],
  ['App.jsx', 'src/App.jsx'],
  ['index.css', 'src/index.css'],
  ['glass-parallax.css', 'src/glass-parallax.css'],
  ['ParallaxBackground.jsx', 'src/ParallaxBackground.jsx'],
  ['ScrollReveal.jsx', 'src/ScrollReveal.jsx'],
  ['ScrollReveal.jsx', 'src/components/ScrollReveal.jsx'],
  ['MemoryCursor.jsx', 'src/components/MemoryCursor.jsx'],
  ['PatternLab.jsx', 'src/components/PatternLab.jsx'],
  ['AnalyticsSummary.jsx', 'src/components/AnalyticsSummary.jsx'],
  ['GuidedTour.jsx', 'src/components/GuidedTour.jsx'],
  ['CinematicReplay.jsx', 'src/components/CinematicReplay.jsx'],
  ['ConstellationGraph.jsx', 'src/components/ConstellationGraph.jsx'],
  ['DatasetUploader.jsx', 'src/components/DatasetUploader.jsx'],
  ['Header.jsx', 'src/components/Header.jsx'],
  ['Navbar.jsx', 'src/components/Navbar.jsx'],
  ['DatasheetVault.jsx', 'src/components/DatasheetVault.jsx'],
  ['ConstellationMap.jsx', 'src/components/ConstellationMap.jsx'],
  ['StoryChapters.jsx', 'src/components/StoryChapters.jsx'],
  ['AiSynthesizerModal.jsx', 'src/components/AiSynthesizerModal.jsx'],
  ['WelcomePanel.jsx', 'src/components/WelcomePanel.jsx'],
  ['LifeAuditor.jsx', 'src/components/LifeAuditor.jsx'],
  ['PrintableReceipt.jsx', 'src/components/PrintableReceipt.jsx'],
  ['ReceiptCard.jsx', 'src/components/ReceiptCard.jsx'],
  ['ReceiptModal.jsx', 'src/components/ReceiptModal.jsx'],
  ['StoryScrapbook.jsx', 'src/components/StoryScrapbook.jsx'],
  ['ThermalRollView.jsx', 'src/components/ThermalRollView.jsx'],
  ['dataInsights.js', 'src/data/dataInsights.js'],
  ['dataset.json', 'src/data/dataset.json'],
  ['storyChapters.js', 'src/data/storyChapters.js'],
  ['storyConnections.js', 'src/data/storyConnections.js'],
  ['enrichedDataset.js', 'src/data/enrichedDataset.js'],
  ['behavioralSynthesizer.js', 'src/data/behavioralSynthesizer.js'],
  ['formatters.js', 'src/utils/formatters.js'],
  ['soundEffects.js', 'src/utils/soundEffects.js']
].forEach(([source, target]) => copy(source, target));
