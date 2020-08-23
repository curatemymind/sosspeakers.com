const stripe = require('stripe')(process.env.REACT_APP_SANDBOX_SECRET_KEY);


exports.handler = async ( event, context) => { 
    const products = await stripe.products.list()
    return { statusCode : 200 , body : JSON.stringify(products.data)};
 }
