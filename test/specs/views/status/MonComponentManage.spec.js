import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import MonComponentManage from '../../../../src/views/status/MonComponentManage.vue';

axiosInstance.defaults.baseURL = undefined;

describe('MonComponentManage.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(MonComponentManage);
    wrapper.vm.$router.push('/status/machines/5C8B8673-0363-4893-98A8-9140FF2B5B88');
    wrapper.vm.machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('占用磁盘空间', () => {
    const item = {
      space: 790685,
    };
    expect(wrapper.vm.getSpace(item)).to.equal('772.2MB');
  });

  it('占用磁盘空间----计算中', () => {
    const item = {
      space: null,
    };
    expect(wrapper.vm.getSpace(item)).to.equal('calculating');
  });
  it('显示卸载', () => {
    const state = 'online';
    const item = {
      componentId: 'tvms',
    };
    expect(wrapper.vm.isShow(item, state)).to.equal(true);
  });
  it('服务器离线----不显示卸载', () => {
    const state = 'offline';
    const item = {
      componentId: 'tvms',
    };
    expect(wrapper.vm.isShow(item, state)).to.equal(false);
  });
  it('核心服务----不显示卸载', () => {
    const state = 'online';
    const item = {
      componentId: '@bic_1',
    };
    expect(wrapper.vm.isShow(item, state)).to.equal(false);
  });

  it('组件卸载操作----成功', (done) => {
    const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    const componentId = 'liguopeng_1.0.0';

    wrapper.vm.removeComponent(machineId, componentId);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
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
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('组件卸载操作----失败', (done) => {
    const machineId = '5C8B8673-0363-4893-98A8-9140FF2B5B88';
    const componentId = 'liguopeng_1.0.0';

    wrapper.vm.removeComponent(machineId, componentId);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          code: '0x00410003',
          data: null,
          msg: '操作失败',
        },
      }).then(() => {
        done();
      });
      done();
    });
  });

  it('链接至机器下的对应组件----状态', () => {
    wrapper.setData({
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
    });
    const row = {
      id: 'asw_1.1.0',
    };
    wrapper.vm.linkComponent(row);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$route.params.machineId).to.equal('56EA52B7-6B38-4270-8306-B6F490B6DE2D');
      expect(wrapper.vm.$route.params.componentId).to.equal('asw_1.1.0');
    });
  });

  it('链接至机器下的对应组件----告警列表', () => {
    wrapper.setData({
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
    });
    const row = {
      id: 'asw_1.1.0',
    };
    wrapper.vm.linkAlert(row);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$route.params.machineId).to.equal('56EA52B7-6B38-4270-8306-B6F490B6DE2D');
      expect(wrapper.vm.$route.params.componentId).to.equal('asw_1.1.0');
    });
  });
  it('链接至机器下的对应组件----操作日志', () => {
    wrapper.setData({
      machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
    });
    const row = {
      id: 'asw_1.1.0',
    };
    wrapper.vm.linkOprateLog(row);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$route.params.machineId).to.equal('56EA52B7-6B38-4270-8306-B6F490B6DE2D');
      expect(wrapper.vm.$route.params.componentId).to.equal('asw_1.1.0');
    });
  });
});
