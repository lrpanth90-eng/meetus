const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kycDocument: { type: String },
  isApproved: { type: Boolean, default: false },
  subscribersCount: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Creator', creatorSchema);
