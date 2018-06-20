import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import SearchItem from '../../../../src/views/managements/SearchItem.vue';

axiosInstance.defaults.baseURL = undefined;

describe('SearchItem.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      allOrg: [{
        desc: '',
        name: '我的组织',
        orgCode: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        orgPath: '',
        parentId: '0',
        pdn: '',
      }],
    };
    wrapper = createWrapper(SearchItem, { propsData });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('关键词搜索', (done) => {
    wrapper.vm.querySearch('我的', () => {});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          code: '0',
          msg: '',
          data: {
            organizations: [
              {
                desc: '',
                name: '我的组织',
                orgCode: '',
                orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
                orgPath: '',
                parentId: '0',
                pdn: 'ou=person',
              },
            ],
          },
        },
      });
    });
    done();
  });

  it('选择对应节点', (done) => {
    wrapper.vm.handleSelect({});
    done();
  });

  it('删除关键字', (done) => {
    wrapper.vm.inputHovering = true;
    wrapper.vm.searchInput = '我的';

    moxios.wait(() => {
      wrapper.vm.handleIconClick();
      expect(wrapper.vm.searchInput).to.equal('');
      done();
    });
  });

  it('鼠标聚焦', (done) => {
    wrapper.vm.inputHovering = false;
    wrapper.vm.onFocus();

    moxios.wait(() => {
      expect(wrapper.vm.inputHovering).to.equal(true);
      done();
    });
  });
});
