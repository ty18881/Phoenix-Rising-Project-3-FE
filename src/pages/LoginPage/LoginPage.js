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
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
          <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username"/>
          </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
          <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"  />
          </div>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </>
    );
  }
}


export default LoginPage;
