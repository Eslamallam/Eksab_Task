import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logout from "@material-ui/icons/ExitToApp";
import { clearLocalStorage } from "../helper/localStorage";

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
}));

export const Header = () => {
  const classes = useStyles();

  const handleLogout = () => {
    clearLocalStorage();
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Eksab!!
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout <Logout />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
