// import moxios from 'moxios';
// import { createWrapper } from '../../../utils.js';
// import { axiosInstance } from '../../../../src/api/index.js';
// import Cluster from '../../../../src/views/maintenances/Cluster.vue';

// axiosInstance.defaults.baseURL = undefined;

// describe('Cluster.vue', () => {
//   let wrapper = null;

//   beforeEach(() => {
//     moxios.install(axiosInstance);
//     wrapper = createWrapper(Cluster);
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

//   it('cluster组件创建', (done) => {
//     wrapper.vm.init();
//     expect(wrapper.vm.clusterForm).to.equal(wrapper.vm.formData);
//     wrapper.vm.getProxyList();
//     const data = [
//       {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.20.147.73-#1',
//         serviceNodes:
//              [
//                {
//                  nodeAddress:
//                   [
//                     {
//                       ip: '10.20.147.73',
//                       key: 'webPort',
//                       name: '',
//                       netProtocol: 'http',
//                       port: 80,
//                       webPort: false,
//                     },
//                     {
//                       ip: '10.20.147.73',
//                       key: 'webPorts',
//                       name: '',
//                       netProtocol: 'https',
//                       port: 443,
//                       webPort: false,
//                     },
//                     {
//                       ip: '10.20.147.73',
//                       key: 'internalPort',
//                       name: '',
//                       netProtocol:
//                            'http',
//                       port: 9999,
//                       webPort: false,
//                     },
//                   ],
//                  nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//                  nodeComponentId: 'cluster',
//                  nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//                  nodeType: 'proxy',
//                  status: 'normal',
//                },
//              ],
//         serviceType: 'proxy',
//       },
//     ];
//     moxios.stubOnce('GET', '/clusters/proxies', {
//       status: 200,
//       response: {
//         code: '0',
//         data,
//         msg: 'success',
//       },
//     });
//     moxios.wait(() => {
//       const proxies = [
//         {
//           componentId: 'cluster',
//           componentVersion: '1.0.0',
//           displayName: '集群代理服务-10.20.147.73-#1',
//           nodeAddress: [
//             {
//               ip: '10.20.147.73',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.20.147.73',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.20.147.73',
//               key: 'internalPort',
//               name: '',
//               netProtocol:
//                      'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//           nodeType: 'proxy',
//           status: 'normal',
//           serviceNodes:
//                [
//                  {
//                    nodeAddress:
//                     [
//                       {
//                         ip: '10.20.147.73',
//                         key: 'webPort',
//                         name: '',
//                         netProtocol: 'http',
//                         port: 80,
//                         webPort: false,
//                       },
//                       {
//                         ip: '10.20.147.73',
//                         key: 'webPorts',
//                         name: '',
//                         netProtocol: 'https',
//                         port: 443,
//                         webPort: false,
//                       },
//                       {
//                         ip: '10.20.147.73',
//                         key: 'internalPort',
//                         name: '',
//                         netProtocol:
//                              'http',
//                         port: 9999,
//                         webPort: false,
//                       },
//                     ],
//                    nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//                    nodeComponentId: 'cluster',
//                    nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//                    nodeType: 'proxy',
//                    status: 'normal',
//                  },
//                ],
//           serviceType: 'proxy',
//         },
//       ];
//       expect(wrapper.vm.proxiesList).to.equal(data);
//       expect(wrapper.vm.proxies).to.eql(proxies);
//       wrapper.vm.getClusterList();
//       const data2 = {
//         clusters: [
//           {
//             address: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               }, {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             clusterCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//             clusterId: 'cluster1',
//             createTime: '2018-01-26T13:55:56.135+08:00',
//             internalPort: 9999,
//             ip: '10.20.147.73',
//             loadStrategy: 'polling',
//             name: 'aaa',
//             nodesNumber: 1,
//             path: '/test',
//             port: 443,
//             protocol: 'https',
//             proxyId: '',
//             serviceComponentId: 'portal',
//             serviceType: 'portal',
//             state: 'normal',
//           },
//         ],
//       };
//       moxios.stubOnce('GET', '/clusters', {
//         status: 200,
//         response: {
//           code: '0',
//           data: data2,
//           msg: 'success',
//         },
//       });
//       moxios.wait(() => {
//         const result = data2.clusters.map(cluster => Object.assign(
//           {},
//           cluster,
//           { nameMore: '10.20.147.73:443' },
//         ));
//         wrapper.vm.clusterList = result;
//         expect(wrapper.vm.clusterList).to.eql(result);
//         done();
//       });
//     });
//   });

