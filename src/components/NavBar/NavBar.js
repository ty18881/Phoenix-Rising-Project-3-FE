import React from 'react';
import { Link } from 'react-router-dom';
// import './NavBar.css';


class NavBar extends React.Component {
  render() {
    return (
      <div>
       <div>  
         {/* {this.state.user} */}
      <Link to='' className='NavBar-link' onClick={this.props.handleLogout}>LOG OUT</Link>
      <span className='NavBar-welcome'>WELCOME, {this.props.username}</span>
    </div>
    {/* : */}
    <div>
      <Link to='/login' className='NavBar-link'>LOG IN</Link>
      <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>  
</div>
    )
};
}

export default NavBar;

