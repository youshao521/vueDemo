import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import AddComponent from '../../../../src/views/status/AddComponent.vue';

axiosInstance.defaults.baseURL = undefined;

describe('AddComponent.vue', () => {
  describe('状态监控----添加组件', () => {
    let wrapper = null;

    beforeEach(() => {
      moxios.install(axiosInstance);
      wrapper = createWrapper(AddComponent, {
        propsData: {
          showAddComponent: true,
          currentNode: {},
        },
      });
      moxios.stubOnce('GET', '/api/packages?type=componentPack&filter=installable', {
        status: 200,
        response: {
          code: '0',
          data: [{
            consumer: null,
            createdAt: '2018-02-08 16:04:44.616+08:00',
            description: '﻿2018-01-10 [1.0.0]\r\nMicrosoft Visual C++ 2008 Redistributable(x64) Package ',
            enabled: false,
            framework: null,
            id: 'vcredist2008x64_1.0.0',
            installRequirement: '[]',
            languageTypes: null,
            name: 'VC2008运行时库(x64) ',
            packageId: 'vcredist2008x64',
            supportVersion: '0.0.0 - +oo',
            type: 'componentPack',
            version: '1.0.0',
          }, {
            consumer: null,
            createdAt: '2018-02-08 16:04:45.212+08:00',
            description: '﻿2018-01-10 [1.0.0]\r\nMicrosoft Visual C++ 2008 Redistributable(x86) Package ',
            enabled: false,
            framework: null,
            id: 'vcredist2008x86_1.0.0',
            installRequirement: '[]',
            languageTypes: null,
            name: 'Microsoft VC2008运行时库(x86) ',
            packageId: 'vcredist2008x86',
            supportVersion: '0.0.0 - +oo',
            type: 'componentPack',
            version: '1.0.0',
          }, {
            consumer: null,
            createdAt: '2018-02-08 16:04:45.798+08:00',
            description: '﻿2018-01-10 [1.0.0]\r\nMicrosoft Visual C++ 2015 Redistributable(x64) Package ',
            enabled: false,
            framework: null,
            id: 'vcredist2015x64_1.0.0',
            installRequirement: '[]',
            languageTypes: null,
            name: 'VC2015运行时库(x64) ',
            packageId: 'vcredist2015x64',
            supportVersion: '0.0.0 - +oo',
            type: 'componentPack',
            version: '1.0.0',
          }, {
            consumer: null,
            createdAt: '2018-02-08 16:04:46.444+08:00',
            description: '﻿2018-01-10 [1.0.0]\r\nMicrosoft Visual C++ 2015 Redistributable(x86) Package ',
            enabled: false,
            framework: null,
            id: 'vcredist2015x86_1.0.0',
            installRequirement: '[]',
            languageTypes: null,
            name: 'VC2015运行时库(x86) ',
            packageId: 'vcredist2015x86',
            supportVersion: '0.0.0 - +oo',
            type: 'componentPack',
            version: '1.0.0',
          }],
          msg: '',
        },
      });
      moxios.stubOnce('GET', '/machines', {
        status: 200,
        response: {
          code: '0',
          data: {
            machines: [{
              agent: '',
              components: [{
                category: '',
                componentId: '',
                createdAt: '',
                description: '',
                enabled: false,
                id: 'cluster_1.0.0',
                lastUpdated: '',
                latestVersion: '',
                machine: [],
                name: '集群代理',
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
                id: '@bic_1.0.0',
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
                id: 'postgresql96win64_1.0.0',
                lastUpdated: '',
                latestVersion: '',
                machine: [],
                name: 'PostgreSQL',
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
                id: 'jre18win64_1.0.0',
                lastUpdated: '',
                latestVersion: '',
                machine: [],
                name: 'JRE',
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
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
              ip: '10.20.147.73',
              isCenter: true,
              name: '中心管理服务器',
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
              id: '925D0ACD-0489-4665-8FE4-A90657507018',
              ip: '10.19.133.101',
              isCenter: false,
              name: 'tianjunwei111',
              port: 0,
              serverId: 0,
              state: 'offline',
              type: '',
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

    it.skip('AddComponent组件创建', () => {
      expect(wrapper.vm.dialogName).to.equal('addProxy');
      wrapper.vm.fetchData();
    });

    it('添加已安装组件弹框--goStepTwo(1)', () => {
      wrapper.setData({
        step: 1,
      });
      wrapper.vm.goStepTwo(1);
      expect(wrapper.vm.showInstallNew).to.equal(false);
      expect(wrapper.vm.showInstallOld).to.equal(true);
      // expect(wrapper.vm.step).to.equal(2);
    });

    it('安装新组件弹框--goStepTwo(2)', () => {
      wrapper.setData({
        step: 1,
      });
      wrapper.vm.goStepTwo(2);
      expect(wrapper.vm.showInstallNew).to.equal(true);
      expect(wrapper.vm.showInstallOld).to.equal(false);
      // expect(wrapper.vm.step).to.equal(2);
    });

    it('关闭添加组件弹框', () => {
      wrapper.vm.cancel();
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.configDialogVisible).to.equal(false);
        wrapper.vm.returnInstallParam();
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.searchForm.machineId).to.equal('');
          expect(wrapper.vm.searchForm.path).to.equal('');
        });
      });
    });

    it('上一步', () => {
      wrapper.setData({
        step: 2,
      });
      wrapper.vm.pre();
      expect(wrapper.vm.step).to.equal(1);
    });

    it('选择安装的组件', () => {
      const pack = {
        id: 'vcredist2008x64_1.0.0',
      };
      wrapper.vm.selectPackage(pack);
      expect(wrapper.vm.installForm.selectPackId).to.equal('vcredist2008x64_1.0.0');
    });

    it('showConfigDialog(false)', () => {
      wrapper.vm.showConfigDialog(false);
      expect(wrapper.vm.configDialogVisible).to.equal(false);
    });

    it('showConfigDialog(true)', () => {
      wrapper.vm.showConfigDialog(true);
      expect(wrapper.vm.configDialogVisible).to.equal(true);
    });

    it('showAddInstalledDialog(false)', () => {
      wrapper.vm.showAddInstalledDialog(false);
      expect(wrapper.vm.showAddInstalledCom).to.equal(false);
    });

    it('showAddInstalledDialog(true)', () => {
      wrapper.vm.showAddInstalledDialog(true);
      expect(wrapper.vm.showAddInstalledCom).to.equal(true);
    });

    it('扫描失败弹框--showScanFailDialog(false)', () => {
      wrapper.vm.showScanFailDialog(false);
      expect(wrapper.vm.showScanFail).to.equal(false);
    });

    it('扫描失败弹框--showScanFailDialog(true)', () => {
      wrapper.vm.showScanFailDialog(true);
      expect(wrapper.vm.showScanFail).to.equal(true);
    });

    it('扫描路径校验---validPath', () => {
      let exStr = '';
      wrapper.vm.validPath(false, false, (retStr) => {
        exStr = retStr.message;
      });
      expect(exStr).to.equal('inputComponentPath');
    });

    it('扫描路径校验---validPath---windows失败', () => {
      let exStr = '';
      wrapper.vm.validPath(false, 'd:/adasd|/', (retStr) => {
        exStr = retStr.message;
      });
      expect(exStr).to.equal('scanPathRegTip');
    });

    it('扫描路径校验---validPath---linux失败', () => {
      let exStr = '';
      wrapper.vm.validPath(false, '\\usr/bin', (retStr) => {
        exStr = retStr.message;
      });
      expect(exStr).to.equal('scanPathRegTip');
    });

    it('扫描路径校验---validPath---window成功', () => {
      let exStr = '';
      wrapper.vm.validPath(false, 'd:\\dac_V1.0.0\\', (retStr) => {
        exStr = retStr;
      });
      expect(exStr).to.equal(undefined);
    });

    it('扫描路径校验---validPath---linux成功', () => {
      let exStr = '';
      wrapper.vm.validPath(false, '/usr/bin/dac_V1.0.0/', (retStr) => {
        exStr = retStr;
      });
      expect(exStr).to.equal(undefined);
    });
  });
});
