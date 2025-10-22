const Monetization = require('../models/Monetization');
const Transaction = require('../models/Transaction');

exports.getEarnings = async (req, res) => {
  try {
    const earnings = await Monetization.findOne({ creator: req.user._id });
    res.json({ totalEarnings: earnings ? earnings.revenue : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestPayout = async (req, res) => {
  try {
    const { amount } = req.body;
    const earnings = await Monetization.findOne({ creator: req.user._id });

    if(!earnings || earnings.revenue < amount) return res.status(400).json({ message: "Insufficient balance" });

    earnings.revenue -= amount;
    await earnings.save();

    const transaction = new Transaction({
      user: req.user._id,
      amount,
      type: "debit",
      description: "Payout request"
    });
    await transaction.save();

    res.json({ message: "Payout requested successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
