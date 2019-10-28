import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../common/input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.state.errors;
    const errorMessage = this.validateProperty(input);
    errors[input.name] = errorMessage;
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const scheme = { [name]: this.scheme[name] };
    const { error } = Joi.validate(obj, scheme);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.scheme, options);
    if (!error) return null;
    const errors = {};
    console.log(error.details);
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton = label => (
    <button disabled={this.validate()} className="btn btn-primary">
      {label}
    </button>
  );

  renderInput = (label, name, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (label, name, options = []) => {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  };
}

export default Form;
