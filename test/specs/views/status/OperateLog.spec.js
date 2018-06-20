import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import OperateLog from '../../../../src/views/status/OperateLog.vue';

axiosInstance.defaults.baseURL = undefined;

describe('OperateLog.vue', () => {
  describe('维护记录', () => {
    let wrapper = null;

    beforeEach(() => {
      moxios.install(axiosInstance);
      wrapper = createWrapper(OperateLog);
      wrapper.vm.$router.push('/status/machines/C380E3AB-9759-4987-A173-25C6C9ACA3B2/components/activemq514win64_1.0.0');
      moxios.stubOnce('GET', '/machines/C380E3AB-9759-4987-A173-25C6C9ACA3B2/components/activemq514win64_1.0.0/actions', {
        status: 200,
        response: {
          code: '0',
          data: {
            total: 3,
            perPage: 20,
            lastPage: 1,
            page: 1,
            actions: [{
              createdAt: '2018-02-11T11:27:11.952+08:00',
              ip: '10.19.139.18',
              description: '编辑服务配置:ActiveMQ服务-10.20.147.72-#1',
              state: 'error',
              message: '修改服务配置信息失败',
              userId: 'sysadmin',
            }, {
              createdAt: '2018-02-05T17:51:58.111+08:00',
              ip: '10.19.132.16',
              description: '安装:ActiveMQ_1.0.0',
              state: 'finish',
              message: '',
              userId: 'sysadmin',
            }, {
              createdAt: '2018-02-05T17:43:47.660+08:00',
              ip: '10.19.132.101',
              description: '安装:ActiveMQ_1.0.0',
              state: 'finish',
              message: '',
              userId: 'sysadmin',
            }],
          },
          msg: '',
        },
      });
    });

    afterEach(() => {
      // wrapper.vm.$destroy();
      moxios.uninstall(axiosInstance);
    });

    it('loadError', () => {
      wrapper.vm.loadError();
      expect(wrapper.vm.operateList.length).to.equal(0);
    });
  });
});
