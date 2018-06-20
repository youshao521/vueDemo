<template>
  <div id="app">
    <global-header v-if="hasGlobalHeader"></global-header>
    <div :style="{ top: hasGlobalHeader ? '56px' : '0' }" class="main-view">
      <router-view></router-view>
    </div>
    <change-password
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :need-old-pwd="true"
    >
    </change-password>
  </div>
</template>

<script>
import { getSession } from './api/session.js';

import GlobalHeader from './components/GlobalHeader.vue';
import ChangePassword from './components/ChangePassword.vue';
import { setTitle } from './utils.js';

export default {
  name: 'app',
  components: {
    GlobalHeader,
    ChangePassword,
  },
  data() {
    return {
      tid: 0,
      hasGlobalHeader: false,
      fetchedTime: Date.now(),
      expireWarnDay: 15,
      dialogVisible: false,
      showOnce: true,
    };
  },
  watch: {
    $route(route) {
      this.hasGlobalHeader = (
        route.name !== 'index' &&
        route.name !== 'login' &&
        !/^\/independents/.test(route.path) &&
        !this.$store.getters.isEmbed
      );
      if (
        this.showOnce &&
        this.$route.name !== 'login' &&
        this.$store.state.session.user &&
        this.theDayBeforeExpired() <= this.expireWarnDay &&
        !this.$store.getters.isEmbed
      ) {
        this.showOnce = false;
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, this.$t('passwordNearExpireWarn', { days: this.theDayBeforeExpired() })),
            h('a', {
              style: 'cursor: pointer;padding-left:12px;',
              on: {
                click: () => {
                  this.dialogVisible = true;
                },
              },
            },
            this.$t('changePassword')),
          ]),
          type: 'warning',
          showClose: true,
        });
      }
    },
  },
  mounted() {
    this.computeTime();
    this.tid = setInterval(() => {
      this.computeTime();
    }, 1000);
    getSession().then(({ data }) => {
      this.$store.commit('UPDATE', { session: data });
      this.tryJumpToHome();
    });
    this.$store.dispatch('FETCH_META').then(() => {
      setTitle({ store: this.$store, i18n: this.$i18n });
    });
  },
  destroyed() {
    clearInterval(this.tid);
  },
  methods: {
    tryJumpToHome() {
      if (
        this.$route.name === 'login' &&
        this.$store.state.session.user
      ) {
        this.$router.push('/');
      }
    },
    computeTime() {
      const { standardTime } = this.$store.state.meta;
      if (!standardTime) {
        this.$store.commit('UPDATE', {
          serverTime: '--:--',
          serverDate: '----/--/--',
        });
        return;
      }
      const st = new Date(standardTime || this.fetchedTime);
      const stn = new Date(+st + (Date.now() - this.fetchedTime));
      this.$store.commit('UPDATE', {
        serverTime: [
          `00${stn.getHours()}`.slice(-2),
          `00${stn.getMinutes()}`.slice(-2),
        ].join(':'),
        serverDate: `${stn.getFullYear()}/${stn.getMonth() + 1}/${stn.getDate()}`,
      });
    },
    theDayBeforeExpired() {
      const { user: { expiredAt }, standardTime } = this.$store.state.session;
      const diffMs = new Date(expiredAt) - new Date(standardTime);
      if (expiredAt === '') return this.expireWarnDay + 1000000000;
      return Math.ceil(diffMs / 1000 / 60 / 60 / 24);
    },
  },
};
</script>

<style scoped>
.main-view {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

<style>
@font-face {
  font-family: "DINCond";
  src: url("../assets/DINConReg.woff");
}
* {
  font-family: 'Microsoft YaHei';
}
html {
  line-height: normal;
}
body {
  font-size: 12px;
  color: #4d4d4d;
  overflow: hidden;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.size-16 {
  font-size: 16px;
}
::-ms-reveal {
  display: none;
}
</style>
