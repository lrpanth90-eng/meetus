const LiveStream = require('../models/LiveStream');

exports.translateLiveStream = async (req, res) => {
  try {
    const { streamId, language } = req.body;
    const stream = await LiveStream.findById(streamId);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    // Mock translation logic
    stream.translatedLanguage = language;
    await stream.save();
    res.json({ message: `Stream translated to ${language}`, stream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