//   it('取消集群操作', () => {
//     wrapper.vm.cancel('createVisible');
//     wrapper.vm.cancel('editVisible');
//     expect(wrapper.vm.createVisible).to.equal(false);
//     expect(wrapper.vm.editVisible).to.equal(false);
//   });

//   it('负载均衡策略', () => {
//     expect(wrapper.vm.getLoadStrategy('polling')).to.equal(wrapper.vm.$t('polling'));
//     expect(wrapper.vm.getLoadStrategy('ipHash')).to.equal(wrapper.vm.$t('ipHash'));
//     expect(wrapper.vm.getLoadStrategy('urlHash')).to.equal(wrapper.vm.$t('urlHash'));
//   });

//   it('获取集群状态', () => {
//     expect(wrapper.vm.getClusterState('abnormal')).to.equal(wrapper.vm.$t('abnormal'));
//     expect(wrapper.vm.getClusterState('')).to.equal(wrapper.vm.$t('abnormal'));
//     expect(wrapper.vm.getClusterState('normal')).to.equal(wrapper.vm.$t('normal'));
//   });

//   it('打开集群编辑', () => {
//     const cluster = {
//       address: [
//         {
//           ip: '10.20.147.73',
//           key: 'webPorts',
//           name: '',
//           netProtocol: 'https',
//           port: 443,
//           webPort: false,
//         },
//         {
//           ip: '10.20.147.73',
//           key: 'internalPort',
//           name: '',
//           netProtocol: 'http',
//           port: 9999,
//           webPort: false,
//         },
//       ],
//       clusterCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//       clusterId: 'cluster1',
//       createTime: '2018-01-26T13:55:56.135+08:00',
//       internalPort: 9999,
//       ip: '10.20.147.73',
//       loadStrategy: 'polling',
//       name: 'aaa',
//       nodesNumber: 1,
//       path: '/test',
//       port: 443,
//       protocol: 'https',
//       proxyId: '',
//       serviceComponentId: 'portal',
//       serviceType: 'portal',
//       state: 'normal',
//       nameMore: '10.20.147.73:443',
//     };
//     wrapper.vm.proxies = [
//       {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.20.147.73-#1',
//         serviceNodes: [
//           {
//             nodeAddress: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 80,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//         ],
//         serviceType: 'proxy',
//         nodeAddress: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         nodeComponentId: 'cluster',
//         nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//         nodeType: 'proxy',
//         status: 'normal',
//       },
//     ];
//     wrapper.vm.openEditForm(cluster);
//     expect(wrapper.vm.editVisible).to.equal(true);
//   });

