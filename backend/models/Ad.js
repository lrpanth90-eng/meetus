const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'banner', 'overlay'], required: true },
  url: { type: String, required: true },
  duration: { type: Number, default: 30 }, // seconds
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ad', adSchema);
