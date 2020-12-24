import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../utils/MyPopup';

// user and post's id, likeCount, likes 
function LikeButton({ user, post: { id, likeCount, likes } }) {

  // for displaying the UI 
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  // ! = this activate the Mutation Function: passing in the ID paremater
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  // if there is a user: change the UI of button if liked
  // if there's no user: like is set to /login
  const likeButton = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="thumbs up outline" />
      </Button>
    ) : (
        <Button color="blue" basic>
          <Icon name="thumbs up outline" />
        </Button>
      )
  ) : (
      <Button as={Link} to="/login" color="blue" basic>
        <Icon name="thumbs up outline" />
      </Button>
    );

  // 1. call likePost
  // 2. likeCount
  return (
    <Button as="div" labelPosition="right" onClick={user ? likePost : undefined}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      <Label basic color="blue" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export default LikeButton;