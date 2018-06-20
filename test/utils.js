import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import HUI from 'hui';
import { sync } from 'vuex-router-sync';
import { mount, createLocalVue } from '@vue/test-utils';

import createStore from '../src/store/index.js';
import createRouter from '../src/router/index.js';

export function createWrapper(Component, opts) {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  localVue.use(VueI18n);
  localVue.use(HUI);

  const store = createStore();
  const router = createRouter();
  const i18n = new VueI18n({ silentTranslationWarn: true });

  sync(store, router);

  return mount(Component, Object.assign({ localVue, store, router, i18n }, opts));
}
