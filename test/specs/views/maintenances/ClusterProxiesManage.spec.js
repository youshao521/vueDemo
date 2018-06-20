// import moxios from 'moxios';
// import { createWrapper } from '../../../utils.js';
// import { axiosInstance } from '../../../../src/api/index.js';
// import ClusterProxiesManage from '../../../../src/views/maintenances/ClusterProxiesManage.vue';

// axiosInstance.defaults.baseURL = undefined;

// describe('ClusterProxiesManage.vue', () => {
//   let wrapper = null;

//   beforeEach(() => {
//     moxios.install(axiosInstance);
//     const propsData = {
//       model: {
//         name: '',
//         clusterProxy: null,
//         protocol: '',
//         address: null,
//         path: '',
//         loadStrategy: '',
//         choosedNodes: [],
//         servicePort: null,
//         serviceType: null,
//       },
//       proxiesList: [
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
//     wrapper = createWrapper(ClusterProxiesManage, { propsData });
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
//     moxios.uninstall();
//   });

//   it('获取地址数组', (done) => {
//     const proxyAddress = '10.33.40.241:443';
//     const address = [
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
//       {
//         ip: '10.33.40.241',
//         key: 'internalPort',
//         name: '',
//         netProtocol: 'http',
//         port: 9999,
//         webPort: false,
//       },
//     ];
//     expect(wrapper.vm.getAddress(address)).to.eql(proxyAddress);
//     done();
//   });

//   it('crt文件上传之前校验(不是crt文件)', (done) => {
//     const file = {
//       lastModified: 1515585946625,
//       lastModifiedDate: 'Wed Jan 10 2018 20:05:46 GMT+0800 (中国标准时间)',
//       name: 'asdfas.aaaaa',
//       size: 0,
//       type: 'application/x-x509-ca-cert',
//       uid: 1517217760613,
//       webkitRelativePath: '',
//     };
//     wrapper.vm.notCrt = false;
//     wrapper.vm.beforeCertificateUpload(file);
//     wrapper.vm.isNotCrt();
//     done();
//   });

//   it('crt文件上传之前校验(不是文件)', (done) => {
//     const file = false;
//     wrapper.vm.notCrt = false;
//     wrapper.vm.beforeCertificateUpload(file);
//     wrapper.vm.isNotCrt();
//     done();
//   });

//   it('crt文件上传之前校验(是crt文件)', (done) => {
//     const file = {
//       lastModified: 1515585946625,
//       lastModifiedDate: 'Wed Jan 10 2018 20:05:46 GMT+0800 (中国标准时间)',
//       name: 'namesdf.crt',
//       size: 0,
//       type: 'application/x-x509-ca-cert',
//       uid: 1517217760613,
//       webkitRelativePath: '',
//     };
//     wrapper.vm.notCrt = false;
//     wrapper.vm.beforeCertificateUpload(file);
//     wrapper.vm.isCrt(file);
//     done();
//   });

//   it('key文件上传之前校验(不是key文件)', (done) => {
//     const file = {
//       lastModified: 1515677341332,
//       lastModifiedDate: 'Thu Jan 11 2018 21:29:01 GMT+0800 (中国标准时间) {}',
//       name: 'ssl.aaa',
//       size: 0,
//       type: '',
//       uid: 1517217945062,
//       webkitRelativePath: '',
//     };
//     wrapper.vm.notKey = false;
//     wrapper.vm.beforeKeyUpload(file);
//     wrapper.vm.isNotKey();
//     done();
//   });

//   it('key文件上传之前校验(不是文件)', (done) => {
//     const file = false;
//     wrapper.vm.notKey = false;
//     wrapper.vm.beforeKeyUpload(file);
//     wrapper.vm.isNotKey();
//     done();
//   });

//   it('key文件上传之前校验(是key文件)', (done) => {
//     const file = {
//       lastModified: 1515677341332,
//       lastModifiedDate: 'Thu Jan 11 2018 21:29:01 GMT+0800 (中国标准时间) {}',
//       name: 'ssl.key',
//       size: 0,
//       type: '',
//       uid: 1517217945062,
//       webkitRelativePath: '',
//     };
//     wrapper.vm.notKey = false;
//     wrapper.vm.beforeKeyUpload(file);
//     wrapper.vm.isKey(file);
//     done();
//   });

//   it('获取地址', (done) => {
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
//           status: 'abnormal',
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
//       status: 'abnormal',
//     };
//     expect(wrapper.vm.getProxyAddress(proxy)).to.eql('http://10.33.40.241:9999');
//     done();
//   });

//   it('点击更换证书', (done) => {
//     const proxyItem = {
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
//           status: 'abnormal',
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
//       status: 'abnormal',
//     };
//     wrapper.vm.changeCertificate(proxyItem);
//     expect(wrapper.vm.currentProxy).to.eql(proxyItem);
//     expect(wrapper.vm.changeCertificateStatus).to.eql(true);
//     done();
//   });

//   it('上传成功', (done) => {
//     const res = {
//       code: '0',
//       data: 'file upload success',
//       msg: 'success',
//     };
//     wrapper.vm.onSuccess(res);
//     done();
//   });

//   it('上传失败', (done) => {
//     const res = {
//       code: '0',
//       data: 'file upload success',
//       msg: 'success',
//     };
//     wrapper.vm.onError(res);
//     done();
//   });
// });
