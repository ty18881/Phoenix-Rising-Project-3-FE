import React, { Component } from 'react';

import "../css/bootstrap.css";

import LoginPage from '../pages/LoginPage/LoginPage';
import NewGiggleLib from '../components/NewGiggleLib';
import UpdateGiggleLib from '../components/UpdateGiggleLib';

let baseURL = process.env.REACT_APP_BASEURL;

class Homepage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
      items: [
        {showModal: false },
        
      ],
      displayForm: false,
    }
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
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
      let { items } = this.state
      items = items.map(item => ({
        ...item,
        showModal: false,
      }))
      this.setState({ items })
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
      let { items } = this.state
      items = items.map(item => ({
        ...item,
        showModal: selectedItem.id === item.id,
      }))
      this.setState({ items })
    }
  }

  handleItemChange(itemId) {
    return e => {
      let { items } = this.state
      items = items.map(item => {
        if (item.id === itemId) {
          item[e.target.name] = e.target.value
        }
        return item
      })
      this.setState({ items })
    }
  }

  
  handleAddGiggleLib = (story) => {
    const copyStories = [...this.props.giggleLibs]
    copyStories.unshift(story);
    this.setState({
      giggleLibs: copyStories
    })
    }

displayUpdateForm = (story) => {
  console.log("Display Form Clicked");
  this.setState({
    displayForm: !this.state.displayForm,
    currentStory: story
  })
}

handleDelete = (id) => {
  console.log("delete clicked" + id);
  fetch(baseURL + '/gigglelibs/' + id, {
    method: 'DELETE'
  }).then( response => {
    const findIndex = this.props.giggleLibs.findIndex(giggleLibs => giggleLibs._id === id)
    const copyLib = [...this.props.giggleLibs]
    copyLib.splice(findIndex, 1)
    this.setState({
      giggleLibs: copyLib
    })
    console.log("delete complete")
  })
}


  render(){
      const {items} = this.state
      let updateForm = "";
  
      // this method renders the UpdateGiggleLib component when the "edit" button
      // is clicked for a story.
      // 4/9/2020 - DEFECT - renders the update for all stories, not just the one where
      // "edit" button is clicked.


 checkUser = (story, ) => {
  currentUserLibs = this.props.giggleLibs.owner === this.props.username;
        this.setState({currentUserLibs: userLibs});
          }
          
let userLibs = this.props.giggleLibs.filter(story => story.owner === this.props.username);







      if ( this.state.displayForm ) {
        console.log("Displaying Form with story", this.state.currentStory);
        // pull the template behind this story from the templates array

        let currentTemplate = this.props.templates.find(myTemplate => myTemplate.name === this.state.currentStory.source_template);
        console.log("Displaying Form with Template", currentTemplate);
        updateForm = (
          <div>
             <UpdateGiggleLib
                   handleNewUserInput={this.handleNewUserInput}
                   handleAddGiggleLib={this.handleAddGiggleLib}
                   template={currentTemplate}
                   baseURL={this.props.baseURL}
                   giggleLib={this.state.currentStory}
                   /> 
          </div>
        )
        
   }

  return(
    <div>
        <div className="box">
        <h1>Welcome to Gigglelibs!</h1>
        </div>
       
        
        <NewGiggleLib
          handleNewUserInput={this.handleNewUserInput}
          handleAddGiggleLib={this.handleAddGiggleLib}
          username={this.props.username}
          templates={this.props.templates}
          baseURL={this.props.baseURL}
        />
     
        <div>
            <h1>Your Gigglelibs</h1> 
                <div>
                  {this.props.userLibs.map((userLibs) => (
                  <div key={userLibs._id}>
                  <h2>{userLibs.name}</h2>
                  <p>{userLibs.text}</p>
                  <button onClick={()=>this.displayUpdateForm(userLibs._id)}>Edit</button>
                  <button onClick={()=>this.handleDelete(userLibs._id)}>Delete</button>
                  {updateForm}
                   </div>
                ))}
              </div>
          </div>
        : <h2>You have no GiggleLibs, fill out the form to get started!</h2>}


         </div>
    )
  }
}
    
    
    export default Homepage;



