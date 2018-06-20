import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LogBusiness from '../../../../src/views/logs/LogBusiness.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LogBusiness.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LogBusiness);
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化---获取组织树', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: [
            {
              groupParentId: '0',
              id: '1',
              name: '运行管理中心',
              nodes: [
                {
                  id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                  identity: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                  machineParentGroupId: '1',
                  name: '中心管理服务器a',
                  nodeType: 'server',
                  nodes: [
                    {
                      componentInstanceIndex: '1',
                      id: '@bic_1.0.0_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                      identity: '@bic',
                      machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                      name: '核心服务',
                      nodes: [],
                      version: '1.0.0',
                    },
                  ],
                },
                {
                  groupParentId: '1',
                  id: '9',
                  name: '22221',
                  nodes: [
                    {
                      id: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                      identity: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                      machineParentGroupId: '9',
                      name: '10.33.43.25',
                      nodeType: 'server',
                      nodes: [
                        {
                          componentInstanceIndex: '1',
                          id: 'vod_6.0.0_e35e6ea2-0adb-4e82-b7f2-3c02b4286068_1',
                          identity: 'vod',
                          machineId: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          name: '视频点播',
                          nodes: [],
                          version: '6.0.0',
                        },
                      ],
                    },
                    {
                      groupParentId: '9',
                      id: '13',
                      name: '233333',
                      nodes: [
                        {
                          id: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          identity: 'e35e6ea2-0adb-4e82-b7f2-3c02b4286068',
                          machineParentGroupId: '9',
                          name: '10.33.43.25',
                          nodeType: 'server',
                          nodes: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      }).then(() => {
        expect(wrapper.vm.treeData.length).to.equal(1);
        done();
      });
      done();
    });
  });

  it('查询日志---未勾选组件', (done) => {
    wrapper.vm.handleSearchClick();

    expect(wrapper.vm.nodeChecked).to.equal(false);
    done();
  });

  it('详情操作', (done) => {
    wrapper.vm.showDetails({
      actionDetail: '30秒定时获取服务器运行状态',
      actionResult: '成功',
      actionType: '定时任务',
      createdAt: '2018-03-05 16:51:00',
      ip: '10.20.147.73',
      mac: '',
      objectName: '',
      objectOrgName: '',
      objectType: '定时任务',
      terminal: '系统内部',
      userId: '@bic_center',
      userOrgName: '',
    });
    expect(wrapper.vm.detailDialogVisible).to.equal(true);
    expect(wrapper.vm.logItemKeys.createdAt).to.equal('2018-03-05 16:51:00');
    done();
  });

  it('导出---未选择组件', (done) => {
    wrapper.vm.outputLogs();
    expect(wrapper.vm.nodeChecked).to.equal(false);
    done();
  });

  it('导出---选择组件', (done) => {
    wrapper.vm.selectedComps.length = 1;
    wrapper.vm.outputLogs();
    done();
  });

  it('重置', (done) => {
    wrapper.vm.resetSearch();
    expect(wrapper.vm.searchForm.componentId).to.equal('');
    done();
  });

  it('树节点过滤', (done) => {
    expect(wrapper.vm.filterTreeNode('核心', {
      groupParentId: '2',
      id: '4',
      name: '2222',
      nodes: [],
    }, {
      parent: {
        data: {
          name: '核心服务',
        },
      },
    })).to.equal(true);
    done();
  });

  it('树节点过滤---输入为空', (done) => {
    expect(wrapper.vm.filterTreeNode('', {
      groupParentId: '2',
      id: '4',
      name: '2222',
      nodes: [],
    }, {
      parent: {
        data: {
          name: '核心服务',
        },
      },
    })).to.equal(true);
    done();
  });

  it('时间改变', (done) => {
    wrapper.vm.dateChange();
    expect(wrapper.vm.isDateShort).to.equal(false);
    done();
  });

  it('mutex', (done) => {
    wrapper.vm.mutex(['unlimited'], 'actionResult');
    expect(wrapper.vm.searchForm.actionResult[0]).to.equal('unlimited');
    done();
  });

  it('removeUnlimited', (done) => {
    wrapper.vm.searchForm.actionResult = ['unlimited', 'failed', 'succeed'];
    wrapper.vm.removeUnlimited(['unlimited'], 'actionResult');
    expect(wrapper.vm.searchForm.actionResult.length).to.equal(2);
    done();
  });

  it('removeUnlimited', (done) => {
    wrapper.vm.removeUnlimited([], 'actionResult');
    expect(wrapper.vm.searchForm.actionResult[0]).to.equal('unlimited');
    done();
  });
});
