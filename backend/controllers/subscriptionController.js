const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res) => {
  try {
    const { creatorId } = req.body;
    const existing = await Subscription.findOne({ user: req.user._id, creator: creatorId });
    if(existing) return res.status(400).json({ message: "Already subscribed" });

    const subscription = new Subscription({ user: req.user._id, creator: creatorId });
    await subscription.save();
    res.status(201).json({ message: "Subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }).populate('creator', 'name avatar');
    res.json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
