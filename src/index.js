import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Speakers from './pages/Speakers'
import Queue from './pages/Queue'
import Contact from './pages/Contact'
import About from './pages/About'
import Successful from './pages/Successful'
import Error from './pages/Error'
import Photos from './pages/Photos'
import Building from './pages/Building';
import Bubble from './pages/minor/bubble';
import myComponent from './pages/test/bub';



/*using react router we set a constant equal to whatever component
we would like to render*/
const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Speakers}/>  
      <Route exact path="/admin" component={Speakers}/>  
      <Route exact path="/queue" component={Queue}/>  
      <Route exact path="/contact" component={Contact}/> 
      <Route exact path="/about" component={About}/>   
      <Route exact path='/photos' component={Photos}/>
      <Route exact path='/bubble' component={Bubble}/>
      <Route exact path='/bub' component={myComponent}/>
      <Route exact path='/successfulpaymentredirect' component={Successful}/>
      <Route exact path='/*' component={Error}/>
      
    </Switch>
  </Router>
)

/*the code below reads the path and renders component on a conditional basis.
i.e. /home throws two different components at different places...*/
ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();