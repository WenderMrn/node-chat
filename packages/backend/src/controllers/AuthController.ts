import * as jwt from "jsonwebtoken";

import { User } from "../interfaces";
import { SECRET } from "../constants";

class AuthController {
  static generateToken(user: Pick<User, "email" | "id" | "name">) {
    return jwt.sign(user, SECRET, { expiresIn: "1h" });
  }
}

export default AuthController;
