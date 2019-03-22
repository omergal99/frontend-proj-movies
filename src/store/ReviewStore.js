import ReviewService from '../services/ReviewService'

const reviewsModule = {
    strict: true,
    namespaced: true,
    state: {
        currReviews: null,
    },
    mutations: {
        setReviews(state, payload) {
            state.currReviews = payload.serverReviews;
        },
        addReview(state, { addedReview }) {
            state.currReviews.unshift(addedReview)
        },
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
        addReview(context, { newReview }) {
            console.log('newReview',newReview)
            return ReviewService.add(newReview)
            .then((addedReview) => {
                console.log('addedReview',addedReview)
                    context.commit({ type: 'addReview', addedReview })
                })
        },
    }
}

export default reviewsModule;