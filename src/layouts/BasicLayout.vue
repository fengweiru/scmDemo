<template>
  <pro-layout :menus="menus" :collapsed="collapsed" :mediaQuery="query" :isMobile="isMobile" :handleMediaQuery="handleMediaQuery" :handleCollapse="handleCollapse" v-bind="settings">
    <template v-slot:menuHeaderRender>
      <div @click="handleLinkMain">
        <img style="width:auto" src="~@/assets/logo.png" class="logo" alt="logo" />
      </div>
    </template>

    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <div></div>
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import { asyncRouterMap } from '@/router/router.config.js'
import { logout } from '@/utils/auth'
import { mainUrl } from '@/config/default'
export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent
  },
  data() {
    return {
      isProPreviewSite: process.env.NODE_ENV !== 'development',
      menus: [],
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false
    }
  },
  computed: {
    ...mapState({})
  },
  created() {
    // #region 统一粗暴拦截处理未登录状态
    try {
      let authInfo = localStorage.getItem('auth-info')
      if (authInfo) {
        if (!JSON.parse(authInfo).token) {
          logout()
        }
      } else {
        logout()
      }
    } catch (e) {
      console.log('登录', e)
    }
    // #endregion
    // #region 全局数据准备
    
    // #endregion
    const routes = asyncRouterMap.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    handleLinkMain() {
      window.location.href = mainUrl
    },
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
    handleSettingChange({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
