import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import PublicArray from './minor/PublicArray'
import Banner from 'react-js-banner';

class Speakers extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      banner: { color: "#FFF", backgroundColor: "#9e84ae", marginBottom: "0px", padding: "0px", paddingTop: "10px", fontSize: "20px"},
      banner2: { color: "#FFF", backgroundColor: "#9e84ae", marginBottom: "0px", padding: "0px", paddingBottom: "10px" }
    };
  }

 

  render()
  {  
    return (
      <div>
        <Banner 
          title="Grand Opening Sale!" 
          css={this.state.banner} 
        />  
        <Banner 
          title="Use the code SOS at checkout for 15% off :)" 
          css={this.state.banner2} 
        />
        <Navigation></Navigation>
        <div className="contentWrapper">  
        <PublicArray></PublicArray>
        </div>
      </div>
    )        
  }
}
export default Speakers;

