import MovieService from '../services/MovieService'

const moviesModule = {
    strict: true,
    namespaced: true,
    state: {
        movies: null,
        currMovie: null,
        filterBy: '',
    },
    mutations: {
        setMovies(state, payload) {
            state.movies = payload.serverMovies;
        },
        setMovie(state, {currMovie}) {
            state.currMovie = currMovie;
        },
    },
    getters: {
        
    },
    actions: {
        loadMovies(context, {filter}) {
            return MovieService.query(filter)
                .then(serverMovies => {
                context.commit({ type: 'setMovies', serverMovies })
                })
                // .catch(storageMovies => {
                //     context.commit({ type: 'setMovies', serverMovies: storageMovies })
                // })
                .finally(()=>{
                    console.log('FINISH ****loadMovies****');
                })
        },
        loadMovie(context, { movieId }) {
            MovieService.getById(movieId)
                .then( serverMovie => {
                    context.commit({ type: 'setMovie', currMovie: serverMovie })
                })
        },
    }
}

export default moviesModule;