import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import ElevationScroll from "../components/ElevationScroll";
import AppBar from "../components/AppBar";
import AuthUtils from "../utils/AuthUtils";

function Template({ children }) {
  const history = useHistory();
  const user = AuthUtils.getUser();

  useEffect(() => {
    if (!AuthUtils.getToken()) {
      history.push("/login");
    }
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <ElevationScroll>
        <AppBar onLogout={logout} user={user} />
      </ElevationScroll>
      {children}
    </>
  );
}

export default Template;
