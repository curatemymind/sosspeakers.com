import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import StripeCheckout from './minor/StripeCheckout'

class Speakers extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
    
    };
  }

 

  render()
  {  
    return (
      <div>
        <Navigation></Navigation>
        <div className="contentWrapper">  
        <StripeCheckout></StripeCheckout>
       
        </div>
      </div>
    )        
  }
}
export default Speakers;

