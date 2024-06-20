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

ipc.config.id = 'unixClient';
ipc.config.retry= 600;
ipc.config.silent=true;
if (fs.existsSync('/data/data/com.termux')) {
    ipc.config.socketRoot = '/data/data/com.termux/files/tmp/';
    if (!fs.existsSync(ipc.config.socketRoot)) {
        fs.mkdirSync(ipc.config.socketRoot, { recursive: true });
    }
}

ipc.connectTo(
    'testWorld',
    ipc.config.socketRoot+'app.testWorld'
);

ipc.connectTo(
    'testWorld2',
    ipc.config.socketRoot+'app.testWorld'
);
