import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import LogVideo from '../../../../src/views/logs/LogVideo.vue';

axiosInstance.defaults.baseURL = undefined;

describe('LogVideo.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(LogVideo);
    wrapper.vm.$router.push('/logs/video-previews');
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化---获取预览数据', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            videoPreviews: [
              {
                user: {
                  id: '1',
                  name: 'admin',
                },
                sessions: [
                  {
                    ip: '10.19.137.131',
                    cameras: [
                      {
                        id: '2',
                        name: '监控点2',
                        ip: '10.19.137.131',
                        traceId: '123121',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.tableData.length).to.equal(1);
        done();
      });
      done();
    });
  });

  it('初始化---获取回放数据', (done) => {
    wrapper.vm.$router.push('/logs/video-playbacks');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            videoPlaybacks: [
              {
                user: {
                  id: '1',
                  name: 'admin',
                },
                sessions: [
                  {
                    ip: '10.19.137.131',
                    cameras: [
                      {
                        id: '2',
                        name: '监控点2',
                        ip: '10.19.137.131',
                        traceId: '123121',
                        begin: '2018-03-01 15:49:30',
                        end: '2018-03-01 16:49:30',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.tableData.length).to.equal(1);
        done();
      });
      done();
    });
  });

  it('查看详情', (done) => {
    wrapper.vm.showCameraDetails({
      userCameras: [
        {
          id: '2',
          name: '监控点2',
          ip: '10.19.137.131',
          traceId: '123121',
          begin: '2018-03-01 15:49:30',
          end: '2018-03-01 16:49:30',
        },
      ],
    });
    expect(wrapper.vm.dialogVisible).to.equal(true);
    expect(wrapper.vm.userCameras[0].id).to.equal('2');
    done();
  });
});
