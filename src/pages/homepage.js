import React, { Component } from 'react';

import "../css/bootstrap.css";


import NewGiggleLib from '../components/NewGiggleLib';
import UpdateGiggleLib from '../components/UpdateGiggleLib';

class Homepage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
      items: [
        {showModal: false },
        
      ],
      displayForm: false,
    }
    
  }

  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
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
    currentStory: story,
    currentStoryId: story._id
  })

}


  render(){
      
      let currentTemplate = {};
      
      if (this.state.displayForm) {
         currentTemplate = this.props.templates.find(myTemplate => myTemplate.name === this.state.currentStory.source_template);
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
         {this.props.giggleLibs.length > 0 ?
        //  && this.props.templates.owner === this.props.username  

        <div>
            <h1>Your Gigglelibs</h1> 
                <div>
                  {this.props.giggleLibs.map((giggleLibs, index) => (
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
        : null}

         </div>
    )
  }
}
    
    
    export default Homepage;