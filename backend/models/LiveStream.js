const mongoose = require('mongoose');

const liveStreamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  streamKey: { type: String, required: true },
  viewers: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  captionsEnabled: { type: Boolean, default: true },
  superChatEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);
