const stripe = require('stripe')(process.env.REACT_APP_SANDBOX_SECRET_KEY);


exports.handler = async ( event, context) => { 
  if (event.httpMethod !== 'POST') {
    const price = await stripe.prices.retrieve(
      'price_1HIaQxEhI2c5jgt0qHtRYLWQ'
    );

    const product = await stripe.products.retrieve(
      price.product
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://sosspeakers.com/contact',
      cancel_url: 'https://sosspeakers.com/',
    });


    return { statusCode : 200 ,  headers: {
      'Access-Control-Allow-Origin': 'cheese',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    
            }, body : JSON.stringify({session})};}
 }
