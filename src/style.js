import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React from "react";

const theme = createMuiTheme();

export const ProfileStyle = {
    counter: {
        fontSize: "1rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        color: "rgba(0, 0, 0, 0.54)",
    },
    counterOver: {
        fontSize: "1rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        color: '#FF9494',
    },
    edit: {
        position: 'absolute',
        elevation: 3,
        display: 'block',
        marginLeft: theme.spacing(425 / 8),
        marginTop: theme.spacing(112 / 8),
        width: '35%'
    },
    editNickname: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    editStatus: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    confirmEditButton: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '19%',
    },
    nickname: {
        marginLeft: theme.spacing(3),
    },
    status: {
        marginLeft: theme.spacing(3),
    },
    userInformation: {
        width: '70%'
    },
    posts: {
        width: "55.5%",
        marginLeft: theme.spacing(6)
    },
    progress: {
        marginTop: theme.spacing(2),
        marginLeft: '45%',
    },
    users: {
        elevation: 3,
        padding: theme.spacing(2),
        width: '19.3%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(102.375),
        marginTop: theme.spacing(6.25),
        position: 'absolute',
    },
    editButton: {
        marginLeft: theme.spacing(30),
        marginTop: theme.spacing(17.125)
    },
    image: {
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(5),
        width: '200px'
    },
    searchBoxLogged: {
        width: '35%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(10),
    },
    topOfProfile: {
        width: '100%',
        marginTop: theme.spacing(1),
    }
}

export const FindDropDownStyle = {
    link: {
        color: "inherit", /* blue colors for links too */
        textDecoration: "inherit",
        '&:visited': {
            color: 'inherit'
        }
    },
    user: {
        display: 'flex',
        elevation: 1,
        variant: "outlined",
        marginTop: theme.spacing(1),
        '&:hover': {
            background: "#F8F8F8",
        },
        width: '100%'
    },
    image: {
        objectFit: 'cover',
        width: '16%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
    },
    nickname: {
        width: '20%',
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(2),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: "underline"
        }
    }
}

export const BlogStyle = {
    pagination: {
        marginLeft: theme.spacing(267 / 8),
        marginTop: theme.spacing(22 / 8)
    },
    main: {
        marginRight: 'unset',
    },

    loading: {
        textAlign: 'center',
        marginTop: '25%',
    },
    posts: {
        marginTop: theme.spacing(2),
        elevation: 3,
        padding: theme.spacing(2),
        width: '49.5%',
        marginLeft: theme.spacing(16),
    },

    progress: {
        textAlign: 'center',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0)
    }
}

export const PostViewerStyle = {
    deletePost: {
        width: '40px',
        height: '40px',
        marginTop: theme.spacing(19 / 8),
        paddingLeft: theme.spacing(0),
        marginLeft: theme.spacing(0)
    },
    form: {
        display: 'flex'
    },
    imageInComment: {
        width: '75px',
        marginLeft: theme.spacing(3),
        paddingLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(1)
    },
    commentSection: {},
    commentTweet: {
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '10%'
    },
    input: {
        marginTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        marginRight: theme.spacing(0),
        width: '580px',
    },
    commentAdd: {
        display: 'flex'
    },
    commentText: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        wordBreak: 'break-all'
    },
    comment: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(0),
        paddingBottom: '8px',
    },
    users: {
        elevation: 3,
        padding: theme.spacing(2),
        width: '23.3%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(94),
        marginTop: theme.spacing(6.25),
        position: 'absolute',
    },
    searchBoxLogged: {
        width: '35%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(10),
    },

    link: {
        color: "inherit", /* blue colors for links too */
        textDecoration: "inherit",
        '&:visited': {
            color: 'inherit'
        }
    },
    commentNickname: {
        width: '60%',
        height: '20%',
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(4),
        padding: theme.spacing(0),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: "underline"
        }
    },
    commentTime: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(26.625),
    },
    topComment: {
        paddingLeft: theme.spacing(0),
    },
    post: {
        elevation: 1,
        variant: "outlined",
        width: '47%',
        marginLeft: theme.spacing(10),
    },
    top: {
        display: 'flex',
        padding: theme.spacing(0),
    },
    image: {
        objectFit: 'cover',
        width: '16%',
        height: '16%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    commentImage: {
        objectFit: 'cover',
        width: '16%',
        height: '16%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        marginTop: theme.spacing(2),
    },
    nickname: {
        width: '29%',
        height: '20%',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(4),
        padding: theme.spacing(0),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: "underline"
        }
    },
    time: {
        height: '20%',
        width: '20%',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),
        fontWeight: 400,
    },
    text: {
        width: '100%',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(4),
        paddingRight: theme.spacing(9),
        marginTop: theme.spacing(2),
        wordBreak: 'break-all'
    },
    likeIcon: {
        width: '40px',
        height: '40px',
        '&:hover': {
            fill: 'red'
        }
    },
    commentIcon: {
        width: '25.58px',
        height: '40px',
        '&:hover': {
            fill: 'blue'
        },
    },
    like: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    dropDown: {
        width: '10%',
        height: '7%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(722 / 8),
        marginTop: theme.spacing(59 / 8)
    },
    arrowDownIcon: {
        width: '40px',
        height: '40px',
        '&:hover': {
            fill: 'lightblue'
        },
    },
    likeButton: {
        display: 'flex',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),

    },
    commentButton: {
        display: 'flex',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(31.5),
        marginBottom: theme.spacing(2),
    },
    likes: {
        marginTop: theme.spacing(1.3),
        fontWeight: 400,
        fontSize: ".75rem",
        lineHeight: "1rem",
    },
    comments: {
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        fontWeight: 400,
        fontSize: ".75rem",
        lineHeight: "1rem",
    },
    deleteButton: {
        width: '100%',
    },
}

