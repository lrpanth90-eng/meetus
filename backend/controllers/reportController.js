const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { type, targetId, description } = req.body;
    const report = new Report({ reporter: req.user._id, type, target: targetId, description });
    await report.save();
    res.status(201).json({ message: "Report submitted", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reporter', 'name email');
    res.json({ reports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
