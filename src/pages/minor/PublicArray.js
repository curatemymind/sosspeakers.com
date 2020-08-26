

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';
const stripePromise = loadStripe(process.env.REACT_APP_SANDBOX_PUBLISHABLE_KEY);


class PublicArray extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      sessioniId: null,
      items: null,
      selectedOption: null,
      price: null,
      inventory: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (selectedOption, selectedPrice) => {
    this.setState({selectedOption: selectedOption, price: selectedPrice})
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
    const { selectedOption } = this.state;
    var pricesDict = []
    
    if(this.state.items != null)
    {
      var parsedObj = JSON.parse(this.state.items)
      
      for(const [index, value] of parsedObj.entries())
      {
        var name= (<h1 key={index}>{value.NAME}</h1>)
        var img = <img src={value.PHOTO} alt="product image" width="400"></img>
        var desc = <h2 key={index}>{value.DESCRIPTION}</h2>
        
        var dropList = []
        for(var i = 0; i < (value.LINKS).length; i++)
        {
          for(var key in value.LINKS[i])
          {
            if((key !== "PRICE") && (key !== "PRICEid"))
            {
              //0 index is ALWAYS product id
              //1 index is ALWAYS price id
              //2 index is ALWAYS price
              pricesDict.push({[value.LINKS[i][key][1]]: value.LINKS[i][key][2]})
              dropList.push({value: value.LINKS[i][key][1], label: key, price: value.LINKS[i][key][2]})
            }
          }  
        }
        var test = null
        var select = <Select  onChange={(e) => this.handleChange(e.value, e.price)} options={dropList}></Select>
        var amount = <h1>{this.state.price}</h1>
        var productId = <h2>{this.state.selectedOption}</h2>
        var buyNow = <button value={dropList[2]}  onClick={e => this.handleClick(selectedOption)}>Buy Now {/*dropList[0].value*/}</button>
        items.push([name, img, desc, select, amount, productId, buyNow])
      }
      
    }
    
    
    
    return (
      <div className="centerDiv">
       
      {items[0]}
      {items[1]}
      
      </div>
    )
  }
}
export default PublicArray
