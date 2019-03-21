const fs = require('fs');

var users = require('../../data/users_db.json');

export default {
    getUsers,
    add,
    isNameAndPassOk,
    isNameExist,
    // getUserById,
    remove,
    getById
}

function getUsers(userId) {
    var prm = getUserById(userId)
        .then((findedUser) => {
            if (findedUser.isAdmin) {
                return Promise.resolve(users);
            } else {
                return Promise.reject('User have not permission');
            }
        })
        .catch((err) => {
            return Promise.reject('Error in find by id - ', err);
        })
    return prm;
}

function getById(id) {
    var user = users.find(user => user.userId === id);
    if (user) return Promise.resolve(user);
    else return Promise.reject('Unknown User');
}

function remove(userId) {
    var userIdx = users.findIndex(user => user._id === userId);
    if (userIdx === -1) return Promise.reject('Not Found');
    users.splice(userIdx, 1)
    return _saveUsersToFile();
}

function add(user) {
    user._id = _makeId();
    user.isAdmin = false;
    users.push(user);
    return _saveUsersToFile().then(() => user);
}

function isNameAndPassOk(name, pass) {
    var user = users.find(user => {
        return (user.name.toLowerCase() === name.toLowerCase() && user.pass === pass)
    });
    if (user) {
        var userToReturn = {
            ...user
        };
        delete userToReturn.pass;
        delete userToReturn.isAdmin;
        return Promise.resolve(userToReturn);
    } else {
        return Promise.reject('Unknown User');
    }
}

function isNameExist(name) {
    var user = users.find(user => {
        return (user.name.toLowerCase() === name.toLowerCase())
    });
    if (user) {
        return Promise.resolve('There is user with this name!');
    } else {
        return Promise.reject('No user with this name');
    }
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        var strUsers = JSON.stringify(users)
        fs.writeFile("data/users_db.json", strUsers, (err) => {
            if (err) {
                console.error('Had problem writing to Users file', err);
                reject(err);
            } else resolve();
        });
    })
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}