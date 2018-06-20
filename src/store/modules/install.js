/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const state = {
  activeMachine: null,
  machineIds: [],
  relationMachine: {},
  dependenMachine: '',
};

const mutations = {
  setDependenMachine(state, obj) {
    state.dependenMachine = obj;
  },
  setActiveMachine(state, obj) {
    state.activeMachine = obj;
  },
  setMachineIds(state, id) {
    if (state.machineIds.indexOf(id) < 0) {
      state.machineIds.push(id);
    }
  },
  clearRelationMachine(state) {
    state.relationMachine = {};
  },
  clearMachineIds(state) {
    state.machineIds = [];
  },
  setRelationMachine(state, machine) {
    state.relationMachine[machine.id] = machine;
  },
  removeRelationMachine(state, machine) {
    delete state.relationMachine[machine.id];
  },
  removeMachineIds(state, id) {
    const index = state.machineIds.indexOf(id);
    state.machineIds.splice(index, 1);
  },
  machineSelectedChanged(state, machine) {
    const mId = machine.id;
    const index = state.machineIds.indexOf(mId);
    if (index < 0) {
      this.commit('setMachineIds', mId);
      state.relationMachine[mId] = machine;
    } else {
      this.commit('removeMachineIds', mId);
      delete state.relationMachine[mId];
    }
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
