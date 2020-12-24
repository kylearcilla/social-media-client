import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card, Icon } from 'semantic-ui-react';
import Profile from '../pages/Profile'

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

  console.log(posts)

  return (
    <>
      {user ? (
        <div class="ui centered padded grid">
          <h1> Home </h1>
        </div>
      ) : (
          <Grid.Row className="page-tite" >
            <h1 style={{ padding: 10 }}> Home </h1>
          </Grid.Row>
        )
      }

      <div className="ui padded grid">

        <div className="ten wide column" fluid>
          <Grid.Row>
            {user && (
              <Grid.Column style={{ marginBottom: 20 }}>
                <PostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>Loading posts..</h1>
            ) : (
                <Transition.Group>
                  {posts &&
                    posts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
          </Grid.Row>
        </div>

        <div className="six wide column">
          {user ? (

            loading ? (
              <h3>Loading profile..</h3>
            ) : (
                <Profile />
              )
          ) :
            <div>
              <Card floated='right' color='blue' fluid>
                <Card.Content>
                  <Card.Header> Welcome Person! 😀 </Card.Header>
                  <Card.Description>
                    Log in or Register to Like, Comment, and Post!
              </Card.Description>
                </Card.Content>
                <Card.Content extra>

                  <Icon name='calendar outline icon' />
                     Created in 2020 by Kyle A.
                  <div style={{ paddingTop: 10, paddingBottom: 5 }}>

                    <Icon name='react icon' />
                      React, NodeJS, GraphQL, MongoDB

                  <div style={{ paddingLeft: 20 }}> ExpressJS, SemanticUI </div>

                  </div>
                </Card.Content>
              </Card>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Home;

