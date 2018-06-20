import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import Status from '../../../../src/views/status/Status.vue';

axiosInstance.defaults.baseURL = undefined;

describe('Status.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(Status);
    wrapper.vm.$router.push('/status');
    moxios.stubOnce('GET', '/groups?with=component', {
      status: 200,
      response: {
        code: '0',
        data: {
          groups: [{
            name: '运行管理中心',
            groups: [{
              name: 'ceshibianjifenzu',
              groups: [],
              id: '2',
              machines: [],
              type: 'group',
              parentId: '1',
              sid: '2',
            }],
            id: '1',
            machines: [{
              isCenter: true,
              components: [{
                devices: [],
                name: '演示构架门户',
                id: 'webframework_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:07:23.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
              }, {
                devices: [],
                name: 'asw',
                id: 'asw_1.1.0',
                type: 'component',
                version: 'V1.1.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T20:06:30.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dasw_1.1.0',
              }, {
                devices: [],
                name: '消息推送',
                id: 'mps_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:06:32.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dmps_1.0.0',
              }, {
                devices: [],
                name: '集群代理',
                id: 'cluster_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-10T11:36:35.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dcluster_1.0.0',
              }, {
                devices: [],
                name: 'Redis',
                id: 'rediswin64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:17:57.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Drediswin64_1.0.0',
              }, {
                devices: [],
                name: 'Tomcat',
                id: 'tomcat85win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:07:04.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dtomcat85win64_1.0.0',
              }, {
                devices: [],
                name: 'ActiveMQ',
                id: 'activemq514win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:06:07.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dactivemq514win64_1.0.0',
              }, {
                devices: [],
                name: 'JRE',
                id: 'jre18win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:05:50.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Djre18win64_1.0.0',
              }, {
                devices: [],
                name: 'PostgreSQL',
                id: 'postgresql96win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:04:52.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dpostgresql96win64_1.0.0',
              }, {
                devices: [],
                name: '核心服务',
                id: '@bic_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:04:06.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D@bic_1.0.0',
              }],
              name: '中心管理服务器',
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
              state: 'online',
              type: 'machine',
              parentId: '1',
              sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            }, {
              isCenter: false,
              components: [],
              name: 'tianjunwei111',
              id: '925D0ACD-0489-4665-8FE4-A90657507018',
              state: 'online',
              type: 'machine',
              parentId: '1',
              sid: '925D0ACD-0489-4665-8FE4-A90657507018',
            }],
            type: 'group',
            parentId: '0',
            sid: '1',
          }],
        },
        msg: '',
      },
    });
    moxios.stubOnce('GET', '/status/alerts', {
      status: 200,
      response: {
        code: '0',
        data: {
          total: {
            general: 7,
            critical: 44,
            warning: 0,
          },
          resources: [{
            general: 4,
            critical: 16,
            resource: 'group',
            warning: 0,
            pId: 0,
            id: '1',
          }, {
            general: 0,
            critical: 0,
            resource: 'group',
            warning: 0,
            pId: 1,
            id: '2',
          }, {
            general: 1,
            critical: 10,
            resource: 'machine',
            warning: 0,
            id: '/machines/925D0ACD-0489-4665-8FE4-A90657507018',
          }, {
            general: 3,
            critical: 6,
            resource: 'machine',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/asw_1.1.0',
          }, {
            general: 1,
            critical: 25,
            resource: 'component',
            warning: 0,
            id: '/machines/2BBD7701-ADC3-456C-82C1-253495F0722F/components/opsmgr_1.0.1',
          }, {
            general: 0,
            critical: 2,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/opsmgr_1.0.1',
          }, {
            general: 0,
            critical: 1,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/postgresql96win64_1.0.0',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/9248336F-A871-47C8-BF20-F8D7B5FFF589/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/A0E176B6-8312-4AFA-995B-B29BC7FB8FA1/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 10,
            resource: 'component',
            warning: 0,
            id: '/machines/925D0ACD-0489-4665-8FE4-A90657507018/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/cluster_1.0.0',
          }, {
            general: 1,
            critical: 2,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/@bic_1.0.0',
          }, {
            general: 0,
            critical: 1,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/tomcat85win64_1.0.0',
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

  it('导航树的展示', (done) => {
    const values = [
      {
        code: '0',
        data: {
          total: {
            general: 7,
            critical: 44,
            warning: 0,
          },
          resources: [{
            general: 4,
            critical: 16,
            resource: 'group',
            warning: 0,
            pId: 0,
            id: '1',
          }, {
            general: 0,
            critical: 0,
            resource: 'group',
            warning: 0,
            pId: 1,
            id: '2',
          }, {
            general: 1,
            critical: 10,
            resource: 'machine',
            warning: 0,
            id: '/machines/925D0ACD-0489-4665-8FE4-A90657507018',
          }, {
            general: 3,
            critical: 6,
            resource: 'machine',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/asw_1.1.0',
          }, {
            general: 1,
            critical: 25,
            resource: 'component',
            warning: 0,
            id: '/machines/2BBD7701-ADC3-456C-82C1-253495F0722F/components/opsmgr_1.0.1',
          }, {
            general: 0,
            critical: 2,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/opsmgr_1.0.1',
          }, {
            general: 0,
            critical: 1,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/postgresql96win64_1.0.0',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/9248336F-A871-47C8-BF20-F8D7B5FFF589/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/A0E176B6-8312-4AFA-995B-B29BC7FB8FA1/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 10,
            resource: 'component',
            warning: 0,
            id: '/machines/925D0ACD-0489-4665-8FE4-A90657507018/components/opsmgr_1.0.1',
          }, {
            general: 1,
            critical: 0,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/cluster_1.0.0',
          }, {
            general: 1,
            critical: 2,
            resource: 'component',
            warning: 0,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/@bic_1.0.0',
          }, {
            general: 0,
            critical: 0,
            resource: 'component',
            warning: 1,
            id: '/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D/components/tomcat85win64_1.0.0',
          }],
        },
        msg: '',
      },
      {
        code: '0',
        data: {
          groups: [{
            name: '运行管理中心',
            groups: [{
              name: 'ceshibianjifenzu',
              groups: [],
              id: '2',
              machines: [],
              type: 'group',
              parentId: '1',
              sid: '2',
            }],
            id: '1',
            machines: [{
              isCenter: true,
              components: [{
                devices: [],
                name: '演示构架门户',
                id: 'webframework_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:07:23.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
              }, {
                devices: [],
                name: 'asw',
                id: 'asw_1.1.0',
                type: 'component',
                version: 'V1.1.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T20:06:30.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dasw_1.1.0',
              }, {
                devices: [],
                name: '消息推送',
                id: 'mps_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:06:32.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dmps_1.0.0',
              }, {
                devices: [],
                name: '集群代理',
                id: 'cluster_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-10T11:36:35.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dcluster_1.0.0',
              }, {
                devices: [],
                name: 'Redis',
                id: 'rediswin64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:17:57.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Drediswin64_1.0.0',
              }, {
                devices: [],
                name: 'Tomcat',
                id: 'tomcat85win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:07:04.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dtomcat85win64_1.0.0',
              }, {
                devices: [],
                name: 'ActiveMQ',
                id: 'activemq514win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:06:07.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dactivemq514win64_1.0.0',
              }, {
                devices: [],
                name: 'JRE',
                id: 'jre18win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:05:50.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Djre18win64_1.0.0',
              }, {
                devices: [],
                name: 'PostgreSQL',
                id: 'postgresql96win64_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:04:52.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dpostgresql96win64_1.0.0',
              }, {
                devices: [],
                name: '核心服务',
                id: '@bic_1.0.0',
                type: 'component',
                version: 'V1.0.0',
                parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                createAt: '2018-02-08T16:04:06.000+08:00',
                sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D@bic_1.0.0',
              }],
              name: '中心管理服务器',
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
              state: 'online',
              type: 'machine',
              parentId: '1',
              sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            }, {
              isCenter: false,
              components: [],
              name: 'tianjunwei111',
              id: '925D0ACD-0489-4665-8FE4-A90657507018',
              state: 'online',
              type: 'machine',
              parentId: '1',
              sid: '925D0ACD-0489-4665-8FE4-A90657507018',
            }],
            type: 'group',
            parentId: '0',
            sid: '1',
          }],
        },
        msg: '',
      },
    ];
    wrapper.setData({
      firstEnter: true,
    });
    wrapper.vm.handleShowNavTree(values);
    expect(wrapper.vm.noDataFlag).to.equal(false);
    expect(wrapper.vm.firstEnter).to.equal(false);

    // wrapper.vm.init();
    done();
  });

  it.skip('新增分组----打开弹框', () => {
    wrapper.setData({
      currentNode: {
        name: 'ceshibianjifenzu',
        groups: [],
        id: '2',
        machines: [],
        type: 'group',
        parentId: '1',
        sid: '2',
        children: [],
        nodetype: 1,
        keyid: '2',
        alertNum: 0,
        alertLevel: 0,
        groupLevel: 1,
      },
    });
    wrapper.vm.addGroupDialog();
    expect(wrapper.vm.ruleForm.name).to.equal('');
    expect(wrapper.vm.addGroupVisible).to.equal(true);
    expect(wrapper.vm.grouptargetid).to.equal('2');

    wrapper.vm.addGroupVisible = false;
    wrapper.vm.ruleForm.name = 'CSL';
    wrapper.vm.grouptargetid = '1';
    wrapper.vm.currentNode = {
      name: '2222',
      groups: [],
      id: '4',
      machines: [],
      type: 'group',
      parentId: '2',
      sid: '4',
      children: [],
      nodetype: 1,
      keyid: '4',
      alertNum: 0,
      alertLevel: 0,
      groupLevel: 2,
    };
    wrapper.vm.addGroupDialog();
    expect(wrapper.vm.ruleForm.name).to.equal('');
  });

  it.skip('新增分组----成功', (done) => {
    moxios.stubOnce('POST', '/groups', {
      status: 200,
      response: {
        code: '0',
        data: {
          group: {
            id: '3',
            name: 'addGroupTest',
          },
        },
        msg: '',
      },
    });

    wrapper.vm.addGroupVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.ruleForm.name = 'addGroupTest';
      wrapper.vm.grouptargetid = '1';
      wrapper.vm.confirmAddGroup();
    });

    moxios.wait(() => {
      expect(wrapper.vm.addGroupVisible).to.equal(false);
      done();
    });
  });

  it.skip('新增分组----失败', (done) => {
    moxios.stubOnce('POST', '/groups', {
      status: 422,
      response: {
        code: '0x00135006',
        data: null,
        msg: '分组名称不能重名，且不能和服务器重名',
      },
    });
    wrapper.vm.addGroupVisible = true;
    wrapper.vm.$nextTick(() => {
      wrapper.vm.ruleForm.name = 'addGroupTest';
      wrapper.vm.grouptargetid = '1';
      wrapper.vm.confirmAddGroup();
    });
    moxios.wait(() => {
      expect(wrapper.vm.addGroupVisible).to.equal(false);
      done();
    });
  });

  it.skip('点击编辑分组', () => {
    const testData = {
      name: 'test',
      id: 'testId',
    };
    wrapper.vm.editGroupDialog(testData);
    expect(wrapper.vm.editGroupVisible).to.equal(true);
    expect(wrapper.vm.groupid).to.equal('testId');
    expect(wrapper.vm.ruleForm.name).to.equal('test');
  });

  it.skip('编辑分组----成功', (done) => {
    wrapper.setData({
      groupid: '3',
      ruleForm: {
        name: 'addGroupTest2',
      },
    });
    wrapper.vm.confirmEditGroup();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            group: {
              id: '3',
              name: 'addGroupTest2',
            },
          },
        },
      }).then(() => {
        expect(wrapper.vm.editGroupVisible).to.equal(false);
        done();
      });
      done();
    });
  });

  it.skip('编辑分组----失败', (done) => {
    wrapper.setData({
      groupid: '3',
      ruleForm: {
        name: 'addGroupTest2',
      },
    });
    wrapper.vm.confirmEditGroup();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0123456789',
          msg: '',
          data: null,
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it.skip('添加服务器弹框---不是分组节点', () => {
    wrapper.setData({
      serverForm: {
        name: 'test',
        ip: '10.19.137.102',
        port: 8010,
        username: 'CSL',
        target: '1',
      },
      currentNode: {
        devices: [],
        name: '演示构架门户 V1.0.0',
        id: 'webframework_1.0.0',
        type: 'component',
        version: 'V1.0.0',
        parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        createAt: '2018-02-08T16:07:23.000+08:00',
        sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
        nodetype: 3,
        machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D-webframework_1.0.0',
        alertNum: 0,
        alertLevel: 0,
        state: 'online',
      },
    });

    wrapper.vm.addSerDialog();
    expect(wrapper.vm.serverForm.name).to.equal('');
    expect(wrapper.vm.serverForm.ip).to.equal('');
    expect(wrapper.vm.serverForm.username).to.equal('');
    expect(wrapper.vm.serverForm.target).to.equal('');
  });

  it.skip('添加服务器弹框---分组节点下', () => {
    wrapper.setData({
      serverForm: {
        name: 'test',
        ip: '10.19.137.102',
        port: 8010,
        username: 'CSL',
        target: '1',
      },
      currentNode: {
        name: 'ceshibianjifenzu',
        groups: [],
        id: '2',
        machines: [],
        type: 'group',
        parentId: '1',
        sid: '2',
        children: [],
        nodetype: 1,
        keyid: '2',
        alertNum: 0,
        alertLevel: 0,
        groupLevel: 1,
      },
    });

    wrapper.vm.addSerDialog();
    expect(wrapper.vm.serverForm.name).to.equal('');
    expect(wrapper.vm.serverForm.ip).to.equal('');
    expect(wrapper.vm.serverForm.username).to.equal('');
    expect(wrapper.vm.addVisible).to.equal(true);
    expect(wrapper.vm.serverFormLoading).to.equal(false);
    expect(wrapper.vm.serverForm.target).to.equal('2');
  });

  it.skip('确认添加服务器----失败', (done) => {
    wrapper.setData({
      serverForm: {
        name: 'test',
        ip: '10.19.137.102',
        port: 8010,
        username: 'CSL',
        target: '1',
      },
    });
    wrapper.vm.confirmAddServer();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: {
          code: '0x00135152',
          msg: '用户名或密码错误',
          data: null,
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.serverFormLoading).to.equal(false);
          expect(wrapper.vm.createError).to.equal('0x00135152');
          expect(wrapper.vm.addFailMessage).to.equal('用户名或密码错误');
          expect(wrapper.vm.addErrorVisible).to.equal(true);
        });
        done();
      });
      done();
    });
  });

  it.skip('确认添加服务器----成功', (done) => {
    wrapper.setData({
      serverForm: {
        name: 'test',
        ip: '10.19.137.102',
        port: 8010,
        username: 'CSL',
        target: '1',
      },
    });
    wrapper.vm.confirmAddServer();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            machine: {
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            },
          },
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.serverFormLoading).to.equal(true);
          expect(wrapper.vm.addVisible).to.equal(false);
        });
        done();
      });
      done();
    });
  });

  it.skip('确认添加服务器----失败(服务器不在线)', (done) => {
    wrapper.setData({
      serverForm: {
        name: 'test',
        ip: '10.19.137.102',
        port: 8010,
        username: 'CSL',
        target: '1',
      },
    });
    wrapper.vm.confirmAddServer();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: {
          code: '0x00135063',
          msg: '服务器不在线',
          data: null,
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.serverFormLoading).to.equal(false);
          expect(wrapper.vm.createError).to.equal('0x00135063');
          expect(wrapper.vm.addFailMessage).to.equal('服务器不在线');
          expect(wrapper.vm.addErrorVisible).to.equal(true);
          expect(wrapper.vm.agentDownErrShow).to.equal(true);
        });
        done();
      });
      done();
    });
  });

  it.skip('点击编辑服务器', () => {
    const testData = {
      name: '测试服务器',
      id: 'testId',
    };
    wrapper.vm.editMachineDialog(testData);
    expect(wrapper.vm.errorTip).to.equal('');
    expect(wrapper.vm.editMachineVisible).to.equal(true);
    expect(wrapper.vm.machOperObj.machineId).to.equal('testId');
    expect(wrapper.vm.ruleForm.name).to.equal('测试服务器');
  });

  it.skip('编辑服务器----成功', (done) => {
    wrapper.setData({
      machOperObj: {
        machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
      ruleForm: {
        name: 'test',
      },
    });
    wrapper.vm.confirmEditMachine();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            machine: {
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            },
          },
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.errorTip).to.equal('');
          expect(wrapper.vm.editMachineVisible).to.equal(false);
        });
        done();
      });
      done();
    });
  });

  it.skip('编辑服务器----失败', (done) => {
    wrapper.setData({
      machOperObj: {
        machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
      ruleForm: {
        name: 'test',
      },
    });
    wrapper.vm.confirmEditMachine();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0x00135057',
          msg: '服务器名称不能重名，且不能和分组重名',
          data: null,
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          // expect(wrapper.vm.errorTip).to.equal('服务器名称不能重名，且不能和分组重名');
          expect(this.$refs.editMachineInput.$el.children[0].style.borderColor).to.equal('#ff5353');
        });
        done();
      });
      done();
    });
  });

  it.skip('删除服务器----成功', (done) => {
    wrapper.vm.confirmDeleteMachine();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: '',
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.$route.params.machineId).to.equal(undefined);
        });
        done();
      });
      done();
    });
  });

  it.skip('删除服务器----失败', (done) => {
    wrapper.vm.confirmDeleteMachine();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0x0013717c',
          msg: '',
          data: null,
        },
      }).then(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.$route.params.machineId).to.equal(undefined);
        });
        done();
      });
      done();
    });
  });

  it.skip('分组,服务器名称校验---validName', () => {
    let exStr = '';
    wrapper.vm.validName(false, false, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('isRequired');
  });

  it.skip('分组,服务器名称校验---validName空格', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test test', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('noSpace');
  });

  it.skip('分组,服务器名称校验---validName长度', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test长度test长度test长度test长度more', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('nameInputLimit');
  });

  it.skip('分组,服务器名称校验---validName成功', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test长度success', (retStr) => {
      exStr = retStr;
    });
    expect(exStr).to.equal(undefined);
  });

  it.skip('agent代理下载', () => {
    wrapper.vm.jumpToAgent();
    expect(wrapper.vm.addErrorVisible).to.equal(false);
    expect(wrapper.vm.agentDownErrShow).to.equal(false);
    expect(wrapper.vm.agentVisible).to.equal(true);
    expect(wrapper.vm.addFailMessage).to.equal('');
    expect(wrapper.vm.createError).to.equal('');
  });

  it('路由跳转---服务器', () => {
    wrapper.vm.$router.push('/status/machines/56EA52B7-6B38-4270-8306-B6F490B6DE2D');
  });

  it('过滤导航树---关键字', () => {
    wrapper.setData({
      showAlert: false,
    });
    const value = {
      keyword: 'v',
    };
    const data = {
      devices: [],
      name: '演示构架门户 V1.0.0',
      id: 'webframework_1.0.0',
      type: 'component',
      version: 'V1.0.0',
      parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      createAt: '2018-02-08T16:07:23.000+08:00',
      sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
      nodetype: 3,
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D-webframework_1.0.0',
      alertNum: 0,
      alertLevel: 0,
      state: 'online',
    };
    expect(wrapper.vm.filterNode(value, data)).to.equal(true);
  });

  it('过滤导航树---告警数', () => {
    wrapper.setData({
      showAlert: true,
      noDataFlag: true,
    });
    const value = {
      keyword: '',
    };
    const data = {
      devices: [],
      name: '演示构架门户 V1.0.0',
      id: 'webframework_1.0.0',
      type: 'component',
      version: 'V1.0.0',
      parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      createAt: '2018-02-08T16:07:23.000+08:00',
      sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
      nodetype: 3,
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D-webframework_1.0.0',
      alertNum: 3,
      alertLevel: 1,
      state: 'online',
    };
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.filterNode(value, data)).to.equal(false);
    });
  });

  it('过滤导航树---告警数和关键字', () => {
    wrapper.setData({
      showAlert: true,
    });
    const value = {
      keyword: 'qqq',
    };
    const data = {
      devices: [],
      name: '演示构架门户 V1.0.0',
      id: 'webframework_1.0.0',
      type: 'component',
      version: 'V1.0.0',
      parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      createAt: '2018-02-08T16:07:23.000+08:00',
      sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
      nodetype: 3,
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D-webframework_1.0.0',
      alertNum: 3,
      alertLevel: 1,
      state: 'online',
    };
    expect(wrapper.vm.filterNode(value, data)).to.equal(false);
  });

  it('过滤导航树', () => {
    wrapper.setData({
      showAlert: false,
    });
    const value = {
      keyword: '',
    };
    const data = {
      devices: [],
      name: '演示构架门户 V1.0.0',
      id: 'webframework_1.0.0',
      type: 'component',
      version: 'V1.0.0',
      parentId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      createAt: '2018-02-08T16:07:23.000+08:00',
      sid: '56EA52B7-6B38-4270-8306-B6F490B6DE2Dwebframework_1.0.0',
      nodetype: 3,
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D-webframework_1.0.0',
      alertNum: 3,
      alertLevel: 1,
      state: 'online',
    };
    expect(wrapper.vm.filterNode(value, data)).to.equal(true);
  });
});
