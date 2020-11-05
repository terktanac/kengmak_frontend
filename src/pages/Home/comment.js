import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 10,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Commemt(props) {
  const classes = useStyles();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditComment = () => {
    //edit comment API
    console.log("edit comment");
    setOpenEdit(false);
  };

  const handleDeleteComment = () => {
    //delete comment API
    console.log("delete comment");
    setOpenDelete(false);
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
        <IconButton aria-label="comment">
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
                Are you sure to delete this comment?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                  No
                </Button>
                <Button onClick={handleDeleteComment} color="primary" autoFocus>
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
              <DialogTitle id="alert-dialog-title">Edit comment</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="name"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  No
                </Button>
                <Button onClick={handleEditComment} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </span>
        )}
      </CardActions>
    </Card>
  );
}
