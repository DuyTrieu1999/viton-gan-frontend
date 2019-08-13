<template>
  <div id="upload">
    <vs-upload ref="upl" @on-success="successUpload" v-on:change="handleFileUpload"></vs-upload>
    <vs-button @click="upload"></vs-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        file: ''
      }
    },
    methods: {
      successUpload () {
        this.$vs.notify({color: 'success', title: 'Upload Success', text: 'You have uploaded successfully!'})
      },
      handleFileUpload () {
        this.file = this.$refs.upl.filesx[0]
        let formData = new FormData()
        formData.append('human', this.file)
        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        }).then(res => { console.log('TODO') })
      },
      upload () {}
    }
  }
</script>
