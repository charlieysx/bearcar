<template>
  <div id="left-nav">
    <div class="outer-container">
     <div class="inner-container">
      <div class="real">
        <!-- logo -->
        <div class="logo">
          <a class="header-logo" :href="homeLink"></a>
        </div>
        <div class="space"></div>
        <!-- logo 结束 -->
        <div class="avtar">
          <div class="img"></div>
          <div class="name">{{ userInfo.userName }}</div>
        </div>
        <el-menu 
          class="menu" 
          background-color="#545c64"
          text-color="#ffffff"
          :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">主页</span>
            </template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">二手车</span>
            </template>
            <el-menu-item index="2-1" @click="toCarList('waiting')">待上架列表</el-menu-item>
            <el-menu-item index="2-2" @click="toCarList('checking')">待检测列表</el-menu-item>
            <el-menu-item index="2-3" @click="toCarList('selling')">售卖中列表</el-menu-item>
            <el-menu-item index="2-4" @click="toCarList('ordering')">预约中列表</el-menu-item>
            <el-menu-item index="2-5" @click="toCarList('under')">已完成列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">资讯</span>
            </template>
            <el-menu-item index="3-1">资讯列表</el-menu-item>
            <el-menu-item index="3-2">新增资讯</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">用户</span>
          </el-menu-item> -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">用户</span>
            </template>
            <el-menu-item index="4-1">二手车用户</el-menu-item>
            <el-menu-item index="4-2">管理员</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item index="6-1" @click="signOut">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
     </div>
    </div>
    <div class="nav-space"></div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  SET_LOGIN_STATUS,
  SET_USER_INFO
} from 'STORE/mutation-types'

import { cachedUserInfo, removeAccessToken } from 'API/cacheService'

export default {
  name: 'left-nav',
  data () {
    return {
      homeLink: `${window.location.origin}/`
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    signOut () {
      removeAccessToken()
      cachedUserInfo.delete()
      this.$store.commit(SET_LOGIN_STATUS, false)
      this.$store.commit(SET_USER_INFO, {})
      this.$store.commit('SET_LOGIN_MASK_STATUS', { show: true, view: 'login' })
    },
    toCarList (type) {
      this.$router.push({name: type})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#left-nav
  height: 100%
  .nav-space
    width: 260px
    height: 1px
  .outer-container
    position: fixed
    height: 100%
    overflow: hidden
  .inner-container
    height: 100%
    overflow-x: hidden
    overflow-y: scroll
  /* for Chrome */
  .inner-container::-webkit-scrollbar
    display: none
  .real
    height: 100%
    width: 260px
    display: flex
    display: -webkit-flex
    flex-direction: column
    .logo
      position: fixed
      z-index: 1000
      width: 260px
      height: 70px
      background: $color-white
      .header-logo
        position: fixed
        margin: 23px 74px
        height: 24px
        width: 112px
        background: url('~IMAGES/bearcar_logo.png') no-repeat
        background-position: 50% 50%
        background-size: 112px 24px
        cursor: pointer
    .space
      width: 1px
      height: 70px
    .avtar
      width: 260px
      background: #545c64
      padding: 10px
      .img
        width: 56px
        height: 56px
        border-radius: 50%
        margin: 0 auto
        background-image: url('~IMAGES/xiaodai.png')
        background-repeat: no-repeat
        background-size: 48px 48px
        background-position: 4px
      .name
        width: 100%
        text-align: center
        color: $color-white
        padding: 10px
    .menu
      width: 261px
      flex: 1
</style>

