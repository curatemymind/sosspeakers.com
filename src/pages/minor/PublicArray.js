

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
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

    for(var i = 0; i < (this.state.inventory).length; i++)
    {
      for(var j = 0; j < (this.state.inventory[i]).length; j++)
      {
        
        
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
    let self = this
    fetch(`/.netlify/functions/allProducts`).then(function(response) {
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
        
        var name= (<h1 className="name" key={index}>{value.NAME}</h1>)
        var img = <img className="prodImg" src={value.PHOTO} alt="product"></img>
        var desc = <h2 className="description" key={index}>
          {value.DESCRIPTION}
          <br></br>
          <br></br>
          Features:
          <br></br>
          <ul>
            <li className="list">- Bluetooth 5.0</li>
            <br></br>
            <li className="list">- 3'' HiFi Full-Range Speakers</li>
            <br></br>
            <li className="list">- Polyurethane-coated Birch plywood encasing</li>
          </ul>
          <br></br>
          Delivery available in Tallahassee only.<br></br>
          Ships in two weeks.
          </h2>
        
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
        var select = <Select 
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
              text: 'orangered',
              primary25: 'gray',
              primary: '#9e84ae ',
            },
          })}    
          className="select" defaultValue={dropList[0]} isSearchable={false} onChange={(e) => this.handleChange(index, e.value, e.price)} options={dropList}></Select>
        var buyNow = <button className="buyNow" onClick={e => this.handleClick(index)}><center>Buy Now</center></button>
        items.push([img, name, desc, select, buyNow, dropList[0].value])
        
      }
      
    }
    
    return (
      <div className="centerDivSpeakers">
      
       {this.state.inventory.map((price, index) =>
       /*correctly sets it individually to the first value*/
      <div>
          <div className="outline">
            
              <center>{items[index][0]}</center>
              {items[index][1]}
              {items[index][2]}
              
              
              
                <h2 className="method">Style + Transportation:</h2>
                {items[index][3]}
              
              <br></br>
              <br></br>
              <br></br>
              <h2 className="total">TOTAL:</h2>
              <h1 className="price">${price[0][1]}</h1>
              {items[index][4]}
            </div>
          
            <br></br>
            <br></br>
            <br></br>
        </div>
          
          
       )}
      </div>
    )
  }
}
export default PublicArray
