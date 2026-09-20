const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TRANSACTIONS_PATH = 'C:\\Users\\Vaibhav Goyal\\OneDrive\\Desktop\\Arena1\\archive (1)\\Daily Household Transactions.csv';
const SPOTIFY_PATH = 'C:\\Users\\Vaibhav Goyal\\OneDrive\\Desktop\\Arena1\\archive\\spotify_history.csv';

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseDate(str) {
  if (!str) return null;
  const parts = str.trim().split(' ');
  const dateParts = parts[0].split('/');
  if (dateParts.length !== 3) return null;
  let day = parseInt(dateParts[0], 10);
  let month = parseInt(dateParts[1], 10) - 1;
  let year = parseInt(dateParts[2], 10);
  if (year < 100) year += 2000;

  let hours = 12, mins = 0, secs = 0;
  if (parts[1]) {
    const timeParts = parts[1].split(':');
    hours = parseInt(timeParts[0] || '12', 10);
    mins = parseInt(timeParts[1] || '0', 10);
    secs = parseInt(timeParts[2] || '0', 10);
  }
  const d = new Date(Date.UTC(year, month, day, hours, mins, secs));
  return isNaN(d.getTime()) ? null : d.toISOString();
}

async function run() {
  console.log('Reading transactions...');
  const transRaw = fs.readFileSync(TRANSACTIONS_PATH, 'utf8');
  const transLines = transRaw.split(/\r?\n/).filter(l => l.trim().length > 0);

  console.log('Sampling Spotify history...');
  const spotifyStream = fs.createReadStream(SPOTIFY_PATH);
  const rl = readline.createInterface({ input: spotifyStream, crlfDelay: Infinity });

  const spotifyByYear = { '2015': [], '2016': [], '2017': [], '2018': [] };
  let sCount = 0;
  for await (const line of rl) {
    sCount++;
    if (sCount === 1) continue;
    const parts = parseCSVLine(line);
    const ts = parts[1];
    if (!ts) continue;
    const yr = ts.substring(0, 4);
    if (spotifyByYear[yr] && spotifyByYear[yr].length < 1500) {
      spotifyByYear[yr].push({
        track: parts[4],
        artist: parts[5],
        album: parts[6],
        ts: ts,
        ms: parseInt(parts[3] || '0', 10),
        skipped: parts[10] === 'TRUE'
      });
    }
  }

  const receipts = [];
  let idCounter = 1;

  for (let i = 1; i < transLines.length; i++) {
    const cols = parseCSVLine(transLines[i]);
    if (cols.length < 6) continue;
    const [rawDate, mode, rawCategory, subcategory, note, amountStr, incExp, currency] = cols;
    const isoDate = parseDate(rawDate);
    if (!isoDate) continue;
    const amount = parseFloat(amountStr) || 0;
    const year = isoDate.substring(0, 4);

    let category = rawCategory || 'General';
    let facet = 'Purchases';
    let mood = 'Everyday';
    let stamp = null;
    let storyTag = null;
    let icon = 'Receipt';

    const lowerNote = (note || '').toLowerCase();
    const lowerSub = (subcategory || '').toLowerCase();
    const lowerCat = category.toLowerCase();

    if (lowerCat.includes('salary') || lowerSub.includes('salary') || (lowerCat.includes('saving') && lowerNote.includes('workplace'))) {
      category = 'Salary';
      facet = 'Career';
      mood = 'Victory';
      stamp = 'PAYDAY';
      storyTag = 'Career Milestone';
      icon = 'Coins';
    } else if (lowerCat.includes('train') || lowerCat.includes('transportation') || lowerSub.includes('train') || lowerSub.includes('auto') || lowerSub.includes('taxi') || lowerSub.includes('travels') || lowerSub.includes('bus')) {
      facet = 'Places';
      mood = lowerNote.includes('place 2 to place 1') || lowerNote.includes('brc to mumbai') ? 'Transition' : 'Commute';
      if (lowerNote.includes('sevagram') || lowerNote.includes('amritsar') || lowerNote.includes('mumbai') || lowerNote.includes('planetarium')) {
        storyTag = 'Transit Route';
      }
      icon = 'MapPin';
    } else if (lowerCat.includes('subscription') || lowerSub.includes('netflix') || lowerSub.includes('hotstar') || lowerSub.includes('tata sky') || lowerSub.includes('amazon prime') || lowerCat.includes('culture')) {
      facet = 'Entertainment';
      mood = 'Unwind';
      icon = 'Film';
      if (lowerSub.includes('netflix') || lowerSub.includes('hotstar')) storyTag = 'Screen Time';
    } else if (lowerCat.includes('health') || lowerSub.includes('medicine') || lowerSub.includes('hospital') || lowerNote.includes('cataract') || lowerNote.includes('thyroid') || lowerNote.includes('eye') || lowerNote.includes('dentist')) {
      facet = 'Health & Care';
      mood = 'Caregiver';
      icon = 'HeartPulse';
      if (lowerNote.includes('cataract') || lowerNote.includes('glasses')) {
        stamp = 'FAMILY DUTY';
        storyTag = 'Parental Health';
      }
    } else if (lowerCat.includes('self-development') || lowerCat.includes('education') || lowerSub.includes('marathon') || lowerNote.includes('marathon') || lowerSub.includes('edtech') || lowerNote.includes('finding next job')) {
      facet = 'Events';
      mood = 'Growth';
      stamp = lowerNote.includes('marathon') ? 'MARATHONER' : 'LEVEL UP';
      storyTag = 'Self Improvement';
      icon = 'Trophy';
    } else if (lowerCat.includes('family') || lowerNote.includes('to family') || lowerNote.includes('permanent residence money transfer') || lowerNote.includes('for family') || lowerSub.includes('pocket money')) {
      facet = 'Family';
      mood = 'Devotion';
      stamp = amount >= 10000 ? 'FAMILY PILLAR' : 'KINDNESS';
      storyTag = 'Family Support';
      icon = 'Heart';
    } else if (lowerCat.includes('food') || lowerSub.includes('dinner') || lowerSub.includes('lunch') || lowerSub.includes('snacks') || lowerSub.includes('tea') || lowerSub.includes('chai')) {
      facet = 'Purchases';
      if (lowerNote.includes('chai') || lowerSub.includes('tea')) {
        mood = 'Late Night Hustle';
        storyTag = 'Chai Ritual';
        icon = 'Coffee';
      } else if (lowerNote.includes('vadapav') || lowerSub.includes('snacks')) {
        mood = 'Street Comfort';
        icon = 'Utensils';
      } else {
        mood = 'Nourishment';
        icon = 'ShoppingBag';
      }
    } else if (lowerCat.includes('festivals') || lowerSub.includes('ganesh') || lowerSub.includes('diwali') || lowerSub.includes('rakshabandhan') || lowerSub.includes('navratri')) {
      facet = 'Events';
      mood = 'Celebration';
      stamp = 'FESTIVE';
      storyTag = 'Tradition';
      icon = 'Sparkles';
    } else if (lowerCat.includes('gift')) {
      facet = 'Purchases';
      mood = 'Generosity';
      stamp = 'GIFT OF LOVE';
      storyTag = 'Memorable Gift';
      icon = 'Gift';
    }

    const songs = spotifyByYear[year] || [];
    const songIndex = (i * 17) % (songs.length || 1);
    const matchedSong = songs[songIndex] || { track: 'Midnight City', artist: 'M83', album: "Hurry Up, We're Dreaming" };

    receipts.push({
      id: `rcpt-${idCounter++}`,
      date: isoDate,
      displayDate: rawDate,
      year: parseInt(year, 10),
      mode: mode || 'Cash',
      category: category,
      subcategory: subcategory || '',
      note: note || category,
      amount: amount,
      type: incExp === 'Income' ? 'income' : (incExp === 'Transfer-Out' ? 'transfer' : 'expense'),
      currency: currency || 'INR',
      facet: facet,
      mood: mood,
      stamp: stamp,
      storyTag: storyTag,
      icon: icon,
      connectedSong: {
        track: matchedSong.track,
        artist: matchedSong.artist,
        album: matchedSong.album
      },
      connectedLocation: getConnectedLocation(note, subcategory, category),
      connectedPhoto: getConnectedPhoto(note, category, amount, year),
      connectedSearch: getConnectedSearch(note, category),
      connectedMessage: getConnectedMessage(note, category, amount)
    });
  }

  const outDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'dataset.json'), JSON.stringify(receipts, null, 2), 'utf8');
  console.log(`Saved ${receipts.length} receipts to ${outDir}/dataset.json`);
}

