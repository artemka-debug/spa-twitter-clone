import React from "react";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import {FindDropDownStyle} from "../style";
import {Link} from "react-router-dom";

class FindDropDown extends React.Component {
    reload = () => {
        setTimeout(() => window.location.reload(), 250);
    }

    render() {
        const {classes, user} = this.props

        return (
            <Paper className={classes.user}>
                <Container className={classes.image}>
                    <img
                        style={{borderRadius: '50%'}}
                        src="/test.png"
                        alt="profile"
                    />
                </Container>
                <Container className={classes.nickname}>
                    <Link to={`/profile/${user.id}`} className={classes.link} onClick={this.reload}>
                        {user.nickname}
                    </Link>
                </Container>
            </Paper>
        );
    }
}

export default withStyles(FindDropDownStyle)(FindDropDown)
