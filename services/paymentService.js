export const createPaymentIntent = async (amount, currency = 'usd') => {
  return {
    clientSecret: `mock_secret_${Date.now()}`,
    amount,
    currency,
    status: 'requires_payment_method'
  };
};
