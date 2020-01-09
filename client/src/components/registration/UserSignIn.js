import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    user_name: '',
    password: '',
    errors: [],
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
    console.log('ddddddddddddddddddddddddddddddddddd');

    const {context} = this.props;
    console.log('CONTEXTTTTTTTTTTTTTT', context);

    const {from} = this.props.location.state || {from: {pathname: '/authenticated'}};

    const {user_name,password} = this.state;
    console.log('userrrrrrrrrr',user_name);
    
    context.actions.signIn(user_name, password)
      .then((user) => {
        console.log('User signin fileeee', user);
        
        if (user === null) {
          this.setState(() => {
            return {
              errors: ['Sign-in was unsuccessful']
            };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error('user exist buttt',error);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      user_name,
      password,
      errors,
    } = this.state;
    
    console.log('Sigin username',user_name);
    console.log('Sigin password', password);
    console.log('Sigin errors', errors);
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
            Don't have a user account? <Link to="/register">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }
}
