const stripe = require('stripe')(process.env.REACT_APP_SANDBOX_SECRET_KEY);


exports.handler = async ( event, context) => { 
    const products = await stripe.products.list()
    const pricesList = await stripe.prices.list()

    var prices = []
    for(var i = 0; i < (pricesList.data).length; i++)
    {
        if(pricesList.data[i].active === true)
        {
            prices.push({[pricesList.data[i].product]: pricesList.data[i].id, USD: pricesList.data[i]['unit_amount']/100})
        }
    }
    console.log(prices)
    var response = []
    var innerIndex = 0;


    for(var i = 0; i < (products.data).length; i++)
    { 
        //console.log(products.data[i].metadata.DISCOUNT)
        //console.log(products.data[i].active)
        if(products.data[i].active === true)
        {
            if((i === 0) || (products.data[i].name != products.data[i-1].name))
            {
                for(var j = 0; j < prices.length; j++)
                {
                    if(prices[j][products.data[i].id])
                    {
                        response.push({NAME: products.data[i].name, DESCRIPTION: products.data[i].description, PHOTO: products.data[i].images[0], DISCOUNT: products.data[i].metadata.DISCOUNT, LINKS: [{[products.data[i].metadata.TYPE]: [products.data[i].id, prices[j][products.data[i].id],  prices[j].USD]}]})
                    }
                } 
            }
            else
            {  
                for(var j = 0; j < prices.length; j++)
                {
                    if(prices[j][products.data[i].id])
                    {
                        response[innerIndex].LINKS.push({[products.data[i].metadata.TYPE]: [products.data[i].id, prices[j][products.data[i].id], prices[j].USD]})  
                    }
                } 
                
            }
            if((i !== 0) && (products.data[i].name != products.data[i-1].name))
            {
                innerIndex++
            }   
        }
    }
    console.log(response)
    return { statusCode : 200 , body : JSON.stringify(response)};
 }
