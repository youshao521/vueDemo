import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterTableView from '../../../../src/views/parameter/ParameterTableView.vue';
import {
  validAddress,
  validNumber,
  portValid,
  maxLengthValid,
  stringFormatValid,
  handleSettings,
  generateRules,
  handleImage,
  clearData,
  getModifyTableData,
  getNeedIssuedData,
  saveResultTip,
  saveAndIssue,
} from '../../../../src/views/parameter/utils';

describe('parameter/utils', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterTableView, { propsData: { keyword: '' } });
    moxios.stubOnce('GET', '/settings/services/options', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          components: [
            {
              name: 'asw',
              id: 'asw_1.1.0',
              services: [
                {
                  id: 'asw',
                  name: 'asw',
                },
              ],
            },
            {
              name: 'Redis',
              id: 'rediswin64_1.0.0',
              services: [
                {
                  id: 'cache',
                  name: 'Redis数据库服务',
                },
              ],
            },
          ],
          machines: [
            {
              ip: '10.20.147.73',
              name: '中心管理服务器',
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/settings/services?pageSize=100&pageNo=1&sortBy=&sortDirection=ASCENDING&machineId=&componentId=&serviceId=&configType=&keyword=', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          lastPage: 1,
          page: 1,
          perPage: 1,
          settings: [
            {
              component: {
                componentId: '',
                id: 'activemq514win64_1.0.0',
                name: 'ActiveMQ V1.0.0',
              },
              conflict: {
              },
              hasConflict: false,
              instance: {
                id: 'activemq514win64_1.0.0_mq_56EA52B7-6B38-4270-8306-B6F490B6DE2D_1',
                name: 'ActiveMQ服务-10.20.147.73-#1',
              },
              item: {
                addressPort: 'false',
                defaultValue: '512',
                description: '默认值:512MB,最小值:256MB,最大值:8192MB',
                key: 'Xms',
                keyName: 'JVM初始分配的堆内存(MB)',
                multiLanguage: false,
                needRestart: true,
                numberMax: 8192,
                numberMin: 256,
                portProtocol: '',
                portRange: false,
                readonly: false,
                stringFormat: '',
                type: 'number',
                value: '512',
              },
              lastUpdated: '2018-02-08T08:06:31.176Z',
              machine: {
                id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                ip: '10.20.147.73',
                name: '中心管理服务器',
              },
              result: '',
              service: {
                id: 'activemq514win64_1.0.0_mq',
                name: 'ActiveMQ服务',
              },
              state: 'issued',
            },
          ],
          total: 1,
        },
      },
    });
  });
  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });
  it('validAddress---addressPort为true', () => {
    let msg = '';
    validAddress.call(wrapper.vm, { addressPort: 'true', addressType: 'domain' }, 'http://www.baidu.com:122222', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('ipOrAddressPort');
  });
  it('validAddress---addressPort为false', () => {
    let msg = '';
    validAddress.call(wrapper.vm, { addressPort: 'false', addressType: 'ipv6' }, 'http://www.baidu.com:12', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('ipOrAddressNotPort');
  });
  it('validAddress---长度超出限制', () => {
    let msg = '';
    const value = 'https://1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.11.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.11.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.11.1.1.1.1.1';
    validAddress.call(wrapper.vm, { addressPort: 'false', addressType: 'ipv6,domain' }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('maxLengthTip');
  });
  it('validAddress---验证通过', () => {
    let msg = '';
    const value = 'https://1.1.1.1';
    validAddress.call(wrapper.vm, { addressPort: 'false', addressType: 'domain' }, value, (retStr) => {
      msg = retStr;
    });
    expect(msg).to.equal(undefined);
  });
  it('validNumber---min,max已定义，数字验证不通过', () => {
    let msg = '';
    const value = '1s';
    validNumber.call(wrapper.vm, { min: 0, max: 15 }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('pleaseInput 0 ~ 15 number');
  });
  it('validNumber---min,max未定义，数字验证不通过', () => {
    let msg = '';
    const value = '1s';
    validNumber.call(wrapper.vm, {}, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('enterInt');
  });
  it('validNumber---min,max已定义，大小验证不通过', () => {
    let msg = '';
    const value = '16';
    validNumber.call(wrapper.vm, { min: 0, max: 15 }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('pleaseInput 0 ~ 15 number');
  });
  it('validNumber---min,max已定义，验证通过', () => {
    let msg = '';
    const value = '10';
    validNumber.call(wrapper.vm, { min: 0, max: 15 }, value, (retStr) => {
      msg = retStr;
    });
    expect(msg).to.equal(undefined);
  });
  it('validNumber---数字过大', () => {
    let msg = '';
    const value = '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
    validNumber.call(wrapper.vm, {}, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('numTooBig');
  });
  it('portValid---不为空', () => {
    let msg = '';
    const value = '';
    portValid.call(wrapper.vm, { keyName: 'port' }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('portisRequired');
  });
  it('portValid---isRange为true，端口验证不通过', () => {
    let msg = '';
    const value = '65537-65538';
    portValid.call(wrapper.vm, { isRange: true }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('portPhase：(0~65535)-(0~65535)');
  });
  it('portValid---isRange为true，范围验证不通过', () => {
    let msg = '';
    const value = '789-23';
    portValid.call(wrapper.vm, { isRange: true }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('portBeforeAfter');
  });
  it('portValid---isRange为false，端口验证不通过', () => {
    let msg = '';
    const value = '789s';
    portValid.call(wrapper.vm, { isRange: false }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('portRange');
  });
  it('portValid---isRange为false，验证通过', () => {
    let msg = '';
    const value = '789';
    portValid.call(wrapper.vm, { isRange: false }, value, (retStr) => {
      msg = retStr;
    });
    expect(msg).to.equal(undefined);
  });
  it('maxLengthValid---字段过长', () => {
    let msg = '';
    const value = '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
    maxLengthValid.call(wrapper.vm, {}, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('maxLengthTip');
  });
  it('maxLengthValid---验证通过', () => {
    let msg = '';
    const value = 'test';
    maxLengthValid.call(wrapper.vm, { keyName: 'name' }, value, (retStr) => {
      msg = retStr;
    });
    expect(msg).to.equal(undefined);
  });
  it('stringFormatValid---不匹配stringFormat', () => {
    let msg = '';
    const value = '0abcdd';
    stringFormatValid.call(wrapper.vm, { keyName: '标题', reg: /^[a-zA-Z]+[0-9]*\W?_$/gi }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('notMatch');
  });
  it('stringFormatValid---字段过长', () => {
    let msg = '';
    const value = 'qqsdewqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq1';
    stringFormatValid.call(wrapper.vm, { keyName: '标题', reg: /^[a-zA-Z]+[0-9]$/gi }, value, (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('maxLengthTip');
  });
  it('stringFormatValid---验证通过', () => {
    let msg = '';
    const value = 'abc1';
    stringFormatValid.call(wrapper.vm, { keyName: '标题', reg: /^[a-zA-Z]+[0-9]$/gi }, value, (retStr) => {
      msg = retStr;
    });
    expect(msg).to.equal(undefined);
  });
  it('handleSettings', () => {
    const settings = [
      {
        item: {
          type: 'bool',
          value: 'true',
        },
        hasConflict: false,
      },
      {
        item: {
          type: 'password',
          value: '',
          readonly: false,
        },
        hasConflict: false,
      },
      {
        item: {
          type: 'port',
          value: '8080',
          readonly: false,
        },
        hasConflict: true,
        conflict: {
          component: {
            name: 'compinentName',
          },
          service: {
            name: 'serviceName',
          },
          machine: {
            name: '-',
          },
        },
      },
    ];
    const ret = handleSettings.call(wrapper.vm, settings);
    expect(ret[0].item.value).to.equal(true);
    expect(ret[1].item.value).to.equal('******');
    expect(ret[1].confilctMsg).to.equal('');
    expect(ret[2].portConflict).to.equal(true);
    expect(ret[2].confilctMsg).to.equal('portConflictTip');
  });
  it('generateRules---stringFormat不为空', () => {
    const item = {
      type: 'string',
      stringFormat: '/^[a-zA-Z]+[0-9]$/gi',
      keyName: 'string类型stringFormat不为空',
    };
    const rules = generateRules(item);
    expect(rules.length).to.equal(1);
    expect(rules[0].keyName).to.equal('string类型stringFormat不为空');
  });
  it('handleImage---宽度不符合条件', () => {
    wrapper.vm.imageObj = {
      item: {
        imageWidthMin: 320,
        imageWidthMax: 640,
      },
    };
    const image = {
      width: 840,
      height: 500,
    };
    handleImage.call(wrapper.vm, image, {}, {});
  });
  it('handleImage---高度不符合条件', () => {
    wrapper.vm.imageObj = {
      item: {
        imageWidthMin: 320,
        imageWidthMax: 640,
        imageHeightMin: 200,
        imageHeightMax: 800,
        value: '',
      },
    };
    const image = {
      width: 540,
      height: 190,
    };
    handleImage.call(wrapper.vm, image, {}, {});
  });
  it('handleImage---上传图片成功', (done) => {
    wrapper.vm.imageObj = {
      item: {
        imageWidthMin: 320,
        imageWidthMax: 640,
        imageHeightMin: 200,
        imageHeightMax: 800,
      },
    };
    const image = {
      width: 540,
      height: 390,
    };
    const form = new FormData();
    const file = {
      name: 'http://10.13.80.21:8080/center/1.png',
    };
    handleImage.call(wrapper.vm, image, form, file);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            tempUrl: 'http://10.33.40.241:8001/center/1111.png',
          },
        },
      }).then(() => {
        expect(wrapper.vm.imageObj.item.value).to.equal('http://10.33.40.241:8001/center/1111.png');
        done();
      });
    });
  });
  it('clearData', () => {
    const row = {
      item: {
        value: '系统管理',
      },
    };
    clearData(row);
    expect(row.item.value).to.equal('');
  });
  it('getModifyTableData', () => {
    const settings = [
      {
        state: 'toIssue',
        item: {
          type: 'password',
          value: '',
          key: 'key1',
          keyName: 'keyName1',
        },
        instance: {
          id: 'i1',
          name: 'instanceName1',
        },
        machine: {
          name: 'machineName1',
        },
        service: {
          name: 'serviceName1',
        },
      },
      {
        state: 'toIssue',
        item: {
          type: 'string',
          value: '123',
          key: 'key2',
          keyName: 'keyName2',
          multiLanguage: true,
        },
        instance: {
          id: 'i2',
          name: '0',
        },
        machine: {
          name: '-',
        },
        service: {
          name: 'serviceName2',
        },
      },
    ];
    const ret = getModifyTableData(settings, [], []);
    expect(ret.length).to.equal(2);
    expect(ret[0].path).to.equal('machineName1>serviceName1>instanceName1');
    expect(ret[1].path).to.equal('serviceName2');
  });
  it('getNeedIssuedData', () => {
    const settings = [
      {
        state: 'unissued',
        item: {
          type: 'password',
          value: '111',
          key: 'key1',
          keyName: 'keyName1',
        },
        instance: {
          id: 'i1',
          name: 'instanceName1',
        },
        machine: {
          name: 'machineName1',
        },
        service: {
          name: 'serviceName1',
        },
      },
      {
        state: 'unissued',
        item: {
          type: 'string',
          value: '123',
          key: 'key2',
          keyName: 'keyName2',
          multiLanguage: true,
        },
        instance: {
          id: 'i2',
          name: '0',
        },
        machine: {
          name: '-',
        },
        service: {
          name: 'serviceName2',
        },
      },
    ];
    const ret = getNeedIssuedData(settings, []);
    expect(ret.length).to.equal(2);
    expect(ret[0].value).to.equal('******');
    expect(ret[0].path).to.equal('machineName1>serviceName1>instanceName1');
    expect(ret[1].path).to.equal('serviceName2');
  });
  it('saveResultTip', () => {
    wrapper.vm.modifyList = ['111', '222'];
    const settings = [
      {
        state: 'issued',
        item: {
          type: 'password',
          value: '111',
          key: 'key1',
          keyName: 'keyName1',
          needRestart: true,
        },
        instance: {
          id: 'i1',
          name: 'instanceName1',
        },
        machine: {
          name: 'machineName1',
        },
        component: {
          name: 'componentName1',
        },
        service: {
          name: 'serviceName1',
        },
      },
      {
        state: 'unissued',
        result: '下发失败',
        item: {
          type: 'string',
          value: '123',
          key: 'key2',
          keyName: 'keyName2',
          multiLanguage: true,
          needRestart: true,
        },
        instance: {
          id: 'i2',
          name: 'instance2',
        },
        component: {
          name: 'componentName2',
        },
        machine: {
          name: 'machine2',
        },
        service: {
          name: 'serviceName2',
        },
      },
      {
        state: 'issued',
        item: {
          type: 'string',
          value: '123',
          key: 'key3',
          keyName: 'keyName3',
          multiLanguage: false,
          needRestart: false,
        },
      },
      {
        state: 'issued',
        item: {
          type: 'string',
          value: '123',
          key: 'key4',
          keyName: 'keyName4',
          multiLanguage: false,
          needRestart: false,
        },
      },
    ];
    saveResultTip.call(wrapper.vm, settings);
    expect(wrapper.vm.modifyList.length).to.equal(0);
  });
  it('saveAndIssue', (done) => {
    const parameter = [
      {
        state: 'toIssue',
        item: {
          type: 'password',
          value: '',
          key: 'key1',
          keyName: 'keyName1',
        },
        instance: {
          id: 'i1',
          name: 'instanceName1',
        },
        machine: {
          name: 'machineName1',
        },
        service: {
          name: 'serviceName1',
        },
      },
      {
        state: 'toIssue',
        item: {
          type: 'string',
          value: '123',
          key: 'key2',
          keyName: 'keyName2',
          multiLanguage: true,
        },
        instance: {
          id: 'i2',
          name: '0',
        },
        machine: {
          name: '-',
        },
        service: {
          name: 'serviceName2',
        },
      },
    ];
    saveAndIssue.call(wrapper.vm, parameter);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            settings: [],
          },
        },
      }).then(() => {
        done();
      });
    });
  });
});
