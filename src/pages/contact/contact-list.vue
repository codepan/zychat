<template>
  <div class="zy-contact">
    <kw-list>
      <kw-item icon-type="avatar" :title="user.nickname" is-link :divide-top="10">
        <img src="../../assets/test1.png" slot="icon">
        <span slot="subtitle">微信号:{{user.username}}</span>
      </kw-item>
      <kw-item is-link divide>钱包</kw-item>
      <kw-item is-link>收藏</kw-item>
      <kw-item is-link>相册</kw-item>
      <kw-item is-link>卡包</kw-item>
      <kw-item is-link>表情</kw-item>
      <kw-item is-link divide>设置</kw-item>
    </kw-list>
  </div>
</template>

<script>
  export default {
    name: 'contactList',
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    },
    methods: {
      handleClick() {
        alert('点我了  你好')
      }
    }
  }
</script>
