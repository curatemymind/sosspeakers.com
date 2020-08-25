

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_SANDBOX_PUBLISHABLE_KEY);

class PublicArray extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      sessioniId: null,
      items: [],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount()
  {
    var allProducts = null
    let self = this
    var response = fetch(`/.netlify/functions/allProducts`).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        for(var i = 0; i < responseJson.length; i++)
        {
          alert(responseJson[i].NAME)
          for(var j = 0; j < (responseJson[i].LINKS).length; j++)
          {
            if(responseJson[i].LINKS[j]['BOOKSHELF + DELIVERY'])
            {

            }
            else if(responseJson[i].LINKS[j]['BOOKSHELF + SHIPPING'])
            {

            }
            else if(responseJson[i].LINKS[j]['PORTABLE + DELIVERY'])
            {

            }
            else if(responseJson[i].LINKS[j]['PORTABLE + SHIPPING'])
            {

            }
            else
            {
              alert("error")
            }
          }
        }
        
        //self.setState({items: JSON.stringify(responseJson)})
      });
      
    }
      
    

  

  handleClick = async (event) => {
    
    
  };

  render() {
    
    
    
    
    return (
      <div className="centerDiv">
        {this.state.items}
      <ul>
        
      </ul>
        
      </div>
    )
  }
}
export default PublicArray
