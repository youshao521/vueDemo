import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import PersonForm from '../../../../src/views/managements/PersonForm.vue';

axiosInstance.defaults.baseURL = undefined;

describe('PersonForm.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      formTitle: '添加人员',
      theForm: {
        birthday: '',
        eMail: '',
        fullName: '',
        gender: 0,
        mobile: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        personId: '',
        cardType: 2,
        cardNo: '',
      },
      formType: 'add',
      organizations: [
        {
          desc: '',
          name: '我的组织',
          orgCode: '',
          orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
          orgPath: '',
          parentId: '0',
          pdn: '',
        },
      ],
    };
    wrapper = createWrapper(PersonForm, { propsData });

    moxios.stubOnce('POST', '/personManage/v1/person', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          birthday: '2018-02-12',
          cardNo: '123',
          cardType: 2,
          eMail: '',
          fullName: '123',
          gender: 0,
          mobile: '',
          orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
          orgPath: '我的组织',
          personId: '542fb864-b00f-4989-b499-eee4500d300b',
        },
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('表单验证---通过（手机+身份证）', (done) => {
    wrapper.vm.form.fullName = '0123456789';
    wrapper.vm.form.mobile = '13012345678';
    wrapper.vm.form.cardNo = '330258199505060328';
    wrapper.vm.form.birthday = 'Mon Feb 12 2018 00:00:00 GMT+0800 (中国标准时间)';
    wrapper.vm.save(true);

    moxios.wait(() => {
      expect(wrapper.vm.form.birthday).to.equal('2018-02-12');
      done();
    });
  });

  it('表单验证---通过（手机+其他证件）', (done) => {
    wrapper.vm.form.fullName = '0123456789';
    wrapper.vm.form.mobile = '13012345678';
    wrapper.vm.form.cardType = 3;
    wrapper.vm.form.cardNo = '123abc';
    wrapper.vm.form.birthday = 'Mon Feb 12 2018 00:00:00 GMT+0800 (中国标准时间)';
    wrapper.vm.save(true);

    moxios.wait(() => {
      expect(wrapper.vm.form.birthday).to.equal('2018-02-12');
      done();
    });
  });

  it('表单验证---人员姓名为空', (done) => {
    wrapper.vm.form.fullName = '';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---人员姓名长度超过80', (done) => {
    wrapper.vm.form.fullName = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---人员姓名存在非法字符', (done) => {
    wrapper.vm.form.fullName = '\\';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---工作证为空', (done) => {
    wrapper.vm.$store.state.personCardMode = 'company';
    wrapper.vm.form.cardNo = '';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---电话号码为唯一标识，选择证件类型没输证件号', (done) => {
    wrapper.vm.$store.state.personCardMode = 'telephone';
    wrapper.vm.form.cardType = 1;
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---身份证件为空', (done) => {
    wrapper.vm.$store.state.personCardMode = 'individual';
    wrapper.vm.form.cardNo = '';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---其他证件为非数字和字符', (done) => {
    wrapper.vm.form.cardType = 3;
    wrapper.vm.form.cardNo = '户口簿';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---其他证件长度超过20', (done) => {
    wrapper.vm.form.cardType = 3;
    wrapper.vm.form.cardNo = '012345678901234567890123456789012345678901234567890123456789';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---电话号码非数字', (done) => {
    wrapper.vm.$store.state.personCardMode = 'telephone';
    wrapper.vm.form.mobile = 'sfda25487';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证---电话号码长度超过20', (done) => {
    wrapper.vm.$store.state.personCardMode = 'telephone';
    wrapper.vm.form.mobile = '012345678901234567890123456789012345678901234567890123456789';
    wrapper.vm.save(true);

    done();
  });

  it('表单验证通过，请求失败', (done) => {
    moxios.stubs.remove('POST', '/personManage/v1/person');
    moxios.stubOnce('POST', '/personManage/v1/person', {
      status: 400,
      response: {
        code: '',
        msg: '',
      },
    });
    wrapper.vm.form.fullName = '0123456789';
    wrapper.vm.form.mobile = '13012345678';
    wrapper.vm.form.cardNo = '330258199505060328';
    wrapper.vm.form.birthday = 'Mon Feb 12 2018 00:00:00 GMT+0800 (中国标准时间)';
    wrapper.vm.save(true);

    moxios.wait(() => {
      expect(wrapper.vm.form.birthday).to.equal('2018-02-12');
      done();
    });
  });
});
