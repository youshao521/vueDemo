/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const state = {
  isMachineView: true,
  uninstallDisabled: false,
};

const mutations = {
  viewTypeChange(state, bool) {
    state.isMachineView = bool;
  },
  uninstallButtonChange(state, bool) {
    state.uninstallDisabled = bool;
  },
};

const getters = {
};

export default {
  state,
  getters,
  // actions,
  mutations,
};
