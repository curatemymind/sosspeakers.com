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
      banner: { color: "#FFF", backgroundColor: "#000000", marginBottom: "0px", padding: "0px", paddingTop: "10px", fontSize: "20px"},
      banner2: { color: "#FFF", backgroundColor: "#000000", marginBottom: "0px", padding: "0px", paddingBottom: "10px" }
    };
  }

 

  render()
  {  
    return (
      <div>
        <Banner 
          title="BLACK FRIDAY SPECIAL" 
          css={this.state.banner} 
        />  
        <Banner 
          title='Use code "TURKEY2020" at checkout for $65 off the "Sense of Self" model'
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

