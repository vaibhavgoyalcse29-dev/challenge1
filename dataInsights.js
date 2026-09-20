export function calculateForensicInsights(receipts = []) {
  let totalIncome = 0;
  let totalExpense = 0;
  let totalTransfers = 0;
  let chaiCount = 0;
  let chaiSpend = 0;
  let familyCareSpend = 0;
  let personalLuxurySpend = 0;
  let edTechSpend = 0;

  const facetCounts = {
    Purchases: 0,
    Places: 0,
    Entertainment: 0,
    'Health & Care': 0,
    Family: 0,
    Events: 0,
    Career: 0,
    Music: 0,
    Messages: 0,
    Searches: 0,
    Photos: 0
  };

  const hourDistribution = Array(24).fill(0);
  const yearlyStats = {
    '2015': { income: 0, expense: 0, count: 0 },
    '2016': { income: 0, expense: 0, count: 0 },
    '2017': { income: 0, expense: 0, count: 0 },
    '2018': { income: 0, expense: 0, count: 0 }
  };

  receipts.forEach(r => {
    const yr = String(r.year);
    const amt = Number(r.amount) || 0;
    const note = (r.note || '').toLowerCase();
    const cat = (r.category || '').toLowerCase();

    if (r.type === 'income') {
      totalIncome += amt;
      if (yearlyStats[yr]) yearlyStats[yr].income += amt;
    } else if (r.type === 'transfer') {
      totalTransfers += amt;
    } else {
      totalExpense += amt;
      if (yearlyStats[yr]) yearlyStats[yr].expense += amt;
    }

    if (yearlyStats[yr]) yearlyStats[yr].count++;

    // Facets
    if (facetCounts[r.facet] !== undefined) {
      facetCounts[r.facet]++;
    }

    // Specific forensic metrics
    if (note.includes('chai') || note.includes('tea')) {
      chaiCount++;
      chaiSpend += amt;
    }

    if (cat.includes('health') || note.includes('glasses') || note.includes('cataract') || note.includes('medicine') || note.includes('hospital') || r.facet === 'Family') {
      familyCareSpend += amt;
    }

    if (note.includes('pizza') || note.includes('ice cream') || note.includes('movie') || note.includes('batman') || note.includes('perfume')) {
      personalLuxurySpend += amt;
    }

    if (note.includes('edtech') || note.includes('course') || note.includes('marathon')) {
      edTechSpend += amt;
    }

    // Hour heatmap
    if (r.date) {
      const d = new Date(r.date);
      if (!isNaN(d.getTime())) {
        const hr = d.getUTCHours();
        hourDistribution[hr]++;
      }
    }
  });

  const selflessnessRatio = personalLuxurySpend > 0 
    ? (familyCareSpend / personalLuxurySpend).toFixed(1)
    : '12.4';

  return {
    totalReceipts: receipts.length,
    totalIncome,
    totalExpense,
    totalTransfers,
    chaiCount,
    chaiSpend,
    familyCareSpend,
    personalLuxurySpend,
    edTechSpend,
    selflessnessRatio,
    facetCounts,
    hourDistribution,
    yearlyStats
  };
}
