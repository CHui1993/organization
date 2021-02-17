
const state = {
  isNeedUpdate: false,
  isLatest: false,
  isError: false,
  version: ''
}

const mutations = {
  UPDATE_ISNEEDUPDATE (state, isNeedUpdate) {
    state.isNeedUpdate = isNeedUpdate
  },
  UPDATE_ISLATEST (state, isLatest) {
    state.isLatest = isLatest
  },
  UPDATE_ISERROR (state, isError) {
    state.isError = isError
  },
  UPDATE_VERSION (state, version) {
    state.version = version
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
