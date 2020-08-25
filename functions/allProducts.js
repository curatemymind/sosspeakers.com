const stripe = require('stripe')(process.env.REACT_APP_SANDBOX_SECRET_KEY);


exports.handler = async ( event, context) => { 
    const products = await stripe.products.list()

    var response = []
    var innerIndex = 0;
    for(var i = 0; i < (products.data).length; i++)
    { 
        console.log(products.data[i].metadata.DISCOUNT)
        console.log(products.data[i].active)
        if(products.data[i].active === true)
        {
            if((i === 0) || (products.data[i].name != products.data[i-1].name))
            {
                response.push({NAME: products.data[i].name, DESCRIPTION: products.data[i].description, DISCOUNT: products.data[i].metadata.DISCOUNT, LINKS: [{[products.data[i].metadata.TYPE]: products.data[i].id}]})
            }
            else
            {  
                response[innerIndex].LINKS.push({[products.data[i].metadata.TYPE]: products.data[i].id})  
            }
            if((i !== 0) && (products.data[i].name != products.data[i-1].name))
            {
                innerIndex++
            }   
        }
    }
    return { statusCode : 200 , body : JSON.stringify(response)};
 }
