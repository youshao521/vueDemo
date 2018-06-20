import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import TreeRender from '../../../../src/views/logs/TreeRender.vue';

axiosInstance.defaults.baseURL = undefined;

describe('TreeRender.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('树节点渲染---根节点', (done) => {
    const propsData = {
      node: {
        level: 1,
      },
      data: {

      },
    };
    wrapper = createWrapper(TreeRender, { propsData });

    expect(wrapper.vm.iconClass()).to.equal('');
    done();

    // wrapper.vm.$destroy();
  });

  it('树节点渲染---服务器节点', (done) => {
    const propsData = {
      node: {
        level: 2,
      },
      data: {
        nodeType: 'server',
      },
    };
    wrapper = createWrapper(TreeRender, { propsData });

    expect(wrapper.vm.iconClass()).to.equal('rm-server icon');
    done();

    // wrapper.vm.$destroy();
  });

  it('树节点渲染---组件节点', (done) => {
    const propsData = {
      node: {
        level: 3,
      },
      data: {
        version: 'v1.0.0',
      },
    };
    wrapper = createWrapper(TreeRender, { propsData });

    expect(wrapper.vm.iconClass()).to.equal('rm-app icon');
    done();

    // wrapper.vm.$destroy();
  });

  it('树节点渲染---服务节点', (done) => {
    const propsData = {
      node: {
        level: 4,
      },
      data: {
        serviceId: '123',
      },
    };
    wrapper = createWrapper(TreeRender, { propsData });

    expect(wrapper.vm.iconClass()).to.equal('rm-service icon');
    done();

    // wrapper.vm.$destroy();
  });

  it('树节点渲染---分组节点', (done) => {
    const propsData = {
      node: {
        level: 4,
      },
      data: {
      },
    };
    wrapper = createWrapper(TreeRender, { propsData });

    expect(wrapper.vm.iconClass()).to.equal('rm-server_group icon');
    done();

    // wrapper.vm.$destroy();
  });
});
