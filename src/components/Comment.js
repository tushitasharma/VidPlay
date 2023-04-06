import React from 'react';
import './Comment.css';
import { Button, Image } from "semantic-ui-react";
import { ThumbsUp, ThumbsDown } from "phosphor-react";

export function Comment({comment}) {

  if (!comment) {
    return <div/>;
  }
  const topLevelComment = comment.snippet.topLevelComment;
  const {authorProfileImageUrl, authorDisplayName, textOriginal} = topLevelComment.snippet;
  const likeCount = topLevelComment.snippet.likeCount;

  return (
    <div className='comment'>
      <Image className='user-image' src={authorProfileImageUrl} circular />
      <div>
        <div className='user-name'>{authorDisplayName}</div>
        <span>{textOriginal}</span>
        <div className='comment-actions'>
          <ThumbsUp className='vote-icon' size={18} />
          {likeCount}
          <ThumbsDown className='vote-icon' size={18} />
          <Button size='mini' compact>REPLY</Button>
        </div>
      </div>
    </div>
  );
}
