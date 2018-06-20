import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import StatusComponents from '../../../../src/views/status/StatusComponents.vue';

axiosInstance.defaults.baseURL = undefined;

describe('StatusComponents.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(StatusComponents);
    wrapper.vm.$router.push('/status/machines/C380E3AB-9759-4987-A173-25C6C9ACA3B2/components/paf_3.0.0');
    moxios.stubOnce('GET', '/machines/C380E3AB-9759-4987-A173-25C6C9ACA3B2/components/paf_3.0.0/status', {
      status: 200,
      response: {
        code: '0',
        data: {
          componentId: 'paf',
          createdAt: '2018-02-10T06:57:56.411Z',
          dependencies: [{
            children: [],
            name: 'PostgreSQL',
            id: 'postgresql96win64_1.0.0',
            machines: [{
              ip: '10.33.43.8',
              name: '中心管理服务器',
              id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            }],
            version: '1.0.0',
          }],
          dependents: [],
          description: '',
          devices: null,
          downgradeVersion: '',
          enabled: false,
          id: 'paf_3.0.0',
          installed: false,
          language: {
            latestVersion: '',
            types: [{
              code: 'en_US',
              name: '英语(美国)',
            }, {
              code: 'zh_CN',
              name: '中文(中华人民共和国)',
            }],
            version: '',
          },
          lastUpdated: '2018-02-09T07:05:13.565Z',
          latestVersion: '',
          machine: [{
            createdAt: '2018-02-05 16:45:19.594',
            group: null,
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            ip: '10.33.43.8',
            isCenter: true,
            name: '中心管理服务器',
            port: 8010,
            state: 'offline',
            type: 'server',
          }],
          name: '探针接入框架',
          selfCheckLinks: null,
          services: [{
            instances: [{
              cluster: null,
              expansion: true,
              id: 'paf_3.0.0_pafdb_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
              instanceStatus: '',
              machine: {
                ip: '10.33.43.8',
                name: '中心管理服务器',
                id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                state: 'offline',
              },
              manualAdd: false,
              middleware: {
                machine: {
                  id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                },
                name: 'PostgreSQL',
                id: 'postgresql96win64_1.0.0',
              },
              name: '探针框架数据服务-10.20.147.72-#1',
              path: 'D:\\Hikvision\\components\\paf.1',
              ports: null,
              processes: [],
              segmentIdentification: 'pafdb',
              segmentName: '探针框架数据服务',
              selfCheckLink: '',
              serviceName: 'hik.postgresql96win64.rdbms.1',
            }],
            name: '探针框架数据服务',
            id: 'pafdb',
          }],
          size: null,
          state: '',
          status: {
            installs: [{
              disk: {
                disk: 'D',
                total: '765868028',
                used: '126403124',
              },
              path: 'D:\\Hikvision\\components\\paf.1',
            }],
            lastUpdated: '',
            logPath: '',
          },
          type: 'backend',
          upgradeVersion: '',
          version: '3.0.0',
        },
        msg: '',
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('切换tab----状态', (done) => {
    wrapper.setData({
      activeName: 'first',
    });
    wrapper.vm.changeTab();
    expect(wrapper.vm.loading).to.equal(true);
    expect(wrapper.vm.curName).to.equal('first');
    wrapper.vm.getStatusByComponentId();
    const data = {
      componentId: 'mps',
      createdAt: '2018-05-10T02:10:22.127Z',
      dependencies: [{
        children: [{
          children: [],
          name: 'JRE',
          id: 'jre18linux64_1.0.0',
          machines: [{
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
          }],
          version: '1.0.0',
        }],
        name: 'Tomcat',
        id: 'tomcat85linux64_1.0.0',
        machines: [{
          ip: '10.33.43.7',
          name: '中心管理服务器',
          id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
        }],
        version: '1.0.0',
      }, {
        children: [{
          children: [],
          name: 'JRE',
          id: 'jre18linux64_1.0.0',
          machines: [{
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
          }],
          version: '1.0.0',
        }],
        name: 'ActiveMQ',
        id: 'activemq514linux64_1.0.0',
        machines: [{
          ip: '10.33.43.7',
          name: '中心管理服务器',
          id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
        }],
        version: '1.0.0',
      }, {
        children: [],
        name: 'PostgreSQL',
        id: 'postgresql96linux64_1.0.0',
        machines: [{
          ip: '10.33.43.7',
          name: '中心管理服务器',
          id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
        }],
        version: '1.0.0',
      }],
      dependents: [],
      description: '',
      devices: null,
      downgradeVersion: '',
      enabled: false,
      id: 'mps_1.2.100',
      installed: false,
      language: {
        latestVersion: '',
        types: [{
          code: 'en_US',
          name: '英语(美国)',
        }, {
          code: 'zh_CN',
          name: '中文(中华人民共和国)',
        }],
        version: '',
      },
      lastUpdated: '2018-05-10T06:58:32.000Z',
      latestVersion: '',
      machine: [{
        createdAt: '2018-05-10 10:06:45.117',
        group: null,
        id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
        ip: '10.33.43.7',
        isCenter: true,
        name: '中心管理服务器',
        port: 8010,
        state: 'online',
        type: 'server',
      }],
      name: '消息推送',
      selfCheckLinks: null,
      services: [{
        instances: [{
          cluster: null,
          expansion: true,
          id: 'mps_1.2.100_mpsmq_2A2870ED-5EB7-4B82-99C5-71BFE872961A_1',
          instanceStatus: '',
          machine: {
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            state: 'online',
          },
          manualAdd: false,
          middleware: {
            machine: {
              id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            },
            name: 'ActiveMQ',
            id: 'activemq514linux64_1.0.0',
          },
          name: '[mpsmq]-10.33.43.7-#1',
          offerDirectSelfCheckLink: true,
          path: '/opt/Hikvision/web/components/mps.1',
          ports: null,
          processes: [],
          segmentIdentification: 'mpsmq',
          segmentName: '[mpsmq]',
          selfCheckLink: '',
          serviceName: 'hik.activemq514linux64.mq.1',
        }],
        name: '[mpsmq]',
        id: 'mpsmq',
        type: 'queue',
      }, {
        instances: [{
          cluster: null,
          expansion: true,
          id: 'mps_1.2.100_mpsdb_2A2870ED-5EB7-4B82-99C5-71BFE872961A_1',
          instanceStatus: '',
          machine: {
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            state: 'online',
          },
          manualAdd: false,
          middleware: {
            machine: {
              id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            },
            name: 'PostgreSQL',
            id: 'postgresql96linux64_1.0.0',
          },
          name: '[mpsdb]-10.33.43.7-#1',
          offerDirectSelfCheckLink: true,
          path: '/opt/Hikvision/web/components/mps.1',
          ports: null,
          processes: [],
          segmentIdentification: 'mpsdb',
          segmentName: '[mpsdb]',
          selfCheckLink: '',
          serviceName: 'hik.postgresql96linux64.rdbms.1',
        }],
        name: '[mpsdb]',
        id: 'mpsdb',
        type: 'database',
      }, {
        instances: [{
          cluster: null,
          expansion: true,
          id: 'mps_1.2.100_mps_2A2870ED-5EB7-4B82-99C5-71BFE872961A_1',
          instanceStatus: 'SERVICE_RUNNING',
          machine: {
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            state: 'online',
          },
          manualAdd: false,
          middleware: null,
          name: '消息推送服务-10.33.43.7-#1',
          offerDirectSelfCheckLink: true,
          path: '/opt/Hikvision/web/components/mps.1',
          ports: [{
            protocol: 'tcp',
            value: '7016',
          }, {
            protocol: 'tcp',
            value: '8030',
          }],
          processes: [{
            cpu: 11.0,
            description: '',
            id: '916',
            instance: null,
            memory: 114085888,
            name: 'mps',
            path: '',
            pid: null,
            state: 'running',
          }],
          segmentIdentification: 'mps',
          segmentName: '消息推送服务',
          selfCheckLink: '',
          serviceName: 'hik.mps.mps.1',
        }],
        name: '消息推送服务',
        id: 'mps',
        type: 'service',
      }, {
        instances: [{
          cluster: null,
          expansion: true,
          id: 'mps_1.2.100_mpms_2A2870ED-5EB7-4B82-99C5-71BFE872961A_1',
          instanceStatus: 'SERVICE_RUNNING',
          machine: {
            ip: '10.33.43.7',
            name: '中心管理服务器',
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            state: 'online',
          },
          manualAdd: false,
          middleware: {
            machine: {
              id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            },
            name: 'Tomcat',
            id: 'tomcat85linux64_1.0.0',
          },
          name: 'mpms监控数据分析-10.33.43.7-#1',
          offerDirectSelfCheckLink: true,
          path: '/opt/Hikvision/web/components/mps.1',
          ports: null,
          processes: [],
          segmentIdentification: 'mpms',
          segmentName: 'mpms监控数据分析',
          selfCheckLink: '',
          serviceName: 'hik.tomcat85linux64.javaweb.1',
        }],
        name: 'mpms监控数据分析',
        id: 'mpms',
        type: 'webapp',
      }],
      size: null,
      state: '',
      status: {
        installs: [{
          disk: {
            disk: '/opt/Hikvision/web/components/mps.1',
            total: '125298688',
            used: '50612476',
          },
          path: '/opt/Hikvision/web/components/mps.1',
        }],
        lastUpdated: '',
        logPath: '',
      },
      type: 'backend',
      upgradeVersion: '',
      version: '1.2.100',
    };
    moxios.stubOnce('GET', '/machines/2A2870ED-5EB7-4B82-99C5-71BFE872961A/components/mps_1.2.100/status', {
      status: 200,
      response: {
        code: '0',
        data,
        msg: '',
      },
    });

    moxios.wait(() => {
      // wrapper.vm.$route.params.machineId =
      expect(wrapper.vm.isBic).to.equal(false);
      expect(wrapper.vm.isOnline).to.equal(false);
      done();
    });
  });

  it('获取组件基本信息', (done) => {
    wrapper.vm.$router.push('/status/machines/C380E3AB-9759-4987-A173-25C6C9ACA3B2/components/paf_3.0.0');
    wrapper.setData({
      activeName: 'fifth',
    });
    wrapper.vm.getComponentInfo();
    const data = {
      component: {
        codes: [{
          code: '0x00610002',
          measure: '1.请重新启动activemq或者检查conf\\config.properties里面的参数是否正确。\\n 2.请检查script\\mq下面的jre.txt是否正确。',
          description: '测试连接错误',
        }, {
          code: '0x00610006',
          measure: '1.检查日志查看配置文件位置,确认是否存在并且格式是否正确。',
          description: '配置文件读取解析失败',
        }, {
          code: '0x00611000',
          measure: '1.尝试重启组件。',
          description: '更新mq状态信息失败',
        }, {
          code: '0x00611001',
          measure: '1.尝试重启组件。',
          description: '更新mq队列信息失败',
        }, {
          code: '0x00611002',
          measure: '1.请重新登录。',
          description: 'token验证失败',
        }, {
          code: '0x00611003',
          measure: '1.请重启mq组件或者其他使用amq组件的组件。',
          description: '连接数过大',
        }, {
          code: '0x00611004',
          measure: '1.尝试重启组件。',
          description: 'jmx连接失败',
        }, {
          code: '0x00611005',
          measure: '1.尝试重启组件。',
          description: '更新监控信息失败',
        }, {
          code: '0x00611006',
          measure: '1.尝试重启组件。',
          description: '更新mq主题信息失败',
        }, {
          code: '0x00611007',
          measure: '1.刷新界面查看队列是否被删除。',
          description: '队列清除失败',
        }, {
          code: '0x00611008',
          measure: '1.确认系统用户在组件目录有创建文件修改文件的权限。',
          description: '连接sqlite数据库失败',
        }, {
          code: '0x00611009',
          measure: '1.确认系统用户在组件目录有创建文件修改文件的权限。',
          description: '创建数据表失败',
        }, {
          code: '0x0061100a',
          measure: '1.检查数据是否成功入库,一直无法入库则建议重启组件。',
          description: '数据库资源关闭失败',
        }, {
          code: '0x0061100b',
          measure: '1.确认系统用户在组件目录有创建文件修改文件的权限。',
          description: '监控状态信息记录失败',
        }, {
          code: '0x0061100c',
          measure: '1.请通过监控界面清除队列消息。',
          description: '队列或主题未消费数据数过大',
        }, {
          code: '0x00630001',
          measure: '1.请检查安装时是否传递实例名或者实例是否为空。\\n 2.请检查相应的服务是否已经存在。',
          description: '实例名错误',
        }],
        rundepends: [],
        componentId: 'activemq514win64',
        changelogs: [{
          createdAt: '2017-09-26',
          description: '',
          version: '1.0.0',
        }],
        services: [{
          detection: null,
          logPath: './logs/mq',
          name: 'ActiveMQ服务',
          conflicts: null,
          monitor: {
            processes: null,
            disk: 2000,
            memory: 2048,
            handle: 100000,
            thread: 2000,
            url: 'activemq514win64',
          },
          id: 'activemq514win64_1.0.0_mq',
          requirement: {
            disk: 250,
            memory: 1000,
          },
          supportMultiDeploy: true,
          type: 'service',
          supportCluster: false,
          dependencies: [{
            name: 'JRE',
            type: 'local',
            version: '1.0.0',
          }],
          autoStartup: true,
        }],
        type: 'backend',
        version: '1.0.0',
        browsers: [{
          versions: ['44x64'],
          name: 'Chrome',
        }, {
          versions: ['11x64'],
          name: 'IE',
        }],
        performance: '未依赖核心服务',
        systems: [{
          versions: ['2016x64'],
          name: 'Windows Server',
        }],
        downloads: [{
          name: '安装手册',
          link: 'http://10.33.43.8:8080/download_bic/components/activemq514win64_1.0.0/document/安装说明文档.pdf',
          icon: '',
        }],
        function: '无功能描述',
        name: 'ActiveMQ',
        id: 'activemq514win64_1.0.0',
        menus: [],
        category: 'foundational',
        deviceCompatibility: '无支持设备',
        packageTime: '2018-01-06T17:09:35.670+08:00',
        compatibilities: ['0.1.1', '0.1.0'],
      },
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data,
        },
      }).then(() => {
        expect(wrapper.vm.componentInfo.name).to.equal('ActiveMQ');
        done();
      });
      done();
    });
  });

  it('文件完整性校验', (done) => {
    wrapper.vm.$router.push('/status/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/jre18win64_1.0.0');
    wrapper.vm.integrityCheck();
    expect(wrapper.vm.loading).to.equal(true);
    expect(wrapper.vm.loadMessage).to.equal(wrapper.vm.$t('fileChecking'));
    const data = {
      actions: [{
        component: {
          id: 'jre18win64_1.0.0',
          name: 'JRE',
        },
        createdAt: '2018-02-26T06:15:40.429Z',
        description: '',
        id: '10B038FE-B1D5-4500-89C6-853259DF656D',
        instance: null,
        machine: [{
          id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          name: '中心管理服务器',
        }],
        message: '中心管理服务器 component.task.progress.initial',
        progress: -1,
        resource: '',
        state: 'initial',
        type: 'fileCheck',
        userId: '',
      }],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data,
        },
      }).then(() => {
        expect(wrapper.vm.loading).to.equal(false);
        expect(wrapper.vm.loadMessage).to.equal('');
        done();
      });
      done();
    });
  });

  it('组件告警数变化----getComponentAlertsCount', () => {
    wrapper.setData({
      warnCount: 11,
    });
    wrapper.vm.getComponentAlertsCount(13);
    expect(wrapper.vm.warnCount).to.equal(13);
  });

  it('告警数背景色----紧急', () => {
    const data = 1;
    expect(wrapper.vm.getBgColorClass(data)).to.equal('bg_color_one');
  });
  it('告警数背景色----一般', () => {
    const data = 2;
    expect(wrapper.vm.getBgColorClass(data)).to.equal('bg_color_two');
  });
  it('告警数背景色----警告', () => {
    const data = 3;
    expect(wrapper.vm.getBgColorClass(data)).to.equal('bg_color_three');
  });
  it('告警数背景色----默认----alertLevel不为1,2,3', () => {
    const data = 0;
    expect(wrapper.vm.getBgColorClass(data)).to.equal('bg_color');
  });
});
