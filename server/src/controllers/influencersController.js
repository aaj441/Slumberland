const { influencers } = require('../data/mockData');

// Get all influencers
const getAllInfluencers = (req, res) => {
  try {
    res.json({
      success: true,
      count: influencers.length,
      data: influencers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single influencer by ID
const getInfluencerById = (req, res) => {
  try {
    const influencer = influencers.find(i => i.id === req.params.id);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found'
      });
    }

    res.json({
      success: true,
      data: influencer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get filtered influencers
const getFilteredInfluencers = (req, res) => {
  try {
    const { platform, minFollowers, minEngagement, niche } = req.query;

    let filteredInfluencers = [...influencers];

    if (platform) {
      filteredInfluencers = filteredInfluencers.filter(i => i.platform === platform);
    }

    if (minFollowers) {
      filteredInfluencers = filteredInfluencers.filter(i => i.followers >= parseInt(minFollowers));
    }

    if (minEngagement) {
      filteredInfluencers = filteredInfluencers.filter(i => i.engagement >= parseFloat(minEngagement));
    }

    if (niche) {
      filteredInfluencers = filteredInfluencers.filter(i => i.niche === niche);
    }

    res.json({
      success: true,
      count: filteredInfluencers.length,
      data: filteredInfluencers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get influencers by market ID
const getInfluencersByMarket = (req, res) => {
  try {
    const { markets } = require('../data/mockData');
    const market = markets.find(m => m.id === req.params.marketId);

    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found'
      });
    }

    const matchedInfluencers = influencers.filter(i =>
      market.matchedInfluencers.includes(i.id)
    );

    res.json({
      success: true,
      count: matchedInfluencers.length,
      data: matchedInfluencers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getAllInfluencers,
  getInfluencerById,
  getFilteredInfluencers,
  getInfluencersByMarket
};
