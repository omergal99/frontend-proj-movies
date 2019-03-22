const fs = require('fs');

var reviews = require('../../data/reviews_db.json');

export default {
    query,
    getById,
    remove,
    add,
    update
}

function query(directAndId) {
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

function add(newReview) {
    newReview.reviewId = _makeId();
    newReview.rate = {
        countLike: [],
        countDislike: []
    };
    reviews.unshift(newReview);
    return Promise.resolve(newReview)

    // ---------------- save to server- backend ----------------------
    // return _saveReviewsToFile().then(() => newReview);
}

function update(updatReview) {
    var reviewIdx = reviews.findIndex(review => review.reviewId === updatReview.reviewId);
    reviews.splice(reviewIdx, 1, updatReview)
    return _saveReviewsToFile().then(() => updatReview)
    // return Promise.resolve(review)
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
    return _saveReviewsToFile();
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveReviewsToFile() {
    return new Promise((resolve, reject) => {
        var strReviews = JSON.stringify(reviews)
        fs.writeFile('data/reviews_db.json', strReviews, (err) => {
            if (err) {
                console.error('Had problem writing to reviews file', err);
                reject(err);
            } else resolve();
        });
    })
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