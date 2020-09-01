import socketIOClient from "socket.io-client";
import AuthUtils from "./utils/AuthUtils";

export default () => {
  return socketIOClient("http://localhost:4001", {
    query: `token=${AuthUtils.getToken()}`,
  });
};
