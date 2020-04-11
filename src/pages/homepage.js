import React, { Component } from 'react';

import "../css/bootstrap.css";


import NewGiggleLib from '../components/NewGiggleLib';
import UpdateGiggleLib from '../components/UpdateGiggleLib';

class Homepage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
     
      displayForm: false,
      giggleLibs: this.props.giggleLibs,
      userStories: []
    }
    
  }

  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  
  
  handleAddGiggleLib = (story) => {
    console.log("Handle Add GiggleLib - New Story", story);
    const copyStories = [...this.state.giggleLibs]
    copyStories.unshift(story);
    this.setState({
      giggleLibs: copyStories
    })
    }

displayUpdateForm = (story) => {
  console.log("Display Form Clicked");
  this.setState({
    displayForm: !this.state.displayForm,
    currentStory: story,
    currentStoryId: story._id
  })

}



  render(){
      
      let currentTemplate = {};
      
      if (this.state.displayForm) {
         currentTemplate = this.props.templates.find(myTemplate => myTemplate.name === this.state.currentStory.source_template);
      }
      
      // this method takes the whole collection of stories passed from App.js and filters them by username.
      // this.filterUserStories(this.state.giggleLibs)
      
      
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
         
{/* If the current user doesn't have any stories,  
want to welcome them and prompt them to create a new story. */}

      


    {this.state.giggleLibs.length > 0 ? 
        <div>
          
            <h1>Your Gigglelibs</h1> 
                <div>
                    {this.state.giggleLibs.map((giggleLibs, index) => (
                    <div key={giggleLibs.id}>
                  <h2>{giggleLibs.name}</h2>
                    <p>{giggleLibs.text}</p>
                    <button onClick={()=>this.displayUpdateForm(giggleLibs)}>Edit</button>
                    <button >Delete</button>
                    
                    {this.state.displayForm && (this.state.currentStoryId === giggleLibs._id) ? 
                              <UpdateGiggleLib
                                    handleNewUserInput={this.handleNewUserInput}
                                    handleAddGiggleLib={this.handleAddGiggleLib}
                                    template={currentTemplate}
                                    baseURL={this.props.baseURL}
                                    giggleLib={this.state.currentStory}
                              />  : null}
                </div>
              
                ))}
              </div>
          </div>
        : <h1>Create Your First Story!</h1> }

         </div>
    )
  }
}
    
    
    export default Homepage;