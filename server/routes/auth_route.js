import { signup, signin, resetPwd, newPwd } from "../controllers/auth_controller";

export default (app) => {
    //Route to handle Signup requests
    app.post("/signup",signup);
    //Route to handle signin requests
    app.post("/signin",signin);
    //Route to handle Reset Passwords requests
    app.post("/reset-pwd",resetPwd);

    //Route to handle Created New passwords requets
    app.post("/new-pwd",newPwd);
};