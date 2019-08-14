<template>
  <div id="output-img">

  </div>
</template>

<script>
  export default {
    name: 'Output',
    data () {},
    beforeMount () {
      function loadError (message, error) {
        this.$vs.notify({
          title: 'Cannot load load ' + message + ' resource from backend',
          text: error,
          color: 'danger',
          position: 'top-center'
        })
      }
      this.$vs.loading({
        type: 'border'
      })
    },
    method: {}
  }
</script>
