const Notification = require("../models/Notification");

/**
 * Send notification to user
 */
const sendNotification = async (userId, message) => {
  const notification = await Notification.create({
    user: userId,
    message,
    read: false,
  });
  return notification;
};

module.exports = { sendNotification };
