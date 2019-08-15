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
     
      <img style = "margin-top: 3vh;"src="https://cdn1.iconfinder.com/data/icons/user-pics/512/user_add-512.png" id = "upload-button" v-on:click="addFiles1()"> </img>
      <img style = "margin-top: 3vh;"src="https://cdn3.iconfinder.com/data/icons/e-commerce-105/300/clothes-purchase-store-onlineadd-512.png" id = "upload-button" v-on:click="addFiles2()"> </img>
    </div>

    <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="submitFiles()" class = "block" style = "font-size: 30px;" v-if="clicked2Times">Try on</button>
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

    data () {
      return {
        file1: '',
        file2: '',
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
        formData.append('files[2]', this.file2)

        fetch('http://localhost:8081/form', {
          method: 'POST',
          body: formData
        }).then(res => { console.log('TODO') })
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
      },

      getImagePreviews () {
        for (let i = 0; i < this.files.length; i++) {
          if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
            let reader = new FileReader()

            reader.addEventListener('load', function () {
              this.$refs['image' + parseInt(i)][0].src = reader.result
            }.bind(this), false)

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
  height: 100%; 

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  }
</style>
