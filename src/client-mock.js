const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const data = "New Connection";

client.on('message', (msg) => {
    console.log(JSON.parse(msg));

    // TODO
    // RESPONDER PERGUNTAS
    
    client.close();
});

client.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    client.close();
});

client.send(data, 0, data.length, 41234, "localhost", function (err) {
    if (err) 
        throw err;
});