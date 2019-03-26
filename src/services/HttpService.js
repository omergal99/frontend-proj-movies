import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

function get(...args) {
    return axios.get(...args)
}
function post(...args) {
    return axios.post(...args)
}
function put(...args) {
    return axios.put(...args)
}
function remove(...args) {
    return axios.delete(...args)
}

function getUrl(entityName) {
    return (process.env.NODE_ENV !== 'development')
    ? `/${entityName}`
    : `//localhost:3003/${entityName}`
}

export default {
    get,
    post,
    put,
    delete : remove,
    getUrl
}