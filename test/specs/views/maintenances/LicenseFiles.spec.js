import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LicenseFiles from '../../../../src/views/maintenances/LicenseFiles.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LicenseFiles.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LicenseFiles);
    // wrapper.vm.$router.push('/maintenances/licenses/files');
    moxios.stubOnce('GET', '/licenses', {
      status: 200,
      response: {
        code: '0',
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
        msg: '',
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('fetchLicenseFilesList---获取失败', (done) => {
    moxios.stubs.remove('GET', '/licenses');
    moxios.stubOnce('GET', '/licenses', {
      status: 500,
      response: {
        code: '0x123',
        data: {},
        msg: '失败',
      },
    });
    wrapper.vm.fetchLicenseFilesList();
    moxios.wait(() => {
      expect(wrapper.vm.noDataShow).to.equal(true);
      done();
    });
  });
  it('fetchLicenseFilesList---没有数据', (done) => {
    moxios.stubs.remove('GET', '/licenses');
    moxios.stubOnce('GET', '/licenses', {
      status: 200,
      response: {
        code: '0',
        data: {
          licenses: [],
        },
        msg: '',
      },
    });
    wrapper.vm.fetchLicenseFilesList();
    moxios.wait(() => {
      expect(wrapper.vm.noDataShow).to.equal(true);
      done();
    });
  });
  it('获取操作类型state为active', () => {
    expect(wrapper.vm.displayOperate('active')).to.equal(wrapper.vm.$t('deactivate'));
  });
  it('获取操作类型state为inactive', () => {
    expect(wrapper.vm.displayOperate('inactive')).to.equal(wrapper.vm.$t('activate'));
  });
  it('获取操作类型state为deactivating', () => {
    expect(wrapper.vm.displayOperate('deactivating')).to.equal(wrapper.vm.$t('continueDeactivate'));
  });
  it('禁用操作按钮 state为active', () => {
    wrapper.vm.licenseInfo =
      [
        { state: 'deactivating' },
      ];
    expect(wrapper.vm.disableOperation('active')).to.equal(true);
  });
  it('不禁用操作按钮 state为inactive', () => {
    wrapper.setData({
      licenseInfo: [
        {
          state: 'deactivating',
        },
      ],
    });
    expect(wrapper.vm.disableOperation('inactive')).to.equal(false);
  });
  it('继续反激活', () => {
    wrapper.vm.continueInactive({
      id: '1234444554',
      state: 'active',
    });
    expect(wrapper.vm.state).to.equal('active');
    expect(wrapper.vm.offlineActiveVisiable).to.equal(true);
  });
  it('删除授权成功', (done) => {
    wrapper.setData({
      licenseInfo: [
        {
          state: 'deactivating',
        },
        {
          state: 'inactive',
        },
      ],
    });
    expect(wrapper.vm.licenseInfo.length).to.equal(2);
    wrapper.vm.doDeleteLicense('111');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.licenseVisiable).to.equal(false);
        expect(wrapper.vm.licenseInfo.length).to.equal(1);
        done();
      });
    });
  });
  it('删除授权失败', (done) => {
    wrapper.vm.doDeleteLicense('111');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x123456',
          msg: '',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.licenseVisiable).to.equal(false);
        done();
      });
    });
  });
  it('删除授权失败---未登录', (done) => {
    wrapper.vm.doDeleteLicense('111');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x00137009',
          msg: '',
          data: null,
        },
      }).then(() => {
        expect(wrapper.vm.licenseVisiable).to.equal(false);
        done();
      });
    });
  });
  it('关闭离线激活弹窗', () => {
    wrapper.setData({
      offlineActiveVisiable: true,
    });
    expect(wrapper.vm.offlineActiveVisiable).to.equal(true);
    wrapper.vm.closeOffline();
    expect(wrapper.vm.offlineActiveVisiable).to.equal(false);
  });
});
