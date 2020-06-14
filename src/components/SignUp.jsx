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
import {BsCheckCircle, BsExclamationCircleFill} from "react-icons/bs";
import axios from "../axios";
import authStore from "../auth.reducer";
import {subscribe} from "../subscription";
import {LoginStyle} from "../style";
import {Redirect} from "react-router-dom";

class SignUp extends React.Component {
    state = {
        emailError: "",
        passwordError: "",
        nicknameError: "",
        email: "",
        password: "",
        nickname: "",
        isDisabled: "",
        isLoggedIn: localStorage.getItem("isLogged") === "true" ? true : false
    }

    signUp = async (e) => {
        e.preventDefault()

        const {email, password} = this.state

        let res
        try {
            res = await axios.post(`/sign-up`, {
                email, password, nickname: this.state.nickname
            })

            console.log("RES", res)
        } catch (err) {
            console.error(err)
            const {email, password, nickname} = err.response.data.data.error_for_user

            this.setState({emailError: email || "", passwordError: password || "", nicknameError: nickname || ""})
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
            this.setState({isLoggedIn: true, emailError: "", passwordError: "", nicknameError: ""})
        }
    }

    validate = (value, inputName) => {
        let error = "";

        switch (inputName) {
            case "email":
                let matched = value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gm)

                error = !matched ? "email is not valid" : ""
                break;
            case "password":
                if (!(value.length >= 8 && value.length <= 24)) {
                    error += "length of the password has to be more then 8 and less then 24 "
                }
                if (!(value.match(/[A-Z]/gm))) {
                    error += "must contain capital letter "
                }
                if (!(value.match(/[a-z]/gm))) {
                    error += "must contain low case letter "
                }

                break;
            case "nickname":
                if (!(value.length >= 3 && value.length <= 40)) {
                    error += "length must be more then 3 and less then 40 "
                }
                if (!(value.match(/[a-z0-9A-Z_-]/gm))) {
                    error += "can contain only low and upper case letters and numbers"
                }

                break;
            default:
                console.log("DEFAULT")
        }

        this.setState({[`${inputName}Error`]: error, [inputName]: value})
    }

    onSignIn = async (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        const profile = googleUser.getBasicProfile();
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
            this.setState({isLoggedIn: true, emailError: "", passwordError: "", nicknameError: ""})
        }
    }

    onFailure = (args) => {
        console.error("FAILURE", args)
    }

    isDisabled() {
        const {email, nickname, password, emailError, nicknameError, passwordError} = this.state

        return emailError.length === 0 && nicknameError.length === 0 && passwordError.length === 0 &&
            email.length !== 0 && nickname.length !== 0 && password.length !== 0
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
        this.unsub = authStore.subscribe(() => {
            let redState = authStore.getState()

            this.setState({isLoggedIn: redState.isLogged})
        })
    }

    componentWillUnmount() {
        this.unsub()
    }


    render() {
        const {classes} = this.props
        const {isLoggedIn, emailError, nicknameError, passwordError, email, password, nickname} = this.state

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
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.signUp}>
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {password.length !== 0 ?
                                        passwordError.length === 0 ?
                                            <BsCheckCircle className={"CheckMark"} size={40}/>
                                            : <BsExclamationCircleFill className={"ExclamationCircleFill"} size={35}/>
                                        : ""}
                                </InputAdornment>
                            }}
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
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {nickname.length !== 0 ?
                                        nicknameError.length === 0 ?
                                            <BsCheckCircle className={"CheckMark"} size={40}/>
                                            : <BsExclamationCircleFill
                                                className={"ExclamationCircleFill"}
                                                size={35}

                                            />
                                        : ""}
                                </InputAdornment>
                            }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="nickname"
                            label="Nickname"
                            name="nickname"
                            autoComplete="text"
                            autoFocus
                            onChange={e => this.validate(e.target.value, "nickname")}
                            value={nickname}
                            error={nicknameError.length !== 0}
                            helperText={nicknameError}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.isDisabled()}
                        >
                            Sign Up
                        </Button>

                        <div id="my-signIn" style={{textAlign: 'center'}}/>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(LoginStyle)(SignUp)