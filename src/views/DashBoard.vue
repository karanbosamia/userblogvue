<template>
  <router-view>
    <body>
        <h1><span style="float: left;">Welcome</span>
            <nav style="float: right;">
              <router-link to="/search">Search</router-link> |
              <router-link to="/myprofile">My Profile</router-link> |
              <router-link to="/logout">Logout</router-link>
            </nav>
        </h1>
        <div class="centered_div">
  There are no posts in your feed.
  <p>Connect with other users to see what they are posting</p>
</div>
    </body>
  </router-view>

</template>
    
<script>
    // @ is an alias to /src
    import axios from 'axios'
    // import { response } from 'express'
    import { defineComponent } from 'vue'
    
    export default defineComponent({
      name: 'DashBoard',
      data() {
        return {
            dataList: []
        }
      },
      props: {
        msg: String,
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
   top: 50%;
   left: 50%;
   right: 50%;
   bottom: 50%;
   margin-left: -500px;
   /* margin-top: 50px; */
}
</style>