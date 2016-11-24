import axios from 'axios'

export const CLICKED_USER_PROFILE_REQUEST = 'CLICKED_USER_PROFILE_REQUEST'
export const OPEN2_PROFILE_REQUEST = 'OPEN2_PROFILE_REQUEST'
export const CLOSE2_PROFILE_REQUEST = 'CLOSE2_PROFILE_REQUEST'

export function clickedUserProfile(user) {
 return {
  type: CLICKED_USER_PROFILE_REQUEST,
  id: user.id,
  picture: user.picture,
    username: user.username,
    email: user.email,
    first: user.first,
    last: user.last,
    phone: user.phone,
    about: user.about,
    github: user.github,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedin: user.linkedin,
    phone: user.phone
  }
}

export const open2 = () => {
  return {
    type: OPEN2_PROFILE_REQUEST,
    showModel2: true
  }
}

export const close2 = () => {
  return {
    type: CLOSE2_PROFILE_REQUEST,
    showModel2: false
  }
}







