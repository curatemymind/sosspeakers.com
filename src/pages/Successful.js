import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import { Redirect } from "react-router-dom";
const contactLogo = require('./media/contactLogo.png')

class Successful extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

 componentDidMount() {
  this.setState({redirect: true})
        setTimeout(function(){
          this.setState({redirect: "/queue"})
        }.bind(this), 6000);
 }

  render()
  {  
    if (this.state.redirect === '/queue') {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <Navigation></Navigation>
        <div className="queueWrapper">  
        <br></br>
        <center><h2 className="thanks"><b>Thank you.</b><br></br> Your order has been placed.<br></br> Redirecting you to the queue.</h2>
        <br></br>
        <img src={contactLogo} alt="thanks!" className="contactLogo"></img>
        </center>


       
        </div>
      </div>
    )        
  }
}
export default Successful;

