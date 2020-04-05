import React from 'react';


import "./css/bootstrap.css";

import NewGiggleLib from './components/NewGiggleLib';
import UpdateGiggleLib from './components/UpdateGiggleLib';

// import Modal from "react-bootstrap/Modal"
// import Button from "react-bootstrap/Button"

// URL to the API

// let baseURL = process.env.REACT_APP_BASEURL;

let baseURL = "http://localhost:3003";

// console.log("Current Base URL", baseURL);



// fetch(baseURL+ '/gigglelibs')
//   .then(data => {
//     return data.json()},
//     err => console.log(err))
//   .then(parsedData => console.log(parsedData),
//    err => console.log(err))
   
//    fetch(baseURL+ '/templates')
//   .then(data => {
//     return data.json()},
//     err => console.log(err))
//   .then(parsedData => console.log(parsedData),
//    err => console.log(err));


  

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


// getTemplates = () => {
//   let tempCollection =[];
// console.log("Get Templates - Called");
//   fetch(baseURL+ '/templates')
//   .then(data => {
//     return data.json()},
//     err => console.log(err))
//   .then(parsedData => this.setState({templates: parsedData}),
//    err => console.log(err))
//    console.log("Get Templates - before return", tempCollection)
//    return tempCollection;
// }
  // method that pulls each user input from the input object


   replacer = (match,partOfSpeech) => {
    // use the stripped value, e.g. Noun, Adjective, ProperNoun
    // and retrieve the corresponding value from the input object.
    console.log("Replacer - Part of Speech", partOfSpeech);
    
    return this.state.input[partOfSpeech];
  }

  // method that combines user input with the giggle lib template

  //  makeGiggleLib = () => {
  //    // strip off the $$ from the placeholders in the template.
  //    // pass this stripped value to the callback function.
  //    // $$Noun$$   => Noun: "blah"
  //    console.log("MakeGiggleLib - Before Replacer - the template", this.state.template);
  //     let giggleLib = this.state.template.replace(/\$\$(.*?)\$\$/g, this.replacer);
  //     this.setState({
  //       giggleLib: giggleLib
  //     })
  //     console.log("MakeGiggleLib - After Replacer - New GL",giggleLib);
  // }

  makeGiggleLib = (template, currentInput) => {

    // this.setState({
    //   input: currentInput
    // })

    // this.setState((state) => {
    //   return { input: currentInput}
    // })

    console.log("MakeGiggleLib - Current Input: ", currentInput);
    console.log("MakeGiggleLib - State Input: ", this.state.input);
    let giggleLib = template.replace(/\$\$(.*?)\$\$/g, this.replacer);
    return giggleLib;

  }
  // eventually will retrieve a random template from the collection
  // for now, just returns the first item.
  // getRandomTemplate = () => {
  //   this.setState({
  //     template: this.state.templates[0]
  //   }) 
  // }

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
  

    render () {
      

  return (
    <div className="App">
      
      <NewGiggleLib 
        baseURL={baseURL}
        handleAddGiggleLib={this.handleAddGiggleLib}
        makeGiggleLib={this.makeGiggleLib}
        replacer={this.replacer}
        template={this.state.templates[0]} // this appears to be an empty array not sure why since we did componentDidMount below.
        handleNewUserInput={this.handleNewUserInput} // callback fcn used to update input object in state.
        />
      <div className="container">
        <h1>GiggleLibs!</h1>
        {this.state.giggleLibs.map((story, index) =>
          <div key={index} className="story">
           <p> {story.name} </p>
          </div>
          
        )}
        
      </div>
      

      
    </div>
  );

  


}
// problem detected here.
// the first call works successfully and the GiggleLibs array in state is populated
// however the second, templates is null.
// When I reverse the order of the calls, the array from the first call is populated
// but the second is not.
  

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
