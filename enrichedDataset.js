import baseDataset from './dataset.json';

const additions = [
  ['rcpt-extra-1', '2018-09-19T08:20:00.000Z', 'Amazon Pantry grocery order', 1240, 'Purchases', 'E-commerce', 'Online order'],
  ['rcpt-extra-2', '2018-09-18T18:42:00.000Z', 'Uber ride to coworking space', 286, 'Places', 'Ride-hailing', 'Uber'],
  ['rcpt-extra-3', '2018-09-17T05:30:00.000Z', 'Netflix monthly subscription', 499, 'Entertainment', 'Streaming', 'Netflix'],
  ['rcpt-extra-4', '2018-09-16T09:15:00.000Z', 'Electricity bill autopay', 1840, 'Purchases', 'Utilities', 'Electricity'],
  ['rcpt-extra-5', '2018-09-15T13:05:00.000Z', 'Swiggy lunch delivery', 378, 'Purchases', 'Food delivery', 'Swiggy'],
  ['rcpt-extra-6', '2018-09-14T21:45:00.000Z', 'Spotify Premium renewal', 119, 'Entertainment', 'Streaming', 'Spotify'],
  ['rcpt-extra-7', '2018-09-13T07:40:00.000Z', 'Family pharmacy order', 735, 'Family', 'Healthcare', 'Pharmacy'],
  ['rcpt-extra-8', '2018-09-12T19:25:00.000Z', 'Uber ride home', 214, 'Places', 'Ride-hailing', 'Uber'],
  ['rcpt-extra-9', '2018-09-11T11:10:00.000Z', 'Flipkart headphones order', 1899, 'Purchases', 'E-commerce', 'Flipkart'],
  ['rcpt-extra-10', '2018-09-10T06:55:00.000Z', 'Mobile data utility recharge', 349, 'Purchases', 'Utilities', 'Telecom'],
  ['rcpt-extra-11', '2018-09-09T22:30:00.000Z', 'YouTube Music subscription', 129, 'Entertainment', 'Streaming', 'YouTube Music'],
  ['rcpt-extra-12', '2018-09-08T08:35:00.000Z', 'Parents household transfer', 5000, 'Family', 'Family support', 'Bank transfer']
  ,['life-log-1', '2018-09-07T10:10:00.000Z', 'Library checkout: Designing Data-Intensive Applications', 0, 'Career', 'Library checkout', 'City library'],
  ['life-log-2', '2018-09-06T23:58:00.000Z', 'GitHub commit streak: receipt story prototype', 0, 'Career', 'GitHub commit', 'GitHub'],
  ['life-log-3', '2018-09-05T06:20:00.000Z', 'Boarding pass: Mumbai to Vadodara', 0, 'Places', 'Flight boarding pass', 'IndiGo'],
  ['life-log-4', '2018-09-04T16:35:00.000Z', 'Coffee log: cutting chai before deployment', 45, 'Places', 'Coffee log', 'Local chai stall'],
  ['life-log-5', '2018-09-03T20:15:00.000Z', 'GitHub commit: constellation connection engine', 0, 'Career', 'GitHub commit', 'GitHub'],
  ['life-log-6', '2018-09-02T12:40:00.000Z', 'Library checkout: The Art of Statistics', 0, 'Career', 'Library checkout', 'City library']
].map(([id, date, note, amount, facet, subcategory, merchant]) => ({
  id,
  date,
  displayDate: new Date(date).toLocaleString('en-IN'),
  year: new Date(date).getUTCFullYear(),
  mode: 'Digital',
  category: subcategory,
  subcategory,
  note,
  amount,
  type: amount ? 'expense' : 'activity',
  currency: 'INR',
  facet,
  mood: facet === 'Family' ? 'Devotion' : facet === 'Entertainment' ? 'Late Night Hustle' : 'Growth',
  stamp: null,
  storyTag: 'ENRICHED_RECORD',
  icon: 'Receipt',
  merchant,
  connectedSong: null,
  connectedLocation: null,
  connectedPhoto: null,
  connectedSearch: null,
  connectedMessage: null
}));

export default [...baseDataset, ...additions];
