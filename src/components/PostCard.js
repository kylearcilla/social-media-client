import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid style={{ marginBottom: 20 }}>

            {/* Top Content: Contains Username, Date Posted, Comment, Profile Image */}

            <Card.Content>
                <Image
                    avatar
                    floated="left"
                    size="massive"
                    src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                />

                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>

                <Card.Description>{body}</Card.Description>

            </Card.Content>

            {/* Extra Bottom Content: Contains Like, Commenet, and Trash Button */}

            <Card.Content extra>
                {/* 1. Like Button  */}

                <LikeButton
                    user={user}
                    post={{ id, likes, likeCount }}
                />

                <Popup inverted content='Comment on Post'
                    trigger={
                        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                            <Button color="blue " basic>
                                <Icon name="wechat icon" />
                            </Button>

                            <Label basic color="blue " pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />

                {user && user.username === username &&
                    <DeleteButton
                        postId={id}
                        floated="right"
                    />}

            </Card.Content>
        </Card>
    )
}
export default PostCard;

