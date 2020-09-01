import { Socket } from "socket.io";
import { USER_STATUS } from "../enums";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  iat?: number;
  exp?: number;
  typing: boolean;
  status: USER_STATUS;
}

export interface Message {
  from: User;
  text: string;
  dateTime: string;
}

export interface EventError {
  hasError: { message: string; error: boolean };
}

export interface SocketJwt extends Socket {
  decoded_token: Pick<User, "id" | "email" | "name" | "iat">;
  encoded_token: string;
}

export interface Write<T> {
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface Read<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
  all(): Promise<T[]>;
}
