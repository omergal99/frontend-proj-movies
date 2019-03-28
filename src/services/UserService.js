import HttpService from './HttpService';

const USER_URL = HttpService.getUrl('user');

const resolveData = res => res.data;

export default {
    getUsers,
    add,
    isNameNotInUse,
    remove,
    getGuestUser,
    getById,
    login,
    addFollowUser,
}

// var users = require('../../data/users_db.json');

var loggedInUser = JSON.parse(localStorage.getItem(USER_ON))

function getLoggedInUser() {
    return loggedInUser;
}

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
    //console.log('i am heer')
    return HttpService.get(`${USER_URL}/${userId}`)
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
        ();
}

// function signup(user) {
//     return HttpService.put(`${BASE_URL}/signup`, user).then(resolveData)
// }


function add(newUser) {
    console.log('signup', newUser)
    return new Promise((resolve, reject) => {
        HttpService.post(`${USER_URL}/singup`, newUser)
            //.then(res => console.log ("natalia registratin", res.data))
            .then(res => {
                let newUser = res.data
                //console.log('updated relllllllw:', newUser)
                resolve(newUser)
            })
            .catch(err => err)
    })
}
//   .catch(()=>{
//             return {_id:'asafasf',namee:'asfsaf'}
//             // TODO: roll back
//         })
// var fullNewUser = getGuestUser();
// fullNewUser.name = newUser.name;
// fullNewUser.password = newUser.pass;
// // fullNewUser.userId = _makeId();
// fullNewUser.isAdmin = false;
// users.push(fullNewUser);
// return Promise.resolve(fullNewUser);

// return _saveUsersToFile().then(() => user);

function login(userNamePass) {
    var prmAnsRes = HttpService.put(`${USER_URL}/login`, userNamePass)
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

function addFollowUser(users) {
    const userId = users.followedUser
    return HttpService.put(`${USER_URL}/details/${userId}`, users)

}

