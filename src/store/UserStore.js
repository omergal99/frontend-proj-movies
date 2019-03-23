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
        cleanCurrUser(state, payload) {
            state.currUser = payload.guest;
        },
    },
    getters: {
       
    },
    actions: {
        loadUser(context, {user}) {
            return context.commit({ type: 'setCurrUser', user })
        },
        getUserById(context, {userId}){
            UserService.getById(userId)
                .then( user => {
                    context.commit({ type: 'setCurrUser', user })  // Commit and send to componenta
                })
        },
        addUser(context, {newUser}) {
            return UserService.add(newUser)
                .then( addedUser => {
                    context.commit({ type: 'setCurrUser', user: addedUser })
                    return 'success registar'
                })
        },
        logoutUser(context){
            var guest = UserService.getGuestUser();
            return context.commit({ type: 'cleanCurrUser', guest })
        }
    }
}

export default usersModule;