export const PostsStyle = {
    slidingAlert: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
        marginTop: theme.spacing(19 / 8),
        marginLeft: theme.spacing(48 / 8),
    },
    link: {
        color: "inherit", /* blue colors for links too */
        textDecoration: "inherit",
        '&:visited': {
            color: 'inherit'
        }
    },
    post: {
        elevation: 1,
        variant: "outlined",
        marginTop: theme.spacing(1),
        '&:hover': {
            background: "#F8F8F8",
        },
        width: '100%',
    },
    top: {
        display: 'flex',
        padding: theme.spacing(0),
    },
    image: {
        objectFit: 'cover',
        width: '16%',
        height: '16%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    nickname: {
        width: '60%',
        height: '20%',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(4),
        padding: theme.spacing(0),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: "underline"
        }
    },
    time: {
        height: '20%',
        width: '20%',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),
        fontWeight: 400,
    },
    text: {
        width: '100%',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(4),
        paddingRight: theme.spacing(9),
        marginTop: theme.spacing(2),
        wordBreak: 'break-all'
    },
    likeIcon: {
        width: '40px',
        height: '40px',
        '&:hover': {
            fill: 'red'
        }
    },
    commentIcon: {
        width: '25.58px',
        height: '40px',
        '&:hover': {
            fill: 'blue'
        },
    },
    like: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    likeButton: {
        display: 'flex',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),

    },
    commentButton: {
        display: 'flex',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(31.5),
        marginBottom: theme.spacing(2),
    },
    likes: {
        marginTop: theme.spacing(1.3),
        fontWeight: 400,
        fontSize: ".75rem",
        lineHeight: "1rem",
    },
    comments: {
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(1.5),
        fontWeight: 400,
        fontSize: ".75rem",
        lineHeight: "1rem",
    }
}

export const LeftNavBarStyle = {
    main: {
        width: '15%',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(20),
        padding: '0'
    },
    homeButton: {
        marginTop: theme.spacing(5),
    },
    profileButton: {
        marginTop: theme.spacing(5),
    },
    signOutButton: {
        marginTop: theme.spacing(5),

    },
}

export const TopSection = {
    usersUnlogged: {
        elevation: 3,
        padding: theme.spacing(2),
        width: '41.5%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(13),
        marginTop: theme.spacing(6.25),
        position: 'absolute',
    },
    users: {
        elevation: 3,
        padding: theme.spacing(2),
        width: '18.3%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(104.125),
        marginTop: theme.spacing(6.25),
        position: 'absolute',
    },
    tweet: {
        width: '20%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(42.15),
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(2)
    },
    topSectionLogged: {
        display: 'flex',
    },
    topSection: {
        display: 'flex',
    },
    counter: {
        fontSize: "1rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        color: "rgba(0, 0, 0, 0.54)",
    },
    counterOver: {
        fontSize: "1rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        color: '#FF9494',
    },
    text: {
        width: '100%',
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    title: {
        width: '100%',
        marginRight: theme.spacing(3),
    },
    image: {
        objectFit: 'cover',
        width: '16%',
        height: '32%',
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(2),
        padding: theme.spacing(0)
    },
    createPost: {
        marginTop: theme.spacing(2),
        elevation: 3,
        padding: theme.spacing(2),
        width: '61%',
        marginLeft: theme.spacing(13),
    },
    searchBoxLogged: {
        width: '35%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(10),
    },
    searchBox: {
        width: '67%',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(10),
    },
    links: {
        marginTop: theme.spacing(0.9),
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
        float: 'right',
        width: '50%'
    },
    button: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textTransform: 'none'
    },
    loginButtons: {
        width: '40%',
        float: 'right',
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
    }
}

export const LoginStyle = {
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
};
