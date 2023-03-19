<template>
    <div>
      <h2>Search Followers</h2>
      <input type="text" v-model="searchQuery" placeholder="Search for followers...">
      <ul>
        <li v-for="follower in filteredFollowers" :key="follower.id">
          <div>{{ follower.username }}</div>
          <button @click="followUser(follower.id)" v-if="!userFollows(follower.id)">Follow</button>
          <button @click="unfollowUser(follower.id)" v-if="userFollows(follower.id)">Unfollow</button>
        </li>
      </ul>
    </div>
</template>
  
<script>
  import axios from 'axios'
  
  export default {
    name: 'SearchUsers',
    data() {
      return {
        searchQuery: '',
        users: [],
        followers: [],
        followingIds: []
      }
    },
    methods: {
    async getUsers() {
        try {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Credentials', 'true');
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8080/api/get/users',
                headers: headers,
            })
            console.log(response);
            this.users = response.data;
            } catch (error) {
            console.log(error)
            }
        },
        // TODO CORS POLICY
      async followUser(userId) {
        let headers1 = {
            'Content-Type': 'application/json',
            'Accept': 'application/json' ,
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        }
        await axios({
            method: 'post',
            url: 'http://localhost:8080/api/follow',
            headers: headers1,
            data: { userId }
        }).then(response => {
          // Add the new following relationship to the followingIds array
          this.followingIds.push(response.data.followingId)
        }).catch(error => {
          console.log(error)
        })
      },
      unfollowUser(userId) {
        
        
        debugger;
        axios.delete('http://localhost:8080/api/follow/' + userId).then(response => {
          // Remove the unfollowed user's relationship from the followingIds array
          const index = this.followingIds.indexOf(response.data.followingId)
          this.followingIds.splice(index, 1)
        }).catch(error => {
          console.log(error)
        })
      },
      userFollows(userId) {
        return this.followingIds.includes(userId)
      }
    },
    computed: {
      filteredFollowers() {
        return this.users.filter(follower => {
          return follower.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
    },
    async created() {
      await this.getUsers();
    //   this.getFollowers()
    let headers = new Headers();
      
              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');
              
              headers.append('Access-Control-Allow-Origin', '*');
              headers.append('Access-Control-Allow-Credentials', 'true');
      await axios({
        url: 'http://localhost:8080/api/following',
        headers: headers,
        method: 'get'
    }).then(response => {
        this.followingIds = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>
