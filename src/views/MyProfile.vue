<template>
    <body>
      <nav style="float: right;">
              <router-link to="/search">Search</router-link> |
              <router-link to="/myprofile">My Profile</router-link> |
              <router-link to="/logout">Logout</router-link>
            </nav>
        <h1>
            <img :src="imageData" alt="My Image" style="border-radius: 75px; object-fit: cover; margin-left: 80px; width: 300px; height: 300px;"/>
              <span class="statusButtons badge" style="width: 200px; height: 50px;">
                <span>Total Posts</span>
                <p></p><span>{{ totalPosts }}</span>
              </span>
              <span class="statusButtons badge" style="width: 200px; height: 50px;">
                Followers
                <p></p><span><router-link to="/followers">{{ totalFollowers }}</router-link></span>
              </span>
              <span class="statusButtons badge" style="width: 200px; height: 50px;">
                Following
                <p></p><span><router-link to="/following">{{ totalFollowing }}</router-link></span>
              </span>
        </h1>
        <span style="width: 200px; height: 50px; text-align: center; font-size: 50px;"> Posts </span>
        <div class="image-container">
          <div class="image" v-for="item in allImages" :key="item">
            <img :src="item" alt="My Image" style="border-radius: 75px; object-fit: cover; margin-left: 80px; width: 300px; height: 300px;"/>
          </div>
        </div>
    </body>
</template>
  
<script>
  // @ is an alias to /src
  import axios from 'axios'
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'AddPost',
    data() {
      return {
          dataList: [],
          caption: '',
          postName: '',
          imageFile: Object,
          imageData: Object,
          allImages: [],
          totalFollowers: '',
          totalPosts: '',
          totalFollowing: '',
      }
    },
    async created() {
      this.fetchImageData();
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
          this.totalFollowing = this.followingIds.length;
          this.followerIds = response.data.followed_ids;
          this.totalFollowers = this.followerIds.length;
        }).catch(error => {
          console.log(error)
        })
        this.fetchUserPosts();
    },
    props: {
      msg: String,
    },
    methods: {
      async fetchImageData() {
        let headers = new Headers();
      
        headers.append('Content-Type', "application/octet-stream");
        headers.append('Accept', "application/octet-stream");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const profilePicture = await axios.get('http://127.0.0.1:8080/get/profile', {
          responseType: 'blob',
          headers: headers,
        })
        if (profilePicture) {
          const blob = new Blob([profilePicture.data], { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          this.imageData = url;
        }
      },
      async fetchUserPosts() {
        let headers = new Headers();
      
        headers.append('Content-Type', "application/octet-stream");
        headers.append('Accept', "application/octet-stream");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const posts = await axios.get('http://127.0.0.1:8080/get/posts', {
          headers: headers,
        })
        this.totalPosts = Object.keys(posts.data).length;
        if (posts) {
          for (let posting in posts.data) {
            this.allImages.push(posts.data[posting].image)
          }
        }
      }
    }
  }
)
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
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -10px;
}

.image {
  width: calc(33.33% - 20px); 
  margin: 10px; 
  box-sizing: border-box; 
}

.image img {
  max-width: 100%; 
  height: auto; 
}
.addpostinput {
/* background: red; */
-webkit-transition: background 300ms ease-in 0s; /* For Safari 3.0+ */
transition: background 300ms ease-in 0s;  /* Standard syntax */
width: 300px;
background: antiquewhite;
height: 51px;
}
.addpostinput::after {
height: 100%;
left: -35%;
top: 0;
transform: skew(50deg);
transition-duration: 0.2s;
transform-origin: top left;
width: 0;
}
.addpostinput:hover:after {
height: 100%;
width: 135%;
}
/* .btn:hover {
background: rgb(0, 0, 0);
color: white;
} */

.addpostinput {
display: revert;
border: outset;
}
.addpostlabel {
text-align: right;
}
.statusButtons {
  width: 80px;
  height: 50px;
}
</style>