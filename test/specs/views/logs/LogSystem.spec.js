import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LogSystem from '../../../../src/views/logs/LogSystem.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LogSystem.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LogSystem);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化---获取组织树', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: [
            {
              groupParentId: '0',
              id: '1',
              name: '运行管理中心',
              nodes: [
                {
                  id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                  identity: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                  machineParentGroupId: '1',
                  name: '中心管理服务器a',
                  nodeType: 'server',
                  nodes: [
                    {
                      componentInstanceIndex: '1',
                      id: '@bic_1.0.0_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                      identity: '@bic',
                      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                      name: '核心服务',
                      nodes: [
                        {
                          componentId: '@bic_1.0.0_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                          componentIdentity: '@bic',
                          componentInstanceIndex: '1',
                          componentVersion: '1.0.0',
                          machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                          name: '代理服务',
                          serviceId: '@bic_1.0.0_proxy_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                          serviceIdentity: 'proxy',
                          serviceInstanceIndex: '1',
                          serviceType: 'service',
                        },
                        {
                          componentId: '@bic_1.0.0_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                          componentIdentity: '@bic',
                          componentInstanceIndex: '1',
                          componentVersion: '1.0.0',
                          machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                          name: '授权服务',
                          serviceId: '@bic_1.0.0_license_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                          serviceIdentity: 'license',
                          serviceInstanceIndex: '1',
                          serviceType: 'service',
                        },
                      ],
                      version: '1.0.0',
                    },
                  ],
                },
                {
                  groupParentId: '1',
                  id: '9',
                  name: '22221',
                  nodes: [
                    {
                      id: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                      identity: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                      machineParentGroupId: '9',
                      name: '10.33.43.25',
                      nodeType: 'server',
                      nodes: [
                        {
                          componentInstanceIndex: '1',
                          id: 'vod_6.0.0_e35e6ea2-0adb-4e82-b7f2-3c02b4286068_1',
                          identity: 'vod',
                          machineId: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          name: '视频点播',
                          nodes: [
                            {
                              componentId: 'vod_6.0.0_e35e6ea2-0adb-4e82-b7f2-3c02b4286068_1',
                              componentIdentity: 'vod',
                              componentInstanceIndex: '1',
                              componentVersion: '6.0.0',
                              machineId: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                              name: '视频点播服务',
                              serviceId: 'vod_6.0.0_vod_e35e6ea2-0adb-4e82-b7f2-3c02b4286068_1',
                              serviceIdentity: 'vod',
                              serviceInstanceIndex: '1',
                              serviceType: 'service',
                            },
                          ],
                          version: '6.0.0',
                        },
                      ],
                    },
                    {
                      groupParentId: '9',
                      id: '13',
                      name: '233333',
                      nodes: [
                        {
                          id: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          identity: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          machineParentGroupId: '9',
                          name: '10.33.43.25',
                          nodeType: 'server',
                          nodes: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      }).then(() => {
        expect(wrapper.vm.treeData.length).to.equal(1);
        expect(wrapper.vm.treeData.nodes.length).to.equal(3);
        done();
      });
      done();
    });
  });

  it('查询日志---未勾选服务', (done) => {
    wrapper.vm.handleSearchClick();

    expect(wrapper.vm.nodeChecked).to.equal(false);
    done();
  });

  it('错误码详情', (done) => {
    wrapper.vm.codeClick({
      code: '0x00110006',
      systemErrorDescription: '内部错误',
      systemErrorSuggestion: '请联系开发人员',
    });
    expect(wrapper.vm.errorGuideVisible).to.equal(true);
    done();
  });

  it('导出---未选择服务', (done) => {
    wrapper.vm.outputLogs();
    expect(wrapper.vm.nodeChecked).to.equal(false);
    done();
  });

  it('导出---选择服务', (done) => {
    wrapper.vm.selectServices.length = 1;
    wrapper.vm.outputLogs();
    done();
  });

  it('重置', (done) => {
    wrapper.vm.resetSearch();
    expect(wrapper.vm.searchForm.serviceId).to.equal('');
    done();
  });

  it('时间改变', (done) => {
    wrapper.vm.dateChange();
    expect(wrapper.vm.isDateShort).to.equal(false);
    done();
  });

  it('告警跳转处理', (done) => {
    wrapper.vm.alarmLog({
      begin: 'Thu Mar 29 2018 15:14:19 GMT+0800 (中国标准时间)',
      componentId: '',
      componentInstanceIndex: '',
      componentVersion: '',
      end: 'Thu Mar 29 2018 15:24:19 GMT+0800 (中国标准时间)',
      level: ['FATAL', 'ERROR'],
      machineId: 'BA43D8A1-1A44-4E84-AB27-0FCC1B00BE6F',
      serviceId: '',
      serviceInstanceIndex: '',
    });
    expect(wrapper.vm.isDateShort).to.equal(false);
    expect(wrapper.vm.searchForm.level).to.equal('ERROR');
    done();
  });
});
