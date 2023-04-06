import React from 'react';
import {Button, Icon} from "semantic-ui-react";
import './CommentHeader.css';

export function CommentsHeader({amountComments}) {
  return (
    <div>
      <h4 className='comments-header'>{amountComments} Comments</h4>
      <Button basic compact icon labelPosition='left'>
        <Icon name='align left' />
        Sort by
      </Button>
    </div>
  );
}