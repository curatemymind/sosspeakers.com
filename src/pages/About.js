import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
const aboutLogo = require('./media/aboutLogo.PNG')

class About extends React.Component { 

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
        <div className="centerDiv">
          <div className="aboutWrap">
            <h1 className="aboutHead">SENSE OF SELF</h1>
              <p className="aboutText">Speakers are about expression.<br></br>
              <br></br>
              SOS Speakers are high quality, beautifully <br></br>
              encased, and durable sound systems. <br></br>
              Components include Bluetooth 5.0 enabled<br></br> 
              amplifiers, polyurethane-finished Birch wood,<br></br> 
              and high fidelity full range speakers.<br></br>
              <br></br>
              Every speaker is completely customizable<br></br>
              from start to finish. Upon ordering a signature<br></br>
              SOS Speaker, we'll work together to design<br></br>
              a product that is perfect for your desired look. <br></br>
              <br></br>
              <b>Amplify your sense of self.</b>
              <br></br>
              </p>
            </div>
            <img src={aboutLogo} alt="thanks!" className="aboutLogo"></img>
          
        </div>

        </div>
      </div>
    )               
  }
}
export default About;

