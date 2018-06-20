// import moxios from 'moxios';
// import { createWrapper } from '../../../utils.js';
// import { axiosInstance } from '../../../../src/api/index.js';
// import ClusterForm from '../../../../src/views/maintenances/ClusterForm.vue';

// axiosInstance.defaults.baseURL = undefined;

// describe('ClusterForm.vue', () => {
//   let wrapper = null;

//   beforeEach(() => {
//     moxios.install(axiosInstance);
//     const propsData = {
//       model: {
//         name: 'tes',
//         clusterProxy: {
//           componentId: 'cluster',
//           componentVersion: '1.0.0',
//           displayName: '集群代理服务-10.33.40.241-#1',
//           serviceNodes: [
//             {
//               nodeAddress: [
//                 {
//                   ip: '10.33.40.241',
//                   key: 'webPort',
//                   name: '',
//                   netProtocol: 'http',
//                   port: 80,
//                   webPort: false,
//                 },
//                 {
//                   ip: '10.33.40.241',
//                   key: 'webPorts',
//                   name: '',
//                   netProtocol: 'https',
//                   port: 443,
//                   webPort: false,
//                 },
//                 {
//                   ip: '10.33.40.241',
//                   key: 'internalPort',
//                   name: '',
//                   netProtocol: 'http',
//                   port: 9999,
//                   webPort: false,
//                 },
//               ],
//               nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//               nodeComponentId: 'cluster',
//               nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//               nodeType: 'proxy',
//               status: 'abnormal',
//             },
//           ],
//           serviceType: 'proxy',
//           nodeAddress: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'internalPort',
//               name: '',
//               netProtocol: 'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//           nodeType: 'proxy',
//           status: 'abnormal',
//         },
//         protocol: 'http',
//         httpPort: '80',
//         httpsPort: '不选择',
//         address: {
//           ip: '10.33.40.241',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//         path: '/fdgh',
//         loadStrategy: 'polling',
//         choosedNodes: [
//           'b2191830-9b34-40e8-83d4-8c86cad30edb',
//         ],
//         servicePort: {
//           ip: '10.33.40.241',
//           key: 'rtspPort',
//           name: '',
//           netProtocol: 'tcp',
//           port: 6304,
//           webPort: false,
//         },
//         serviceType: {
//           componentId: 'vod',
//           componentVersion: '5.0.0',
//           instances: [
//             {
//               addresses: [
//                 {
//                   ip: '10.33.40.241',
//                   key: 'rtspPort',
//                   name: '',
//                   netProtocol: 'tcp',
//                   port: 6304,
//                   webPort: false,
//                 },
//               ],
//               id: 'b2191830-9b34-40e8-83d4-8c86cad30edb',
//               joined: true,
//               name: '视频点播服务-10.33.40.241-#1',
//               serviceNodeType: 'vod',
//               weight: 0,
//             },
//           ],
//           name: '视频点播服务-10.33.40.241-#1',
//           serviceType: 'vod',
//         },
//         clusterCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//         clusterId: 'cluster1',
//         createTime: '2018-01-29T16:31:54.115+08:00',
//         internalPort: 9999,
//         ip: '10.33.40.241',
//         nodesNumber: 1,
//         port: 80,
//         proxyId: '',
//         serviceComponentId: 'vod',
//         state: 'normal',
//         nameMore: '10.33.40.241:80',
//       },
//       mode: 'edit',
//       proxies: [
//         {
//           componentId: 'cluster',
//           componentVersion: '1.0.0',
//           displayName: '集群代理服务-10.33.40.241-#1',
//           serviceNodes: [
//             {
//               nodeAddress: [
//                 {
//                   ip: '10.33.40.241',
//                   key: 'webPort',
//                   name: '',
//                   netProtocol: 'http',
//                   port: 80,
//                   webPort: false,
//                 },
//                 {
//                   ip: '10.33.40.241',
//                   key: 'webPorts',
//                   name: '',
//                   netProtocol: 'https',
//                   port: 443,
//                   webPort: false,
//                 },
//                 {
//                   ip: '10.33.40.241',
//                   key: 'internalPort',
//                   name: '',
//                   netProtocol: 'http',
//                   port: 9999,
//                   webPort: false,
//                 },
//               ],
//               nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//               nodeComponentId: 'cluster',
//               nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//               nodeType: 'proxy',
//               status: 'abnormal',
//             },
//           ],
//           serviceType: 'proxy',
//           nodeAddress: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'internalPort',
//               name: '',
//               netProtocol: 'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//           nodeType: 'proxy',
//           status: 'abnormal',
//         },
//       ],
//     };
//     wrapper = createWrapper(ClusterForm, { propsData });
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
//   it('处理代理切换', (done) => {
//     const proxy = {
//       componentId: 'cluster',
//       componentVersion: '1.0.0',
//       displayName: '集群代理服务-10.33.40.241-#1',
//       serviceNodes: [
//         {
//           nodeAddress: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'internalPort',
//               name: '',
//               netProtocol: 'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//           nodeType: 'proxy',
//           status: 'normal',
//         },
//       ],
//       serviceType: 'proxy',
//       nodeAddress: [
//         {
//           ip: '10.33.40.241',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'webPorts',
//           name: '',
//           netProtocol: 'https',
//           port: 443,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'internalPort',
//           name: '',
//           netProtocol: 'http',
//           port: 9999,
//           webPort: false,
//         },
//       ],
//       nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//       nodeComponentId: 'cluster',
//       nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//       nodeType: 'proxy',
//       status: 'normal',
//     };
//     moxios.stubOnce('GET',
// '/clusters/proxies/c6f30459-5fc4-42c1-8d79-5e184b71fd85/services?filter=&protocol=http', {
//       status: 200,
//       response: {
//         code: '0',
//         msg: '',
//         data: null,
//       },
//     });
//     wrapper.vm.handleProxyChange(proxy);
//     expect(wrapper.vm.showPort).to.equal(true);
//     done();
//   });

