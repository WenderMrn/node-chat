import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import AuthController from "./controllers/AuthController";
import ChatSocket from "./ChatSocket";

const port = process.env.PORT || 4001;

const app = express();
const server = new http.Server(app);

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// registro de novo usuário
app.post("/signup", AuthController.signUp);

// login de um usuário
app.post("/login", AuthController.login);

ChatSocket(server);
