import moxios from 'moxios';
import { createWrapper } from '../../utils.js';
import { axiosInstance } from '../../../src/api/index.js';
import Login from '../../../src/views/Login.vue';

axiosInstance.defaults.baseURL = undefined;

describe.skip('Login.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(Login);
    wrapper.vm.$router.push('/login');

    moxios.stubOnce('GET', '/session?userId=sysadmin', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          salt: 'a8e2f7fd2745ee974f71ce801f209d50',
          lock: false,
          requireCaptcha: false,
          challenge: {
            code: '51d64fd0687f4ada31a1f05df79dcd70',
            id: 'ae16e7185f36c829aec5032901036235',
          },
          standardTime: '2018-05-05T11:50:53.875+08:00',
          user: {
            id: 'sysadmin',
            name: 'sysadmin',
            expiredAt: '2018-05-03T11:50:53.875+08:00',
            isAdmin: true,
          },
        },
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('切换多语言', (done) => {
    moxios.stubOnce('GET', '/locales', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          locales: [
            { code: 'zh_CN', name: '简体中文' },
            { code: 'en_US', name: 'English' },
          ],
        },
      },
    });
    moxios.wait(() => {
      wrapper.vm.handleLanguageChange('en_US');
      expect(wrapper.vm.errorTip).to.equal('');
      expect(wrapper.vm.showLanguageSelector).to.equal(false);
      expect(wrapper.vm.$i18n.locale).to.equal('en_US');
      done();
    });
  });

  it('登录失败，提示错误信息', (done) => {
    moxios.stubOnce('POST', '/session', {
      status: 200,
      response: {
        code: '0x00137004',
        msg: '密码错误',
        data: {
          firstVerification: '',
          salt: 'a8e2f7fd2745ee974f71ce801f209d50',
          isFirstLogin: false,
          challenge: {
            code: '7cb0a06ad631e5b545b25ab8490a984c',
            id: '5fbd617406dd4ff2f01b9004b6c14608',
          },
          lock: false,
          requireCaptcha: true,
          user: {
            id: 'sysadmin',
            name: 'sysadmin',
          },
        },
      },
    });

    wrapper.vm.userId = 'sysadmin';
    wrapper.vm.password = 'Abc123++';
    wrapper.vm.handleLogin({ preventDefault() {} });

    moxios.wait(() => {
      expect(wrapper.vm.errorTip).to.not.equal('');
      done();
    });
  });

  it('未输入用户名或密码，提示错误信息', () => {
    wrapper.vm.handleLogin({ preventDefault() {} });
    expect(wrapper.vm.errorTip).to.not.equal('');
  });

  it('密码过期，修改密码', (done) => {
    moxios.stubOnce('POST', '/session', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          needStrengthenPassword: false,
          firstVerification: '',
          salt: 'a8e2f7fd2745ee974f71ce801f209d50',
          isFirstLogin: false,
          challenge: {
            code: '7cb0a06ad631e5b545b25ab8490a984c',
            id: '5fbd617406dd4ff2f01b9004b6c14608',
          },
          lock: false,
          requireCaptcha: false,
          user: {
            id: 'sysadmin',
            name: 'sysadmin',
          },
        },
      },
    });

    wrapper.vm.userId = 'sysadmin';
    wrapper.vm.password = 'Abc123++';
    wrapper.vm.handleLogin({ preventDefault() {} });

    moxios.wait(() => {
      expect(wrapper.vm.dialogVisible).to.equal(true);
      expect(wrapper.vm.needOldPwd).to.equal(true);
      done();
    });
  });

  it('首次登录，修改密码', (done) => {
    moxios.stubOnce('POST', '/session', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          needStrengthenPassword: false,
          firstVerification: '',
          salt: 'a8e2f7fd2745ee974f71ce801f209d50',
          isFirstLogin: true,
          challenge: {
            code: '7cb0a06ad631e5b545b25ab8490a984c',
            id: '5fbd617406dd4ff2f01b9004b6c14608',
          },
          lock: false,
          requireCaptcha: false,
          user: {
            id: 'sysadmin',
            name: 'sysadmin',
          },
        },
      },
    });

    wrapper.vm.userId = 'sysadmin';
    wrapper.vm.password = 'Abc123++';
    wrapper.vm.handleLogin({ preventDefault() {} });

    moxios.wait(() => {
      expect(wrapper.vm.dialogVisible).to.equal(true);
      expect(wrapper.vm.needOldPwd).to.equal(false);
      done();
    });
  });

  it('密码强度不够，修改密码', (done) => {
    moxios.stubOnce('POST', '/session', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          needStrengthenPassword: true,
          firstVerification: '',
          salt: 'a8e2f7fd2745ee974f71ce801f209d50',
          isFirstLogin: false,
          challenge: {
            code: '7cb0a06ad631e5b545b25ab8490a984c',
            id: '5fbd617406dd4ff2f01b9004b6c14608',
          },
          lock: false,
          requireCaptcha: false,
          user: {
            id: 'sysadmin',
            name: 'sysadmin',
          },
        },
      },
    });

    wrapper.vm.userId = 'sysadmin';
    wrapper.vm.password = 'Abc123++';
    wrapper.vm.handleLogin({ preventDefault() {} });

    moxios.wait(() => {
      expect(wrapper.vm.dialogVisible).to.equal(true);
      expect(wrapper.vm.needOldPwd).to.equal(true);
      done();
    });
  });
});
