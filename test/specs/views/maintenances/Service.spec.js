import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import Service from '../../../../src/views/maintenances/Service.vue';

axiosInstance.defaults.baseURL = undefined;

describe('Service.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(Service);
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
    moxios.uninstall(axiosInstance);
  });

  it('初始化', (done) => {
    wrapper.vm.init();
    moxios.stubOnce('GET', '/settings/services/options?view=external', {
      status: 200,
      response: {
        code: '0',
        data: {
          components: [{
            name: '事件联动 1.0.0',
            id: 'els_1.0.0',
            services: [{
              id: 'elslre',
              name: '事件联动规则引擎',
            }],
          }],
          machines: [{
            ip: '1.1.1.1',
            name: 'test服务器',
            id: 'df90e8fc-1b62-4211-8a3b-649020023549',
          }],
        },
        msg: 'success',
      },
    });
    wrapper.vm.fetchSettingOptions();
    moxios.wait(() => {
      done();
    });
  });
  it('获取实例信息', (done) => {
    moxios.stubOnce('GET', '/instances?filter=third-party&with=status&componentId=&serviceId=&machineId=&q=&page=1&perPage=20', {
      status: 200,
      response: {
        code: '0',
        data: {
          total: 1,
          perPage: 20,
          lastPage: 1,
          instances: [{
            path: '',
            cluster: null,
            component: {
              componentId: 'els',
              name: '事件联动',
              id: 'els_1.0.0',
              version: '1.0.0',
            },
            service: {
              name: '事件联动规则引擎',
              id: 'elslre',
            },
            machine: {
              ip: '1.1.1.1',
              name: 'test服务器',
              id: 'df90e8fc-1b62-4211-8a3b-649020023549',
            },
            name: 'test',
            id: 'els_1.0.0_elslre_df90e8fc-1b62-4211-8a3b-649020023549_1',
            ports: [],
          }],
          page: 1,
        },
        msg: '',
      },
    });
    wrapper.vm.getData();
    moxios.wait(() => {
      done();
    });
  });

  it('获取服务器列表数据', (done) => {
    moxios.stubOnce('GET', '/machines', {
      status: 200,
      response: {
        code: '0',
        data: {
          machines: [{
            agent: '',
            components: [],
            createdAt: '',
            group: {
              id: '1',
              name: '运行管理中心',
            },
            id: '6AABE1F3-EC24-4F14-A566-7A8EAAC7C949',
            ip: '10.13.81.106',
            isCenter: false,
            name: '10.13.81.106',
            port: 0,
            serverId: 0,
            state: 'online',
            type: '',
          }, {
            agent: '',
            components: [],
            createdAt: '',
            group: {
              id: '1',
              name: '运行管理中心',
            },
            id: 'C7D9287E-92D9-427C-B68C-4AD6D426C8A1',
            ip: '10.13.81.12',
            isCenter: false,
            name: '10.13.81.12',
            port: 0,
            serverId: 0,
            state: 'online',
            type: '',
          }, {
            agent: '',
            components: [{
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'activemq514linux64_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: 'ActiveMQ',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'cluster_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: '集群代理_linux',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: '@bic_1.1.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: '核心服务',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'jre18linux64_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: 'JRE',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'tomcat85linux64_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: 'Tomcat',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'webframework_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: '演示构架门户',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'ntp_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: '授时服务',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }, {
              category: '',
              componentId: '',
              createdAt: '',
              description: '',
              enabled: false,
              id: 'redislinux64_1.0.0',
              lastUpdated: '',
              latestVersion: '',
              machine: [],
              name: 'Redis',
              size: 0,
              state: 'abnormal',
              type: '',
              unsolvedAlerts: 0,
              version: '',
            }],
            createdAt: '',
            group: {
              id: '1',
              name: '运行管理中心',
            },
            id: '2A2870ED-5EB7-4B82-99C5-71BFE872961A',
            ip: '10.33.43.7',
            isCenter: true,
            name: '中心管理服务器t',
            port: 0,
            serverId: 0,
            state: 'online',
            type: '',
          }, {
            agent: '',
            components: [],
            createdAt: '',
            group: {
              id: '2',
              name: 'test2333',
            },
            id: '2BBD7701-ADC3-456C-82C1-253495F0722F',
            ip: '10.13.80.20',
            isCenter: false,
            name: '10.13.80.20',
            port: 0,
            serverId: 0,
            state: 'offline',
            type: '',
          }],
        },
        msg: '',
      },
    });
    wrapper.vm.getMachineList();
    moxios.wait(() => {
      done();
    });
  });

  it('处理筛选配置', (done) => {
    const json = {
      code: '0',
      data: {
        components: [{
          name: '设备接入框架',
          id: 'dac_0.7.0',
          services: [{
            id: 'das',
            name: '设备接入服务',
          }],
        }],
        machines: [{
          ip: '10.19.136.109',
          name: 'test服务器',
          id: '694256c7-09d4-4442-acec-6f726aa3228e',
        }],
      },
      msg: 'success',
    };
    wrapper.vm.dealSettingOptions(json);
    const filterComponent = [{
      name: '设备接入框架',
      id: 'dac_0.7.0',
    }];
    const filterServiceType = [{
      name: '设备接入服务',
      componentId: 'dac_0.7.0',
      id: 'das',
    }];
    expect(wrapper.vm.filterComponent).to.eql(filterComponent);
    expect(wrapper.vm.filterServiceType).to.eql(filterServiceType);
    done();
  });
  it('处理筛选配置--无数据', (done) => {
    const json = {
      code: '0',
      data: '',
      msg: 'success',
    };
    wrapper.vm.dealSettingOptions(json);
    done();
  });

  it('处理取回的数据', (done) => {
    const json = {
      code: '0',
      data: {
        total: 1,
        perPage: 20,
        lastPage: 1,
        instances: [{
          path: '',
          cluster: null,
          component: {
            componentId: 'dac',
            name: '设备接入框架',
            id: 'dac_0.7.0',
            version: '0.7.0',
          },
          service: {
            name: '设备接入服务',
            id: 'das',
          },
          machine: {
            ip: '10.19.136.109',
            name: 'test服务器',
            id: '694256c7-09d4-4442-acec-6f726aa3228e',
          },
          name: 'test',
          id: 'dac_0.7.0_das_694256c7-09d4-4442-acec-6f726aa3228e_1',
          ports: [
            '7302',
            '655',
            '7307',
          ],
        }],
        page: 1,
      },
      msg: '成功',
    };
    wrapper.vm.dealData(json);
    // const instanceList = [{
    //   component: {
    //     componentId: 'dac',
    //     name: '设备接入框架',
    //     id: 'dac_0.7.0',
    //     version: '0.7.0',
    //   },
    //   info: [{
    //     serviceType: {
    //       name: '设备接入服务',
    //       id: 'das',
    //     },
    //     instance: {
    //       id: 'dac_0.7.0_das_694256c7-09d4-4442-acec-6f726aa3228e_1',
    //       name: 'test',
    //     },
    //     cluster: null,
    //     ports: [
    //       '7302',
    //       '655',
    //       '7307',
    //     ],
    //     machine: {
    //       ip: '10.19.136.109',
    //       name: 'test服务器',
    //       id: '694256c7-09d4-4442-acec-6f726aa3228e',
    //     },
    //   }],
    // }];
    expect(wrapper.vm.instanceList).not.to.eql([]);
    done();
  });

  it('获取组件基本信息', (done) => {
    const componentId = 'acsclient_1.0.0';
    const machineId = 'd56e20b8-ba02-4121-b70c-0c033c5a30ff';
    wrapper.vm.getComponentInfo(machineId, componentId);
    const data = {
      component: {
        codes: [{
          code: '0x00000001',
          measure: '1.检查输入参数是否正确\\n2.检查浏览器是否IE11',
          description: '参数错误',
        }],
        componentId: 'acsclient',
        changelogs: [{
          createdAt: '2017-09-26',
          description: "重新设计:\r\n1、增加测试功能\r\n'测试SQL转义'\n",
          version: '1.0.0\r',
        }],
        services: [{
          detection: null,
          logPath: './logs/acsclient',
          name: '[acsclient]',
          conflicts: null,
          monitor: {
            processes: null,
          },
          id: 'acsclient_1.0.0_acsclient',
          requirement: {
            disk: 1000,
            memory: 2000,
          },
          type: 'client',
          dependencies: null,
        }],
        type: 'client',
        version: '1.0.0',
        browsers: [{
          versions: ['44x64'],
          name: 'Chrome',
        }, {
          versions: ['11x64'],
          name: 'IE',
        }],
        performance: '未做优化，性能直接依赖核心服务',
        systems: [],
        downloads: [{
          name: '用户手册',
          link: 'http://10.33.40.241:8001/download_bic/components/acsclient_1.0.0/document/用户手册.pdf',
          icon: '',
        }],
        function: '测试功能集合',
        name: '门禁管理组件',
        id: 'acsclient_1.0.0',
        menus: [{
          mode: 'embed',
          children: [],
          name: '门禁管理',
          link: '',
          icon: 'http://10.33.40.241:8001/download_bic/components/acsclient_1.0.0/icon/menu/1000001.png',
          description: '门禁管理菜单。',
          id: '1000001',
          type: 'segment',
          parentId: '',
        }],
        category: 'general',
        packageTime: '2017-09-28T11:26:12.123+08:00',
        deviceCompatibility: '测试支持的产品系列：\r\n1、DS-2CD4032FWD-(A)(P)(W)\r\n2、DS-2CD5052F-(A)(P)\r\n3、DS-2SC402A(P)\r\n\r\n支持的功能：\r\n1、预览\r\n2、回放\r\n3、云台控制（DS-2SC402A(P)不支持）\r\n\r\n不支持的产品系列：\r\n1、iDS-2CD6026FWD/FE(11-40mm)\r\n',
        compatibilities: null,
      },
    };
    const path = '/instances?' +
      'filter=third-party&with=status&componentId=&serviceId=&machineId=&q=&page=1&perPage=20';
    moxios.stubOnce('GET', path, {
      status: 200,
      response: {
        code: '0',
        data,
        msg: '',
      },
    });
    expect(wrapper.vm.componentInfo).to.eql({});
    done();
  });
  it('处理页码设置', (done) => {
    wrapper.vm.handleCurrentChange(3);
    expect(wrapper.vm.currentPage).to.equal(3);
    done();
  });

  it('处理每页条数设置', (done) => {
    wrapper.vm.handleSizeChange(30);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentPageSize).to.equal(30);
    });
    done();
  });

  it('检测名称长短', (done) => {
    wrapper.vm.instanceNameChange('asdfds');
    expect(wrapper.vm.maxLength).to.equal(false);
    done();
  });
  it('更改服务状态', (done) => {
    wrapper.vm.changeServiceStatus(true);
    expect(wrapper.vm.showAddService).to.equal(true);
    done();
  });

  it('清除基本信息', (done) => {
    wrapper.vm.clearBaseInfo('asdfds');
    expect(wrapper.vm.componentInfo).to.eql({});
    expect(wrapper.vm.nodeResetFlag).to.eql(true);
    done();
  });

  it('编辑实例名称', (done) => {
    const value = {
      serviceType: {
        name: 'asw',
        id: 'asw',
      },
      instance: {
        id: 'asw_1.1.0_asw_fc6647da-0615-4cb1-982d-9f45b72161c2_1',
        name: 'asd',
      },
      cluster: null,
      ports: [
        '6020',
        '6021',
        '6060',
        '555',
        '6120',
        '6011',
        '6027',
      ],
      machine: {
        ip: '1.1.1.1',
        name: 'asd服务器',
        id: 'fc6647da-0615-4cb1-982d-9f45b72161c2',
      },
    };
    const item = {
      component: {
        componentId: 'asw',
        name: 'asw',
        id: 'asw_1.1.0',
        version: '1.1.0',
      },
      info: [{
        serviceType: {
          name: 'asw',
          id: 'asw',
        },
        instance: {
          id: 'asw_1.1.0_asw_fc6647da-0615-4cb1-982d-9f45b72161c2_1',
          name: 'asd',
        },
        cluster: null,
        ports: [
          '6020',
          '6021',
          '6060',
          '555',
          '6120',
          '6011',
          '6027',
        ],
        machine: {
          ip: '1.1.1.1',
          name: 'asd服务器',
          id: 'fc6647da-0615-4cb1-982d-9f45b72161c2',
        },
      }],
    };
    wrapper.vm.editServiceName(value, item);
    wrapper.vm.editName = 'asd';
    expect(wrapper.vm.editName).to.equal(value.instance.name);
    expect(wrapper.vm.editInstanceId).to.equal(value.instance.id);
    expect(wrapper.vm.editMachineId).to.equal(value.machine.id);
    expect(wrapper.vm.editComponentId).to.equal(item.component.id);
    expect(wrapper.vm.editVisible).to.equal(true);
    done();
  });

  it('修改实例名称', (done) => {
    wrapper.vm.$refs.editInput = {
      currentValue: 'nihaoa',
    };
    wrapper.vm.editConfirm('a', 'b', 'c', 'd');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      }).then((json) => {
        expect(json.code).to.equal('01');
        done();
      }).catch(() => {
        done();
      });
    });
  });

  it('删除服务', (done) => {
    const value = {
      serviceType: {
        name: 'asw',
        id: 'asw',
      },
      instance: {
        id: 'asw_1.1.0_asw_fc6647da-0615-4cb1-982d-9f45b72161c2_1',
        name: 'asd',
      },
      cluster: null,
      ports: [
        '6020',
        '6021',
        '6060',
        '555',
        '6120',
        '6011',
        '6027',
      ],
      machine: {
        ip: '1.1.1.1',
        name: 'asd服务器',
        id: 'fc6647da-0615-4cb1-982d-9f45b72161c2',
      },
    };
    wrapper.vm.delService(value);
    done();
  });

  it('处理删除服务的返回', (done) => {
    const link = '/instances/mps_1.2.100_mps_de0d8611-a7b6-470f-a4b4-e966727fc721_1?_method=DELETE';
    moxios.stubOnce('POST', link, {
      status: 200,
      response: {
        code: '0',
        data: null,
        msg: '',
      },
    });
    wrapper.vm.dealDeleteInstance('mps_1.2.100_mps_de0d8611-a7b6-470f-a4b4-e966727fc721_1');
    moxios.wait(() => {
      done();
    });
  });
  it('获取服务基本信息', (done) => {
    const link = '/machines/fba29612-1e58-44e6-a0ba-b10e92284dde/components/mps_1.2.100/info';
    moxios.stubOnce('GET', link, {
      status: 200,
      response: {
        code: '0',
        data: {
          component: {},
        },
        msg: '',
      },
    });
    wrapper.vm.getComponentInfo('fba29612-1e58-44e6-a0ba-b10e92284dde', 'mps_1.2.100');
    moxios.wait(() => {
      expect(wrapper.vm.baseInfoActive).to.equal(true);
      done();
    });
  });
  it('点击清空输入框', (done) => {
    wrapper.vm.currentInputSearch = 'a';
    wrapper.vm.ruleForm.inputSearch = '';
    wrapper.vm.clearable();
    done();
  });
  it('连接测试失败', (done) => {
    moxios.stubOnce('GET', '/components/mps/instances/mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1/ping', {
      status: 200,
      response: { code: '0x00131528', data: null, msg: '0x00131528' },
    });
    const item = {
      component: {
        componentId: 'mps',
        name: '消息推送',
        id: 'mps_1.2.100',
        version: '1.2.100',
      },
      info: [
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
            name: 'test',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.81.106',
            name: 'test服务器',
            id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_693236de-62a4-44ea-a5a5-3cc0c9fa83e6_1',
            name: 'ceshissss',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '2.3.3.3',
            name: 'ceshi服务器',
            id: '693236de-62a4-44ea-a5a5-3cc0c9fa83e6',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bf5b49ac-a0d3-4952-abca-1b4ca464fe73_1',
            name: 'jjjjj',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.80.20',
            name: 'ddddddddd服务器',
            id: 'bf5b49ac-a0d3-4952-abca-1b4ca464fe73',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bea94767-6698-4735-9637-6752f6b07ef0_1',
            name: 'asd',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.33.43.7',
            name: 'dad服务器',
            id: 'bea94767-6698-4735-9637-6752f6b07ef0',
          },
          testscript: true,
        },
      ],
    };
    const value = {
      serviceType: {
        name: '消息推送服务',
        id: 'mps',
      },
      instance: {
        id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
        name: 'test',
      },
      cluster: null,
      ports: [
        '7016',
        '8030',
      ],
      machine: {
        ip: '10.13.81.106',
        name: 'test服务器',
        id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
      },
      testscript: true,
    };
    const { componentId } = item.component;
    const instanceId = value.instance.id;
    wrapper.vm.connectTest(item, value);
    moxios.wait(() => {
      expect(wrapper.vm.connectResult[componentId + instanceId]).to.equal('0x00131528');
      done();
    });
  });
  it('连接测试成功', (done) => {
    moxios.stubOnce('GET', '/components/mps/instances/mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1/ping', {
      status: 200,
      response: { code: '0', data: null, msg: '0x00131528' },
    });
    const item = {
      component: {
        componentId: 'mps',
        name: '消息推送',
        id: 'mps_1.2.100',
        version: '1.2.100',
      },
      info: [
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
            name: 'test',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.81.106',
            name: 'test服务器',
            id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_693236de-62a4-44ea-a5a5-3cc0c9fa83e6_1',
            name: 'ceshissss',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '2.3.3.3',
            name: 'ceshi服务器',
            id: '693236de-62a4-44ea-a5a5-3cc0c9fa83e6',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bf5b49ac-a0d3-4952-abca-1b4ca464fe73_1',
            name: 'jjjjj',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.80.20',
            name: 'ddddddddd服务器',
            id: 'bf5b49ac-a0d3-4952-abca-1b4ca464fe73',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bea94767-6698-4735-9637-6752f6b07ef0_1',
            name: 'asd',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.33.43.7',
            name: 'dad服务器',
            id: 'bea94767-6698-4735-9637-6752f6b07ef0',
          },
          testscript: true,
        },
      ],
    };
    const value = {
      serviceType: {
        name: '消息推送服务',
        id: 'mps',
      },
      instance: {
        id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
        name: 'test',
      },
      cluster: null,
      ports: [
        '7016',
        '8030',
      ],
      machine: {
        ip: '10.13.81.106',
        name: 'test服务器',
        id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
      },
      testscript: true,
    };
    const { componentId } = item.component;
    const instanceId = value.instance.id;
    wrapper.vm.connectTest(item, value);
    moxios.wait(() => {
      expect(wrapper.vm.connectStatus[componentId + instanceId]).to.equal('green');
      done();
    });
  });
  it('弹窗关闭之前', (done) => {
    wrapper.vm.beforeClose(done);
    expect(wrapper.vm.editServiceLoading).to.eqlal(false);
    done();
  });
  it('编辑服务', (done) => {
    const item = {
      component: {
        componentId: 'mps',
        name: '消息推送',
        id: 'mps_1.2.100',
        version: '1.2.100',
      },
      info: [
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
            name: 'test',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.81.106',
            name: 'test服务器',
            id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_693236de-62a4-44ea-a5a5-3cc0c9fa83e6_1',
            name: 'ceshissss',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '2.3.3.3',
            name: 'ceshi服务器',
            id: '693236de-62a4-44ea-a5a5-3cc0c9fa83e6',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bf5b49ac-a0d3-4952-abca-1b4ca464fe73_1',
            name: 'jjjjj',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.13.80.20',
            name: 'ddddddddd服务器',
            id: 'bf5b49ac-a0d3-4952-abca-1b4ca464fe73',
          },
          testscript: true,
        },
        {
          serviceType: {
            name: '消息推送服务',
            id: 'mps',
          },
          instance: {
            id: 'mps_1.2.100_mps_bea94767-6698-4735-9637-6752f6b07ef0_1',
            name: 'asd',
          },
          cluster: null,
          ports: [
            '7016',
            '8030',
          ],
          machine: {
            ip: '10.33.43.7',
            name: 'dad服务器',
            id: 'bea94767-6698-4735-9637-6752f6b07ef0',
          },
          testscript: true,
        },
      ],
    };
    const value = {
      serviceType: {
        name: '消息推送服务',
        id: 'mps',
      },
      instance: {
        id: 'mps_1.2.100_mps_59abffd7-5169-4a75-a5ce-d45e50c3a152_1',
        name: 'test',
      },
      cluster: null,
      ports: [
        '7016',
        '8030',
      ],
      machine: {
        ip: '10.13.81.106',
        name: 'test服务器',
        id: '59abffd7-5169-4a75-a5ce-d45e50c3a152',
      },
      testscript: true,
    };
    const { componentId } = item.component;
    const instanceId = value.instance.id;
    moxios.stubOnce('GET', `/components/${componentId}/instances/${instanceId}/config`, {
      status: 200,
      response: { code: '0', data: null, msg: '0' },
    });
    wrapper.vm.editService(item, value);
    moxios.wait(() => {
      expect(wrapper.vm.editServiceLoading).to.equal(false);
      done();
    });
  });
  it('theadMouseLeave函数', (done) => {
    wrapper.vm.theadMouseLeave();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.theadCursor).to.equal('auto');
      done();
    });
  });
  it('dragMouseMove函数', (done) => {
    wrapper.vm.mouseMoveStart = false;
    wrapper.vm.startX = 11;
    wrapper.vm.dragMouseMove();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.mouseMoveStart).to.equal(true);
      done();
    });
  });
});
