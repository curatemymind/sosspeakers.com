

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_SANDBOX_PUBLISHABLE_KEY);

class PublicArray extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      sessioniId: null,
      items: null,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount()
  {
    var allProducts = null
    let self = this
    var tempStruct = []
    var response = fetch(`/.netlify/functions/allProducts`).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        self.setState({items: JSON.stringify(responseJson)})
      });
      
    }
      
    
    async handleClick(priceId) {
      const stripe = await stripePromise
     fetch("/.netlify/functions/productCheckout", {
      method: "POST", 
      body: priceId
    }).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        const sessionId = responseJson.session.id;
        console.log(sessionId)
        stripe.redirectToCheckout({sessionId: sessionId})
      });
    }

  render() {
    const items = []
    if(this.state.items != null)
    {
      var parsedObj = JSON.parse(this.state.items)
      for(const [index, value] of parsedObj.entries())
      {
        items.push(<h1 key={index}>{value.NAME}</h1>)
        items.push(<img src={value.PHOTO} alt="product image" width="400"></img>)
        items.push(<h2 key={index}>{value.DESCRIPTION}</h2>)

        
        for(var i = 0; i < (value.LINKS).length; i++)
        {
          for(var key in value.LINKS[i])
          {
            if((key !== "PRICE") && (key !== "PRICEid"))
            {
              //0 index is ALWAYS product id
              //1 index is ALWAYS price id
              //2 index is ALWAYS price
              items.push(<button key={i} value={value.LINKS[i][key][1]} onClick={e => this.handleClick(e.target.value)}>{key} (${value.LINKS[i][key][2]})</button>)            }
            

          }
            
        }
      }
    }
    
    
    
    return (
      <div className="centerDiv">
       
      {items}
        
      </div>
    )
  }
}
export default PublicArray