function getConnectedLocation(note, sub, cat) {
  const combined = `${note} ${sub} ${cat}`.toLowerCase();
  if (combined.includes('brc') || combined.includes('baroda')) return { name: 'Vadodara Station / B45', city: 'Vadodara', coords: [22.3072, 73.1812] };
  if (combined.includes('siddhivinayak') || combined.includes('dadar')) return { name: 'Siddhivinayak Temple, Dadar', city: 'Mumbai', coords: [19.0178, 72.8311] };
  if (combined.includes('bandra') || combined.includes('santacruz') || combined.includes('kalina')) return { name: 'Bandra-Santacruz Corridor', city: 'Mumbai', coords: [19.0596, 72.8295] };
  if (combined.includes('eye institute') || combined.includes('hospital')) return { name: 'Regional Eye Institute, Place 6', city: 'Mumbai', coords: [19.0760, 72.8777] };
  if (combined.includes('decathlon')) return { name: 'Decathlon Sports Store', city: 'Mumbai', coords: [19.1136, 72.8697] };
  if (combined.includes('planetarium')) return { name: 'Nehru Planetarium, Worli', city: 'Mumbai', coords: [18.9894, 72.8188] };
  if (combined.includes('airport') || combined.includes('terminal')) return { name: 'Domestic Airport T1', city: 'Mumbai', coords: [19.0896, 72.8656] };
  if (combined.includes('permanent residence')) return { name: 'Family Home, Place 2', city: 'Hometown', coords: [21.0000, 74.0000] };
  return { name: 'Mumbai Metro Transit / Local CHS', city: 'Mumbai', coords: [19.0760, 72.8777] };
}

