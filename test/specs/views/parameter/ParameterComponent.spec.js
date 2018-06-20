import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterComponent from '../../../../src/views/parameter/ParameterComponent.vue';

axiosInstance.defaults.baseURL = undefined;
describe('ParameterComponent.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterComponent);
    moxios.stubOnce('GET', '/settings/services?dimension=services&pageSize=10&pageNo=1&machineId=&componentId=&keyword=', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          lastPage: 1,
          page: 1,
          perPage: 1,
          services: [
            {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
              machine: {
                id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                ip: '10.20.147.73',
                name: '中心管理服务器',
              },
              component: {
                id: 'activemq514win64_1.0.0',
                name: 'ActiveMQ V1.0.0',
              },
              instances: [
                {
                  id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
                  name: 'ActiveMQ服务-10.20.147.73-#1',
                  settings: [
                    {
                      component: {
                        id: 'activemq514win64_1.0.0',
                        name: 'ActiveMQ V1.0.0',
                      },
                      conflict: {
                      },
                      hasConflict: false,
                      instance: {
                        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
                        name: 'ActiveMQ服务-10.20.147.73-#1',
                      },
                      item: {
                        addressPort: 'false',
                        defaultValue: '512',
                        description: '默认值:512MB,最小值:256MB,最大值:8192MB',
                        key: 'Xms',
                        keyName: 'JVM初始分配的堆内存(MB)',
                        multiLanguage: false,
                        needRestart: true,
                        numberMax: 8192,
                        numberMin: 256,
                        portProtocol: '',
                        portRange: false,
                        readonly: false,
                        stringFormat: '',
                        type: 'number',
                        value: '512',
                      },
                      lastUpdated: '2018-02-08T08:06:31.176Z',
                      machine: {
                        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                        ip: '10.20.147.73',
                        name: '中心管理服务器',
                      },
                      result: '',
                      service: {
                        id: 'activemq514win64_1.0.0_mq',
                        name: 'ActiveMQ服务',
                      },
                      state: 'issued',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/settings/services/options', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          components: [
            {
              name: 'asw',
              id: 'asw_1.1.0',
              services: [
                {
                  id: 'asw',
                  name: 'asw',
                },
              ],
            },
            {
              name: 'Redis',
              id: 'rediswin64_1.0.0',
              services: [
                {
                  id: 'cache',
                  name: 'Redis数据库服务',
                },
              ],
            },
          ],
          machines: [
            {
              ip: '10.20.147.73',
              name: '中心管理服务器',
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/settings/services?pageSize=100&pageNo=1&sortBy=&sortDirection=ASCENDING&machineId=&componentId=&serviceId=&configType=&keyword=', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          lastPage: 1,
          page: 1,
          perPage: 1,
          settings: [
            {
              component: {
                componentId: '',
                id: 'activemq514win64_1.0.0',
                name: 'ActiveMQ V1.0.0',
              },
              conflict: {
              },
              hasConflict: false,
              instance: {
                id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
                name: 'ActiveMQ服务-10.20.147.73-#1',
              },
              item: {
                addressPort: 'false',
                defaultValue: '512',
                description: '默认值:512MB,最小值:256MB,最大值:8192MB',
                key: 'Xms',
                keyName: 'JVM初始分配的堆内存(MB)',
                multiLanguage: false,
                needRestart: true,
                numberMax: 8192,
                numberMin: 256,
                portProtocol: '',
                portRange: false,
                readonly: false,
                stringFormat: '',
                type: 'number',
                value: '512',
              },
              lastUpdated: '2018-02-08T08:06:31.176Z',
              machine: {
                id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                ip: '10.20.147.73',
                name: '中心管理服务器',
              },
              result: '',
              service: {
                id: 'activemq514win64_1.0.0_mq',
                name: 'ActiveMQ服务',
              },
              state: 'issued',
            },
          ],
          total: 1,
        },
      },
    });
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('是否离开当前页面---树视图', () => {
    wrapper.setData({
      isTreeView: true,
    });
    expect(wrapper.vm.leaveCurrentPage({})).to.equal(true);
  });
  it('是否离开当前页面---列表视图', () => {
    wrapper.setData({
      isTreeView: false,
    });
    expect(wrapper.vm.leaveCurrentPage({})).to.equal(true);
  });
  it('切换为树视图', () => {
    wrapper.setData({
      isTreeView: false,
    });
    wrapper.vm.treeViewClick();
    expect(wrapper.vm.isTreeView).to.equal(true);
  });
  it('切换为列表视图', () => {
    wrapper.setData({
      isTreeView: true,
    });
    wrapper.vm.tableViewClick();
    expect(wrapper.vm.isTreeView).to.equal(false);
  });
  it('切换视图', () => {
    wrapper.setData({
      isTreeView: false,
    });
    wrapper.vm.changeView();
    expect(wrapper.vm.isTreeView).to.equal(true);
  });
  it('处理关键字搜索---列表视图', () => {
    wrapper.setData({
      isTreeView: false,
      serchObj: {
        keyword: 'keyword11',
      },
    });
    wrapper.vm.handleIconClick();
    expect(wrapper.vm.$refs.tableView.serchObj.keyword).to.equal('keyword11');
  });
  it('处理enter搜索', () => {
    wrapper.setData({
      isTreeView: true,
      serchObj: {
        keyword: 'keyword',
      },
    });
    wrapper.vm.enterSearch();
    expect(wrapper.vm.$refs.treeView.serchObj.keyword).to.equal('keyword');
  });
});
