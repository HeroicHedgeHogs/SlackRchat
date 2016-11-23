import { Media } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import Giphy from './Giphy';
import { Emoji } from 'emoji-mart';

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

  let stuff;
 
  if(url) {
    stuff = [...emojiChecker({text}), <Giphy url={url} key={Date.now()}/>];
  } else {
    stuff = emojiChecker({text});
    // console.log('stuff ', stuff)
  }

  return (
    <Media>

      <Media.Left>
        <img className='chatpic' src={picture}></img>
      </Media.Left>

      <Media.Body>
        <Media.Heading>
        {username} 
        </Media.Heading>
        { stuff }
      </Media.Body>

      <Media.Right>
        { created_at }
      </Media.Right>

    </Media>
  )

}

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;


// import React, { PropTypes } from 'react';
// import Giphy from './Giphy';
// import { Emoji } from 'emoji-mart';

// const Message = ({ created_at, text, username, url, picture }) => {

//   let emoji;
//   // console.log('here is the text ', text)

//   if(text && text.indexOf(':') !== text.lastIndexOf(':')) {
//     let first = text.indexOf(':');
//     emoji = text.substring(first + 1);
//     let last = emoji.indexOf(':');
//     emoji = emoji.substring(0, last);
//     if (emoji.indexOf(' ') !== -1) {
//       emoji = undefined;
//     } else {
//       text = text.substring(0, first) + text.substring(last + 2, text.length);
//     }
//   }

//   return (
//     <li>
//       <div className='chatbodypic'>
//         <img className='chatpic' src={picture}></img>
//       <div className='msgbody'>
//         <div className='timeStamp'>
//           { created_at } ---  
//         </div>
//         <div>
//           {username} --- { text }
//           { url &&
//             <Giphy url={url}/>
//           }
//           { emoji &&
//             <Emoji 
//               emoji={emoji}
//               size={36}
//             />
//           }
//         </div>
//       </div>
//      </div> 
//     </li>
//   )

// }

// // Message.propTypes = {
// //   message.text: PropTypes.string.isRequired,
// // };

// export default Message;