# Node-chat

NodeChat is a simple Node + React application. 


#### Example

![chat dialog](https://github.com/WenderMrn/node-chat/blob/master/packages/frontend/src/assets/images/chat-dialog.gif)

## Backend

 - Node - v12.16.1
 - Typescript - 4.0.2
 - socket.io - 2.1.11
 - socketio-jwt - 4.6.2
 - jsonwebtoken - 8.5.1
 
 ### Api resources
 
 - host: [http://localhost:4001](http://localhost:4001)
 
 |  Method   |  Resource  |  Payload                                              | Response           |
 |-----------|------------|-------------------------------------------------------|--------------------|
 |   POST    |  /login    |   {email: string, password: string}                   |  {token: string}   |
 |   POST    | /signup    |   { name: string, email: string, password: string}    |  {token: string}   |          
 

## Frontend


## Usage

clone node-chat project:

```
git clone https://github.com/WenderMrn/node-chat.git
```

 After dowload project, inside root folder project, execute:
 
 ```
npm i && lerna bootstrap && lerna start
```

The last command will start our backend **Node** on [http://locahost:4001](http://locahost:4001) and **React** aplication on [http://localhost:3000](http://localhost:4001). You can navegate to **/packages/frontend** and start React application from there and navegate to **/packages/backend** and start backend form there too. 



