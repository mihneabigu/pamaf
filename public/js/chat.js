//Establish the connection to the server to create the websocket between the 2 (client and server)

//Make connection - because we loaded in the library in the html, we have access to the 'io' variable
var socket = io.connect("localhost:4000"); //argument = where we want to make this websocket connection to




//var message = document.getElementById("message");
//var handle = document.getElementById("handle");
//var btn = document.getElementById("send");
//var output = document.getElementById("output");
//
////Emit event
//btn.addEventListener("click", function() {
//    //emit a message down the websocket to the server
//    socket.emit("chat", {
//        message: message.value,
//        handle: handle.value
//    });
//    //message.value = "";
//});
//
//
//
//
////Listen for events
//socket.on("chat", function(data) {
//    //feedback.innerHTML = "";
//    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
//});