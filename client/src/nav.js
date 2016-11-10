import React from 'react'
import Logout from "./logout.js"
import { loginUser } from '../actions/loginActions'
import { logoutUser } from '../actions/logoutActions'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

export default class Nav extends React.Component {

  render() {
    return (
      <div className="nav">
        <h1>Slacker</h1>
        <a className="btn btn-primary" href="#" onClick={this.open}>Profile</a>
        <a className="btn btn-primary" href="/SignIn"> SignIn </a>
        <a className="btn btn-primary" href="/LogOut">LogOut</a>
      </div>
    );
  }
}
  
    // <Route path='LogOut' component={Logout} />
  


// var Modal = React.createClass({
//   render() {
//     return (
//       <div> 
//     <button type="button">
//       <span class="hide">Close</span>
//     </button>
//   </div>;
//   }
// });


