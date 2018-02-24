<template>
  <div id="reset-psw">
    <h1 class="reset-psw-title">太好了，我一直在等你回来~</h1>
    <div class="reset-psw-form-wrap">
      <el-form :model="resetForm" ref="resetForm">
        <el-form-item
          prop="phone"
          :rules="[{
            validator: $validator.checkPhone, trigger: 'blur'
          }]"
          :error="formError.phone">
          <el-input type="text" :maxlength="11" v-model="resetForm.phone" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>
        <el-form-item class="form-item-reset"
          prop="newPassword"
          :rules="[
            { required: true, message: '未填写新密码', trigger: 'blur' },
            { min: 6, message: '新密码不能少于6位', trigger: 'blur' }
          ]"
          :error="formError.newPassword">
          <el-input type="password" :maxlength="16" v-model="resetForm.newPassword" placeholder="请设置你的新密码！新密码！"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>
          &nbsp;我已阅读并同意<a :href="protocalLink" target="_blank" class="reset-psw-active">《小熊二手车用户注册协议》</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="btnDisabled" @click="formSubmit('resetForm')">确认重置密码</el-button>
        </el-form-item>
      </el-form>
      <div @click="toLogin" class="reset-psw-options">想起了密码，前往登录 >></div>
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'reset-psw',
    data () {
      return {
        checked: false,
        resetForm: {
          phone: '',
          newPassword: ''
        },
        formError: {
          phone: '',
          newPassword: ''
        }
      }
    },
    computed: {
      btnDisabled () {
        return this.resetForm.phone === '' || this.resetForm.newPassword === '' || !this.checked
      }
    },
    methods: {
      toLogin () {
        this.$emit('changeView', 'login')
      },
      formSubmit (formName) {
        this.error('该功能暂不可用~')
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     let params = {
        //       userName: this.resetForm.phone,
        //       newPassword: this.resetForm.newPassword
        //     }
        //     this.resetPassword(params)
        //       .then(() => {
        //         this.$emit('changeView', 'login')
        //       })
        //       .catch((err) => {
        //         this.error(err.data.msg)
        //       })
        //   } else {
        //     return false
        //   }
        // })
      },
      error (err) {
        this.message = this.$message({
          showClose: true,
          message: err,
          type: 'error'
        })
      },
      ...mapActions([
        'resetPassword'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #reset-psw
    .reset-psw-title
      margin-top: 50px
      font-size: 38px
      color: $color-blue
      text-align: center
    .reset-psw-form-wrap
      margin: 50px auto 0
      width: 400px
    .reset-psw-options
      color: $color-mid-grey
      font-size: 14px
      text-align: right
      cursor: pointer
      &:hover
        color: $color-blue
    .reset-psw-active
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