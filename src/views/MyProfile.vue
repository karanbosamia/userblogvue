<template>
    <body>
        <h1>
            <img :src="imageData" alt="My Image" style="border-radius: 75px; object-fit: cover; margin-left: 80px; width: 300px; height: 300px;"/>
              <span class="statusButtons" style="width: 80px; height: 50px;">
                Total Posts
              </span>
              <span class="statusButtons" style="width: 80px; height: 50px;">
                Followed
              </span>
              <span class="statusButtons" style="width: 80px; height: 50px;">
                Followed by
              </span>
        </h1>
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
          imageData: Object
      }
    },
    created() {
      this.fetchImageData();
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