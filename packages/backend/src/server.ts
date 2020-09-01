import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import UserRepository from "./repositories/UserRepository";
import AuthController from "./controllers/AuthController";
import ChatSocket from "./sockets/ChatSocket";

const port = process.env.PORT || 4001;

const app = express();
const server = new http.Server(app);

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// registro de novo usuário
app.post("/signup", async (req, res) => {
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
});

// login de um usuário
app.post("/login", async (req, res) => {
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
});

ChatSocket(server);
