const LiveStream = require('../models/LiveStream');

exports.addSuperChat = async (req, res) => {
  try {
    const { streamId, amount, message } = req.body;
    const stream = await LiveStream.findById(streamId);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    stream.superChats.push({ user: req.user._id, amount, message });
    await stream.save();
    res.json({ message: "Super Chat added", stream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
