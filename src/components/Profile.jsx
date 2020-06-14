import React from "react";
import {ProfileStyle} from "../style";
import {InputAdornment, TextField, withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "../axios";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import FindDropDown from "./FindDropDown";
import {BsSearch} from "react-icons/bs"
import Post from "./Post";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import authStore from "../auth.reducer";

class Profile extends React.Component {
    state = {
        posts: [],
        pendingPosts: false,
        users: [],
        userToFind: "",
        usersPending: false,
        user: {},
        pendingUser: false,
        edit: false,
        nickname: localStorage.getItem("nickname"),
        status: localStorage.getItem("status"),
        error: ""
    }

    edit = async (e) => {
        e.preventDefault()
        let res
        const {nickname, status} = this.state

        try {
            res = await axios.put(`/user`, {nickname, status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res)
        } catch (e) {
            console.error(e)
            this.setState({edit: false})
            return
        }

        if (res && res.data.data) {
            authStore.dispatch({
                type: 'EDIT_PROFILE',
                payload: {
                    nickname, status
                }
            })

            this.setState({
                nickname: nickname, status: status, user: {
                    ...this.state.user, nickname: nickname, status: status
                }, error: "", edit: false
            })
            this.getPosts()
        }
    }

    find = async (e) => {
        let res;
        this.setState({userToFind: e.target.value, usersPending: true})

        try {
            res = await axios.get(`/users?nickname=${e.target.value}`)
        } catch (e) {
            console.log(e)
            return
        }

        this.setState({users: res.data.data.users || [], usersPending: false})
    }

    getPosts = async () => {
        this.setState({pendingPosts: true})
        let data;
        const {id} = this.props.match.params

        try {
            data = await axios.get(`/tweets/user/${id}`)
        } catch (e) {
            this.setState({pendingPosts: false, posts: []})
            return
        }

        this.setState({pendingPosts: false, posts: data.data.data.posts})
    }

    getUser = async () => {
        this.setState({pendingUser: true})
        let res;
        const {id} = this.props.match.params

        try {
            res = await axios.get(`/user/${id}`)
            console.log("RES", res)
        } catch (e) {
            this.setState({pendingUser: false, user: {}, nickname: "", status: ""})
            return
        }

        this.setState({
            pendingUser: false,
            user: res.data.data,
            nickname: res.data.data.nickname,
            status: res.data.data.status
        })
    }

    componentDidMount() {
        this.getUser()
        this.getPosts()
        this.unsub = authStore.subscribe(() => {
            let state = authStore.getState()

            this.setState({status: state.user.status, nickname: state.user.nickname})
        })
    }

    componentWillUnmount() {
        this.unsub()
    }

    validate = (value, inputName) => {
        let error = "";

        if (!(value.length >= 3 && value.length <= 40)) {
            error += "length must be more then 3 and less then 40 "
        }
        if (!(value.match(/[a-z0-9A-Z_-]/gm))) {
            error += "can contain only low and upper case letters and numbers"
        }


        this.setState({[`error`]: error, [inputName]: value})
    }

    isDisabled = () => this.state.error.length !== 0

    render() {
        const {classes} = this.props
        const {userToFind, users, usersPending, nickname, error, status, pendingPosts, edit, posts, user, pendingUser} = this.state

        return (
            <Container className={classes.profile} focusable={false}>
                {edit ?
                    <Modal
                        onClose={() => this.setState({edit: false})}
                        open={true}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        style={{borderStyle: "none"}}
                        disableAutoFocus={true}
                    >
                        <Paper className={classes.edit}>
                            <form onSubmit={this.edit}>
                                <Container className={classes.editNickname}>
                                    <TextField
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <Typography
                                                        className={nickname.length > 40 ? classes.counterOver : classes.counter}>
                                                        {nickname.length !== 0 ? `${nickname.length} / 40` : ""}
                                                    </Typography>
                                                </InputAdornment>
                                        }}
                                        placeholder="Nickname"
                                        defaultValue={nickname}
                                        fullWidth
                                        onChange={e => this.validate(e.target.value, "nickname")}
                                        error={error.length !== 0}
                                        helperText={error}
                                    />
                                </Container>
                                <Container className={classes.editStatus}>
                                    <TextField
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <Typography
                                                        className={status.length > 150 ? classes.counterOver : classes.counter}>
                                                        {status.length !== 0 ? `${status.length} / 150` : ""}
                                                    </Typography>
                                                </InputAdornment>
                                        }}
                                        placeholder="Status"
                                        defaultValue={status}
                                        fullWidth
                                        onChange={e => this.setState({status: e.target.value})}
                                    />
                                </Container>
                                <Container className={classes.confirmEditButton}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={this.isDisabled()}
                                    >
                                        Edit
                                    </Button>
                                </Container>
                            </form>
                        </Paper></Modal> : ""}
                <Container style={{display: 'flex'}}>
                    <Container className={classes.userInformation}>
                        {pendingUser ? <Paper className={classes.topOfProfile}>
                                <Container className={classes.progress}>
                                    <CircularProgress/>
                                </Container>
                            </Paper>
                            : <Paper className={classes.topOfProfile}>
                                <Container style={{display: 'flex'}}>
                                    <Container className={classes.image}>
                                        <img
                                            style={{borderRadius: '50%', width: '150px'}}
                                            src="/artemskii.png"
                                            alt="profile"
                                        />
                                    </Container>
                                    <Container className={classes.editButton}>
                                        {localStorage.getItem("userId") === `${user.userId}` ?
                                            <Button
                                                variant={"outlined"}
                                                color={"primary"}
                                                onClick={() => this.setState({edit: true})}
                                            >
                                                Edit profile
                                            </Button>
                                            : ""}
                                    </Container>
                                </Container>
                                <Container className={classes.nickname}>
                                    <h1>
                                        {user.nickname}
                                    </h1>
                                </Container>
                                <Container className={classes.status}>
                                    {user.status}
                                </Container>
                            </Paper>}
                    </Container>

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
                                {users.map(u => (
                                        <FindDropDown key={u.id} user={u}/>
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
                <Paper className={classes.posts}>
                    {pendingPosts ? <Container className={classes.progress}>
                            <CircularProgress/>
                        </Container>
                        : posts.length === 0 ? <Container>No posts were found</Container> :
                            posts.map(post => (
                                <Post key={post.postId} post={post}/>
                            ))}
                </Paper>
            </Container>
        )
    }
}

export default withStyles(ProfileStyle)(Profile)