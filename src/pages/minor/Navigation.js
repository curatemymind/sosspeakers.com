import React from 'react';
import '../../App.css'
import { slide as Menu } from 'react-burger-menu'
import * as Util from './Util'

const logo = require('../media/sos_logo.png')


class Navigation extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
    
    };
  }

 
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    const isMobile = Util.IsMobileUserAgent()
    var link = (window.location.href).substr(window.location.href.lastIndexOf('/'))
    var speakerToggle, queueToggle, contactToggle, aboutToggle
    if(isMobile){speakerToggle = "menu-item"; queueToggle = "menu-item"; contactToggle = "menu-item"; aboutToggle = "menu-item"}
    switch (link){
      case '/':
        if(isMobile){speakerToggle = "active-menu-item"}
        else{speakerToggle="active-desktop-item"}
        break
      case '/queue':
        if(isMobile){queueToggle = "active-menu-item"}
        else{queueToggle="active-desktop-item"}
        break
      case '/contact':
        if(isMobile){contactToggle = "active-menu-item"}
        else{contactToggle="active-desktop-item"}
        break
      case '/about':
        if(isMobile){aboutToggle = "active-menu-item"}
        else{aboutToggle="active-desktop-item"}
        break
      default:
        break
    }
    return isMobile ? (
      <div>
        <Menu width={ 200 } disableAutoFocus>
          <a id="speakers" className={speakerToggle} href="/">SPEAKERS</a>
          <a id="queue" className={queueToggle} href="/queue">QUEUE</a>
          <a id="contact" className={contactToggle} href="/contact">CONTACT</a>
          <a id="about" className={aboutToggle} href="/about">ABOUT</a>
        </Menu>
        <center><img src={logo} className="logo" alt="SOS"></img></center>
      </div>
    )
    :
    (
      <div>
        <br></br>
        <center><img src={logo} className="logoDesktop" alt="SOS"></img></center>
        <br></br>  
        <ul className="navCont">
          <li><a className={speakerToggle} href="/">SPEAKERS</a></li>
          <li><a className={queueToggle} href="/queue">QUEUE</a></li>
          <li><a className={contactToggle} href="/contact">CONTACT</a></li>
          <li><a className={aboutToggle} href="/about">ABOUT</a></li>
        </ul>

      </div>
    )
  }
}
export default Navigation;

