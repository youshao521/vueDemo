import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import AgentForm from '../../../../src/views/status/AgentForm.vue';

axiosInstance.defaults.baseURL = undefined;

describe('AgentForm.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(AgentForm, {
      propsData: {
        model: {
          ip: '10.19.137.102',
          name: 'CSL',
          port: 8010,
          username: 'sysadmin',
          password: 'Abc123++',
        },
        mode: 'add',
        showButtons: true,
        disableButton: false,
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('添加服务器表单---validate方法', () => {
    expect(typeof (wrapper.vm.validate())).to.equal('object');
  });

  it('添加服务器表单---清空验证resetValidate方法', () => {
    expect(typeof (wrapper.vm.resetValidate())).to.equal('object');
  });

  it('添加服务器名称校验---validName空格', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test test', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('noSpace');
  });

  it('添加服务器名称校验---validName长度', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test长度test长度test长度test长度more', (retStr) => {
      exStr = retStr.message;
    });
    expect(exStr).to.equal('nameInputLimit');
  });

  it('添加服务器名称校验---validName成功', () => {
    let exStr = '';
    wrapper.vm.validName(false, 'test长度success', (retStr) => {
      exStr = retStr;
    });
    expect(exStr).to.equal(undefined);
  });
});
