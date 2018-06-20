import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ErrcodeTable from '../../../../src/views/status/ErrcodeTable.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ErrcodeTable.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    wrapper = createWrapper(ErrcodeTable);
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

  it('错误码搜索', () => {
    wrapper.vm.value = [
      {
        code: '0x00410003',
        description: '服务安装错误',
        measure: '检查tomcat安装目录',
      },
      {
        code: '0x00410004',
        description: '服务安装错误',
        measure: '检查tomcat安装目录',
      },
    ];
    wrapper.vm.filterKeyCode('003');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.valueCopy.length).to.equal(1);
    });
  });
});
