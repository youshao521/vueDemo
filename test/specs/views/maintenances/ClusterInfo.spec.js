// import moxios from 'moxios';
// import { createWrapper } from '../../../utils.js';
// import { axiosInstance } from '../../../../src/api/index.js';
// import ClusterInfo from '../../../../src/views/maintenances/ClusterInfo.vue';

// axiosInstance.defaults.baseURL = undefined;

// describe('ClusterInfo.vue', () => {
//   let wrapper = null;

//   beforeEach(() => {
//     moxios.install(axiosInstance);
//     const propsData = {
//       address: [
//         {
//           ip: '10.33.40.248',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.248',
//           key: 'internalPort',
//           name: '',
//           netProtocol: 'http',
//           port: 9999,
//           webPort: false,
//         },
//       ],
//       clusterCode: '899c92c2-3b15-4586-b9d2-cc9e4c06dd9a',
//       clusterId: 'cluster6',
//       createTime: '2018-01-29T11:58:10.699+08:00',
//       internalPort: 9999,
//       ip: '10.33.40.248',
//       loadStrategy: 'polling',
//       name: '集群名称',
//       nodesNumber: 1,
//       path: '/testA',
//       port: 80,
//       protocol: 'http',
//       proxyId: '',
//       serviceComponentId: 'vod',
//       serviceType: 'vod',
//       state: 'normal',
//       nameMore: '10.33.40.248:80',
//     };
//     wrapper = createWrapper(ClusterInfo, { propsData: { cluster: propsData } });
//     wrapper.vm.$router.push('/login');

//     moxios.stubOnce('GET', '/session?username=sysadmin', {
//       status: 200,
//       response: {
//         code: '0',
//         msg: '',
//         data: {
//           salt: 'a8e2f7fd2745ee974f71ce801f209d50',
//           lock: false,
//           requireCaptcha: false,
//           challenge: {
//             code: '51d64fd0687f4ada31a1f05df79dcd70',
//             id: 'ae16e7185f36c829aec5032901036235',
//           },
//           username: 'sysadmin',
//         },
//       },
//     });
//   });

//   afterEach(() => {
//     // wrapper.vm.$destroy();
//     moxios.uninstall(axiosInstance);
//   });

//   it('获取状态', (done) => {
//     expect(wrapper.vm.getProcessStatus(10)).to.equal('critical');
//     expect(wrapper.vm.getProcessStatus(70)).to.equal('warning');
//     expect(wrapper.vm.getProcessStatus(100)).to.equal('success');
//     done();
//   });

//   it('获取初始化数据', (done) => {
//     const resp = {
//       code: '0',
//       data: {
//         cluster: {
//           instances: [
//             {
//               address: '10.33.40.248:6304',
//               id: 'ece1dff0-715f-42cd-888e-0e5c486721ca',
//               instanceId: '',
//               joined: false,
//               name: '视频点播服务-10.33.40.248-#1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: 'null',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//             {
//               address: '10.33.40.50:6304',
//               id: 'dbf342ac-b306-4250-a242-a7983e980960',
//               instanceId: 'vod_5.0.0_vod_1a0341e0-4605-402b-9180-aa7ffe0fa14a_1',
//               joined: true,
//               name: 'testvod1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: '1',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//           ],
//         },
//       },
//       msg: 'success',
//     };
//     wrapper.vm.refreshData();
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: resp,
//       }).then(() => {
//         done();
//       });
//     });
//   });
//   it('获取初始化数据失败', (done) => {
//     const resp = {
//       code: '01',
//       data: {
//         cluster: {
//           instances: [
//             {
//               address: '10.33.40.248:6304',
//               id: 'ece1dff0-715f-42cd-888e-0e5c486721ca',
//               instanceId: '',
//               joined: false,
//               name: '视频点播服务-10.33.40.248-#1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: 'null',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//             {
//               address: '10.33.40.50:6304',
//               id: 'dbf342ac-b306-4250-a242-a7983e980960',
//               instanceId: 'vod_5.0.0_vod_1a0341e0-4605-402b-9180-aa7ffe0fa14a_1',
//               joined: true,
//               name: 'testvod1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: '1',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//           ],
//         },
//       },
//       msg: 'success',
//     };
//     wrapper.vm.refreshData();
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: resp,
//       }).then(() => {
//         done();
//       }).catch(() => {
//         done();
//       });
//     });
//   });

//   it('获取初始化数据返回失败', (done) => {
//     wrapper.vm.refreshData();
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 500,
//       }).then(() => {
//         done();
//       }).catch(() => {
//         done();
//       });
//     });
//   });

//   it('处理返回数据', (done) => {
//     const resp = {
//       code: '0',
//       data: {
//         cluster: {
//           instances: [
//             {
//               address: '10.33.40.248:6304',
//               id: 'ece1dff0-715f-42cd-888e-0e5c486721ca',
//               instanceId: '',
//               joined: false,
//               name: '视频点播服务-10.33.40.248-#1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: 'null',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//             {
//               address: '10.33.40.50:6304',
//               id: 'dbf342ac-b306-4250-a242-a7983e980960',
//               instanceId: 'vod_5.0.0_vod_1a0341e0-4605-402b-9180-aa7ffe0fa14a_1',
//               joined: true,
//               name: 'testvod1',
//               status: {
//                 requests: {
//                   durations: [
//                     0,
//                     0,
//                     0,
//                   ],
//                   error: 0,
//                   perSecond: 0,
//                   success: 0,
//                   total: 0,
//                 },
//                 state: '',
//                 traffic: {
//                   downstream: 0,
//                   upstream: 0,
//                 },
//               },
//               weight: '1',
//               state: '',
//               perSecond: 0,
//               normalAccount: 0,
//               durations: [
//                 0,
//                 0,
//                 0,
//               ],
//             },
//           ],
//         },
//       },
//       msg: 'success',
//     };
//     wrapper.vm.dealData(resp);
//     expect(wrapper.vm.infoLoading).to.equal(false);
//     done();
//   });

