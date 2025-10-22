const User = require('../models/User');
const Video = require('../models/Video');
const Monetization = require('../models/Monetization');
const Ad = require('../models/Ad');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVideos = await Video.countDocuments();
    const totalAds = await Ad.countDocuments();
    const totalRevenue = await Monetization.aggregate([
      { $group: { _id: null, total: { $sum: "$revenue" } } }
    ]);

    res.json({
      totalUsers,
      totalVideos,
      totalAds,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ message: "User not found" });
    user.isBanned = true;
    await user.save();
    res.json({ message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveCreatorKYC = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ message: "User not found" });
    user.isCreator = true;
    user.kycApproved = true;
    await user.save();
    res.json({ message: "Creator KYC approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
