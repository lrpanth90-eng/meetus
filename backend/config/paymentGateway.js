const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
  return await stripe.paymentIntents.create({ amount, currency });
};

module.exports = { createPaymentIntent };
