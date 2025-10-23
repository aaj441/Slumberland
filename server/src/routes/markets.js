const express = require('express');
const router = express.Router();
const {
  getAllMarkets,
  getMarketById,
  getFilteredMarkets
} = require('../controllers/marketsController');

// @route   GET /api/markets
// @desc    Get all markets or filtered markets
// @access  Public
router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    getFilteredMarkets(req, res);
  } else {
    getAllMarkets(req, res);
  }
});

// @route   GET /api/markets/:id
// @desc    Get single market by ID
// @access  Public
router.get('/:id', getMarketById);

module.exports = router;
