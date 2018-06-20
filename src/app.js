import 'normalize.css';
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { sync } from 'vuex-router-sync';
import HUI from 'hui';

/* eslint-disable import/no-unresolved */
// 构建完的 HUI 样式
import '../temp/theme/index.css';
// 构建完的图标
import '../temp/icons/rm-icons.css';
/* eslint-enable */
import './hui-reset.css';

import App from './App.vue';
import createStore from './store/index.js';
import createRouter from './router/index.js';

import { setTitle, setMenus, setLanguage, getLanguageType } from './utils.js';

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(HUI);

export default function createApp() {
  const store = createStore();
  const router = createRouter();
  const i18n = new VueI18n({ silentTranslationWarn: true });

  sync(store, router);

  router.beforeEach((to, from, next) => {
    if (Object.keys(i18n.messages).length) {
      return next();
    }
    return store.dispatch('FETCH_LOCALES')
      .then((locales) => {
        const locale = getLanguageType();
        if (locale) {
          return locale;
        }
        const browserLang = (
          window.navigator.language ||
          window.navigator.userLanguage
        ).replace(/-/g, '_').toLowerCase();
        const codes = locales.map(({ code }) => code);
        const fallbackLang = (
          codes.find(code => code.toLowerCase() === browserLang) ||
          codes[0] ||
          'en_US'
        );
        return fallbackLang;
      })
      .then(code => setLanguage(code, i18n))
      .then(() => (
        to.name === 'login'
          ? Promise.resolve()
          : setMenus({ store, i18n })
      ))
      .then(() => next());
  });

  const app = new Vue({
    el: '#app',
    watch: {
      '$i18n.locale': (code) => {
        setLanguage(code, i18n)
          .then(() => store.dispatch('FETCH_META'))
          .then(() => setTitle({ store, i18n }));
      },
    },
    router,
    store,
    i18n,
    render: h => h(App),
  });

  return { app, router, store, i18n };
}

createApp();
