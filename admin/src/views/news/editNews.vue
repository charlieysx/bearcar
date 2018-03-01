<template>
  <div id="edit-news">
    <div class="title">资讯-发布资讯</div>
    <div class="edit-news-wrap">
      <div class="editor-container">
        <UE :config="config" :id="uEdit" ref="ue"></UE>
      </div>
      <div class="right">
        <el-input
          class="input-title"
          placeholder="请输入标题"
          v-model="params.title">
        </el-input>
        <el-input
          class="input-title"
          placeholder="请输入文章来源"
          v-model="params.from">
        </el-input>
        <el-input
          class="input-title"
          type="textarea"
          :rows="6"
          :maxlength="150"
          resize="none"
          placeholder="请输入资讯简介"
          v-model="params.info">
        </el-input>
        <UP :default-img="params.imageUrl" @uploadSuccess="uploadSuccess"></UP>
        <div class="publish-btn" @click="publish">
          发布
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import UE from 'COMMON/ue/ue.vue'
import UP from 'COMMON/upload/upNewsImg.vue'

export default {
  components: {
    UE,
    UP
  },
  data () {
    return {
      config: {
        initialFrameWidth: 720,
        initialFrameHeight: 760,
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'emotion', 'insertcode', 'pagebreak', 'background', '|',
          'horizontal', 'spechars', 'snapscreen', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'preview', 'searchreplace', 'help'
        ]]
      },
      uEdit: 'uEdit',
      params: {
        title: '',
        info: '',
        imageUrl: '',
        content: '',
        from: ''
      },
      loading: ''
    }
  },
  methods: {
    ...mapActions([
      'publishNews'
    ]),
    getUEContent () {
      this.params.content = this.$refs.ue.getUEContent()
    },
    uploadSuccess (url) {
      this.params.imageUrl = url
    },
    publish () {
      this.getUEContent()
      if (!this.params.title) {
        this.error('请输入标题')
        return
      }
      if (!this.params.from) {
        this.error('请输入文章来源')
        return
      }
      if (!this.params.info) {
        this.error('请输入资讯简介')
        return
      }
      if (!this.params.imageUrl) {
        this.error('请上传封面图')
        return
      }
      if (!this.params.content) {
        this.error('资讯内容不能为空')
        return
      }
      this.showLoading('发布中')
      this.publishNews(this.params)
        .then((data) => {
          this.closeLoading()
          this.$router.push({
            name: 'news',
            params: {
              newsId: data.newsId
            }
          })
        })
        .catch(() => {
          this.closeLoading()
          this.error('发布失败')
        })
    },
    showLoading (message) {
      this.closeLoading()
      this.loading = this.$loading({
        lock: true,
        text: message,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    closeLoading () {
      if (this.loading) {
        this.loading.close()
        this.loading = ''
      }
    },
    error (err) {
      this.message = this.$message({
        showClose: true,
        message: err,
        type: 'error'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#edit-news
  width: 100%
  .title
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
    font-weight: bold
  .edit-news-wrap
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    margin-top: 20px
    .right
      width: 450px
      padding: 10px
      padding-top: 0px
      .input-title
        margin-bottom: 20px
      .publish-btn
        width: 430px
        padding: 15px
        margin-top: 20px
        font-weight: bold
        text-align: center
        border-radius: 5px
        color: $color-blue
        background: $color-white
        border: 1px solid $color-blue
        cursor: pointer
        &:hover
          color: $color-white
          background: $color-blue
</style>
