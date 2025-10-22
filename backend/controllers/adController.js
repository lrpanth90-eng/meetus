const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  try {
    const { title, type, url, duration } = req.body;
    const newAd = new Ad({ title, type, url, duration });
    await newAd.save();
    res.status(201).json({ message: "Ad created successfully", ad: newAd });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if(!ad) return res.status(404).json({ message: "Ad not found" });
    Object.assign(ad, req.body);
    await ad.save();
    res.json({ message: "Ad updated successfully", ad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if(!ad) return res.status(404).json({ message: "Ad not found" });
    await ad.remove();
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