//   it('打开新建集群', () => {
//     // 100个的情况
//     wrapper.vm.clusterList.length = 100;
//     wrapper.vm.openAddForm();
//     wrapper.vm.clusterList = [
//       {
//         address: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         clusterCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         clusterId: 'cluster1',
//         createTime: '2018-01-26T15:52:43.206+08:00',
//         internalPort: 9999,
//         ip: '10.20.147.73',
//         loadStrategy: 'ipHash',
//         name: 'aaa',
//         nodesNumber: 1,
//         path: '/sdfg',
//         port: 443,
//         protocol: 'https',
//         proxyId: '',
//         serviceComponentId: 'portal',
//         serviceType: 'portal',
//         state: 'normal',
//         nameMore: '10.20.147.73:443',
//       },
//     ];
//     wrapper.vm.proxies = [
//       {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.20.147.73-#1',
//         serviceNodes: [
//           {
//             nodeAddress: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 80,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//         ],
//         serviceType: 'proxy',
//         nodeAddress: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         nodeComponentId: 'cluster',
//         nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//         nodeType: 'proxy',
//         status: 'normal',
//       },
//     ];
//     const formData = {
//       name: '',
//       clusterProxy: null,
//       protocol: '',
//       httpPort: '',
//       httpsPort: '',
//       address: null, // 集群端口
//       path: '',
//       loadStrategy: '',
//       choosedNodes: [],
//       servicePort: null, // 服务端口
//       serviceType: null,
//     };
//     wrapper.vm.openAddForm();
//     wrapper.vm.addForm = JSON.parse(JSON.stringify(formData));
//     expect(wrapper.vm.createVisible).to.equal(true);
//   });

//   it('删除集群', (done) => {
//     wrapper.vm.selected = [];
//     wrapper.vm.deleteCluster();
//     wrapper.vm.selected = [
//       {
//         address: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         clusterCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         clusterId: 'cluster1',
//         createTime: '2018-01-26T13:55:56.135+08:00',
//         internalPort: 9999,
//         ip: '10.20.147.73',
//         loadStrategy: 'polling',
//         name: 'aaa',
//         nodesNumber: 1,
//         path: '/test',
//         port: 443,
//         protocol: 'https',
//         proxyId: '',
//         serviceComponentId: 'portal',
//         serviceType: 'portal',
//         state: 'normal',
//         nameMore: '10.20.147.73:443',
//       },
//     ];
//     wrapper.vm.deleteCluster();

//     const deleteList = wrapper.vm.selected.map(item => item.clusterId);
//     expect(deleteList).to.eql(['cluster1']);
//     wrapper.vm.deleteCluster();
//     const path = '/clusters?clusterId=cluster1';
//     const data = null;
//     moxios.stubOnce('GET', path, {
//       status: 200,
//       response: {
//         code: '0',
//         data,
//         msg: 'success',
//       },
//     });
//     moxios.wait(() => {
//     });

//     done();
//   });

//   it('获取rowkey', (done) => {
//     const row = {
//       clusterId: 1,
//     };
//     expect(wrapper.vm.rowKey(row)).to.equal(1);
//     done();
//   });

//   it('打开集群证书管理', (done) => {
//     wrapper.vm.proxies = [
//       {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.20.147.73-#1',
//         serviceNodes: [
//           {
//             nodeAddress: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 80,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//         ],
//         serviceType: 'proxy',
//         nodeAddress: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         nodeComponentId: 'cluster',
//         nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//         nodeType: 'proxy',
//         status: 'normal',
//       },
//     ];
//     wrapper.vm.openClusterProxiesManage();
//     expect(wrapper.vm.proxiesManage).to.equal(true);
//     expect(wrapper.vm.clusterShow).to.equal(false);
//     done();
//   });

//   it('取消集群证书管理', (done) => {
//     wrapper.vm.cancelProxies();
//     expect(wrapper.vm.proxiesManage).to.equal(false);
//     expect(wrapper.vm.clusterShow).to.equal(true);
//     done();
//   });

