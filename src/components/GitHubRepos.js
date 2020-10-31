import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "../store/actions";
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Typography,
  IconButton,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from "../helper/localStorage";
import validate from "validate.js";
import { CommentSection } from "./CommentSection";

//used for validation
const schema = {
  comment: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
  },
  commentSection: {
    padding: "1rem 1.5rem",
    color: "#545252",
    margin: "1.5rem",
    border: "1px solid #bbb",
    borderRadius: ".5rem",
    backgroundColor: "#f8f8f8",
  },
}));

export const GitHubRepos = () => {
  const classes = useStyles();
  const [size, setSize] = useState(15);
  const [appendInput, setAppendInput] = useState(false);
  const [itemID, setItemId] = useState(0);
  const [hideCommentBtn, setHideCommentBtn] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState({
    isValid: false,
    value: {},
    errors: {},
    touched: {},
  });
  const dispatch = useDispatch();

  const repos = useSelector((state) => state.getAllRepos.response);

  useEffect(() => {
    const errors = validate(commentInput.value, schema);

    setCommentInput((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [commentInput.value]);

  const loadFunc = (page) => {
    dispatch(
      actions.getAllGitHubPublicRepos({ q: "js", page: page, per_page: size })
    );
  };

  const handleItemClick = (id) => {
    setItemId(id);
    setAppendInput(true);
    setHideCommentBtn(true);
  };

  const handleInputChange = (e) => {
    e.persist();

    setCommentInput((prevState) => ({
      ...prevState,
      value: {
        ...prevState.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...prevState.touched,
        [e.target.name]: true,
      },
    }));
  };

  const handleSaveComment = (id) => {
    console.log(commentInput.value.comment);
    setItemInLocalStorage(`C${id}`, commentInput.value.comment);

    const getComment = getItemFromLocalStorage(`C${id}`);
    setShowComment(getComment);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <List>
        {repos &&
          repos.length > 0 &&
          repos.map((repo) => {
            return (
              <>
                <ListItem
                  key={repo.id}
                  button
                  onClick={() => handleItemClick(repo.id)}
                >
                  <ListItemIcon>
                    <Avatar>{repo.owner.avatar_url}</Avatar>
                  </ListItemIcon>
                  <ListItemText primary={`${repo.name}`}> </ListItemText>
                  <ListItemSecondaryAction>
                    {hideCommentBtn && repo.id === itemID ? null : (
                      <IconButton onClick={() => handleItemClick(repo.id)}>
                        <CommentIcon />
                      </IconButton>
                    )}

                    {repo.id === itemID && appendInput ? (
                      <CommentSection
                        handleSaveComment={handleSaveComment}
                        handleInputChange={handleInputChange}
                        repoId={repo.id}
                        comment={commentInput.value.comment}
                        commentInput={commentInput}
                      />
                    ) : null}
                  </ListItemSecondaryAction>
                </ListItem>
                {getItemFromLocalStorage(`C${repo.id}`) !== "" ? (
                  <div className={classes.commentSection}>
                    {getItemFromLocalStorage(`C${repo.id}`) || (
                      <Typography variant="caption">
                        Be first who comment ...
                      </Typography>
                    )}
                  </div>
                ) : null}
              </>
            );
          })}
      </List>
    </InfiniteScroll>
  );
};
