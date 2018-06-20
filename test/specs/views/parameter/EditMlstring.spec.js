import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import EditMlstring from '../../../../src/views/parameter/EditMlstring.vue';

axiosInstance.defaults.baseURL = undefined;
describe('EditMlstring.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const row = {
      instance: {
        id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
        name: 'ActiveMQ服务-10.20.147.73-#1',
      },
      item: {
        key: 'Xms',
        keyName: '系统标题',
        type: 'port',
        portRange: false,
        readonly: false,
        portProtocol: 'http',
        value: 'title',
        stringFormat: '^.{4,20}$',
      },
      machine: {
        id: '1',
        name: 'machine',
      },
      component: {
        componentId: '',
        id: 'activemq514win64_1.0.0',
        name: 'ActiveMQ V1.0.0',
      },
      service: {
        id: 'activemq514win64_1.0.0_mq',
        name: 'ActiveMQ服务',
      },
      fontWeight: false,
      portConflict: false,
      confilctMsg: '',
    };
    wrapper = createWrapper(EditMlstring, {
      propsData: { mlstringEditVisiable: true, modifyRow: row },
    });
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('关闭弹框', () => {
    expect(wrapper.vm.mlstringEditVisiable).to.equal(true);
    expect(wrapper.vm.modifyRow.item.value).to.equal('title');
    wrapper.vm.dealClose();
  });
});
