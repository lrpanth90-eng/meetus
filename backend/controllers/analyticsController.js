const Analytics = require('../models/Analytics');
const Video = require('../models/Video');

exports.getVideoAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({ video: req.params.videoId })
      .populate('video', 'title url');

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopVideos = async (req, res) => {
  try {
    const topVideos = await Analytics.aggregate([
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $lookup: {
          from: "videos",
          localField: "video",
          foreignField: "_id",
          as: "videoDetails"
      }},
      { $unwind: "$videoDetails" }
    ]);

    res.json(topVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
