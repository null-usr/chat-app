import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import cors from 'cors';

import * as dotenv from 'dotenv';

//configure environment variables
dotenv.config();

const app: express.Application = express();
app.use(cors());
app.use(express.json());

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'client')));

//to serve up our angular app when requested by user
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

const httpServer = createServer(app);
//https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked
const options = {
    cors: {
        origin: '*',
    },
};

//socket functions
const io = new Server(httpServer, options);
io.on('connection', (socket: Socket) => {
    console.log(socket.id);

    //joining and leaveng rooms
    //https://stackoverflow.com/questions/34909323/socket-io-how-to-correctly-join-and-leave-rooms/45546567
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('User Joined Room: ' + data);
        socket.to(data).emit('User joined room', socket.id);
    });
    socket.on('leave_room', (data) => {
        socket.leave(data);
        socket.to(data).emit('User left', socket.id);
    });

    socket.on('send_message', (data) => {
        console.log(`Sending ${data}`);
        //send data to a room specifically
        socket.to(data.room).emit('rcv_message', data.content);
    });

    //get the list of valid rooms
    //https://simplernerd.com/js-socketio-active-rooms/
    socket.on('query_rooms', () => {
        // Convert map into 2D list:
        const arr: [string, Set<string>][] = Array.from(
            io.sockets.adapter.rooms
        );

        console.log(`unfiltered array: ${arr}`);

        const filtered = arr.filter((room) => {
            return !room[1].has(room[0]);
        });

        console.log(`post-filtered array: ${filtered}`);

        const res = filtered.map((i) => i[0]);

        console.log(`Server list: ${res}`);
        socket.emit('update_rooms', res);
    });

    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED');
    });
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
    console.log(`starting app on: ${port}`);
});

// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server

export default app;