//   it('处理表单提交', (done) => {
//     const clusterForm = {
//       name: 'aaa',
//       clusterProxy: {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.20.147.73-#1',
//         serviceNodes: [
//           {
//             nodeAddress: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 80,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//         ],
//         serviceType: 'proxy',
//         nodeAddress: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         nodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         nodeComponentId: 'cluster',
//         nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//         nodeType: 'proxy',
//         status: 'normal',
//       },
//       protocol: 'https',
//       httpPort: '80',
//       httpsPort: '不选择',
//       address: {
//         ip: '10.20.147.73',
//         key: 'webPorts',
//         name: '',
//         netProtocol: 'https',
//         port: 443,
//         webPort: false,
//       },
//       path: '/sdfg',
//       loadStrategy: 'urlHash',
//       choosedNodes: [
//         'bfb17b02-8221-4c7d-9f48-da26c946f14c',
//       ],
//       servicePort: {
//         ip: '10.20.147.73',
//         key: 'webPort',
//         name: '',
//         netProtocol: 'http',
//         port: 8082,
//         webPort: false,
//       },
//       serviceType: {
//         componentId: 'portal',
//         componentVersion: '1.0.0',
//         instances: [
//           {
//             addresses: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 8082,
//                 webPort: false,
//               },
//             ],
//             id: 'bfb17b02-8221-4c7d-9f48-da26c946f14c',
//             joined: true,
//             name: '门户-10.20.147.73-#1',
//             serviceNodeType: 'portal',
//             weight: 0,
//           },
//         ],
//         name: '门户-10.20.147.73-#1',
//         serviceType: 'portal',
//       },
//       clusterCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//       clusterId: 'cluster1',
//       createTime: '2018-01-26T15:52:43.206+08:00',
//       internalPort: 9999,
//       ip: '10.20.147.73',
//       nodesNumber: 1,
//       port: 443,
//       proxyId: '',
//       serviceComponentId: 'portal',
//       state: 'normal',
//       nameMore: '10.20.147.73:443',
//     };
//     const cluster = {
//       clusterName: 'aaa',
//       clusterComponentId: 'cluster',
//       clusterComponentVersion: '1.0.0',
//       serviceType: 'proxy',
//       proxyNodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//       lbStrategy: 'urlHash',
//       path: '/sdfg',
//       address: [
//         {
//           ip: '10.20.147.73',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//       ],
//     };
//     const service = {
//       componentId: 'portal',
//       componentVersion: '1.0.0',
//       serviceNodeDisplayName: '门户-10.20.147.73-#1',
//       serviceType: 'portal',
//       serviceNodeType: 'portal',
//       portType: 'webPort',
//       serviceNodeCodes: [
//         {
//           id: 'bfb17b02-8221-4c7d-9f48-da26c946f14c',
//           ip: '10.20.147.73',
//           port: 8082,
//           weight: 1,
//         },
//       ],
//     };
//     const { componentId, nodeCode, componentVersion, nodeType, serviceNodes }
//         = clusterForm.clusterProxy;
//     const serviceNodeCodes = clusterForm.choosedNodes.map(item =>
//       clusterForm.serviceType.instances.find(({ id }) => id === item))
//       .map(({ addresses, id }) => ({
//         id,
//         ip: addresses[0].ip,
//         port: addresses[0].port,
//         weight: 1,
//       }));
//     const portsArr = [clusterForm.httpPort, clusterForm.httpsPort];
//     const addressTemp = [];
//     serviceNodes[0].nodeAddress.forEach((item) => {
//       if (portsArr.indexOf(`${item.port}`) >= 0) {
//         addressTemp.push(item);
//       }
//     });
//     const cluster1 = {
//       clusterName: clusterForm.name,
//       clusterComponentId: componentId,
//       clusterComponentVersion: componentVersion,
//       serviceType: nodeType,
//       proxyNodeCode: nodeCode,
//       lbStrategy: clusterForm.loadStrategy,
//       path: clusterForm.path,
//       address: addressTemp,
//     };
//     const service1 = {
//       componentId: clusterForm.serviceType.componentId,
//       componentVersion: clusterForm.serviceType.componentVersion,
//       serviceNodeDisplayName: clusterForm.serviceType.name,
//       serviceType: clusterForm.serviceType.serviceType,
//       serviceNodeType: clusterForm.serviceType.serviceType,
//       portType: clusterForm.servicePort.key,
//       serviceNodeCodes,
//     };
//     expect(cluster1).to.eql(cluster);
//     expect(service).to.eql(service1);
//     done();
//   });

