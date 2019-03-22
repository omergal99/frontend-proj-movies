const fs = require('fs');

const UserService = require('./UserService');

export default {
    query,
    getById,
    remove,
    add,
    update
}

var movies = require('../../data/movies_db.json');
const MOVIES_KEY = 'movieeee';

function query(filterBy) {
    return Promise.resolve(movies);
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

function getById(id) {
    var movie = movies.find(movie => movie.movieId === id);
    if (movie) return Promise.resolve(movie);
    else return Promise.reject('Unknown movie');
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

function _saveMoviesToFile() {
    return new Promise((resolve, reject) => {
        var strMovies = JSON.stringify(movies)
        fs.writeFile("data/movies_db.json", strMovies, (err) => {
            if (err) {
                console.error('Had problem writing to movies file', err);
                reject(err);
            } else resolve();
        });
    })
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