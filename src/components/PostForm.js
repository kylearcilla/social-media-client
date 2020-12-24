import React from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {

  // take in values from { onSubmit ← useForm }
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  // function for mutating
  // error

  // 1. call createPost()
  // any errors after the mutation
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {

    // 2. values being passed in to the mutating function
    variables: values,

    // 3. updating the cache 
    update(proxy, result) {

      // passing: cache, resultant data
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });

      proxy.writeQuery({

        // the posts are inside of getPosts
        query: FETCH_POSTS_QUERY,

        data: { getPosts: [result.data.createPost, ...data.getPosts] }
      });

      values.body = '';
    },

    // 4. any errors after mutation
    onError(err) {
      return err
    },
  });


  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Say Something!</h2>
        <Form.Field>
          <Form.Input
            placeholder="Share to the World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />

          <Button animated type="submit" color="blue">
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
              <Icon name="paper plane outline" />
            </Button.Content>
          </Button>

        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;