//   it('执行添加集群请求', (done) => {
//     const nodeCode = '1db62f0f-112e-4d14-a850-816e9eff1b36';
//     const address = 'http://10.20.147.73:9999';
//     const cluster = {
//       cluster: {
//         clusterName: 'aaa',
//         clusterComponentId: 'cluster',
//         clusterComponentVersion: '1.0.0',
//         serviceType: 'proxy',
//         proxyNodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         lbStrategy: 'ipHash',
//         path: '/sdfg',
//         address: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//         ],
//       },
//       service: {
//         componentId: 'portal',
//         componentVersion: '1.0.0',
//         serviceNodeDisplayName: '门户-10.20.147.73-#1',
//         serviceType: 'portal',
//         serviceNodeType: 'portal',
//         portType: 'webPort',
//         serviceNodeCodes: [
//           {
//             id: 'bfb17b02-8221-4c7d-9f48-da26c946f14c',
//             ip: '10.20.147.73',
//             port: 8082,
//             weight: 1,
//           },
//         ],
//       },
//     };
//     wrapper.vm.addCluster(nodeCode, address, cluster);
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
//         expect(wrapper.vm.createVisible).to.equal(false);
//         done();
//       }).catch(() => {

//       });
//     });
//     // moxios.wait(() => {
//     //   expect(wrapper.vm.createVisible).to.equal(false);
//     //   expect(wrapper.vm.activeName).to.equal(cluster.clusterId);
//     // });
//   });

//   it('执行添加集群请求返回错误', (done) => {
//     const nodeCode = '1db62f0f-112e-4d14-a850-816e9eff1b36';
//     const address = 'http://10.20.147.73:9999';
//     const cluster = {
//       cluster: {
//         clusterName: 'aaa',
//         clusterComponentId: 'cluster',
//         clusterComponentVersion: '1.0.0',
//         serviceType: 'proxy',
//         proxyNodeCode: '1db62f0f-112e-4d14-a850-816e9eff1b36',
//         lbStrategy: 'ipHash',
//         path: '/sdfg',
//         address: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//         ],
//       },
//       service: {
//         componentId: 'portal',
//         componentVersion: '1.0.0',
//         serviceNodeDisplayName: '门户-10.20.147.73-#1',
//         serviceType: 'portal',
//         serviceNodeType: 'portal',
//         portType: 'webPort',
//         serviceNodeCodes: [
//           {
//             id: 'bfb17b02-8221-4c7d-9f48-da26c946f14c',
//             ip: '10.20.147.73',
//             port: 8082,
//             weight: 1,
//           },
//         ],
//       },
//     };
//     wrapper.vm.addCluster(nodeCode, address, cluster);
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
//     // moxios.wait(() => {
//     //   expect(wrapper.vm.createVisible).to.equal(false);
//     //   expect(wrapper.vm.activeName).to.equal(cluster.clusterId);
//     // });
//   });

//   it('执行编辑集群请求', (done) => {
//     wrapper.vm.editCluster();
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
//         expect(wrapper.vm.editVisible).to.equal(false);
//         done();
//       }).catch(() => {
//         done();
//       });
//     });
//   });

//   it('执行编辑集群请求返回失败', (done) => {
//     wrapper.vm.editCluster();
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

