import {createStore} from "redux";

const initialState = {
    token: localStorage.getItem("token") || "",
    user: {
        id: localStorage.getItem("userId") || "",
        nickname: localStorage.getItem("nickname") || "",
        email: localStorage.getItem("email") || "",
        status: localStorage.getItem("status") || "",
    },
    isLogged: false
}

function authStorage(state = initialState, action) {
    switch (action.type) {
        case 'EDIT_PROFILE':
            const {payload} = action

            localStorage.setItem("status", payload.status)
            localStorage.setItem("nickname", payload.nickname)

            return {
                token: localStorage.getItem("token"),
                user: {
                    nickname: payload.nickname,
                    status: payload.status,
                    id: localStorage.getItem("userId"),
                    email: localStorage.getItem("email"),
                },
                isLogged: true
            }
        case 'LOGIN':
            const {token, user: {id, nickname, email, status}} = action.payload
            console.log("login reducer", token)

            localStorage.setItem("token", token)
            localStorage.setItem("userId", id)
            localStorage.setItem("nickname", nickname)
            localStorage.setItem("email", email)
            localStorage.setItem("status", status)
            localStorage.setItem("isLogged", "true")

            return action.payload
        case 'LOGOUT':
            console.log("logout reducer")

            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("nickname")
            localStorage.removeItem("email")
            localStorage.removeItem("status")
            localStorage.removeItem("isLogged")

            return {
                token: "",
                user: {
                    id: "",
                    nickname: "",
                    email: "",
                    status: ""
                },
                isLogged: false
            }
        case 'CHANGE_NICKNAME':
            console.log("change name")
            return
        default:
            return state
    }
}

const authStore = createStore(authStorage)
export default authStore