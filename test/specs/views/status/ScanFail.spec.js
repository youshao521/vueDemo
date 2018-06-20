import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ScanFail from '../../../../src/views/status/ScanFail.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ScanFail.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    wrapper = createWrapper(ScanFail);
    wrapper.vm.$router.push('/status');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall();
  });

  it('关闭扫描失败提示框', () => {
    wrapper.vm.visible = true;
    wrapper.vm.cancel();
    expect(wrapper.vm.visible).to.equal(false);
  });
});
