<template>
    <section>
            <div class="follow" v-if="isSelfProfile">
                <button @click="onFollowUser" class="btn-follow" title="Follow User">
                    Follow User! <i class="fas fa-user-plus"></i>
                </button>
                <div v-if="isLogin">Please login to follow the user...</div>
            </div>

            <div v-if="isAlreadyFollowed">You already follow this user</div>
            <div v-if="isFollowed">The user is followed by {{followedByList}}</div>
            {{isFollowed}}
    </section>
</template>

<script>
export default {
    name: 'FollowUser',
    data() {
        return {
            isLogin: false,  // isTellLogin
            isAlreadyFollowed: false
        }
    },
    created() {

    },
    computed: {
        currUser() {
            return this.$store.state.usersModule.currUser;
        },
        viewUser() {
            return this.$store.state.usersModule.viewUser;
        },
        isSelfProfile() {
            if (this.currUser.name === this.viewUser.name) {
                return false
            } else {
                return true
            }
        },
        isFollowed() {
            if(this.viewUser){
                console.log('viewUser', this.viewUser.follow.followedBy)
                var followedUser = JSON.parse(JSON.stringify(this.viewUser.follow.followedBy))
                console.log(this.viewUser.name, ' is followed by user', followedUser)
                // if(this.viewUser.follow !== "") {

                //     return true
                // }
                // return false

            }
        },
        followedByList(){
            console.log('viewUser', this.viewUser.follow)
            return this.viewUser.follow.followedBy
        }
    },
    methods: {
        onFollowUser(){
            // check log in
            var loggedInUser = this.currUser
            var followedUser = this.viewUser
            if (loggedInUser.name === 'Guest') {
                this.isLogin = !this.isLogin
                setTimeout(() => {
                this.isLogin = !this.isLogin;
                }, 2000)   // 2 secs to show "Please login to follow the user..."
                return
            }

            // check if already follow
            var already = this.checkIfAlreadyFollow(loggedInUser, followedUser)
            if (already) return

            // send to backend
            var users = { "loggedInUser": {"_id": loggedInUser._id, "name": loggedInUser.name}, 
                           "followedUser": {"_id": followedUser._id, "name": followedUser.name}}
            this.$store.dispatch({ type: "usersModule/addFollower", users })
        },
        checkIfAlreadyFollow(loggedInUser, followedUser){
            if (loggedInUser && followedUser) {
                var loggedInUser = JSON.parse(JSON.stringify(loggedInUser.name))
                var followedUser = JSON.parse(JSON.stringify(followedUser.follow.followedBy))

                for(var i=0; i<followedUser.length; i++){
                    if (loggedInUser === followedUser[i]){
                        // console.log('loggedInUser === followedUser[i]',loggedInUser)
                        this.isAlreadyFollowed = true
                        console.log('already')
                        setTimeout(() => {
                            this.isAlreadyFollowed = false;
                        }, 3000)   // 3 secs to show "The user is already followed by ..."
                        return true
                    }
                    return false
                }

            }
        },
        
      
    },
}
</script>

<style lang="scss">
.btn-follow {
    color: white;
    padding: 10px;
    margin-bottom: 40px;
    border: none;
    border-radius: 3px;
    outline: none;
    font-family: cursive, arial, serif, sans-serif;
    background-color: #1a1818;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: #3481b4;
    }
}
</style>
