import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div className='registration-form-container'>
        <form onSubmit={this.handleSubmit}>
          <div role='alert' aria-live='polite'>
            {error && <p>{error}</p>}
          </div>
          <div className='registration-form-input'>
            <Label htmlFor='registration-name-input'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-id'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#2c3e50'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' />
                <rect x='3' y='4' width='18' height='16' rx='3' />
                <circle cx='9' cy='10' r='2' />
                <line x1='15' y1='8' x2='17' y2='8' />
                <line x1='15' y1='12' x2='17' y2='12' />
                <line x1='7' y1='16' x2='17' y2='16' />
              </svg>
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='registration-form-input'>
            <Label htmlFor='registration-username-input'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-user'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#2c3e50'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' />
                <circle cx='12' cy='7' r='4' />
                <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
              </svg>
            </Label>
            <Input
              id='registration-username-input'
              name='username'
              placeholder='Choose a username'
              required
            />
          </div>
          <div className='registration-form-input'>
            <Label htmlFor='registration-password-input'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-key'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#2c3e50'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' />
                <circle cx='8' cy='15' r='4' />
                <line x1='10.85' y1='12.15' x2='19' y2='4' />
                <line x1='18' y1='5' x2='20' y2='7' />
                <line x1='15' y1='8' x2='17' y2='10' />
              </svg>
            </Label>
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              placeholder='Choose a password'
              required
            />
          </div>
          <footer className='registration-footer'>
            <Button className='register-button' type='submit'>
              Sign up
            </Button>{' '}
            <Link to='/login' className='already-link'>
              Already have an account?
            </Link>
          </footer>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
