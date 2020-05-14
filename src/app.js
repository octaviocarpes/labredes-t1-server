const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const questions = require('../data/questions.json')
const answers = require('../data/answers.json')

server.bind(41234);

// Prints: server listening 0.0.0.0:41234
server.on('listening', () => {
    const local = server.address();
    console.log(`server listening ${local.address}:${local.port}`);
});

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

let ack = false;

server.on('message', (msg, rinfo) => {
    const res = `${msg}`
    
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    switch (res) {
        case 'questions': {
            send({ req: 'questions', res: questions }, rinfo);
            break;
        }

        case 'validateAnswers': {
            send({ req: 'validateAnswers', res: answers }, rinfo)
            break;
        }

        case 'ack': {
            ack = false;
            break;
        }
        
        default: 
            break;
    }
});

async function send(message, rinfo) {
    ack = true;
    const stringifiedMessage = JSON.stringify(message);

    while(ack) {
        server.send(stringifiedMessage, 0, lengthInUtf8Bytes(stringifiedMessage), rinfo.port, rinfo.address, function (err) {
            if (err) 
                throw err;
        });
        
        await sleep(2000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function lengthInUtf8Bytes(str) {
    const m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
} 