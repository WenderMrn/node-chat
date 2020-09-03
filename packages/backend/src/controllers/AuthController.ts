import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { User } from "../interfaces";
import { SECRET } from "../constants";
import UserRepository from "../repositories/UserRepository";

class AuthController {
  static generateToken(user: Pick<User, "email" | "id" | "name">) {
    return jwt.sign(user, SECRET, { expiresIn: "1h" });
  }

  static async signUp(req: Request, res: Response) {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ name: "NoNameOrPassword!" });
    }

    const user = await UserRepository.create({ email, password, name });

    return res.status(201).json({
      token: AuthController.generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
    }); // retornar o token JWT para o cliente
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findOneByEmail(email);

      if (user && user.password === password) {
        return res.status(200).json({
          token: AuthController.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
          }),
        }); // retornar o token JWT para o cliente
      }
      return res.status(403).json({ name: "UserOrPasswordIsWrong" });
    } catch (e) {
      console.log("error: ", e);
      return res.status(403).json({ name: "UserOrPasswordIsWrong" });
    }
  }
}

export default AuthController;
