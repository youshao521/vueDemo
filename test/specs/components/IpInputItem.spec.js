import moxios from 'moxios';
import { createWrapper } from '../../utils.js';
import { axiosInstance } from '../../../src/api/index.js';
import IpInputItem from '../../../src/components/IpInputItem.vue';

axiosInstance.defaults.baseURL = undefined;
describe('IpInputItem.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(IpInputItem);
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('初始化表单ip', () => {
    wrapper.setData({
      ipForm: {},
    });
    wrapper.vm.initFormIp('12.34.56.78');
    expect(Object.keys(wrapper.vm.ipForm).length).to.equal(4);
  });
  it('ip段校验不通过', () => {
    let msg = '';
    wrapper.vm.validateNum({}, '256', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('ipErrorMsg');
  });
  it('端口校验不通过', () => {
    let msg = '';
    wrapper.vm.validatePort({}, '65536', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('portRange');
  });
  it('更新ip,ip不为空', () => {
    wrapper.setData({
      id: 1,
      ipForm: {
        firstNum: '12',
        secondNum: '34',
        thirdNum: '56',
        fourthNum: '78',
        port: '233',
      },
      ipNotEmpty: true,
    });
    wrapper.vm.updateIp();
    expect(wrapper.vm.ipNotEmpty).to.equal(false);
  });
  it('更新ip,ip和port同为空', () => {
    wrapper.setData({
      id: 1,
      ipForm: {
        firstNum: '',
        secondNum: '',
        thirdNum: '',
        fourthNum: '',
        port: '',
      },
      ipNotEmpty: true,
      portNotEmpty: true,
    });
    wrapper.vm.updateIp();
    expect(wrapper.vm.ipNotEmpty).to.equal(false);
    expect(wrapper.vm.portNotEmpty).to.equal(false);
  });
  it('更新port,port不为空', () => {
    wrapper.setData({
      id: 1,
      ipForm: {
        firstNum: '12',
        secondNum: '34',
        thirdNum: '56',
        fourthNum: '78',
        port: '233',
      },
      portNotEmpty: true,
    });
    wrapper.vm.updatePort();
    expect(wrapper.vm.portNotEmpty).to.equal(false);
  });
  it('更新port,ip和port同为空', () => {
    wrapper.setData({
      id: 1,
      ipForm: {
        firstNum: '',
        secondNum: '',
        thirdNum: '',
        fourthNum: '',
        port: '',
      },
      ipNotEmpty: true,
      portNotEmpty: true,
    });
    wrapper.vm.updatePort();
    expect(wrapper.vm.ipNotEmpty).to.equal(false);
    expect(wrapper.vm.portNotEmpty).to.equal(false);
  });
  it('ip、port校验，ip为空port不为空', () => {
    wrapper.setData({
      ipForm: {
        firstNum: '',
        secondNum: '',
        thirdNum: '',
        fourthNum: '',
        port: '123',
      },
      ipError: true,
      ipNotEmpty: false,
      portNotEmpty: false,
    });
    const ret = wrapper.vm.ipPortValid();
    expect(wrapper.vm.ipError).to.equal(false);
    expect(wrapper.vm.ipNotEmpty).to.equal(true);
    expect(wrapper.vm.portNotEmpty).to.equal(false);
    expect(ret).to.equal(false);
  });
  it('ip、port校验，ip非空port为空', () => {
    wrapper.setData({
      ipForm: {
        firstNum: '12',
        secondNum: '12',
        thirdNum: '12',
        fourthNum: '',
        port: '',
      },
      ipError: false,
      ipNotEmpty: false,
      portNotEmpty: false,
    });
    const ret = wrapper.vm.ipPortValid();
    expect(wrapper.vm.ipError).to.equal(true);
    expect(wrapper.vm.ipNotEmpty).to.equal(false);
    expect(wrapper.vm.portNotEmpty).to.equal(true);
    expect(ret).to.equal(false);
  });
  it('ip、port校验，ip非空port为非空', () => {
    wrapper.setData({
      ipForm: {
        firstNum: '12',
        secondNum: '12',
        thirdNum: '12',
        fourthNum: '12',
        port: '12',
      },
      ipError: false,
      ipNotEmpty: false,
      portNotEmpty: false,
    });
    const ret = wrapper.vm.ipPortValid();
    expect(wrapper.vm.ipError).to.equal(false);
    expect(wrapper.vm.ipNotEmpty).to.equal(false);
    expect(wrapper.vm.portNotEmpty).to.equal(false);
    expect(ret).to.equal(true);
  });
});
