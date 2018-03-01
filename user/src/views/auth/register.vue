<template>
  <div id="register">
    <h1 class="register-title">捕捉一只新小熊er~</h1>
    <div class="register-form-wrap">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item prop="phone">
          <el-input type="text" :maxlength="11" v-model="registerForm.phone" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>
        <el-form-item class="form-item-reset" prop="password">
          <el-input type="password" :maxlength="16" placeholder="请设置你的登录密码" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item class="form-item-reset" prop="checkPassword">
          <el-input type="password" :maxlength="16" placeholder="请确认你的登录密码" v-model="registerForm.checkPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>
          &nbsp;我已阅读并同意<a target="_blank" href="/protocol" class="register-active">《小熊二手车用户注册协议》</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="btnDisabled" @click="submitForm('registerForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
      <div @click="toLogin" class="register-options">已有账号，前往登录 >></div>
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'

  export default {
    name: 'register',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        checked: false,
        registerForm: {
          phone: '',
          password: '',
          checkPassword: ''
        },
        registerRules: {
          phone: {
            validator: this.$validator.checkPhone, trigger: 'blur'
          },
          password: [
            { required: true, message: '未填写密码', trigger: 'blur' },
            { min: 6, message: '新密码不能少于6位', trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      btnDisabled () {
        return this.registerForm.phone === '' ||
            this.registerForm.password === '' ||
            this.registerForm.checkPassword === '' ||
            this.registerForm.password.length < 6 ||
            this.registerForm.checkPassword.length < 6 ||
            !this.checked
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              phone: this.registerForm.phone,
              password: this.registerForm.password
            }
            this.register(params)
              .then(() => {
                window.location.reload()
              })
              .catch((err) => {
                this.error(err.data.msg)
              })
          } else {
            return false
          }
        })
      },
      error (err) {
        this.message = this.$message({
          showClose: true,
          message: err,
          type: 'error'
        })
      },
      toLogin () {
        this.$emit('changeView', 'login')
      },
      ...mapActions([
        'register'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #register
    .register-title
      margin-top: 50px
      font-size: 38px
      color: $color-blue
      text-align: center
    .register-form-wrap
      margin: 50px auto 0
      width: 400px
    .register-options
      color: $color-mid-grey
      font-size: 14px
      text-align: right
      cursor: pointer
      &:hover
        color: $color-blue
    .register-active
      color: $color-blue

    .input-reset
      width: 295px
      display: inline-block
    .form-item-reset
      margin-bottom: 20px
    .el-button
      width: 100%
      height: 40px
      font-size: 16px
      border-radius: 5px
      border: none
      background: #24b9ff
      &.is-disabled
        border: none
        background: #e5e5e5
        color: #ffffff
        &:hover
          background: #e5e5e5
          color: #ffffff
</style>