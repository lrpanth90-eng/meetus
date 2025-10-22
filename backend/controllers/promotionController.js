const Promotion = require('../models/Promotion');
const BrandDeal = require('../models/BrandDeal');

exports.createPromotion = async (req, res) => {
  try {
    const { title, brand, amount, duration } = req.body;
    const promotion = new Promotion({
      creator: req.user._id,
      title,
      brand,
      amount,
      duration
    });
    await promotion.save();
    res.status(201).json({ message: "Promotion created", promotion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({ creator: req.user._id });
    res.json({ promotions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
