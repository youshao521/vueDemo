/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const state = {
  selection: {
    componentPack: [],
    frameworkPack: [],
    dacDriverPack: [],
    languagePack: [],
    skinPack: [],
    documentPack: [],
    resourcePack: [],
  },
  isAllSelected: false,
  uploadNew: [],
};

const mutations = {
  clearUploadNew(state) {
    state.uploadNew = [];
  },
  setUploadNew(state, id) {
    const index = state.uploadNew.indexOf(id);
    if (index < 0) {
      state.uploadNew.push(id);
    }
  },
  setSelection(state, { id, type }) {
    const index = state.selection[type].indexOf(id);
    if (index < 0) {
      state.selection[type].push(id);
    }
  },
  clearSelection(state) {
    state.selection = {
      componentPack: [],
      frameworkPack: [],
      dacDriverPack: [],
      languagePack: [],
      skinPack: [],
      documentPack: [],
      resourcePack: [],
    };
  },
  removeSelection(state, { id, type }) {
    const index = state.selection[type].indexOf(id);
    state.selection[type].splice(index, 1);
  },
  rowSelectedChanged(state, { id, type }) {
    const index = state.selection[type].indexOf(id);
    if (index < 0) {
      this.commit('setSelection', { id, type });
    } else {
      this.commit('removeSelection', { id, type });
    }
  },
  isAllSelected(state, isAll) {
    state.isAllSelected = isAll;
  },

  setProxyInfo(state, info) {
    state.proxyInfo = info;
  },
};

const getters = {
  isSelected: (state, getters) => (row, type) => {
    if (state.selection[type].indexOf(row.id) > -1) {
      return true;
    }
    return false;
  },
  getSelection: (state, getters) => (type) => {
    if (state.selection[type]) {
      return state.selection[type];
    }
    return null;
  },
};

export default {
  state,
  getters,
  // actions,
  mutations,
};
