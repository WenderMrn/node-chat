export enum EVENTS {
  AUTHENTICATE = "authenticate",
  AUTHENTICATED = "authenticated",
  CONNECTION = "connection",
  CONNECTED = "connected",
  USER_WAS_REGISTERED = "user_was_registered",
  REGISTER_NEW_USER = "register_new_user",
  SOMEONE_REGISTERED = "someone_registered",
  DISCONNECT = "disconnect",
  DISCONNECTED = "disconnected",
  SEND_MESSAGE = "send_message",
  NEW_MESSAGES = "new_messages",
  TYPING_MESSAGE = "typing_message",
  SOMEONE_TYPING_MESSAGE = "someone_typing_message",
  NEW_USER_ACCESS = "new_user_access",
  USER_CAME_IN = "user_came_in",
}

export enum USER_STATUS {
  ON = "on",
  OFF = "off",
}
