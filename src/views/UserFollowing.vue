<template>
    <div>
    <h2>Followers</h2>
    <ol>
      <li v-for="follower in followers" :key="follower.id" :holder1="increment()">
        {{ follower.username }}
      </li>
    </ol>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios'

  export default {
    name: 'UserFollowing',
    created() {
      this.fetchUserFollowers();
    },
    data() {
      return {
          followers: []
      }
    },
    methods: {
      increment() {
        this.holder = this.holder + 1;
        return this.holder;
      },
      async fetchUserFollowers() {
        let headers = new Headers();

        headers.append('Content-Type', "application/octet-stream");
        headers.append('Accept', "application/octet-stream");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const UserFollowers = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8080/get/followers',
            headers: headers,
        })
        this.followers = UserFollowers.data;
      }
    },
    components: {
    }
  }
</script>
