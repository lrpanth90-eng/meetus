/**
 * Calculate creator and admin revenue split
 */
const calculateRevenue = (totalAmount, creatorPercent = 70) => {
  const creatorEarning = (totalAmount * creatorPercent) / 100;
  const adminEarning = totalAmount - creatorEarning;
  return { creatorEarning, adminEarning };
};

module.exports = { calculateRevenue };
