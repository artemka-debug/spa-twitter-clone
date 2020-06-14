import React from "react";
import {PostViewerStyle} from "../style"
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import FindDropDown from "./FindDropDown";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../axios";
import {InputAdornment, TextField} from "@material-ui/core";
import {BsSearch, BsFillHeartFill, BsChatDots, BsArrowDownShort} from "react-icons/bs"
import {Link} from "react-router-dom";
import {displayNickname} from "../utils/displayNickname";
import {getDate} from "../utils/getDate";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import {Redirect} from "react-router-dom"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class PostViewer extends React.Component {
    state = {
        commentError: false,
        post: {
            "comments": [],
            "likes": 0,
            "nickname": "",
            "text": "",
            "time": "",
            "title": "",
            "userId": 0
        },
        pendingPost: false,
        users: [],
        userToFind: "",
        usersPending: false,
        comment: "",
        dropDown: false,
        deleted: false,
        vertical: 'top',
        horizontal: 'left',
        likeError: false,
        errorMsg: ""
    }

    find = async (e) => {
        let res;
        this.setState({userToFind: e.target.value, usersPending: true})

        try {
            res = await axios.get(`/users?nickname=${e.target.value}`)
            console.log("RES", res)
        } catch (e) {
            console.log(e)
            this.setState({users: [], usersPending: false})
            return
        }

        this.setState({users: res.data.data.users || [], usersPending: false})
    }

    getPost = async () => {
        this.setState({pendingPosts: true})
        let data;
        const {id} = this.props.match.params

        try {
            data = await axios.get(`/tweet/${id}`)
        } catch (e) {

        }

        setTimeout(() => this.setState({pendingPosts: false}), 500)
        this.setState({post: data.data.data})
    }

    likePost = async postId => {
        let r

        try {
            r = await axios.put(`/tweet/like/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("RES", r)
        } catch (e) {
            console.error(e)
            this.setState({likeError: true, errorMsg: "Cannot like"})
            setTimeout(() => this.setState({likeError: false, errorMsg: ""}), 2000)
            return
        }

        let liked = 0

        if (r && r.data.data.liked) {
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

    comment = async (e) => {
        this.setState({comment: ""})
        e.preventDefault()
        const {post, comment} = this.state

        let res
        try {
            res = await axios.post(`/comment`, {
                post_id: +post.postId,
                text: comment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(res)
        } catch (e) {
            console.error(e)
            this.setState({commentError: true, errorMsg: "Cannot comment"})
            setTimeout(() => this.setState({commentError: false, errorMsg: ""}), 2000)
            return
        }


        if (res && res.data.meta.result) {
            const {id, nickname, text, userId, postId} = res.data.data

            this.setState(({post}) => ({
                post: {
                    ...post,
                    comments: [{
                        id,
                        text,
                        nickname,
                        userId,
                        postId
                    }].concat(post.comments)
                }
            }))
        }
    }

    delete = async (postId) => {
        let res

        try {
            res = await axios.delete(`/tweet`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("DELETED", res)
        } catch (e) {
            console.error(e)
        }

        this.setState({deleted: true})
    }

    isDisabled = (comment) => comment.length !== 0

    showDropDown = () => {
        this.setState({dropDown: true})
    }

    componentDidMount() {
        this.getPost()
    }

    render() {
        const {classes} = this.props
        const {userToFind, deleted, users, commentError, likeError, errorMsg, vertical, horizontal, usersPending, pendingPost, dropDown, post, comment} = this.state

        if (deleted) {
            return <Redirect to={"/"}/>
        }

        return (
            <Container style={{display: 'flex'}}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    autoHideDuration={6000}
                    open={commentError || likeError}
                    key={vertical + horizontal}
                >
                    <Alert severity={"error"}>{errorMsg} post</Alert>
                </Snackbar>
                {pendingPost ? <Paper className={classes.usersUnlogged}>
                    <CircularProgress/>
                </Paper> : <Paper className={classes.post}>
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
                        <Container className={classes.deletePost}>
                            <BsArrowDownShort
                                size={40}
                                className={classes.arrowDownIcon}
                                onClick={this.showDropDown}
                            />

                            {dropDown ? <Modal
                                onClose={() => this.setState({dropDown: false})}
                                open={true}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                style={{borderStyle: "none"}}
                                disableAutoFocus={true}
                            >
                                <Paper className={classes.dropDown}>
                                    {post.userId === +localStorage.getItem("userId") ?
                                        <Button
                                            className={classes.deleteButton}
                                            onClick={() => this.delete(post.postId)}
                                        >
                                            Delete
                                        </Button> :
                                        <Button
                                            className={classes.deleteButton}
                                            onClick={() => this.likePost(post.postId)}
                                        >
                                            Like
                                        </Button>}
                                </Paper>
                            </Modal> : ""}
                        </Container>
                    </Container>
                    <Container className={classes.text}>
                        <h1>{post.title}</h1>
                        <span>
                        {post.text}
                    </span>
                    </Container>
                    <Container className={classes.top}>
                        <Container className={classes.likeButton}>
                            <BsFillHeartFill
                                onClick={() => this.likePost(post.postId)}
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
                    <Container className={classes.commentSection}>
                        <Paper className={classes.commentAdd}>
                            <Container className={classes.imageInComment}>
                                <img
                                    style={{borderRadius: '50%'}}
                                    src="/artemskii.png"
                                    alt="profile"
                                />
                            </Container>
                            <form className={classes.form} onSubmit={this.comment}>
                                <Container className={classes.input}>
                                    <TextField
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <Typography
                                                        className={comment.length > 255 ? classes.counterOver : classes.counter}>
                                                        {comment.length !== 0 ? `${comment.length} / 255` : ""}
                                                    </Typography>
                                                </InputAdornment>

                                        }}
                                        value={comment}
                                        fullWidth
                                        placeholder="Text of post"
                                        multiline
                                        onChange={e => this.setState({comment: e.target.value})}
                                    />
                                </Container>
                                <Container style={{display: 'flex',}}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.commentTweet}
                                        disabled={!this.isDisabled(comment)}
                                    >
                                        Post
                                    </Button>
                                </Container>
                            </form>
                        </Paper>
                        {post.comments.map(comment => (
                            <Paper key={comment.id} className={classes.comment}>
                                <Container style={{display: 'flex'}}>
                                    <Container className={classes.commentImage}>
                                        <img
                                            style={{borderRadius: '50%'}}
                                            src="/test.png"
                                            alt="profile"
                                        />
                                    </Container>
                                    <Container className={classes.commentNickname}>
                                        <Link to={`/profile/${comment.userId}`} className={classes.link}>
                                            {comment.nickname}
                                        </Link>
                                    </Container>
                                    <Container className={classes.commentTime}>
                                        {getDate(comment.time)}
                                    </Container>
                                </Container>
                                <Container style={{display: 'block', marginBottom: "8px"}}>
                                    <Container className={classes.commentText}>
                                        {comment.text}
                                    </Container>
                                </Container>
                            </Paper>
                        ))}
                    </Container>
                </Paper>}
                <Container className={classes.searchBoxLogged}>
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <BsSearch size={30}/>
                            </InputAdornment>
                        }}
                        onChange={this.find}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        placeholder="Search User"
                    />
                </Container>
                {!usersPending ? userToFind.length !== 0 ?
                    users.length !== 0 ?
                        <Paper className={classes.users}>
                            {users.map(user => (
                                <FindDropDown key={user.id} user={user}/>
                            ))}
                        </Paper> :
                        <Paper className={classes.users}>
                            <Container>No user were found</Container>
                        </Paper> : "" :
                    <Paper className={classes.users}>
                        <CircularProgress/>
                    </Paper>
                }
            </Container>
        );
    }
}

export default withStyles(PostViewerStyle)(PostViewer)
