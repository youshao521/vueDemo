import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ComponentBaseInfo from '../../../../src/views/status/ComponentBaseInfo.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ComponentBaseInfo.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    const propsData = {
      value: {
        codes: [{
          code: '0x00310000',
          measure: '1.检查JRE安装目录下的bin\\java.exe是否存在。\\n 2.检查相应的组件的目录是否完整',
          description: '解压失败,没有相应的java.exe',
        }, {
          code: '0x00310001',
          measure: '1.请检查相应的JRE安装目录下bin\\java.exe 或者jre\\bin\\javaw.exe是否存在',
          description: '检测jre文件失败',
        }],
        rundepends: [{
          name: 'PostgreSQL',
          type: 'remote',
          version: '1.0.0',
        }],
        componentId: 'jre18win64',
        changelogs: [{
          createdAt: '2017-12-18',
          description: '1.调整相应的组件目录\r\n2.调整相应的监控页面\r\n2017-09-26 [1.0.0]\r\n封装JRE组件\r\n',
          version: '1.0.0\r',
        }],
        services: [{
          detection: null,
          name: 'JRE',
          conflicts: null,
          monitor: {
            processes: null,
          },
          id: 'jre18win64_1.0.0_jdk',
          requirement: {
            disk: 250,
            memory: 150,
          },
          supportMultiDeploy: false,
          type: 'library',
          supportCluster: false,
          dependencies: null,
        }],
        type: 'backend',
        version: '1.0.0',
        browsers: [],
        performance: '暂无性能描述',
        systems: [{
          versions: ['2016x64', '2012r2x64', '2008r2x64'],
          name: 'Windows Server',
        }],
        downloads: [{
          name: '安装指导',
          link: 'http://10.67.183.216:8001/download_bic/components/jre18win64_1.0.0/document/安装说明.pdf',
          icon: '',
        }],
        function: '支持的功能：\r\n提供基础的Java程序运行环境',
        name: 'JRE',
        id: 'jre18win64_1.0.0',
        menus: [],
        category: 'foundational',
        packageTime: '2018-01-06T15:01:44.639+08:00',
        deviceCompatibility: '基础组件,无相关支持设备',
        compatibilities: null,
      },
    };
    wrapper = createWrapper(ComponentBaseInfo, { propsData });
    wrapper.vm.$router.push('/status/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88/jre18win64_1.0.0');
    wrapper.vm.machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    wrapper.vm.componentId = 'jre18win64_1.0.0';
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall();
  });

  describe('methods(): getCategoryName', () => {
    it('获取组件分类----framework', () => {
      const category = 'framework';
      expect(wrapper.vm.getCategoryName(category)).to.equal('framework');
    });
    it('获取组件分类----foundational', () => {
      const category = 'foundational';
      expect(wrapper.vm.getCategoryName(category)).to.equal('foundationalComponent');
    });
    it('获取组件分类----universal', () => {
      const category = 'universal';
      expect(wrapper.vm.getCategoryName(category)).to.equal('universalComponent');
    });
    it('获取组件分类----general', () => {
      const category = 'general';
      expect(wrapper.vm.getCategoryName(category)).to.equal('generalComponent');
    });
    it('获取组件分类----special', () => {
      const category = 'special';
      expect(wrapper.vm.getCategoryName(category)).to.equal('specialComponent');
    });
    it('获取组件分类----无', () => {
      const category = '';
      expect(wrapper.vm.getCategoryName(category)).to.equal('-');
    });
  });

  describe('methods(): getFrameworkType', () => {
    it('获取组件类型----web', () => {
      const type = 'web';
      expect(wrapper.vm.getFrameworkType(type)).to.equal('webCom');
    });
    it('获取组件类型----client', () => {
      const type = 'client';
      expect(wrapper.vm.getFrameworkType(type)).to.equal('clientCom');
    });
    it('获取组件类型----app', () => {
      const type = 'app';
      expect(wrapper.vm.getFrameworkType(type)).to.equal('appCom');
    });
    it('获取组件类型----backend', () => {
      const type = 'backend';
      expect(wrapper.vm.getFrameworkType(type)).to.equal('backendCom');
    });
    it('获取组件类型----无', () => {
      const type = '';
      expect(wrapper.vm.getFrameworkType(type)).to.equal('-');
    });
  });

  it('查看更多更新信息', () => {
    wrapper.setData({
      dialogVisible: false,
    });
    wrapper.vm.showMoreLogs(true);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.dialogVisible).to.equal(true);
    });
  });

  it('组件运行依赖----本机', () => {
    const deps = [{
      name: 'PostgreSQL',
      type: 'remote',
      version: '1.0.0',
    }];
    const type = 'local';
    const res = wrapper.vm.getDeps(deps, type);
    expect(res.length).to.equal(0);
  });
  it('组件运行依赖----远程', () => {
    const deps = [{
      name: 'PostgreSQL',
      type: 'remote',
      version: '1.0.0',
    }];
    const type = 'remote';
    const res = wrapper.vm.getDeps(deps, type);
    expect(res.length).to.equal(1);
  });
});
