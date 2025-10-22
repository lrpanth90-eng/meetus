const { generateAdSlots } = require("../utils/adPlacementEngine");

const adInjector = async (req, res, next) => {
  // Example: attach ad slots to req for frontend to render
  try {
    const videoDuration = req.video?.duration || 300; // default 5 min
    req.adSlots = generateAdSlots(videoDuration);
    next();
  } catch (err) {
    console.error("adInjector error:", err.message);
    next();
  }
};

module.exports = adInjector;
