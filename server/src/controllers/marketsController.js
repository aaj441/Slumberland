const { markets } = require('../data/mockData');

// Get all markets
const getAllMarkets = (req, res) => {
  try {
    res.json({
      success: true,
      count: markets.length,
      data: markets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single market by ID
const getMarketById = (req, res) => {
  try {
    const market = markets.find(m => m.id === req.params.id);

    if (!market) {
      return res.status(404).json({
        success: false,
        error: 'Market not found'
      });
    }

    res.json({
      success: true,
      data: market
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get filtered markets
const getFilteredMarkets = (req, res) => {
  try {
    const { blueOcean, minScore, category } = req.query;

    let filteredMarkets = [...markets];

    if (blueOcean === 'true') {
      filteredMarkets = filteredMarkets.filter(m => m.blueOcean);
    }

    if (minScore) {
      filteredMarkets = filteredMarkets.filter(m => m.opportunityScore >= parseInt(minScore));
    }

    if (category) {
      filteredMarkets = filteredMarkets.filter(m => m.category === category);
    }

    res.json({
      success: true,
      count: filteredMarkets.length,
      data: filteredMarkets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getAllMarkets,
  getMarketById,
  getFilteredMarkets
};
