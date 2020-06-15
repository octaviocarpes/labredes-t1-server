const dgram = require("dgram");
const client = dgram.createSocket("udp4");

client.on('message', (msg, rinfo) => {
    const obj = `${msg}`
    const message = JSON.parse(obj)

    if (message.req === 'questions') {
        console.log(message)
        send('ack')
    }
});

send('file');
// send('ack-1500');

client.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    client.close();
});

async function send(message) {
    client.send(message, 0, message.length, 41234, "179.219.208.43", function (err) {
        if (err) 
            throw err;
    });
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }