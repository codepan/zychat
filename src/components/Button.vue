<template>
  <button class="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'zyButton',
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  .button{
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
    font-size: 12px;
    color: green;
  }
</style>
