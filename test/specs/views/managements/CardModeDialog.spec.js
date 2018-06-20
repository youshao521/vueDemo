import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import CardModeDialog from '../../../../src/views/managements/CardModeDialog.vue';

axiosInstance.defaults.baseURL = undefined;

describe('CardModeDialog.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      type: 'person',
    };
    wrapper = createWrapper(CardModeDialog, { propsData });
    moxios.stubOnce('PUT', '/persons/mode', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          mode: 'telephone',
        },
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('设置人员标识', (done) => {
    wrapper.vm.personCardMode = 'telephone';
    wrapper.vm.confirm();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            mode: 'telephone',
          },
        },
      }).then(() => {
        done();
      });
    });
  });
});
