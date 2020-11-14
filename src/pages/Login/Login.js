import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  inputColor: {
    color: "white",
  },
  flexBar: {
    display: "flex",
    justifyContent: "space-between",
    width: "30rem",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChanged = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    //send login API
    axios
      .post(
        `http://localhost:4000/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      )
      .then((res) => {
        window.location.assign("/");
        console.log(res.data.token);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            fakebook
          </Typography>
          <div className={classes.flexBar}>
            <TextField
              value={username}
              onChange={handleUsernameChanged}
              label="Username"
              size="small"
              variant="outlined"
              InputProps={{
                className: classes.inputColor,
              }}
            />
            <TextField
              value={password}
              onChange={handlePasswordChanged}
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              InputProps={{
                className: classes.inputColor,
              }}
            />
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
