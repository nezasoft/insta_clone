import { signup, signin, resetPwd, newPass } from "../controllers/auth_controller.js";

export default (app) => {
    //Route to handle Signup requests
    app.post("/signup",signup);
    //Route to handle signin requests
    app.post("/signin",signin);
    //Route to handle Reset Passwords requests
    app.post("/reset-pwd",resetPwd);

    //Route to handle Created New passwords requets
    app.post("/new-pwd",newPass);
};