<template>
    <div id="test">
        <img src="./assets/test1.png" alt="">
        <img src="./assets/test2.jpg" alt="">
        <img src="./assets/test3.jpeg" alt="">
        <p>{{text}}</p>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        text: 'codepan yangcx 哈哈哈'
      }
    }
  }
</script>
<style scoped lang="scss">
    $color: red;
    #test{
        font-size: 12px;
        color: $color;

        width: 200px;
        height: 200px;
        border: 1px solid blue;
        border-radius: 20px;
    }
</style>
