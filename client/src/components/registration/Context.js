import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (user_name, password) => {
    console.log('usernameAAAA', user_name);
    console.log('passsswoDDDD', password);
    
    const user = await this.data.getUser(user_name, password);
    console.log('CONTEXT USER', user);
    
    let user2;
    if (user !== null) {
      console.log('signin userrrrrrr', JSON.stringify(user.user_name));
      user2 = {name: user.first_name, username: user.user_name,};
      console.log('json parSEEE',JSON.stringify(user2));
      
      
      console.log('user222', user2);
      
      this.setState(() => {
        return {
          authenticatedUser: user2,
        };
      });
      console.log('authenticated USERRRR', this.authenticatedUser);
      
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user2), cookieOptions);
    }
    return user2;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

