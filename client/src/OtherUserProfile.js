 import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'
import { dispatch, connect } from 'react-redux';
import axios from 'axios'
import {open2, close2} from '../actions/ClickedUserProfileActions';

class OtherUserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.dispatch(close2())
  }

  render() {
    return (
      <div>
      <Modal id='profile_modal_other' show={this.props.clickedUser.showModel2} >
        <Modal.Header>
          <Modal.Title>Profile {this.props.clickedUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal_content'> 
      <div className='otheruserprofile'>
        <div class='profilePicture'>
          <img className='profileImg2' src={this.props.clickedUser.picture}></img>
        </div>
        <div className='restProfile2'>
          <div className='colors'>
            <label className='names'>First Name</label>
            <p>{this.props.clickedUser.first}</p>
            <label className='names'>Last Name</label>
            <p>{this.props.clickedUser.last}</p>
            <label className='names'>Email</label>
            <p>{this.props.clickedUser.email}</p>
            <label className='names'>Phone Number</label>
            <p>{this.props.clickedUser.phone}</p>
          </div>
          <div className='colors'>
            <div className='socialMedia'>Social Media</div>
              <label className='names'>Github1</label>
              <p><a href={this.props.clickedUser.github}>{this.props.clickedUser.github}</a></p>
              <label className='names'>Linkedin</label>
              <p><a href={this.props.clickedUser.linkedin}>{this.props.clickedUser.linkedin}</a></p>
              <label className='names'>Facebook</label>
              <p><a href={this.props.clickedUser.facebook}>{this.props.clickedUser.facebook}</a></p>
              <label className='names'>Twitter</label>
              <p><a href={this.props.clickedUser.twitter}>{this.props.clickedUser.twitter}</a></p>
            </div>
          <div className='colors'>
            <div className='socialMedia'>About Me</div>
            <p className='aboutMeInput'>{this.props.clickedUser.about}</p>
          </div>  
      </div> 
      </div> 
      </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default" onClick={(event)=>this.handleSubmit(event)}>Close</Button>
        </Modal.Footer>
      </Modal> 
      </div>
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    clickedUser: state.allReducers.ClickedUserProfileReducer
  }
}

export default connect(mapStateToProps)(OtherUserProfile)
