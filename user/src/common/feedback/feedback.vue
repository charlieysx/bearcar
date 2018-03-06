<template>
  <div id="feedback">
    <modal-layout width="500" ref="modal">
      <div class="feedback-wrap">
        <h3 class="title">提交反馈意见</h3>
        <el-form :model="feedbackForm" :rules="feedbackRule" ref="feedbackForm">
          <el-form-item prop="content">
            <el-input type="textarea" resize="none" :rows="5" v-model="feedbackForm.content" placeholder="如果您对我们的产品不满意，可以跟我们反馈，我们会做的更好。"></el-input>
          </el-form-item>
          <el-form-item prop="contact">
            <el-input type="text" :maxlength="11" v-model="feedbackForm.contact" placeholder="留下您的手机号码，方便我们联系(选填)"></el-input>
          </el-form-item>
          <div class="btn-wrap"><el-button class="reset-width" type="primary" @click="submit('feedbackForm')">提交</el-button></div>
        </el-form>
      </div>
    </modal-layout>
  </div>
</template>
<script>
  import modalLayout from 'COMMON/modalLayout/modalLayout'
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'feedback',
    components: {
      modalLayout
    },
    data () {
      let checkPhone = (rule, value, cb) => {
        if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
          return cb(new Error('嗨，这不是手机号码'))
        } else {
          cb()
        }
      }
      return {
        feedbackForm: {
          content: '',
          contact: ''
        },
        feedbackRule: {
          content: [
            { required: true, whitespace: true, message: '请输入反馈意见', trigger: 'blur' }
          ],
          contact: [
            { validator: checkPhone, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$toast({
              message: '提交反馈意见成功!'
            })
            this.$refs.modal.closeModal()
            // this.feedback(this.feedbackForm)
            //   .then(() => {
            //     this.$toast({
            //       message: '提交反馈意见成功!'
            //     })
            //     this.$refs.modal.closeModal()
            //   })
            //   .catch((err) => {
            //     this.$toast({
            //       message: err.errorMessage
            //     })
            //   })
            // this.feedbackForm.content = ''
            // this.feedbackForm.contact = ''
          }
        })
      },
      ...mapActions([
        'feedback'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  #feedback
    background: #FFFFFF
    .title
      margin-bottom: 30px
    .feedback-wrap
      padding: 30px
      background: #FFFFFF
    .btn-wrap
      display: flex
      justify-content: flex-end
    .reset-width
      width: 100px
</style>
