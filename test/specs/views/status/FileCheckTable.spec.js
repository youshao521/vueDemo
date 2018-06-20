import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import FileCheckTable from '../../../../src/views/status/FileCheckTable.vue';

axiosInstance.defaults.baseURL = undefined;

describe('FileCheckTable.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    wrapper = createWrapper(FileCheckTable);
    wrapper.vm.$router.push('/login');

    moxios.stubOnce('GET', '/session?username=sysadmin', {
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
          username: 'sysadmin',
        },
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall();
  });

  it('选择每页展示的条数', () => {
    wrapper.vm.handleSizeChange(10);
    expect(wrapper.vm.pageSize).to.equal(10);
  });

  it('当前页码', () => {
    wrapper.vm.handleCurrentChange(3);
    expect(wrapper.vm.currentPage).to.equal(3);
  });
});
