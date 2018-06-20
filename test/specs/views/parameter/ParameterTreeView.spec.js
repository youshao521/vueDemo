import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterTreeView from '../../../../src/views/parameter/ParameterTreeView.vue';

axiosInstance.defaults.baseURL = undefined;
describe('ParameterTreeView.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterTreeView, { propsData: { keyword: '' } });
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
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('是否离开该路由---modifyList不为空', () => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        tableDataList: [
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
        modifyList: ['activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1_Xms'],
      });
      const ret = wrapper.vm.routeLeave({ name: '123', path: '/cluster' });
      expect(ret).to.equal(false);
      expect(wrapper.vm.dialogVisible).to.equal(true);
      expect(wrapper.vm.to.name).to.equal('123');
    });
  });
  it('是否离开该路由---modifyList为空', () => {
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
      });
      const ret = wrapper.vm.routeLeave({ name: '123', path: '/cluster' });
      expect(ret).to.equal(true);
    });
  });
  it('初始化高亮树节点', () => {
    wrapper.setData({
      baseGroup: {
        id: '2',
        name: '运行管理中心',
      },
    });
    wrapper.vm.initCurrentHighLight();
    expect(wrapper.vm.currentFlag).to.equal('2');
    expect(wrapper.vm.currentNode.name).to.equal('运行管理中心');
  });
  it('处理树数据', () => {
    const groups = [
      {
        name: '运行管理中心',
        groups: [],
        id: '1',
        machines: [
          {
            isCenter: true,
            components: [
              {
                devices: [],
                name: '视频网管门户',
                id: 'portal_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                createAt: '2018-02-05T16:50:43.000+08:00',
                sid: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2portal_1.0.0',
              },
            ],
            name: '中心管理服务器',
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            state: 'online',
            type: 'machine',
            parentId: '1',
            sid: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
          },
        ],
        type: 'group',
        parentId: '0',
        sid: '1',
      },
    ];
    const treeData = wrapper.vm.handle(groups, 0);
    expect(treeData.length).to.equal(1);
    expect(treeData[0].id).to.equal('1');
  });
  it('获取选中的条件数据---根节点', () => {
    const data = {
      nodetype: 1,
    };
    const ret = wrapper.vm.getSelectData(data);
    expect(ret.machineId).to.equal('');
    expect(ret.componentId).to.equal('');
  });
  it('获取选中的条件数据---机器节点', () => {
    const data = {
      nodetype: 2,
      id: '1234',
    };
    const ret = wrapper.vm.getSelectData(data);
    expect(ret.machineId).to.equal('1234');
    expect(ret.componentId).to.equal('');
  });
  it('获取选中的条件数据---组件节点', () => {
    const data = {
      nodetype: 3,
      id: 'component_1',
      parentId: 'machine_1',
    };
    const ret = wrapper.vm.getSelectData(data);
    expect(ret.machineId).to.equal('machine_1');
    expect(ret.componentId).to.equal('component_1');
  });
  it('修改树节点changeTreeNode', () => {
    const to = {
      data: {
        id: '3',
        name: '全部',
      },
      element: {
        name: 'element',
      },
      machineId: '',
      componentId: '',
    };
    wrapper.vm.changeTreeNode(to);
    expect(wrapper.vm.currentNode.id).to.equal('3');
    expect(wrapper.vm.element.name).to.equal('element');
  });
  it('pageSize变化', () => {
    wrapper.setData({
      modifyList: [],
      pageLeave: true,
      serchObj: {
        pageSize: 0,
      },
    });
    wrapper.vm.sizeChange(10, 20);
    expect(wrapper.vm.serchObj.pageSize).to.equal(10);
  });
  it('关键字查询', () => {
    wrapper.setData({
      serchObj: {
        keyword: 'keyqord',
      },
    });
    wrapper.vm.search('');
    expect(wrapper.vm.serchObj.keyword).to.equal('');
    expect(wrapper.vm.serchObj.pageNo).to.equal(1);
  });
  it('只保存不下发---改变视图', (done) => {
    wrapper.vm.$nextTick(() => {
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
  });
  it('只保存不下发---保存失败', (done) => {
    wrapper.vm.$nextTick(() => {
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
  });
  it('不保存', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        modifyList: ['2222222'],
        to: {
          type: 'search',
          keyword: '',
        },
      });
      wrapper.vm.notSave();
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
          expect(wrapper.vm.modifyList.length).to.equal(0);
          done();
        });
      });
    });
  });
  it('数据更改dataModify', () => {
    wrapper.setData({
      modifyList: [],
    });
    wrapper.vm.$nextTick(() => {
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
  it('处理多语言---字符串', () => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.handleValue('运行管理中心')).to.equal('运行管理中心');
    });
  });
  it('非端口段，端口冲突', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        form: {
          activemq514win64100mq56EA52B76B3842708306B6F490B6DE2D1: [
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
      const ret = wrapper.vm.conflictPort(parentItem);
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
          expect(ret).to.equal(true);
          done();
        });
      });
    });
  });
  it('处理多语言title', () => {
    wrapper.vm.$nextTick(() => {
      const value = 'title';
      expect(wrapper.vm.mlValueTitle(value)).to.equal('title');
    });
  });
  it('处理跳转goNext---type=changeTreeNode', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        to: {
          type: 'changeTreeNode',
          data: {
            id: '3',
            name: '全部',
          },
          element: {
            name: 'element',
          },
          machineId: 'machineId',
          componentId: 'componentId',
        },
      });
      wrapper.vm.goNext();
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
          expect(wrapper.vm.currentNode.id).to.equal('3');
          expect(wrapper.vm.element.name).to.equal('element');
          done();
        });
      });
    });
  });
  it('处理跳转goNext---type=pageChange', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        to: {
          type: 'pageChange',
          currentPage: 1,
        },
        serchObj: {
          pageNo: 1,
        },
      });
      wrapper.vm.goNext();
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
          expect(wrapper.vm.serchObj.pageNo).to.equal(1);
          done();
        });
      });
    });
  });
  it('处理跳转goNext---type=sizeChange', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        to: {
          type: 'sizeChange',
          size: 10,
        },
        serchObj: {
          pageSize: 9,
        },
      });
      wrapper.vm.goNext();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: '0x123456',
            msg: '失败',
            data: {},
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.pageSize).to.equal(10);
          done();
        });
      });
    });
  });
  it('取消跳转---type=pageChange', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        to: {
          type: 'pageChange',
          oldPage: 1,
        },
        serchObj: {
          pageNo: 1,
        },
      });
      wrapper.vm.cancelOperation();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: '0x123456',
            msg: '失败',
            data: {},
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.pageNo).to.equal(1);
          done();
        });
      });
    });
  });
  it('取消跳转---type=sizeChange', (done) => {
    wrapper.vm.$nextTick(() => {
      wrapper.setData({
        to: {
          type: 'sizeChange',
          oldSize: 2,
        },
        serchObj: {
          pageSize: 1,
        },
      });
      wrapper.vm.cancelOperation();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            code: '0x123456',
            msg: '失败',
            data: {},
          },
        }).then(() => {
          expect(wrapper.vm.serchObj.pageSize).to.equal(2);
          done();
        });
      });
    });
  });
});