//   it('请求代理切换后的数据(add)', (done) => {
//     const proxy = {
//       componentId: 'cluster',
//       componentVersion: '1.0.0',
//       displayName: '集群代理服务-10.33.40.241-#1',
//       serviceNodes: [
//         {
//           nodeAddress: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'internalPort',
//               name: '',
//               netProtocol: 'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//           nodeType: 'proxy',
//           status: 'normal',
//         },
//       ],
//       serviceType: 'proxy',
//       nodeAddress: [
//         {
//           ip: '10.33.40.241',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'webPorts',
//           name: '',
//           netProtocol: 'https',
//           port: 443,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'internalPort',
//           name: '',
//           netProtocol: 'http',
//           port: 9999,
//           webPort: false,
//         },
//       ],
//       nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//       nodeComponentId: 'cluster',
//       nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//       nodeType: 'proxy',
//       status: 'normal',
//     };
//     wrapper.vm.currentProxy = proxy;
//     wrapper.vm.mode = 'add';
//     wrapper.vm.fetchProxyService('http');
//     const proxyAddresses = [
//       {
//         ip: '10.33.40.241',
//         key: 'webPort',
//         name: '',
//         netProtocol: 'http',
//         port: 80,
//         webPort: false,
//       },
//       {
//         ip: '10.33.40.241',
//         key: 'webPorts',
//         name: '',
//         netProtocol: 'https',
//         port: 443,
//         webPort: false,
//       },
//     ];
//     expect(wrapper.vm.proxyAddresses).to.eql(proxyAddresses);
//     done();
//   });

//   it('请求代理切换后的数据(edit)', (done) => {
//     const proxy = {
//       componentId: 'cluster',
//       componentVersion: '1.0.0',
//       displayName: '集群代理服务-10.33.40.241-#1',
//       serviceNodes: [
//         {
//           nodeAddress: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 80,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'webPorts',
//               name: '',
//               netProtocol: 'https',
//               port: 443,
//               webPort: false,
//             },
//             {
//               ip: '10.33.40.241',
//               key: 'internalPort',
//               name: '',
//               netProtocol: 'http',
//               port: 9999,
//               webPort: false,
//             },
//           ],
//           nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//           nodeComponentId: 'cluster',
//           nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//           nodeType: 'proxy',
//           status: 'normal',
//         },
//       ],
//       serviceType: 'proxy',
//       nodeAddress: [
//         {
//           ip: '10.33.40.241',
//           key: 'webPort',
//           name: '',
//           netProtocol: 'http',
//           port: 80,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'webPorts',
//           name: '',
//           netProtocol: 'https',
//           port: 443,
//           webPort: false,
//         },
//         {
//           ip: '10.33.40.241',
//           key: 'internalPort',
//           name: '',
//           netProtocol: 'http',
//           port: 9999,
//           webPort: false,
//         },
//       ],
//       nodeCode: 'c6f30459-5fc4-42c1-8d79-5e184b71fd85',
//       nodeComponentId: 'cluster',
//       nodeDisplayName: '集群代理服务-10.33.40.241-#1',
//       nodeType: 'proxy',
//       status: 'normal',
//     };
//     wrapper.vm.currentProxy = proxy;
//     wrapper.vm.fetchProxyService('http');
//     const proxyAddresses = [
//       {
//         ip: '10.33.40.241',
//         key: 'webPort',
//         name: '',
//         netProtocol: 'http',
//         port: 80,
//         webPort: false,
//       },
//       {
//         ip: '10.33.40.241',
//         key: 'webPorts',
//         name: '',
//         netProtocol: 'https',
//         port: 443,
//         webPort: false,
//       },
//     ];
//     expect(wrapper.vm.proxyAddresses).to.eql(proxyAddresses);
//     done();
//   });

