import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterTableView from '../../../../src/views/parameter/ParameterTableView.vue';

axiosInstance.defaults.baseURL = undefined;
describe('ParameterTableView.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterTableView, { propsData: { keyword: '' } });
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
  it('是否离开该路由---modifyList为空', () => {
    wrapper.setData({
      form: {
        tableData: [],
      },
      modifyList: [],
    });
    const ret = wrapper.vm.routeLeave({});
    wrapper.vm.$nextTick(() => {
      expect(ret).to.equal(true);
    });
  });
  it('是否离开该路由---modifyList不为空', () => {
    wrapper.setData({
      form: {
        tableData: [
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
      },
      modifyList: ['activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1_Xms'],
    });
    const ret = wrapper.vm.routeLeave({});
    wrapper.vm.$nextTick(() => {
      expect(ret).to.equal(false);
      // expect(wrapper.vm.dialogVisible).to.equal(true);
      // expect(wrapper.vm.to.name).to.equal('123');
    });
  });
  it('获取排序字段名称', () => {
    expect(wrapper.vm.sortName('item.keyName')).to.equal('configKey');
  });
  it('syncInput', () => {
    wrapper.vm.$nextTick(() => {
      wrapper.vm.syncInput('component>service', ['component', 'service']);
      expect(wrapper.vm.orgPath).to.equal('component>service');
      expect(wrapper.vm.segmentIdArr.length).to.equal(2);
    });
  });
  it('排序', () => {
    wrapper.vm.orderSearch({ prop: 'lastUpdated', order: 'ascending' });
    expect(wrapper.vm.serchObj.sortBy).to.equal('lastUpdated');
    expect(wrapper.vm.serchObj.sortDirection).to.equal('ASCENDING');
  });
  it('表格加载成功后的回调', () => {
    const resp = {
      settings: [
        {
          instance: {
            id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
            name: 'ActiveMQ服务-10.20.147.73-#1',
          },
          item: {
            addressPort: 'false',
            addressType: '',
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
          hasConflict: true,
        },
        {
          instance: {
            id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
            name: 'ActiveMQ服务-10.20.147.73-#2',
          },
          item: {
            addressPort: 'false',
            addressType: '',
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
          hasConflict: false,
        },
      ],
    };
    wrapper.vm.loadCallback(resp);
    expect(wrapper.vm.form.tableData.length).to.equal(2);
    expect(wrapper.vm.conflictList.length).to.equal(1);
  });
  it('翻页出现保存提示', () => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        form: {
          tableData: [
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
        },
        modifyList: ['activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1_Xms'],
      });
      const ret = wrapper.vm.beforeSkip();
      expect(ret).to.equal(false);
      expect(wrapper.vm.dialogVisible).to.equal(true);
    });
  });
  it('翻页不出现保存提示', () => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        form: {
          tableData: [
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
        },
        modifyList: [],
        dialogVisible: false,
      });
      const ret = wrapper.vm.beforeSkip();
      expect(ret).to.equal(true);
      expect(wrapper.vm.dialogVisible).to.equal(false);
    });
  });
  it('关键字查询search', () => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        serchObj: {
          keyword: '',
        },
      });
      wrapper.vm.search('component');
      expect(wrapper.vm.serchObj.keyword).to.equal('component');
    });
  });
  it('处理查询条件---组件/服务树选择服务', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        segmentIdArr: ['component', 'service'],
        onlyShowPorts: true,
      });
      wrapper.vm.handleIconClick();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            lastPage: 1,
            page: 1,
            perPage: 1,
            settings: [],
            total: 1,
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.componentId).to.equal('component');
          expect(wrapper.vm.serchObj.serviceId).to.equal('service');
          expect(wrapper.vm.serchObj.configType).to.equal('port');
          done();
        });
      });
    });
  });
  it('处理查询条件---组件/服务树选择组件', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        segmentIdArr: ['component111'],
        onlyShowPorts: false,
      });
      moxios.stubs.remove('GET', '/settings/services');
      wrapper.vm.handleIconClick();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            lastPage: 1,
            page: 1,
            perPage: 1,
            settings: [],
            total: 1,
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.componentId).to.equal('component111');
          expect(wrapper.vm.serchObj.configType).to.equal('');
          done();
        });
      });
    });
  });
  it('处理查询条件---组件/服务树不选择', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        segmentIdArr: [],
        onlyShowPorts: false,
      });
      moxios.stubs.remove('GET', '/settings/services');
      wrapper.vm.handleIconClick();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            lastPage: 1,
            page: 1,
            perPage: 1,
            settings: [],
            total: 1,
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.componentId).to.equal('');
          expect(wrapper.vm.serchObj.configType).to.equal('');
          done();
        });
      });
    });
  });
  it('渲染表格某一行---字体加粗', () => {
    wrapper.vm.$nextTick(() => {
      const row = {
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
        fontWeight: true,
      };
      expect(wrapper.vm.renderRow(row)).to.equal('modify-row');
    });
  });
  it('渲染表格某一行---字体正常', () => {
    wrapper.vm.$nextTick(() => {
      const row = {
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
        fontWeight: false,
      };
      expect(wrapper.vm.renderRow(row)).to.equal('');
    });
  });
  it('处理多语言---字符串', () => {
    expect(wrapper.vm.handleValue('运行管理中心')).to.equal('运行管理中心');
  });
  it('处理多语言---多语言对象', () => {
    const value = {
      zh_CN: '标题',
      en_US: 'title',
    };
    const ret = wrapper.vm.handleValue(value);
    expect(ret).to.equal('zh_CN: 标题/en_US: title');
  });
  it('端口段校验---最小值', () => {
    wrapper.setData({
      form: {
        tableData: [
          {
            instance: {
              id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
              name: 'ActiveMQ服务-10.20.147.73-#1',
            },
            item: {
              key: 'Xms',
              keyName: 'JVM初始分配的堆内存(MB)',
              type: 'port',
              portRange: true,
              readonly: false,
              portProtocol: 'http',
              value: '200-500',
            },
            machine: {
              id: '1',
              name: 'machine',
            },
            component: {
              componentId: '',
              id: 'activemq514win64_1.0.0',
              name: 'ActiveMQ V1.0.0',
            },
            service: {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
            },
          },
        ],
      },
    });
    const parentItem = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_2',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'JVM初始分配的堆内存(MB)',
        type: 'port',
        portRange: true,
        readonly: false,
        portProtocol: 'http',
        value: '300-600',
      },
      conflict: {},
      machine: {
        id: '1',
      },
    };
    expect(wrapper.vm.conflictPort(parentItem)).to.equal(true);
  });
  it('端口段校验---最大值', () => {
    wrapper.setData({
      form: {
        tableData: [
          {
            instance: {
              id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
              name: 'ActiveMQ服务-10.20.147.73-#1',
            },
            item: {
              key: 'Xms',
              keyName: 'JVM初始分配的堆内存(MB)',
              type: 'port',
              portRange: true,
              readonly: false,
              portProtocol: 'http',
              value: '200-500',
            },
            machine: {
              id: '1',
              name: 'machine',
            },
            component: {
              componentId: '',
              id: 'activemq514win64_1.0.0',
              name: 'ActiveMQ V1.0.0',
            },
            service: {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
            },
          },
        ],
      },
    });
    const parentItem = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_2',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'JVM初始分配的堆内存(MB)',
        type: 'port',
        portRange: true,
        readonly: false,
        portProtocol: 'http',
        value: '100-400',
      },
      conflict: {},
      machine: {
        id: '1',
      },
    };
    expect(wrapper.vm.conflictPort(parentItem)).to.equal(true);
  });
  it('端口段校验---全部包含在内', () => {
    wrapper.setData({
      form: {
        tableData: [
          {
            instance: {
              id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
              name: 'ActiveMQ服务-10.20.147.73-#1',
            },
            item: {
              key: 'Xms',
              keyName: 'JVM初始分配的堆内存(MB)',
              type: 'port',
              portRange: true,
              readonly: false,
              portProtocol: 'http',
              value: '200-500',
            },
            machine: {
              id: '1',
              name: 'machine',
            },
            component: {
              componentId: '',
              id: 'activemq514win64_1.0.0',
              name: 'ActiveMQ V1.0.0',
            },
            service: {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
            },
          },
        ],
      },
    });
    const parentItem = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_2',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'JVM初始分配的堆内存(MB)',
        type: 'port',
        portRange: true,
        readonly: false,
        portProtocol: 'http',
        value: '100-600',
      },
      conflict: {},
      machine: {
        id: '1',
      },
    };
    expect(wrapper.vm.conflictPort(parentItem)).to.equal(true);
  });
  it('非端口段，端口冲突', () => {
    wrapper.setData({
      form: {
        tableData: [
          {
            instance: {
              id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
              name: 'ActiveMQ服务-10.20.147.73-#1',
            },
            item: {
              key: 'Xms',
              keyName: 'JVM初始分配的堆内存(MB)',
              type: 'port',
              portRange: false,
              readonly: false,
              portProtocol: 'http',
              value: '500',
            },
            machine: {
              id: '1',
              name: 'machine',
            },
            component: {
              componentId: '',
              id: 'activemq514win64_1.0.0',
              name: 'ActiveMQ V1.0.0',
            },
            service: {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
            },
          },
          {
            instance: {
              id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_2',
              name: 'ActiveMQ服务-10.20.147.73-#1',
            },
            item: {
              key: 'Xms1',
              keyName: 'JVM初始分配的堆内存(MB)',
              type: 'port',
              portRange: false,
              readonly: false,
              portProtocol: 'http',
              value: '500',
            },
            machine: {
              id: '1',
              name: 'machine',
            },
            component: {
              componentId: '',
              id: 'activemq514win64_1.0.0',
              name: 'ActiveMQ V1.0.0',
            },
            service: {
              id: 'activemq514win64_1.0.0_mq',
              name: 'ActiveMQ服务',
            },
          },
        ],
      },
    });
    const parentItem = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'JVM初始分配的堆内存(MB)',
        type: 'port',
        portRange: false,
        readonly: false,
        portProtocol: 'http',
        value: '500',
      },
      conflict: {},
      machine: {
        id: '1',
      },
    };
    expect(wrapper.vm.conflictPort(parentItem)).to.equal(true);
  });
  it('处理多语言title', () => {
    const value = {
      zh_CN: '标题',
      en_US: 'title',
    };
    expect(wrapper.vm.mlValueTitle(value)).to.equal('zh_CN: 标题\nen_US: title');
  });
  it('编辑多语言', () => {
    wrapper.setData({
      mlstringEditVisiable: false,
    });
    const row = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'Xms',
        value: '多语言',
        type: 'string',
        multiLanguage: true,
      },
    };
    wrapper.vm.editMlstring(row);
    expect(wrapper.vm.mlstringEditVisiable).to.equal(true);
    expect(wrapper.vm.modifyRow.item.multiLanguage).to.equal(true);
  });
  it('只保存不下发---翻页', (done) => {
    wrapper.setData({
      modifyList: ['2222222'],
      leave: false,
    });
    const parameter = [
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
    ];
    moxios.stubs.remove('POST', '/settings/services');
    wrapper.vm.onlySave(parameter);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.modifyList.length).to.equal(0);
        done();
      });
    });
  });
  it('只保存不下发---改变视图', (done) => {
    wrapper.setData({
      modifyList: ['2222222'],
      leave: true,
      to: {
        type: 'changeView',
      },
    });
    const parameter = [
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
    ];
    moxios.stubs.remove('POST', '/settings/services');
    wrapper.vm.onlySave(parameter);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.modifyList.length).to.equal(0);
        done();
      });
    });
  });
  it('只保存不下发---保存失败', (done) => {
    wrapper.setData({
      modifyList: ['2222222'],
      leave: false,
    });
    const parameter = [
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
    ];
    moxios.stubs.remove('POST', '/settings/services');
    wrapper.vm.onlySave(parameter);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x123456',
          msg: '失败',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.modifyList.length).to.equal(1);
        done();
      });
    });
  });
  it('取消操作', () => {
    wrapper.setData({
      leave: true,
    });
    wrapper.vm.cancelOperation();
    expect(wrapper.vm.dialogVisible).to.equal(false);
  });
  it('不保存--翻页', () => {
    wrapper.setData({
      modifyList: ['2222222'],
      leave: true,
      to: {
        type: 'changeView',
      },
    });
    wrapper.vm.notSave();
    expect(wrapper.vm.dialogVisible).to.equal(false);
    expect(wrapper.vm.modifyList.length).to.equal(0);
  });
  it('图片上传---图片类型错误', () => {
    wrapper.setData({
      imageObj: {
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
          type: 'image',
          value: '512',
          imageHeightMax: '1080',
          imageHeightMin: '768',
          imageType: 'png',
          imageWidthMax: '1920',
          imageWidthMin: '1024',
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
        fontWeight: false,
      },
      modifyList: [],
    });
    const e = {
      target: {
        files: [
          {
            name: '123456567.img',
          },
        ],
      },
    };
    wrapper.vm.uploadImage(e);
    expect(wrapper.vm.modifyList.length).to.equal(1);
    expect(wrapper.vm.imageObj.fontWeight).to.equal(true);
  });
  it('数据更改dataModify', () => {
    wrapper.setData({
      modifyList: [],
    });
    const row = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: 'JVM初始分配的堆内存(MB)',
        type: 'port',
        portRange: false,
        readonly: false,
        portProtocol: 'http',
        value: '500',
      },
      machine: {
        id: '1',
        name: 'machine',
      },
      component: {
        componentId: '',
        id: 'activemq514win64_1.0.0',
        name: 'ActiveMQ V1.0.0',
      },
      service: {
        id: 'activemq514win64_1.0.0_mq',
        name: 'ActiveMQ服务',
      },
      fontWeight: false,
      portConflict: false,
      confilctMsg: '',
    };
    wrapper.vm.dataModify(row);
    expect(wrapper.vm.modifyList.length).to.equal(1);
    expect(row.fontWeight).to.equal(true);
    expect(row.state).to.equal('toIssue');
  });
});
