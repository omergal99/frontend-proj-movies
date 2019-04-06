import HttpService from './HttpService';
import socketService from '../services/SocketService'
const USER_URL = HttpService.getUrl('user');
const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwlinsb9c/image/upload'
var UPLOAD_PRESET = 'ults0zzo'
const resolveData = res => res.data;

export default {
    singup,
    getGuestUser,
    getById,
    login,
    addFollowUser,
    getLoggedInUser,
    logout,
    uploadImg,
    USER_STORAGE
}

const USER_STORAGE = 'user connected';

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem(USER_STORAGE));
}

function getById(userId) {
    //console.log('i am heer')
    return HttpService.get(`${USER_URL}/${userId}`)
        .then(resolveData)
}

function logout() {
    // alert('logging out')
    socketService.disconnect()
    return HttpService.get(`${USER_URL}/logout`)
        .then(res => {
            // console.log('Loged out success');
            // console.log('RES IS ', res);
            localStorage.removeItem(USER_STORAGE)
        })
}

function singup(newUser) {
    // console.log('signup', newUser)
    return HttpService.post(`${USER_URL}/singup`, newUser)
        .then(res => {
            localStorage.setItem(USER_STORAGE, JSON.stringify(res.data));
            let newUser = res.data
            return newUser
        })
}

function login(userNamePass) {
    // alert('logging IN')
    socketService.disconnect()
    var prmAnsRes = HttpService.put(`${USER_URL}/login`, userNamePass)
    var prmAns = prmAnsRes.then(res => {
        if (res.data) {
            // console.log('Result- Data:', res.data);
            localStorage.setItem(USER_STORAGE, JSON.stringify(res.data));
            return res.data;
        } else {
            return getGuestUser();
        }
    })

    // console.log('Done Sending the AJAX Request');
    return prmAns;
}

function addFollowUser(users) {
    const userId = users.followedUser._id
    return HttpService.put(`${USER_URL}/details/${userId}`, users)
}

function uploadImg(fileAndUser ) {
    //console.log('testing!!!')
    // var UPLOAD_PRESET = 'ults0zzo'
    var formData = new FormData();
    formData.append('file',fileAndUser.selectedImg)
    formData.append('upload_preset', UPLOAD_PRESET)
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded'}
    var axios = HttpService.getNoCredAxios()
    return axios.post(UPLOAD_URL, formData,{ headers})
     .then(res=> {
        var imgUrl=res.data.secure_url
        //console.log('imgUrl',imgUrl)
        var userAndImg={
            userId:fileAndUser.user,
            img:imgUrl
        }
        // console.log("front",userAndImg)
        return HttpService.put(`${USER_URL}/${userAndImg.userId}`, userAndImg)
    })
    .catch ((err)=>console.log(err))

}



function getGuestUser() {
    return {
        name: 'Guest',
        email: '',
        _id: '',
        userImg: '',
        dateCreated: 0,
        rating: 0,
        follow: {
            followedBy: [],
            followAfter: []
        }
    }
}