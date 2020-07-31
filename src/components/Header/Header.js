import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className='logged-in-header'>
        <span className='header-username'>{this.context.user.name}</span>
        <nav>
          <Link onClick={this.handleLogoutClick} to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>
          <button className='login-buttons'>Login</button>
        </Link>{' '}
        <Link to='/register'>
          <button className='login-buttons'>Sign up</button>
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header role='navigation'>
        <h1>
          <Link to='/'>Learn Spanish!</Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
