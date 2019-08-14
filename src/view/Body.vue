<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="files" ref="files" accept="image/*" multiple v-on:change="handleFilesUpload()"/>
      </label>
      <img style = "margin-left: auto; margin-right: auto; display: block;"src = "https://i.imgur.com/7mEU39G.png" />
    </div>
    <div class="large-12 medium-12 small-12 cell clear">
      <p style = "text-align: center; font-size:20px; margin-top:20px;">{{btnName}} <img :src="iconSrc"  style = "width:20px; height:20px;"> </img></p>
      <img src="https://igdm.me/img/icon.png" id = "upload-button" v-on:click="addFiles()" />
    </div>
    <div class="large-12 medium-12 small-12 cell" v-if="clicked2Times">
      <button v-on:click="submitFiles()" class = "block">Try On</button>
    </div>
    <br>
    <div class="large-12 medium-12 small-12 cell" id="img">
      <div>
        <vs-col :key="index" v-for="(file, index) in files" vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
          <vs-image class="preview" v-bind:ref="'image'+parseInt( index )"/>
        </vs-col>
      </div>
    </div>
    <br>
    <div v-if="output">

    </div>
  </div>
</template>

<script>
  export default {
    /*
      Defines the data used by the component
    */
    data () {
      return {
        files: [],
        btnName: 'Take picture of the trying person',
        output: false,
        iconSrc: 'https://png.pngtree.com/svg/20170518/274aed119e.svg',
        noClick: 0,
        clicked2Times: false
      }
    },

    /*
      Defines the method used by the component
    */
    methods: {
      /*
        Adds a file
      */
      addFiles () {
        this.btnName = 'Take picture of an outfit'
        this.iconSrc = 'https://image.flaticon.com/icons/png/512/106/106020.png'
        this.$refs.files.click()
        this.noClick += 1
        if (this.noClick >= 2) {
          this.addButton()
        }
      },
      addButton () {
        this.clicked2Times = true
      },
      /*
        Submits files to the server
      */
      submitFiles () {
        /*
          Initialize the form data
        */
        let formData = new FormData()
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i]

          formData.append('files[' + i + ']', file)
        }

        /*
          Make the request to the POST /select-files URL
        */
        fetch('http://localhost:8081/form', {
          method: 'POST',
          body: formData
        }).then(res => { console.log('TODO') })
      },

      /*
        Handles the uploading of files
      */
      handleFilesUpload () {
        /*
          Get the uploaded files from the input.
        */
        let uploadedFiles = this.$refs.files.files

        /*
          Adds the uploaded file to the files array
        */
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.files.push(uploadedFiles[i])
        }

        /*
          Generate image previews for the uploaded files
        */
        this.getImagePreviews()
      },

      /*
        Gets the preview image for the file.
      */
      getImagePreviews () {
        /*
          Iterate over all of the files and generate an image preview for each one.
        */
        for (let i = 0; i < this.files.length; i++) {
          /*
            Ensure the file is an image file
          */
          if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
            /*
              Create a new FileReader object
            */
            let reader = new FileReader()

            /*
              Add an event listener for when the file has been loaded
              to update the src on the file preview.
            */
            reader.addEventListener('load', function () {
              this.$refs['image' + parseInt(i)][0].src = reader.result
            }.bind(this), false)

            /*
              Read the data for the file in through the reader. When it has
              been loaded, we listen to the event propagated and set the image
              src to what was loaded from the reader.
            */
            reader.readAsDataURL(this.files[i])
          }
        }
      }
    }
  }
</script>

<style>
  #img {
    width: 100%;

  }
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  div.file-listing img{
    max-width: 90%;
  }
  .preview {
    overflow: auto;
  }
  .block {
  display: block;
  width: 100%;
  border: solid black 1px;
  margin-top: 2vh;
  background-color: hsl(220,50%,80%);
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
	}
  #upload-button{
  background-color: lightblue;
  cursor:pointer;
  display: block;
  margin-left: auto;
  border-radius: 4vh;
  margin-right: auto;
  width: 50%;
  height: auto;
  }
  .buttonHolder{
    text-align: center;
    padding: 40px 40px 40px 40px;
  }
</style>
