import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import License from '../../../../src/views/maintenances/License.vue';

axiosInstance.defaults.baseURL = undefined;

describe('License.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(License);
    moxios.stubOnce('GET', '/licenses?dimension=component', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          licenses: [
            {
              componentId: 'acs',
              description: '',
              expiredDate: '2022-12-31',
              features: [
                {
                  id: 'acscapabilityacs_doornum',
                  items: [
                    {
                      code: 'B12E-878E-292D-C774',
                      expiredDate: '',
                      maintenanceDate: '',
                      max: 1000,
                      state: 'active',
                      trial: false,
                      value: 500,
                    },
                    {
                      code: 'B12E-878E-292D-C774',
                      expiredDate: '2022-12-31',
                      maintenanceDate: '',
                      max: 1000,
                      state: 'active',
                      trial: false,
                      value: 400,
                    },
                  ],
                  max: 1000,
                  algorithm: 'max',
                  name: '门禁门数',
                  support: false,
                  used: null,
                  value: 1000,
                },
              ],
              maintenanceDate: '2020-09-22',
              name: '门禁应用',
              version: '',
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

  it('fetchLicenseFiles---无授权文件', (done) => {
    moxios.stubOnce('GET', '/licenses', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          licenses: [],
        },
      },
    });
    wrapper.vm.fetchLicenseFiles();
    moxios.wait(() => {
      expect(wrapper.vm.noDataMsg).to.equal('noLiceseTip');
      expect(wrapper.vm.noLicenseFile).to.equal(true);
      done();
    });
  });
  it('fetchLicenseFiles---无激活文件', (done) => {
    moxios.stubs.remove('GET', '/licenses');
    moxios.stubOnce('GET', '/licenses', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          licenses: [
            {
              code: '4E36-****-****-2994',
              expiredDate: '2022-12-31',
              id: '93D64A55-AA8B-4455-A2B7-1B406A776874',
              maintenanceDate: '2022-12-31',
              serverTime: '2018-02-06T16:10:09.128+08:00',
              state: 'inactive',
              trial: true,
            },
          ],
        },
      },
    });
    wrapper.vm.fetchLicenseFiles();
    moxios.wait(() => {
      expect(wrapper.vm.noDataMsg).to.equal('noActiveLiceseTip');
      expect(wrapper.vm.noLicenseFile).to.equal(false);
      done();
    });
  });

  it('fetchLicenseFiles---请求出错', (done) => {
    moxios.stubs.remove('GET', '/licenses');
    moxios.stubOnce('GET', '/licenses', {
      status: 500,
      response: {
        code: '0x234',
        msg: '获取失败',
        data: {},
      },
    });
    wrapper.vm.fetchLicenseFiles();
    moxios.wait(() => {
      expect(wrapper.vm.noDataMsg).to.equal('noLiceseTip');
      expect(wrapper.vm.noLicenseFile).to.equal(true);
      done();
    });
  });

  it('getSummaries---sum', () => {
    const param = {
      columns: [
        {}, {}, {}, {},
      ],
    };
    wrapper.setData({
      tipData: {
        value: 100,
        max: 800,
        algorithm: 'sum',
      },
    });
    const sums = wrapper.vm.getSummaries(param);
    expect(sums.length).to.equal(4);
    expect(sums[0]).to.equal('totalsumTip');
  });

  it('getSummaries---max', () => {
    const param = {
      columns: [
        {}, {}, {}, {},
      ],
    };
    wrapper.setData({
      tipData: {
        value: 100,
        max: 800,
        algorithm: 'max',
      },
    });
    const sums = wrapper.vm.getSummaries(param);
    expect(sums.length).to.equal(4);
    expect(sums[0]).to.equal('totalmaxTip');
  });

  it('处理授权值value为undefined', () => {
    const feature = {
    };
    expect(wrapper.vm.handleLicenseValue(feature)).to.equal('');
  });

  it('处理授权值value为null support为true', () => {
    const feature = {
      support: true,
      value: null,
    };
    expect(wrapper.vm.handleLicenseValue(feature)).to.equal(wrapper.vm.$t('support'));
  });

  it('处理授权值value为null support为false', () => {
    const feature = {
      support: false,
      value: null,
    };
    expect(wrapper.vm.handleLicenseValue(feature)).to.equal(wrapper.vm.$t('notSupport'));
  });

  it('处理授权值value小于0', () => {
    const feature = {
      value: -1,
    };
    expect(wrapper.vm.handleLicenseValue(feature)).to.equal(wrapper.vm.$t('noLimit'));
  });

  it('处理授权值value为正整数', () => {
    const feature = {
      value: 100000,
    };
    expect(wrapper.vm.handleLicenseValue(feature)).to.equal('100,000');
  });

  it('处理能力上限max为负数', () => {
    const feature = {
      max: -1,
    };
    expect(wrapper.vm.handleLicenseMax(feature)).to.equal(wrapper.vm.$t('noLimit'));
  });

  it('处理能力上限max为正整数', () => {
    const feature = {
      max: 200000,
    };
    expect(wrapper.vm.handleLicenseMax(feature)).to.equal('200,000');
  });

  it('合计授权值提醒', () => {
    const feature = {
      items: [
        {
          state: 'active',
          value: 500,
        },
        {
          state: 'active',
          value: 400,
        },
      ],
      max: 100,
      value: 100,
      algorithm: 'sum',
    };
    expect(wrapper.vm.showAlert(feature)).to.equal(true);
  });

  it('合计授权值不提醒,算法不为sum', () => {
    const feature = {
      items: [
        {
          state: 'active',
          value: 500,
        },
        {
          state: 'active',
          value: 400,
        },
      ],
      max: 800,
      algorithm: 'max',
    };
    expect(wrapper.vm.showAlert(feature)).to.equal(false);
  });

  it('合计授权值不提醒,已激活授权项之和不超过能力上限', () => {
    const feature = {
      items: [
        {
          state: 'active',
          value: 500,
        },
        {
          state: 'active',
          value: 400,
        },
      ],
      max: 1000,
      value: 900,
      algorithm: 'max',
    };
    expect(wrapper.vm.showAlert(feature)).to.equal(false);
  });

  it('图标提醒，含有未激活的授权文件', () => {
    const feature = {
      items: [
        {
          state: 'inactive',
          value: 500,
        },
        {
          state: 'active',
          value: 400,
        },
      ],
      max: 1000,
      value: 500,
      algorithm: 'max',
    };
    expect(wrapper.vm.showMinder(feature)).to.equal(true);
  });

  it('打开授权能力详情页面', (done) => {
    const feature = {
      id: 'acscapabilityacs_doornum',
      items: [
        {
          code: 'B12E-878E-292D-C774',
          expiredDate: '',
          maintenanceDate: '',
          max: 1000,
          state: 'active',
          trial: false,
          value: 500,
        },
        {
          code: 'B12E-878E-292D-C774',
          expiredDate: '2022-12-31',
          maintenanceDate: '',
          max: 1000,
          state: 'active',
          trial: false,
          value: 400,
        },
      ],
      max: 1000,
      algorithm: 'max',
      name: '门禁门数',
      support: false,
      used: null,
      value: 1000,
    };
    wrapper.vm.openTip(feature);
    moxios.wait(() => {
      expect(wrapper.vm.tipMessageVisiable).to.equal(true);
      expect(wrapper.vm.tipData.max).to.equal(1000);
      done();
    });
  });

  it('formatNumber', () => {
    expect(wrapper.vm.formatNumber(10000)).to.equal('10,000');
  });
  it('showLicense', (done) => {
    moxios.stubOnce('GET', '/licenses/7SY6-W7H6-DU7D-SHU6', {
      status: 200,
      response: {
        code: '0',
        msg: '',
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
      },
    });
    wrapper.vm.showLicense({ id: '7SY6-W7H6-DU7D-SHU6' });
    moxios.wait(() => {
      expect(wrapper.vm.type).to.equal('description');
      expect(wrapper.vm.licenseVisiable).to.equal(true);
      done();
    });
  });
  it('showLicenseDiff', (done) => {
    moxios.stubOnce('GET', '/licenses/93D64A55-AA8B-4455-A2B7-1B406A776874/difference', {
      status: 200,
      response: {
        code: '0',
        msg: '',
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
      },
    });
    wrapper.vm.showLicenseDiff({ id: '93D64A55-AA8B-4455-A2B7-1B406A776874' });
    moxios.wait(() => {
      expect(wrapper.vm.licenseVisiable).to.equal(true);
      expect(wrapper.vm.type).to.equal('operation');
      done();
    });
  });
});
