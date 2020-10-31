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
  CircularProgress,
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
  loader: {
    textAlign: "center",
  },
}));

export const GitHubRepos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [size, setSize] = useState(5);
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

  //-------------------------------
  // Data Fetching
  //-------------------------------

  const loadFunc = (page) => {
    dispatch(
      actions.getAllGitHubPublicRepos({
        q: "react",
        page: page,
        per_page: size,
      })
    );
  };

  const repos = useSelector((state) => state.getAllRepos.response);

  //

  //-------------------------------
  // Input Validation
  //-------------------------------
  useEffect(() => {
    const errors = validate(commentInput.value, schema);

    setCommentInput((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [commentInput.value]);

  const hasError = (field) =>
    !!(commentInput.touched[field] && commentInput.errors[field]);

  //

  //-------------------------------
  // handling user interactions
  //-------------------------------

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
    setItemInLocalStorage(`C${id}`, commentInput.value.comment);

    const getComment = getItemFromLocalStorage(`C${id}`);
    setShowComment(getComment);
  };

  //

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={true}
      initialLoad={true}
      loader={
        <div className={classes.loader} key={0}>
          <CircularProgress size={30} />
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
                        hasError={hasError}
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
