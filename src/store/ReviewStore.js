import ReviewService from '../services/ReviewService'

const reviewsModule = {
    strict: true,
    namespaced: true,
    state: {
        currReviews: null,
        currReview:{
            // id: null,
             likes:null,
             disLikes:null
         }
    },
    mutations: {
        setReviews(state, payload) {
            state.currReviews = payload.serverReviews;
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
        loadReviews(context, {directAndId}) {
            return ReviewService.query(directAndId)
                .then(serverReviews => {
                context.commit({ type: 'setReviews', serverReviews })
                })
                // .catch(storageReviews => {
                //     context.commit({ type: 'setMovies', serverReviews: storageReviews })
                // })
                .finally(()=>{
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
    }
}

export default reviewsModule;