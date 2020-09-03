import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import UserList from "./UsersList";
import Message from "./Message";
import AuthUtils from "../../utils/AuthUtils";
import Template from "../Template";
import SocketChat from "./../../services/SocketChat";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 120px)",
    background: "#eceff1",
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    borderRadius: 4,
  },
  leftBox: {
    width: "100%",
    height: "100%",
    background: "#fafafa",
    borderRadius: 4,
  },
  messageArea: {
    position: "relative",
    padding: "12px 30px 12px 12px",
    maxHeight: "150px",
    width: "100%",
    background: "rgb(249, 249, 249)",
    border: "none",
    margin: 0,
    resize: "none",
    "&::-webkit-scrollbar": {
      opacity: 0,
      background: "transparent",
    },
    "&::-webkit-scrollbar:hover": {
      opacity: 1,
    },
    "&:focus": {
      outlineColor: theme.palette.primary.main,
    },
  },
  sendButton: {
    top: "-40px",
    height: "fit-content",
    padding: "6px",
    float: "right",
  },
  messageContainer: {
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    maxHeight: "calc(100vh - 340px)",
    marginBottom: theme.spacing(1),
  },
}));

function Chat() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    SocketChat.initialize();

    const goToLogin = () => {
      AuthUtils.clearToken();
      history.push("/login");
    };

    if (!AuthUtils.getToken()) {
      goToLogin();
    } else {
      SocketChat.getSocket()
        .on("connect", () => {
          SocketChat.getSocket().emit("new_user_access");
        })
        .on("error", (data) => {
          if ("UnauthorizedError" === data.type) {
            enqueueSnackbar("Your credentials are invalid!", {
              variant: "error",
            });
            goToLogin();
          }
        })
        .on("disconnected", ({ users }) => {
          setUsers(users);
        })
        .on("user_came_in", ({ incomingUser, users, messages, error }) => {
          if (!error) {
            setUsers(users);
            setMessages(messages);
            scrollToLastMessages();
          }
        })
        .on("new_messages", ({ messages }) => {
          setMessages(messages);
          scrollToLastMessages();
        })
        .on("someone_typing_message", ({ users }) => {
          setUsers(users);
        });
    }

    return () => {
      SocketChat.getSocket().disconnect();
    };
  }, [history]);

  const sendMessage = () => {
    if (message) {
      SocketChat.getSocket().emit("send_message", message);
      setMessage("");
    }
  };

  const handleMessage = (message) => {
    setMessage(message);
    //SocketChat.getSocket().emit("typing_message", message);
  };

  const scrollToLastMessages = () => {
    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const anotherUsers = users.filter((u) => u.id !== AuthUtils.getUser().id);

  return (
    <Template>
      <Container>
        <Grid
          className={classes.container}
          container
          direction="row"
          justify="center"
          spacing={3}
        >
          <Grid item xs={3} className={classes.leftBox}>
            <UserList users={anotherUsers} />
          </Grid>
          <Grid item xs={9}>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              width="100%"
              height="100%"
            >
              <Box
                id="messages"
                className={classes.messageContainer}
                display="flex"
                flexDirection="column"
                p={2}
              >
                {messages.map((m, index) => (
                  <Message
                    key={index}
                    from={m.from}
                    text={m.text}
                    dateTime={m.dateTime}
                  />
                ))}
              </Box>
              <Box pt={1}>
                {anotherUsers
                  .filter(({ typing }) => typing)
                  .map(({ name }) => (
                    <Typography align="center" color="textSecondary">
                      {name} is typing...
                    </Typography>
                  ))}
              </Box>
              <Box width="100%" height="135px" alignSelf="flex-end">
                <Box>
                  <TextareaAutosize
                    className={classes.messageArea}
                    rowsMax={8}
                    rowsMin={8}
                    aria-label="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => handleMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </Box>
                <Box alignSelf="flex-end">
                  <IconButton
                    className={classes.sendButton}
                    aria-label="send"
                    size="small"
                    onClick={sendMessage}
                  >
                    <SendIcon size="small" color="primary" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
}

export default Chat;
