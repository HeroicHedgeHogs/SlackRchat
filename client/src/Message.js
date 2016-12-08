import { Media } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import Giphy from './Giphy';
import { Emoji } from 'emoji-mart';

/*
Note to reader:
This is the Message component that is used for each rendered message within the MessageList component. 
The emojiChecker component is created to handle emoji actions. 
*/

const emojiChecker = str => {
  const string = str.text;
  if(!string) return;
  if(string.indexOf(':') === -1) return string;
  let array = string.split(' ');
  let text = '';
  let stuff = [];
  array.forEach(word => {
    if(word[0] === ':' && word[word.length - 1] === ':') {
      if(text) stuff.push(text.substring(0, text.length - 1));
      word.split(':').forEach(bit => {
         if(bit) stuff.push(<Emoji emoji={bit} size={30} key={Date.now()+Math.random()}/>);
      });
      text = '';
    } else {
      text += word + ' ';
    }
  });
  if(text) stuff.push(text.substring(0, text.length - 1));
  return stuff;
}

const Message = ({ created_at, text, username, url, picture }) => {

  let stuff = emojiChecker({text});

  return (

    <div className="eachMessage">
    <Media>

      <Media.Left>
        <div className="mediaLeftWidth">
            <img className='chatpic' src={picture}></img>
        </div>
      </Media.Left>

      <Media.Body>
        <Media.Heading>
        {username} 
        </Media.Heading>
        { stuff }
        {
          url &&
          <Giphy url={url} key={Date.now()}/>
        }
      </Media.Body>

      <Media.Right>
        <div className="mediaRightWidth">
          { created_at }
        </div>
      </Media.Right>

    </Media>
    </div>

  )

}

export default Message;