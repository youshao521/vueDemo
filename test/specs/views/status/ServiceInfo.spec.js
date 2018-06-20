import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ServiceInfo from '../../../../src/views/status/ServiceInfo.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ServiceInfo.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    const propsData = {
      value: {
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
      },
    };
    wrapper = createWrapper(ServiceInfo, { propsData });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall();
  });

  it('getDisplayMemory----小于1024', () => {
    const memory = 666;
    expect(wrapper.vm.getDisplayMemory(memory)).to.equal('666MB');
  });
  it('getDisplayMemory----大于等于1024', () => {
    const memory = 5000;
    expect(wrapper.vm.getDisplayMemory(memory)).to.equal('5GB');
  });
  it('getDisplayMemory----无', () => {
    const memory = 0;
    expect(wrapper.vm.getDisplayMemory(memory)).to.equal('-');
  });

  it('部署依赖----本机', () => {
    const deps = [{
      name: 'PostgreSQL',
      type: 'remote',
      version: '1.0.0',
    }];
    const type = 'local';
    const res = wrapper.vm.getDeps(deps, type);
    expect(res.length).to.equal(0);
  });
  it('部署依赖----远程', () => {
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
