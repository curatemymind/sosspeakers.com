import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';

class Photos extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      photos: [],
      isDoneFetching: false
    };
  }

  componentDidMount()
  {
    let self = this;
    var tempRows = [];
    //https://docs.google.com/spreadsheets/d/e/2PACX-1vQuQwutdx61wWhjjxKdqmrGjNJehXMkm3yw4JuUjG_BMA5wR3eToT0MNqHpvB_vTWVLNELVtVy1-mMw/pubhtml
    fetch('https://spreadsheets.google.com/feeds/cells/1WA2uI2ozdIuQG9MHk-1ijZwYLoVS4699rkLdb7eOdHE/1/public/full?alt=json').then(res => 
    res.json()).then(data => {
      
      for(var i = 0; i < data['feed']['entry'].length; i+=1)
      {
        //skips over first row [metadata/column names]
        if(data['feed']['entry'][i]['gs$cell']['row'] === "1")
        {
          continue;
        }
        //pushes input value of cell to temp array 
        tempRows.push([
          data['feed']['entry'][i]['gs$cell']['inputValue'],
        ])
      }
      self.setState({photos: tempRows}) 
    })  
    this.setState({isDoneFetching: true})
  }

 

  render()
  {  
    return this.state.isDoneFetching && (
       <div >
        
        <Navigation></Navigation>
        
        <div className="photosWrapper">  
        {this.state.photos.map((value, index) => 
          <div>
            <center><img src={value} className="photo" alt="SOS"></img></center>
            
          </div>
          )}
        <center>
          <br></br>
          Stills taken by Matt Levine,
          <br></br>
          Photographer and Owner of <a href="https://www.instagram.com/nostalgia_pink/" target="_blank" rel="noopener noreferrer" className="levine">Nostalgia Pink</a>
          <br></br>
          <br></br>
        </center>
        </div>
        
      </div>
    )             
  }
}

export default Photos;

