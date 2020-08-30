const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);


exports.handler = async ( event, context) => { 
    const products = await stripe.products.list({limit: 1000})
    const pricesList = await stripe.prices.list({limit: 1000})

    var prices = []
    for(var i = 0; i < (pricesList.data).length; i++)
    {
        if(pricesList.data[i].active === true)
        {
            prices.push({[pricesList.data[i].product]: pricesList.data[i].id, USD: pricesList.data[i]['unit_amount']/100})
        }
    }

    var response = []
    var innerIndex = 0;
    var activeProducts = []


    for(var i = 0; i < (products.data).length; i++)
    { 
        //console.log(products.data[i].metadata.DISCOUNT)
        //console.log(products.data[i].active)
        if(products.data[i].active)
        {
            activeProducts.push(products.data[i])
        }
       
        
    }

    for(var i = 0; i < (activeProducts).length; i++)
    { 
        //console.log(activeProducts[i].name)
        //console.log(products.data[i].metadata.DISCOUNT)
        //console.log(products.data[i].active)
        
            if((i === 0) || (activeProducts[i].name != activeProducts[i-1].name))
            {
                for(var j = 0; j < prices.length; j++)
                {
                    if(prices[j][activeProducts[i].id])
                    {
                        response.push({NAME: activeProducts[i].name, DESCRIPTION: activeProducts[i].description, PHOTO: activeProducts[i].images[0], DISCOUNT: activeProducts[i].metadata.DISCOUNT, LINKS: [{[activeProducts[i].metadata.TYPE]: [activeProducts[i].id, prices[j][activeProducts[i].id],  prices[j].USD]}]})
                    }
                } 
            }
            else
            {  
                for(var j = 0; j < prices.length; j++)
                {
                    if(prices[j][activeProducts[i].id])
                    {
                        response[innerIndex].LINKS.push({[activeProducts[i].metadata.TYPE]: [activeProducts[i].id, prices[j][activeProducts[i].id], prices[j].USD]})  
                        //response[innerIndex].LINKS.push({[products.data[i].metadata.TYPE]: [products.data[i].id, prices[j][products.data[i].id], prices[j].USD]})  
                    }
                } 
            }
            if((i !== 0) && (activeProducts[i].name != activeProducts[i-1].name))
            {
                //issue is with innerindex
                innerIndex++
                
            }   
        
    
    }
    
    return { statusCode : 200 , body : JSON.stringify(response)};
 }
