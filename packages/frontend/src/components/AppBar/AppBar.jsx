import React, { useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import AuthUtils from "../../utils/AuthUtils";

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
  infoBox: {
    cursor: "pointer",
  },
  name: {
    color: "#eceff1",
  },
}));

function MenuAppBar({ onLogout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = AuthUtils.getUser();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  return (
    <Box display="flex" flexDirection="row" className={classes.root}>
      <AppBar position="static">
        <Toolbar onClose={handleClose}>
          <Typography variant="h6" className={classes.title}>
            NodeChat
          </Typography>

          <Box
            onClick={handleMenu}
            display="flex"
            flexDirection="row"
            className={classes.infoBox}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="fit-content"
              height="100%"
            >
              <Box>{user.email}</Box>
              <Box className={classes.name}>{capitalize(user.name)}</Box>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>{user.name}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

MenuAppBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default MenuAppBar;
