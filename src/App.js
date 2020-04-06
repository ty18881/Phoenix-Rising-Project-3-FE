

import React, { Component } from 'react';
import { Route, Router, Link, Redirect, withRouter } from 'react-router-dom';


// import logo from './logo.svg';
import "./css/bootstrap.css";
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Homepage from "./pages/homepage"
import NavBar from './components/NavBar/NavBar'
// import ItemModal from './ItemModal'


// URL to the API

let baseURL = "http://localhost:3003";



class App extends React.Component {
    // state variables
  // template = the template with placeholder values from the database.
  // input = user's input from GUI.
  // giggleLib = mashup of template + input
  
  state = {
    template: "",
    input: {},
    giggleLib: "",
    giggleLibs: [],
    templates: [],
    username: "",
    password: "",
    loggedIn: false,
    wrongPassword: false
  };

  
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

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  updateLogIn = () => {
    this.setState({
      loggedIn: true,
    })
  }


  handleSignUp = (event) => {
    console.log("signup clicked")
    // event.preventDefault();
    fetch(baseURL + "/users", {
      method: "POST",
      redirect: "follow",
       headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ 
          username: this.state.username,
          password: this.state.password
          }),
    })
    .then(res => res.json())
    .then(data => {
      return data.json()},
      console.log("sign up success!!"),
     this.setState({loggedIn: true, 
    }),
      err => console.log(err))
    .catch(error => console.log(error));
  };


  handleLogIn = (username, password) => {
    console.log(username, password);
    fetch(baseURL + "/sessions", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        this.setState({
          loggedIn: true
        });
      })
      .catch((error) => console.error({ Error: error }));
      this.setState({wrongPassword: true})
  };


  handleLogOut = () => {
    this.setState({loggedIn: false})
  }


  render() {
    const { items } = this.state
    return (
      <div>
      {!this.state.loggedIn && this.state.wrongPassword === false ? 
        <div>
        <h1> Welcome to Giggle Lib </h1>
        <h2>Please Sign Up</h2> 
      <SignUpForm handleSignUp={this.handleSignUp}  />
      <h2>Or Log In</h2>
      <LoginPage handleLogIn={this.handleLogIn} /> 
      </div>
    : null }
    
    {this.state.wrongPassword ?
    <div>
      <h1> Welcome to Giggle Lib </h1>
      <h2>Incorrect password or username, please try again</h2>
      <LoginPage handleLogIn={this.handleLogIn} /> 
    </div>
    :null}

    {this.state.loggedIn && this.state.wrongPassword === false ?
        <div>
          <Homepage />
          <NavBar
          handleLogOut={this.handleLogOut}
          />
        </div>

    : null}

      
    
      </div>
    )
  }
}

export default App;
