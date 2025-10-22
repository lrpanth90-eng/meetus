const Video = require('../models/Video');
const aiVideoEnhancer = require('../utils/aiVideoEnhancer');

exports.enhanceVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if(!video) return res.status(404).json({ message: "Video not found" });

    // AI enhancement logic
    const enhancedUrl = await aiVideoEnhancer.enhance(video.url);
    video.url = enhancedUrl;
    await video.save();

    res.json({ message: "Video enhanced successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moderateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if(!video) return res.status(404).json({ message: "Video not found" });

    // AI moderation logic
    const moderationResult = await aiVideoEnhancer.moderate(video.url);
    video.isApproved = moderationResult.approved;
    await video.save();

    res.json({ message: "Video moderation completed", moderationResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
