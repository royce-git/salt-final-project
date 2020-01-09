import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      first_name,
      last_name,
      user_name,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="first_name" 
                  name="first_name" 
                  type="text"
                  value={first_name} 
                  onChange={this.change} 
                  placeholder="First Name" />
                  <input 
                  id="last_name" 
                  name="last_name" 
                  type="text"
                  value={last_name} 
                  onChange={this.change} 
                  placeholder="Name" />
                
                <input 
                  id="user_name" 
                  name="user_name" 
                  type="text"
                  value={user_name} 
                  onChange={this.change} 
                  placeholder="User Name" />
                
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/login">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      first_name,
      last_name,
      user_name,
      password,
    } = this.state;

    // Create user
    const user = {
      first_name,
      last_name,
      user_name,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(user_name, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
