import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import PublicArray from './minor/PublicArray'

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
        <PublicArray></PublicArray>
        <h1 className="foot">Sense of Self Speakers&nbsp;&copy;<br></br><i className="rights">All rights reserved</i></h1>
        </div>
      </div>
    )        
  }
}
export default Speakers;

