<template>
  <router-view>
    <body>
        <h1><span style="float: left;">Welcome {{ username }}</span>
            <nav style="float: right;">
              <router-link to="/search">Search</router-link> |
              <router-link to="/myprofile">My Profile</router-link> |
              <router-link to="/logout">Logout</router-link>
            </nav>
        </h1>
        <div class="centered_div">
  There are no posts in your feed.
  <p>Connect with other users to see what they are posting</p>
  <p>
    <button type="button" class="btn btn-light" data-mdb-ripple-color="dark">Light</button>
    <router-link to="/addpost">
      <button type="button" class="addpostbutton btn btn-dark">Add Post</button>
    </router-link>
  </p>
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
      data() {
        return {
            dataList: [],
        }
      },
      props: {
        msg: String,
        username: {
          type: String,
        },
      },
      methods: {
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
/* .btn:hover {
  background: rgb(0, 0, 0);
  color: white;
} */

</style>