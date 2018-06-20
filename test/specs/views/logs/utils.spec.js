import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LogSystem from '../../../../src/views/logs/LogSystem.vue';
import {
  handleTabClick,
  filterTreeNode,
  toSplitString,
  removeTab,
  getLogs,
} from '../../../../src/views/logs/utils';

axiosInstance.defaults.baseURL = undefined;

describe('utils', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LogSystem);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('查询日志---成功(用户点击查询)', (done) => {
    wrapper.vm.isScrollSet = false;
    wrapper.vm.logTabs = [{
      name: '0',
      title: '',
      logs: [],
      pageNo: 1,
      lastPage: 0,
      id: '123',
    }];
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            total: 100,
            perPage: 100,
            lastPage: 1,
            page: 1,
            logs: [
              {
                createdAt: '2018-03-02 17:00:00',
                model: {
                  system: {
                    traceId: 'e51bb65735fe4e29a469620232e2e033',
                    systemErrorSuggestion: '',
                    spanId: '337379fb1f3a4a93a6013a289a2eaff2',
                    path: 'c.hikvision.logstorage.task.DuplicateLogRemovaTask:50',
                    code: '',
                    level: 'INFO',
                    module: '@bic.log',
                    description: 'delete uplicate log RemoveDuplicateDebugLog',
                    thread: 'pool-6-thread-1',
                    deviceName: '',
                    machineIp: '',
                    systemErrorDescription: '',
                  },
                  business: {
                    traceId: null,
                    componentId: null,
                    ip: '',
                    actionMultiLang: '',
                    userOrgName: '',
                    relationId: null,
                    terminal: '',
                    actionDescription: '',
                    userName: '',
                    userId: '',
                    userOrgId: '',
                    mac: '',
                    objectType: '',
                    actionResult: '',
                    actionType: '',
                    objectOrgName: '',
                    actionMessageId: '',
                    objectName: '',
                    moduleId: '',
                    serviceId: null,
                    objectOrgId: '',
                    objectId: '',
                    actionDetail: '',
                  },
                },
                detail: '2018-03-02T17:00:00.837+08:00 INFO [source:c.hikvision.logstorage.task.DuplicateLogRemovaTask:50] @bic.log [threadNo:pool-6-thread-1] &lt;traceId:e51bb65735fe4e29a469620232e2e033&gt; <spanId:337379fb1f3a4a93a6013a289a2eaff2> - delete uplicate log RemoveDuplicateDebugLog',
                id: '1388612',
                source: {
                  component: {
                    name: null,
                    id: null,
                  },
                  machine: {
                    name: null,
                    id: null,
                  },
                  service: {
                    name: null,
                    id: null,
                  },
                },
                type: 'system',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.logTabs[0].logs[0]).to.include.keys('strings');
        done();
      });
      done();
    });
  });

  it('查询日志---成功(用户滚动下拉)', (done) => {
    wrapper.vm.isScrollSet = true;
    wrapper.vm.isNextScroll = true;
    wrapper.vm.logTabs = [{
      name: '0',
      title: '',
      logs: [],
      pageNo: 1,
      lastPage: 0,
      id: '123',
    }];
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            total: 100,
            perPage: 100,
            lastPage: 1,
            page: 1,
            logs: [
              {
                createdAt: '2018-03-02 17:00:00',
                model: {
                  system: {
                    traceId: 'e51bb65735fe4e29a469620232e2e033',
                    systemErrorSuggestion: '',
                    spanId: '337379fb1f3a4a93a6013a289a2eaff2',
                    path: 'c.hikvision.logstorage.task.DuplicateLogRemovaTask:50',
                    code: '',
                    level: 'INFO',
                    module: '@bic.log',
                    description: 'delete uplicate log RemoveDuplicateDebugLog',
                    thread: 'pool-6-thread-1',
                    deviceName: '',
                    machineIp: '',
                    systemErrorDescription: '',
                  },
                  business: {
                    traceId: null,
                    componentId: null,
                    ip: '',
                    actionMultiLang: '',
                    userOrgName: '',
                    relationId: null,
                    terminal: '',
                    actionDescription: '',
                    userName: '',
                    userId: '',
                    userOrgId: '',
                    mac: '',
                    objectType: '',
                    actionResult: '',
                    actionType: '',
                    objectOrgName: '',
                    actionMessageId: '',
                    objectName: '',
                    moduleId: '',
                    serviceId: null,
                    objectOrgId: '',
                    objectId: '',
                    actionDetail: '',
                  },
                },
                detail: '2018-03-02T17:00:00.837+08:00 INFO [source:c.hikvision.logstorage.task.DuplicateLogRemovaTask:50] @bic.log [threadNo:pool-6-thread-1] &lt;traceId:e51bb65735fe4e29a469620232e2e033&gt; <spanId:337379fb1f3a4a93a6013a289a2eaff2> - delete uplicate log RemoveDuplicateDebugLog',
                id: '1388612',
                source: {
                  component: {
                    name: null,
                    id: null,
                  },
                  machine: {
                    name: null,
                    id: null,
                  },
                  service: {
                    name: null,
                    id: null,
                  },
                },
                type: 'system',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.logTabs[0].logs[0].strings).to.equal('2018-03-02 17:00:00 INFO [source:c.hikvision.logst…50] @bic.log [threadNo:pool-6-thread-1] <traceId:", "> ", " - delete uplicate log RemoveDuplicateDebugLog');
        expect(wrapper.vm.isScrollSet).to.equal(false);
        done();
      });
      done();
    });
  });

  it('查询日志---成功(用户滚动上拉)', (done) => {
    wrapper.vm.isScrollSet = true;
    wrapper.vm.isNextScroll = false;
    wrapper.vm.logTabs = [{
      name: '0',
      title: '',
      logs: [],
      pageNo: 1,
      lastPage: 0,
      id: '123',
    }];
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            total: 100,
            perPage: 100,
            lastPage: 1,
            page: 1,
            logs: [
              {
                createdAt: '',
                model: {
                  system: {
                    traceId: 'e51bb65735fe4e29a469620232e2e033',
                    systemErrorSuggestion: '',
                    spanId: '337379fb1f3a4a93a6013a289a2eaff2',
                    path: 'c.hikvision.logstorage.task.DuplicateLogRemovaTask:50',
                    code: '',
                    level: 'INFO',
                    module: '@bic.log',
                    description: 'delete uplicate log RemoveDuplicateDebugLog',
                    thread: 'pool-6-thread-1',
                    deviceName: '',
                    machineIp: '',
                    systemErrorDescription: '',
                  },
                  business: {
                    traceId: null,
                    componentId: null,
                    ip: '',
                    actionMultiLang: '',
                    userOrgName: '',
                    relationId: null,
                    terminal: '',
                    actionDescription: '',
                    userName: '',
                    userId: '',
                    userOrgId: '',
                    mac: '',
                    objectType: '',
                    actionResult: '',
                    actionType: '',
                    objectOrgName: '',
                    actionMessageId: '',
                    objectName: '',
                    moduleId: '',
                    serviceId: null,
                    objectOrgId: '',
                    objectId: '',
                    actionDetail: '',
                  },
                },
                detail: '2018-03-02T17:00:00.837+08:00 INFO [source:c.hikvision.logstorage.task.DuplicateLogRemovaTask:50] @bic.log [threadNo:pool-6-thread-1] &lt;traceId:e51bb65735fe4e29a469620232e2e033&gt; <spanId:337379fb1f3a4a93a6013a289a2eaff2> - delete uplicate log RemoveDuplicateDebugLog',
                id: '1388612',
                source: {
                  component: {
                    name: null,
                    id: null,
                  },
                  machine: {
                    name: null,
                    id: null,
                  },
                  service: {
                    name: null,
                    id: null,
                  },
                },
                type: 'system',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.logTabs[0].logs[0].strings).to.equal('delete uplicate log RemoveDuplicateDebugLog');
        expect(wrapper.vm.isScrollSet).to.equal(false);
        done();
      });
      done();
    });
  });

  it('查询日志---请求失败', (done) => {
    wrapper.vm.isScrollSet = true;
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          code: '',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.loading).to.equal(false);
        expect(wrapper.vm.isScrollSet).to.equal(false);
        done();
      });
      done();
    });
  });

  it('查询日志---状态码200，code非0', (done) => {
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x123458',
          msg: '',
          data: {},
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('查询日志---状态码200，code非0，msg有值', (done) => {
    getLogs({
      begin: '2018-03-02T17:31:39.037+08:00',
      code: '',
      componentId: '@bic',
      componentInstanceIndex: '1',
      componentVersion: '1.0.0',
      end: '2018-03-02T17:46:39.037+08:00',
      keyword: '',
      level: [''],
      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
      pageNo: 1,
      pageSize: 100,
      serviceId: 'notify',
      serviceInstanceIndex: '1',
      thread: '',
      timestamp: 1519983999038,
    }, 'system');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x123458',
          msg: '错误描述',
          data: {},
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('树节点过滤', (done) => {
    expect(filterTreeNode('核心', {
      groupParentId: '2',
      id: '4',
      name: '2222',
      nodes: [],
    }, {
      parent: {
        data: {
          name: '核心服务',
        },
      },
    })).to.equal(true);
    done();
  });

  it('树节点过滤---输入为空', (done) => {
    expect(filterTreeNode('', {
      groupParentId: '2',
      id: '4',
      name: '2222',
      nodes: [],
    }, {
      parent: {
        data: {
          name: '核心服务',
        },
      },
    })).to.equal(true);
    done();
  });

  it('关闭标签页', (done) => {
    wrapper.vm.logTabs = [{
      name: '0',
      title: '',
      logs: [],
      pageNo: 1,
      lastPage: 0,
      id: '123',
    }];
    wrapper.vm.currentTabName = '0';
    wrapper.vm.nodeChecked = true;
    removeTab.call(wrapper.vm, '0');
    expect(wrapper.vm.nodeChecked).to.equal(false);
    done();
  });

  it('系统日志拼接', (done) => {
    expect(toSplitString({
      code: '',
      createdAt: '',
      description:
          '2018-05-28T10:04:37.601+08:00 DEBUG @bic.center [http-nio-8011-exec-39] [c.h.center.module.login.controller.LoginController:298] <c604b61986d74a95aa93b1034a302133>  - login referer:service=http://10.13.80.14:8080/center/redirect/',
      level: '',
      machineIp: '',
      module: '',
      path: '',
      spanId: '',
      systemErrorDescription: '',
      systemErrorSuggestion: '',
      thread: '',
      traceId: 'c604b61986d74a95aa93b1034a302133',
    })[0]).to.equal('2018-05-28T10:04:37.601+08:00 DEBUG @bic.center [http-nio-8011-exec-39] [c.h.center.module.login.controller.LoginController:298] <');
    done();
  });

  it('handleTabClick', (done) => {
    wrapper.vm.treeFilterText = 'a';
    wrapper.vm.curIndexNum = 0;
    wrapper.vm.pageSize = 1;
    wrapper.vm.logTabs = [{
      name: '0',
      title: '',
      logs: [{}, {}, {}],
      pageNo: 1,
      lastPage: 0,
      id: '123',
    }, {
      name: '1',
      title: '',
      logs: [{}],
      pageNo: 1,
      lastPage: 0,
      id: '234',
    }];
    handleTabClick.call(wrapper.vm, { index: '1' });
    expect(wrapper.vm.curIndexNum).to.equal(1);
    done();
  });
});
