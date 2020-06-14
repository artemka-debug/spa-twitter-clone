import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import {LeftNavBarStyle} from "../style";
import authStore from "../auth.reducer";
import {BsFillHouseFill, BsFillPersonFill, BsBoxArrowLeft} from "react-icons/all";
import axios from "../axios";
import {subscribe} from "../subscription";

class LeftNavBar extends React.Component {
    state = {
        isLoggedIn: false,
        pendingInfo: false
    }

    logout = () => {
        authStore.dispatch({
            type: "LOGOUT"
        })
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
        auth2.disconnect();
    }

    setLoggedIn = async () => {
        let data = await this.isLoggedIn();

        if (data.meta.result) {
            if ((await navigator.serviceWorker.getRegistrations())) {
                await subscribe()
            }
        }
        this.setState({isLoggedIn: data.meta.result, pendingInfo: false})
    }
    isLoggedIn = async () => {
        let res;
        try {
            res = await axios.get(`/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("RES ME", res)
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

    componentDidMount() {
        this.setState({pendingInfo: true})
        this.setLoggedIn()
        this.unsub = authStore.subscribe(() => {
            let state = authStore.getState()

            this.setState({isLoggedIn: state.isLogged})
        })
    }

    componentWillUnmount() {
        this.unsub()
    }


    render() {
        const {classes} = this.props
        const {isLoggedIn, pendingInfo} = this.state

        if (!isLoggedIn) {
            return <div style={{width: '200px'}}/>
        }

        if (pendingInfo) {
            return <div style={{width: '200px'}}/>
        }

        return (
            <Container className={classes.main}>
                <Container className={classes.homeButton}>
                    <Button
                        href={"/"}
                        startIcon={<BsFillHouseFill/>}
                    >
                        Home
                    </Button>
                </Container>
                <Container className={classes.profileButton}>
                    <Button
                        href={`/profile/${localStorage.getItem("userId")}`}
                        startIcon={<BsFillPersonFill/>}
                    >
                        Profile
                    </Button>
                </Container>
                <Container className={classes.signOutButton}>
                    <Button
                        href={`/`}
                        onClick={this.logout}
                        startIcon={<BsBoxArrowLeft/>}
                    >
                        Sign out
                    </Button>
                </Container>


            </Container>
        )
    }
}

export default withStyles(LeftNavBarStyle)(LeftNavBar)
