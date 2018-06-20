import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import ParameterMultiline from '../../../../src/views/parameter/ParameterMultiline.vue';

axiosInstance.defaults.baseURL = undefined;
describe('ParameterMultiline.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(ParameterMultiline);
    moxios.stubOnce('GET', '/settings/lines?perPage=20&page=1&machineId=&q=&serviceName=&port=', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          settings: [
            {
              address: {
                id: '10.20.147.73##webPort##http',
                name: 'webPort',
                port: '8602',
                protocol: 'http',
              },
              id: '101de294-a9a3-4b62-b63b-5cec697b368e##webPort##8602##http##10.20.147.73',
              lines: [
                {
                  enabled: true,
                  id: 1,
                  ip: '12.12.12.12',
                  name: '111',
                  netprotocol: 'http',
                  port: 1212,
                },
              ],
              machine: {
                id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                ips: [
                  '10.20.147.73',
                ],
                name: '中心管理服务器',
              },
              service: {
                id: '101de294-a9a3-4b62-b63b-5cec697b368e',
                name: '媒体配置服务-10.20.147.73-#1',
              },
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/machines?type=server', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          machines: [
            {
              id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
              ip: '10.20.147.73',
              isCenter: true,
              name: '中心管理服务器',
              port: 0,
              serverId: 0,
              state: 'online',
              type: '',
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/service-nodes', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          serviceNodes: [
            {
              addresses: [
                {
                  id: '10.20.147.73##webPort##http',
                  name: 'webPort',
                  port: '8602',
                  protocol: 'http',
                },
              ],
              component: {
                id: 'vnsc',
                name: '媒体配置服务-10.20.147.73-#1',
                version: '1.0.0',
              },
              id: '101de294-a9a3-4b62-b63b-5cec697b368e',
              machine: {
                id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
                ips: [
                  '10.20.147.73',
                ],
                name: '中心管理服务器',
              },
              service: {
                id: '101de294-a9a3-4b62-b63b-5cec697b368e',
                name: '媒体配置服务-10.20.147.73-#1',
              },
            },
          ],
        },
      },
    });
    moxios.stubOnce('GET', '/lines', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          lines: [
            {
              id: 1,
              name: '111',
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
  it('更新ip', () => {
    wrapper.setData({
      lineObj: {
        line_1: {
          ip: '10.19.139.18',
          port: '1234',
        },
      },
    });
    expect(wrapper.vm.lineObj.line_1.ip).to.equal('10.19.139.18');
    wrapper.vm.updateIp('12.12.12.12', 1);
    expect(wrapper.vm.lineObj.line_1.ip).to.equal('12.12.12.12');
  });
  it('更新port', () => {
    wrapper.setData({
      lineObj: {
        line_1: {
          ip: '10.19.139.18',
          port: '1234',
        },
      },
    });
    expect(wrapper.vm.lineObj.line_1.port).to.equal('1234');
    wrapper.vm.updatePort('8888', 1);
    expect(wrapper.vm.lineObj.line_1.port).to.equal('8888');
  });
  it('处理ip数组,多个ip以|连接', () => {
    expect(wrapper.vm.machineIps(['12.34.56.7', '12.12.12.12'])).to.equal('12.34.56.7|12.12.12.12');
  });
  it('处理ip数组,数组为空的情况', () => {
    expect(wrapper.vm.machineIps([])).to.equal('-');
  });
  // it('启用线路', (done) => {
  //   const row = {
  //     address: {
  //       id: '10.20.147.72##port##tcp',
  //       name: 'port',
  //       port: '7018',
  //       protocol: 'tcp',
  //     },
  //     id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
  //     lines: [
  //       {
  //         enabled: true,
  //         id: 1,
  //         ip: '12.12.12.12',
  //         name: '111',
  //         netprotocol: 'tcp',
  //         port: 1212,
  //       },
  //     ],
  //     machine: {
  //       id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
  //       ips: [
  //         '10.20.147.72',
  //       ],
  //       name: '中心管理服务器',
  //     },
  //     service: {
  //       id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
  //       name: '[vnscqueue]-10.20.147.72-#2',
  //     },
  //     line_1: {
  //       enabled: true,
  //       id: 1,
  //       ip: '12.12.12.12',
  //       name: '111',
  //       netprotocol: 'tcp',
  //       port: 1212,
  //     },
  //   };
  //   const obj = {
  //     enabled: true,
  //     id: 1,
  //     ip: '12.12.12.12',
  //     name: '111',
  //     netprotocol: 'tcp',
  //     port: 1212,
  //   };
  //   wrapper.vm.saveLine(row, obj);
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: {
  //         code: '0',
  //         msg: '',
  //         data: {},
  //       },
  //     }).then(() => {
  //       done();
  //     });
  //   });
  // });
  // it('禁用线路失败', (done) => {
  //   const row = {
  //     address: {
  //       id: '10.20.147.72##port##tcp',
  //       name: 'port',
  //       port: '7018',
  //       protocol: 'tcp',
  //     },
  //     id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
  //     lines: [
  //       {
  //         enabled: false,
  //         id: 1,
  //         ip: '12.12.12.12',
  //         name: '111',
  //         netprotocol: 'tcp',
  //         port: 1212,
  //       },
  //     ],
  //     machine: {
  //       id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
  //       ips: [
  //         '10.20.147.72',
  //       ],
  //       name: '中心管理服务器',
  //     },
  //     service: {
  //       id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
  //       name: '[vnscqueue]-10.20.147.72-#2',
  //     },
  //     line_1: {
  //       enabled: false,
  //       id: 1,
  //       ip: '12.12.12.12',
  //       name: '111',
  //       netprotocol: 'tcp',
  //       port: 1212,
  //     },
  //   };
  //   const obj = {
  //     enabled: false,
  //     id: 1,
  //     ip: '12.12.12.12',
  //     name: '111',
  //     netprotocol: 'tcp',
  //     port: 1212,
  //   };
  //   wrapper.vm.saveLine(row, obj);
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 500,
  //       response: {
  //         code: '0xqwe32222',
  //         msg: '失败',
  //         data: {},
  //       },
  //     }).then(() => {
  //       done();
  //     });
  //   });
  // });
  it('启用线路', (done) => {
    moxios.stubOnce('POST', '/settings/lines?_method=PUT', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {},
      },
    });
    const row = {
      address: {
        id: '10.20.147.72##port##tcp',
        name: 'port',
        port: '7018',
        protocol: 'tcp',
      },
      id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
      lines: [
        {
          enabled: true,
          id: 1,
          ip: '12.12.12.12',
          name: '111',
          netprotocol: 'tcp',
          port: 1212,
        },
      ],
      machine: {
        id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
        ips: [
          '10.20.147.72',
        ],
        name: '中心管理服务器',
      },
      service: {
        id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
        name: '[vnscqueue]-10.20.147.72-#2',
      },
      line_1: {
        enabled: true,
        id: 1,
        ip: '12.12.12.12',
        name: '111',
        netprotocol: 'tcp',
        port: 1212,
      },
    };
    const obj = {
      enabled: true,
      id: 1,
      ip: '12.12.12.12',
      name: '111',
      netprotocol: 'tcp',
      port: 1212,
    };
    wrapper.vm.doSaveLine(row, obj, 'enabled');
    moxios.wait(() => {
      done();
    });
  });
  it('禁用线路失败', (done) => {
    moxios.stubs.remove('POST', '/settings/lines?_method=PUT');
    moxios.stubOnce('POST', '/settings/lines?_method=PUT', {
      status: 500,
      response: {
        code: '0x2345',
        msg: '操作失败',
        data: {},
      },
    });
    const row = {
      address: {
        id: '10.20.147.72##port##tcp',
        name: 'port',
        port: '7018',
        protocol: 'tcp',
      },
      id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
      lines: [
        {
          enabled: false,
          id: 1,
          ip: '12.12.12.12',
          name: '111',
          netprotocol: 'tcp',
          port: 1212,
        },
      ],
      machine: {
        id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
        ips: [
          '10.20.147.72',
        ],
        name: '中心管理服务器',
      },
      service: {
        id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
        name: '[vnscqueue]-10.20.147.72-#2',
      },
      line_1: {
        enabled: false,
        id: 1,
        ip: '12.12.12.12',
        name: '111',
        netprotocol: 'tcp',
        port: 1212,
      },
    };
    const obj = {
      enabled: false,
      id: 1,
      ip: '12.12.12.12',
      name: '111',
      netprotocol: 'tcp',
      port: 1212,
    };
    wrapper.vm.doSaveLine(row, obj, 'disabled');
    moxios.wait(() => {
      done();
    });
  });
  it('编辑线路配置', () => {
    const row = {
      address: {
        id: '10.20.147.72##port##tcp',
        name: 'port',
        port: '7018',
        protocol: 'tcp',
      },
      id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
      lines: [
        {
          enabled: false,
          id: 1,
          ip: '12.12.12.12',
          name: '111',
          netprotocol: 'tcp',
          port: 1212,
        },
      ],
      machine: {
        id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
        ips: [
          '10.20.147.72',
        ],
        name: '中心管理服务器',
      },
      service: {
        id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
        name: '[vnscqueue]-10.20.147.72-#2',
      },
      line_1: {
        enabled: false,
        id: 1,
        ip: '12.12.12.12',
        name: '111',
        netprotocol: 'tcp',
        port: 1212,
      },
    };
    wrapper.setData({
      totallineObjs: [
        {
          id: 1,
          name: '111',
        },
        {
          id: 2,
          name: '222',
        },
      ],
    });
    wrapper.vm.editLineSetting(row);
    expect(wrapper.vm.lineObj.lines.length).to.equal(1);
    expect(wrapper.vm.lineObj.line_2.id).to.equal(2);
  });
  it('线路名称校验---非空', () => {
    let msg = '';
    wrapper.vm.validateLine({}, '', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('isRequired');
  });
  it('线路名称校验---无效字符串', () => {
    let msg = '';
    wrapper.vm.validateLine({}, '         ', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('notEffective');
  });
  it('线路名称校验---超出限制', () => {
    let msg = '';
    wrapper.vm.validateLine({}, '111111111111111111111111111111111111111111111111111111111111111111111', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('stringLengthErr');
  });
  it('线路名称校验---添加线路时与已有线路名重复', () => {
    wrapper.setData({
      totallineObjs: [
        {
          id: 1,
          name: 'aaa',
        },
        {
          id: 2,
          name: 'bbb',
        },
      ],
    });
    let msg = '';
    wrapper.vm.validateLine({ type: 'add' }, 'BBB', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('lineNameSame');
  });
  it('线路名称校验---编辑线路时与已有线路名重复', () => {
    wrapper.setData({
      totallineObjs: [
        {
          id: 1,
          name: 'aaa',
        },
        {
          id: 2,
          name: 'bbb',
        },
      ],
    });
    let msg = '';
    wrapper.vm.validateLine({ type: 'edit', line: { id: 1, name: 'aaa' } }, 'BBB', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('lineNameSame');
  });
  it('线路名称校验---最多只能添加6条线路', () => {
    wrapper.setData({
      totallineObjs: [
        {
          id: 1,
          name: 'aaa',
        },
        {
          id: 2,
          name: 'bbb',
        },
        {
          id: 3,
          name: 'ccc',
        },
        {
          id: 4,
          name: 'ddd',
        },
        {
          id: 5,
          name: 'eee',
        },
        {
          id: 6,
          name: 'fff',
        },
      ],
    });
    let msg = '';
    wrapper.vm.validateLine({ type: 'add' }, 'wew', (retStr) => {
      msg = retStr.message;
    });
    expect(msg).to.equal('lineNum');
  });
  it('保存配置', (done) => {
    moxios.stubs.remove('POST', '/settings/lines?_method=PUT');
    moxios.stubOnce('POST', '/settings/lines?_method=PUT', {
      status: 500,
      response: {
        code: '0x12345',
        msg: '保存失败',
        data: {},
      },
    });
    wrapper.setData({
      lineObj: {
        serverName: '中心管理服务器 (10.20.147.72)',
        serviceName: '[vnscqueue]-10.20.147.72-#2',
        port: '7018',
        address: {
          id: '10.20.147.72##port##tcp',
          name: 'port',
          port: '7018',
          protocol: 'tcp',
        },
        id: '11664165-87c9-42f4-b83e-c89c8fcc498e##port##7018##tcp##10.20.147.72',
        lines: [
          {
            enabled: true,
            id: 1,
            ip: '12.12.12.12',
            name: '111',
            netprotocol: 'tcp',
            port: 1212,
          },
        ],
        machine: {
          id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
          ips: [
            '10.20.147.72',
          ],
          name: '中心管理服务器',
        },
        service: {
          id: '11664165-87c9-42f4-b83e-c89c8fcc498e',
          name: '[vnscqueue]-10.20.147.72-#2',
        },
        line_1: {
          enabled: true,
          id: 1,
          ip: '12.12.12.12',
          name: '111',
          netprotocol: 'tcp',
          port: 1212,
        },
        line_2: {
          id: 1,
          ip: '',
          name: '111',
          port: '',
        },
      },
      totallineObjs: [
        {
          id: 1,
          name: '111',
        },
        {
          id: 2,
          name: '222',
        },
      ],
    });
    wrapper.vm.doSaveData();
    moxios.wait(() => {
      done();
    });
  });
  it('重置表单', () => {
    wrapper.setData({
      addForm: {
        lineName: '',
      },
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.popShow();
    });
  });
  it('添加线路,表单验证失败', () => {
    wrapper.setData({
      addForm: {
        lineName: '',
      },
    });
    wrapper.vm.addLine();
  });
  it('添加线路', (done) => {
    moxios.stubOnce('POST', '/lines', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {},
      },
    });
    wrapper.setData({
      addForm: {
        lineName: '333',
      },
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.addLine();
    });
    moxios.wait(() => {
      done();
    });
  });
  it('添加线路失败', (done) => {
    moxios.stubs.remove('POST', '/lines');
    moxios.stubOnce('POST', '/lines', {
      status: 500,
      response: {
        code: '0x12345',
        msg: '添加失败',
        data: {},
      },
    });
    wrapper.setData({
      addForm: {
        lineName: '33444',
      },
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.addLine();
    });
    moxios.wait(() => {
      done();
    });
  });
  it('删除线路', (done) => {
    moxios.stubOnce('POST', '/lines/3?_method=DELETE', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {},
      },
    });
    const line = {
      id: 3,
      name: '333',
    };
    wrapper.vm.doDeleteLine(line);
    moxios.wait(() => {
      done();
    });
  });
  it('删除线路失败', (done) => {
    moxios.stubOnce('POST', '/lines/1?_method=DELETE', {
      status: 500,
      response: {
        code: '0x12345',
        msg: '删除失败',
        data: {},
      },
    });
    const line = {
      id: 1,
      name: '111',
    };
    wrapper.vm.doDeleteLine(line);
    moxios.wait(() => {
      done();
    });
  });
  it('编辑线路名称处理', () => {
    wrapper.setData({
      editlineIds: [],
    });
    expect(wrapper.vm.editlineIds.length).to.equal(0);
    const line = {
      id: 1,
      name: '111',
    };
    wrapper.vm.showEditLine(line);
    expect(wrapper.vm.editlineIds.length).to.equal(1);
  });
  it('显示编辑文本框', () => {
    wrapper.setData({
      editlineIds: [1],
    });
    const line = {
      id: 1,
      name: '111',
    };
    expect(wrapper.vm.editLineVisiable(line)).to.equal(true);
  });
  it('不显示编辑文本框', () => {
    wrapper.setData({
      editlineIds: [2],
    });
    const line = {
      id: 1,
      name: '111',
    };
    expect(wrapper.vm.editLineVisiable(line)).to.equal(false);
  });
  it('保存修改的线路名称', (done) => {
    moxios.stubs.remove('POST', '/lines?_method=PUT');
    moxios.stubOnce('POST', '/lines?_method=PUT', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {},
      },
    });
    const line = {
      id: 2,
      name: '2222',
    };
    wrapper.setData({
      editForm: {
        2: {
          lineName: '12345',
        },
      },
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.doEditLine(line);
    });
    moxios.wait(() => {
      done();
    });
  });
  it('保存修改的线路名称失败', (done) => {
    moxios.stubs.remove('POST', '/lines?_method=PUT');
    moxios.stubOnce('POST', '/lines?_method=PUT', {
      status: 500,
      response: {
        code: '0x12345',
        msg: '修改失败',
        data: {},
      },
    });
    const line = {
      id: 1,
      name: '111',
    };
    wrapper.setData({
      editForm: {
        1: {
          lineName: '1234',
        },
      },
    });
    wrapper.vm.$nextTick(() => {
      wrapper.vm.doEditLine(line);
    });
    moxios.wait(() => {
      done();
    });
  });
  it('不显示编辑文本框', () => {
    const arr = ['111', '222', '333'];
    wrapper.vm.removeByValue(arr, '111');
    expect(arr.length).to.equal(2);
  });
});
