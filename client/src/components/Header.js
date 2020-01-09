import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
    render() {
        const {
          context
        } = this.props;
        const authUser = context.authenticatedUser;

    return (
        <div className="sidenav">
            <div className="bounds">
          <h1 className="header--logo">Global News</h1>
          <nav>
          { authUser ?
            <h3 className="sidenav-welcome">Welcome, {authUser.name}!</h3>
            :
            <h3></h3>
          }
            <NavLink to="/">Home</NavLink>
            {authUser ? (
              <React.Fragment>
                
                <NavLink to="/profile"> Profile </NavLink>
                <NavLink to="/weatherhourly">Weather</NavLink>
                <NavLink to="/signout">Sign Out</NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="signup" to="/register">Sign Up</NavLink>
                <NavLink className="signin" to="/login">Sign In</NavLink>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    )
}
}
