import React from 'react';

const Like = ({ liked, onLiked }) => {
  let classes = 'fa fa-heart';
  if (!liked) classes += '-o';
  return (
    <i
      style={{ cursor: 'pointer' }}
      onClick={onLiked}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
