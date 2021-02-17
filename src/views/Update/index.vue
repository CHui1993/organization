<template>
  <div class="update-wrapper">
    <div class="update-container">
      <p class="title">
        有新版本更新！
      </p>
      <p class="edition">
        V{{version}} (版本号）
      </p>
      <el-progress color="#DC2828" :percentage="50" />
      <el-button @click="clickHandler">
        立即更新
      </el-button>
      <p class="give-up">
        以后再说
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  name: 'Update',
  data () {
    return {
      redirect: '',
      downloaded: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('app', [
      'isNeedUpdate',
      'isLatest',
      'version'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      ipcRenderer.on('downloadProgress', this.downloadProgress)
      ipcRenderer.on('updateDownloaded', this.downloadProgress)
    },
    clickHandler () {
      this.startUpdate()
      // this.$router.push({ path: this.redirect || '/' })
    },
    startUpdate () {
      ipcRenderer.send('startUpdate')
    },
    downloadProgress (progress) {
      console.log(111111, progress)
    },
    updateDownloaded () {
      this.downloaded = true
    }

  },
  beforeDestroy () {

  }

}
</script>

<style lang="scss" scoped>
  .update-wrapper {
    height: 100vh;
    background: #605657;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .update-container {
    width: 500px;
    height: 500px;
    background: rgba(38,39,41,0.60);
    border-radius: 20px;
    text-align: center;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #FFFFFF;
      line-height: 24px;
      margin-top: 120px;
    }
    .edition {
      opacity: 0.4;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 16px;
      margin-top: 20px;
    }
  }
  .el-progress {
    margin: 65px 56px 61px;
  }
  .el-button {
    width: 200px;
    height: 40px;
    background: #FFE2AA;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #262729;
    border-radius: 2px;
  }
  /deep/ .el-progress-bar__outer {
    background: #504E4E;
    height: 4px !important;
  }
  .give-up {
    opacity: 0.4;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 14px;
    padding: 26px 0;
    width: 200px;
    margin: 0 auto;
    cursor: pointer
  }
  /deep/.el-progress-bar {
    height: 4px;
  }
</style>
