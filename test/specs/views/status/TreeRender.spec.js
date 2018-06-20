import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import TreeRender from '../../../../src/views/status/TreeRender.vue';

axiosInstance.defaults.baseURL = undefined;

describe('TreeRender.vue', () => {
  describe('在线', () => {
    let wrapper = null;

    beforeEach(() => {
      moxios.install();
      const propsData = {
        data: {
          nodetype: 2,
          machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          name: '中心管理服务器',
          keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          alertNum: 11,
          alertLevel: 2,
          state: 'online',
          parentId: '1',
        },
        node: {
          nodetype: 2,
          machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          name: '中心管理服务器',
          keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          alertNum: 11,
          alertLevel: 2,
          state: 'online',
          parentId: '1',
        },
      };
      wrapper = createWrapper(TreeRender, { propsData });
    });

    afterEach(() => {
      // wrapper.vm.$destroy();
      moxios.uninstall();
    });

    it('告警数背景色----紧急', () => {
      const data = {
        alertLevel: 1,
      };
      expect(wrapper.vm.getBgColorClass(data.alertLevel)).to.equal('bg_color_one');
    });
    it('告警数背景色----一般', () => {
      const data = {
        alertLevel: 2,
      };
      expect(wrapper.vm.getBgColorClass(data.alertLevel)).to.equal('bg_color_two');
    });
    it('告警数背景色----警告', () => {
      const data = {
        alertLevel: 3,
      };
      expect(wrapper.vm.getBgColorClass(data.alertLevel)).to.equal('bg_color_three');
    });
    it('告警数背景色----默认----alertLevel不为1,2,3', () => {
      const data = {
        alertLevel: 0,
      };
      expect(wrapper.vm.getBgColorClass(data.alertLevel)).to.equal('bg_color');
    });
    it('methods: editGroup', (done) => {
      wrapper.setData({
        data: {
          nodetype: 1,
          name: 'fenzu',
          id: '1',
          keyid: '1',
          alertNum: 11,
          alertLevel: 2,
          parentId: '0',
        },
      });
      wrapper.vm.editGroup();
      done();
    });
    it('methods: delGroup', (done) => {
      wrapper.setData({
        data: {
          nodetype: 1,
          name: 'fenzu',
          id: '1',
          keyid: '1',
          alertNum: 11,
          alertLevel: 2,
          parentId: '0',
        },
      });
      wrapper.vm.delGroup();
      done();
    });
    it('methods: editMachine', (done) => {
      wrapper.setData({
        data: {
          nodetype: 1,
          name: 'fenzu',
          id: '1',
          keyid: '1',
          alertNum: 11,
          alertLevel: 2,
          parentId: '0',
        },
      });
      wrapper.vm.editMachine();
      done();
    });
    it('methods: moveMachine', (done) => {
      wrapper.setData({
        data: {
          nodetype: 1,
          name: 'fenzu',
          id: '1',
          keyid: '1',
          alertNum: 11,
          alertLevel: 2,
          parentId: '0',
        },
      });
      wrapper.vm.moveMachine();
      done();
    });
    it('methods: delMachine', (done) => {
      wrapper.setData({
        data: {
          nodetype: 1,
          name: 'fenzu',
          id: '1',
          keyid: '1',
          alertNum: 11,
          alertLevel: 2,
          parentId: '0',
        },
      });
      wrapper.vm.delMachine();
      done();
    });
  });

  describe('离线', () => {
    let wrapper = null;

    beforeEach(() => {
      moxios.install();
      const propsData = {
        data: {
          nodetype: 2,
          machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          name: '中心管理服务器',
          keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          alertNum: 11,
          alertLevel: 2,
          state: 'offline',
          parentId: '1',
        },
        node: {
          nodetype: 2,
          machineId: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          name: '中心管理服务器',
          keyid: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
          alertNum: 11,
          alertLevel: 2,
          state: 'offline',
          parentId: '1',
        },
      };
      wrapper = createWrapper(TreeRender, { propsData });
    });

    afterEach(() => {
      // wrapper.vm.$destroy();
      moxios.uninstall();
    });

    it('离线----服务器和组件图标', () => {
      const data = {
        alertLevel: 1,
      };
      expect(wrapper.vm.getBgColorClass(data.alertLevel)).to.equal('bg_color_one');
    });
  });
});
