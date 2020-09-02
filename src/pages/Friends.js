import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'

import FriendsArray from './minor/FriendsArray'

const passkey = process.env.REACT_APP_FRIENDS

class Friends extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
    
    };
  }

  componentDidMount()
  {
    var password = prompt("Welcome, please enter the password provided...");

    if (password === passkey) {
      alert("Congratulations, you've gained access! Enjoy the savings and exclusive models ;)")
    }
    else if (password === null) {
      alert("You didn't enter a password. Redirecting you to the home page...")
      window.location.replace("/");
    }
    else {
      alert("The password you entered was incorrect. Redirecting you to the home page...")
      window.location.replace("/");
    }
  }

  render()
  {  
    return (
      <div>
        <Navigation></Navigation>
        <div className="contentWrapper">  
        <FriendsArray></FriendsArray>
       
        </div>
      </div>
    )        
  }
}
export default Friends;

