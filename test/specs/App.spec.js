import moxios from 'moxios';
import { createWrapper } from '../utils.js';
import { axiosInstance } from '../../src/api/index.js';
import App from '../../src/App.vue';

axiosInstance.defaults.baseURL = undefined;

describe('App.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(App);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('获取初始 session', (done) => {
    moxios.stubOnce('GET', '/session', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          salt: '',
          requireCaptcha: false,
          challenge: { code: '', id: '' },
        },
      },
    });

    moxios.wait(() => {
      expect(wrapper.vm.$store.state.session).to.deep.equal({
        salt: '',
        requireCaptcha: false,
        challenge: { code: '', id: '' },
      });
      done();
    });
  });

  it('获取 meta 信息', (done) => {
    moxios.stubOnce('GET', '/meta', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          meta: {
            institution: '1',
            productName: '2',
            standardTime: '2017-11-08T06:46:17.855Z',
          },
        },
      },
    });

    moxios.wait(() => {
      expect(wrapper.vm.$store.state.meta).to.deep.equal({
        institution: '1',
        productName: '2',
        standardTime: '2017-11-08T06:46:17.855Z',
      });
      done();
    });
  });
});
