import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: "#fff",
    },
    secondary: {
      main: orange[400],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        preventDuplicate
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/" exact>
              <Chat />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
