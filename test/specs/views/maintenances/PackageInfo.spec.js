import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import PackageInfo from '../../../../src/views/maintenances/PackageInfo.vue';

axiosInstance.defaults.baseURL = undefined;

describe('PackageInfo.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      PackageType: 'componentPack',
      PackageInfo: {},
    };
    wrapper = createWrapper(PackageInfo, { propsData });
    wrapper.vm.$router.push('/maintenances/packages/web');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化(服务器)', () => {
    expect(wrapper.vm.PackageType).to.equal('componentPack');
    expect(Object.keys(wrapper.vm.PackageInfo).length).to.equal(0);
  });

  it('初始化（客户端）', () => {
    wrapper.vm.$router.push('/maintenances/packages/client');
    expect(wrapper.vm.PackageType).to.equal('componentPack');
    expect(Object.keys(wrapper.vm.PackageInfo).length).to.equal(0);
  });

  it('获取环境信息（为空）', () => {
    const res = wrapper.vm.getEnv(wrapper.vm.PackageInfo.browsers);
    expect(res.length).to.equal(0);
  });

  it('获取环境信息', () => {
    wrapper.vm.PackageInfo.browsers = [
      {
        name: 'ie11x64',
        version: ['ie11x64'],
      },
      {
        name: 'chrome44x64',
        version: ['chrome44x64'],
      },
    ];
    const res = wrapper.vm.getEnv(wrapper.vm.PackageInfo.browsers);
    expect(res.length).to.equal(2);
    expect(res[1]).to.equal('chrome44x64');
  });

  it('获取依赖信息（只有运行依赖）', () => {
    wrapper.vm.PackageInfo.dependencies = [
      {
        name: 'activemq514win64',
        runtimeDepend: 'activemq514win64_0.1.0',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'remote',
        version: '0.1.0',
      },
      {
        name: 'dac',
        runtimeDepend: 'dac_0.6.6',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'remote',
        version: '0.6.6',
      },
      {
        name: 'jre18win64',
        runtimeDepend: 'jre18win64_1.0.0',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'local',
        version: '1.0.0',
      },
    ];
    const { dependencies: deps, services } = wrapper.vm.PackageInfo;
    const res = wrapper.vm.getDeps(deps, services, 'remote');
    expect(res.length).to.equal(2);
    expect(res[0].name).to.equal('activemq514win64');
  });

  it('获取依赖信息（只有安装依赖）', () => {
    wrapper.vm.PackageInfo.services = [
      {
        dependencies: [
          {
            name: 'postgresql96win64',
            runtimeDepend: 'postgresql96win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsdb',
            type: 'remote',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsdb',
      },
      {
        dependencies: [
          {
            name: 'activemq514win64',
            runtimeDepend: 'activemq514win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsqueue',
            type: 'remote',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsqueue',
      },
      {
        dependencies: [
          {
            name: 'tomcat85win64',
            runtimeDepend: 'tomcat85win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsweb',
            type: 'local',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsweb',
      },
      {
        dependencies: null,
        segmentId: 'nms_1.0.0_nmstest1',
      },
      {
        segmentId: 'nms_1.0.0_nmstest2',
      },
    ];
    const { dependencies: deps, services } = wrapper.vm.PackageInfo;
    const res = wrapper.vm.getDeps(deps, services, 'local');
    expect(res.length).to.equal(1);
    expect(res[0].name).to.equal('tomcat85win64');
  });

  it('获取依赖信息（重复过滤）', () => {
    wrapper.vm.PackageInfo.dependencies = [
      {
        name: 'activemq514win64',
        runtimeDepend: 'activemq514win64_0.1.0',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'remote',
        version: '0.1.0',
      },
      {
        name: 'dac',
        runtimeDepend: 'dac_0.6.6',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'remote',
        version: '0.6.6',
      },
      {
        name: 'jre18win64',
        runtimeDepend: 'jre18win64_1.0.0',
        runtimeDependId: 'hgis_1.0.0_hgisldap',
        type: 'local',
        version: '1.0.0',
      },
    ];
    wrapper.vm.PackageInfo.services = [
      {
        dependencies: [
          {
            name: 'postgresql96win64',
            runtimeDepend: 'postgresql96win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsdb',
            type: 'remote',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsdb',
      },
      {
        dependencies: [
          {
            name: 'activemq514win64',
            runtimeDepend: 'activemq514win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsqueue',
            type: 'remote',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsqueue',
      },
      {
        dependencies: [
          {
            name: 'tomcat85win64',
            runtimeDepend: 'tomcat85win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsweb',
            type: 'local',
            version: '1.0.0',
          },
          {
            name: 'activemq514win64',
            runtimeDepend: 'activemq514win64_1.0.0',
            runtimeDependId: 'nms_1.0.0_nmsqueue',
            type: 'remote',
            version: '1.0.0',
          },
        ],
        segmentId: 'nms_1.0.0_nmsweb',
      },
    ];
    const { dependencies: deps, services } = wrapper.vm.PackageInfo;
    const res = wrapper.vm.getDeps(deps, services, 'remote');
    expect(res.length).to.equal(4);
    expect(res[0].name).to.equal('activemq514win64');
  });

  it('获取内存、磁盘信息（为空）', () => {
    let res1 = wrapper.vm.getMemory(wrapper.vm.PackageInfo.services, 'disk', 'add');
    expect(res1).to.equal('-');

    res1 = wrapper.vm.getMemory(wrapper.vm.PackageInfo.services, 'disk');
    expect(res1).to.equal('-');
  });

  it('获取内存、磁盘信息', () => {
    wrapper.vm.PackageInfo.services = [
      {
        requirement: null,
        segmentId: 'nms_1.0.0_nmsdb',
      },
      {
        requirement: {
          disk: 428,
          memory: null,
        },
        segmentId: 'nms_1.0.0_nmsqueue',
      },
      {
        requirement: {
          disk: 500,
          memory: 1000,
        },
        segmentId: 'nms_1.0.0_nmsweb',
      },
      {
        requirement: {},
        segmentId: 'nms_1.0.0_nmstest1',
      },
    ];
    const res1 = wrapper.vm.getMemory(wrapper.vm.PackageInfo.services, 'disk', 'add');
    expect(res1).to.equal('928M');
    const res2 = wrapper.vm.getMemory(wrapper.vm.PackageInfo.services, 'memory', 'max');
    expect(res2).to.equal('1000M');
  });

  it('获取组件分类', () => {
    let res = wrapper.vm.getComponentCategory(wrapper.vm.PackageInfo.category);
    expect(res).to.equal(wrapper.vm.$t('-'));

    wrapper.vm.PackageInfo.category = 'special';
    res = wrapper.vm.getComponentCategory(wrapper.vm.PackageInfo.category);
    expect(res).to.equal(wrapper.vm.$t('specialComponent'));

    wrapper.vm.PackageInfo.category = 'heyu';
    res = wrapper.vm.getComponentCategory(wrapper.vm.PackageInfo.category);
    expect(res).to.equal(wrapper.vm.$t('-'));
  });

  it('获取组件来源', () => {
    let res = wrapper.vm.getComponentSource(wrapper.vm.PackageInfo.source);
    expect(res).to.equal(wrapper.vm.$t('-'));

    wrapper.vm.PackageInfo.source = '3rd';
    res = wrapper.vm.getComponentSource(wrapper.vm.PackageInfo.source);
    expect(res).to.equal(wrapper.vm.$t('3rdCom'));

    wrapper.vm.PackageInfo.source = 'heyu';
    res = wrapper.vm.getComponentSource(wrapper.vm.PackageInfo.source);
    expect(res).to.equal(wrapper.vm.$t('-'));
  });
});
