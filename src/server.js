const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const data = "data";

client.send(data, 0, data.length, 41234, "localhost", function (err, bytes) {
    if (err) 
        throw err;

    client.close();
});