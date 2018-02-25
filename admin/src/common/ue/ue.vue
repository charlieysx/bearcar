<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>

import 'STATIC/UE/ueditor.config.js'
import 'STATIC/UE/ueditor.all.min.js'
import 'STATIC/UE/lang/zh-cn/zh-cn.js'
import 'STATIC/UE/ueditor.parse.min.js'

export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  mounted () {
    const _this = this
    this.editor = window.UE.getEditor(this.id, this.config) // 初始化UE
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    },
    getUEContentTxt () { // 获取纯文本内容方法
      return this.editor.getContentTxt()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
