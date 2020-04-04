

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
 
  };

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
  
   // retrieve stories from the database
  // currently retrieves all stories but should be customized to retrieve only those
  // for the logged in user

  getGiggleLibs = () => {
    fetch(baseURL+ '/gigglelibs')
  .then(data => {
    return data.json()},
    err => console.log(err))
  .then(parsedData => this.setState({giggleLibs: parsedData}),
  err => console.log(err))
}

getTemplates = () => {
  fetch(baseURL+ '/templates')
  .then(data => {
    return data.json()},
    err => console.log(err))
  .then(parsedData => this.setState({templates: parsedData}),
   err => console.log(err))
}
  // method that pulls each user input from the input object


   replacer = (match,partOfSpeech) => {
    // use the stripped value, e.g. Noun, Adjective, ProperNoun
    // and retrieve the corresponding value from the input object.
    return this.state.input[partOfSpeech];
  }

  // method that combines user input with the giggle lib template

   makeGiggleLib = () => {
     // strip off the $$ from the placeholders in the template.
     // pass this stripped value to the callback function.
     // $$Noun$$   => Noun: "blah"
      let giggleLib = this.state.template.replace(/\$\$(.*?)\$\$/g, this.replacer);
      this.setState({
        giggleLib: giggleLib
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
}

export default App;
