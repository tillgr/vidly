import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = {abortEarly: false};
    const {error} = Joi.validate(this.state.data, this.schema, options)
    if (!error) return null;

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  validateProperty = ({name, value}) => {
    const obj = {[name]: value};  //object für überprüfung erstellen
    const schema = {[name]: this.schema[name]}; //subschema auslesen
    const {error} = Joi.validate(obj, schema);  //gegeneinander validieren
    return error ? error.details[0].message : null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();   //get errors
    this.setState({errors: errors || {}});
    //value is either error object or empty obj.

    this.doSubmit();
  }

  doSubmit = () => {
    //call the server
    console.log("Submitted")
  }

  handleChange = ({currentTarget: input}) => {
    const errors = {...this.state.errors};  //state klonen
    const errorMessage = this.validateProperty(input);  //error message bekommen
    if (errorMessage) errors[input.name] = errorMessage;  //error message setzen
    else delete errors[input.name]; //ansonsten clearen

    const data = {...this.state.data};
    data[input.name] = input.value;

    this.setState({data, errors})
  }

  //return components and hook to onChange event
  //button type is submit by default
  renderButton(label) {
    return (<button className="btn btn-primary mt-2"
                    disabled={this.validate()}>{label}
    </button>)
  }

  renderInput(name, label, type = 'text') {
    const {data, errors} = this.state;

    return (<Input onChange={this.handleChange}
                   name={name}
                   label={label}
                   value={data[name]}
                   error={errors[name]}
                   type={type}
    />)
  }

  renderSelect(name, label, options) {
    const {data, errors} = this.state;

    return (<Select onChange={this.handleChange}
                    name={name}
                    label={label}
                    value={data[name]}
                    error={errors[name]}
                    options={options}

    />)
  }
}

export default Form;