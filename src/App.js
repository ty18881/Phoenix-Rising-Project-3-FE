import React from 'react';
import logo from './logo.svg';
import './App.css';


// URL to the API

// let baseURL = process.env.REACT_APP_BASEURL;

let baseURL = "http://localhost:3003";

console.log("Current Base URL", baseURL);

fetch(baseURL+ '/gigglelibs')
  .then(data => {
    return data.json()},
    err => console.log(err))
  .then(parsedData => console.log(parsedData),
   err => console.log(err))
   
   fetch(baseURL+ '/templates')
  .then(data => {
    return data.json()},
    err => console.log(err))
  .then(parsedData => console.log(parsedData),
   err => console.log(err));

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
    templates: []
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

    render () {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}}

export default App;
