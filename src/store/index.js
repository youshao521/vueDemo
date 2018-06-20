import Vuex from 'vuex';

import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';
import packages from './modules/package';
import install from './modules/install';
import status from './modules/status';

export default function createStore() {
  return new Vuex.Store({
    state: {
      locales: [],
      session: {},
      userPasswordConfig: {},
      personCardMode: 'unset',
      meta: {
        mode: 'independent',
        standardTime: '',
        system: {
          name: '',
          version: '',
        },
      },
      menus: [],
      serverTime: '',
      serverDate: '',
      metaTime: new Date(),
    },
    actions,
    getters,
    mutations,
    modules: {
      packages,
      install,
      status,
    },
  });
}
