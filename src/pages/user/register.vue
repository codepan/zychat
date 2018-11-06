<template>
    <div class="zy-register">
        <span class="form-error" v-if="isRegister">{{message}}</span>
        <kw-form class="zy-register-form">
            <kw-form-group>
                <kw-form-item label="账号">
                    <kw-input placeholder="请输入账号" v-model="user.username"></kw-input>
                </kw-form-item>
                <kw-form-item label="昵称">
                    <kw-input placeholder="请输入昵称" v-model="user.nickname"></kw-input>
                </kw-form-item>
                <kw-form-item label="密码">
                    <kw-input placeholder="请输入密码" type="password" v-model="user.password"></kw-input>
                </kw-form-item>
                <kw-button size="full" class="zy-register-button" @click="handleRegisterClick">注册</kw-button>
            </kw-form-group>
        </kw-form>
    </div>
</template>

<script>
    export default {
        name: 'zyRegister',
        data() {
            return {
                isRegister: false,
                message: '',
                user: {
                    username: '',
                    password: '',
                    nickname: ''
                }
            }
        },
        methods: {
            handleRegisterClick() {
                if (!this.user.username || !this.user.password) {
                    this.isRegister = true
                    this.message = '用户名或密码不能为空!'
                    return
                }
                this.user.password = this.$md5(this.user.password)
                this.$http.post('/user/register', this.user).then((res) => {
                    if (res && res.code !== 200) {
                        this.isRegister = true
                        this.message = res.message
                        return
                    }
                    localStorage.setItem('user', JSON.stringify(res.data))
                    this.$router.push('/home')
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .zy-register {
        .zy-register-form {
            padding: 1rem;
            .zy-register-button {
                margin-top: 2rem;
                background: #A7DEA3;
            }
        }
    }
</style>
