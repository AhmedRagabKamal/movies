import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  scheme = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('Username', 'username')}
        {this.renderInput('Password', 'password', 'password')}
        {this.renderButton('Login')}
      </form>
    );
  }
}

export default LoginForm;
