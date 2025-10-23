// Markets data
const markets = [
  {
    id: 'market-1',
    name: 'AI Music Production Tools',
    category: 'Technology',
    opportunityScore: 92,
    blueOcean: true,
    marketSize: '$2.4B',
    growthRate: '34% YoY',
    competition: 'Low',
    description: 'AI-powered tools for music creation, mixing, and mastering',
    keyInsights: [
      'Growing demand for accessible music production',
      'AI reducing traditional barriers to entry',
      'Strong creator economy momentum',
      'Underserved beginner-to-intermediate market'
    ],
    targetAudience: 'Aspiring musicians, bedroom producers, content creators',
    painPoints: [
      'Expensive traditional DAWs',
      'Steep learning curve for production',
      'Limited access to professional mixing/mastering',
      'Time-intensive production workflows'
    ],
    matchedInfluencers: ['inf-1', 'inf-4', 'inf-3'],
    trendData: [
      { month: 'Jan', interest: 65 },
      { month: 'Feb', interest: 68 },
      { month: 'Mar', interest: 72 },
      { month: 'Apr', interest: 75 },
      { month: 'May', interest: 81 },
      { month: 'Jun', interest: 88 }
    ]
  },
  {
    id: 'market-2',
    name: 'Sustainable Gaming Peripherals',
    category: 'Gaming',
    opportunityScore: 85,
    blueOcean: true,
    marketSize: '$1.8B',
    growthRate: '28% YoY',
    competition: 'Medium',
    description: 'Eco-friendly gaming keyboards, mice, and accessories',
    keyInsights: [
      'Rising environmental consciousness in gaming',
      'Gen Z willing to pay premium for sustainability',
      'Major brands slow to adapt',
      'Strong community advocacy potential'
    ],
    targetAudience: 'Eco-conscious gamers, streaming community, Gen Z',
    painPoints: [
      'E-waste concerns from frequent upgrades',
      'Lack of sustainable options in premium tier',
      'Greenwashing skepticism',
      'Performance vs. sustainability tradeoff perception'
    ],
    matchedInfluencers: ['inf-2', 'inf-5'],
    trendData: [
      { month: 'Jan', interest: 58 },
      { month: 'Feb', interest: 62 },
      { month: 'Mar', interest: 65 },
      { month: 'Apr', interest: 70 },
      { month: 'May', interest: 74 },
      { month: 'Jun', interest: 79 }
    ]
  },
  {
    id: 'market-3',
    name: 'Micro-Learning for Musicians',
    category: 'Education',
    opportunityScore: 88,
    blueOcean: false,
    marketSize: '$3.1B',
    growthRate: '41% YoY',
    competition: 'Medium',
    description: 'Bite-sized music theory and instrument lessons',
    keyInsights: [
      'Attention span shifting toward short-form content',
      'TikTok/Instagram creating new learning behaviors',
      'Traditional music education too time-intensive',
      'Mobile-first learning on the rise'
    ],
    targetAudience: 'Casual learners, working professionals, social media natives',
    painPoints: [
      'No time for traditional lessons',
      'Expensive one-on-one instruction',
      'Boring theory-heavy curricula',
      'Lack of immediate gratification'
    ],
    matchedInfluencers: ['inf-3', 'inf-1'],
    trendData: [
      { month: 'Jan', interest: 71 },
      { month: 'Feb', interest: 74 },
      { month: 'Mar', interest: 78 },
      { month: 'Apr', interest: 82 },
      { month: 'May', interest: 85 },
      { month: 'Jun', interest: 89 }
    ]
  }
];

