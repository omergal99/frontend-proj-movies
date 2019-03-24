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
        getUserById(context, {userId}){
            UserService.getById(userId)
                .then( user => {
                    context.commit({ type: 'setCurrUser', user })  // Commit and send to componenta
                })
        }
    }
}

export default usersModule;


// axios.get('https://randomuser.me/api/')
// 				.then((res) => {
// 					var user = this.$store.state.usersModule.currUser 
// 					user.userImg = res.data.results[0].picture.large
// 				})
// 				.catch(console.log('error'))