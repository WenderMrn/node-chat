// https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
import { Write } from "../interfaces";
import { Read } from "../interfaces";

export default abstract class BaseRepository<T> implements Write<T>, Read<T> {
  create(item: Partial<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }

  update(id: string, item: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }

  all(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}
