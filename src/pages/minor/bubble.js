import React from 'react';
//import '../../App.css';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import { loadStripe } from '@stripe/stripe-js';
import * as Util from './Util'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from 'react-select';



const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
var pricesDict = []
const items = []

class Bubble extends React.Component { 

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      sessioniId: null,
      items: null,
      selectedOption: null,
      price: null,
      inventory: [],
    
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
  }
  
  returnPrice = (priceId) => {

    for(var i = 0; i < (this.state.inventory).length; i++)
    {
      for(var j = 0; j < (this.state.inventory[i]).length; j++)
      {
        if(String(this.state.inventory[i][j][0]) === String(priceId))
        {
          var first = this.state.inventory[i][0]
          var current = this.state.inventory[i][j]
          var copy = this.state.inventory

          copy[i][0] = current
          copy[i][j] = first

          this.setState({inventory: copy})
        }
      }
    }
  }

  handleChange = (index, productId, priceAmount) => {
    items[index][5] = productId
    items[index][6] = priceAmount
    
    this.returnPrice(productId)
    
  }

  componentDidMount()
  {
    let self = this
    fetch(`/.netlify/functions/allProducts`).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        self.setState({items: JSON.stringify(responseJson)})
        
        var finArr = []
        
        for(var x = 0; x < responseJson.length; x++)
        {
          var arr = []
          for (var key in responseJson[x].LINKS) {
            var right = (String(Object.values(responseJson[x].LINKS[key]))).split(',')
            arr.push([[right[1]], right[2]])
          }
          finArr.push(arr)
        }
        
        self.setState({inventory: finArr})
      });
      
    }
    //pass in product id and search for it in item
    
    //DO NOT TOUCH
    async handleClick(index) {
      alert("hey")
      var buyItem = items[index][5]
      const stripe = await stripePromise
     fetch("/.netlify/functions/productCheckout", {
      method: "POST", 
      body: buyItem
    }).then(function(response) {
      return response.json();
      }).then(function(responseJson) {
        const sessionId = responseJson.session.id;
        stripe.redirectToCheckout({sessionId: sessionId})
      });
    }
    //DO NOT TOUCH


  render()
  {  
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      className: "slides",
      
    };

    if(this.state.items != null)
    {
      var parsedObj = JSON.parse(this.state.items)
      
      for(const [index, value] of parsedObj.entries())
      {
        var name= (<h1 className="name" key={index}>{value.NAME}</h1>)
        var img =
            <Slider {...settings}>
                <div>
                    {<img className="prodImg" src={(value.PICS)[0]} alt="product"></img>}
                </div>
                <div>         
                    {<img className="prodImg" src={(value.PICS)[1]} alt="product"></img>}
                </div>
                <div>         
                    {<img className="prodImg" src={(value.PICS)[2]} alt="product"></img>}
                </div>
                <div>
                    {<img className="prodImg" src={value.PHOTO} alt="product"></img>}
                </div>
            </Slider>
            
            
        var desc = <div>
          
          </div>
        
        var dropList = []
        for(var i = 0; i < (value.LINKS).length; i++)
        {
          for(var key in value.LINKS[i])
          {
            //0 index is ALWAYS product id
            //1 index is ALWAYS price id
            //2 index is ALWAYS price
            pricesDict.push({[value.LINKS[i][key][1]]: value.LINKS[i][key][2]})
            dropList.push({value: value.LINKS[i][key][1], label: key, price: value.LINKS[i][key][2]})
          }  
        }
        var select = <Select 
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
              text: 'orangered',
              primary25: 'gray',
              primary: '#9e84ae ',
            },
          })}    
          className="select" defaultValue={dropList[0]} isSearchable={false} onChange={(e) => this.handleChange(index, e.value, e.price)} options={dropList}></Select>
        var buyNow = <button className="buyNow" onClick={e => this.handleClick(index)}><center>Buy Now</center></button>
        items.push([img, name, desc, select, buyNow, dropList[0].value])
        //items.push(name)
        
        //items.push([name, select])
      }
      
    }

    const isMobile = Util.IsMobileUserAgent()
    var options;
    if(isMobile)
    {
      options = {
        size: 180,
        minSize: 20,
        gutter: 8,
        provideProps: true,
        numCols: 3,
        fringeWidth: 160,
        yRadius: 130,
        xRadius: 220,
        cornerRadius: 50,
        showGuides: false,
        compact: true,
        gravitation: 5
      }
    }
    else
    {
      options = {
        size: 300,
        minSize: 50,
        gutter: 8,
        provideProps: true,
        numCols: 4,
        fringeWidth: 160,
        yRadius: 130,
        xRadius: 220,
        cornerRadius: 50,
        showGuides: false,
        compact: true,
        gravitation: 5
      }
    
    }

    var children = this.state.inventory.map((price, index) => {
        return <div className='child' key={i}>
          <center>{items[index][1]}
              {items[index][3]}
              
            
              <h1 className="price">${price[0][1]}</h1>
              {items[index][4]}
              </center>
          

        </div>
      });
    
      
    return (
      <div >
     
        
        <BubbleUI options={options} className="myBubbleUI">
            {children}
	    </BubbleUI>
      </div>
    )              
  }
}

export default Bubble;

