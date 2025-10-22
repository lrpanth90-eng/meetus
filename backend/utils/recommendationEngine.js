const Video = require("../models/Video");

/**
 * Recommend videos based on category and popularity
 */
const getRecommendedVideos = async (userId, limit = 10) => {
  // Example: top 10 popular videos
  const videos = await Video.find().sort({ views: -1 }).limit(limit);
  return videos;
};

module.exports = { getRecommendedVideos };
