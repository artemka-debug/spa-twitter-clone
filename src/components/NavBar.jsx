import React from "react";
import {TopSection} from "../style"
import {InputAdornment, withStyles} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {BsSearch} from "react-icons/bs"
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FindDropDown from "./FindDropDown";
import CircularProgress from "@material-ui/core/CircularProgress";

class Navbar extends React.Component {
    state = {
        lettersInText: "",
        lettersInTitle: "",
    }

    isDisabled = (titleError, textError) => titleError.length === 0 && textError.length === 0 && this.state.lettersInText.length !== 0 && this.state.lettersInTitle.length !== 0;

    render() {
        const {classes, isLoggedIn, find, usersPending, users, post, userToFind, titleError, textError} = this.props
        const {lettersInText, lettersInTitle} = this.state

        if (isLoggedIn) {
            return (
                <Container className={classes.topSectionLogged}>
                    <Paper className={classes.createPost}>
                        <Container style={{display: 'flex'}}>
                            <Container className={classes.image}>
                                <img
                                    style={{borderRadius: '50%'}}
                                    src="/artemskii.png"
                                    alt="profile"
                                />
                            </Container>
                            <form className={classes.form} onSubmit={
                                e => {
                                    this.setState({lettersInTitle: "", lettersInText: ""})
                                    post(e, lettersInTitle, lettersInText)
                                }
                            }>
                                <Container className={classes.title}>
                                    <TextField
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <Typography
                                                        className={lettersInTitle.length > 40 ? classes.counterOver : classes.counter}>
                                                        {lettersInTitle.length !== 0 ? `${lettersInTitle.length} / 40` : ""}
                                                    </Typography>
                                                </InputAdornment>
                                        }}
                                        fullWidth
                                        value={lettersInTitle}
                                        error={titleError.length !== 0}
                                        helperText={titleError}
                                        placeholder="Title"
                                        onChange={e => this.setState({lettersInTitle: e.target.value})}
                                    />
                                </Container>
                                <Container className={classes.text}>
                                    <TextField
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <Typography
                                                        className={lettersInText.length > 255 ? classes.counterOver : classes.counter}>
                                                        {lettersInText.length !== 0 ? `${lettersInText.length} / 255` : ""}
                                                    </Typography>
                                                </InputAdornment>

                                        }}
                                        value={lettersInText}
                                        error={textError.length !== 0}
                                        helperText={textError}
                                        fullWidth
                                        placeholder="Text of post"
                                        multiline
                                        onChange={e => this.setState({lettersInText: e.target.value})}
                                    />
                                </Container>
                                <Container style={{display: 'flex',}}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.tweet}
                                        disabled={!this.isDisabled(titleError, textError)}
                                    >
                                        Post
                                    </Button>
                                </Container>
                            </form>
                        </Container>
                    </Paper>
                    <Container className={classes.searchBoxLogged}>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <BsSearch size={30}/>
                                </InputAdornment>
                            }}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            placeholder="Search User"
                            onChange={find}
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
            )
        } else {
            return (
                <Container className={classes.topSection}>
                    <Container className={classes.searchBox}>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <BsSearch size={30}/>
                                </InputAdornment>
                            }}
                            onChange={find}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            placeholder="Search User"
                        />
                    </Container>
                    {!usersPending ? userToFind.length !== 0 ?
                        users.length !== 0 ?
                            <Paper className={classes.usersUnlogged}>
                                {users.map(user => (
                                    <FindDropDown key={user.id} user={user}/>
                                ))}
                            </Paper> :
                            <Paper className={classes.usersUnlogged}>
                                <Container>No user were found</Container>
                            </Paper> : "" :
                        <Paper className={classes.usersUnlogged}>
                            <CircularProgress/>
                        </Paper>
                    }
                    <Container className={classes.loginButtons}>
                        <Container className={classes.links}>
                            <Link to="/sign-up" className="link">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </Container>
                        <Container className={classes.links}>
                            <Link to="login" className="link">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Log In
                                </Button>
                            </Link>
                        </Container>
                    </Container>
                </Container>
            )
        }
    }
}

export default withStyles(TopSection)(Navbar)