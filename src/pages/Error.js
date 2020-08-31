import React from 'react';
import '../App.css';
import { Redirect } from "react-router-dom";

class Successful extends React.Component { 

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
        <Redirect to={'/'} />
      </div>
    )        
  }
}
export default Successful;

