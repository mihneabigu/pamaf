var express = require("express"); //looks into node_modules folder for express and require it in this file so we can use it
var socket = require("socket.io");

const port = process.env.PORT || 4000;

//App setup
var app = express();
var server = app.listen(port, "192.168.1.214",function () {
    console.log(`Listening to requests on port ${port}`);
});

//Static files
app.use(express.static("./.."));
//app.use(express.static("./../html")); //daca csss-ul in html trebuie asata linia ca altfel nul vedea nush cum de nu


var io = socket(server); //takes a parameter, which is the server that we created and wanna work with - socket.io sits around on the server now, waiting for a client/browser to make a connection and set up a websocket between the 2 -> so we can listen out for when that connection is made

//listen out for an event called 'connection' - when the connection is detected, it's firing the callback function
//io.on('connection', function(socket) {
//    console.log("Made socket connection", socket.id);
//    
//    //listen for the message that's been sent from the client
//    socket.on("chat", function(data) {
//        io.sockets.emit("chat", data); //refers to all of the sockets connected to the server
//    });
//
//});


var createdRooms = [];
var clients = [];

io.on('connection', function (socket) {
    console.log("Made socket connection", socket.id);
    clients.push({
        socket: socket,
        id: socket.id
    })

    //listen for the message that's been sent from the client
    socket.on("createRoom", function (data) {
        //io.sockets.emit("chat", data); //refers to all of the sockets connected to the server
        console.log(data)
        createdRooms.push(data)
    });

    socket.on("joinRoom", function (data) {
        console.log(createdRooms);
        for (let i = 0; i < createdRooms.length; i++) {
            console.log("SUNT IN FOR");
            if (createdRooms[i].key == data.key) {
                console.log(createdRooms[i]);
                socket.emit("joinRoom", createdRooms[i]);
                //io.sockets.emit("joining", data);
                clients.forEach(function (client) {
                    if (client.id == createdRooms[i].id) {
                        client.socket.emit("joining", data);
                    }
                });
            }
        }

    });

    socket.on("startGame", function (data) {
        clients.forEach(function (client) {
            if (client.id == data.id) {
                client.socket.emit("startGame", {
                    x: data.x,
                    y: data.y
                });
            }
        })
    });

    socket.on("multi", function (data) {
        clients.forEach(function (client) {
            if (client.id == data.id) {
                client.socket.emit("multi", {
                    dotsArray: data.dots,
                    x: data.x,
                    y: data.y
                });
            }
        })
    });
    
    socket.on("dots", function (data) {
        //console.log(data);
        clients.forEach(function (client) {
            if (client.id == data.id) {
                client.socket.emit("dots", {
                    dotsArray: data.dotsArray
                });
            }
        })
    });
    
    socket.on("notImmune", function (data) {
        console.log(data);
        clients.forEach(function (client) {
            if (client.id == data.id) {
                client.socket.emit("notImmune", {
                    immune: data.immune
                });
            }
        })
    });

});
