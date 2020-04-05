import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends React.Component {
  
  state = {
    username: '',
    password: ''
  };

  handleChange = (event) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - 
      this.props.history.push('/');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-12">
              <input type="username" className="form-control" placeholder="username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" onSubmit={this.handleSubmit}>Log In</button>
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
