import moxios from 'moxios';
import { createWrapper } from '../../utils.js';
import { axiosInstance } from '../../../src/api/index.js';
import TreeInputItem from '../../../src/components/TreeInputItem.vue';

axiosInstance.defaults.baseURL = undefined;
describe('TreeInputItem.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    const propsData = {
      treeNodes: [{
        orgId: '1',
        parentId: '0',
        name: '一级 1',
      }, {
        orgId: '4',
        parentId: '1',
        name: '二级 1-1',
      }, {
        orgId: '9',
        parentId: '4',
        name: '三级 1-1-1',
      }],
      placeholder: '',
      inputValue: '',
      disable: false,
      isSimpleData: true,
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
    wrapper = createWrapper(TreeInputItem, { propsData });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('初始化简单数据结构', (done) => {
    expect(wrapper.vm.nodes.length).to.equal(1);
    expect(wrapper.vm.iconClass).to.equal('h-icon-arrow-down');
    done();
  });

  it('选择对应节点', (done) => {
    wrapper.vm.isMenuVisible = true;
    wrapper.vm.input = '';
    wrapper.vm.onClick({
      children: [{
        children: [],
        id: '9',
        name: '三级 1-1-1',
        parentId: '4',
      }],
      id: '4',
      name: '二级 1-1',
      parentId: '1',
    }, {
      data: {
        children: [{
          children: [],
          id: '9',
          name: '三级 1-1-1',
          parentId: '4',
        }],
        id: '4',
        name: '二级 1-1',
        parentId: '1',
      },
      id: 18,
      parent: {
        data: {
          children: [],
          id: '1',
          name: '一级 1',
          parentId: '0',
        },
        id: 11,
        parent: {
          data: {
            children: [],
            id: '1',
            name: '一级 1',
            parentId: '0',
          },
          id: 10,
          parent: null,
        },
      },
    });
    expect(wrapper.vm.input).to.equal('一级 1 > 二级 1-1');
    expect(wrapper.vm.isMenuVisible).to.equal(false);
    done();
  });

  it('鼠标点击输入框---显示下拉框', (done) => {
    wrapper.vm.handleMouseDown({
      srcElement: {
        className: 'input.el-input__inner',
      },
      preventDefault: () => {},
    });
    expect(wrapper.vm.isMenuVisible).to.equal(true);
    done();
  });

  it('鼠标点击输入框---隐藏下拉框', (done) => {
    wrapper.vm.isMenuVisible = true;
    wrapper.vm.handleMouseDown({
      srcElement: {
        className: 'input.el-input__inner',
      },
      preventDefault: () => {},
    });
    expect(wrapper.vm.isMenuVisible).to.equal(false);
    done();
  });

  it('树节点过滤---输入为空', (done) => {
    wrapper.vm.isMenuVisible = true;

    expect(wrapper.vm.filterNode('', {
      id: '1',
      name: '一级 1',
      parentId: '0',
      children: [{
        orgId: '4',
        parentId: '1',
        name: '二级 1-1',
        children: [{
          orgId: '9',
          parentId: '4',
          name: '三级 1-1-1',
        }],
      }],
    })).to.equal(true);
    done();
  });

  it('树节点过滤---关键字匹配', (done) => {
    wrapper.vm.isMenuVisible = true;

    expect(wrapper.vm.filterNode('一级', {
      id: '1',
      name: '一级 1',
      parentId: '0',
      children: [{
        orgId: '4',
        parentId: '1',
        name: '二级 1-1',
        children: [{
          orgId: '9',
          parentId: '4',
          name: '三级 1-1-1',
        }],
      }],
    })).to.equal(true);
    done();
  });

  it('树节点过滤---关键字不匹配', (done) => {
    wrapper.vm.isMenuVisible = true;

    expect(wrapper.vm.filterNode('一级不匹配', {
      id: '1',
      name: '一级 1',
      parentId: '0',
      children: [{
        orgId: '4',
        parentId: '1',
        name: '二级 1-1',
        children: [{
          orgId: '9',
          parentId: '4',
          name: '三级 1-1-1',
        }],
      }],
    })).to.equal(false);
    done();
  });

  it('鼠标点击图标---输入框非空', (done) => {
    wrapper.vm.input = '一级 1';
    wrapper.vm.inputHovering = true;
    wrapper.vm.isMenuVisible = true;
    wrapper.vm.iconClick();

    expect(wrapper.vm.input).to.equal('');
    expect(wrapper.vm.isMenuVisible).to.equal(false);
    done();
  });

  it('鼠标点击图标---输入框为空', (done) => {
    wrapper.vm.isMenuVisible = true;
    wrapper.vm.iconClick();

    expect(wrapper.vm.iconClass).to.equal('h-icon-arrow-up');
    done();
  });
});
