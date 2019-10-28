import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  scheme = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('Username', 'username', 'email')}
        {this.renderInput('Password', 'password', 'password')}
        {this.renderInput('Name', 'name')}
        {this.renderButton('Register')}
      </form>
    );
  }
}

export default RegisterForm;
