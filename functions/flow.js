const stripe = require('stripe')(process.env.REACT_APP_SANDBOX_SECRET_KEY);


exports.handler = async ( event, context) => { 
  if (event.httpMethod !== 'POST') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://sosspeakers.com/contact',
      cancel_url: 'https://example.com/cancel',
    });


    return { statusCode : 200 ,  headers: {
      'Access-Control-Allow-Origin': 'cheese',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    
            }, body : JSON.stringify({session})};}
 }
