import UserService from '../services/UserService'

const usersModule = {
    strict: true,
    namespaced: true,
    state: {
        currUser: null,
    },
    mutations: {
        setCurrUser(state, {user}){
            state.currUser = user
        }
    },
    getters: {
       
    },
    actions: {
        getUserById(context, {userId}){
            UserService.getById(userId)
                .then( user => {
                    context.commit({ type: 'setCurrUser', user })  // Commit and send to componenta
                })
        }
    }
}

export default usersModule;