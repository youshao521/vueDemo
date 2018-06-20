import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterWarning from '../../../../src/views/parameter/ParameterWarning.vue';

axiosInstance.defaults.baseURL = undefined;
describe('ParameterWarning.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterWarning);
    moxios.stubOnce('GET', '/settings/alerts', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          settings: [
            {
              conditions: [
                {
                  key: 'center.monitor.alarm.rule.server.system.remainder.disk',
                  name: '系统盘剩余空间低于',
                  unit: 'GB',
                  value: 20,
                },
              ],
              enable: true,
              id: '0003',
              level: 'general',
              name: '服务器系统盘剩余空间不足',
              type: '空间不足',
            },
          ],
        },
      },
    });
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it.skip('保存', (done) => {
    wrapper.setData({
      alertForm: {
        alertList: [
          {
            id: '001',
          },
          {
            id: '002',
          },
          {
            id: '003',
          },
        ],
      },
    });
    wrapper.vm.modifyList = ['001', '002'];
    wrapper.vm.save();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            settings: [
              {
                conditions: [
                  {
                    key: 'center.monitor.alarm.rule.server.system.remainder.disk',
                    name: '系统盘剩余空间低于',
                    unit: 'GB',
                    value: 20,
                  },
                ],
                enable: true,
                id: '0003',
                level: 'general',
                name: '服务器系统盘剩余空间不足',
                type: '空间不足',
              },
              {
                conditions: [],
                enable: true,
                id: '0021',
                level: 'warning',
                name: 'center.monitor.alarm.rule.component.version',
                type: '版本不一致',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.alertForm.alertList.length).to.equal(2);
        done();
      });
    });
  });
  it('保存失败', (done) => {
    wrapper.vm.save();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0x02423538',
          msg: '',
          data: {
            msg: '获取请求失败',
          },
        },
      }).then(() => {
        expect(wrapper.vm.alertForm.alertList.length).to.equal(1);
        done();
      });
      done();
    });
  });
  it('恢复默认值', (done) => {
    wrapper.vm.reset();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            settings: [
              {
                conditions: [
                  {
                    key: 'center.monitor.alarm.rule.server.remainder.memory.value',
                    name: '剩余内存低于',
                    unit: 'MB',
                    value: 1024,
                  },
                ],
                enable: true,
                id: '0002',
                level: 'general',
                name: '服务器剩余内存值不足',
                type: '负载过高',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.alertForm.alertList.settings[0].conditions[0].value).to.equal(1024);
        done();
      });
      done();
    });
  });
  it('恢复默认值--异常', (done) => {
    wrapper.vm.reset();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 504,
        response: {
          code: '0x02423538',
          msg: '',
          data: {
            msg: '获取请求失败',
          },
        },
      }).then(() => {
        expect(wrapper.vm.alertForm.alertList.settings[0].conditions[0].value).to.equal(20);
        done();
      });
      done();
    });
  });
  it('数组修改dataModify', () => {
    wrapper.vm.modifyList = [];
    wrapper.vm.dataModify({ id: '001' });
    expect(wrapper.vm.modifyList[0]).to.equal('001');
  });
  it('填写校验---非空校验', () => {
    let exStr = '';
    wrapper.vm.numberValid(false, '', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('pleaseEnter');
  });
  it('填写校验---正整数数字', () => {
    let exStr = '';
    wrapper.vm.numberValid(false, 'tet', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('enterInt');
  });
  it('填写校验---百分比规则校验-license', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isSecond: true,
      isLicense: true,
    }, 30, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('enterHalfRangeInt');
  });
  it('填写校验---百分比规则校验', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isSecond: true,
      isLicense: false,
    }, 130, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('enterRangeInt');
  });
  it('填写校验---秒规则校验s', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isTime: true,
    }, 10, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('enterRangeTime');
  });
  it('填写校验---GB规则校验，关于硬盘', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isDist: true,
      isGB: true,
    }, 1110, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('maxTenG');
  });
  it('填写校验---GB规则校验，关于硬盘', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isMemory: true,
      isMB: true,
    }, 4444, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('memoryRange');
  });
  it('填写校验---授权试用期', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isDay: true,
      idTriay: true,
    }, 35, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('licenseTriayTime');
  });
  it('填写校验---授权正式期', () => {
    let exStr = '';
    wrapper.vm.numberValid({
      isDay: true,
      idFormal: true,
    }, 10, (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('licenseFormalTime');
  });
});
