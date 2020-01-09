import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
//import profilePic from './logo192.png';
import profilePic from './avatar.jpg';
import './theme.css';
import './userPage.css';

export default ({context}) => {
    console.log('Props profile', context);
    const authUser = context.authenticatedUser;
    console.log('profile ', authUser);
    
    
    return (
        <div>
            
        {/* <Card key={authUser.name} classNameName="cardsss" style={{ width: '18rem' }}>
            <CardImg variant="top" src={profilePic} alt="profilePic"/>
            <CardBody>
             <CardTitle>{authUser.name}</CardTitle>
            <CardText> {authUser.name} is signed in
            </CardText>
            <Button variant="primary" onClick={context.actions.signOut}>Sign Out</Button>
            </CardBody>
        </Card>  */}
        
    
    <section className="bg--secondary space--sm">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="boxed boxed--lg boxed--border">
            <div className="text-block text-center">
            
              <img alt="avatar" src={ profilePic } className="image--sm" />
              
              <span className="h3">{authUser.name}</span>
              <span>Verified User</span>

            </div>
            
            <div className="text-block">
              <ul className="menu-vertical">
                <li>
                  <a href="#"
                    data-toggle-className=".account-tab:not(.hidden);hidden|#account-profile;hidden">Profile</a>
                </li>
                <li>
                  <a href="#"
                    data-toggle-className=".account-tab:not(.hidden);hidden|#account-notifications;hidden">Email
                    Notifications</a>
                </li>
                <li>
                  <a href="#" data-toggle-className=".account-tab:not(.hidden);hidden|#account-billing;hidden">Billing
                    Details</a>
                </li>
                <li>
                  <a href="#"
                    data-toggle-className=".account-tab:not(.hidden);hidden|#account-password;hidden">Password</a>
                </li>
                <li>
                  <a href="#" data-toggle-className=".account-tab:not(.hidden);hidden|#account-delete;hidden">Delete
                    Account</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="col-lg-8">
          <div className="boxed boxed--lg boxed--border">
            <div id="account-profile" className="account-tab">
              <h4>Profile</h4>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label>Real Name:</label>
                    <input type="text" name="name" value="Jacinda Ardern" />
                  </div>
                  <div className="col-md-6">
                    <label>Display Name:</label>
                    <input type="text" name="display-name" value="NZ_primeMum" />
                  </div>
                  <div className="col-md-12">
                    <label>Email Address:</label>
                    <input type="email" name="email" value="j_ardern@gov.co.nz" />
                  </div>
                  <div className="col-md-12">
                    <label>Location:</label>
                    <input type="text" name="location" value="Wellington, New Zealand" />
                  </div>
                  <div className="col-md-12">
                    <label>News Preferences:</label>
                    <input type="text" name="news-categories" value="Politics, Trump, New Zealand" />
                  </div>
                  <div className="col-md-12">
                    <label>Job Preferences:</label>
                    <input type="text" name="job-categories" value="Manager, Taxi, Advertising" />
                  </div>
                  <div className="col-md-12">
                    <label>TwitterID:</label>
                    <input type="text" name="twitterid" value="@jazziNZ" />
                  </div>
                  <div className="col-md-12">
                    <label>Website:</label>
                    <input type="text" name="website" value="www.ardern.nz" />
                  </div>
                  <div className="col-md-12">
                    <label>Bio:</label>
                    <textarea rows="4" name="bio"></textarea>
                  </div>
                  <div className="col-md-12">
                    <div className="input-checkbox input-checkbox--switch">
                      <input type="checkbox" name="public-profile" />
                      <label></label>
                    </div>
                    <span>Allow my profile to be viewable by guests</span>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <button type="submit" className="btn btn--primary type--uppercase">Save Profile</button>
                  </div>
                </div>
              </form>
            </div>
            <div id="account-notifications" className="hidden account-tab">
              <h4>Email Notifications</h4>
              <p>Select the frequency with which you'd like to recieve product summary emails:</p>
              <form>
                <div className="boxed bg--secondary boxed--border row">
                  <div className="col-4 text-center">
                    <div className="input-radio">
                      <span>Never</span>
                      <input type="radio" name="frequency" value="never" className="validate-required" />
                      <label></label>
                    </div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="input-radio checked">
                      <span>Weekly</span>
                      <input type="radio" name="frequency" value="weekly" className="validate-required" />
                      <label></label>
                    </div>
                  </div>
                  <div className="col-4 text-center">
                    <div className="input-radio">
                      <span>Monthly</span>
                      <input type="radio" name="frequency" value="monthly" className="validate-required" />
                      <label></label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <button type="submit" className="btn btn--primary type--uppercase">Save Preferences</button>
                  </div>
                </div>
              </form>
            </div>
            <div id="account-billing" className="hidden account-tab">
              <h4>Billing Details</h4>
              <div className="boxed boxed--border bg--secondary">
                <h5>Payment Methods</h5>
                <form>
                  <ul>
                    <li className="row">
                      <div className="col-md-6">
                        <p>
                          <i className="material-icons">credit_card</i>
                          <span> Mastercard ending in
                            <strong>4722</strong>
                          </span>
                        </p>
                      </div>
                      <div className="col-md-3 text-right text-left-xs">
                        <button type="submit" className="btn bg--error">Remove</button>
                      </div>
                      <div className="col-md-3 text-right text-left-xs">
                        <button type="submit" className="btn">Edit</button>
                      </div>
                    </li>
                  </ul>
                
                  <button type="submit" className="btn">Add New Method</button>
                </form>
              </div>
            </div>
            <div id="account-password" className="hidden account-tab">
              <h4>Password</h4>
              <p>Passwords must be at least 6 characters in length.</p>
              <form>
                <div className="row">
                  <div className="col-12">
                    <label>Old Password:</label>
                    <input type="password" name="old-password" />
                  </div>
                  <div className="col-md-6">
                    <label>New Password:</label>
                    <input type="password" name="new-password" />
                  </div>
                  <div className="col-md-6">
                    <label>Retype New Password:</label>
                    <input type="password" name="new-password-confirm" />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <button type="submit" className="btn btn--primary type--uppercase">Save Password</button>
                  </div>
                </div>
              </form>
            </div>
            <div id="account-delete" className="hidden account-tab">
              <h4>Delete Account</h4>
              <p>Permanently remove your account using the button below. Warning, this action is permanent.</p>
              <form>
                <button type="submit" className="btn bg--error type--uppercase">Delete Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
    );
}