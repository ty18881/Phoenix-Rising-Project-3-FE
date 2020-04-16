import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
// import './NavBar.css';
class NavBar extends React.Component {
  render() {
    return (
      <div>
       <Nav className= "justify-content-end" defaultActiveKey="/"> 
          <h3>Welcome {this.props.username}</h3>
          <Nav.Link href="" onClick={this.props.handleLogOut}><h3>LOG OUT</h3></Nav.Link>
      </Nav>
</div>
    )
};
}
export default NavBar;
