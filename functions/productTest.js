const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);


exports.handler = async ( event, context) => { 
    const products = await stripe.products.list({limit: 1000})
    const pricesList = await stripe.prices.list({limit: 1000})

    console.log("break")
    
    //return { statusCode : 200 , body : JSON.stringify(prices)};
    return { statusCode : 200 , body : JSON.stringify(pricesList)};
 }
