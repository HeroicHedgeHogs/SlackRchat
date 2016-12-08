import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, 
        ModalBody, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'        
import React from 'react'
import {updateUserPictureInitial} from '../actions/signupActions'
import { dispatch, connect } from 'react-redux'

class ProfileInitial extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      first: '',
      last: '',
      phone: '',
      about: '',
      github: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      submit: '',
    }

    this.handleFirst= this.handleFirst.bind(this);
    this.handleLast= this.handleLast.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleGithub = this.handleGithub.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleLinkedin = this.handleLinkedin.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
   }

  handleFirst(event) { this.setState({first: event.target.value})}     
  handleLast(event) { this.setState({last: event.target.value})}
  handlePhone(event) { this.setState({phone: event.target.value})}
  handleAbout(event) { this.setState({about: event.target.value})}
  handleGithub(event) { this.setState({github: event.target.value})}
  handleFacebook(event) { this.setState({facebook: event.target.value})}
  handleTwitter(event) { this.setState({twitter: event.target.value})}
  handleLinkedin(event) { this.setState({linkedin: event.target.value})}

  handleSubmit(event){
    let info = this.state;
    this.props.save(info);
    this.upload(event, info);
    this.props.dispatch(close());
  }

  upload(event, info) {
    const dispatch = this.props.dispatch;
    const currentUser = this.props.currentUser;
    let file = this.refs.pic.files[0];
    if(!file) return;

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(event) {
      updateUserPictureInitial(reader.result)
      .then(url => {
        info.id = currentUser.id;
        info.picture = url;
        dispatch(setCurrentUser(info));
      })
    }
  }
    
render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <Modal className='profile_modal' show={this.props.show} >
        <Modal.Header>
          <Modal.Title id='modal_header'>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal_content'>
          <div> 
            <div className='profilePicture'> 
              <img className='pictureImg' src={this.state.picture}></img>
              <input className='pictureInput'type="file" ref='pic' accept="image/*" data-action="profilepicture" />
            </div>
          </div>
          <div className='restProfile'>
          <div className='names'>
            <FormGroup>
              <ControlLabel className='label'>First Name</ControlLabel>
                <FormControl type='text' placeholder={this.state.first} onChange={this.handleFirst} />
              <ControlLabel className='label'>Last Name</ControlLabel>
                <FormControl type='text' placeholder={this.state.last} onChange={this.handleLast} />  
              <ControlLabel className='label'>Phone</ControlLabel>
                <FormControl type='text' placeholder={this.state.phone} onChange={this.handlePhone} />
            </FormGroup>
          </div>
            <FormGroup>
              <ControlLabel>Social Media</ControlLabel>
            <div>
              <ControlLabel className='label'>Github</ControlLabel>
                <FormControl type='text' placeholder={this.state.github} onChange={this.handleGithub} />
              <ControlLabel className='label'>Facebook</ControlLabel>
                <FormControl type='text' placeholder={this.state.facebook} onChange={this.handleFacebook} />
            </div>
            <div>  
              <ControlLabel className='label'>Twitter</ControlLabel>
                <FormControl type='text' placeholder={this.state.twitter} onChange={this.handleTwitter} />  
              <ControlLabel className='label'>Linkedin</ControlLabel>
                <FormControl type='text' placeholder={this.state.linkedin} onChange={this.handleLinkedin}/> 
            </div>  
          </FormGroup>  
          <div className='aboutMeContainer'>
            <div>
            <ControlLabel>About Me</ControlLabel>
            </div>
            <div>
              <FormControl className='aboutMeInput' type='text' placeholder={this.state.about} onChange={this.handleAbout} />
            </div>
           </div> 
          </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-default' onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
     </form> 
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.allReducers.CurrentUserReducer
  }
}

export default connect(mapStateToProps)(ProfileInitial)

//NOTES
//Need to change Button Save onClick functionality
//On Close or Save, then send Profile Information to database, 
//Render Primary Chat
