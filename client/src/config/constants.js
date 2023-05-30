//This is the config used in order to send our token with Axios requests
export const config = (jwt) =>{
    return {
        headers: {
            Authorization: "Bearer" + jwt,
        },
    };
};

const host_name ="192.168.24.191";
/* EndPoints of the API used in the code */

//CreatePost Screen
export const CREATE_POST_URL = `http://${host_name}:5000/createpost`;
//Home Screen
export const ALL_POST_URL =`http://${host_name}:5000/allpost`;
//Login Screen
export const LOGIN_URL =`http://${host_name}:5000/signin`;
//New Password Screeen
export const NEW_PWD_URL =`http://${host_name}:5000/new_pwd`;
//Profile screen
export const MY_POST_URL =`http://${host_name}:5000/mypost`;
export const MY_BOOKMARKS_PWD_URL =`http://${host_name}:5000/bookmarks`;

//Reset password screen
export const RESET_PWD_URL =`http://${host_name}:5000/reset_pwd`;
//Sign up screen
export const SIGNUP_URL =`http://${host_name}:5000/signup`;

//Subscribe Posts
export const SUB_POST_URL =`http://${host_name}:5000/subbost`;

