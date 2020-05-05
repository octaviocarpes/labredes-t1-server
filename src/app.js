const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.bind(41234);

const questions = {
    1: 'Pergunta 1',
    2: 'pergunta 2',
    3: 'pergunta 3'
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    // TODO
    // VERIFICAR SE JÁ ESTÁ CONECTADO

    server.send(JSON.stringify(questions), 0, JSON.stringify(questions).length, rinfo.port, rinfo.address, function (err, bytes) {
        if (err) 
            throw err;
    });

    // server.close();
});

server.on('listening', () => {
    // TESTAR
})

// Prints: server listening 0.0.0.0:41234
server.on('listening', () => {
    const local = server.address();
    console.log(`server listening ${local.address}:${local.port}`);
});