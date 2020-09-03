import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ForumIcon from "@material-ui/icons/Forum";
import { makeStyles } from "@material-ui/core/styles";
import { SERVER_URL } from "../../constants";
import AuthUtils from "../../utils/AuthUtils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [params, setParams] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (AuthUtils.getToken()) {
      history.push("/");
    }
  }, [history]);

  const handleParams = (name, value) => {
    setParams({ ...params, [name]: value });
  };

  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const signUp = (e) => {
    // loading
    e.preventDefault();

    if (!params.email || !params.password || !params.name) return;

    axios
      .post(`${SERVER_URL}/signup`, params)
      .then((response) => {
        const { token } = response.data;
        AuthUtils.setToken(token);
        history.push("/");
      })
      .catch(() => {
        enqueueSnackbar("Error", { variant: "error" });
      })
      .finally(() => {
        // close loading
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ForumIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={signUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
                defaultValue={params.name}
                onBlur={(e) => handleParams(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                defaultValue={params.email}
                onBlur={(e) => handleParams(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue={params.password}
                onBlur={(e) => handleParams(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={goToLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
