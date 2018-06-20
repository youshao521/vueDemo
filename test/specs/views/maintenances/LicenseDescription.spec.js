import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LicenseDescription from '../../../../src/views/maintenances/LicenseDescription.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LicenseDescription.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LicenseDescription);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('获取授权详情信息', (done) => {
    wrapper.vm.fetchLicenseDescription('93D64A55-AA8B-4455-A2B7-1B406A776874');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {
            license: {
              code: '4E36-****-****-2994',
              components: [
                {
                  componentId: 'dac',
                  description: '',
                  expiredDate: '',
                  features: [
                    {
                      algorithm: '',
                      id: 'daccapabilitydac_totaldevice1',
                      max: 100000,
                      name: 'dac_totaldevice1',
                      support: null,
                      used: null,
                      value: 100000,
                    },
                  ],
                  maintenanceDate: '',
                  name: '设备接入框架',
                  version: '1.0.0',
                },
              ],
              expiredDate: '2022-12-31',
              id: '93D64A55-AA8B-4455-A2B7-1B406A776874',
              maintenanceDate: '2022-12-31',
              serverTime: '2018-02-07T11:49:11.892+08:00',
              state: 'inactive',
              trial: false,
            },
          },
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.licenseDiff.code).to.equal('4E36-****-****-2994');
        done();
      });
    });
  });
  it('获取授权详情信息---失败', (done) => {
    wrapper.vm.fetchLicenseDescription('93D64A55-AA8B-4455-A2B7-1B406A776874');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x12345',
          data: {},
          msg: '',
        },
      }).then(() => {
        expect(Object.keys(wrapper.vm.licenseDiff).length).to.equal(0);
        done();
      });
    });
  });
  it('获取授权比较信息', (done) => {
    wrapper.vm.fetchLicenseDifference('93D64A55-AA8B-4455-A2B7-1B406A776874');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {
            license: {
              code: '4E36-****-****-2995',
              components: [
                {
                  componentId: 'dac',
                  description: '',
                  expiredDate: '',
                  features: [
                    {
                      algorithm: '',
                      id: 'daccapabilitydac_totaldevice1',
                      max: 100000,
                      name: 'dac_totaldevice1',
                      support: null,
                      used: null,
                      value: 100000,
                      after: {
                        support: null,
                        value: null,
                      },
                      before: {
                        support: true,
                        value: null,
                      },
                    },
                  ],
                  maintenanceDate: '',
                  name: '设备接入框架',
                  version: '1.0.0',
                },
              ],
              expiredDate: '2022-12-31',
              id: '93D64A55-AA8B-4455-A2B7-1B406A776874',
              maintenanceDate: '2022-12-31',
              serverTime: '2018-02-07T11:49:11.892+08:00',
              state: 'inactive',
              trial: false,
            },
          },
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.licenseDiff.code).to.equal('4E36-****-****-2995');
        done();
      });
    });
  });
  it('获取授权比较信息---失败', (done) => {
    wrapper.vm.fetchLicenseDifference('93D64A55-AA8B-4455-A2B7-1B406A776874');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x12345',
          data: {},
          msg: '失败',
        },
      }).then(() => {
        expect(Object.keys(wrapper.vm.licenseDiff).length).to.equal(0);
        done();
      });
    });
  });
  it('添加授权文件，文件类型错误', () => {
    const e = {
      target: {
        files: [
          {
            name: 'license.doc',
          },
        ],
      },
    };
    expect(wrapper.vm.handleChange(e)).to.equal(false);
  });
  it('添加授权文件，文件大小超出限制', () => {
    const e = {
      target: {
        files: [
          {
            name: 'license.cyt',
            size: 52 * 1024 * 1024,
          },
        ],
      },
    };
    expect(wrapper.vm.handleChange(e)).to.equal(false);
  });
  it('添加授权文件', (done) => {
    const e = {
      target: {
        files: [
          {
            name: 'license.cyt',
            size: 4 * 1024 * 1024,
          },
        ],
      },
    };
    wrapper.vm.handleChange(e);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {
            exist: true,
            license: {
              code: '4E36-****-****-2995',
              components: [
                {
                  componentId: 'dac',
                  description: '',
                  expiredDate: '',
                  features: [
                    {
                      algorithm: '',
                      id: 'daccapabilitydac_totaldevice1',
                      max: 100000,
                      name: 'dac_totaldevice1',
                      support: null,
                      used: null,
                      value: 100000,
                      after: {
                        support: null,
                        value: null,
                      },
                      before: {
                        support: true,
                        value: null,
                      },
                    },
                  ],
                  maintenanceDate: '',
                  name: '设备接入框架',
                  version: '1.0.0',
                },
              ],
              expiredDate: '2022-12-31',
              id: '93D64A55-AA8B-4455-A2B7-1B406A776874',
              maintenanceDate: '2022-12-31',
              serverTime: '2018-02-07T11:49:11.892+08:00',
              state: 'inactive',
              trial: false,
            },
          },
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.exist).to.equal(true);
        done();
      });
    });
  });
  it('添加授权文件失败', (done) => {
    const e = {
      target: {
        files: [
          {
            name: 'license.cyt',
            size: 4 * 1024 * 1024,
          },
        ],
      },
    };
    wrapper.setData({
      exist: false,
    });
    expect(wrapper.vm.exist).to.equal(false);
    wrapper.vm.handleChange(e);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0',
          data: {
            exist: true,
            license: {
              code: '4E36-****-****-2995',
              components: [
                {
                  componentId: 'dac',
                  description: '',
                  expiredDate: '',
                  features: [
                    {
                      algorithm: '',
                      id: 'daccapabilitydac_totaldevice1',
                      max: 100000,
                      name: 'dac_totaldevice1',
                      support: null,
                      used: null,
                      value: 100000,
                      after: {
                        support: null,
                        value: null,
                      },
                      before: {
                        support: true,
                        value: null,
                      },
                    },
                  ],
                  maintenanceDate: '',
                  name: '设备接入框架',
                  version: '1.0.0',
                },
              ],
              expiredDate: '2022-12-31',
              id: '93D64A55-AA8B-4455-A2B7-1B406A776874',
              maintenanceDate: '2022-12-31',
              serverTime: '2018-02-07T11:49:11.892+08:00',
              state: 'inactive',
              trial: false,
            },
          },
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.exist).to.equal(false);
        done();
      });
    });
  });
  it('激活授权', (done) => {
    wrapper.vm.activeLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'inactive');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {},
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.message).to.equal((wrapper.vm.$t('activateSuccess')));
        done();
      });
    });
  });
  it('激活授权失败', (done) => {
    wrapper.vm.activeLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'inactive');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x121222',
          data: {},
          msg: '激活失败',
        },
      }).then(() => {
        expect(wrapper.vm.message).to.equal((wrapper.vm.$t('onlineActivateFailure')));
        expect(wrapper.vm.errInfo).to.equal('激活失败');
        done();
      });
    });
  });
  it('激活授权失败---未登录', (done) => {
    wrapper.vm.activeLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'inactive');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x00137009',
          data: {},
          msg: '激活失败',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('反激活授权', (done) => {
    wrapper.vm.inActiveLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {},
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.message).to.equal((wrapper.vm.$t('deactivateSuccess')));
        done();
      });
    });
  });
  it('反激活授权失败', (done) => {
    wrapper.vm.inActiveLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x2133453456',
          data: {},
          msg: '反激活失败',
        },
      }).then(() => {
        expect(wrapper.vm.message).to.equal((wrapper.vm.$t('onlineDeactivateFailure')));
        expect(wrapper.vm.errInfo).to.equal('反激活失败');
        done();
      });
    });
  });
  it('反激活授权失败---未登录', (done) => {
    wrapper.vm.inActiveLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x00137009',
          data: {},
          msg: '反激活失败',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('导入授权state为inactive,exist为false', (done) => {
    wrapper.setData({
      exist: false,
    });
    wrapper.vm.importLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'inactive');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {},
          msg: '',
        },
      }).then(() => {
        expect(wrapper.vm.message).to.equal((wrapper.vm.$t('importSuccess')));
        expect(wrapper.vm.resultTitle).to.equal((wrapper.vm.$t('importLicenseFile')));
        done();
      });
    });
  });
  it('导入授权state为inactive,exist为true', (done) => {
    wrapper.setData({
      exist: true,
    });
    wrapper.vm.importLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'inactive');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {},
          msg: '',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('导入授权state为active', (done) => {
    wrapper.setData({
      exist: true,
      message: '导入成功',
    });
    wrapper.vm.importLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          data: {},
          msg: '',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('导入授权失败', (done) => {
    wrapper.setData({
      exist: true,
    });
    wrapper.vm.importLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x11111111111',
          data: {},
          msg: 'error',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('导入授权失败---未登录', (done) => {
    wrapper.setData({
      exist: true,
    });
    wrapper.vm.importLicense('93D64A55-AA8B-4455-A2B7-1B406A776874', 'active');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x00137009',
          data: {},
          msg: 'error',
        },
      }).then(() => {
        done();
      });
    });
  });
  it('禁用反激活按钮', () => {
    wrapper.vm.licenseInfo =
      [
        { state: 'deactivating' },
      ];
    expect(wrapper.vm.disableOperation('active')).to.equal(true);
  });
  it('不禁用反激活按钮licenseInfo为空', () => {
    wrapper.vm.licenseInfo = [];
    expect(wrapper.vm.disableOperation('inactive')).to.equal(false);
  });
  it('不禁用激活按钮', () => {
    wrapper.vm.licenseInfo =
      [
        { state: 'deactivating' },
      ];
    expect(wrapper.vm.disableOperation('inactive')).to.equal(false);
  });
  it('处理授权值value为null,support为null', () => {
    const obj = {
      value: null,
      support: null,
    };
    expect(wrapper.vm.handValue(obj)).to.equal('-');
  });
  it('处理授权值value为null,support为true', () => {
    const obj = {
      value: null,
      support: true,
    };
    expect(wrapper.vm.handValue(obj)).to.equal(wrapper.vm.$t('support'));
  });
  it('处理授权值value为null,support为false', () => {
    const obj = {
      value: null,
      support: false,
    };
    expect(wrapper.vm.handValue(obj)).to.equal(wrapper.vm.$t('notSupport'));
  });
  it('处理授权值value小于0', () => {
    const obj = {
      value: -1,
      support: false,
    };
    expect(wrapper.vm.handValue(obj)).to.equal(wrapper.vm.$t('noLimit'));
  });
  it('处理授权值value为正整数', () => {
    const obj = {
      value: 200000,
      support: false,
    };
    expect(wrapper.vm.handValue(obj)).to.equal('200,000');
  });
  it('处理授权值value为undefined', () => {
    expect(wrapper.vm.handValue()).to.equal('');
  });
  it('showOffline', () => {
    wrapper.vm.showOffline('12345', 'inactive');
    expect(wrapper.vm.state).to.equal('inactive');
    expect(wrapper.vm.offlineActiveVisiable).to.equal(true);
  });
  it('closeOffline', () => {
    wrapper.vm.closeOffline();
    expect(wrapper.vm.offlineActiveVisiable).to.equal(false);
  });
});
