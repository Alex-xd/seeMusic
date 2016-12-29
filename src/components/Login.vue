<template>
    <transition name="fade">
        <div class="login" v-show="show">
            <form>
                <div class="input-group">
                    <label for="J_login_uname">Username：</label>
                    <input type="text" id="J_login_uname" placeholder="username" v-model="uname">
                </div>
                <div class="input-group">
                    <label for="J_login_pwd">Password：</label>
                    <input type="password" id="J_login_pwd" placeholder="password" v-model="psw">
                </div>
                <div class="input-group">
                    <button class="submit submit--login" @click.prevent="login">Login</button>
                    <button class="submit submit--signup" @click.prevent="signup">Sign up</button>
                </div>
            </form>
            <span class="fa fa-close cancel" @click="cancel"></span>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import API from "api/API";
    import * as types from "store/mutation-types";

    export default {
        name: 'login',
        data() {
            return {
                uname: '',
                psw: ''
            }
        },
        computed: {
            ...mapState({
                show: state => state.showLogin
            })
        },
        methods: {
            login(){
                let params = {
                    uname: this.uname,
                    psw: this.psw
                };
                this.$store.dispatch('login', params)
            },
            signup(){
                // TODO
            },
            cancel() {
                this.$store.commit(types.LOGIN_SHOW_HIDE, 0);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .login {
        background: #b6423a;
        padding: 40px;
        color: #f2f2f2;
        .cancel {
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }

    .input-group {
        padding-top: 10px;
        text-align: right;
        letter-spacing: 0.6px;
        input {
            line-height: 20px;
            border: 1px solid #b6423a;
            text-indent: 5px;
            &:focus {
                outline: none;
                border: 1px solid #f9934e;
            }
        }
        .submit {
            color: inherit;
            border: none;
            background: #b6423a;
            cursor: pointer;
            transition: all .6s;
            padding: 5px;
            &--login {
                &:hover {
                    background: #f9774e;
                }
            }
            &--signup {
                &:hover {
                    background: #ffa91b;
                }
            }
        }
    }
</style>