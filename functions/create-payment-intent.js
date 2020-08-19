const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = async function(event) {
  // We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers,
      body: "This was not a POST request!"
    };
  }

  const {items} = event.body

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1,
    currency: "usd"
  })

  
  return {
    "clientSecret": paymentIntent.client_secret
  }
}
