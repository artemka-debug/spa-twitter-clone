import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {BlogStyle} from "../style";
import {subscribe} from "../subscription";
import authStore from "../auth.reducer";
import axios from "../axios";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "./NavBar";
import Paper from "@material-ui/core/Paper";
import Post from "./Post";
import Pagination from "@material-ui/lab/Pagination";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.find = this.find.bind(this)
        this.post = this.post.bind(this)
    }

    state = {
        page: 1,
        isLoggedIn: false,
        posts: [],
        pendingPosts: false,
        users: [],
        userToFind: "",
        usersPending: false,
        pendingInfo: false,
        titleError: "",
        textError: "",
        pageCount: 1,
    }

    getPosts = async () => {
        this.setState({pendingPosts: true})
        let data;

        try {
            data = await axios.get(`/tweets?page=${this.state.page}`)
        } catch (e) {
            return []
        }

        this.setState({pendingPosts: false})
        return data.data.meta.result ? data.data.data.posts : []
    }

    isLoggedIn = async () => {
        let res;
        try {
            res = await axios.get(`/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("RES", res)
        } catch (err) {
            console.error(err)
            return {
                data: {}, meta: {
                    result: false
                }
            }
        }

        return res.data
    };

    getNewPosts = async (e, n) => {
        this.setState({pendingPosts: true, page: n})
        let data;

        try {
            data = await axios.get(`/tweets?page=${n}`)
        } catch (e) {
            return []
        }

        this.setState({pendingPosts: false, posts: data.data.data.posts})
    }

    setLoggedIn = async () => {
        this.setState({postsPending: true})
        let data = await this.isLoggedIn();
        let posts = await this.getPosts()

        if (data.meta.result) {
            if ((await navigator.serviceWorker.getRegistrations())) {
                await subscribe()
            }
        }
        this.setState({isLoggedIn: data.meta.result, posts: posts, pendingPosts: false, pendingInfo: false})

    }

    async find(e) {
        this.setState({userToFind: e.target.value, usersPending: true})
        let res;

        try {
            res = await axios.get(`/users?nickname=${e.target.value}`)
            console.log("RES", res)
        } catch (e) {
            console.log(e)
            this.setState({users: []})
            return
        }

        this.setState({users: res.data.data.users || [], usersPending: false})
    }

    getPostsCount = async () => {
        let res

        try {
            res = await axios.get("/tweets/count")
        } catch (e) {
            console.error(e)
            return
        }

        return res.data.data.count
    }

    setPostsCount = async () => {
        let pageCount = await this.getPostsCount()

        this.setState({pageCount})
    }

    componentDidMount() {
        this.setPostsCount()
        this.setState({pendingInfo: true})
        this.setLoggedIn()
        this.unsub = authStore.subscribe(() => {
            let state = authStore.getState()

            this.setState({isLoggedIn: state.isLogged})
        })
    }

    async post(e, title, text) {
        e.preventDefault()
        let res;

        try {
            res = await axios.post(`/tweet`, {title, text}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("RES", res)
        } catch (e) {
            console.error("ERROR", e.response, e.response.data.data)
            const {title, text} = e.response.data.data.error_for_user

            this.setState({titleError: title || "", textError: text || ""})
            return
        }

        if (res && res.data.data) {
            const {post_id, nickname, time, title, text, likes, comments,                     userId,
            } = res.data.data
            console.log(this)
            this.setState({
                posts: [{
                    postId: post_id,
                    nickname,
                    time,
                    title,
                    text,
                    likes,
                    comments,
                    userId,
                }].concat(this.state.posts)
            })
        }
    }

    componentWillUnmount() {
        this.unsub()
    }

    render() {
        const {isLoggedIn, posts, pendingPosts, pendingInfo, textError, titleError, users, userToFind, pageCount, usersPending} = this.state
        const {classes} = this.props

        if (pendingInfo) {
            return (
                <Container className={classes.loading}>
                    <CircularProgress/>
                </Container>
            )
        }

        return (
            <Container className={classes.main}>
                <NavBar post={this.post} titleError={titleError} textError={textError} isLoggedIn={isLoggedIn} users={users} userToFind={userToFind}
                        usersPending={usersPending} find={this.find}/>

                <Paper className={classes.posts}>
                    {pendingPosts ? <Container className={classes.progress}>
                            <CircularProgress/>
                        </Container>
                        : posts.length === 0 ? "No posts were found" :
                            posts.map(post => (
                            <Post key={post.postId} post={post}/>
                        ))}
                </Paper>
                <Pagination onChange={this.getNewPosts} className={classes.pagination} count={Math.floor(pageCount / 100) || 10} variant="outlined" color="primary" />
            </Container>
        )
    }
}

export default withStyles(BlogStyle)(Blog)
