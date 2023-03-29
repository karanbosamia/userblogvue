<template>
  <router-view>
    <body>
        <h1><span style="float: left;">Welcome {{ username }}</span>
            <nav style="float: right;">
              <router-link to="/search">Search</router-link> |
              <router-link to="/myprofile">My Profile</router-link> |
              <router-link to="/login" @click="logout">Logout</router-link>
            </nav>
        </h1>
        <router-link to="/addpost">
          <button type="button" class="addpostbutton btn btn-dark">Add Post</button>
        </router-link>
        <div class="centered_div">

        <p>Connect with other users to see what they are posting</p>
        <p>

        </p>
        <div class="image-container-dashboard">
          <div class="image-follower" v-for="item in allImages" :key="item">
            <div class="image-follower" v-for="item_iter in item" :key="item_iter">
              <span>User: {{ item_iter.name }}</span><br>
              <span> Caption: {{ item_iter.caption }}</span>
              <img :src="item_iter.image" alt="My Image" style="border-radius: 75px; object-fit: cover; margin-left: 80px; width: 1000px; height: 800px;"/>
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
    </body>
  </router-view>

</template>
    
<script>
    // @ is an alias to /src
    import axios from 'axios'
    import { defineComponent } from 'vue'
    
    export default defineComponent({
      name: 'DashBoard',
      created(){
        this.fetchFollowerPosts();
      },
      data() {
        return {
            dataList: [],
            allImages: {},
        }
      },
      props: {
        msg: String,
        username: {
          type: String,
        },
      },
      methods: {
        logout() {
          let headers = new Headers();

          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Credentials', 'true');

          axios.post(
            '/logout', {
              headers: headers
            }) // send a POST request to the Flask logout endpoint
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        },
        async loadData() {
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Credentials', 'true');

            const loadData = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8080/fetchdata',
                // data: ,
                headers: headers,
            })
            console.log(loadData);
        },
        async fetchFollowerPosts() {
          let headers = new Headers();

          headers.append('Content-Type', "application/octet-stream");
          headers.append('Accept', "application/octet-stream");
          headers.append('Access-Control-Allow-Origin', '*');
          headers.append('Access-Control-Allow-Credentials', 'true');
          const posts = await axios.get('http://127.0.0.1:8080/get/followerposts', {
            headers: headers,
          })
          if (posts) {
            for (let posting in posts.data) {
              this.allImages[posting] = posts.data[posting]
            }
          }
        }
      }
    })
</script>

<style>
.centered_div {
   width: 1000px;
   height: 1000px;
   position: absolute;
   text-align: center;
   top: 50%;
   left: 50%;
   right: 50%;
   bottom: 50%;
   margin-left: -500px;
   /* margin-top: 50px; */
}
.addpostbutton {
  /* background: red; */
  -webkit-transition: background 300ms ease-in 0s; /* For Safari 3.0+ */
  transition: background 300ms ease-in 0s;  /* Standard syntax */
  width: 400px;
}
.addpostbutton::after {
  height: 100%;
  left: -35%;
  top: 0;
  transform: skew(50deg);
  transition-duration: 0.2s;
  transform-origin: top left;
  width: 0;
}
.addpostbutton:hover:after {
  height: 100%;
  width: 135%;
}
</style>
