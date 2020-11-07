import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Comment from "./comment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40rem",
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  add_comment: {
    width: "100%",
    margin: 10,
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedPost, setEditedPost] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = () => {
    setEditedPost(props.content);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditedPostChanged = (e) => {
    setEditedPost(e.target.value);
  };

  const handleNewCommentChanged = (e) => {
    setNewComment(e.target.value);
  };

  const handleComment = () => {
    //send comment API
    console.log("comment " + newComment);
    setNewComment("")
  };

  const handleEditPost = () => {
    //edit post API
    console.log("edit post to " + editedPost);
    setOpenEdit(false);
  };

  const handleDeletePost = () => {
    //delete post API
    console.log("delete post");
    setOpenDelete(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.owner?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={props.owner}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comment"
        >
          <CommentIcon />
        </IconButton>
        {(props.isAdmin || props.username === props.owner) && (
          <span>
            <IconButton aria-label="delete" onClick={handleOpenDelete}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure to delete this post?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                  No
                </Button>
                <Button onClick={handleDeletePost} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <IconButton aria-label="edit" onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton>
            <Dialog
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Edit post</DialogTitle>
              <DialogContent>
                <TextField
                  value={editedPost}
                  onChange={handleEditedPostChanged}
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="name"
                  type="email"
                  fullWidth
                  multiline
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  No
                </Button>
                <Button onClick={handleEditPost} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </span>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Card className={classes.add_comment}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {props.owner?.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={props.owner}
            />
            <CardContent>
              <TextField
                value={newComment}
                onChange={handleNewCommentChanged}
                fullWidth
                variant="outlined"
                multiline
              />
              <Button
                onClick={handleComment}
                color="primary"
                autoFocus
                style={{ marginTop: "0.5rem" }}
                variant="contained"
              >
                Comment
              </Button>
            </CardContent>
          </Card>
          {props.comments?.map((comment) => (
            <Comment
              id={comment.id}
              content={comment.content}
              owner={comment.owner}
              deleted_at={comment.deleted_at}
              isAdmin={props.isAdmin}
              username={props.username}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
