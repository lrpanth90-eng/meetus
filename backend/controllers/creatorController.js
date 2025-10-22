const User = require('../models/User');
const Video = require('../models/Video');
const Monetization = require('../models/Monetization');

exports.getCreatorDashboard = async (req, res) => {
  try {
    const videos = await Video.find({ creator: req.user._id });
    const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
    const earnings = await Monetization.findOne({ creator: req.user._id });

    res.json({
      videos,
      totalViews,
      totalEarnings: earnings ? earnings.revenue : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestKYC = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.kycRequested = true;
    await user.save();
    res.json({ message: "KYC request submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
