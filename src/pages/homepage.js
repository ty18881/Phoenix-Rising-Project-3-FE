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
    let currentTemplate = {};
  
      // this method renders the UpdateGiggleLib component when the "edit" button
      // is clicked for a story.
      // 4/9/2020 - DEFECT - renders the update for all stories, not just the one where
      // "edit" button is clicked.


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



