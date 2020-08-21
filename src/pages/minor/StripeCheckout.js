

import React from 'react'

class StripeCheckout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
    }
  }


  render() {
    
    var response = fetch(`/flow`).then(function(response) {
       alert(response.json())
    return response.json();
    }).then(function(responseJson) {
      var sessionID = responseJson.session_id;
      alert(sessionID)
      // Call stripe.redirectToCheckout() with the Session ID.
    });


    return (
      <div className="centerDiv">
        
        <h1>checkout</h1>
        <h2></h2>
      </div>
    )
  }
}
export default StripeCheckout
