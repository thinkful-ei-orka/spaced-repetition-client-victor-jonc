import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
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
      <div className='login-form-container'>
        <form className='LoginForm' onSubmit={this.handleSubmit}>
          <div role='alert' aria-live='polite'>
            {error && <p>{error}</p>}
          </div>
          <div className='login-form-input'>
            <label htmlFor='login-username-input'>
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
            </label>
            <Input
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              className='username'
              placeholder='Username'
              required
            />
          </div>
          <div className='login-form-input'>
            <Label htmlFor='login-password-input'>
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
              id='login-password-input'
              name='password'
              type='password'
              className='password'
              placeholder='Password'
              required
            />
          </div>
          <Button type='submit' className='login-button'>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
