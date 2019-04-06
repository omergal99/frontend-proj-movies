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
        updateMovieRate(state, { rateDetails }) {
            const movieIdx = state.movies.findIndex(movie => movie._id === rateDetails.movieId)
            //console.log('Nat heeer',state.movies[movieIdx])
            state.movies[movieIdx].rank.push({userId:rateDetails.loggedInUser,rank:rateDetails.rate})
            console.log('Nat heeer',state.movies[movieIdx])
            state.movies[movieIdx].avgRank = ((state.movies[movieIdx].rank.reduce((acc, rank) => acc + rank.rank, 0)) / state.movies[movieIdx].rank.length).toFixed(1)
            console.log ('avg', state.movies[movieIdx].avgRank )
        },
    },
    getters: {
        fourMovies(state) {
            var movies = state.movies.sort((m1, m2) => {
                return m2.details.year - m1.details.year;
            })
            return movies.splice(0, 4);
        }
    },


    actions: {
        loadMovies(context, { filter }) {
            return MovieService.query(filter)
                .then(serverMovies => {
                    context.commit({ type: 'setMovies', serverMovies })
                })
                // .catch(storageMovies => {
                //     context.commit({ type: 'setMovies', serverMovies: storageMovies })
                // })
                .finally(() => {
                    console.log('FINISH ****loadMovies****');
                })
        },
        loadMovie(context, { movieId }) {
            return MovieService.getById(movieId)
                .then(serverMovie => {
                    context.commit({ type: 'setMovie', currMovie: serverMovie })
                })
        },

        updateStarRate(context, { rateDetails }) {
            return MovieService.updateRate(rateDetails)
                .then(res => {
                    //console.log('resssssss', res)
                    return context.commit({ type: 'updateMovieRate', rateDetails })
                })
                .catch(err => console.log('catch'))
        }

    }
}

export default moviesModule;