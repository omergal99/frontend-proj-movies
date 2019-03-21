<template>
    <section>
       

        <div class="user-details">
            <div class="div-img">
                <img :src="currUser.userImg">
            </div>
            <div class="user-table">
                <table class="details-table">
                    <tr>
                        <td>Name</td>
                        <td>{{currUser.name}}</td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td>{{currUser.rating}}</td>
                    </tr>
                </table>
            </div>           
        </div>
        
      
    </section>
</template>

<script>
export default {
    name: "UserDetails",
    data() {
        return {
 
        }
    },
    created() {
        const userId = this.$route.params.userId;

        this.$store.dispatch({ type: "usersModule/getUserById", userId })
        .then(()=>{
            // console.log('in then in created ')
        })
        // console.log('in created')
    },
    computed: {
        currUser() {
            // console.log('in computed')
            return this.$store.state.usersModule.currUser;
        }
    },
}
</script>


<style scoped>
h3 {
  margin: 0 0 6px 0;
}
.div-img {
  width: 25vw;
}
.div-img img {
  /* max-width: 25vw; */
  max-height: 150px;
  text-align: center;
}

.user-details {
  display: flex;
  /* flex-wrap: wrap; */
  padding: 8px;
}

.user-table {
  max-width: 75vw;
}
.user-table table {
  max-width: 75vw;
  margin: 0 auto;
}
.details-table td {
  padding: 4px;
  border: 1px solid #c4b7a6;
}
.details-table td:first-child {
  background-color: #dac292;
}
.details-table td:not(:first-child) {
  background-color: #e6e2d3;
}
</style>
