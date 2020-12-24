import React, { useContext, useState } from 'react';
import { Card, Icon, Image, Modal, Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';
import moment from 'moment';

function CardExampleImageCard() {
    const { user } = useContext(AuthContext);
    const userId = user.id

    const { data: { getUser } = {} } = useQuery(FETCH_USER_QUERY, {
        variables: { userId: user.id }
    });


    const [bioInfo, setBio] = useState('')

    const [confirmOpen, setConfirmOpen] = useState(false)

    const [updateBioMutation] = useMutation(UPDATE_BIO_MUTATION, {
        update(proxy, result) {
            setConfirmOpen(false)
            setBio('')

            // update cache
        },
        variables: {
            userId,
            body: bioInfo
        },
        onError(err) {
            console.log(err)
        }
    });

    // change the text of your bio
    const inputTextHandler = (e) => {
        setBio(e.target.value);
        console.log(bioInfo);
    };

    let markUp;

    if (!getUser) {
        markUp = <p>Loading Profile..</p>;
    } else {
        const { createdAt, bio } = getUser;

        markUp = (
            <Card floated='right'>
                <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>Welcome {user.username}! </Card.Header>

                    <Card.Meta style={{ paddingTop: 4 }}>
                        Joined: {moment(createdAt).format("MMM YYYY")}
                    </Card.Meta>

                    <Card.Description>
                        Email: {user.email}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <div class="description" >
                        {bio}
                    </div>

                    <span class="right floated" style={{ padding: 10 }} >

                        <button class="circular ui button" onClick={() => setConfirmOpen(true)}>
                            <Icon name="edit outline icon" style={{ margin: 0 }} />
                        </button>

                    </span>

                </Card.Content>

                <Card.Content fluid extra>
                    <Icon name='calendar outline icon' />
                    Created in 2020 by Kyle Arcilla

                      <div style={{ paddingTop: 10, paddingBottom: 5 }}>

                        <Icon name='react icon' />
                          React, NodeJS, GraphQL

                       <div style={{ paddingLeft: 20 }}>
                            MongoDB, ExpressJS, SemanticUI
                      </div>

                    </div>
                </Card.Content>

                <Modal
                    open={confirmOpen}
                >

                    <Modal.Content>
                        {/* Form */}
                        <Form >
                            <h2>Edit your Bio</h2>
                            <Form.Field>
                                <Form.Input
                                    onChange={inputTextHandler}
                                    placeholder="Edit your Bio"
                                    name="body"
                                />
                            </Form.Field>
                        </Form>

                    </Modal.Content>

                    <Modal.Actions>
                        <Button onClick={() => setConfirmOpen(false)} color='blue'>
                            Nope
                        </Button>
                        <Button
                            content="Save"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={updateBioMutation}
                            color='blue'
                        />
                    </Modal.Actions>

                </Modal>

            </Card>
        )
    }

    return markUp;
}

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {          # variable goes here
    getUser(userId: $userId) {
      bio
      createdAt
    }
  }
`;

// userId: a String not an Id!!!!!!
const UPDATE_BIO_MUTATION = gql`
  mutation($userId: String!, $body: String!) {
    updateBio(userId: $userId, body: $body) 
  }
`




export default CardExampleImageCard