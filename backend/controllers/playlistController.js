const Playlist = require('../models/Playlist');
const Video = require('../models/Video');

exports.createPlaylist = async (req, res) => {
  try {
    const { title, description } = req.body;
    const playlist = new Playlist({
      user: req.user._id,
      title,
      description
    });
    await playlist.save();
    res.status(201).json({ message: "Playlist created", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addVideoToPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if(!playlist) return res.status(404).json({ message: "Playlist not found" });

    const video = await Video.findById(videoId);
    if(!video) return res.status(404).json({ message: "Video not found" });

    playlist.videos.push(videoId);
    await playlist.save();

    res.json({ message: "Video added to playlist", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
