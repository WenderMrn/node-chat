import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import StringUtils from "../../utils/StringUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    float: "left",
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgb(0 0 0 / 0%)",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  inline: {
    display: "inline",
  },
}));

function UserList({ users }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Badge
                color={user.status === "on" ? "primary" : "error"}
                overlap="circle"
                badgeContent=" "
                variant="dot"
              >
                <Avatar>{StringUtils.getInitialsText(user.name)}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {user.email}
                  </Typography>
                  {/*" — I'll be in your neighborhood doing errands this…"*/}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

UserList.defaultProps = {
  users: [],
};

export default UserList;
