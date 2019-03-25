import axios from 'axios'
const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/review'
    : '//localhost:3003/review'

const resolveData = res => res.data;

var reviews = require('../../data/reviews_db.json');

export default {
    query,
    getById,
    remove,
    add,
    update,
    addLike,
    addDislike
}

function query(directAndId) {
    var direct = directAndId.direct;
    var id = directAndId.id;
    return axios.get(`${BASE_URL}/${direct}/${id}`)
        .then(resolveData)
        .catch(() => [])
}

function add(newReview) {
    // newReview.reviewId = _makeId();
    newReview.rate = {
        countLike: [],
        countDislike: []
    };
    // reviews.unshift(newReview);
    var copy = JSON.parse(JSON.stringify(newReview))
    console.log('newReview',copy)
    // return Promise.resolve(newReview)
    return axios.post(BASE_URL, copy)
            .then(resolveData)
            .catch(()=>{
                return {_id:'asafasf',namee:'asfsaf'}
                // TODO: roll back
            })
}

function query2(directAndId) {
    if (directAndId.direct === 'movie') {
        var reviewsToSend = reviews.filter(review => {
            return (review.movie.movieId === directAndId.id)
        })
        return Promise.resolve(reviewsToSend);
    }

    if (directAndId.direct === 'user') {
        var reviewsToSend = reviews.filter(review => {
            return (review.user.userId === directAndId.id)
        })
        return Promise.resolve(reviewsToSend);
    }
}

function add2(newReview) {
    newReview.reviewId = _makeId();
    newReview.rate = {
        countLike: [],
        countDislike: []
    };
    reviews.unshift(newReview);
    var ff = JSON.parse(JSON.stringify(newReview))
    console.log('newReview',ff)
    return Promise.resolve(newReview)

    // ---------------- save to server- backend ----------------------
    // return _saveReviewsToFile().then(() => newReview);
}

function update(updatedReview) {
    var reviewIdx = reviews.findIndex(review => review.reviewId === updatedReview.reviewId);
    reviews.splice(reviewIdx, 1, updatedReview)
    return Promise.resolve(updatedReview)

    // return _saveReviewsToFile().then(() => updatedReview)
}

function getById(id) {
    var review = reviews.find(review => review.reviewId === id);
    if (review) return Promise.resolve(review);
    else return Promise.reject('Unknown review');
}

function remove(reviewId) {
    var reviewIdx = reviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIdx === -1) return Promise.reject('Not Found');
    reviews.splice(reviewIdx, 1)
    return Promise.resolve('The Review Removed')
    // return _saveReviewsToFile();
}
function addLike(reviewId){
    console.log('check',reviewId)
    var review = reviews.find(review => review._id === reviewId);
    review.rate.countLike.push('userID')
    return _saveReviewsToFile().then(() => reviewId)
}
function addDislike(reviewId){
    var review = reviews.find(review => review._id === reviewId);
    review.rate.countDislike.push('userId')
    return _saveReviewsToFile().then(() => reviewId)
    return Promise.resolve(review)
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getEmpty() {
    return {
        review: {
            reviewId: null,
            name: 'New Review',
            price: 0,
            type: '',
            createAt: '',
            inStock: false
        }
    }
}