import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ForumIcon from "@material-ui/icons/Forum";

import { SERVER_URL } from "../../constants";
import AuthUtils from "../../utils/AuthUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [params, setParams] = useState({ email: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (AuthUtils.getToken()) {
      history.replace("/");
    }
  }, [history]);

  const handleParams = (name, value) => {
    setParams({ ...params, [name]: value });
  };

  const gotToSingUp = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  const SingIn = (e) => {
    // loading
    e.preventDefault();

    if (!params.email || !params.password) return;

    axios
      .post(`${SERVER_URL}/login`, params)
      .then((response) => {
        const { token } = response.data;
        AuthUtils.setToken(token);
        history.replace("/");
      })
      .catch(() => {
        enqueueSnackbar("Incorrect username or password", { variant: "error" });
      })
      .finally(() => {
        // close loading
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ForumIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={SingIn}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Login"
              name="email"
              autoComplete="off"
              autoFocus
              defaultValue={params.name}
              onBlur={(e) => handleParams(e.target.name, e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              defaultValue={params.password}
              onBlur={(e) => handleParams(e.target.name, e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={gotToSingUp}>
                  A Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