// Influencers data
const influencers = [
  {
    id: 'inf-1',
    name: 'Sarah "BeatsByAI" Chen',
    platform: 'TikTok',
    handle: '@beatsbyai',
    followers: 485000,
    engagement: 8.2,
    niche: 'AI Music Production',
    avatar: '🎵',
    overallScore: 94,
    bio: 'Teaching bedroom producers to make pro-quality beats with AI tools',
    location: 'Los Angeles, CA',
    ageRange: '25-34',
    audienceDemographics: {
      age: { '18-24': 35, '25-34': 45, '35-44': 15, '45+': 5 },
      gender: { male: 62, female: 36, other: 2 },
      topLocations: ['United States', 'United Kingdom', 'Canada', 'Australia']
    },
    contentStyle: ['Educational', 'Tutorial', 'Behind-the-scenes', 'Product reviews'],
    postingFrequency: '5-7 times/week',
    avgViews: 125000,
    topPosts: [
      { title: 'I made a hit using ONLY AI tools', views: 2100000, likes: 340000 },
      { title: 'AI vs Human: Can you tell the difference?', views: 1800000, likes: 290000 },
      { title: 'Free AI tools every producer needs', views: 950000, likes: 180000 }
    ],
    brandPartnerships: ['Splice', 'LANDR', 'iZotope'],
    councilRatings: {
      musicalDNA: { score: 96, reasoning: 'Perfect alignment with user\'s electronic/indie taste. Frequently features artists like Tame Impala and MGMT in content.' },
      vibeCheck: { score: 93, reasoning: 'Authentic, enthusiastic teaching style. Strong community engagement. No red flags in comment sentiment analysis.' },
      audienceIntel: { score: 95, reasoning: 'Audience perfectly matches target demo: 25-34, tech-savvy, aspiring creators with disposable income.' },
      trendmaster: { score: 92, reasoning: 'Early adopter of AI music tools. Content velocity aligns with trend growth curves. Momentum score: 89/100.' }
    },
    estimatedReach: 125000,
    costEstimate: '$3,500 - $5,000 per post',
    collaborationIdeas: [
      'AI tool tutorial series',
      'Before/after production showcases',
      'Live beat-making challenges',
      'Discount code for tool subscription'
    ]
  },
  {
    id: 'inf-2',
    name: 'Marcus "EcoGamer" Thompson',
    platform: 'YouTube',
    handle: '@ecogamerofficial',
    followers: 320000,
    engagement: 6.8,
    niche: 'Sustainable Gaming',
    avatar: '🌱',
    overallScore: 87,
    bio: 'Proving you can game hard while caring for the planet',
    location: 'Portland, OR',
    ageRange: '22-28',
    audienceDemographics: {
      age: { '18-24': 48, '25-34': 38, '35-44': 10, '45+': 4 },
      gender: { male: 71, female: 27, other: 2 },
      topLocations: ['United States', 'Germany', 'Sweden', 'Netherlands']
    },
    contentStyle: ['Product reviews', 'Gaming streams', 'Sustainability vlogs', 'Tech teardowns'],
    postingFrequency: '3-4 times/week',
    avgViews: 85000,
    topPosts: [
      { title: 'I built a ZERO-waste gaming setup', views: 1200000, likes: 95000 },
      { title: 'Are "eco" gaming brands lying to you?', views: 890000, likes: 72000 },
      { title: 'Sustainable RGB? It exists!', views: 650000, likes: 51000 }
    ],
    brandPartnerships: ['Logitech', 'Razer', 'Patagonia'],
    councilRatings: {
      musicalDNA: { score: 72, reasoning: 'Limited music content overlap, but shares similar artists in stream playlists (Odesza, Porter Robinson).' },
      vibeCheck: { score: 91, reasoning: 'Highly authentic voice in sustainability space. Strong values alignment. Community trusts product recommendations.' },
      audienceIntel: { score: 89, reasoning: 'Audience skews young, progressive, higher income. Strong overlap with eco-conscious tech buyers.' },
      trendmaster: { score: 86, reasoning: 'Well-positioned in growing sustainability niche. Consistent growth trajectory over 18 months.' }
    },
    estimatedReach: 85000,
    costEstimate: '$4,000 - $6,500 per video',
    collaborationIdeas: [
      'Eco-peripheral unboxing and review',
      'Gaming setup sustainability audit',
      'Long-term durability testing',
      'Carbon offset partnership announcement'
    ]
  },
  {
    id: 'inf-3',
    name: 'Luna "5MinMusic" Rodriguez',
    platform: 'Instagram',
    handle: '@5minmusic',
    followers: 267000,
    engagement: 9.1,
    niche: 'Quick Music Lessons',
    avatar: '🎸',
    overallScore: 91,
    bio: 'Learn an instrument in the time it takes to scroll',
    location: 'Austin, TX',
    ageRange: '24-30',
    audienceDemographics: {
      age: { '18-24': 42, '25-34': 41, '35-44': 13, '45+': 4 },
      gender: { male: 48, female: 50, other: 2 },
      topLocations: ['United States', 'Brazil', 'Mexico', 'Spain']
    },
    contentStyle: ['Educational', 'Quick tips', 'Song tutorials', 'Practice challenges'],
    postingFrequency: '6-8 times/week',
    avgViews: 95000,
    topPosts: [
      { title: 'Learn this riff in 60 seconds', views: 1500000, likes: 310000 },
      { title: 'Why you\'re practicing guitar WRONG', views: 1100000, likes: 245000 },
      { title: '5 chords = 100 songs', views: 980000, likes: 201000 }
    ],
    brandPartnerships: ['Fender', 'Yousician', 'Ernie Ball'],
    councilRatings: {
      musicalDNA: { score: 94, reasoning: 'Strong indie/alternative coverage. Recent content featured Mac DeMarco and The Strokes - direct overlap with user taste.' },
      vibeCheck: { score: 89, reasoning: 'Encouraging, patient teaching style. Positive community. Minor concern: occasional overpromising in video titles.' },
      audienceIntel: { score: 93, reasoning: 'Highly engaged audience of aspiring musicians. Strong purchase intent signals in comments and polls.' },
      trendmaster: { score: 88, reasoning: 'Capitalizing on short-form education trend. Steady growth, but not explosive. Sustainable trajectory.' }
    },
    estimatedReach: 95000,
    costEstimate: '$2,800 - $4,200 per post',
    collaborationIdeas: [
      '5-minute AI music production series',
      'Challenge: Make a beat in 5 minutes',
      'AI tool vs traditional method comparison',
      'Follower collaboration contest'
    ]
  },
  {
    id: 'inf-4',
    name: 'DJ Pulse',
    platform: 'TikTok',
    handle: '@djpulseofficial',
    followers: 412000,
    engagement: 7.5,
    niche: 'Electronic Music Production',
    avatar: '🎧',
    overallScore: 89,
    bio: 'From laptop to main stage - electronic music production tips',
    location: 'Berlin, Germany',
    ageRange: '26-32',
    audienceDemographics: {
      age: { '18-24': 52, '25-34': 38, '35-44': 8, '45+': 2 },
      gender: { male: 69, female: 29, other: 2 },
      topLocations: ['Germany', 'United States', 'United Kingdom', 'Netherlands']
    },
    contentStyle: ['Production tips', 'Gear reviews', 'Live sets', 'Studio tours'],
    postingFrequency: '4-6 times/week',
    avgViews: 110000,
    topPosts: [
      { title: 'Techno drop everyone is using', views: 1800000, likes: 295000 },
      { title: 'My festival-ready production chain', views: 1300000, likes: 218000 },
      { title: 'Free VST that sounds like Serum', views: 920000, likes: 167000 }
    ],
    brandPartnerships: ['Native Instruments', 'Ableton', 'Pioneer DJ'],
    councilRatings: {
      musicalDNA: { score: 88, reasoning: 'Electronic focus aligns with user preferences. Some overlap with user\'s techno/house listening habits.' },
      vibeCheck: { score: 87, reasoning: 'Professional, credible presence. Well-respected in EDM community. Minimal controversial content.' },
      audienceIntel: { score: 91, reasoning: 'Audience consists of serious producers willing to invest in tools. High-value demographic.' },
      trendmaster: { score: 90, reasoning: 'Excellent timing on production trends. Early coverage of AI tools in electronic music space.' }
    },
    estimatedReach: 110000,
    costEstimate: '$3,800 - $5,500 per post',
    collaborationIdeas: [
      'AI-powered mixing/mastering walkthrough',
      'Old workflow vs AI-enhanced workflow',
      'Integration with existing DAW tutorial',
      'Live Q&A about AI in production'
    ]
  },
  {
    id: 'inf-5',
    name: 'GreenStream Gaming',
    platform: 'Twitch',
    handle: 'greenstreamgaming',
    followers: 198000,
    engagement: 5.9,
    niche: 'Eco-Gaming Community',
    avatar: '🎮',
    overallScore: 84,
    bio: 'Building the greenest gaming community on Twitch',
    location: 'Vancouver, BC',
    ageRange: '21-27',
    audienceDemographics: {
      age: { '18-24': 58, '25-34': 32, '35-44': 8, '45+': 2 },
      gender: { male: 64, female: 34, other: 2 },
      topLocations: ['Canada', 'United States', 'United Kingdom', 'Australia']
    },
    contentStyle: ['Live streaming', 'Community events', 'Sustainability discussions', 'Charity streams'],
    postingFrequency: '5-6 streams/week',
    avgViews: 8500,
    topPosts: [
      { title: '24hr Eco-Charity Stream', views: 145000, likes: 12400 },
      { title: 'Carbon-neutral gaming setup reveal', views: 98000, likes: 8900 },
      { title: 'Plant a tree for every win challenge', views: 76000, likes: 7100 }
    ],
    brandPartnerships: ['TeamTrees', 'Xbox', 'SteelSeries'],
    councilRatings: {
      musicalDNA: { score: 68, reasoning: 'Limited direct music connection, but plays indie/electronic in streams occasionally.' },
      vibeCheck: { score: 92, reasoning: 'Extremely authentic sustainability advocate. Strong community values. High trust factor.' },
      audienceIntel: { score: 86, reasoning: 'Younger audience, strong environmental values. Moderate purchasing power but high brand loyalty.' },
      trendmaster: { score: 81, reasoning: 'Positioned in growing niche but slower growth rate. Consistent rather than explosive.' }
    },
    estimatedReach: 8500,
    costEstimate: '$2,000 - $3,500 per stream integration',
    collaborationIdeas: [
      'Eco-peripheral showcase stream',
      'Sustainability discussion panel',
      'Community poll on eco-features',
      'Tree-planting partnership announcement'
    ]
  }
];

module.exports = {
  markets,
  influencers
};
