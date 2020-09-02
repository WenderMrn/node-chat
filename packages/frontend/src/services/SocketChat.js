import SocketIoClient from "socket.io-client";
import AuthUtils from "../utils/AuthUtils";

class SocketChat {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.socket = SocketIoClient("http://localhost:4001", {
      query: `token=${AuthUtils.getToken()}`,
    });
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketChat();
