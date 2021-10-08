import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import Navbar from "./components/Navbar";

// import pages
import Main from "./Pages/Main"
import Search from "./Pages/Search"
import Watched from "./Pages/Watched/";
import WatchLater from "./Pages/WatchLater";
import Movie from "./Pages/Movie";

import Footer from "./components/Footer";

import BackgroundImg from './assets/background.jpg'
import styled from 'styled-components'

const MainImg = styled.img`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -5;
    min-height: 200px;
    position: fixed;
`

const MainImgCover = styled.div`
  &::before {
    z-index: -4;
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-box-shadow: inset 0px -500px 300px -29px rgba(0,0,0,0);
    -moz-box-shadow: inset 0px -500px 300px -29px rgba(0,0,0);
    box-shadow: inset 0px -500px 300px -29px rgba(0,0,0);
  } 
`

export const App = props => {
  useEffect(() => {
    localStorage.setItem("watchLaterList", JSON.stringify(props.watchLaterList))
    localStorage.setItem("watchedList", JSON.stringify(props.watchedList))

  }, [props])
  return (
    <>
      <Router>        
        
        <Navbar />

        <MainImgCover>
          <MainImg src={BackgroundImg} />
        </MainImgCover>

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/search">
            <Search />
          </Route>

          <Route exact path="/watchlater">
            <WatchLater />
          </Route>

          <Route exact path="/watched">
            <Watched />
          </Route>

          <Route exact path="/movie">
            <Movie />
          </Route>
          
        </Switch>

        <Footer />

      </Router>
    </>
  );
}

const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps)(App);