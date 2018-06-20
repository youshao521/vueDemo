import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import StatusMachines from '../../../../src/views/status/StatusMachines.vue';

axiosInstance.defaults.baseURL = undefined;

describe('StatusMachines.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(StatusMachines);
    wrapper.vm.$router.push('/status/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it.skip('路由切换,数据刷新', () => {
    wrapper.vm.fetchData();
    moxios.wait(() => {
      expect(wrapper.vm.activeName).to.equal('first');
    });
  });

  it('获取机器状态信息----成功', (done) => {
    wrapper.vm.$router.push('/status/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88');
    const data = {
      machine: {
        agent: '',
        components: [
          {
            category: 'foundational',
            componentId: '@bic',
            createdAt: '2017-11-27T11:21:49.112Z',
            description: '',
            enabled: true,
            id: '@bic_1.0.0',
            lastUpdated: '',
            latestVersion: '1.0.0',
            machine: [],
            name: '综合安防运行管理中心',
            size: 0,
            space: 6270718,
            state: 'normal',
            type: 'web',
            unsolvedAlerts: 1,
            version: '1.0.0',
          },
          {
            category: 'foundational',
            componentId: 'postgresql96win64',
            createdAt: '2017-11-27T11:34:38.398Z',
            description: '2017-09-26 [1.0.0]\r\n',
            enabled: true,
            id: 'postgresql96win64_1.0.0',
            lastUpdated: '2017-11-27T11:34:44.508Z',
            latestVersion: '1.0.0',
            machine: [],
            name: 'PostgreSQL',
            size: 0,
            space: 666751,
            state: 'normal',
            type: 'backend',
            unsolvedAlerts: 0,
            version: '1.0.0',
          },
        ],
        createdAt: '2017-11-27T11:18:48.133Z',
        id: '5C8B8673-0363-4893-98A8-9140FF2B5B88',
        ip: '10.20.147.72',
        isCenter: true,
        name: '中心管理服务器',
        port: 8010,
        processes: [
          {
            cpu: 0,
            description: 'hik.opsmgr.notifyagent.exe',
            id: '10716',
            instance: null,
            memory: 13455360,
            name: 'hik.opsmgr.notifyagent.exe',
            path: 'D:\\Hikvision\\opsMgrAgent\\modules\\notify\\hik.opsmgr.notifyagent.exe',
            selected: true,
            state: 'running',
          },
        ],
        serverId: 0,
        state: 'online',
        status: {
          cpu: '0',
          disks: [
            {
              name: 'C',
              sys: false,
              total: '104755196',
              used: '43672300',
            },
            {
              name: 'D',
              sys: false,
              total: '765868028',
              used: '90753096',
            },
            {
              name: 'F',
              sys: true,
              total: '104856572',
              used: '24453912',
            },
          ],
          lastUpdated: '2017-11-28T06:47:17.239Z',
          memory: {
            total: '32GB',
            useRatio: '20',
            used: '6.5GB',
          },
          updateTime: '',
          uptime: 1201376,
        },
        systemProcesses: [
          {
            cpu: 0,
            description: 'System',
            id: '4',
            instance: null,
            memory: 0,
            name: 'System',
            path: '',
            selected: false,
            state: 'running',
          },
          {
            cpu: 0,
            description: 'smss.exe',
            id: '484',
            instance: null,
            memory: 0,
            name: 'smss.exe',
            path: '',
            selected: false,
            state: 'running',
          },
        ],
        type: 'server',
        unsolvedAlerts: 0,
      },
    };

    wrapper.vm.getStatusByMachineId();
    expect(wrapper.vm.loading).to.equal(true);

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
        expect(wrapper.vm.machineStatus.isCenter).to.equal(true);
        done();
      });
      done();
    });
  });

  it.skip('获取机器状态信息----失败', (done) => {
    wrapper.vm.$router.push('/status/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88');
    const data = null;

    wrapper.vm.getStatusByMachineId();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 442,
        response: { code: '0x00117001', msg: '程序异常', data, needSug: false },
      }).then(() => {
        expect(wrapper.vm.machineStatus).to.equal({});
        done();
      });
      done();
    });
  });

  it.skip('添加进程弹框', () => {
    wrapper.vm.addProVisible = false;
    wrapper.vm.openAddProcess();
    moxios.wait(() => {
      expect(wrapper.vm.addProVisible).to.equal(true);
    });
  });

  // it('添加进程成功,添加弹框消失', () => {
  //   wrapper.vm.addProVisible = true;
  //   moxios.stubOnce('POST',
  //     '/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88/processes?_method=PUT', {
  //       status: 200,
  //       response: {
  //         code: '0',
  //         msg: '',
  //         data: {
  //           username: 'sysadmin',
  //           salt: 'a8e2f7fd2745ee974f71ce801f209d50',
  //           challenge: {
  //             code: '7cb0a06ad631e5b545b25ab8490a984c',
  //             id: '5fbd617406dd4ff2f01b9004b6c14608',
  //           },
  //         },
  //       },
  //     });
  // });
});
