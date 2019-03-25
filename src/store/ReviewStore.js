import ReviewService from '../services/ReviewService'

const reviewsModule = {
    strict: true,
    namespaced: true,
    state: {
        currReviews: null,
        currReview: {
            // id: null,
            likes: null,
            disLikes: null
        }
    },
    mutations: {
        setReviews(state, payload) {
            state.currReviews = payload.serverReviews;
            // console.log('state.currReviews', state.currReviews)
        },
        addReview(state, { addedReview }) {
            state.currReviews.unshift(addedReview)
        },
        updateReview(state, { savedReview }) {
            const idx = state.currReviews.findIndex(currReview => currReview.reviewId === savedReview.reviewId);
            state.currReviews.splice(idx, 1, savedReview)
        },
        removeReview(state, { reviewId }) {
            const idx = state.currReviews.findIndex(review => review.reviewId === reviewId);
            state.currReviews.splice(idx, 1);
        },
        setCurreReview(state, payload) {
            // state.currReview.id = payload.serverReviews
            state.currReview.likes = payload.serverLikes
            state.currReview.disLikes = payload.serverDisikes
        }
    },
    getters: {

    },
    actions: {
        loadReviews(context, { directAndId }) {
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                    context.commit({ type: 'setReviews', serverReviews })
                })
                // .catch(storageReviews => {
                //     context.commit({ type: 'setMovies', serverReviews: storageReviews })
                // })
                .finally(() => {
                    console.log('FINISH ****loadReviews****');
                })
        },

        addLike(context, { reviewId }) {
            console.log('store', reviewId)
            return ReviewService.addLike(reviewId)
                .then(serverLikes => {
                    context.commit({ type: 'setCurreReview', serverLikes })
                })
        },

        addDislike(context, { reviewId }) {
            return ReviewService.addDislike(reviewId)
                .then(serverDisikes => {
                    context.commit({ type: 'setCurreReview', serverDisikes })
                })
        },
        addReview(context, { newReview }) {
            return ReviewService.add(newReview)
                .then((addedReview) => {
                    console.log('addedReview',addedReview)
                    context.commit({ type: 'addReview', addedReview })
                })
        },
        updateReview(context, { updatedReview }) {
            return ReviewService.update(updatedReview)
                .then((savedReview) => {
                    context.commit({ type: 'updateReview', savedReview })
                })
        },
        removeReview(context, { reviewId }) {
            return ReviewService.remove(reviewId)
                .then(() => {
                    context.commit({ type: 'removeReview', reviewId })
                })
        },
    }
}

export default reviewsModule;