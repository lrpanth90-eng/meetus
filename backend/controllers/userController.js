const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Automatic creator approval based on KYC
exports.requestCreator = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(user.isCreator) return res.status(400).json({ message: "Already a creator" });

    // If KYC provided, auto approve
    if(req.file) {
      user.isCreator = true;
      user.kycDocument = req.file.path;
      await user.save();
      return res.json({ message: "Creator approved", user });
    }

    res.status(400).json({ message: "KYC document required" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
