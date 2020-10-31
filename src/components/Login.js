import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import GitHubLogin from "github-login";
import { setItemInLocalStorage } from "../helper/localStorage";
import illus from "../assets/images/login.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: 500,
    textAlign: "center",
    backgroundColor: "#f6f6f6",
    color: "#000",
    padding: theme.spacing(4),
  },
  content: {
    "& > *": {
      marginBottom: "1rem",
    },
  },
  gitHubBtn: {
    backgroundColor: "#000",
    color: "#f4f4f4",
    padding: ".8rem",
    border: "none",
    marginTop: "2rem",
    borderRadius: ".2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cover: {
    width: 251,
    height: 250,
  },
}));

export const Login = () => {
  const classes = useStyles();

  const onSuccess = (response) => {
    if (response && response.code) {
      window.location.href = "/home";
      setItemInLocalStorage("code", response.code);
    }
  };
  const onFailure = (response) => console.error(response);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h4">Welcome</Typography>
          <Typography variant="body1">To Eksab Task</Typography>
          <GitHubLogin
            clientId="2648c2f6c78a6b50b7bc"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="http://localhost:3000/home"
            className={classes.gitHubBtn}
          />
        </CardContent>
        <CardMedia className={classes.cover} image={illus} title="Eksab" />
      </Card>
    </div>
  );
};
