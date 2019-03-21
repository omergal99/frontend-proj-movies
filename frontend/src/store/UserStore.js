import UserService from '../services/UserService'

const usersModule = {
    strict: true,
    namespaced: true,
    state: {
        currUser: null,
    },
    mutations: {
        setCurrUser(state, payload) {
            state.currUser = payload.user;
        },
    },
    getters: {
       
    },
    actions: {
        loadUser(context, {user}) {
            context.commit({ type: 'setCurrUser', user })
        },
    }
}

export default usersModule;