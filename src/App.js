
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

// let baseURL = process.env.REACT_APP_BASEURL;
let baseURL = "http://localhost:3003"



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getInitialState(),
      // Initialize user if there's a token, otherwise null
    user: userService.getUser(),
    template: "",
    input: {},
    giggleLib: "",
    giggleLibs: [],
    templates: [] 
  }

    this.handleItemChange = this.handleItemChange.bind(this)
  }

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

  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  getInitialState() {
    return {
      elapsedTime: 0,
      isTiming: true
    };
  }


  handleFormUpdate() {
    return e => {
      const field = e.target.name
      const { form } = this.state
      form[field] = e.target.value
      this.setState({ form })
    }
  }

  handleModalHide() {
    return () => {
      let { giggleLibs } = this.state
      giggleLibs = giggleLibs.map(gigglelib => ({
        ...gigglelib,
        showModal: false,
      }))
      this.setState({ giggleLibs })
    }
  }

  handleModalShow() {
    return e => {
      e.preventDefault()

      this.setState({ showModal: true })
    }
  }

  handleEditItem(selectedItem) {
    return e => {
      e.preventDefault()
      let { giggleLibs } = this.state
      giggleLibs = giggleLibs.map(gigglelib => ({
        ...gigglelib,
        showModal: selectedItem.id === gigglelib.id,
      }))
      this.setState({ giggleLibs })
    }
  }

  handleItemChange(gigglelibId) {
    return e => {
      let { gigglelibs } = this.state
      gigglelibs = gigglelibs.map(gigglelib => {
        if (gigglelib.id === gigglelibId) {
          gigglelib[e.target.name] = e.target.value
        }
        return gigglelib
      })
      this.setState({ gigglelibs })
    }
  }

  
  render(){
      const { gigglelibs } = this.state
      console.log("render-state", this.state)
  return(
    <div>
     <h2>Hello World</h2>
     {this.state.giggleLibs.map((gigglelib, index) =>
  <div key={index} className="story">
  
   <a 
    clasname="btn btn-primary"
    onClick={this.handleEditItem(gigglelib)}
    > <p> {gigglelib.name} </p>
      </a>
  </div>
  
)}
{this.state.giggleLibs.map((gigglelib, index) =>
    <ItemModal
    key={gigglelib.id}
    show={gigglelib.showModal}
    onHide={this.handleModalHide()}
    onItemChange={this.handleItemChange}
    item={gigglelib}
  />  
)}
<NewGiggleLib 
baseURL={baseURL}
handleAddGiggleLib={this.handleAddGiggleLib}
makeGiggleLib={this.makeGiggleLib}
replacer={this.replacer}
template={this.state.templates[0]} // this appears to be an empty array not sure why since we did componentDidMount below.
handleNewUserInput={this.handleNewUserInput} // callback fcn used to update input object in state.
/>
</div>

  
    )
  }
  componentDidMount = async () => {
 
    let userStories = await this.fetchGiggleLibs;

    let allTemplates = await this.fetchTemplates;

    // checking to see if the promises have returned with the data we seek
    console.log("Component - got gigglelibs back: ", userStories);
    console.log("Component - got templates back: ", allTemplates);

    // setting these into our state
    this.setState({
      giggleLibs: userStories,
      templates: allTemplates
    })
}
}

export default App;
