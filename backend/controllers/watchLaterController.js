const WatchLater = require('../models/WatchLater');

exports.addToWatchLater = async (req, res) => {
  try {
    const { videoId } = req.body;
    const existing = await WatchLater.findOne({ user: req.user._id, video: videoId });
    if(existing) return res.status(400).json({ message: "Already in watch later" });

    const watchLater = new WatchLater({ user: req.user._id, video: videoId });
    await watchLater.save();
    res.status(201).json({ message: "Added to watch later", watchLater });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWatchLater = async (req, res) => {
  try {
    const list = await WatchLater.find({ user: req.user._id }).populate('video');
    res.json({ list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