//   it('处理服务切换', (done) => {
//     const service = {
//       componentId: 'portal',
//       componentVersion: '1.0.0',
//       instances: [
//         {
//           addresses: [
//             {
//               ip: '10.33.40.241',
//               key: 'webPort',
//               name: '',
//               netProtocol: 'http',
//               port: 8082,
//               webPort: false,
//             },
//           ],
//           id: 'e49c48c4-faa5-4248-a61c-b5c438341709',
//           joined: false,
//           name: '门户-10.33.40.241-#1',
//           serviceNodeType: 'portal',
//           weight: 0,
//         },
//       ],
//       name: '门户-10.33.40.241-#1',
//       serviceType: 'portal',
//     };
//     const ports = [{
//       ip: '10.33.40.241',
//       key: 'webPort',
//       name: '',
//       netProtocol: 'http',
//       port: 8082,
//       webPort: false,
//     }];
//     wrapper.vm.handleServiceTypeChange(service);
//     expect(wrapper.vm.servicePorts).to.eql(ports);
//     done();
//   });

//   it('获取代理的服务', (done) => {
//     const id = '';
//     const type = 'creatable';
//     wrapper.vm.getProxyService(id, type, 'http');
//     const data = {
//       services: [
//         {
//           componentId: 'liguopeng',
//           componentVersion: '1.0.0',
//           instances: [
//             {
//               addresses: [
//                 {
//                   ip: '1.5.9.6',
//                   key: 'httpport',
//                   name: '',
//                   netProtocol: 'https',
//                   port: 9234,
//                   webPort: false,
//                 },
//               ],
//               id: '6707004a-345b-415b-a9fd-2d69bdfdaff9',
//               joined: false,
//               name: 'asdf',
//               serviceNodeType: 'demosvr',
//               weight: 0,
//             },
//             {
//               addresses: [
//                 {
//                   ip: '10.20.147.72',
//                   key: 'httpport',
//                   name: '',
//                   netProtocol: 'https',
//                   port: 9234,
//                   webPort: false,
//                 },
//               ],
//               id: '0b2a8d98-98ce-4094-9c14-eec12c128321',
//               joined: false,
//               name: '[demosvr]-10.20.147.72-#1',
//               serviceNodeType: 'demosvr',
//               weight: 0,
//             },
//           ],
//           name: '[demosvr]-10.20.147.72-#1',
//           serviceType: 'demosvr',
//         },
//         {
//           componentId: 'liguopeng',
//           componentVersion: '1.0.0',
//           instances: [
//             {
//               addresses: [
//                 {
//                   ip: '10.20.147.72',
//                   key: 'webPort',
//                   name: '',
//                   netProtocol: 'http',
//                   port: 8080,
//                   webPort: false,
//                 },
//               ],
//               id: '6baae9b7-a8ff-46af-9468-03b723104ef4',
//               joined: false,
//               name: '[demowebapp]-10.20.147.72-#1',
//               serviceNodeType: 'demowebapp',
//               weight: 0,
//             },
//           ],
//           name: '[demowebapp]-10.20.147.72-#1',
//           serviceType: 'demowebapp',
//         },
//       ],
//     };
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           code: '0',
//           msg: '',
//           data,
//         },
//       }).then((json) => {
//         expect(wrapper.vm.serviceTypes).to.eql(json.data);
//         if (wrapper.vm.mode === 'edit') {
//           const serviceTypes = wrapper.vm.serviceTypes.find(
//             ({ serviceType }) => this.model.serviceType === serviceType,
//           );
//           expect(wrapper.vm.model.serviceType).to.eql(serviceTypes);
//         }
//         done();
//       }).catch(() => {
//         done();
//       });
//     });
//   });
//   it('获取代理的服务失败', (done) => {
//     const id = '';
//     const type = 'creatable';
//     wrapper.vm.getProxyService(id, type, 'http');
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           code: '011',
//           msg: '',
//         },
//       }).then(() => done()).catch(() => {
//         done();
//       });
//     });
//   });
//   it('获取代理的服务后端返回失败', (done) => {
//     const id = '';
//     const type = 'creatable';
//     wrapper.vm.getProxyService(id, type, 'http');
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 500,
//       }).then(() => done()).catch(() => {
//         done();
//       });
//     });
//   });
//   it('切换radio', (done) => {
//     wrapper.vm.radioChange('noCheck');
//     wrapper.vm.radioChange('不选择');
//     done();
//   });
// });
