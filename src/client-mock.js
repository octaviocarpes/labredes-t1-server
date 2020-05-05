const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const data = "New Connection";

client.on('message', (msg, rinfo) => {
    console.log(JSON.parse(msg));

    // TODO
    // RESPONDER PERGUNTAS

    respostas = { teste: 'ok' }

    responde({ respostas, rinfo });
});

client.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    client.close();
});

client.send(data, 0, data.length, 41234, "localhost", function (err) {
    if (err) 
        throw err;
});

function responde({ respostas, rinfo }) {
    client.send(JSON.stringify(respostas), 0, JSON.stringify(respostas).length, rinfo.port, rinfo.address, function (err, bytes) {
        if (err) 
            throw err;
        client.close();
    });
}