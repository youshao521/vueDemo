import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ImportDialog from '../../../../src/views/managements/ImportDialog.vue';

axiosInstance.defaults.baseURL = undefined;

describe('ImportDialog.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      importType: 0, // 组织上传为0,人员上传为1
    };
    wrapper = createWrapper(ImportDialog, { propsData });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('批导入组织---导入操作', (done) => {
    wrapper.vm.dialogVisible = true;
    wrapper.vm.maskObj.maskVisable = false;
    wrapper.vm.fileName = '';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.submitUpload();
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      done();
    });
  });

  it('批导入组织---全部导入成功', (done) => {
    wrapper.vm.dialogVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.maskObj.maskVisable = true;
      wrapper.vm.onSuccess({
        code: '0',
        msg: '成功',
        data: {
          failTotal: 0,
          fileName: '',
          repeatTotal: 0,
          successTotal: 5,
          uploadId: 'f5b7f905-01dd-43c6-a234-9f5933375e28',
        },
      });
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      done();
    });
  });

  it('批导入组织---存在错误项,无重复项', (done) => {
    wrapper.vm.dialogVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.maskObj.maskVisable = true;
      wrapper.vm.onSuccess({
        code: '0',
        msg: '成功',
        data: {
          failTotal: 1,
          fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e29.csv',
          repeatTotal: 0,
          successTotal: 5,
          uploadId: 'f5b7f905-01dd-43c6-a234-9f5933375e29',
        },
      });
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      expect(wrapper.vm.failName).to.equal('orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e29.csv');
      done();
    });
  });

  it('批导入组织---存在重复项', (done) => {
    wrapper.vm.dialogVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.maskObj.maskVisable = true;
      wrapper.vm.onSuccess({
        code: '0',
        msg: '成功',
        data: {
          failTotal: 1,
          fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv',
          repeatTotal: 1,
          successTotal: 5,
          uploadId: 'f5b7f905-01dd-43c6-a234-9f5933375e28',
        },
      });
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      expect(wrapper.vm.failName).to.equal('orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv');
      expect(wrapper.vm.showRepeatVisible).to.equal(true);
      done();
    });
  });

  it('批导入组织---失败（显示后端提示）', (done) => {
    wrapper.vm.dialogVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.maskObj.maskVisable = true;
      wrapper.vm.onError({
        code: '0x123',
        msg: '导入失败',
        data: null,
      });
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      done();
    });
  });

  it('批导入组织---失败（显示前端提示）', (done) => {
    wrapper.vm.dialogVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.maskObj.maskVisable = true;
      wrapper.vm.onError({
        code: '0x123',
        msg: '',
        data: null,
      });
    });
    moxios.wait(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      done();
    });
  });

  it('批导入组织---覆盖重复项成功(无错误项)', (done) => {
    moxios.stubOnce('GET',
      '/orgManage/v1/orgs/upload/override?uploadId=482082fc-c0b4-47e6-897b-61075f687a0d',
      {
        status: 200,
        response: {
          code: '0',
          data: {
            failTotal: 0,
            fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv',
            repeatTotal: 0,
            successTotal: 5,
            uploadId: '',
          },
          msg: '成功',
        },
      });
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '482082fc-c0b4-47e6-897b-61075f687a0d';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入组织---覆盖重复项成功(存在错误项)', (done) => {
    moxios.stubOnce('GET',
      '/orgManage/v1/orgs/upload/override?uploadId=482082fc-c0b4-47e6-897b-61075f687a0d',
      {
        status: 200,
        response: {
          code: '0',
          data: {
            failTotal: 1,
            fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv',
            repeatTotal: 0,
            successTotal: 5,
            uploadId: '',
          },
          msg: '成功',
        },
      });
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '482082fc-c0b4-47e6-897b-61075f687a0d';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入组织---覆盖重复项失败(后台返回错误提示)', (done) => {
    moxios.stubOnce('GET',
      '/orgManage/v1/orgs/upload/override?uploadId=482082fc-c0b4-47e6-897b-61075f687a0d',
      {
        status: 400,
        response: {
          code: '',
          data: null,
          msg: '覆盖重复项失败',
        },
      });
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '482082fc-c0b4-47e6-897b-61075f687a0d';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入组织---覆盖重复项失败(前端错误提示)', (done) => {
    moxios.stubOnce('GET',
      '/orgManage/v1/orgs/upload/override?uploadId=482082fc-c0b4-47e6-897b-61075f687a0d',
      {
        status: 400,
        response: {
          code: '',
          data: null,
          msg: '',
        },
      });
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '482082fc-c0b4-47e6-897b-61075f687a0d';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入人员---覆盖重复项成功(无错误项)', (done) => {
    moxios.stubOnce('GET',
      '/personManage/v1/persons/upload/override?uploadId=1ceaac8d-09f4-4b97-a448-b49452004db1',
      {
        status: 200,
        response: {
          code: '0',
          data: {
            failTotal: 0,
            fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv',
            repeatTotal: 0,
            successTotal: 5,
            uploadId: '',
          },
          msg: '成功',
        },
      });
    wrapper.vm.importType = 1;
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '1ceaac8d-09f4-4b97-a448-b49452004db1';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入人员---覆盖重复项成功(存在错误项)', (done) => {
    moxios.stubOnce('GET',
      '/personManage/v1/persons/upload/override?uploadId=1ceaac8d-09f4-4b97-a448-b49452004db1',
      {
        status: 200,
        response: {
          code: '0',
          data: {
            failTotal: 1,
            fileName: 'orgUploadError_f5b7f905-01dd-43c6-a234-9f5933375e28.csv',
            repeatTotal: 0,
            successTotal: 5,
            uploadId: '',
          },
          msg: '成功',
        },
      });
    wrapper.vm.importType = 1;
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '1ceaac8d-09f4-4b97-a448-b49452004db1';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入人员---覆盖重复项失败(后台返回错误提示)', (done) => {
    moxios.stubOnce('GET',
      '/personManage/v1/persons/upload/override?uploadId=1ceaac8d-09f4-4b97-a448-b49452004db1',
      {
        status: 400,
        response: {
          code: '',
          data: null,
          msg: '覆盖重复项失败',
        },
      });
    wrapper.vm.importType = 1;
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '1ceaac8d-09f4-4b97-a448-b49452004db1';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入人员---覆盖重复项失败(前端错误提示)', (done) => {
    moxios.stubOnce('GET',
      '/personManage/v1/persons/upload/override?uploadId=1ceaac8d-09f4-4b97-a448-b49452004db1',
      {
        status: 400,
        response: {
          code: '',
          data: null,
          msg: '',
        },
      });
    wrapper.vm.importType = 1;
    wrapper.vm.showRepeatVisible = true;
    wrapper.vm.uploadId = '1ceaac8d-09f4-4b97-a448-b49452004db1';

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(true);
      done();
    });
  });

  it('批导入组织---忽略并跳过重复项', (done) => {
    wrapper.vm.showRepeatVisible = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.toOverride(false);
      expect(wrapper.vm.showRepeatVisible).to.equal(false);
      done();
    });
  });
});
