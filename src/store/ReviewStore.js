import ReviewService from '../services/ReviewService'

const reviewsModule = {
    strict: true,
    namespaced: true,
    state: {
        currReviews: [],

    },
    mutations: {
        setReviews(state, payload) {
            state.currReviews = payload.serverReviews;
            // console.log('state.currReviews', state.currReviews)
        },
        addReview(state, {
            addedReview
        }) {
            state.currReviews.unshift(addedReview)
        },
        updateReview(state, {
            savedReview
        }) {
            const idx = state.currReviews.findIndex(currReview => currReview.reviewId === savedReview.reviewId);
            state.currReviews.splice(idx, 1, savedReview)
        },
        updateReviewRate(state, {
            rateDetails
        }) {
            var reviewIdx = state.currReviews.findIndex(currReview => {
                return currReview._id === rateDetails.reviewId
            })
            if (rateDetails.rateDitection === "like") {
                state.currReviews[reviewIdx].rate.countLike.push(rateDetails.userId)
            } else {
                state.currReviews[reviewIdx].rate.countDislike.push(rateDetails.userId)
            }

        },

        removeReview(state, {
            reviewId
        }) {
            // console.log('heeeeer')
            const idx = state.currReviews.findIndex(review => review.reviewId === reviewId);
            state.currReviews.splice(idx, 1);
        },


    },
    getters: {
        reviews(state) {
            return state.currReviews.sort((r1, r2) => {
                return r2.rate.countLike.length - r1.rate.countLike.length
            })
        }

    },
    actions: {
        loadReviews(context, {
            directAndId
        }) {
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                    context.commit({
                        type: 'setReviews',
                        serverReviews
                    })
                })
                // .catch(storageReviews => {
                //     context.commit({ type: 'setMovies', serverReviews: storageReviews })
                // })
                .finally(() => {
                    // console.log('FINISH ****loadReviews****');
                })
        },


        updateRate(context, {
            rateDetails
        }) {
            return ReviewService.updateRate(rateDetails)
                .then(() => {
                    context.commit({
                        type: 'updateReviewRate',
                        rateDetails
                    })

                })
        },

        addReview(context, {
            newReview
        }) {
            return ReviewService.add(newReview)
                .then((addedReview) => {
                    // console.log('addedReview', addedReview)
                    context.commit({
                        type: 'addReview',
                        addedReview
                    })
                })
        },

        updateReviewTxt(context, {
            reviewToEdit
        }) {
            // console.log('natliaaaaaa',reviewToEdit )
            return ReviewService.update(reviewToEdit)
                .then((savedReview) => {
                    context.commit({
                        type: ' updateReview',
                        savedReview
                    })
                })
        },

        removeReview(context, {
            reviewId
        }) {
            return ReviewService.remove(reviewId)
                .then(() => {
                    context.commit({
                        type: 'removeReview',
                        reviewId
                    })
                })
        }

    }
}

export default reviewsModule;