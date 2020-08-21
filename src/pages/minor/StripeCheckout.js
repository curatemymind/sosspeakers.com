

import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_SANDBOX_PUBLISHABLE_KEY);

class StripeCheckout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      sessioniId: null,
      
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount()
  {

  }

  /*handleClick() {
    alert("hey!")
  }*/

  handleClick = async (event) => {
    // Call your backend to create the Checkout Session—see previous step
    
    const stripe = await stripePromise
    var response = fetch(`/.netlify/functions/flow`).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        const sessionId = responseJson.session.id;
        alert(sessionId)
        stripe.redirectToCheckout({sessionId: sessionId})
        // Call stripe.redirectToCheckout() with the Session ID.
      });
      
    // When the customer clicks on the button, redirect them to Checkout.
    //const stripe = await stripePromise;
    //const { error } = await stripe.redirectToCheckout({
      //sessionId,
    //});
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  render() {
    
    


    return (
      <div className="centerDiv">
        
        <h1>checkout</h1>
        <h2></h2>
        <button role="link" onClick={this.handleClick}>
      Checkout
    </button>
      </div>
    )
  }
}
export default StripeCheckout
