const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sponsorName: { type: String, required: true },
  targetVideo: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Promotion', promotionSchema);
