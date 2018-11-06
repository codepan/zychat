<template>
    <div class="zy-login">
        <div class="zy-login-header">
            <kw-icon icon="close"></kw-icon>
        </div>
        <div class="zy-login-section">
            <div class="zy-login-title">账号登录</div>
            <span class="form-error" v-if="isLogin">{{message}}</span>
            <kw-form class="zy-login-form">
                <kw-form-item label="账号">
                    <kw-input placeholder="请输入账号" v-model="user.username"></kw-input>
                </kw-form-item>
                <kw-form-item label="密码">
                    <kw-input type="password" v-model="user.password" placeholder="请输入密码"></kw-input>
                </kw-form-item>
                <div class="zy-login-other-login">
                    没有账号？<a @click="handleRedirectRegister">马上注册</a>
                </div>
                <kw-button size="full" class="zy-login-next-step" @click="handleLoginClick">登录</kw-button>
            </kw-form>
        </div>
        <div class="zy-login-footer">
            <a>找回密码</a> | <a>更多选项</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'zyLogin',
        data () {
            return {
                user: {
                    username: '',
                    password: ''
                },
                message: '',
                isLogin: false
            }
        },
        methods: {
            handleRedirectRegister() {
              this.$router.push('/user/register')
            },
            handleLoginClick() {
                if (!this.user.username || !this.user.password) {
                    this.isLogin = true
                    this.message = '用户名或密码不能为空！'
                    return
                }
                this.user.password = this.$md5(this.user.password)
                this.$http.post('/user/login', this.user).then((res) => {
                    if (res && res.code !== 200) {
                        this.isLogin = true
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
<style lang="scss" type="text/scss">
    .zy-login {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 1rem;
        .zy-login-header {
            height: 2rem;
            line-height: 2rem;
            font-size: 1rem;
        }
        .zy-login-section {
            flex: 1;
            .zy-login-title {
                margin: 2rem 0;
                font-size: 1.3rem;
                font-weight: 400;
            }
            .zy-login-form {
                .zy-login-other-login {
                    display: inline-block;
                    margin: 2rem 0;
                    font-size: .8rem;
                }
                .zy-login-next-step {
                    margin-top: 2rem;
                    background: #A7DEA3;
                }
            }
        }
        .zy-login-footer {
            line-height: 3.5rem;
            text-align: center;
        }
    }
</style>