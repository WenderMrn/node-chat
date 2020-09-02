import { Server } from "http";
import * as SocketIo from "socket.io";
import * as SocketioJwt from "socketio-jwt";
import * as moment from "moment";

import { EVENTS, USER_STATUS } from "../enums";
import { SocketJwt } from "../interfaces";
import UserRepository from "../repositories/UserRepository";
import MessageRepository from "../repositories/MessageRepository";
import { SECRET } from "../constants";

export default (server: Server) => {
  const io = SocketIo.listen(server);

  io.use(
    SocketioJwt.authorize({
      secret: SECRET,
      handshake: true,
      callback: 15000,
    })
  );

  io.on(EVENTS.CONNECTION, (socket: SocketJwt) => {
    const currentUser = socket.decoded_token;
    // register new user
    socket.on(EVENTS.NEW_USER_ACCESS, async () => {
      try {
        const foundUser = await UserRepository.findOneByEmail(
          currentUser.email
        );

        if (foundUser) {
          foundUser.status = USER_STATUS.ON;

          await UserRepository.update(currentUser.id, foundUser);

          const users = await UserRepository.all();
          const messages = await MessageRepository.all();

          const data = {
            incomingUser: currentUser,
            users,
            messages,
          };

          io.emit(EVENTS.USER_CAME_IN, data);
        } else {
          // error
          socket.emit(EVENTS.USER_CAME_IN, {
            error: "User not registered.",
          });
        }
      } catch (e) {
        socket.emit(EVENTS.USER_CAME_IN, {
          error: "User not registered.",
        });
      }
    });

    // disconnect
    socket.on(EVENTS.DISCONNECT, async () => {
      const user = await UserRepository.update(currentUser.id, {
        status: USER_STATUS.OFF,
      });
      const users = await UserRepository.all();

      const data = {
        outingUser: user,
        users,
      };

      socket.emit(EVENTS.DISCONNECTED, data);
      socket.broadcast.emit(EVENTS.DISCONNECTED, data);
    });

    // send message
    socket.on(EVENTS.SEND_MESSAGE, async (msg: string) => {
      const user = await UserRepository.findOne(currentUser.id);

      const message = {
        from: user,
        text: msg,
        dateTime: moment().format(),
      };

      await MessageRepository.create(message);
      const messages = await MessageRepository.all();

      io.emit(EVENTS.NEW_MESSAGES, { messages });
    });

    // typing message
    socket.on(EVENTS.TYPING_MESSAGE, async () => {
      const user = await UserRepository.findOne(currentUser.id);

      if (!user.typing) {
        user.typing = true;

        await UserRepository.update(user.id, user);
        const users = await UserRepository.all();

        io.emit(EVENTS.SOMEONE_TYPING_MESSAGE, {
          users,
        }); // emit event to all socket expect you

        setTimeout(async () => {
          user.typing = false;

          await UserRepository.update(user.id, user);
          const users = await UserRepository.all();

          io.emit(EVENTS.SOMEONE_TYPING_MESSAGE, {
            users,
          }); // emit event to all socket expect you
        }, 3500);
      }
    });
  });
};
