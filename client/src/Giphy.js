import React from 'react';

const Giphy = ({url}) => (
  <div>
    <br/>
    <img className="image" src={url}></img>
  </div>
);

export default Giphy;