const LiveStream = require('../models/LiveStream');

exports.moderateMessage = async (req, res) => {
  try {
    const { streamId, messageId, action } = req.body;
    const stream = await LiveStream.findById(streamId);
    if(!stream) return res.status(404).json({ message: "Stream not found" });

    const msgIndex = stream.chat.findIndex(msg => msg._id.toString() === messageId);
    if(msgIndex === -1) return res.status(404).json({ message: "Message not found" });

    if(action === "delete") stream.chat.splice(msgIndex, 1);
    if(action === "flag") stream.chat[msgIndex].flagged = true;

    await stream.save();
    res.json({ message: "Message moderated", stream });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
