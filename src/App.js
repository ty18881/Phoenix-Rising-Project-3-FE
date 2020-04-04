import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import userService from './utils/userService';
import tokenService from './utils/tokenService';
import NavBar from './components/NavBar/NavBar'


class App extends React.Component {
  state = {
    ...this.getInitialState(),
    // Initialize user if there's a token, otherwise null
    user: userService.getUser()
  };

  // token authentication 
  getInitialState() {
    return {
      elapsedTime: 0,
      isTiming: true
    };
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
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
          {/* <NavBar
        user={this.user}
        handleLogout={this.handleLogout}
      /> */}
         <Switch>
          <Route exact path='/signup' render={({ history }) => 
            <SignUpPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
        </header>
      </div>
    );
  }
}

export default App;
