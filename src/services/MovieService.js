import HttpService from './HttpService';

const MOVIE_URL = HttpService.getUrl('movie');

const resolveData = res => res.data;

export default {
    query,
    getById,
    remove,
    add,
    update,
    updateRate
}

function query(filterBy) {
    var queryStr = '';
    if (filterBy) {
        queryStr = `?name=${filterBy.name}&category=${filterBy.category}&sort=${filterBy.sort}&isNew=${filterBy.isNew}`
    }
    return HttpService.get(`${MOVIE_URL}${queryStr}`)
        .then(resolveData)
        .catch((err) => err)
}

// function getById(movieId) {
//     return HttpService.get(`${MOVIE_URL}/${movieId}`)
//         .then(resolveData)
// }
// --------------------------
// function getById(movieId) {
//     return HttpService.get(`${MOVIE_URL}/${movieId}`)
//         .then(res => res.data)
// }

async function getById(movieId) {
    try {
        let res = await HttpService.get(`${MOVIE_URL}/${movieId}`);
        return res.data;
    }
    catch (err) {
        console.log(err, 'We have an error in server - in: MovieService-getByID')
    }
}
// ----------------------------------
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

function updateRate(rateDetails) {
    console.log('rateDetails', rateDetails);

    return new Promise((resolve, reject) => {
        HttpService.put(MOVIE_URL, rateDetails)
            .then(res => {
                let updatedMovie = res
                console.log('updated movie:', updatedMovie)
                resolve(updatedMovie)
            })
            .catch(err => err)
    })
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