//   it('处理表单数据', (done) => {
//     const clusterForm = {
//       name: 'asdfasdf',
//       clusterProxy: {
//         componentId: 'cluster',
//         componentVersion: '1.0.0',
//         displayName: '集群代理服务-10.19.137.129-#1',
//         serviceNodes: [
//           {
//             nodeAddress: [
//               {
//                 ip: '10.19.137.129',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 88,
//                 webPort: false,
//               },
//               {
//                 ip: '10.19.137.129',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.19.137.129',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9998,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.75.1',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 88,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.75.1',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.75.1',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9998,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.132.1',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 88,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.132.1',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '192.168.132.1',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9998,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '24bc83f0-038a-4fa2-8d0d-06bec62e53be',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.19.137.129-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//           {
//             nodeAddress: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 80,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPorts',
//                 name: '',
//                 netProtocol: 'https',
//                 port: 443,
//                 webPort: false,
//               },
//               {
//                 ip: '10.20.147.73',
//                 key: 'internalPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 9999,
//                 webPort: false,
//               },
//             ],
//             nodeCode: '20e1ca52-5de5-43bf-9985-ff255c5e5ad5',
//             nodeComponentId: 'cluster',
//             nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//             nodeType: 'proxy',
//             status: 'normal',
//           },
//         ],
//         serviceType: 'proxy',
//         nodeAddress: [
//           {
//             ip: '10.20.147.73',
//             key: 'webPort',
//             name: '',
//             netProtocol: 'http',
//             port: 80,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'webPorts',
//             name: '',
//             netProtocol: 'https',
//             port: 443,
//             webPort: false,
//           },
//           {
//             ip: '10.20.147.73',
//             key: 'internalPort',
//             name: '',
//             netProtocol: 'http',
//             port: 9999,
//             webPort: false,
//           },
//         ],
//         nodeCode: '20e1ca52-5de5-43bf-9985-ff255c5e5ad5',
//         nodeComponentId: 'cluster',
//         nodeDisplayName: '集群代理服务-10.20.147.73-#1',
//         nodeType: 'proxy',
//         status: 'normal',
//       },
//       protocol: '',
//       httpPort: '80',
//       httpsPort: '不选择',
//       address: null,
//       path: '/dfgasd',
//       loadStrategy: 'ipHash',
//       choosedNodes: [
//         'ceb407c0-7c26-4454-b563-9b77e3665a09',
//       ],
//       servicePort: {
//         ip: '10.20.147.73',
//         key: 'webPort',
//         name: '',
//         netProtocol: 'http',
//         port: 8082,
//         webPort: false,
//       },
//       serviceType: {
//         componentId: 'portal',
//         componentVersion: '1.0.0',
//         instances: [
//           {
//             addresses: [
//               {
//                 ip: '10.20.147.73',
//                 key: 'webPort',
//                 name: '',
//                 netProtocol: 'http',
//                 port: 8082,
//                 webPort: false,
//               },
//             ],
//             id: 'ceb407c0-7c26-4454-b563-9b77e3665a09',
//             joined: false,
//             name: '门户-10.20.147.73-#1',
//             serviceNodeType: 'portal',
//             weight: 0,
//           },
//         ],
//         name: '门户-10.20.147.73-#1',
//         serviceType: 'portal',
//       },
//     };
//     const clusterResult = {
//       clusterName: 'asdfasdf',
//       clusterComponentId: 'cluster',
//       clusterComponentVersion: '1.0.0',
//       serviceType: 'proxy',
//       proxyNodeCode: '20e1ca52-5de5-43bf-9985-ff255c5e5ad5',
//       lbStrategy: 'ipHash',
//       path: '/dfgasd',
//       address: [],
//     };
//     const serviceResult = {
//       componentId: 'portal',
//       componentVersion: '1.0.0',
//       serviceNodeDisplayName: '门户-10.20.147.73-#1',
//       serviceType: 'portal',
//       serviceNodeType: 'portal',
//       portType: 'webPort',
//       serviceNodeCodes: [
//         {
//           id: 'ceb407c0-7c26-4454-b563-9b77e3665a09',
//           ip: '10.20.147.73',
//           port: 8082,
//           weight: 1,
//         },
//       ],
//     };
//     const { cluster, service } = wrapper.vm.handleData(clusterForm);
//     expect(cluster).to.eql(clusterResult);
//     expect(service).to.eql(serviceResult);
//     done();
//   });
// });
