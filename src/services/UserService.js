import axios from 'axios';


const USER_API = (process.env.NODE_ENV !== 'development') ?
'/user' :
'//localhost:3003/user';

const resolveData = res => res.data;

export default {
    getUsers,
    add,
    // isNameAndPassOk,
    isNameNotInUse,
    remove,
    getGuestUser,
    getById,
    login,
    addFollowUser
}

var users = require('../../data/users_db.json');

function getUsers(userId) {
    var prm = getById(userId)
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

function getById(userId) {
    return axios.get(`${USER_API}/${userId}`)
        .then(resolveData)
}

function getGuestUser() {
    return {
        name: 'Guest',
        email: '',
        userId: '',
        userImg: '',
        dateCreated: 0,
        rating: 0,
        follow: {
            followedBy: [],
            followAfter: []
        }
    }
}

function remove(userId) {
    var userIdx = users.findIndex(user => user.userId === userId);
    if (userIdx === -1) return Promise.reject('Not Found');
    users.splice(userIdx, 1)
    return _saveUsersToFile();
}

function add(newUser) {
    var fullNewUser = getGuestUser();
    fullNewUser.name = newUser.name;
    fullNewUser.password = newUser.pass;
    // fullNewUser.userId = _makeId();
    fullNewUser.isAdmin = false;
    users.push(fullNewUser);
    return Promise.resolve(fullNewUser);

    // return _saveUsersToFile().then(() => user);
}
function login(userNamePass) {
    var prmAnsRes = axios.put(`${USER_API}/login`, userNamePass)
    prmAnsRes.catch(err => {
        console.log('Service Cought an Error - ', err);
    })
    prmAnsRes.finally(() => {
        console.log('Done handling res');
    })

    var prmAns = prmAnsRes.then(res => {
        console.log('Result- Data:', res.data);
        return res.data;
    })

    console.log('Done Sending the AJAX Request');
    return prmAns;
}

// function isNameAndPassOk(user) {
//     var name = user.name;
//     var pass = user.pass;
//     var user = users.find(user => {
//         return (user.name.toLowerCase() === name.toLowerCase() && user.password === pass)
//     });
//     if (user) {
//         var userToReturn = {
//             ...user
//         };
//         delete userToReturn.password;
//         delete userToReturn.isAdmin;
//         return Promise.resolve(userToReturn);
//     } else {
//         return Promise.resolve('Unknown User');
//     }
// }

function isNameNotInUse(name) {
    var user = users.find(user => {
        return (user.name.toLowerCase() === name.toLowerCase())
    });
    if (!user) {
        return Promise.resolve('No user with this name');
    } else {
        return Promise.reject('There is user with this name!');
    }
}

// function _saveUsersToFile() {
//     return new Promise((resolve, reject) => {
//         var strUsers = JSON.stringify(users)
//         fs.writeFile('data/users_db.json', strUsers, (err) => {
//             if (err) {
//                 console.error('Had problem writing to Users file', err);
//                 reject(err);
//             } else resolve();
//         });
//     })
// }

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function addFollowUser(users){
    const userId = users.followedUser
    return axios.put(`${USER_API}/details/${userId}`, users)

}

