const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);


//THE ACTIVE ATTRIBUTE IS WHAT DISTINGUISHES LIVE PRICES VS OLD PRICES
//YOU SHOULD ONLY HAVE ONE PRICE PER ITEM 
exports.handler = async ( event, context) => { 
    //retrieves all products and all prices
    //they are linked by product id
    //PRICES are not PRODUCTS
    const products = await stripe.products.list({limit: 1000})
    const pricesList = await stripe.prices.list({limit: 1000})

    //iterate through prices list and only push active PRICES.
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

    //iterate through products list and only push active PRODUCTS. 
    for(var i = 0; i < (products.data).length; i++)
    { 
        //console.log(products.data[i].metadata.DISCOUNT)
        //console.log(products.data[i].active)
        if((products.data[i].active))
        {
            activeProducts.push(products.data[i])
        }
    }

    //iterate through all ACTIVE products AND prices
    for(var i = 0; i < (activeProducts).length; i++)
    { 
        if((i === 0) || (activeProducts[i].name != activeProducts[i-1].name))
        {
            for(var j = 0; j < prices.length; j++)
            {
                
                if((prices[j][activeProducts[i].id]) )
                { 
                    console.log(activeProducts[i].name)
                    console.log(prices[j])
                    response.push({NAME: activeProducts[i].name, DESCRIPTION: activeProducts[i].description, PHOTO: activeProducts[i].images[0], PICS:[((activeProducts[i].metadata.PICS).split(", "))[0], ((activeProducts[i].metadata.PICS).split(", "))[1], ((activeProducts[i].metadata.PICS).split(", "))[2]], LINKS: [{[activeProducts[i].metadata.TYPE]: [activeProducts[i].id, prices[j][activeProducts[i].id],  prices[j].USD]}]})
                }
            } 
        }
        else
        {  
            for(var j = 0; j < prices.length; j++)
            {
                if(prices[j][activeProducts[i].id])
                {
                    console.log('here2')
                    response[innerIndex].LINKS.push({[activeProducts[i].metadata.TYPE]: [activeProducts[i].id, prices[j][activeProducts[i].id], prices[j].USD]})  
                }
            } 
        }
        if((i !== 0) && (activeProducts[i].name != activeProducts[i-1].name))
        {
            //issue is with innerindex
            innerIndex++
        }   
    }
    //return { statusCode : 200 , body : JSON.stringify(prices)};
    return { statusCode : 200 , body : JSON.stringify(response)};
 }
