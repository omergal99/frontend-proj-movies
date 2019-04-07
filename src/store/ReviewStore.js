import ReviewService from '../services/ReviewService'

const reviewsModule = {
    strict: true,
    namespaced: true,
    state: {
        currReviews: [],
        fourReviews: [],
        fourReviewsUser: [],
    },

    mutations: {
        setReviews(state, payload) {
            state.currReviews = payload.serverReviews;
        },
        addReview(state, { addedReview }) {
            state.currReviews.unshift(addedReview)
        },
        updateReview(state, { savedReview }) {
            const idx = state.currReviews.findIndex(currReview => currReview.reviewId === savedReview.reviewId);
            state.currReviews.splice(idx, 1, savedReview)
        },
        updateReviewRate(state, { rateDetails }) {
            var reviewIdx = state.currReviews.findIndex(currReview => {
                return currReview._id === rateDetails.reviewId
            })
            if (rateDetails.rateDitection === "like") {
                state.currReviews[reviewIdx].rate.countLike.push(rateDetails.userId)
            } else {
                state.currReviews[reviewIdx].rate.countDislike.push(rateDetails.userId)
            }
        },
        removeReview(state, { reviewId }) {
            const idx = state.currReviews.findIndex(review => {
                return review._id === reviewId
            });
            state.currReviews.splice(idx, 1);
        },
        fourReviewsAdd(state, { reviews }) {
            reviews.sort((r1, r2) => {
                return r2.rate.countLike.length - r1.rate.countLike.length
            })
            state.fourReviews.push(reviews.slice(0,2))
        },
        fourReviewsUserAdd(state, { reviews }) {
            reviews.sort((r1, r2) => {
                return r2.rate.countLike.length - r1.rate.countLike.length
            })
            // state.fourReviewsUser.push(reviews.slice(0,2))
            state.fourReviewsUser.push(reviews)
        },
    },

    getters: {
        reviews(state) {
            return state.currReviews.sort((r1, r2) => {
                return r2.rate.countLike.length - r1.rate.countLike.length
            })
        },
        numOfReviews(state) {
            return state.currReviews.length
        },
        numOfLikes(state) {
            return state.currReviews.reduce((acc, rev) => acc + rev.rate.countLike.length, 0)
        },
        numOfDislikes(state) {
            return state.currReviews.reduce((acc, rev) => acc + rev.rate.countDislike.length, 0)
        },
        // fourReviews(state){
        //     if(state.fourReviews){
        //         return state.fourReviews.forEach(reviewsOfOneMovie=>{
        //             reviewsOfOneMovie.sort((r1, r2) => {
        //                 return r2.rate.countLike.length - r1.rate.countLike.length
        //             })
        //         })
        //     }
        // }
    },
    actions: {
        loadReviews(context, { directAndId }) {
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                    context.commit({ type: 'setReviews', serverReviews })
                })
        },

        loadFourReviews(context, { id }) {
            var directAndId = { direct: "movie", id }
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                    context.commit({ type: 'fourReviewsAdd', reviews: serverReviews })
                })
        },
        loadFourReviewsUser(context, { id }) {
            var directAndId = { direct: "user", id }
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                    context.commit({ type: 'fourReviewsUserAdd', reviews: serverReviews })
                })
        },

        updateRate(context, { rateDetails }) {
            return ReviewService.updateRate(rateDetails)
                .then(() => {
                    context.commit({ type: 'updateReviewRate', rateDetails })
                })
        },

        addReview(context, { newReview }) {
            return ReviewService.add(newReview)
                .then((addedReview) => {
                    context.commit({ type: 'addReview', addedReview })
                })
        },
        // addReview(context, { newReview }) {
        //     context.commit({ type: 'addReview', addedReview })
        //     ReviewService.add(newReview)
        //     .then((addedReview) => {
        //         console.log('okkkk',addedReview);
        //     })
        //     .catch((err)=>{
        //         console.log('problem',err);
        //         context.commit({ type: 'deleteRecent', addedReview })
        //     })
        //     return newReview;
        // },

        updateReviewTxt(context, { reviewToEdit }) {
            return ReviewService.update(reviewToEdit)
                .then((savedReview) => {
                    context.commit({ type: ' updateReview', savedReview })
                })
        },

        removeReview(context, { reviewId }) {
            return ReviewService.remove(reviewId)
                .then(() => {
                    context.commit({ type: 'removeReview', reviewId })
                })
        }

    }
}

export default reviewsModule;