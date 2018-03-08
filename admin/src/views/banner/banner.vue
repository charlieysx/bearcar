<template>
  <div id="banner">
    <div class="title">banner管理</div>
    <div class="banner-wrap">
      <el-button
          type="primary"
          style="margin-bottom: 20px"
          @click="add"
          v-if="showAdd">
          添加Banner
      </el-button>
      <el-table
        :data="bannerList"
        height="800"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="名称">
        </el-table-column>
        <el-table-column
          label="图片"
          width="200">
          <template slot-scope="scope">
            <img 
              :src="scope.row.banner" 
              style="max-width: 100%;max-height: 40px; cursor: pointer"
              @click="showImg(scope.row.banner)">
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          width="92">
          <template slot-scope="scope">
            <a :href="scope.row.link" target="_blank" v-if="scope.row.link">新标签打开</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="上架时间"
          width="180"
          :formatter="formatPublishTime">
        </el-table-column>
        <el-table-column
          prop="underTime"
          label="下架时间"
          width="180"
          :formatter="formatUnderTime">
        </el-table-column>
        <el-table-column
          prop="position"
          label="位置"
          width="50">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
          <template slot-scope="scope">
              <el-tag :type="scope.row.status === '0' ? 'success' : 'danger'">
                {{ formatStatus(scope.row.status) }}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope"
            v-if="scope.row.status === '0'">
            <el-button
              size="mini"
              @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="under(scope.row)">
              下架
              </el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    <add-banner ref="addBanner" :add="isAdd" :banner="banner"></add-banner>
    <!-- 查看图片 -->
    <image-viewer ref="imageViewer" :image="imageUrl" :single="true"></image-viewer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

import addBanner from 'VIEWS/banner/addBanner'
import imageViewer from 'COMMON/imageViewer/imageViewer'

export default {
  name: 'banner',
  data () {
    return {
      isAdd: true,
      banner: {},
      bannerList: [],
      showAdd: false,
      params: {
        page: 0,
        pageSize: 15
      },
      imageUrl: ''
    }
  },
  components: {
    addBanner,
    imageViewer
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '4-1')
    this.getList()
  },
  methods: {
    ...mapActions([
      'getBannerList',
      'underBanner'
    ]),
    getList () {
      this.getBannerList(this.params)
        .then((data) => {
          this.bannerList = data
          this.showAdd = true
        })
        .catch((err) => {
          this.$toast({
            message: err.data.msg
          })
        })
    },
    formatPublishTime (row, column) {
      return this.formatTime(row.time)
    },
    formatUnderTime (row, column) {
      return row.underTime ? this.formatTime(row.underTime) : '-'
    },
    formatTime (time) {
      return moment(parseInt(time) * 1000).format('YYYY-MM-DD HH:ss')
    },
    formatStatus (value) {
      return value === '0' ? '上架中' : '已下架'
    },
    add () {
      this.isAdd = true
      this.$refs.addBanner.$refs.modal.showModal()
    },
    edit (banner) {
      this.isAdd = false
      this.banner = banner
      this.$refs.addBanner.$refs.modal.showModal()
    },
    under (banner) {
      this.$confirm('确定下架该banner?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.underBanner(banner.id)
          .then((data) => {
            this.$toast({
              message: '下架成功'
            })
            window.location.reload()
          })
          .catch((err) => {
            this.$toast({
              message: err.data.msg
            })
          })
      })
    },
    showImg (url) {
      this.imageUrl = url
      this.$refs.imageViewer.$refs.modal.showModal()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#banner
  width: 100%
  background: $color-bg-blue
  .title
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
    font-weight: bold
  .banner-wrap
    width: 1170px
    margin: 0 auto
    padding: 20px
    text-align: center
    background: $color-white
    border: 1px solid #eeeeee
    .search-page
      width: 100%
      margin-top: 20px
      display: flex
      display: -webkit-flex
      justify-content: center
</style>
