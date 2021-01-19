import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import PublicArray from './minor/PublicArray'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
//import Bubble from './minor/bubble';
const example1 = require('./media/example1.png')
const example2 = require('./media/example2.png')
const example3 = require('./media/example3.mp4')

class Speakers extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      showModal: true,
    };
    this.showModal = (this.showModal.bind(this))
    this.hideModal = (this.hideModal.bind(this))
  }

  showModal = () => {
    this.setState({showModal: true})
  }

  hideModal = () => {
    this.setState({showModal: false})
  }
 

  render()
  {  
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>Sense of Self Season 2!</Modal.Header>
         <Modal.Body>Hey, it's nice to have you back;)
           <br></br>
           <br></br>
           Season 2 welcomes a host of improvements like <b>lower prices, better sound quality, aux support, an ultra lightweight design, a fully internal build, an air-tight encasing, and two new builds to choose from</b>, among others.
          <br></br>
          
          <br></br>

          As mentioned, there are now two different builds available for every speaker.
          
          <br></br>
          <br></br>
          <b>Plug-In:</b> A build meant for indoor use that must remained plugged in! (Starts at <b>$150</b>)
          <br></br>
          <br></br>
          <b>Portable:</b> This build is meant to go wherever you go! It has a 12-Hour lasting battery built into it.  (Starts at <b>$180</b>)
          <br></br>
          <br></br>
          I also make speakers that are entirely customized to your liking for an additional <b>$20</b>! ( Select the <b>Sense of Self</b> Model)
          <br></br>
          <br></br>
          Below I've attached images/videos of the new speakers, happy speaker browsing!
          <br></br>
          <br></br>
          Orlando Kenny
          <br></br>
          <i>computer programmer / speaker maker / freelance college kid</i>
          <br></br>
          <br></br>
          <center>
            <img src={example1}></img>
            <img src={example2}></img>
            <iframe src="https://www.youtube.com/embed/iTGErVXtqp8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </center>
          
          
         </Modal.Body>
          

        </Modal>
        <Navigation></Navigation>
        <div className="contentWrapper"> 
        <PublicArray></PublicArray>
        {/*<Bubble></Bubble>*/}
        </div>
      </div>
    )        
  }
}
export default Speakers;

