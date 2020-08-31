import React from 'react';
import '../App.css';
import Navigation from './minor/Navigation'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

class Queue extends React.Component { 

  //the states of emotion and source will be set to null initially until the user had filled out the form.
  constructor() {
    super();
    this.state = {
      rows: []
    };
  }

  componentDidMount()
  {
    let self = this;
    var tempRows = [];
    fetch('https://spreadsheets.google.com/feeds/cells/18WAVyuKTaK6rdELGqWe_qiiCjGVTtJKHL0SWk6xLHDE/1/public/full?alt=json').then(res => 
    res.json()).then(data => {
      
      for(var i = 0; i < data['feed']['entry'].length; i+=4)
      {
       if(data['feed']['entry'][i]['gs$cell']['row'] === "1")
      {
        continue;
      }
      console.log(data['feed']['entry'][i]['gs$cell']['inputValue'])
      tempRows.push([
         data['feed']['entry'][i]['gs$cell']['inputValue'],
         data['feed']['entry'][i + 1]['gs$cell']['inputValue'],
         data['feed']['entry'][i + 2]['gs$cell']['inputValue'],
         data['feed']['entry'][i + 3]['gs$cell']['inputValue'],
         //here
      ])
      
      }

      self.setState({rows: tempRows})

      
    })
    
  }

 

  render()
  {  
    return (
      <div >
        <Navigation></Navigation>
        <div className="queueWrapper">  
        <p className="queueText"><b>Note:</b> If you've been redirected here because you recently placed an order,
          <br></br>
          you will recieve an email in 3-6 hours notifying you that your item has been queued.
          </p>
        <Table striped bordered>  
        <thead>
          <tr>
            <th>Receipt No.</th>
            <th>Created On</th>
            <th>Product</th>
            <th>Status</th>
            {/*here*/}
          </tr>
        </thead>
        
        <tbody>
          {this.state.rows.map((value, index) => 
            <tr>
              <td>{((String(this.state.rows[index])).split(','))[0]}</td>
            
             <td>{((String(this.state.rows[index])).split(','))[1]}</td>
            
              <td>{((String(this.state.rows[index])).split(','))[2]}</td>

              <td>{((String(this.state.rows[index])).split(','))[3]}</td>
              {/*here*/}
            </tr>
        
          )}
        </tbody>
        </Table>
        </div>
      </div>
    )              
  }
}

export default Queue;

