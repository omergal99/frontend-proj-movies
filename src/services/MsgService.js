// import moment from 'moment';

import io from 'socket.io-client'

const serverUrl = process.env.NODE_ENV !== 'development'?
'' : '//localhost:3003';

var socket = io(serverUrl);
const msgs = [];
var nickName = lorem();

connectSocket();
function connectSocket() {
    console.log('sending socket!')
    
    socket.on('chat historyMsgs', function (historyMsgs) {
        msgs.push(...historyMsgs)
    });
    
    socket.on('chat newUser',nickName=>{
        console.log('New User JOINEDDDDDD', nickName);
        var magGetIn = {
            from: nickName,
            processed: false,
            txt: `$$$ Goin The Chat $$$`
        }
        msgs.push(magGetIn)
    });

    socket.on('user disconnected', function (nickName) {
        console.log('USER go home:',nickName)
        var magGoOut = {
            from: nickName,
            processed: false,
            txt: `*** Left The Chat ***`
        }
        msgs.push(magGoOut)
        console.log(msgs)
    });

    socket.on('chat newMsg', function (msg) {
        // JIF
        if (nickName === msg.from) msgs[msgs.length - 1].processed = true;
        else msgs.push(msg);
    });
}

const getMsgs = () => {
    return msgs;
}

const send = (msg) => {
    // msgs.push(msg);
    socket.emit('chat msgToSend', msg);
}

function createEmptyMsg(txt = '') {
    return { txt, processed: false, from: nickName };
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    console.log(data)
    socket.emit(eventName, data)
}

export default {
    getMsgs,
    send,
    nickName,
    createEmptyMsg,
    on,
    emit
}



function lorem(size = 6) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
