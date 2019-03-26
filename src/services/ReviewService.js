import HttpService from './HttpService';

const REVIEW_URL = HttpService.getUrl('review');

const resolveData = res => res.data;

export default {
    query,
    getById,
    remove,
    add,
    update,
    updateRate
    // addLike,
    // addDislike
}

function query(directAndId) {
    var direct = directAndId.direct;
    var id = directAndId.id;
    return HttpService.get(`${REVIEW_URL}/${direct}/${id}`)
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
    return HttpService.post(REVIEW_URL, copy)
            .then(resolveData)
            .catch(()=>{
                return {_id:'asafasf',namee:'asfsaf'}
                // TODO: roll back
            })
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

function updateRate(rateDetails){
  console.log ('rateDetails',rateDetails)
  return new Promise((resolve, reject) => {
    axios.put(REVIEW_URL , rateDetails)
        .then(res => {
            let updatedRev = res
            console.log('updated review:', updatedRev)
            resolve(updatedRev)
        })
        .catch(err => err)
})
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