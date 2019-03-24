import UserService from '../services/UserService'

const usersModule = {
    strict: true,
    namespaced: true,
    state: {
        currUser: null,
        viewUser: null
    },
    mutations: {
        setCurrUser(state, payload) {
            state.currUser = payload.user;
        },
        cleanCurrUser(state, payload) {
            state.currUser = payload.guest;
        },
        setViewUser(state, payload) {
            state.viewUser = payload.user;
        },
        cleanViewUser(state) {
            state.viewUser = null;
        },
    },
    getters: {
       
    },
    actions: {
        doLogin(context, {user}) {
            return UserService.login(user)
                .then( serverUser => {
                    context.commit({ type: 'setCurrUser', user: serverUser })
                    return serverUser;
                })
        },
        loadUser(context, {user}) {
            return context.commit({ type: 'setCurrUser', user })
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
        },
        loadViewUser(context, {userId}) {
            return UserService.getById(userId)
                .then( user => {
                    return context.commit({ type: 'setViewUser', user })
                })
        },
    }
}

export default usersModule;


// axios.get('https://randomuser.me/api/')
// 				.then((res) => {
// 					var user = this.$store.state.usersModule.currUser 
// 					user.userImg = res.data.results[0].picture.large
// 				})
// 				.catch(console.log('error'))