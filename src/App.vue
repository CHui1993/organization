<template>
    <router-view/>
</template>
<script>
import { ipcRenderer } from 'electron'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  created () {
    this.init()
  },
  methods: {
    ...mapMutations('app', ['UPDATE_ISNEEDUPDATE', 'UPDATE_ISLATEST', 'UPDATE_ISERROR', 'UPDATE_VERSION']),
    init () {
      ipcRenderer.on('update-available', this.updateAvailable)
      ipcRenderer.on('update-not-available', this.updateNotAvailable)
      ipcRenderer.on('error', this.error)
    },
    updateAvailable (event, { version }) {
      console.log('需要更新')
      this.UPDATE_ISNEEDUPDATE(true)
      this.UPDATE_VERSION(version)
      this.$router.push('/update')
    },
    updateNotAvailable () {
      console.log('不需要更新')
      this.UPDATE_ISLATEST(true)
      this.$router.push('/update')
    },
    error (event, error) {
      console.log('error===', error)
      this.UPDATE_ISERROR(true)
    }
  },
  destroyed () {
    ipcRenderer.removeAllListeners()
  }
}
</script>
