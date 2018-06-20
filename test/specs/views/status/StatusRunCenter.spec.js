import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import StatusRunCenter from '../../../../src/views/status/StatusRunCenter.vue';

axiosInstance.defaults.baseURL = undefined;

describe('StatusRunCenter.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(StatusRunCenter);
    wrapper.vm.$router.push('/status');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('切换服务器和客户端tab---至服务器', () => {
    wrapper.vm.tabClick('first');
    expect(wrapper.vm.loadingArr[1]).to.equal(false);
    expect(wrapper.vm.loadingArr[3]).to.equal(false);
  });
  it('切换服务器和客户端tab---至客户端', () => {
    wrapper.vm.tabClick('second');
    expect(wrapper.vm.loadingArr[0]).to.equal(false);
    expect(wrapper.vm.loadingArr[2]).to.equal(false);
  });

  it('cpu使用率----正常', () => {
    const rate = 40;
    expect(wrapper.vm.getCpuStatus(rate)).to.equal('general');
  });
  it('cpu使用率----一般', () => {
    const rate = 80;
    expect(wrapper.vm.getCpuStatus(rate)).to.equal('warning');
  });
  it('cpu使用率----告警', () => {
    const rate = 90;
    expect(wrapper.vm.getCpuStatus(rate)).to.equal('critical');
  });

  it('cpu使用率----正常', () => {
    const rate = 40;
    expect(wrapper.vm.getMemoryStatus(rate)).to.equal('general');
  });
  it('cpu使用率----一般', () => {
    const rate = 80;
    expect(wrapper.vm.getMemoryStatus(rate)).to.equal('warning');
  });
  it('cpu使用率----告警', () => {
    const rate = 90;
    expect(wrapper.vm.getMemoryStatus(rate)).to.equal('critical');
  });

  it('比较最近的时间,即取最大值', () => {
    const times = [80, 65, 45, 89, 78, 33];
    expect(wrapper.vm.maxTime(times)).to.equal(89);
  });

  it('链接至服务器', () => {
    const row = {
      id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
    };
    wrapper.vm.openServer(row);
  });

  it('链接至服务器告警', () => {
    const row = {
      id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
    };
    wrapper.vm.openAlert(row);
  });

  it('链接至组件', () => {
    const row = {
      id: 'asw_1.1.0',
      machine: {
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
    };
    wrapper.vm.linkComponent(row);
  });
  it('链接至组件告警', () => {
    const row = {
      id: 'asw_1.1.0',
      machine: {
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
    };
    wrapper.vm.linkAlert(row);
  });
  it('组件列表链接至服务器', () => {
    const row = {
      id: 'asw_1.1.0',
      machine: {
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
    };
    wrapper.vm.linkServer(row);
  });
  it('组件列表链接至操作记录', () => {
    const row = {
      id: 'asw_1.1.0',
      machine: {
        id: '56EA52B7-6B38-4270-8306-B6F490B6DE2D',
      },
    };
    wrapper.vm.linkOprateLog(row);
  });
  it('组件列表链接至授权管理', () => {
    const row = {
      license: 'DASDFDSAHHJKLHEWQHWN',
    };
    wrapper.vm.linkLicense(row);
  });
  it('展示系统检测页面: changeSystemCheck(bool)', (done) => {
    wrapper.setData({
      showSystemCheck: false,
    });
    wrapper.vm.changeSystemCheck(true);
    expect(wrapper.vm.showSystemCheck).to.equal(true);
    done();
  });
  it('无需授权组件', () => {
    expect(wrapper.vm.calcNeedLicense({ componentId: 'tomcat85win64' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: '@bic' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'jre' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'activemq' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'redis' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'cluster' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'postgresql' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'vod' })).to.equal(true);
    expect(wrapper.vm.calcNeedLicense({ componentId: 'tvms' })).to.equal(true);
  });
  it('服务器-组件列表加载失败', () => {
    wrapper.setData({
      loadingArr: [true, true, true, true],
      activeName: 'first',
      lastUpdated: '08:08',
    });
    wrapper.vm.loadError(1);
    expect(wrapper.vm.loadingArr[0]).to.equal(false);
    expect(wrapper.vm.loading).to.equal(false);
    expect(wrapper.vm.lastUpdated).to.equal('');
  });
});
