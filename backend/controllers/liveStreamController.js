const LiveStream = require('../models/LiveStream');
const { startStream, stopStream } = require('../utils/liveStreamUtils');

exports.createStream = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newStream = new LiveStream({ creator: req.user._id, title, description });
    await newStream.save();

    // Start streaming server logic
    await startStream(newStream._id);

    res.status(201).json({ message: "Live stream created", stream: newStream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.endStream = async (req, res) => {
  try {
    const stream = await LiveStream.findById(req.params.id);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    await stopStream(stream._id);
    stream.isLive = false;
    await stream.save();

    res.json({ message: "Live stream ended", stream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
