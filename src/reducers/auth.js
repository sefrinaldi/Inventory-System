const userList = [{
    email : "admin@gmail.com",
    pass : "password"
},
{
    email : "user@gmail.com",
    pass : "password"
}]

const defaultState = {
    user :""
}

const authReducer = (state = defaultState, action) => {
    console.log("user in redux", userList);
    console.log("state:", state);
    console.log("action:", action.payload);
    switch (action.type) {
        case "LOGIN_OK":
            return {
                user : userList
            }
        case "LOGOUT":
            return defaultState
        default:
            return state
    }
}

export default authReducer;