const LiveStream = require('../models/LiveStream');
const aiVideoEnhancer = require('../utils/aiVideoEnhancer');

exports.enhanceLiveStream = async (req, res) => {
  try {
    const { streamId } = req.body;
    const stream = await LiveStream.findById(streamId);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    const enhancedStream = await aiVideoEnhancer.enhance(stream.url);
    res.json({ message: "Stream enhanced", enhancedStream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
