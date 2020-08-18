import React from 'react';
import '../../App.css'
import { Redirect } from "react-router-dom";
const contactLogo = require('../media/contactLogo.png')
const contactLogo2 = require('../media/logo2.PNG')

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitted: false, redirect: null};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => {
        this.setState({submitted: true})
        setTimeout(function(){
          this.setState({redirect: "/"})
        }.bind(this), 6000);
         } )
      .catch(error => alert(error));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return !this.state.submitted ? (
      <div className="centerDiv">
        <form
          name="contact"
          method="post"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Name:<br></br>
              
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Email:<br></br>
              
              <input type="email" name="email" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message:<br />
              <textarea name="message" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit" className="submitBtn">Send</button>
          </p>
          
        </form>
        <div className="contactCard">
        <img src={contactLogo2} alt="thanks!" className="contactLogo2"></img>
          <h1 className="btnText">954-778-1065</h1>
          <h1 className="btnText" >ig: sosspeakers</h1>
          <h1 className="btnText">sosspeakers@gmail.com</h1>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    )
    :
    (
      <div className="centerDiv">
        <center>
          <br></br>
          <img src={contactLogo} alt="thanks!" className="contactLogo"></img>
          <h1 className="submitted">thanks!<br></br> your message<br></br> was sent.</h1>  
        </center>
       
      </div>
    );
  }
}