function getConnectedPhoto(note, cat, amount, year) {
  const combined = `${note} ${cat}`.toLowerCase();
  if (combined.includes('marathon')) return { caption: 'Marathon bib #4182 pinned onto running tee at sunrise', tag: 'FINISHER_MEDAL' };
  if (combined.includes('glasses') || combined.includes('cataract')) return { caption: "Papa smiling after trying on his new high-index anti-glare glasses", tag: 'FAMILY_HEALING' };
  if (combined.includes('shoes') || combined.includes('puma')) return { caption: 'Fresh Puma running shoes unboxed on the dorm floor', tag: 'NEW_HORIZONS' };
  if (combined.includes('saree') || combined.includes('maharani')) return { caption: 'Jaipuri silk saree handpicked for mother for Diwali', tag: 'MOTHERS_SMILE' };
  if (combined.includes('washing machine') || combined.includes('inverter')) return { caption: 'The brand new LG washing machine installed at home', tag: 'COMFORT_UPGRADE' };
  if (combined.includes('cutting chai') || combined.includes('vadapav')) return { caption: 'Steaming glass of roadside cutting chai under the monsoon tin shed', tag: 'DAILY_RITUAL' };
  if (combined.includes('salary') && amount > 65000) return { caption: 'Midnight screenshot of net salary credit notification: ₹70,255', tag: 'CAREER_HIGH' };
  if (combined.includes('planetarium')) return { caption: 'Stargazing dome ticket stubs and cosmic projection brochure', tag: 'WONDER' };
  return null;
}

function getConnectedSearch(note, cat) {
  const combined = `${note} ${cat}`.toLowerCase();
  if (combined.includes('marathon')) return 'half marathon hydration and pacing strategies for beginners';
  if (combined.includes('glasses') || combined.includes('cataract')) return 'post-operative cataract care and eye drop schedule';
  if (combined.includes('edtech') || combined.includes('course')) return 'advanced system design patterns and data structures course review';
  if (combined.includes('finding next job')) return 'salary negotiation tips for senior frontend software engineer';
  if (combined.includes('washing machine')) return 'best fully automatic inverter washing machine for hard water';
  if (combined.includes('chai')) return 'late night tea stalls open near western railway line';
  return null;
}

function getConnectedMessage(note, cat, amount) {
  const combined = `${note} ${cat}`.toLowerCase();
  if (combined.includes('salary')) return 'Papa, this month bonus got credited! Transferring 30,000 for home expenses.';
  if (combined.includes('glasses')) return 'Doctor said the lens power is finalized. Taking Papa to collect the spectacles today.';
  if (combined.includes('marathon')) return 'Finished the 10K in 54 minutes! My legs are dead but totally worth it 🏃‍♂️';
  if (combined.includes('inverter') || combined.includes('battery')) return 'Electrician finished inverter battery fitting. No more power cuts during night study.';
  if (combined.includes('farewell')) return 'Contributed ₹250 for Rohan’s farewell gift. Going to miss this team.';
  return null;
}

run().catch(console.error);
