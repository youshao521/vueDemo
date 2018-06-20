import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import InstanceProcessTable from '../../../../src/views/status/InstanceProcessTable.vue';

axiosInstance.defaults.baseURL = undefined;

describe('InstanceProcessTable.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(InstanceProcessTable, {
      propsData: {
        isBic: false,
        isOnline: false,
      },
    });
    wrapper.vm.$router.push('/status');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  // it('关闭扫描失败提示框', () => {
  //   const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
  //   const componentId = 'liguopeng_1.0.0';
  // });

  it('methods(): getRowspanLevelOne', () => {
    const item = {
      instances: [
        {
          name: '实例1',
          processes: [
            {
              type: 'Instance',
              name: '进程1',
            },
            {
              name: '进程2',
            },
          ],
        },
        {
          name: '实例2',
          processes: [
            {
              type: 'Instance',
              name: '进程3',
            },
          ],
        },
      ],
    };
    expect(wrapper.vm.getRowspanLevelOne(item)).to.equal(3);
  });

  it('修改实例名称弹框', () => {
    const item = {
      instanceid: 'dac_1.0.0_dmsqueue_5083E85B-7DA7-4AF1-BBF4-CE99D7422EE3_2',
      instancename: '设备管理消息推送队列-10.67.183.216-#2',
    };
    wrapper.vm.editName(item, 1);
    expect(wrapper.vm.ruleForm.id).to.equal('dac_1.0.0_dmsqueue_5083E85B-7DA7-4AF1-BBF4-CE99D7422EE3_2');
  });

  it('修改实例名称----确认----未改变', (done) => {
    wrapper.setData({
      ruleForm: {
        name: 'test',
      },
      editNameCopy: 'test',
    });
    wrapper.vm.editInstance();
    done();
  });

  it('确认修改实例名称----成功', (done) => {
    const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    const componentId = 'liguopeng_1.0.0';
    wrapper.setData({
      ruleForm: {
        id: 'tomcat85win64_1.0.0_javaweb_C7D9287E-92D9-427C-B68C-4AD6D426C8A1_1',
        name: 'Tomcat服务-10.19.137.115-#12',
      },
      editVisible: true,
    });
    wrapper.vm.confirmEditInstance(machineId, componentId);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.editVisible).to.equal(false);
        done();
      });
      done();
    });
  });

  it('确认修改实例名称----失败', (done) => {
    const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    const componentId = 'liguopeng_1.0.0';
    wrapper.setData({
      ruleForm: {
        id: 'tomcat85win64_1.0.0_javaweb_C7D9287E-92D9-427C-B68C-4AD6D426C8A1_1',
        name: 'Tomcat服务-10.19.137.115-#12',
      },
      editVisible: true,
    });
    wrapper.vm.confirmEditInstance(machineId, componentId);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x00131517',
          msg: '修改的服务实例名称全局已存在',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.editVisible).to.equal(false);
        done();
      });
      done();
    });
  });

  it('确认修改实例名称接口异常', (done) => {
    const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    const componentId = 'liguopeng_1.0.0';
    wrapper.setData({
      ruleForm: {
        id: 'tomcat85win64_1.0.0_javaweb_C7D9287E-92D9-427C-B68C-4AD6D426C8A1_1',
        name: 'Tomcat服务-10.19.137.115-#12',
      },
      editVisible: true,
    });
    wrapper.vm.confirmEditInstance(machineId, componentId);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0x12345678',
          msg: '程序异常',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.editVisible).to.equal(false);
        done();
      });
      done();
    });
  });

  it('停止服务', (done) => {
    const instance = {
      name: 'hik.tomcat85win64.javaweb.1',
      cpu: 0,
      type: 'Instance',
      memory: 533270528,
      instancename: 'Tomcat服务-10.20.147.73-#1',
      instanceid: 'tomcat85win64_1.0.0_javaweb_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
      servicename: 'Tomcat服务',
      serviceid: 'javaweb',
      expansion: true,
      path: 'D:\\Hikvision\\components\\tomcat85win64.1',
      instanceStatus: 'SERVICE_RUNNING',
      manualAdd: false,
      selfCheckLink: 'http://10.20.147.73:8080/tomcatManage/monitor?language=zh_CN&user=sysadmin',
      cluster: {},
      machine: {
        ip: '10.20.147.73',
        name: '中心管理服务器',
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        state: 'online',
      },
      middleware: {},
      ports: [{
        protocol: 'tcp',
        value: '8080',
      }],
      serrowspan: 2,
      serhidden: false,
      insrowspan: 2,
      inshidden: false,
    };
    const type = 'stop';
    wrapper.vm.operateInstance(instance, type);
    expect(instance.instanceStatus).to.equal('SERVICE_STOP_PENDING');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {
            createdAt: '2018-02-27T03:17:17.257Z',
            description: '',
            id: 'Instance-7cfe9265-0e8b-42b2-9ced-f4bceefba08c',
            progress: 0,
            resource: 'instance',
            state: 'finish',
            type: 'stop',
            username: '',
          },
          msg: '操作成功',
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('停止服务操作失败', (done) => {
    const instance = {
      name: 'hik.tomcat85win64.javaweb.1',
      cpu: 0,
      type: 'Instance',
      memory: 533270528,
      instancename: 'Tomcat服务-10.20.147.73-#1',
      instanceid: 'tomcat85win64_1.0.0_javaweb_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
      servicename: 'Tomcat服务',
      serviceid: 'javaweb',
      expansion: true,
      path: 'D:\\Hikvision\\components\\tomcat85win64.1',
      instanceStatus: 'SERVICE_RUNNING',
      manualAdd: false,
      selfCheckLink: 'http://10.20.147.73:8080/tomcatManage/monitor?language=zh_CN&user=sysadmin',
      cluster: {},
      machine: {
        ip: '10.20.147.73',
        name: '中心管理服务器',
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        state: 'online',
      },
      middleware: {},
      ports: [{
        protocol: 'tcp',
        value: '8080',
      }],
      serrowspan: 2,
      serhidden: false,
      insrowspan: 2,
      inshidden: false,
    };
    const type = 'stop';
    wrapper.vm.operateInstance(instance, type);
    expect(instance.instanceStatus).to.equal('SERVICE_STOP_PENDING');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x00137060',
          data: null,
          msg: '服务实例启停操作未响应，请刷新页面，等待操作结果是否成功',
        },
      }).then(() => {
        expect(instance.instanceStatus).to.equal('SERVICE_RUNNING');
        done();
      });
      done();
    });
  });

  it('启动服务', (done) => {
    const instance = {
      name: 'hik.tomcat85win64.javaweb.1',
      cpu: 0,
      type: 'Instance',
      memory: 533270528,
      instancename: 'Tomcat服务-10.20.147.73-#1',
      instanceid: 'tomcat85win64_1.0.0_javaweb_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
      servicename: 'Tomcat服务',
      serviceid: 'javaweb',
      expansion: true,
      path: 'D:\\Hikvision\\components\\tomcat85win64.1',
      instanceStatus: 'SERVICE_STOPPED',
      manualAdd: false,
      selfCheckLink: 'http://10.20.147.73:8080/tomcatManage/monitor?language=zh_CN&user=sysadmin',
      cluster: {},
      machine: {
        ip: '10.20.147.73',
        name: '中心管理服务器',
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        state: 'online',
      },
      middleware: {},
      ports: [{
        protocol: 'tcp',
        value: '8080',
      }],
      serrowspan: 2,
      serhidden: false,
      insrowspan: 2,
      inshidden: false,
    };
    const type = 'start';
    wrapper.vm.operateInstance(instance, type);
    expect(instance.instanceStatus).to.equal('SERVICE_START_PENDING');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {
            createdAt: '2018-02-27T03:17:17.257Z',
            description: '',
            id: 'Instance-7cfe9265-0e8b-42b2-9ced-f4bceefba08c',
            progress: 0,
            resource: 'instance',
            state: 'finish',
            type: 'start',
            username: '',
          },
          msg: '操作成功',
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('启动服务操作失败', (done) => {
    const instance = {
      name: 'hik.tomcat85win64.javaweb.1',
      cpu: 0,
      type: 'Instance',
      memory: 533270528,
      instancename: 'Tomcat服务-10.20.147.73-#1',
      instanceid: 'tomcat85win64_1.0.0_javaweb_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
      servicename: 'Tomcat服务',
      serviceid: 'javaweb',
      expansion: true,
      path: 'D:\\Hikvision\\components\\tomcat85win64.1',
      instanceStatus: 'SERVICE_STOPPED',
      manualAdd: false,
      selfCheckLink: 'http://10.20.147.73:8080/tomcatManage/monitor?language=zh_CN&user=sysadmin',
      cluster: {},
      machine: {
        ip: '10.20.147.73',
        name: '中心管理服务器',
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
        state: 'online',
      },
      middleware: {},
      ports: [{
        protocol: 'tcp',
        value: '8080',
      }],
      serrowspan: 2,
      serhidden: false,
      insrowspan: 2,
      inshidden: false,
    };
    const type = 'start';
    wrapper.vm.operateInstance(instance, type);
    expect(instance.instanceStatus).to.equal('SERVICE_START_PENDING');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x00137060',
          data: null,
          msg: '服务实例启停操作未响应，请刷新页面，等待操作结果是否成功',
        },
      }).then(() => {
        expect(instance.instanceStatus).to.equal('SERVICE_STOPPED');
        done();
      });
      done();
    });
  });

  it('运行状态----正在运行', () => {
    const state = 'SERVICE_RUNNING';
    expect(wrapper.vm.getState(state)).to.equal('running');
  });

  it('运行状态----已停止', () => {
    const state = 'SERVICE_STOPPED';
    expect(wrapper.vm.getState(state)).to.equal('stoped');
  });

  it('运行状态----正在启动', () => {
    const state = 'SERVICE_START_PENDING';
    expect(wrapper.vm.getState(state)).to.equal('startPending');
  });

  it('运行状态----正在停止', () => {
    const state = 'SERVICE_STOP_PENDING';
    expect(wrapper.vm.getState(state)).to.equal('stopPending');
  });

  it('运行状态----无', () => {
    const state = '';
    expect(wrapper.vm.getState(state)).to.equal('-');
  });

  it('自检', (done) => {
    const item = {
      selfCheckLink: 'http://www.baidu.com',
    };
    wrapper.vm.selfCheck(item);
    done();
  });

  it.skip('链接至对应中间件', () => {
    const mid = {
      id: 'liguopeng_1.0.0',
      machine: {
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
    };
    wrapper.vm.toMiddleware(mid);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$route.params.machineId).to.equal('56EA52B7-6B38-4270-8306-B6F490B6DE2D');
      expect(wrapper.vm.$route.params.componentId).to.equal('liguopeng_1.0.0');
    });
  });

  it('分组,服务器名称校验---validName----illegalCharacter', () => {
    let exStr = '';
    wrapper.vm.validName(false, '100%', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('illegalCharacter');
  });

  it('分组,服务器名称校验---validName成功', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'testsuccess', (retStr) => {
      exStr = retStr;
    });
    expect(exStr).to.equal(undefined);
  });
});
