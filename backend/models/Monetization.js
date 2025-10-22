const mongoose = require('mongoose');

const monetizationSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  earnings: { type: Number, default: 0 },
  adRevenue: { type: Number, default: 0 },
  sponsorRevenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Monetization', monetizationSchema);
