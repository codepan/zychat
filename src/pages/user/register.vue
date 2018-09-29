<template>
  <div class="register-wrapper">
    <sv-form>
      <sv-form-group>
        <sv-form-item label="手机号">
          <sv-input placeholder="请输入手机号" v-model="user.phone"></sv-input>
        </sv-form-item>
        <sv-form-item label="密码">
          <sv-input placeholder="请输入密码" v-model="user.password"></sv-input>
        </sv-form-item>
      </sv-form-group>
    </sv-form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        user: {
          phone: '',
          password: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
