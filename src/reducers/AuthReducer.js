import Cookies from "js-cookie";

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            // localStorage.setItem("token", action.token);
            Cookies.set("token", action.token);
            return action.token;
        case "LOGOUT":
            // localStorage.removeItem("token");
            Cookies.remove("token");

            return null;
        default:
            return state;
    }
};
