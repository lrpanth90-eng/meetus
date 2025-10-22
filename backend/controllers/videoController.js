const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const video = new Video({
      creator: req.user._id,
      title,
      description,
      tags,
      url: req.file ? req.file.path : "",
      thumbnail: req.body.thumbnail
    });
    await video.save();
    res.status(201).json({ message: "Video uploaded", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
