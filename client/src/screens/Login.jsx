import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import AuthenticationContext from "../contexts/auth/auth_context";
import  {FETCH_USER_DATA} from "../contexts/types";
import {LOGIN_URL} from "../config/constants";
import Copyright from "../components/Copyright";
import {EmailRegex} from "../utils/regex";
import axios from "axios";

//Metrails UI components

import Button from "@material-ui/core/Button";
import  CssBaseline  from "@material-ui/core/CssBaseline";
import  TextField  from "@material-ui/core/TextField";
import  Grid  from "@material-ui/core/Grid";
import  Box  from "@material-ui/core/Box";
import  Typography  from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import  Container from "@material-ui/core/Container";
import Alert  from "@material-ui/lab/Alert";

//General Styles 
const useStyles = makeStyles((theme)=>({ 
    Logo: {
		fontFamily: "Grand Hotel, cursive",
		margin: "0px 0px 20px 0px",
	},
	paper: {
		marginTop: "50px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		backgroundSize: "cover",
		backgroundColor: "#fafafa",
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "100vh",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const Login = () => {
    const {dispatch} = useContext(AuthenticationContext);
    const history = useHistory();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formatValidation, setFormatValidation] = useState(false);
    const [authValidation, setAuthValidation] = useState(false);

    const handleInputChanges = (e) => {
        switch(e.target.name){
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;

        }
    };

    const handlePostData = () => {
        if(EmailRegex.test(email)){
            axios.post(LOGIN_URL,{password,email}).then((res)=>{
                const data = res.data;
                if(data.error){
                    setFormatValidation(false);
                    setAuthValidation(true);
                }else{
                    //we store our generated token inorder to use it to access protected endpoint
                    localStorage.setItem("jwt",data.token);
                    //we also store the users details
                    localStorage.setItem("user",JSON.stringify(data.user));
                    dispatch({type: FETCH_USER_DATA,payload: data.user});
                    //we redirect the user to home page
                    history.push("/");
                }
            }).catch((err)=>{
                //that should be changed in production
                console.log(err);
            });

        }else{
            setAuthValidation(false);
            setFormatValidation(true);
        }
    };
    return(
        <Grid container>
            <Grid className={classes.image} item sm={4} md={6} />
            <Grid item xs={12} sm={8} md={6}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography className={classes.logo} variant="h2" gutterBottom>
                            Instagram Clone
                        </Typography>

                        {formatValidation ? (
                            <Alert variant="outlined" severity="error">
                                Invalid Email format!
                            </Alert>
                        ): null}

                        {authValidation ? (
                            <Alert variant="outlined" severity="error">
                                Invalid Email / Password!

                            </Alert>
                        ) : null}

                        <form className={classes.form} noValidate>
                            <TextField 
                            variant="outline"
                            margin="normal"
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={handleInputChanges}
                            />
                            <TextField 
                            variant="oiutlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleInputChanges}
                            />   
                            <Button 
                            fullWidth
                            variant="outlined"
                            color="primary"
                            disabled={email !== "" && password !=="" ? false: true}
                            className={classes.submit}
                            onClick={handlePostData}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Link to="/reset" style={{textDecoration: "none"}}>{"Dont have an account? Sign Up"}</Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" style={{textDecoration: "none"}}>
                                </Link>

                            </Grid>
                        </form>

                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>


                </Container>
            </Grid>
        </Grid>
    );

};
export default Login; 