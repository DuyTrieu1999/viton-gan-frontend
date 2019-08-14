<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="files" ref="files" accept="image/*" multiple v-on:change="handleFilesUpload()"/>
      </label>
    </div>
    <div class="large-12 medium-12 small-12 cell clear buttonHolder">
      <vs-button size="large" color="primary" type="border" v-on:click="addFiles()">Add Files</vs-button>
    </div>
    <div class="large-12 medium-12 small-12 cell buttonHolder">
      <vs-button size="large" color="primary" type="border" v-on:click="submitFiles()">Submit</vs-button>
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
        output: false
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
        this.$refs.files.click()
      },

      /*
        Submits files to the server
      */
      submitFiles () {
        let formData = new FormData()
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i]

          formData.append('files[' + i + ']', file)
        }
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
  .buttonHolder{
    text-align: center;
    padding: 40px 40px 40px 40px;
  }
</style>
