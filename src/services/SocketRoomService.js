import io from 'socket.io-client'

const serverUrl = process.env.NODE_ENV !== 'development'?
'' : '//localhost:3003';

var socket = io(serverUrl);

const msgs = [];

var nickName = 'Check123';

function init(topic, user){
	socket.emit('roomRequested', {user, topic});

	socket.on('userConnected', user => {
		console.log('user conncted in front', { newUser: user });
	});

	socket.on('msg-recived', msg => {
		console.log('Got new msg', msg);
		msgs.push(msg);
	});
}

function send(msg){
    console.log('We Got new msgggggg', msg);
    socket.emit('post-msg', msg);
    // msgs.push(msg);
}

function emit(eventName, data){
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}
const getMsgs = () => {
    return msgs;
}

function createEmptyMsg(txt = '') {
    return { txt, from: nickName };
}


export default {
	msgs,
	init,
	send,
	on,
    emit,
    getMsgs,
    createEmptyMsg
};
