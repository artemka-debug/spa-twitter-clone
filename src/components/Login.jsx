import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import {LoginStyle} from "../style";
import {BsCheckCircle, BsExclamationCircleFill} from "react-icons/bs";
import axios from "../axios";
import authStore from "../auth.reducer";
import {subscribe} from "../subscription";
import {Redirect} from "react-router-dom"

class LogIn extends React.Component {
    state = {
        emailError: "",
        passwordError: "",
        email: "",
        password: "",
        isDisabled: "",
        isLoggedIn: localStorage.getItem("isLogged") === "true" ? true : false
    }

    login = async e => {
        e.preventDefault()
        const {email, password} = this.state

        let res
        try {
            res = await axios.post(`/login`, {
                email, password
            })

            console.log("RES", res)
        } catch (err) {
            console.error(err)
            const {email, password} = err.response.data.data.error_for_user

            this.setState({emailError: email || "", passwordError: password || ""})
        }

        if (res && res.data.data && res.data.meta.result) {
            const {token, user_id, nickname, status} = res.data.data

            authStore.dispatch({
                type: "LOGIN",
                payload: {
                    token,
                    user: {
                        id: user_id,
                        nickname,
                        email,
                        status
                    },
                    isLogged: true
                }
            })

            await subscribe()
            this.setState({isLoggedIn: res.data.meta.result})
        }
    }

    isDisabled() {
        const {email, password, emailError, passwordError} = this.state

        return emailError.length === 0 && passwordError.length === 0 &&
            email.length !== 0 &&  password.length !== 0
    }

    onSignIn = async (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        const email = profile.getEmail()
        let res
        try {
            res = await axios.post(`/google/auth`, {
                id_token
            })

            console.log("RES", res)
        } catch (err) {
            console.error(err)
        }

        if (res && res.data.data) {
            const {token, user_id, nickname, status} = res.data.data

            authStore.dispatch({
                type: "LOGIN",
                payload: {
                    token,
                    user: {
                        id: user_id,
                        nickname,
                        email,
                        status
                    },
                    isLogged: true
                }
            })

            await subscribe()
            this.setState({isLoggedIn: true, emailError: "", passwordError: ""})
        }
    }

    onFailure = (args) => {
        console.error("FAILURE", args)
    }

    validate = (value, inputName) => {
        let error = "";

        if (inputName === "email") {
            let matched = value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gm)

            error = !matched ? "email is not valid" : ""
        }


        this.setState({[`${inputName}Error`]: error, [inputName]: value})
    }

    componentDidMount() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
            })
        })
        window.gapi.signin2.render('my-signIn', {
            'scope': 'profile',
            'width': 400,
            longitude: false,
            'height': 50,
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
        })
    }

    render() {
        const {classes} = this.props
        const {emailError,  passwordError, email, password, isLoggedIn} = this.state

        if (isLoggedIn) {
            return <Redirect to="/"/>
        }

        return (
            <Container style={{marginLeft: '305px'}} component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} onSubmit={this.login}>
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {email.length !== 0 ?
                                        emailError.length === 0 ?
                                            <BsCheckCircle className={"CheckMark"} size={40}/>
                                            : <BsExclamationCircleFill className={"ExclamationCircleFill"} size={35}/>
                                        : ""}
                                </InputAdornment>
                            }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            required
                            onChange={e => this.validate(e.target.value, "email")}
                            value={email}
                            error={emailError.length !== 0}
                            helperText={emailError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => this.validate(e.target.value, "password")}
                            value={password}
                            error={passwordError.length !== 0}
                            helperText={passwordError}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.isDisabled()}
                        >
                            Log In
                        </Button>

                        <div id="my-signIn" style={{textAlign: 'center'}}/>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                </Container>
        );
    }
}

export default withStyles(LoginStyle)(LogIn)

