import { getLocales } from '../api/locale.js';
import { getMeta } from '../api/meta.js';
import { getPersonCardMode } from '../api/managements.js';

export default {
  FETCH_LOCALES({ commit, state }) {
    if (state.locales.length) {
      return Promise.resolve(state.locales);
    }
    return getLocales().then(({ data: { locales } }) => {
      commit('UPDATE', { locales });
      return locales;
    });
  },
  FETCH_META({ commit }) {
    return getMeta().then(({ data }) => {
      commit('UPDATE', {
        meta: data.meta,
        metaTime: new Date(),
      });
    });
  },
  FETCH_PERSON_MODE({ commit, state }) {
    if (state.personCardMode === 'unset') {
      return getPersonCardMode().then(({ data: { mode } }) => {
        commit('UPDATE', { personCardMode: mode });
        return mode;
      });
    }
    return Promise.resolve(state.personCardMode);
  },
};
