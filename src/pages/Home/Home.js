import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Post from "./post";
import axios from "axios";

const BACKEND_URL = "https://localhost:4000"

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
  newsfeed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "red",
  },
  add_post: {
    width: "40rem",
    margin: 10,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newPost, setNewPost] = useState("");
  
  const handleNewPostChanged = (e) => {
    setNewPost(e.target.value);
  };


  const handlePost = async () => {
    //send post API
    try {
      const response = await axios.post(BACKEND_URL+ '/post', 
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error){
      console.log(error)
    }
    await getPost()
    setNewPost("");
  };

  const getPost = async (_token = token) => {
    try {
      const response = await axios.get(BACKEND_URL+ '/post', { headers: { Authorization: `Bearer ${_token}` } })
      const re = response.data.reverse()
      setPosts(re);
    } catch (error){
      localStorage.setItem('kengmaktoken', '')
      window.location.assign("/login");
    }
  }
  const handleLogout = async () => {
    try {
      const response = await axios.post(BACKEND_URL+ '/logout', 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error){
      console.log(error)
    }
    localStorage.setItem('kengmaktoken', '')
    window.location.assign("/login");
  }

  useEffect(() => {
    const data = localStorage.getItem('kengmaktoken')
    if(!data) window.location.assign("/login");
    const { username: _username, role: _role, token: _token } = JSON.parse(data)
    getPost(_token)
    setIsAdmin(_role === "MODERATOR");
    setUsername(_username);
    setToken(_token);
  }, []);

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
          <Avatar aria-label="user" className={classes.avatar}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Button
            onClick={handleLogout}
            color="secondary"
            autoFocus
            style={{ marginLeft: "1rem" }}
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.newsfeed}>
        <Card className={classes.add_post}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={username}
          />
          <CardContent>
            <TextField
              value={newPost}
              onChange={handleNewPostChanged}
              fullWidth
              variant="outlined"
              multiline
              rowsMax={4}
            />
            <Button
              onClick={handlePost}
              color="primary"
              autoFocus
              style={{ marginTop: "0.5rem" }}
              variant="contained"
            >
              Post
            </Button>
          </CardContent>
        </Card>
        {posts.map((post) => (
          <Post
            key={post._id}
            owner={post.owner}
            post={post._id}
            content={post.content}
            comments={post.comments}
            deleted_at={post.deleted_at}
            isAdmin={isAdmin}
            username={username}
            getPost={getPost}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}
