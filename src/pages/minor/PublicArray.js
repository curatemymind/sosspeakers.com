

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';

const stripePromise = loadStripe(process.env.REACT_APP_SANDBOX_PUBLISHABLE_KEY);
var update = require('react-addons-update');
var pricesDict = []
const items = []


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
  
  returnPrice = (priceId) => {
    var newArray = []
    for(var i = 0; i < (this.state.inventory).length; i++)
    {
      for(var j = 0; j < (this.state.inventory[i]).length; j++)
      {
        var innerArray = []
        
        if(String(this.state.inventory[i][j][0]) === String(priceId))
        {
          var first = this.state.inventory[i][0]
          var current = this.state.inventory[i][j]
          var copy = this.state.inventory

          copy[i][0] = current
          copy[i][j] = first

          this.setState({inventory: copy})
        }
      }
    }
  }

  handleChange = (index, productId, priceAmount) => {
    items[index][5] = productId
    items[index][6] = priceAmount
    
    this.returnPrice(productId)
    
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
        
        var finArr = []
        
        for(var x = 0; x < responseJson.length; x++)
        {
          var arr = []
          for (var key in responseJson[x].LINKS) {
            var right = (String(Object.values(responseJson[x].LINKS[key]))).split(',')
            arr.push([[right[1]], right[2]])
          }
          finArr.push(arr)
        }
        
        self.setState({inventory: finArr})
      });
      
    }
    //pass in product id and search for it in item
    
    //DO NOT TOUCH
    async handleClick(index) {
      var buyItem = items[index][5]
      const stripe = await stripePromise
     fetch("/.netlify/functions/productCheckout", {
      method: "POST", 
      body: buyItem
    }).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        const sessionId = responseJson.session.id;
        stripe.redirectToCheckout({sessionId: sessionId})
      });
    }
    //DO NOT TOUCH

  render() {
    
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
            //0 index is ALWAYS product id
            //1 index is ALWAYS price id
            //2 index is ALWAYS price
            pricesDict.push({[value.LINKS[i][key][1]]: value.LINKS[i][key][2]})
            dropList.push({value: value.LINKS[i][key][1], label: key, price: value.LINKS[i][key][2]})
          }  
        }
        var select = <Select defaultValue={dropList[0]} onChange={(e) => this.handleChange(index, e.value, e.price)} options={dropList}></Select>
        var buyNow = <button onClick={e => this.handleClick(index)}>Buy Now</button>
        items.push([name, img, desc, select, buyNow, dropList[0].value])
        
      }
      
    }
    
    return (
      <div className="centerDiv">

       {this.state.inventory.map((price, index) =>
       /*correctly sets it individually to the first value*/
          <div>
            {items[index][0]}
            {items[index][1]}
            {items[index][2]}
            {items[index][3]}
            <h1>${price[0][1]}</h1>
            {items[index][4]}

            
          </div>
       )}
      </div>
    )
  }
}
export default PublicArray
