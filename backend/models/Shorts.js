const mongoose = require('mongoose');

const shortsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  adPlacements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shorts', shortsSchema);
