import React, {useContext,useState} from "react";
import {Link, useHistory} from "react-router-dom";
import AuthenticationContext from "../contexts/auth/auth_context";

import {LOGOUT} from "./contexts/types";
import Axios from "axios";

//Material UI-Components
import List from "@material-ui/core/List";
import ListListen from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigation";
import Modal from "@material-ui/core/Modal";

//Material-UI Icons
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExploreOutlinedActionIcon from "@material-ui/icons/ExploreOutlinedAction";
import AddPhotoOutlinedIcon from "@material-ui/icons/AddPhotoOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme) => ({
    root: {
		width: "100%",
	},
	inline: {
		display: "inline",
	},
	grow: {
		flexGrow: 1,
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
		fontFamily: "Grand Hotel, cursive",
		color: "rgba(0, 0, 0, 0.54)",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "rgba(0, 0, 0, 0.075)",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.03)",
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
		margin: "0px auto",
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "rgba(0, 0, 0, 0.54)",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "30ch",
		},
		color: "#000000",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "1px solid rgba(0, 0, 0, 0.015)",
		boxShadow: theme.shadows[4],
		padding: theme.spacing(2, 4, 3),
		borderRadius: "10px",
		"&:focus": {
			border: "1px solid rgba(0, 0, 0, 0.015)",
		},
	},
	links: {
		textDecoration: "none",
	},


}));

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}`,
        transform: `translate(-${top}%,-${left})`,
        border: "1px solid rgba(0,0,0,0.015)",

    };

};

const Navbar = () => {
    const {state, dispatch } = useContext(AuthenticationContext);
    const history = userHistory();
    const [search, setSearch] = useState([]);

    //Material Ui
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //getModalStyle is not a pure function, we roll the style only on the first render

    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false);

    const finduser = (pattern) =>{
        if(!(pattern === "")){
            const URL = `http://localhost:5000/users-research`;
            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            };

            Axios.post(URL, {pattern},config).then((res)=>{
                setSearch(res.data);
            });

        }
    };

    const handleOpenModal = () =>{
        setMobileMenuClose();
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogOut = () =>{
        localStorage.clear();
        dispatch({type: LOGOUT});
        history.push("/login");
    };
    



}