//   it('移入集群', () => {
//     const row = {
//       address: '10.33.40.248:6304',
//       id: 'ece1dff0-715f-42cd-888e-0e5c486721ca',
//       instanceId: '',
//       joined: false,
//       name: '视频点播服务-10.33.40.248-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: '',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: 'null',
//       state: '',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.oprateCluster('join', row);
//   });

//   it('移出集群', () => {
//     const row = {
//       address: '10.33.40.248:6304',
//       id: 'ece1dff0-715f-42cd-888e-0e5c486721ca',
//       instanceId: '',
//       joined: false,
//       name: '视频点播服务-10.33.40.248-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: '',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: 'null',
//       state: '',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.oprateCluster('unjoin', row);
//   });

//   it('集群操作框', () => {
//     const instance = {
//       address: '10.33.40.92:8080',
//       id: 'e06aa896-4874-4bdc-9d91-7fbe087262e6',
//       instanceId: 'paf_1.0.0_paf-pas_43A1CB84-A8C9-4C41-B098-83ABE4A74384_1',
//       joined: true,
//       name: '探针接入服务-10.33.40.92-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.opreateDialog(instance, 'stop');
//   });

//   it('集群操作', (done) => {
//     const instance = {
//       address: '10.33.40.92:8080',
//       id: 'e06aa896-4874-4bdc-9d91-7fbe087262e6',
//       instanceId: 'paf_1.0.0_paf-pas_43A1CB84-A8C9-4C41-B098-83ABE4A74384_1',
//       joined: true,
//       name: '探针接入服务-10.33.40.92-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.type = 'start';
//     wrapper.vm.operateInstance(instance, 'start');
//     const data = '';
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           code: '0',
//           msg: '',
//           data,
//         },
//       }).then(() => {
//         done();
//       });
//     });
//   });
//   it('集群操作失败', (done) => {
//     const instance = {
//       address: '10.33.40.92:8080',
//       id: 'e06aa896-4874-4bdc-9d91-7fbe087262e6',
//       instanceId: 'paf_1.0.0_paf-pas_43A1CB84-A8C9-4C41-B098-83ABE4A74384_1',
//       joined: true,
//       name: '探针接入服务-10.33.40.92-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.type = 'start';
//     wrapper.vm.operateInstance(instance, 'start');
//     const data = '';
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           code: '011',
//           msg: '',
//           data,
//         },
//       }).then(() => {
//         expect(instance.state).to.equal('SERVICE_STOPPED');
//         done();
//       });
//     });
//   });
//   it('集群操作返回失败', (done) => {
//     const instance = {
//       address: '10.33.40.92:8080',
//       id: 'e06aa896-4874-4bdc-9d91-7fbe087262e6',
//       instanceId: 'paf_1.0.0_paf-pas_43A1CB84-A8C9-4C41-B098-83ABE4A74384_1',
//       joined: true,
//       name: '探针接入服务-10.33.40.92-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.type = 'start';
//     wrapper.vm.operateInstance(instance, 'start');
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 500,
//       }).then(() => {
//         done();
//       }).catch(() => {
//         done();
//       });
//     });
//   });

//   it('集群状态更新', () => {
//     const instance = {
//       address: '10.33.40.92:8080',
//       id: 'e06aa896-4874-4bdc-9d91-7fbe087262e6',
//       instanceId: 'paf_1.0.0_paf-pas_43A1CB84-A8C9-4C41-B098-83ABE4A74384_1',
//       joined: true,
//       name: '探针接入服务-10.33.40.92-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.getDataStatus(instance, 'stop');
//     const item = {
//       address: '10.33.40.241:6304',
//       id: 'b2191830-9b34-40e8-83d4-8c86cad30edb',
//       instanceId: 'vod_5.0.0_vod_D0C6C799-A6DE-41A8-9A86-416F1DA948C8_1',
//       joined: true,
//       name: '视频点播服务-10.33.40.241-#1',
//       status: {
//         requests: {
//           durations: [
//             0,
//             0,
//             0,
//           ],
//           error: 0,
//           perSecond: 0,
//           success: 0,
//           total: 0,
//         },
//         state: 'SERVICE_STOPPED',
//         traffic: {
//           downstream: 0,
//           upstream: 0,
//         },
//       },
//       weight: '1',
//       state: 'SERVICE_STOPPED',
//       perSecond: 0,
//       normalAccount: 0,
//       durations: [
//         0,
//         0,
//         0,
//       ],
//     };
//     wrapper.vm.dealStatusData(item, 'stop');
//   });

//   it('处理每页条数更改', () => {
//     wrapper.vm.handleSizeChange(50);
//     expect(wrapper.vm.pageSize).to.equal(50);
//   });

//   it('处理页码更改', () => {
//     wrapper.vm.handleCurrentChange(2);
//     expect(wrapper.vm.currentPage).to.equal(2);
//   });
// });
