<template>
  <span v-if="currentUser && currentUser.name" class="ant-pro-account-avatar">
    {{ timeFix() }}
    <span class="name">{{ currentUser.name }}</span>
    <span @click="handleLogout">退出</span>
  </span>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import request from '@/utils/request'
import { logout } from '@/utils/auth'
import { timeFix } from '@/utils/util'
export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    timeFix,
    handleLogout(e) {
      Modal.confirm({
        title: '提示',
        content: '确定退出？',
        onOk: () => {
          logout()
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.name {
  margin-right: 10px;
}
</style>
