import HttpService from './HttpService';

const MOVIE_URL = HttpService.getUrl('movie');

const resolveData = res => res.data;

export default {
    query,
    getById,
    remove,
    add,
    update
}

const MOVIES_KEY = 'movieeee';

function query(filterBy) {
    var queryStr = '';
    if (filterBy) {
        queryStr = `?name=${filterBy.name}&category=${filterBy.category}&sort=${filterBy.sort}&isNew=${filterBy.isNew}`
    }
    console.log('sdgfsdg',MOVIE_URL)
    return HttpService.get(`${MOVIE_URL}${queryStr}`)
        .then(resolveData)
        .catch(() => _createMovies())
}

function getById(movieId) {
    return HttpService.get(`${MOVIE_URL}/${movieId}`)
        .then(resolveData)
}

function add(movie) {
    movie.movieId = _makeId()
    movies.unshift(movie)
    return _saveMoviesToFile().then(() => movie)
}

function update(updatMovie) {
    var movieIdx = movies.findIndex(movie => movie.movieId === updatMovie.movieId);
    movies.splice(movieIdx, 1, updatMovie)
    return _saveMoviesToFile().then(() => updatMovie)
    // return Promise.resolve(movie)
}

function remove(movieId) {
    var movieIdx = movies.findIndex(movie => movie.movieId === movieId);
    if (movieIdx === -1) return Promise.reject('Not Found');
    movies.splice(movieIdx, 1)
    return _saveMoviesToFile();
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createMovies() {
    var movies = StorageService.loadFromStorage(MOVIES_KEY);
    if (!(movies && movies.length)) {
        var movies = ['movie name', ' Listen Radio', 'Double Cassette']
            .map(_createMovie) // chackkkkkkkkkkkkkkkk
    }
    StorageService.saveToStorage(MOVIES_KEY, movies);
    return movies;
}

function _createMovie(movie) {
    var putId = UtilService.makeId();
    return {
        movie: {
            movieId: putId,
            name: movie,
            price: UtilService.getRandomInt(30, 80),
            type: 'okkk for now',
            createAt: 'put date',
            inStock: UtilService.getRandomInt(0, 40)
        }
    }
}

function getEmpty() {
    return {
        movie: {
            movieId: null,
            name: 'New Movie',
            price: 0,
            type: '',
            createAt: '',
            inStock: false
        }
    }
}