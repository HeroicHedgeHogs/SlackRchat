import React from 'react'
import { connect, dispatch } from 'react-redux'
import { logoutUser, requestLogout, receiveLogout } from '../actions/logoutActions'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Profile from './Profile'
import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap' 
import { sendProfileInfo } from '../actions/signupActions'
import { open } from '../actions/NavActions'
import { UpdateProfile } from '../actions/CurrentUserActions'
import PrimaryChatroom from './PrimaryChatroom'
import axios from 'axios'
import { setCurrentUser } from '../actions/CurrentUserActions'

class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  onEdit() {
    console.log(this.props.currentUser, "opening Modal")
    this.props.dispatch(open())
  }

  save(user) {
    let information1 = {
       id: this.props.currentUser.id,
       username: this.props.currentUser.username,
       email: this.props.currentUser.email,
       phone: user.phone,
       about: user.about,
       first: user.first,
       last: user.last,
       github: user.github,
       facebook: user.facebook,
       twitter: user.twitter,
       linkedin: user.linkedin
    }
    console.log('information1 in nav ', information1);
    this.props.dispatch(setCurrentUser(information1))
    axios.post('/db/usersInfo', information1)
    .then(response => {
      // if(!response) {
      //   console.log('errorMessage')
      // } else {
        
      // }
      // axios.get('/db/getMe', { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
      // .then(res => console.log(res.data));
    });
  }

    // this.props.dispatch(UpdateProfile(info))
    // .then(response => {
    //   if(!response) {
    //     console.log('error')
    //   }
    //   else {
    //    this.props.dispatch(close());
    //   }
    // })
  // }

  logout() {
    const { dispatch } = this.props;
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>  
        <div className='nav'>
          <h1 className='title'>SlackR:chat</h1>
          <h2 className='helloUser'>Hello, {this.props.currentUser.first}</h2>
          <a className='navbutton' href='#' role='button' 
          onClick={(event) => this.onEdit(event)}>Profile</a>
          <Profile save={this.save} />
          <a className='navbutton' onClick={() => this.logout()} href='/login'>Logout</a>
          { this.props.location === '/analytics' &&
            <Link className='navbutton' to='/'>Chat</Link>
          }
        </div>
      </nav>
    )
  }
}
  
const mapStateToProps = (state, ownProps) => {
  // console.log('here is the state in mapStateToProps in Nav ', state)
  return {
    toShowModel: state.allReducers.NavReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    location: state.routing.locationBeforeTransitions.pathname, 
  }
}

export default connect(mapStateToProps)(TopNav)

