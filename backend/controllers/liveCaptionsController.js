const LiveStream = require('../models/LiveStream');

exports.addCaptions = async (req, res) => {
  try {
    const { streamId, captions } = req.body;
    const stream = await LiveStream.findById(streamId);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    stream.captions = captions;
    await stream.save();
    res.json({ message: "Captions added", stream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
