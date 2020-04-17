
import React, { Component } from 'react';

import "./css/bootstrap.css";
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Homepage from "./pages/homepage"
import NavBar from './components/NavBar/NavBar'




// import Modal from "react-bootstrap/Modal"
// import Button from "react-bootstrap/Button"


// URL to the API

let baseURL = process.env.REACT_APP_BASEURL;
// let baseURL = "http://localhost:3003"



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
    // username: "",
    // password: "",
    loggedIn: false,
    wrongPassword: false,  
  };
  
  
     
  
   // retrieve stories from the database
  // currently retrieves all stories but should be customized to retrieve only those
  // for the logged in user


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


  handleFormUpdate = () => {
    return e => {
      const field = e.target.name
      const { form } = this.state
      form[field] = e.target.value
      this.setState({ form })
    }
  }

  handleModalHide = () =>{
    return () => {
      let { giggleLibs } = this.state
      giggleLibs = giggleLibs.map(gigglelib => ({
        ...gigglelib,
        showModal: false,
      }))
      this.setState({ giggleLibs })
    }

  }
  handleFormUpdate = () => {
    return e => {
      const field = e.target.name
      const { form } = this.state
      form[field] = e.target.value
      this.setState({ form })
    }
  }
  handleModalHide = () =>{
    return () => {
      let { giggleLibs } = this.state
      giggleLibs = giggleLibs.map(gigglelib => ({
        ...gigglelib,
        showModal: false,
      }))
      this.setState({ giggleLibs })
    }
  }
  handleModalShow = ()=> {
    return e => {
      e.preventDefault()
      this.setState({ showModal: true })
    }
  }
  handleEditItem = (selectedItem) => {
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
  handleItemChange = (gigglelibId) => {
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
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };


  handleSignUp = () => {
    console.log("signup clicked")
    // event.preventDefault();
    fetch(baseURL + "/users", {
      method: "POST",
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


  handleModalShow = ()=> {
    return e => {
      e.preventDefault()

      this.setState({ showModal: true })
    }
  }

  handleEditItem = (selectedItem) => {
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

  handleItemChange = (gigglelibId) => {
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


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

 

  handleSignUp = (username, password) => {
    
    fetch(baseURL + "/users", {
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
        // console.log(resJson);
        this.setState({
          loggedIn: true, 
          username: resJson.username, 
        });
        console.log("sign up successful!")
      })
      .catch((error) => console.error({ Error: error }));
  };



  handleLogIn = (username, password) => {
    console.log("login clicked");
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
        this.setState({
          loggedIn: true,
          wrongPassword: false,
          username: resJson.username,
        });
        console.log("login successful!")
      })
      .catch((error) => console.error({ Error: error }));
      this.setState({wrongPassword: true})
  };



  handleLogOut = () => {
    this.setState({loggedIn: false})
  }


  filterUserStories = (storyList) => {
    let userStories = this.state.giggleLibs.filter(story => story.owner === this.props.username);
    this.setState({
      userStories: userStories
    })
  }


  render() {
    const { items } = this.state

    return (
      <div>
      {!this.state.loggedIn && this.state.wrongPassword === false ? 
        <div>
        <h1> Welcome to Giggle Libs!</h1>
        <h2>Please Sign Up</h2> 
      <SignUpForm handleSignUp={this.handleSignUp}  />
      <h2>Or Log In</h2>
      <LoginPage handleLogIn={this.handleLogIn} /> 
      </div>
    : null }

    {this.state.wrongPassword ?
    <div>
      <h1> Welcome to Giggle Libs! </h1>
      <h2>Incorrect password or username, please try again</h2>
      <LoginPage handleLogIn={this.handleLogIn} /> 
    </div>
    :null}


    {this.state.loggedIn && this.state.wrongPassword === false ?
        <div>   <NavBar
          handleLogOut={this.handleLogOut}
          username={this.state.username}
          />
          <Homepage
          username={this.state.username}
          templates={this.state.templates}
          baseURL={baseURL}

          giggleLibs={this.state.giggleLibs}
          handleDelete={this.state.handleChange}

          // giggleLibs={this.state.giggleLibs}
          giggleLibs={this.state.giggleLibs.filter(story => story.owner === this.state.username)}

          />
       
        </div>

    : null}
      
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