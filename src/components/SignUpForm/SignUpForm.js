import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class SignUpForm extends React.Component {

  state = {
    username: '',
    password: '',
  };

  handleChange = (event) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  // isFormInvalid() {
  //   return !(this.state.name && this.state.password);
  // }

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" >Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
