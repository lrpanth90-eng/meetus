const mongoose = require('mongoose');

const brandDealSchema = new mongoose.Schema({
  sponsor: { type: String, required: true },
  amount: { type: Number, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BrandDeal', brandDealSchema);
