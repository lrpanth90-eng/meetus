const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const transaction = new Transaction({
      user: req.user._id,
      amount,
      type,
      description
    });
    await transaction.save();
    res.status(201).json({ message: "Transaction recorded", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
