<template>
  <zy-button @click="handleClick">点我</zy-button>
</template>

<script>
  import Button from '../../components/Button.vue'

  export default {
    components: {
      zyButton: Button
    },
    methods: {
      handleClick () {
        alert('点我了  你好')
      }
    },
    created () {
      this.$http.get('findContacts').then(res => {
        console.log(res.data)
      })
    }
  }
</script>

<style scoped>
</style>
