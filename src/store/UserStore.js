import UserService from '../services/UserService'

const usersModule = {
    strict: true,
    namespaced: true,
    state: {
        currUser: null, // loged in user
        viewUser: null //  user
    },
    mutations: {
        setCurrUser(state, payload) {
            state.currUser = payload.user;
        },
        cleanCurrUser(state, payload) {
            state.currUser = payload.guest;
        },
        setViewUser(state, payload) {
            // console.log('payload.user',payload.user)
            state.viewUser = payload.user;
        },
        cleanViewUser(state) {
            state.viewUser = null;
        },
        setFollower(state, {
            users
        }) {
            state.currUser.follow.followAfter.push(users.loggedInUser.name)
            state.viewUser.follow.followedBy.push(users.followedUser.name)
            console.log('currUser', state.currUser.follow.followAfter)
            console.log('viewUser', state.viewUser.follow.followedBy)
        }
    },
    getters: {

    },
    actions: {
        doLogin(context, { user }) {
            return UserService.login(user)
                .then(serverUser => {
                    context.commit({
                        type: 'setCurrUser',
                        user: serverUser
                    })
                    return serverUser;
                })
        },
        loadUser(context, { user }) {
            return context.commit({
                type: 'setCurrUser',
                user
            })
        },
        addUser(context, { newUser }) {
            console.log('heeeeer', newUser)
            return UserService.singup(newUser)
                .then(addedUser => {
                    if (addedUser) {
                        console.log("addedUser", addedUser)
                        context.commit({ type: 'setCurrUser', user: addedUser })
                    }else{
                        console.log('name is not available')
                    }
                    return addedUser;
                })
        },
        logoutUser(context) {
            UserService.logout()
            var guest = UserService.getGuestUser();
            return context.commit({
                type: 'cleanCurrUser',
                guest
            })
        },
        loadViewUser(context, { userId }) {
            // console.log('state.currUser', context.state.currUser)
            // console.log('state.viewUser', userId)
            return UserService.getById(userId)
                .then(user => {
                    // console.log('uuuuuuuser', user)
                    return context.commit({
                        type: 'setViewUser',
                        user
                    })
                })
        },
        addFollower(context, {
            users
        }) {
            UserService.addFollowUser(users);
            return context.commit({
                type: 'setFollower',
                users
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