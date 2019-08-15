<template>
  <div class="container bg" style = "height: 100vh; width: 100vw;">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="file1" ref="file1" accept="image/*" multiple v-on:change="handleFilesUpload1()"/>
        <input type="file" id="file2" ref="file2" accept="image/*" multiple v-on:change="handleFilesUpload2()"/>
      </label>
      <img style = "margin-left: auto; margin-right: auto; display: block;"src = "https://i.imgur.com/7mEU39G.png" />
    </div>

    <div class="large-12 medium-12 small-12 cell clear">
     
      <img style = "margin-top: 3vh;" v-bind:ref='image1' :src="imageData1" id = "upload-button" v-on:click="addFiles1()"> </img>
      <img style = "margin-top: 3vh;" v-bind:ref='image2' :src="imageData2" id = "upload-button" v-on:click="addFiles2()"> </img>
    </div>

    <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="submitFiles()" id = 'submitButton' class = "block" style = "font-size: 30px;" v-if="clicked2Times">Try on</button>
    </div>

    <div>
    	<img id = "xnxx1" src = "">
    	<img id = "xnxx2" src = "">
    	<img id = "xnxx3" src = "">
    	<img id = "xnxx4" src = "">
    	<img id = "xnxx5" src = "">
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        file1: '',
        file2: '',
        imageData1: 'https://cdn1.iconfinder.com/data/icons/user-pics/512/user_add-512.png',
        imageData2: 'https://cdn3.iconfinder.com/data/icons/e-commerce-105/300/clothes-purchase-store-onlineadd-512.png',
        output: false,
        noClick: 0,
        clicked2Times: false
      }
    },

    methods: {
      addFiles1 () {
        this.$refs.file1.click()
      },
      addFiles2 () {
        this.$refs.file2.click()
      },
      addButton () {
        this.clicked2Times = true
      },

      submitFiles () {
        let formData = new FormData()
        formData.append('files[1]', this.file1)
        // formData.append('files[2]', this.file2)
        console.log('aaaa')
        document.getElementById('submitButton').classList.add('loader')
        document.getElementById('submitButton').innerHTML = ''
        document.getElementById('submitButton').style = 'background-color: hsla(220,50%,90%,0.9);'
        setTimeout(function () {
          alert('Please wait for data to be process!')
        }, 1)
        fetch('http://192.168.13.9:8080/form', {
          method: 'POST',
          body: formData
        }).then(res => {
          setTimeout(function () {
            document.getElementById('xnxx1').src = 'http://192.168.13.9:8182/1.jpg'
            document.getElementById('xnxx2').src = 'http://192.168.13.9:8182/2.jpg'
            document.getElementById('xnxx3').src = 'http://192.168.13.9:8182/3.jpg'
            document.getElementById('xnxx4').src = 'http://192.168.13.9:8182/4.jpg'
            document.getElementById('xnxx5').src = 'http://192.168.13.9:8182/5.jpg'
            document.getElementById('submitButton').style = 'display: none;'
          }, 120000)
        })
      },

      handleFilesUpload1 () {
        console.log('aaaa')

        this.file1 = this.$refs.file1.files[0]

        if (this.noClick === 3) {
          return
        }
        console.log(this.file1 !== '')
        this.noClick |= (this.file1 !== '')
        if (this.noClick === 3) {
          this.addButton()
        }
        this.getImagePreviews(this.file1, 1)
      },
      handleFilesUpload2 () {
        console.log('bbbb')

        this.file2 = this.$refs.file2.files[0]

        if (this.noClick === 3) {
          return
        }
        console.log(this.file2 !== '')
        this.noClick |= ((this.file2 !== '') * 2)
        if (this.noClick === 3) {
          this.addButton()
        }
        this.getImagePreviews(this.file2, 2)
      },

      getImagePreviews (files, box) {
        console.log('display')

        if (/\.(jpe?g|png|gif)$/i.test(files.name)) {
          let reader = new FileReader()

          reader.addEventListener('load', function () {
            if (box === 1) {
              this.imageData1 = reader.result
            }
            if (box === 2) {
              this.imageData2 = reader.result
            }
          }.bind(this), false)

          reader.readAsDataURL(files)
        }
      }
    }
  }
</script>

<style>
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
  width: 45%;
  border: solid black 1px;
  margin-top: 2vh;
  background-color: hsl(220,50%,80%);
  padding: 14px 28px;
  border-radius: 5vh;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
	}

  #upload-button{
  background-color: lightblue;
  cursor:pointer;
  margin-left: 3%;
  border-radius: 5vh;
  margin-right: auto;
  width: 45%;
  height: auto;
  }
  .buttonHolder{
    text-align: center;
    padding: 40px 40px 40px 40px;
  }
  .bg{
  background-image: url("https://previews.123rf.com/images/oksancia/oksancia1806/oksancia180600038/103362842-blue-tribal-abstract-seamless-repeat-pattern-texture-great-for-folk-modern-wallpaper-backgrounds-inv.jpg");
  /* Full height */
  height: 150%; 

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  }
  .loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 65px;
  animation: spin 2s linear infinite;
  }

  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  }
</style>
