import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LicenseOffline from '../../../../src/views/maintenances/LicenseOffline.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LicenseOffline.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LicenseOffline, { propsData: { id: '12345', state: 'inactive' } });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('文件后缀不为bin', () => {
    expect(wrapper.vm.fileExtError('请求文件.doc')).to.equal(true);
  });
  it('文件后缀为bin', () => {
    expect(wrapper.vm.fileExtError('请求文件.bin')).to.equal(false);
  });
  it('文件大小>=5M', () => {
    expect(wrapper.vm.fileSizeError({ size: 6 * 1024 * 1024 })).to.equal(true);
  });
  it('文件大小<5M', () => {
    expect(wrapper.vm.fileSizeError({ size: 4 * 1024 * 1024 })).to.equal(false);
  });
  it('处理第二个导入文件', () => {
    const e = {
      target: {
        files: [
          {
            name: 'activateResponse.bin',
          },
        ],
      },
    };
    const ret = wrapper.vm.handleChange2(e);
    expect(ret).to.equal(true);
    expect(wrapper.vm.file2.name).to.equal('activateResponse.bin');
  });
  it('下载离线反激活请求文件成功', (done) => {
    wrapper.vm.downloadFile('first');
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
        done();
      });
    });
  });
  it('下载离线反激活请求文件失败', (done) => {
    wrapper.vm.downloadFile('first');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0xa234w35',
          msg: '下载离线反激活请求文件失败',
          data: null,
        },
      }).then(() => {
        done();
      });
    });
  });
  it('离线激活，文件为空', () => {
    wrapper.setData({
      file: '',
    });
    expect(wrapper.vm.uploadFile(1)).to.equal(false);
  });
  it('离线激活', (done) => {
    wrapper.setData({
      file: 'activateResponse.bin',
    });
    wrapper.vm.uploadFile(0);
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
        done();
      });
    });
  });
  it('离线激活---失败', (done) => {
    wrapper.setData({
      file: 'activateResponse.bin',
    });
    wrapper.vm.uploadFile(0);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: {
          code: '0x12345',
          msg: '',
          data: null,
        },
      }).then(() => {
        done();
      });
    });
  });
  it('离线激活---未登录', (done) => {
    wrapper.setData({
      file: 'activateResponse.bin',
    });
    wrapper.vm.uploadFile(0);
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
        done();
      });
    });
  });
  it('离线反激活---第一步', (done) => {
    wrapper.setData({
      file: 'activateResponse.bin',
      disable: false,
    });
    expect(wrapper.vm.disable).to.equal(false);
    wrapper.vm.uploadFile(1);
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
        expect(wrapper.vm.disable).to.equal(true);
        done();
      });
    });
  });
  it('离线反激活---第二步', (done) => {
    wrapper.setData({
      file: 'activateResponse.bin',
      file2: 'activateResponse2.bin',
    });
    wrapper.vm.uploadFile(2);
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
        done();
      });
    });
  });
  it('清空文件', () => {
    wrapper.setData({
      file: 'activateResponse.bin',
      file2: 'deactivateResponse.bin',
    });
    wrapper.vm.clearFile();
    expect(wrapper.vm.file).to.equal('');
    expect(wrapper.vm.file2).to.equal('');
  });
});
