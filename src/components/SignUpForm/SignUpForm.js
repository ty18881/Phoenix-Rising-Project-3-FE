import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SignUpForm extends React.Component {

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    this.props.handleSignUp(this.state.username, this.state.password);
  };
  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="username"  name="username" onChange={this.handleChange} value={this.props.username}  />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="password"name="password"  onChange={this.handleChange} value={this.props.password} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              
            </div>
          </div>
          <input type="submit" value="Sign Up"/>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
