import React from 'react';
import '../../App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY));

class TestFunc extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
    
    };
  }

  render()
  {  
    return (
      <div className="centerDiv">
        <br></br>
        <br></br>
        <Elements stripe={promise}>
         <CheckoutForm></CheckoutForm>
      </Elements>
      </div>
    )        
  }
}
export default TestFunc;

