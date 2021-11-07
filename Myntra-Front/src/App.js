import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import Product from './components/Product/Productindex';
import {pdOne,pdTwo,pdThree,pdFour,pdFive,pdSix,pdSeven,pdEight,pdNine,pdTen,pdEleven,pdTwelve,pdThirteen,pdFourteen } from './components/Product/data';
import ScroolToTop from './components/ScroolToTop';
import VideoCall from './components/VideoCall/Header';
function App() {
  return (
    <Router>
      <ScroolToTop/>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/prod1">
          <Product {...pdOne} />
        </Route>
        <Route exact path="/prod2">
          <Product {...pdTwo}/>
        </Route>
        <Route exact path="/prod3">
          <Product {...pdThree}/>
        </Route>
        <Route exact path="/prod4">
          <Product {...pdFour}/>
        </Route>
        <Route exact path="/prod5">
          <Product {...pdFive}/>
        </Route>
        <Route exact path="/prod6">
          <Product {...pdSix}/>
        </Route>
        <Route exact path="/prod7">
          <Product {...pdSeven}/>
        </Route>
        <Route exact path="/prod8">
          <Product {...pdEight}/>
        </Route>
        <Route exact path="/prod9">
          <Product {...pdNine}/>
        </Route>
        <Route exact path="/prod10">
          <Product {...pdTen}/>
        </Route>
        <Route exact path="/prod11">
          <Product {...pdEleven}/>
        </Route>
        <Route exact path="/prod12">
          <Product {...pdTwelve}/>
        </Route>
        <Route exact path="/prod13">
          <Product {...pdThirteen}/>
        </Route>
        <Route exact path="/prod14">
          <Product {...pdFourteen}/>
        </Route>
        <Route exact path="/video-call">
           <VideoCall/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
