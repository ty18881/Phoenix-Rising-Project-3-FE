import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
// import './NavBar.css';


class NavBar extends React.Component {
  render() {
    return (
      <div>
       <Nav defaultActiveKey="/" className="flex-column"> <hr/>
          <Nav.Link href="" onClick={this.props.handleLogOut}><h3>LOG OUT</h3></Nav.Link>
          <Nav.Link href=""><h3> MAKE NEW GIGGLELIB</h3></Nav.Link>   
      </Nav>
</div>


    )
};
}

export default NavBar;

