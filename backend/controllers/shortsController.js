const Shorts = require('../models/Shorts');

exports.uploadShort = async (req, res) => {
  try {
    const { title, description } = req.body;
    const short = new Shorts({
      creator: req.user._id,
      title,
      description,
      url: req.file ? req.file.path : ""
    });
    await short.save();
    res.status(201).json({ message: "Short uploaded", short });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShorts = async (req, res) => {
  try {
    const shorts = await Shorts.find().sort({ createdAt: -1 });
    res.json({ shorts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
