export function synthesizeBehavior(receipts = []) {
  const categoryCounts = {};
  const hourCounts = Array(24).fill(0);
  let totalSpend = 0;

  receipts.forEach((receipt) => {
    const category = receipt.subcategory || receipt.category || 'Uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    totalSpend += Number(receipt.amount) || 0;
    const date = new Date(receipt.date);
    if (!Number.isNaN(date.getTime())) hourCounts[date.getUTCHours()] += 1;
  });

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0] || ['activity', 0];
  const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
  return {
    totalRecords: receipts.length,
    totalSpend,
    topCategory: topCategory[0],
    topCategoryCount: topCategory[1],
    peakHour,
    peakWindow: `${String(peakHour).padStart(2, '0')}:00–${String((peakHour + 1) % 24).padStart(2, '0')}:00`,
    connectedRecords: receipts.filter((receipt) => receipt.connectedSong || receipt.connectedLocation || receipt.connectedMessage).length
  };
}
