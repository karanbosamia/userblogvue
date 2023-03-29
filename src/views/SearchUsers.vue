<template>
    <div>
      <div>
      <nav style="float: right;">
              <router-link to="/search">Search</router-link> |
              <router-link to="/myprofile">My Profile</router-link> |
              <router-link to="/logout">Logout</router-link>
            </nav>
          </div>
          <br>
          <br>
          <br>
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
        async followUser(userId) {
          axios.defaults.withCredentials = true; // Enable CORS with credentials

          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
          };
          await axios({
            method: 'post',
            url: 'http://localhost:8080/api/follow/'+userId,
            headers: headers,
            withCredentials: true, // Enable sending cookies with the request
          }).then(response => {
            // Add the new following relationship to the followingIds array
            this.followingIds.push(response.data.followingId)
          }).catch(error => {
            console.log(error)
          })
      },
      unfollowUser(userId) {
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
        };
        axios({
          method: 'delete',
          url: 'http://localhost:8080/api/unfollow/' + userId,
          headers: headers,
          withCredentials: true,
        }).then(response => {
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
        this.followingIds = response.data.follower_ids;
      }).catch(error => {
        console.log(error)
      })
      await this.getUsers();      
    }
  }
</script>
