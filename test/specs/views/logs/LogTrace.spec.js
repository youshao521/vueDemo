import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LogTrace from '../../../../src/views/logs/LogTrace.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LogTrace.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LogTrace);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化---系统日志调用链', (done) => {
    wrapper.vm.traceId = '6ee6c25c440746c3a4ba95ffbda65b14';
    wrapper.vm.spanId = '627586c404354747bdba47e6495b7d7b';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            calls: [
              {
                traceId: '6ee6c25c440746c3a4ba95ffbda65b14',
                code: '',
                instanceName: '@bic.center.1',
                description: '',
                serviceName: '',
                parentId: '',
                duration: '1110',
                spanId: '627586c404354747bdba47e6495b7d7b',
                createdAt: '',
                instanceId: '',
                systemLogs: null,
                calls: [
                  {
                    traceId: '6ee6c25c440746c3a4ba95ffbda65b14',
                    code: '400',
                    instanceName: '@bic.center.1',
                    description: '',
                    serviceName: '',
                    parentId: '',
                    duration: '1110',
                    spanId: '359a2602971a4ad2b3b4e29f47c34b75',
                    createdAt: '',
                    instanceId: '',
                    systemLogs: [
                      {
                        spanId: '359a2602971a4ad2b3b4e29f47c34b75',
                        systemErrorSuggestion: '',
                        createdAt: '2018-03-29 11:42:01',
                        path: 'c.h.c.m.transfer.service.impl.TransferServiceImpl:79',
                        code: '',
                        level: 'ERROR',
                        module: '@bic.center',
                        description: '',
                        thread: 'pool-10-thread-1',
                        deviceName: '',
                        machineIp: '10.33.40.241',
                        systemErrorDescription: '',
                      },
                    ],
                    calls: [],
                    name: '未知组件/center_monitor/monitor/v1/center/info',
                    id: 'null',
                    state: 'succeed',
                    serviceId: '',
                    ischild: false,
                  },
                ],
                name: '核心服务(10.33.40.241)/WEB服务',
                id: 'null',
                state: 'failed',
                serviceId: '',
                ischild: false,
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.totalDuration[0]).to.equal('1110');
        expect(wrapper.vm.curNode.spanId).to.equal('627586c404354747bdba47e6495b7d7b');
        done();
      });
      done();
    });
  });
  it('初始化---业务日志调用链', (done) => {
    wrapper.vm.traceId = '6ee6c25c440746c3a4ba95ffbda65b14';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            calls: [
              {
                traceId: '6ee6c25c440746c3a4ba95ffbda65b14',
                code: '',
                instanceName: '@bic.center.1',
                description: '',
                serviceName: '',
                parentId: '',
                duration: '1110',
                spanId: '627586c404354747bdba47e6495b7d7b',
                createdAt: '',
                instanceId: '',
                systemLogs: null,
                calls: [
                  {
                    traceId: '6ee6c25c440746c3a4ba95ffbda65b14',
                    code: '400',
                    instanceName: '@bic.center.1',
                    description: '',
                    serviceName: '',
                    parentId: '',
                    duration: '1110',
                    spanId: '359a2602971a4ad2b3b4e29f47c34b75',
                    createdAt: '',
                    instanceId: '',
                    systemLogs: [
                      {
                        spanId: '359a2602971a4ad2b3b4e29f47c34b75',
                        systemErrorSuggestion: '',
                        createdAt: '2018-03-29 11:42:01',
                        path: 'c.h.c.m.transfer.service.impl.TransferServiceImpl:79',
                        code: '',
                        level: 'ERROR',
                        module: '@bic.center',
                        description: '',
                        thread: 'pool-10-thread-1',
                        deviceName: '',
                        machineIp: '10.33.40.241',
                        systemErrorDescription: '',
                      },
                    ],
                    calls: [],
                    name: '未知组件/center_monitor/monitor/v1/center/info',
                    id: 'null',
                    state: 'succeed',
                    serviceId: '',
                    ischild: false,
                  },
                ],
                name: '核心服务(10.33.40.241)/WEB服务',
                id: 'null',
                state: 'failed',
                serviceId: '',
                ischild: false,
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.totalDuration[0]).to.equal('1110');
        expect(wrapper.vm.curNode.spanId).to.equal('359a2602971a4ad2b3b4e29f47c34b75');
        done();
      });
      done();
    });
  });

  it('初始化---请求失败：status200', (done) => {
    wrapper.vm.traceId = '6ee6c25c440746c3a4ba95ffbda65b14';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0X1235',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('初始化---请求失败：status400', (done) => {
    wrapper.vm.traceId = '6ee6c25c440746c3a4ba95ffbda65b14';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          code: '0X1235',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('点击调用链节点', (done) => {
    wrapper.vm.traceNodeClick({
      traceId: '6ee6c25c440746c3a4ba95ffbda65b14',
      code: '400',
      instanceName: '@bic.center.1',
      description: '',
      serviceName: '',
      parentId: '',
      duration: '1110',
      spanId: '359a2602971a4ad2b3b4e29f47c34b75',
      createdAt: '',
      instanceId: '',
      systemLogs: [
        {
          spanId: '359a2602971a4ad2b3b4e29f47c34b75',
          systemErrorSuggestion: '',
          createdAt: '2018-03-29 11:42:01',
          path: 'c.h.c.m.transfer.service.impl.TransferServiceImpl:79',
          code: '',
          level: 'ERROR',
          module: '@bic.center',
          description: '',
          thread: 'pool-10-thread-1',
          deviceName: '',
          machineIp: '10.33.40.241',
          systemErrorDescription: '',
        },
      ],
      calls: [],
      name: '未知组件/center_monitor/monitor/v1/center/info',
      id: 'null',
      state: 'succeed',
      serviceId: '',
      ischild: false,
      index: 1,
    });
    expect(wrapper.vm.spanId).to.equal('359a2602971a4ad2b3b4e29f47c34b75');
    done();
  });

  it('点击错误码', (done) => {
    wrapper.vm.codeClick({
      code: '123456',
      systemErrorDescription: '',
      systemErrorSuggestion: '',
    });
    expect(wrapper.vm.errorGuideVisible).to.equal(true);
    done();
  });

  it('点击展开和收起', (done) => {
    const data = {
      childNodes: [
        {
          id: 2,
        },
      ],
    };
    wrapper.vm.durations = [{
      display: true,
      durBefore: 0,
      durPercent: 100,
      duration: '1078',
    }, {
      display: true,
      durBefore: 0,
      durPercent: 100,
      duration: '1078',
    }];
    wrapper.vm.setDurationDisplay(data, false);
    expect(wrapper.vm.durations[1].display).to.equal(false);
    done();
  });
});
