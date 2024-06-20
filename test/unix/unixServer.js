import ipc from '../../node-ipc.js';
import process from 'process';
import fs from 'fs';

const dieAfter=30e3;

function killServerProcess(){
    process.exit(0);
}

setTimeout(
    killServerProcess,
    dieAfter
);

ipc.config.id = 'unixServer';
ipc.config.retry= 1500;
ipc.config.silent=false;
if (fs.existsSync('/data/data/com.termux')) {
    ipc.config.socketRoot = '/data/data/com.termux/files/tmp/';
    if (!fs.existsSync(ipc.config.socketRoot)) {
        fs.mkdirSync(ipc.config.socketRoot, { recursive: true });
    }
}

ipc.serve(
    function serverStarted(){
        ipc.server.on(
            'message',
            function gotMessage(data,socket){
                ipc.server.emit(
                    socket,
                    'message',
                    {
                        id      : ipc.config.id,
                        message : 'I am unix server!'
                    }
                );
            }
        );
    }
);

ipc.server.on(
    'END',
    killServerProcess
);

ipc.server.start();
