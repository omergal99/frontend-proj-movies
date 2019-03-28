import MovieService from '../services/MovieService'

const moviesModule = {
    strict: true,
    namespaced: true,
    state: {
        movies: [],
        currMovie: null,
        filterBy: '',
    },
    mutations: {
        setMovies(state, payload) {
            state.movies = payload.serverMovies;
        },
        setMovie(state, {
            currMovie
        }) {
            state.currMovie = currMovie;
        },
        updateMovieRate(state, {
            rateDetails
        }) {
            var movieIdx = state.movies.findIndex(movie => {
                return movie._id === rateDetails.movieId
            })
            state.movies[movieIdx].rank.push(rateDetails.rate)
        },
    },
    getters: {},
    actions: {
        loadMovies(context, {
            filter
        }) {
            return MovieService.query(filter)
                .then(serverMovies => {
                    context.commit({
                        type: 'setMovies',
                        serverMovies
                    })
                })
                // .catch(storageMovies => {
                //     context.commit({ type: 'setMovies', serverMovies: storageMovies })
                // })
                .finally(() => {
                    console.log('FINISH ****loadMovies****');
                })
        },
        loadMovie(context, {
            movieId
        }) {
            return MovieService.getById(movieId)
                .then(serverMovie => {
                    context.commit({
                        type: 'setMovie',
                        currMovie: serverMovie
                    })
                })
        },

        updateStarRate(context, {
            rateDetails
        }) {
            return MovieService.updateRate(rateDetails)
                .then(() => {
                    console.log('heeer')
                    context.commit({
                        type: 'updateMovieRate',
                        rateDetails
                    })

                })
        }

    }
}

export default moviesModule;