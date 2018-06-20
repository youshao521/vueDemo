import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ProcessTable from '../../../../src/views/status/ProcessTable.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ProcessTable.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    const propsData = {
      processList: [{
        cpu: 0,
        description: 'hik.opsmgr.logagent.exe',
        id: 15740,
        instance: null,
        memory: 62976000,
        name: 'hik.opsmgr.logagent.exe',
        path: 'G:/HIKVISION/opsMgrAgent/modules/log/hik.opsmgr.logagent.exe',
        selected: true,
        sortcpu: 0,
        state: 'running',
        items: [],
      }, {
        cpu: 0,
        description: 'hik.opsmgr.notifyagent.exe',
        id: 16220,
        instance: null,
        memory: 17121280,
        name: 'hik.opsmgr.notifyagent.exe',
        path: 'G:/HIKVISION/opsMgrAgent/modules/notify/hik.opsmgr.notifyagent.exe',
        selected: true,
        sortcpu: 0,
        state: 'running',
        items: [],
      }, {
        items: [{
          cpu: 0,
          description: 'eclipse.exe',
          id: '8332',
          instance: null,
          memory: 565248,
          name: 'eclipse.exe',
          path: 'E:/eclipse-jee-mars-1-win32-x86_64/eclipse/eclipse.exe',
          selected: true,
          sortcpu: 0,
          state: 'running',
        }, {
          cpu: 0,
          description: 'eclipse.exe',
          id: '13608',
          instance: null,
          memory: 4526080,
          name: 'eclipse.exe',
          path: 'E:/eclipse-jee-mars-1-win32-x86_64 - 副本/eclipse/eclipse.exe',
          selected: true,
          sortcpu: 0,
          state: 'running',
        }],
        id: 8332,
        name: 'eclipse.exe',
        path: '',
        selected: true,
        memory: 5091328,
        description: '',
        sortcpu: 0,
      }],
    };
    wrapper = createWrapper(ProcessTable, { propsData });
    wrapper.vm.$router.push('/status');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall();
  });

  it('methods(): getItemsState--获取合并的状态值', () => {
    const row = {
      items: [{
        cpu: 0,
        description: 'eclipse.exe',
        id: '8332',
        instance: null,
        memory: 565248,
        name: 'eclipse.exe',
        path: 'E:/eclipse-jee-mars-1-win32-x86_64/eclipse/eclipse.exe',
        selected: true,
        sortcpu: 0,
        state: 'running',
      }, {
        cpu: 0,
        description: 'eclipse.exe',
        id: '13608',
        instance: null,
        memory: 4526080,
        name: 'eclipse.exe',
        path: 'E:/eclipse-jee-mars-1-win32-x86_64 - 副本/eclipse/eclipse.exe',
        selected: true,
        sortcpu: 0,
        state: 'running',
      }],
      id: 8332,
      name: 'eclipse.exe',
      path: '',
      selected: true,
      memory: 5091328,
      description: '',
      sortcpu: 0,
    };
    expect(wrapper.vm.getItemsState(row)).to.equal(true);
  });

  it('methods(): getItemsCpu--获取合并的CPU值', () => {
    const items = [{
      cpu: 0,
      description: 'eclipse.exe',
      id: '8332',
      instance: null,
      memory: 565248,
      name: 'eclipse.exe',
      path: 'E:/eclipse-jee-mars-1-win32-x86_64/eclipse/eclipse.exe',
      selected: true,
      sortcpu: 0,
      state: 'running',
    }, {
      cpu: 0,
      description: 'eclipse.exe',
      id: '13608',
      instance: null,
      memory: 4526080,
      name: 'eclipse.exe',
      path: 'E:/eclipse-jee-mars-1-win32-x86_64 - 副本/eclipse/eclipse.exe',
      selected: true,
      sortcpu: 0,
      state: 'running',
    }];
    expect(wrapper.vm.getItemsCpu(items)).to.equal('0%');
  });

  it('methods(): getItemsMemory--获取合并的内存值', () => {
    const items = [{
      cpu: 0,
      description: 'eclipse.exe',
      id: '8332',
      instance: null,
      memory: 565248,
      name: 'eclipse.exe',
      path: 'E:/eclipse-jee-mars-1-win32-x86_64/eclipse/eclipse.exe',
      selected: true,
      sortcpu: 0,
      state: 'running',
    }, {
      cpu: 0,
      description: 'eclipse.exe',
      id: '13608',
      instance: null,
      memory: 4526080,
      name: 'eclipse.exe',
      path: 'E:/eclipse-jee-mars-1-win32-x86_64 - 副本/eclipse/eclipse.exe',
      selected: true,
      sortcpu: 0,
      state: 'running',
    }];
    expect(wrapper.vm.getItemsMemory(items)).to.equal('4.9M');
  });
});
