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
        template={this.state.templates[2]} // this appears to be an empty array not sure why since we did componentDidMount below.
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
