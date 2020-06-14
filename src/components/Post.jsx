import React from "react";
import Paper from "@material-ui/core/Paper";
import {Container, withStyles} from "@material-ui/core";
import {PostsStyle} from "../style";
import {BsFillHeartFill, BsChatDots} from "react-icons/bs"
import {getDate} from "../utils/getDate";
import {displayNickname} from "../utils/displayNickname";
import axios from "../axios";
import {Link} from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            likeError: false,
            vertical: 'top',
            horizontal: 'left',
        }
    }

    like = async (postId) => {
        let res

        try {
            res = await axios.put(`/tweet/like/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("RES", res)
        } catch (e) {
            console.error(e)
            this.setState({likeError: true})
            setTimeout(() => this.setState({likeError: false}), 2000)
            return
        }

        let liked = 0

        if (res && res.data.data.liked) {
            liked = 1
        } else {
            liked = -1
        }

        let newPosts = this.state.post
        newPosts.likes += liked

        this.setState({
            post: newPosts
        })
    }


    render() {
        const {classes, post} = this.props
        const {like} = this
        const {likeError, vertical, horizontal} = this.state

        return (
            <Paper className={classes.post}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    autoHideDuration={6000}
                    open={likeError}
                    key={vertical + horizontal}
                >
                    <Alert severity={"error"}>Cannot like post</Alert>
                </Snackbar>


                <Link to={`/tweet/${post.postId}`} className={classes.link}>
                    <Container className={classes.top}>
                        <Container className={classes.image}>
                            <img
                                style={{borderRadius: '50%'}}
                                src="/artemskii.png"
                                alt="profile"
                            />
                        </Container>
                        <Container className={classes.nickname}>
                            <Link to={`/profile/${post.userId}`} className={classes.link}>
                                {displayNickname(post.nickname)}
                            </Link>
                        </Container>
                        <Container className={classes.time}>
                            {getDate(post.time)}
                        </Container>
                    </Container>
                    <Container className={classes.text}>
                        <h1>{post.title}</h1>
                        <span>
                        {post.text}
                    </span>
                    </Container>
                </Link>
                <Container className={classes.top}>
                    <Container className={classes.likeButton}>
                        <BsFillHeartFill
                            onClick={() => like(post.postId)}
                            className={classes.likeIcon}/>
                        <Container className={classes.likes}>
                            {post.likes}
                        </Container>
                    </Container>
                    <Container className={classes.commentButton}>
                        <span className={classes.comments}>
                            {post.comments.length}
                        </span>
                        <BsChatDots
                            onClick={() => console.log('pressed')}
                            className={classes.commentIcon}/>
                    </Container>
                </Container>
            </Paper>
        )
    }
}

export default withStyles(PostsStyle)(Post)
