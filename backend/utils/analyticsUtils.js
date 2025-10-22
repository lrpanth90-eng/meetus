const Video = require("../models/Video");
const User = require("../models/User");
const Subscription = require("../models/Subscription");

/**
 * Increment video view count
 * @param {String} videoId
 */
const incrementVideoViews = async (videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) throw new Error("Video not found");
    video.views = (video.views || 0) + 1;
    await video.save();
    return video.views;
  } catch (err) {
    console.error("incrementVideoViews error:", err.message);
    throw err;
  }
};

/**
 * Get creator analytics
 * @param {String} creatorId
 */
const getCreatorAnalytics = async (creatorId) => {
  try {
    const videos = await Video.find({ uploadedBy: creatorId });
    const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
    const totalVideos = videos.length;

    const subscribers = await Subscription.countDocuments({ subscribedTo: creatorId });

    return {
      totalViews,
      totalVideos,
      subscribers,
    };
  } catch (err) {
    console.error("getCreatorAnalytics error:", err.message);
    throw err;
  }
};

/**
 * Get top trending videos
 * @param {Number} limit
 */
const getTrendingVideos = async (limit = 10) => {
  try {
    const videos = await Video.find().sort({ views: -1 }).limit(limit);
    return videos;
  } catch (err) {
    console.error("getTrendingVideos error:", err.message);
    throw err;
  }
};

module.exports = { incrementVideoViews, getCreatorAnalytics, getTrendingVideos };
