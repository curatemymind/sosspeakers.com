import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import Clock from 'react-live-clock';
const contactLogo = require('./media/contactLogo.png')

class Building extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

 componentDidMount() {
  
 }

  render()
  {  
    return (
      <div>
        <Navigation></Navigation>
        <div className="queueWrapper">  
        <br></br>
        <center><h2 className="thanks"><b>UNDER CONSTRUCTION </b><br/>
        NEW MODELS COMING SOON
        <br></br>
        <Clock
          format={'HH:mm:ss'}
          ticking={true}
          timezone={'US/Eastern'} /></h2>
        </center>
        </div>
      </div>
    )        
  }
}
export default Building;

