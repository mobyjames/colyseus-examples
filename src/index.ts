import express from 'express';
import http from 'http';
import { Server } from "colyseus";
import serveIndex from 'serve-index';
import path from 'path';

import { LobbyRoom, RelayRoom } from 'colyseus';
import { ChatRoom } from "./rooms/01-chat-room";
import { StateHandlerRoom } from "./rooms/02-state-handler";
import { AuthRoom } from "./rooms/03-auth";
import { ReconnectionRoom } from './rooms/04-reconnection';
import { CustomLobbyRoom } from './rooms/07-custom-lobby-room';

const app = express();
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))
app.use('/', express.static(path.join(__dirname, "static")));

const server = http.createServer(app);
const gameServer = new Server({ server });


gameServer.define("lobby", LobbyRoom);

gameServer.define("relay", RelayRoom, { maxClients: 4 })
    .enableRealtimeListing();

gameServer.define("chat", ChatRoom)
    .enableRealtimeListing();

gameServer.define("chat_with_options", ChatRoom, {
    custom_options: "you can use me on Room#onCreate"
});

gameServer.define("state_handler", StateHandlerRoom)
    .enableRealtimeListing();

gameServer.define("auth", AuthRoom)
    .enableRealtimeListing();

gameServer.define("reconnection", ReconnectionRoom)
    .enableRealtimeListing();

gameServer.define("custom_lobby", CustomLobbyRoom);

gameServer.listen(2567);