import HttpService from './HttpService';

const MOVIE_URL = HttpService.getUrl('movie');

const resolveData = res => res.data;

export default {
    query,
    getById,
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

function getById(movieId) {
    return HttpService.get(`${MOVIE_URL}/${movieId}`)
        .then(resolveData)
}