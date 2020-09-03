import BaseRepository from "./BaseRepository";
import { Message } from "../interfaces";

class MessageRepository extends BaseRepository<Message> {
  messages: Message[]; // simulate a database

  constructor() {
    super();
    this.messages = [];
  }

  create(message: Message) {
    this.messages.push(message);
    return Promise.resolve(message);
  }

  all() {
    return Promise.resolve(this.messages);
  }
}

export default new MessageRepository();
