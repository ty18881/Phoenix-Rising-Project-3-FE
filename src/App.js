
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import logo from './logo.svg';
import "./css/bootstrap.css";
import './App.css';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import userService from './utils/userService';
import tokenService from './utils/tokenService';
import NavBar from './components/NavBar/NavBar'
import ItemModal from './ItemModal'
import NewGiggleLib from './components/NewGiggleLib';
import UpdateGiggleLib from './components/UpdateGiggleLib';


// import Modal from "react-bootstrap/Modal"
// import Button from "react-bootstrap/Button"

// URL to the API

let baseURL = process.env.REACT_APP_BASEURL;




class App extends React.Component {
    // state variables
  // template = the template with placeholder values from the database.
  // input = user's input from GUI.
  // giggleLib = mashup of template + input
  
  state = {
    ...this.getInitialState(),
    // Initialize user if there's a token, otherwise null
    user: userService.getUser(),
  
  
    template: "",
    input: {},
    giggleLib: "",
    giggleLibs: [],
    templates: [] 
  }
  


// changing this to return a JSON collection

fetchGiggleLibs = new Promise((resolve, reject) => {
  fetch(baseURL + "/gigglelibs")
  .then((response) => response.json())
  .then((json) => {
    resolve(json);
  })
})

fetchTemplates = new Promise((resolve, reject) => {
  fetch(baseURL + "/templates")
  .then((response) => response.json())
  .then((json) => {
    resolve(json);
  })
})

 // token authentication 
 getInitialState() {
  return {
    elapsedTime: 0,
    isTiming: true
  };
}

handleSignupOrLogin = () => {
  this.setState({user: userService.getUser()});
}

handleLogout = () => {
  userService.logout();
  this.setState({ user: null });
}



  handleAddGiggleLib = (story) => {
    const copyStories = [...this.state.giggleLibs]
    copyStories.unshift(story);
    this.setState({
      giggleLibs: copyStories
    })
  }


  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }
  
  render() {
    const { items } = this.state
    return (
      <div>
            <NavBar
        user={this.user}
        handleLogout={this.handleLogout}
      />
         <Switch>
          <Route exact path='/signup' render={({ history }) => 
            <SignUpPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
      </div>
    )
  }

componentDidMount = async () => {
 
      let userStories = await this.fetchGiggleLibs;

      let allTemplates = await this.fetchTemplates;

      // checking to see if the promises have returned with the data we seek
      // console.log("Component - got gigglelibs back: ", userStories);
      // console.log("Component - got templates back: ", allTemplates);

      // setting these into our state
      this.setState({
        giggleLibs: userStories,
        templates: allTemplates
      })
  }
}

export default App;
