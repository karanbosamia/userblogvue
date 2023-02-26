<template>
        <form id="form">
            <h1 style="text-align: center;">Add a Blog/Post</h1>
            <div class="centered_div">
                <div class="form-group row col-md-offset-4">
                    <label for="postName" class="addpostlabel col-md-1 col-form-label text-end" style="font-size: 22px;">Name</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="postName"
                        class="addpostinput form-control col-md-offset-1 form-control-plaintext" id="name" name="name" style="width: 300px;">
                    </div>
                </div>
                <div class="form-group row col-md-offset-4">
                    <label for="caption" class="addpostlabel col-md-1 col-form-label" style="font-size: 22px;">Caption/Description</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="caption" class="addpostinput form-control col-md-offset-10 form-control-plaintext" id="caption" name="caption" style="width: 300px; height: 300px;">
                    </div>
                </div>
                <div class="form-group row col-md-offset-4">
                    <label for="image" class="addpostlabel col-md-1 col-form-label" style="font-size: 22px;">Upload Image</label>
                    <div class="col-sm-10">
                        <input type="file" @change="onFileChange" class="addpostinput form-control col-md-offset-1 form-control-plaintext" id="image" name="image" style="width: 300px; height: 300px;">
                    </div>
                </div>
                <p>
                    <button type="button" @click.prevent="onSubmit" class="btn btn-light" data-mdb-ripple-color="dark">Save</button>
                </p>
            </div>
            
          </form>
  
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
          },
          async onSubmit() {
              let headers = new Headers();
      
              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');
              
              headers.append('Access-Control-Allow-Origin', '*');
              headers.append('Access-Control-Allow-Credentials', 'true');
      
              var form = document.getElementById('form');
              const formData = new FormData(form);
              formData['file']= this.imageFile

              const sendData = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8080/postapost',
                headers: headers,
                data: formData,
              })
              console.log(sendData);
          },
          onFileChange(event) {
            const file = event.target.files[0];
            this.imageFile = file;
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
  </style>