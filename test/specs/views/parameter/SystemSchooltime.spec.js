import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import SystemSchooltime from '../../../../src/views/parameter/SystemSchooltime.vue';

axiosInstance.defaults.baseURL = undefined;
describe('SystemSchooltime.vue', () => {
  let wrapper = null;
  beforeEach((done) => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(SystemSchooltime);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            groups: [
              {
                name: '运行管理中心',
                groups: [],
                id: '1',
                machines: [
                  {
                    agent: '1.1.0',
                    createdAt: '',
                    id: 'FC834DAB-457C-4141-B3CC-EA93A60931D4',
                    ip: '10.33.43.116',
                    isCenter: false,
                    name: '中心管理服务器',
                    port: 0,
                    serverId: 0,
                    state: '',
                    type: '',
                  },
                  {
                    agent: '1.0.2',
                    createdAt: '',
                    id: 'D2FE49AF-6AFB-4ACC-B3EF-A11AD72B4F6C',
                    ip: '10.33.43.1',
                    isCenter: false,
                    name: '10.33.43.1',
                    port: 0,
                    serverId: 0,
                    state: '',
                    type: '',
                  },
                ],
                parentId: 0,
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.groups.length).to.equal(1);
        done();
      });
    });
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it('save', (done) => {
    wrapper.vm.save();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x00117023',
          data: {
            machines: [
              {
                agentNo: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
                id: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
                ip: '10.33.40.241',
                name: '中心管理服务器',
                state: 'succeed',
              },
            ],
          },
          msg: '部分服务器校时失败！',
        },
      }).then(() => {
        expect(wrapper.vm.states.length).to.equal(1);
        done();
      });
    });
  });
  it('nameDefault---right', () => {
    const t = wrapper.vm.nameDefault([{ id: 1, state: 'succeed' }], { id: 1 });
    expect(t.state).to.equal('succeed');
  });
  it('nameDefault---error', () => {
    const t = wrapper.vm.nameDefault([{ id: 1, state: 'failed' }], { id: 1 });
    expect(t.state).to.equal('failed');
  });
  it('nameDefault---faild', () => {
    const t = wrapper.vm.nameDefault([{ id: 1, state: '' }], { id: 1 });
    expect(t.state).to.equal('');
  });
  it('setChange', () => {
    wrapper.setData({
      initService: 'aaa',
    });
    wrapper.vm.setChange('aaa');
    expect(wrapper.vm.initService).to.equal('');
  });
  it('operationTime', (done) => {
    wrapper.vm.operationTime('D0C6C799-A6DE-41A8-9A86-416F1DA948C8');
    wrapper.setData({
      states: [{
        agentNo: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
        id: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
        ip: '10.33.40.241',
        name: '中心管理服务器',
        state: 'faild',
      }],
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0x00117023',
          data: {
            machines: [
              {
                agentNo: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
                id: 'D0C6C799-A6DE-41A8-9A86-416F1DA948C8',
                ip: '10.33.40.241',
                name: '中心管理服务器',
                state: 'succeed',
              },
            ],
          },
          msg: '部分服务器校时失败！',
        },
      }).then(() => {
        expect(wrapper.vm.states[0].state).to.equal('succeed');
        done();
      });
    });
  });
});
