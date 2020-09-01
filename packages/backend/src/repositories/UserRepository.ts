import { nanoid } from "nanoid";

import BaseRepository from "./BaseRepository";
import { User } from "../interfaces";
import { USER_STATUS } from "../enums";

class UserRepository extends BaseRepository<User> {
  activeUsers: User[]; // simulate database

  constructor() {
    super();
    this.activeUsers = [
      {
        id: nanoid(),
        name: "Marcos Silva",
        email: "marcos@gmail.com",
        status: USER_STATUS.OFF,
        typing: false,
        password: "123",
      },
      {
        id: nanoid(),
        name: "Ana Marcela",
        email: "anamah@gmail.com",
        status: USER_STATUS.OFF,
        typing: false,
        password: "123",
      },
    ];
  }

  create(param: Partial<User>) {
    const user = {
      id: param.id || nanoid(),
      typing: param.typing || false,
      email: param.email || "",
      status: param.status || USER_STATUS.OFF,
      name: param.name || "",
      password: param.password || "",
    };

    this.activeUsers.push(user);
    return Promise.resolve(user);
  }

  async update(id: string, user: Partial<User>) {
    try {
      let u = await this.findOne(id);
      if (user) {
        u = { ...u, ...user };
        const userIndex = this.activeUsers.findIndex((u) => u.id === id);
        this.activeUsers.splice(userIndex, 1, u);
        return Promise.resolve(u);
      }
    } catch (e) {}
    return Promise.reject();
  }

  all() {
    return Promise.resolve(this.activeUsers);
  }

  findOne(id: string) {
    const user = this.activeUsers.find((u) => u.id === id);
    if (user) return Promise.resolve(user);
    return Promise.reject();
  }

  findOneByEmail(email: string) {
    const user = this.activeUsers.find((u) => u.email === email);
    if (user) return Promise.resolve(user);
    return Promise.reject();
  }

  delete(id: string) {
    if (!id) return Promise.reject(false);
    this.activeUsers = this.activeUsers.filter((u) => u.id !== id);
    return Promise.resolve(true);
  }
}

export default new UserRepository();
