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
    }
}

export default reviewsModule;