import moxios from 'moxios';
import { createWrapper } from '../../../utils.js';
import { axiosInstance } from '../../../../src/api/index.js';
import PersonManage from '../../../../src/views/managements/PersonManage.vue';

axiosInstance.defaults.baseURL = undefined;

describe('PersonManage.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install(axiosInstance);
    wrapper = createWrapper(PersonManage);
    wrapper.vm.$router.push('/managements/person');
    moxios.stubOnce('GET', '/organizations?id=0', {
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
            {
              desc: '',
              name: '111',
              orgCode: '',
              orgId: 'd47cfabb-30c1-4bf5-b929-f8116877dc5a',
              orgPath: '我的组织',
              parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
              pdn: 'ou=My organization,ou=person',
            },
          ],
        },
      },
    });
    moxios.stubOnce('POST', '/personManage/v1/persons?pageSize=20&pageNo=1', {
      status: 200,
      response: {
        code: '0',
        data: {
          list: [
            {
              birthday: '',
              cardNo: '123',
              cardType: 9,
              certNo: '123',
              certType: 9,
              eMail: '',
              firstName: '',
              fullName: '132',
              gender: 0,
              keyword: '',
              languageType: '',
              lastName: '',
              mobile: '',
              name: '',
              orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
              orgPath: '我的组织',
              personId: '18d3b0b2-9d77-4241-bf84-be7dd17a97b9',
              withChild: null,
            },
          ],
          pageNo: 1,
          pageSize: 20,
          totalPage: 1,
          totalRecord: 1,
        },
        msg: '成功',
      },
    });
  });

  afterEach(() => {
    // wrapper.vm.$destroy();
    moxios.uninstall(axiosInstance);
  });

  it('打开人员修改', (done) => {
    wrapper.vm.modifyDialogVisible = false;
    wrapper.vm.modifyPerson({
      birthday: '',
      cardNo: '123',
      cardType: 9,
      certNo: '123',
      certType: 9,
      eMail: '',
      firstName: '',
      fullName: '132',
      gender: 0,
      keyword: '',
      languageType: '',
      lastName: '',
      mobile: '',
      name: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '我的组织',
      personId: '18d3b0b2-9d77-4241-bf84-be7dd17a97b9',
      withChild: null,
    });
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
              {
                desc: '',
                name: '111',
                orgCode: '',
                orgId: 'd47cfabb-30c1-4bf5-b929-f8116877dc5a',
                orgPath: '我的组织',
                parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
                pdn: 'ou=My organization,ou=person',
              },
            ],
          },
        },
      }).then(() => {
        expect(wrapper.vm.modifyDialogVisible).to.equal(true);
        expect(wrapper.vm.modifyForm.personId).to.equal('18d3b0b2-9d77-4241-bf84-be7dd17a97b9');
        done();
      });
    });
  });

  it('添加人员并结束', (done) => {
    wrapper.vm.addDialogVisible = true;
    wrapper.vm.curNode = {
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      parentId: '0',
      orgCode: '',
      level: 1,
      name: '我的组织',
    };
    wrapper.vm.simpleNodes = [{
      desc: '',
      name: '我的组织',
      orgCode: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '',
      parentId: '0',
      pdn: '',
    }];
    const goOnAdding = false;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.addForm = {
        birthday: '',
        eMail: '',
        fullName: '',
        gender: 0,
        mobile: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        personId: '',
        cardType: 1,
        cardNo: '',
      };
      wrapper.vm.toAddPerson(goOnAdding);
    });

    moxios.wait(() => {
      expect(wrapper.vm.addDialogVisible).to.equal(false);
      expect(wrapper.vm.asyncDynamicData.orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      done();
    });
  });

  it('保存并继续添加人员', (done) => {
    wrapper.vm.addDialogVisible = true;
    wrapper.vm.curNode = {
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      parentId: '0',
      orgCode: '',
      level: 1,
      name: '我的组织',
    };
    wrapper.vm.simpleNodes = [{
      desc: '',
      name: '我的组织',
      orgCode: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '',
      parentId: '0',
      pdn: '',
    }];
    const goOnAdding = true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.addForm = {
        birthday: '',
        eMail: '',
        fullName: '',
        gender: 0,
        mobile: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        personId: '',
        cardType: 1,
        cardNo: '',
      };
      wrapper.vm.toAddPerson(goOnAdding);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.addDialogVisible).to.equal(true);
        done();
      });
    });
  });

  it('修改人员', (done) => {
    wrapper.vm.modifyDialogVisible = true;
    wrapper.vm.curNode = {
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      parentId: '0',
      orgCode: '',
      level: 1,
      name: '我的组织',
    };
    wrapper.vm.simpleNodes = [{
      desc: '',
      name: '我的组织',
      orgCode: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '',
      parentId: '0',
      pdn: '',
    }];
    wrapper.vm.modifyForm = {
      birthday: '',
      cardNo: '123',
      cardType: 7,
      eMail: '',
      fullName: '123',
      gender: 0,
      mobile: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '我的组织',
      personId: '0d9313f2-01ba-44e0-a376-000bfc944880',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.modifyForm = {
        birthday: '',
        cardNo: '123456',
        cardType: 7,
        eMail: '',
        fullName: 'modify',
        gender: 0,
        mobile: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        orgPath: '我的组织',
        personId: '0d9313f2-01ba-44e0-a376-000bfc944880',
      };
      wrapper.vm.toModifyPerson(false);
    });

    moxios.wait(() => {
      expect(wrapper.vm.modifyDialogVisible).to.equal(false);
      done();
    });
  });

  it('删除人员---成功', (done) => {
    moxios.stubs.remove('POST', '/personManage/v1/persons?pageSize=20&pageNo=1');
    moxios.stubOnce('POST', '/personManage/v1/persons/delete', {
      status: 200,
      response: {
        code: '0',
        msg: '成功',
        data: null,
      },
    });
    moxios.stubOnce('POST', '/personManage/v1/persons?pageSize=20&pageNo=1', {
      status: 200,
      response: {
        code: '0',
        data: {
          list: [],
          pageNo: 1,
          pageSize: 20,
          totalPage: 0,
          totalRecord: 0,
        },
        msg: '成功',
      },
    });

    wrapper.vm.maskObj.maskVisable = true;
    wrapper.vm.curNode = {
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      parentId: '0',
      orgCode: '',
      level: 1,
      name: '我的组织',
    };

    wrapper.vm.$nextTick(() => {
      wrapper.vm.deletePerson({
        birthday: '',
        cardNo: '123',
        cardType: 9,
        certNo: '123',
        certType: 9,
        eMail: '',
        firstName: '',
        fullName: '132',
        gender: 0,
        keyword: '',
        languageType: '',
        lastName: '',
        mobile: '',
        name: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        orgPath: '我的组织',
        personId: '18d3b0b2-9d77-4241-bf84-be7dd17a97b9',
        withChild: null,
      });
      wrapper.vm.deletePersonRequest({
        birthday: '',
        cardNo: '123',
        cardType: 9,
        certNo: '123',
        certType: 9,
        eMail: '',
        firstName: '',
        fullName: '132',
        gender: 0,
        keyword: '',
        languageType: '',
        lastName: '',
        mobile: '',
        name: '',
        orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
        orgPath: '我的组织',
        personId: '18d3b0b2-9d77-4241-bf84-be7dd17a97b9',
        withChild: null,
      }).then(() => {
        expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
        expect(wrapper.vm.tableVisible).to.equal(false);
        done();
      });
    });
  });

  it('删除人员---失败', (done) => {
    moxios.stubOnce('POST', '/personManage/v1/persons/delete', {
      status: 400,
      response: {
        code: '',
        msg: '',
        data: null,
      },
    });
    wrapper.vm.maskObj.maskVisable = true;
    wrapper.vm.deletePersonRequest({
      birthday: '',
      cardNo: '123',
      cardType: 9,
      certNo: '123',
      certType: 9,
      eMail: '',
      firstName: '',
      fullName: '132',
      gender: 0,
      keyword: '',
      languageType: '',
      lastName: '',
      mobile: '',
      name: '',
      orgId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgPath: '我的组织',
      personId: '18d3b0b2-9d77-4241-bf84-be7dd17a97b9',
      withChild: null,
    }).then(() => {
      expect(wrapper.vm.maskObj.maskVisable).to.equal(false);
      done();
    });
  });

  it('初始化---获取组织树和人员列表', (done) => {
    moxios.wait(() => {
      expect(wrapper.vm.firstEnter).to.equal(false);
      expect(wrapper.vm.simpleNodes[0].orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      expect(wrapper.vm.treeNodes[0].orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      expect(wrapper.vm.curNode.orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.tableVisible).to.equal(true);
      });
      done();
    });
  });

  it('选中树节点（非点击）', (done) => {
    wrapper.vm.firstEnter = false;
    wrapper.vm.formVisible = false;
    wrapper.vm.fetchData(true);

    moxios.wait(() => {
      expect(wrapper.vm.curNode.orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      expect(wrapper.vm.asyncDynamicData.orgId).to.equal('4db7c89d-0ce6-4826-9146-6b71f037d81e');
      done();
    });
  });

  it('在添加人员时点击树节点', (done) => {
    moxios.stubs.remove('GET', '/organizations?id=0');
    wrapper.vm.firstEnter = false;
    wrapper.vm.formVisible = true;
    wrapper.vm.curNode = {
      orgId: '123',
      parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      orgCode: '',
      level: 2,
      name: '子节点',
    };
    wrapper.vm.fetchData(false);

    moxios.wait(() => {
      expect(wrapper.vm.curNode.orgId).to.equal('123');
      expect(wrapper.vm.addDialogVisible).to.equal(false);
      expect(wrapper.vm.modifyDialogVisible).to.equal(false);
      done();
    });
  });

  it('获取组织树失败', (done) => {
    moxios.stubs.remove('GET', '/organizations?id=0');
    moxios.stubOnce('GET', '/organizations?id=0', {
      status: 400,
      response: {
        code: '',
        data: null,
        msg: '',
      },
    });

    wrapper.vm.firstEnter = true;
    wrapper.vm.fetchData();
    moxios.wait(() => {
      expect(wrapper.vm.treeNodes.length).to.equal(0);
      expect(wrapper.vm.firstEnter).to.equal(false);
      done();
    });
  });

  it('选中树节点（点击）', (done) => {
    wrapper.vm.formVisible = true;
    wrapper.vm.addDialogVisible = true;
    wrapper.vm.handleNodeClick({
      name: '子节点',
      orgCode: '',
      orgId: '123',
      orgPath: '',
      parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
    });
    expect(wrapper.vm.curNode.orgId).to.equal('123');
    expect(wrapper.vm.addDialogVisible).to.equal(false);
    done();
  });

  it.skip('打开添加组织弹框', (done) => {
    wrapper.vm.curNode = {
      name: '子节点',
      orgCode: '',
      orgId: '123',
      orgPath: '',
      parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      level: 2,
    };
    // wrapper.vm.$refs.tree.store.currentNode.level = 2;
    wrapper.vm.addChildNode();
    expect(wrapper.vm.editNameVisible).to.equal(true);
    expect(wrapper.vm.type).to.equal('add');
    done();
  });

  it.skip('添加组织超过层级限制', (done) => {
    wrapper.vm.levelLimit = 5;
    wrapper.vm.editNameVisible = false;
    wrapper.vm.curNode = {
      name: '子节点',
      orgCode: '',
      orgId: '123',
      orgPath: '',
      parentId: '7894897897',
      level: 5,
    };
    wrapper.vm.addChildNode();
    expect(wrapper.vm.editNameVisible).to.equal(false);
    done();
  });

  it('打开编辑组织弹框', (done) => {
    wrapper.vm.curNode = {
      name: '子节点',
      orgCode: '12345',
      orgId: '123',
      orgPath: '',
      parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      level: 2,
    };
    wrapper.vm.editNode();
    expect(wrapper.vm.editNameVisible).to.equal(true);
    expect(wrapper.vm.type).to.equal('edit');
    expect(wrapper.vm.orgForm.name).to.equal('子节点');
    expect(wrapper.vm.orgForm.orgCode).to.equal('12345');
    done();
  });

  it('删除组织节点', (done) => {
    wrapper.vm.isDelVisiable = true;
    wrapper.vm.curNode = {
      name: '子节点',
      orgCode: '',
      orgId: '123',
      orgPath: '',
      parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
      level: 2,
    };
    wrapper.vm.removeNode();
    done();
  });

  it('添加组织---成功', (done) => {
    moxios.stubs.remove('POST', '/orgManage/v1/org');
    moxios.stubOnce('POST', '/orgManage/v1/org', {
      status: 200,
      response: {
        code: '0',
        data: {
          desc: '',
          name: '222',
          orgCode: '222',
          orgId: 'ec43ab75-cfdc-4700-b10f-3c9f6f43004e',
          orgPath: '我的组织',
          parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
          pdn: '',
        },
        msg: '成功',
      },
    });
    wrapper.vm.orgForm = {
      name: '222',
      orgCode: '222',
    };
    wrapper.vm.curNode.orgId = '4db7c89d-0ce6-4826-9146-6b71f037d81e';
    wrapper.vm.addOrg().then(() => {
      expect(wrapper.vm.curNode.orgId).to.equal('ec43ab75-cfdc-4700-b10f-3c9f6f43004e');
      done();
    });
  });

  it('添加组织---失败', (done) => {
    moxios.stubs.remove('POST', '/orgManage/v1/org');
    moxios.stubOnce('POST', '/orgManage/v1/org', {
      status: 400,
      response: {
        code: '0x00137626',
        data: null,
        msg: '组织编码已经存在\n\n请修改组织编码',
      },
    });
    wrapper.vm.orgForm = {
      name: '222',
      orgCode: '222',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.addOrg().then(done);
    });
  });

  it('修改组织---成功', (done) => {
    moxios.stubs.remove('POST', '/orgManage/v1/org');
    moxios.stubOnce('POST', '/orgManage/v1/org', {
      status: 200,
      response: {
        code: '0',
        data: {
          desc: '',
          name: 'edit',
          orgCode: 'edit',
          orgId: '9088c9c3-e861-4345-a876-69fe3b3ee08e',
          orgPath: '',
          parentId: '4db7c89d-0ce6-4826-9146-6b71f037d81e',
          pdn: '',
        },
        msg: '成功',
      },
    });
    wrapper.vm.orgForm = {
      name: 'edit',
      orgCode: 'edit',
    };
    wrapper.vm.curNode.orgId = '9088c9c3-e861-4345-a876-69fe3b3ee08e';
    wrapper.vm.$nextTick(() => {
      wrapper.vm.modifyOrg().then(() => {
        expect(wrapper.vm.curNode.orgId).to.equal('9088c9c3-e861-4345-a876-69fe3b3ee08e');
        expect(wrapper.vm.curNode.name).to.equal('edit');
        done();
      });
    });
  });

  it('修改组织---失败', (done) => {
    moxios.stubs.remove('POST', '/orgManage/v1/org');
    moxios.stubOnce('POST', '/orgManage/v1/org', {
      status: 400,
      response: {
        code: '0x00137626',
        data: null,
        msg: '组织编码已经存在\n\n请修改组织编码',
      },
    });
    wrapper.vm.orgForm = {
      name: '111',
      orgCode: '111',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.modifyOrg().then(done);
    });
  });

  it('组织名称校验---不为空', (done) => {
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '',
      orgCode: '111',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('组织名称校验---不超过40长度', (done) => {
    wrapper.vm.nameLengthLimit = 40;
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '01234567890123456789012345678901234567890123456789',
      orgCode: '111',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('组织名称校验---不能包含空格', (done) => {
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '0123456 789',
      orgCode: '111',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('组织名称校验---不含非法字符', (done) => {
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '\\121\\',
      orgCode: '111',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('组织编号校验---数字和字符的组合', (done) => {
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '0123456789',
      orgCode: '111编号',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('组织编号校验---不超过40长度', (done) => {
    wrapper.vm.editNameVisible = true;
    wrapper.vm.type = 'add';
    wrapper.vm.orgForm = {
      name: '0123456789',
      orgCode: '01234567890123456789012345678901234567890123456789',
    };
    wrapper.vm.$nextTick(() => {
      wrapper.vm.nameSubmit();
    });

    moxios.wait(() => {
      expect(wrapper.vm.editNameVisible).to.equal(true);
      done();
    });
  });

  it('点击过滤按钮(展开)', (done) => {
    wrapper.vm.inFilter = false;
    wrapper.vm.filterButtonClick();

    moxios.wait(() => {
      expect(wrapper.vm.inFilter).to.equal(true);
      done();
    });
  });

  it('点击过滤按钮(收起)', (done) => {
    wrapper.vm.inFilter = true;
    wrapper.vm.filterButtonClick();

    moxios.wait(() => {
      expect(wrapper.vm.inFilter).to.equal(false);
      done();
    });
  });

  it('点击查询', (done) => {
    wrapper.vm.isSearch = false;
    wrapper.vm.search();
    expect(wrapper.vm.isSearch).to.equal(true);
    done();
  });

  it('点击重置', (done) => {
    wrapper.vm.isSearch = false;
    wrapper.vm.resetSearch();
    expect(wrapper.vm.isSearch).to.equal(true);
    done();
  });

  it('下载人员模板', (done) => {
    moxios.stubOnce('GET', '/download1/bic_template/PersonnelImportTemplateOfIdentity_zh_CN.csv', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: null,
      },
    });

    wrapper.vm.personImportVisible = true;
    wrapper.vm.isIndividual = true;
    wrapper.vm.$nextTick(() => {
      wrapper.vm.download('template');
      done();
    });
  });

  it('下载组织模板', (done) => {
    moxios.stubOnce('GET', '/download1/bic_template/OrganizationImportTemplate_zh_CN.csv', {
      status: 200,
      response: {
        code: '0',
        msg: '',
        data: null,
      },
    });

    wrapper.vm.personImportVisible = false;
    wrapper.vm.$nextTick(() => {
      wrapper.vm.download('template');
      done();
    });
  });

  it('批量导入人员--关闭', (done) => {
    wrapper.vm.personImportVisible = true;
    wrapper.vm.importClose();
    moxios.wait(() => {
      expect(wrapper.vm.personImportVisible).to.equal(false);
      done();
    });
  });

  it('批量导入组织--关闭', (done) => {
    wrapper.vm.personImportVisible = false;
    wrapper.vm.orgImportVisible = true;
    wrapper.vm.importClose();
    moxios.wait(() => {
      expect(wrapper.vm.orgImportVisible).to.equal(false);
      done();
    });
  });

  it('初次添加人员--设置人员唯一标识', (done) => {
    wrapper.vm.personCardMode = 'unset';
    wrapper.vm.simplePersonAdd(true);
    moxios.wait(() => {
      expect(wrapper.vm.setCardModeDialogVisible).to.equal(true);
      done();
    });
  });

  it('添加人员--判断设置人员唯一标识', (done) => {
    wrapper.vm.$store.state.personCardMode = 'individual';
    moxios.wait(() => {
      wrapper.vm.simplePersonAdd(true);
      expect(wrapper.vm.addDialogVisible).to.equal(true);
      done();
    });
  });

  it('导入人员--判断设置人员唯一标识', (done) => {
    wrapper.vm.$store.state.personCardMode = 'individual';
    moxios.wait(() => {
      wrapper.vm.simplePersonAdd(false);
      expect(wrapper.vm.personImportVisible).to.equal(true);
      done();
    });
  });

  it('点击过滤加载人员列表--成功', (done) => {
    wrapper.vm.isSearch = true;
    moxios.wait(() => {
      wrapper.vm.loadSuccess({
        msg: '',
      });
      expect(wrapper.vm.tableVisible).to.equal(true);
      expect(wrapper.vm.isSearch).to.equal(false);
      done();
    });
  });

  it('点击组织加载人员列表--成功（为空）', (done) => {
    moxios.wait(() => {
      wrapper.vm.loadSuccess({
        msg: '',
        list: [],
      });
      expect(wrapper.vm.tableVisible).to.equal(false);
      done();
    });
  });

  it('点击组织加载人员列表--成功（非空）', (done) => {
    moxios.wait(() => {
      wrapper.vm.loadSuccess({
        msg: '成功',
        list: [{}],
      });
      expect(wrapper.vm.tableVisible).to.equal(true);
      done();
    });
  });
});
