import React from 'react';
import './App.css';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect
} from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import Nearbyweather from './components/weather/Nearbyweather';
import CitySearch from './components/weather/CitySearch';
import World2 from './components/globes/WorldMap2';
import WorldMapNews from './components/globes/WorldMapNews';
// import News1 from './News1';
// import Login from './components/Login';
// import Registration from './components/Registration';
import Profile from './components/registration/Profile';
import Header from './components/Header';
import WorldMap3 from './components/globes/WorldMap3';

import NotFound from './components/registration/NotFound';
import UserSignUp from './components/registration/UserSignUp';
import UserSignIn from './components/registration/UserSignIn';
import UserSignOut from './components/registration/UserSignOut';
import Authenticated from './components/registration/Authenticated';
import PrivateRoute from './PrivateRoute';
import Public from './components/registration/Public';
import WeatherHourly from './components/weather/Weatherhourly';

import withContext from './components/registration/Context';
//import { UserRegistration } from './services/RegistrationService';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme()

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const ProfileWithContext = withContext(Profile);

export default () => (
    
    //<HashRouter>
    <BrowserRouter>  
      <div >
      <span className="menu" style={{fontSize:"30px",color:"tomato"}}>&#9776;</span>
      <HeaderWithContext />

      
        <Switch>
          
          <Route exact path="/" component={World2} />
          <PrivateRoute path="/authenticated" component={ProfileWithContext} />
          <Route path="/profile" component={ProfileWithContext} />
          <Route path="/login" component={UserSignInWithContext} />
          <Route path="/register" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} /> 
          <Route path="/weatherhourly" component={WeatherHourly} />    
          <Route component={NotFound}/>
          {/* <Redirect from="/login" to="/" /> */}
        </Switch>
      </div>
    </BrowserRouter>  
    //</HashRouter>
);
