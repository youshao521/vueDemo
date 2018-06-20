import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import Report from '../../../../src/views/statistics/Report.vue';

axiosInstance.defaults.baseURL = undefined;

describe('Report.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(Report);
    wrapper.vm.$router.push('/statistics/businessReport');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化---加载组件列表', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            components: [
              {
                componentId: '@bic',
                name: '核心服务',
                version: '1.0.0',
              },
              {
                componentId: 'jre18win64',
                name: 'JRE',
                version: '1.0.0',
              },
              {
                componentId: 'tomcat85win64',
                name: 'Tomcat',
                version: '1.0.0',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.compOptions.length).to.equal(3);
        done();
      });
      done();
    });
  });

  it('业务日志报表统计---成功', (done) => {
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];
    wrapper.vm.compOptions = [
      {
        componentId: '@bic',
        name: '核心服务1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'jre18win64',
        name: 'JRE1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'tomcat85win64',
        name: 'Tomcat1.0.0',
        version: '1.0.0',
      },
    ];
    wrapper.vm.handleSearchClick();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            actions: [
              {
                count: {
                  failed: 0,
                  succeed: 4,
                },
                fails: [],
                module: '登录管理',
                name: '登录',
              },
              {
                count: {
                  failed: 3,
                  succeed: 1,
                },
                fails: [
                  {
                    count: 5,
                    message: '',
                  },
                ],
                module: '软件包管理',
                name: '移除',
              },
              {
                count: {
                  failed: 0,
                  succeed: 27,
                },
                fails: [],
                module: '定时任务',
                name: '定时任务',
              },
              {
                count: {
                  failed: 0,
                  succeed: 15,
                },
                fails: [],
                module: '定时任务',
                name: '定时任务',
              },
            ],
            count: {
              failed: 3,
              succeed: 47,
            },
          },
        },
      }).then(() => {
        expect(wrapper.vm.failedCount).to.equal(3);
        expect(wrapper.vm.succeedCount).to.equal(47);
        expect(wrapper.vm.tableData.length).to.equal(4);
        expect(wrapper.vm.init).to.equal(false);
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('业务日志报表统计---失败', (done) => {
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];
    wrapper.vm.compOptions = [
      {
        componentId: '@bic',
        name: '核心服务1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'jre18win64',
        name: 'JRE1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'tomcat85win64',
        name: 'Tomcat1.0.0',
        version: '1.0.0',
      },
    ];
    wrapper.vm.handleSearchClick();
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
        expect(wrapper.vm.init).to.equal(true);
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('接口日志报表统计---成功', (done) => {
    wrapper.vm.$router.push('/statistics/interfaceReport');
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];
    wrapper.vm.compOptions = [
      {
        componentId: '@bic',
        name: '核心服务1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'jre18win64',
        name: 'JRE1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'tomcat85win64',
        name: 'Tomcat1.0.0',
        version: '1.0.0',
      },
    ];
    wrapper.vm.handleSearchClick();
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
                component: {
                  id: '@bic',
                  name: '核心服务V1.0.0',
                  version: '1.0.0',
                },
                count: {
                  failed: 0,
                  succeed: 52,
                },
                duration: 16,
                name: 'http://10.20.147.72:8001/bic/personService/v1/persons/search',
                service: {
                  id: 'log',
                  name: '日志服务',
                },
              },
              {
                component: {
                  id: '@bic',
                  name: '核心服务V1.0.0',
                  version: '1.0.0',
                },
                count: {
                  failed: 0,
                  succeed: 1,
                },
                duration: 3135,
                name: 'DuplicateLogRemovaTask.RemoveDuplicateDtsLog',
                service: {
                  id: 'log',
                  name: '日志服务',
                },
              },
            ],
            count: {
              failed: 0,
              succeed: 53,
            },
            duration: 79,
          },
        },
      }).then(() => {
        expect(wrapper.vm.failedCount).to.equal(0);
        expect(wrapper.vm.succeedCount).to.equal(53);
        expect(wrapper.vm.duration).to.equal(79);
        expect(wrapper.vm.tableData.length).to.equal(2);
        expect(wrapper.vm.init).to.equal(false);
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('接口日志报表统计---失败', (done) => {
    wrapper.vm.$router.push('/statistics/interfaceReport');
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];
    wrapper.vm.compOptions = [
      {
        componentId: '@bic',
        name: '核心服务1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'jre18win64',
        name: 'JRE1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'tomcat85win64',
        name: 'Tomcat1.0.0',
        version: '1.0.0',
      },
    ];
    wrapper.vm.handleSearchClick();
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
        expect(wrapper.vm.init).to.equal(true);
        expect(wrapper.vm.loading).to.equal(false);
        done();
      });
      done();
    });
  });

  it('重置操作', (done) => {
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];

    wrapper.vm.resetSearch();
    expect(wrapper.vm.init).to.equal(true);
    expect(wrapper.vm.searchForm.componentName).to.equal('');
    done();
  });

  it('导出操作', (done) => {
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [Date.now() - 900000, Date.now()];
    wrapper.vm.compOptions = [
      {
        componentId: '@bic',
        name: '核心服务1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'jre18win64',
        name: 'JRE1.0.0',
        version: '1.0.0',
      },
      {
        componentId: 'tomcat85win64',
        name: 'Tomcat1.0.0',
        version: '1.0.0',
      },
    ];

    wrapper.vm.output();
    done();
  });

  it('未选择时间', (done) => {
    wrapper.vm.searchForm.componentName = '核心服务1.0.0';
    wrapper.vm.searchForm.timeRange = [null, null];

    wrapper.vm.handleSearchClick();
    done();
  });
});
