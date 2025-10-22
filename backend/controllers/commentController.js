const Comment = require('../models/Comment');
const Video = require('../models/Video');

exports.addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const video = await Video.findById(videoId);
    if(!video) return res.status(404).json({ message: "Video not found" });

    const comment = new Comment({
      user: req.user._id,
      video: videoId,
      text
    });
    await comment.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate('user', 'name avatar');
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
