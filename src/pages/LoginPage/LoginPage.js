import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './LoginPage.css';


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
      <>
        <h3>Please sign in to continue</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" />
          <input  type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <input type="submit" value="Log In" />
        </form>
      </>
    );
  }
}

export default LoginPage;
