<template>
<body>
    <h1 class="text-center" style="font-size: 40px;margin-top: 210px;">User Login</h1>
    <form id="form">
        <div class="form-group row col-md-offset-4" style="margin: 0% 0% 0% 35%">
            <label for="staticEmail" class="col-md-1 col-form-label" style="font-size: 22px;">Username: </label>
            <div class="col-sm-10" style="margin:1% 0% 0% 7%;">
                <input type="text" class="form-control col-md-offset-1 round-box form-control-plaintext" id="username" name="username"
                v-model="username" required="1" style="width: 300px; background: #d5eded;" placeholder="Username">
            </div>
        </div>
        <div class="form-group row col-md-offset-4" style="margin: 0% 0% 0% 35%">
            <label for="inputPassword" class="col-md-1 col-form-label" style="font-size: 22px;">Password: </label>
            <div class="col-sm-10" style="margin:1% 0% 2% 7%;">
                <input type="password" class="form-control round-box col-md-offset-1 form-control-plaintext" id="password"
                name="password" placeholder="Password" style="width: 300px; background: #d5eded;">
            </div>
        </div>
        <div id="status"></div>
        <button @click.prevent="loadData" class="btn col-md-offset-6 round-button" style="margin-left: 650px;" data-mdb-ripple-color="dark">Log In</button>
    </form>
</body>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogIn',
  data() {
    return {
        dataList: [],
        username: '',
    }
  },
  props: {
    msg: String,
  },
  methods: {
    async loadData() {
        var form = document.getElementById('form');
        const formData = new FormData(form);
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');

        const loadData = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/fetchdata',
            data: formData,
            headers: headers,
        })
            if (loadData){
                if (loadData['data']['status'] == 'success') {
                    console.log('Successful login')
                    this.$router.push(`/dashboard/${this.username}`);
                    console.log(loadData['data']['username']);
                } else {
                    console.log(loadData['data']['status']);
                }
            }

    }
  }
})
</script>
<style>
span{
    font-family: cursive;
}
nav{
    font-family: cursive;
    font-size: 20px;
}
div{
    font-family: cursive;
}
button{
    font-family: cursive;
}
.round-box{
 border-radius: 20px 40px 60px 80px
}
/* Clipping */
.round-button{
 border-radius: 10px / 50px;
 -moz-background-clip: padding;
 -webkit-background-clip: padding-box;
 background-clip: padding-box;
 background: lightpink;
}
</style>