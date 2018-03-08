<template>
  <div id="table-user">
    <div class="title">二手车用户  （总数：{{ count }}）</div>
    <div class="table-user-wrap">
      <el-table
        :data="userList"
        height="800"
        border
        stripe
        highlight-current-row
        @sort-change="sort"
        style="width: 100%">
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="sellCount"
          label="卖车(辆)">
        </el-table-column>
        <el-table-column
          prop="buyCount"
          label="买车(辆)">
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="预约(辆)">
        </el-table-column>
        <el-table-column
          prop="registerTime"
          label="注册时间"
          width="180"
          :formatter="formatRegisterTime">
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="最后登录时间"
          width="180"
          :formatter="formatLastLoginTime">
        </el-table-column>
        <el-table-column
          prop="loginCount"
          label="登录次数">
        </el-table-column>
        <el-table-column
          prop="status"
          label="账号状态"
          :formatter="formatStatus">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="search-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="params.pageSize"
          @current-change="pageChange"
          :current-page="currentPage"
          :total="count">
        </el-pagination>
      </div>
      <!-- 分页 结束 -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'table-user',
  data () {
    return {
      count: 0,
      userList: [],
      currentPage: 0,
      params: {
        page: 0,
        pageSize: 20,
        sort: {
          type: '',
          value: ''
        }
      }
    }
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '5-1')
    this.getList()
  },
  methods: {
    ...mapActions([
      'getUserList'
    ]),
    pageChange (currentPage) {
      this.params.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    sort (column) {
      if (column.prop === null) {
        this.params.sort.type = ''
        this.params.sort.value = ''
      } else {
        this.params.sort.type = column.prop
        this.params.sort.value = (column.order === 'ascending' ? '1' : '0')
      }
      this.params.page = 0
      this.getList()
    },
    getList () {
      this.getUserList(this.params)
        .then((data) => {
          this.userList = data.list
          this.count = data.count
        })
        .catch((err) => {
          this.userList = []
          this.count = 0
          this.$toast({
            message: err.data.msg
          })
        })
    },
    formatRegisterTime (row, column) {
      return this.formatTime(row.registerTime)
    },
    formatLastLoginTime (row, column) {
      return this.formatTime(row.lastLoginTime)
    },
    formatTime (time) {
      return moment(parseInt(time) * 1000).format('YYYY-MM-DD HH:ss')
    },
    formatStatus (row, column) {
      return row.status === '1' ? '正常' : (row.status === '2' ? '被删除' : '异常')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#table-user
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
  .table-user-wrap
    width: 1170px
    margin: 0 auto
    padding: 20px
    background: $color-white
    border: 1px solid #eeeeee
    .search-page
      width: 100%
      margin-top: 20px
      display: flex
      display: -webkit-flex
      justify-content: center
</style>
