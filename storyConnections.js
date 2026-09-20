export const CONNECTION_THREADS = [
  {
    id: "thread-marathon",
    title: "The 21K Marathon Odyssey",
    tagline: "From sedentary desk coder to crossing the finish line",
    accentColor: "#10b981",
    centerNodeId: "node-marathon-event",
    description: "What looks like a random shoe purchase and an auto fare is actually a 6-month endurance journey across training playlists, nutrition runs, and race-day glory.",
    nodes: [
      { id: "node-marathon-event", label: "Marathon Bib Registration", facet: "Events", icon: "Trophy", date: "Jun 11, 2018", value: "₹1,407", color: "#10b981", size: 36 },
      { id: "node-marathon-shoes", label: "Puma Troy Running Shoes", facet: "Purchases", icon: "ShoppingBag", date: "May 2, 2018", value: "₹2,421", color: "#f59e0b", size: 30 },
      { id: "node-marathon-music", label: "Midnight City (M83) - 130 BPM", facet: "Music", icon: "Headphones", date: "Jul 8, 2018", value: "3.2 hrs", color: "#8b5cf6", size: 28 },
      { id: "node-marathon-place", label: "Decathlon Bandra Store", facet: "Places", icon: "MapPin", date: "Jul 29, 2018", value: "Transit ₹50", color: "#06b6d4", size: 24 },
      { id: "node-marathon-fuel", label: "Electrolyte & Banana Fuel", facet: "Purchases", icon: "Utensils", date: "Jun 14, 2018", value: "₹45", color: "#f59e0b", size: 22 },
      { id: "node-marathon-search", label: "Search: 'Half marathon hydration'", facet: "Searches", icon: "Search", date: "May 20, 2018", value: "Query", color: "#3b82f6", size: 24 },
      { id: "node-marathon-msg", label: "Message: '54 mins 10K! Medal secured!'", facet: "Messages", icon: "MessageSquare", date: "Jul 15, 2018", value: "Chat", color: "#ec4899", size: 26 },
      { id: "node-marathon-photo", label: "Photo: Finish Line Bib #4182", facet: "Photos", icon: "Camera", date: "Aug 12, 2018", value: "Memory", color: "#e11d48", size: 26 },
      { id: "node-marathon-celebrate", label: "Domino's Post-Race Feast", facet: "Purchases", icon: "Pizza", date: "Aug 31, 2018", value: "₹510", color: "#f59e0b", size: 24 }
    ],
    links: [
      { source: "node-marathon-event", target: "node-marathon-shoes", label: "Gear Up" },
      { source: "node-marathon-event", target: "node-marathon-music", label: "Pacing Track" },
      { source: "node-marathon-event", target: "node-marathon-place", label: "Equipment Trip" },
      { source: "node-marathon-shoes", target: "node-marathon-place", label: "Tested at Store" },
      { source: "node-marathon-event", target: "node-marathon-search", label: "Research Prep" },
      { source: "node-marathon-event", target: "node-marathon-msg", label: "Victory Ping" },
      { source: "node-marathon-event", target: "node-marathon-photo", label: "Captured Moment" },
      { source: "node-marathon-event", target: "node-marathon-celebrate", label: "Post-Race Treat" },
      { source: "node-marathon-shoes", target: "node-marathon-fuel", label: "Morning Routine" }
    ]
  },
  {
    id: "thread-caregiver",
    title: "The Quiet Sacrifice (Father's Eyesight)",
    tagline: "When hospital bills eclipsed personal desires",
    accentColor: "#ef4444",
    centerNodeId: "node-eye-glasses",
    description: "A testament to familial devotion: while living on ₹15 vadapav and ₹30 poha, spending ₹22,700 on Papa's vision restoration and navigating city hospitals.",
    nodes: [
      { id: "node-eye-glasses", label: "Papa's High-Index Glasses", facet: "Purchases", icon: "Eye", date: "Nov 30, 2017", value: "₹22,700", color: "#ef4444", size: 36 },
      { id: "node-eye-surgery", label: "Eye Institute Consultations", facet: "Health & Care", icon: "HeartPulse", date: "Jul 28, 2017", value: "₹3,050", color: "#ec4899", size: 30 },
      { id: "node-eye-drops", label: "MaxMoist & Cataract Medicine", facet: "Health & Care", icon: "Pill", date: "Jul 13, 2018", value: "₹1,358", color: "#ec4899", size: 26 },
      { id: "node-eye-transit", label: "Ola Cabs: Society to Eye Hospital", facet: "Places", icon: "Navigation", date: "Jul 20, 2018", value: "₹188", color: "#06b6d4", size: 24 },
      { id: "node-eye-frugal", label: "Personal Lunch: 2 Vadapav", facet: "Purchases", icon: "Utensils", date: "Jul 21, 2018", value: "₹15", color: "#f59e0b", size: 24 },
      { id: "node-eye-msg", label: "Message: 'Doctor says lens is crystal clear'", facet: "Messages", icon: "MessageSquare", date: "Nov 30, 2017", value: "Family SMS", color: "#10b981", size: 26 },
      { id: "node-eye-photo", label: "Photo: Papa smiling with new specs", facet: "Photos", icon: "Camera", date: "Dec 1, 2017", value: "Family Album", color: "#e11d48", size: 26 },
      { id: "node-eye-song", label: "Born To Die (Lana Del Rey) - 2 AM", facet: "Music", icon: "Headphones", date: "Jul 28, 2017", value: "Late Hospital Ride", color: "#8b5cf6", size: 24 }
    ],
    links: [
      { source: "node-eye-glasses", target: "node-eye-surgery", label: "Prescription Origin" },
      { source: "node-eye-glasses", target: "node-eye-drops", label: "Post-Op Care" },
      { source: "node-eye-glasses", target: "node-eye-transit", label: "Clinic Visits" },
      { source: "node-eye-glasses", target: "node-eye-frugal", label: "Quiet Contrast" },
      { source: "node-eye-glasses", target: "node-eye-msg", label: "Relief Update" },
      { source: "node-eye-glasses", target: "node-eye-photo", label: "Cherished Proof" },
      { source: "node-eye-surgery", target: "node-eye-song", label: "Midnight Ride" }
    ]
  },
  {
    id: "thread-upskilling",
    title: "The Midnight Engineering Sprints",
    tagline: "Chai, EdTech EMIs, & The Jump from 47k to 78k",
    accentColor: "#8b5cf6",
    centerNodeId: "node-upskill-salary",
    description: "Every cutting chai at 1:30 AM and every ₹2,800 course EMI was part of an intentional career catapult that doubled monthly earnings in three years.",
    nodes: [
      { id: "node-upskill-salary", label: "Paycheck Leap: ₹78,298", facet: "Career", icon: "TrendingUp", date: "Nov 1, 2017", value: "₹78,298", color: "#10b981", size: 36 },
      { id: "node-upskill-edtech", label: "EdTech Course EMI", facet: "Education", icon: "GraduationCap", date: "Monthly 2017", value: "₹2,800/mo", color: "#8b5cf6", size: 30 },
      { id: "node-upskill-book", label: "Finding Next Job Guidebook", facet: "Purchases", icon: "BookOpen", date: "Mar 23, 2018", value: "₹100", color: "#f59e0b", size: 26 },
      { id: "node-upskill-headphones", label: "Sony Wireless Earphones", facet: "Purchases", icon: "Headphones", date: "Jul 16, 2018", value: "₹1,190", color: "#06b6d4", size: 24 },
      { id: "node-upskill-chai", label: "2 AM Roadside Cutting Chai", facet: "Purchases", icon: "Coffee", date: "Recurrent", value: "₹10 (x140)", color: "#f59e0b", size: 26 },
      { id: "node-upskill-booster", label: "Late-Night Data Booster Pack", facet: "Entertainment", icon: "Wifi", date: "May 18, 2018", value: "₹301", color: "#ec4899", size: 22 },
      { id: "node-upskill-music", label: "Time To Pretend (MGMT) Flow", facet: "Music", icon: "Music", date: "Oct 12, 2017", value: "Repeat x12", color: "#8b5cf6", size: 24 },
      { id: "node-upskill-search", label: "Search: 'Distributed systems roadmap'", facet: "Searches", icon: "Search", date: "Apr 4, 2018", value: "Google Query", color: "#3b82f6", size: 24 }
    ],
    links: [
      { source: "node-upskill-salary", target: "node-upskill-edtech", label: "Knowledge Dividend" },
      { source: "node-upskill-salary", target: "node-upskill-book", label: "Interview Success" },
      { source: "node-upskill-edtech", target: "node-upskill-headphones", label: "Focus Tool" },
      { source: "node-upskill-edtech", target: "node-upskill-chai", label: "Night Fuel" },
      { source: "node-upskill-edtech", target: "node-upskill-booster", label: "Bandwidth" },
      { source: "node-upskill-chai", target: "node-upskill-music", label: "Deep Coding Flow" },
      { source: "node-upskill-book", target: "node-upskill-search", label: "Preparation" }
    ]
  },
  {
    id: "thread-family",
    title: "The Unbroken Family Pillar",
    tagline: "The 1st-of-the-month wire transfer ritual & home gifts",
    accentColor: "#f59e0b",
    centerNodeId: "node-family-wire",
    description: "Rain or shine, job switch or bonus, the first transaction of every month was ₹10,000 sent home to parents, punctuated by gifts that transformed their living room.",
    nodes: [
      { id: "node-family-wire", label: "The 1st-of-Month Remittance", facet: "Family", icon: "Send", date: "1st of Every Month", value: "₹10,000 x 44", color: "#f59e0b", size: 36 },
      { id: "node-family-ppf", label: "Public Provident Fund (PPF)", facet: "Career", icon: "PiggyBank", date: "Monthly", value: "₹10,000/mo", color: "#10b981", size: 28 },
      { id: "node-family-washer", label: "LG Automatic Washing Machine", facet: "Purchases", icon: "Home", date: "May 15, 2018", value: "₹21,500", color: "#06b6d4", size: 30 },
      { id: "node-family-inverter", label: "Exide 150Ah Inverter Battery", facet: "Purchases", icon: "Zap", date: "Feb 25, 2017", value: "₹8,500", color: "#ec4899", size: 26 },
      { id: "node-family-saree", label: "Jaipuri Silk Maharani Saree", facet: "Purchases", icon: "Gift", date: "Aug 24, 2017", value: "₹5,200", color: "#e11d48", size: 26 },
      { id: "node-family-bhaiduj", label: "Mi Band 5 (Bhaiduj Gift)", facet: "Events", icon: "Watch", date: "Oct 31, 2016", value: "₹1,999", color: "#8b5cf6", size: 24 },
      { id: "node-family-train", label: "Sevagram Express Train Home", facet: "Places", icon: "Train", date: "Aug 23, 2018", value: "₹1,305", color: "#06b6d4", size: 24 },
      { id: "node-family-msg", label: "SMS: 'Money credited, don't worry about us'", facet: "Messages", icon: "MessageSquare", date: "Monthly", value: "Family Chat", color: "#10b981", size: 24 }
    ],
    links: [
      { source: "node-family-wire", target: "node-family-ppf", label: "Dual Discipline" },
      { source: "node-family-wire", target: "node-family-washer", label: "Home Comfort" },
      { source: "node-family-wire", target: "node-family-inverter", label: "Summer Safeguard" },
      { source: "node-family-wire", target: "node-family-saree", label: "Diwali Love" },
      { source: "node-family-wire", target: "node-family-bhaiduj", label: "Festive Joy" },
      { source: "node-family-wire", target: "node-family-train", label: "Homebound Route" },
      { source: "node-family-wire", target: "node-family-msg", label: "Parental Blessing" }
    ]
  }
];
