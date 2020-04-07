import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogIn(this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" />
          <input  type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
