import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import AlarmHandle from '../../../../src/components/AlarmHandle.vue';

axiosInstance.defaults.baseURL = undefined;
describe('AlarmHandle.vue', () => {
  let wrapper = null;
  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(AlarmHandle, {
      propsData: {
        alarmflag: true,
      },
    });
    wrapper.vm.$router.push({
      name: 'alerts',
      params: {
        machineId: '11',
        componentId: '11',
      },
    });
    moxios.stubOnce('GET', '/alerts', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: {
          alerts: [
            {
              code: '1002',
              comment: '',
              count: 2006,
              createdAt: '2017-11-27T03:48:48.000Z',
              description: '服务器剩余内存值小于20% ',
              dumpList: [],
              id: '001',
              isLog: true,
              isRestartable: true,
              lastUpdated: '2017-12-04T02:54:03.000Z',
              level: 'critical',
              source: {
                component: {},
                instance: {},
                machine: {
                  deleted: false,
                  name: '236',
                  id: '062A287C-409A-4F58-934E-1D0FB94666EE',
                  ip: '10.33.16.149',
                },
              },
              state: 'unsolved',
              suggestions: [
                null,
                '1.请检查管理服务是否正常启动；\\n2.设备接入服务和设备管理服务未',
              ],
              tags: [],
              type: '负载过高',
            },
          ],
          count: {
            general: 0,
            critical: 2,
            warning: 0,
          },
          lastPage: 1,
          page: 1,
          perPage: 20,
          total: 2,
        },
      },
    });
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('method(): writeFAQ', () => {
    wrapper.vm.writeFAQ({
      description: '',
      comment: '',
    });
    expect(wrapper.vm.questionDialog).to.equal(true);
  });
  it('method(): showDetail', () => {
    wrapper.vm.currentRow = {};
    wrapper.vm.showDetail({
      id: '01',
      dumpList: [
        {
          name: 'aaa',
          path: '/HIKVISION',
          size: 1024,
        },
      ],
    });
    expect(wrapper.vm.currentRow.id).to.equal('01');
  });
  it('method(): screenSelect', () => {
    const result = wrapper.vm.screenSelect({
      state: 'unsolved',
    });
    expect(result).to.equal(true);
  });
  it('method(): screenSelect--分支', () => {
    const result = wrapper.vm.screenSelect({
      state: 'solved',
    });
    expect(result).to.equal(false);
  });
  it('method(): conditionSearch', (done) => {
    wrapper.setData({
      tableForm: {
        timerange: ['2018-02-01T00:00:00.000+08:00', '2018-02-08T23:59:59.000+08:00'],
        handlestate: ['unlimited'],
        warningsource: ['unlimited'],
        warninglevel: ['unlimited'],
        warningtype: [],
        searchInput: '666',
      },
    });
    wrapper.vm.conditionSearch();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.search.begin).to.equal('2018-02-01T00:00:00.000+08:00');
        done();
      });
    });
  });
  it('method(): conditionSearch-分支1', (done) => {
    wrapper.setData({
      tableForm: {
        handlestate: ['unlimited'],
        warningsource: ['unlimited'],
        warninglevel: ['unlimited'],
        warningtype: [],
        searchInput: '666',
      },
    });
    wrapper.vm.conditionSearch();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.search.warninglevel).to.equal('');
        done();
      });
      done();
    });
  });
  it('method(): conditionSearch-分支2', (done) => {
    wrapper.setData({
      tableForm: {
        timerange: [null, null],
        handlestate: ['unlimited'],
        warningsource: ['unlimited'],
        warninglevel: ['unlimited'],
        warningtype: [],
        searchInput: '666',
      },
    });
    wrapper.vm.conditionSearch();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.search.searchInput).to.equal('666');
        done();
      });
      done();
    });
  });
  it('method(): batchHandle', (done) => {
    wrapper.vm.$refs.dataTable.toggleRowSelection({
      id: '001',
    });
    wrapper.vm.batchHandle('solve', '7');
    expect(wrapper.vm.batchTime).to.equal('7');
    done();
  });
  // it('method(): countpay', (done) => {
  //   wrapper.vm.$refs.dataTable.clearSelection();
  //   wrapper.vm.countpay({
  //     alerts: [
  //       {
  //         id: '001',
  //       },
  //     ],
  //     total: 30,
  //     count: 30,
  //   });
  //   expect(wrapper.vm.alertsNumber).to.equal(30);
  //   done();
  // });
  it('method(): visibleIgnore', (done) => {
    wrapper.setData({
      batchIgnoreMenu: true,
    });
    wrapper.vm.visibleIgnore();
    expect(wrapper.vm.batchIgnoreMenu).to.equal(false);
    done();
  });
  it('method(): mutex', (done) => {
    wrapper.setData({
      tableForm: {
        warningtype: [],
      },
    });
    wrapper.vm.mutex([], 'warningtype', false);
    expect(wrapper.vm.tableForm.warningtype[0]).to.equal('unlimited');
    done();
  });
  it('method(): confirmPassword', (done) => {
    wrapper.setData({
      password: '123456',
      currentRow: {
        source: {
          machine: {
            id: '123456',
          },
        },
      },
    });
    wrapper.vm.confirmPassword();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.dialogVisible).to.equal(false);
        done();
      });
      done();
    });
  });
  it('method(): thenIgnore', (done) => {
    wrapper.setData({
      currentRow: {
        id: '001',
        comment: '1111',
      },
    });
    wrapper.vm.thenIgnore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow).to.equal(null);
        done();
      });
      done();
    });
  });
  it('method(): thenIgnore --- 失败', (done) => {
    wrapper.setData({
      currentRow: {
        id: '001',
        comment: '1111',
      },
    });
    wrapper.vm.thenIgnore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow.id).to.equal('001');
        done();
      });
      done();
    });
  });
  it('method(): thenSolve', (done) => {
    wrapper.setData({
      currentRow: {
        id: '001',
        comment: '1111',
      },
    });
    wrapper.vm.thenSolve();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow).to.equal(null);
        done();
      });
      done();
    });
  });
  it('method(): thenSolve --- 失败', (done) => {
    wrapper.setData({
      currentRow: {
        id: '001',
        comment: '1111',
      },
    });
    wrapper.vm.thenSolve();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow.id).to.equal('001');
        done();
      });
      done();
    });
  });
  it('method(): closeBatch', (done) => {
    wrapper.setData({
      batchComment: '111',
      batchTime: '111',
      postType: '111',
    });
    wrapper.vm.closeBatch();
    expect(wrapper.vm.batchComment).to.equal('');
    expect(wrapper.vm.batchTime).to.equal('');
    expect(wrapper.vm.postType).to.equal('');
    done();
  });
  it('method(): showIgnoreMenu', (done) => {
    wrapper.setData({
      batchIgnoreMenu: false,
      ignoreMenu: false,
    });
    wrapper.vm.showIgnoreMenu(true);
    expect(wrapper.vm.batchIgnoreMenu).to.equal(false);
    wrapper.vm.$refs.dataTable.toggleRowSelection({
      id: '001',
    });
    wrapper.vm.showIgnoreMenu(false);
    expect(wrapper.vm.ignoreMenu).to.equal(true);
    done();
  });
  it('method(): exportData', (done) => {
    wrapper.vm.exportData();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow).to.equal(null);
        done();
      });
      done();
    });
  });
  it('method(): exportData', (done) => {
    wrapper.setProps({
      alarmflag: false,
    });
    wrapper.vm.exportData();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.currentRow).to.equal(null);
        done();
      });
      done();
    });
  });
  it('method(): batchConfirm', (done) => {
    wrapper.setProps({
      alarmflag: false,
    });
    wrapper.vm.batchConfirm();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {},
        },
      }).then(() => {
        expect(wrapper.vm.commtDialog).to.equal(false);
        done();
      });
      done();
    });
  });
});
