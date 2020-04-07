import React from "react";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSignUp(this.state.username, this.state.password);
  };

  render() {
    return (
      <>
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.name} placeholder="username"/>
          <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <input type="submit" value="Sign Up" />
        </form>
      </>
    );
  }
}

export default SignUp;