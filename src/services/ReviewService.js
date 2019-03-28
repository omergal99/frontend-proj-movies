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

}

function query(directAndId) {
    var direct = directAndId.direct;
    var id = directAndId.id;
    return HttpService.get(`${REVIEW_URL}/${direct}/${id}`)
        .then(resolveData)
        .catch(() => [])
}

function add(newReview) {
    newReview.rate = {
        countLike: [],
        countDislike: []
    };
    var copy = JSON.parse(JSON.stringify(newReview))
    return HttpService.post(REVIEW_URL, copy)
        .then(resolveData)
        .catch(() => {
            return { _id: 'asafasf', namee: 'asfsaf' }
            // TODO: roll back
        })
}

function update(review) {
    var idAndTxt = {
        id: review._id,
        txt: review.content.txt
    }
    // console.log ('natalia update', idAndTxt)
    return new Promise((resolve, reject) => {
        HttpService.put(`${REVIEW_URL}/${review._id}`, idAndTxt)
            .then(res => {
                let updatedRev = res
                //console.log('updated review:', updatedRev)
                resolve(updatedRev)
            })
            .catch(err => err)
    })
}


function getById(id) {
    var review = reviews.find(review => review.reviewId === id);
    if (review) return Promise.resolve(review);
    else return Promise.reject('Unknown review');
}

function remove(reviewId) {
    return new Promise((resolve, reject) => {
        HttpService.delete(`${REVIEW_URL}/${reviewId}`, reviewId)
            .then((resp) => {
                console.log(resp)
                resolve()
            })
            .catch(err => err)
    })
}


function updateRate(rateDetails) {
    console.log('rateDetails', rateDetails)
    return new Promise((resolve, reject) => {
        HttpService.put(REVIEW_URL, rateDetails)
            .then(res => {
                let updatedRev = res
                console.log('updated review:', updatedRev)
                resolve(updatedRev)
            })
            .catch(err => err)
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