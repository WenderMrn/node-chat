import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import AuthUtils from "../../utils/AuthUtils";
import StringUtils from "../../utils/StringUtils";

const useStyles = makeStyles(() => {
  const backgroundColor = ({ myself }) => (myself ? "#a0daa2" : grey[300]);

  const MESSAGE = {
    maxWidth: "100%",
    position: "relative",
    borderRadius: ".4em",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    hyphens: "auto",
    backgroundColor,
  };

  const AFTER_DEFAULT = {
    content: "''",
    position: "absolute",
    top: "50%",
    width: 0,
    height: 0,
    border: "10px solid transparent",
    marginTop: "-10px",
  };

  return {
    rightMessage: {
      ...MESSAGE,
      "&:after": {
        ...AFTER_DEFAULT,
        right: 0,
        borderRight: 0,
        borderLeftColor: backgroundColor,
        marginRight: "-10px",
      },
    },
    leftMessage: {
      ...MESSAGE,
      "&:after": {
        ...AFTER_DEFAULT,
        left: 0,
        borderLeft: 0,
        borderRightColor: backgroundColor,
        marginLeft: "-10px",
      },
    },
  };
});

function Message({ text, from, dateTime }) {
  const user = AuthUtils.getUser();
  const myself = user.id === from.id;

  const classes = useStyles({
    myself,
    treze: 23,
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="fit-content"
      alignSelf={`flex-${myself ? "end" : "start"}`}
      width="100%"
      pt={2}
    >
      <Box
        display="flex"
        flexDirection={myself ? "row-reverse" : "row"}
        width="100%"
      >
        <Box pr={myself ? 0 : 2} pl={!myself ? 0 : 2}>
          <Avatar>{StringUtils.getInitialsText(from.name)}</Avatar>
        </Box>
        <Box
          className={myself ? classes.rightMessage : classes.leftMessage}
          borderRadius={8}
          p={1}
          pt={1.5}
        >
          {text}
        </Box>
      </Box>
      {dateTime && <Box alignSelf="flex-end">{dateTime}</Box>}
    </Box>
  );
}

Message.propTypes = {
  text: PropTypes.string,
  dateTime: PropTypes.string,
  from: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

Message.defaultProps = {
  text: "",
  dateTime: "",
};

export default Message;
