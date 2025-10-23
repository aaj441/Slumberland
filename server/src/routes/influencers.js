const express = require('express');
const router = express.Router();
const {
  getAllInfluencers,
  getInfluencerById,
  getFilteredInfluencers,
  getInfluencersByMarket
} = require('../controllers/influencersController');

// @route   GET /api/influencers
// @desc    Get all influencers or filtered influencers
// @access  Public
router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    getFilteredInfluencers(req, res);
  } else {
    getAllInfluencers(req, res);
  }
});

// @route   GET /api/influencers/market/:marketId
// @desc    Get influencers by market ID
// @access  Public
router.get('/market/:marketId', getInfluencersByMarket);

// @route   GET /api/influencers/:id
// @desc    Get single influencer by ID
// @access  Public
router.get('/:id', getInfluencerById);

module.exports = router;
