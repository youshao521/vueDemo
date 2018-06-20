import {
  isNewVersion,
  parseChangelog,
  getInstallCheckParam,
} from '../../../../src/views/maintenances/utils';

describe('maintenances/utils', () => {
  it('isNewVersion', () => {
    expect(isNewVersion('dac_2.0.2', 'dac_1.9.1')).to.equal(true);
    expect(isNewVersion('dac_1.0.2', 'dac_2.9.1')).to.equal(false);
    expect(isNewVersion('dac_2.0.2', 'dac_2.0.1')).to.equal(true);
    expect(isNewVersion('dac_2.0.2', 'dac_2.0.2')).to.equal(false);
    expect(isNewVersion('dac_2.0.1', 'dac_2.0.2')).to.equal(false);
  });

  it('parseChangelog(空)', () => {
    expect(parseChangelog('').length).to.equal(0);
  });

  it('parseChangelog(1)', () => {
    const text = '2017-12-18 [1.0.0]\r\n1.调整组件的文件目录\r\n2.调整相应的监控页面';
    const logs = parseChangelog(text);
    expect(logs.length).to.equal(1);
    expect(logs[0].version).to.equal('1.0.0');
    expect(logs[0].date).to.equal('2017-12-18');
    expect(logs[0].logs.length).to.equal(2);
  });

  it('parseChangelog(2)', () => {
    const text = '2017-12-18 [2.0.0]\r\n1.调整组件的文件目录\r\n2.调整相应的监控页面\r\n2017-09-26 [1.0.0]\r\n1.封装tomcat组件';
    const logs = parseChangelog(text);
    expect(logs.length).to.equal(2);
    expect(logs[0].version).to.equal('2.0.0');
    expect(logs[1].date).to.equal('2017-09-26');
    expect(logs[1].logs.length).to.equal(1);
  });

  it('getInstallCheckParam(没有依赖信息)', () => {
    const components = [
      {
        id: 'vcredist2008x86_1.0.0',
        targets: [
          {
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
          },
          {
            id: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
          },
        ],
      },
    ];
    const result = getInstallCheckParam(components);
    expect(result.length).to.equal(2);
    expect(result[1].components.length).to.equal(1);
  });

  it('getInstallCheckParam(依赖全部已安装-远程)', () => {
    const components = [
      {
        id: 'ncg_5.0.11',
        targets: [
          {
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: 'tomcat85win64_1.0.0_javaweb_C380E3AB-9759-4987-A173-25C6C9ACA3B2_1',
                machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                dIndex: 0,
              },
            ],
          },
          {
            id: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: 'tomcat85win64_1.0.0_javaweb_627E7C2C-377A-4C8D-910F-932C825A2B0F_1',
                machineId: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
                dIndex: 0,
              },
            ],
          },
        ],
        remoteDependencies: [
          {
            id: 'postgresql96win64_1.0.0_rdbms',
            group: '2',
            dependencySegmentId: 'ncgdb',
            remoteSegmentExist: false,
            instanceId: 'postgresql96win64_1.0.0_rdbms_C380E3AB-9759-4987-A173-25C6C9ACA3B2_2',
            machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            dIndex: 1,
          },
        ],
      },
    ];
    const result = getInstallCheckParam(components);
    expect(result.length).to.equal(2);
    expect(result[0].components.length).to.equal(1);
    expect(result[0].components[0]).to.equal('ncg_5.0.11');
  });
  it('getInstallCheckParam(依赖全部没有安装-本地)', () => {
    const components = [
      {
        id: 'ncg_5.0.11',
        targets: [
          {
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: '',
                machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                dIndex: 0,
              },
            ],
          },
          {
            id: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: '',
                machineId: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
                dIndex: 0,
              },
            ],
          },
        ],
        remoteDependencies: [
          {
            remoteSegmentExist: false,
            id: 'postgresql96win64_1.0.0_rdbms',
            group: '2',
            dependencySegmentId: 'ncgdb',
            instanceId: '',
            machineId: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
            dIndex: 1,
            username: 'heyu5',
            password: 'Abc123++',
          },
        ],
      },
    ];
    const result = getInstallCheckParam(components);
    expect(result.length).to.equal(2);
    expect(result[0].components.length).to.equal(2);
    expect(result[1].components.length).to.equal(3);
    expect(result[1].components[2]).to.equal('postgresql96win64_1.0.0');
  });
  it('getInstallCheckParam(混合)', () => {
    const components = [
      {
        id: 'ncg_5.0.11',
        targets: [
          {
            id: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: '',
                machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
                dIndex: 0,
              },
            ],
          },
          {
            id: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
            localDependencies: [
              {
                id: 'tomcat85win64_1.0.0_javaweb',
                group: '1',
                dependencySegmentId: 'ncgweb',
                remoteSegmentExist: null,
                instanceId: 'tomcat85win64_1.0.0_javaweb_627E7C2C-377A-4C8D-910F-932C825A2B0F_1',
                machineId: '627E7C2C-377A-4C8D-910F-932C825A2B0F',
                dIndex: 0,
              },
            ],
          },
        ],
        remoteDependencies: [
          {
            remoteSegmentExist: false,
            id: 'postgresql96win64_1.0.0_rdbms',
            group: '2',
            dependencySegmentId: 'ncgdb',
            instanceId: '',
            machineId: 'C380E3AB-9759-4987-A173-25C6C9ACA3B2',
            dIndex: 1,
            username: 'heyus',
            password: 'Abc123++',
          },
        ],
      },
    ];
    const result = getInstallCheckParam(components);
    expect(result.length).to.equal(2);
    expect(result[0].components.length).to.equal(3);
    expect(result[0].components[2]).to.equal('postgresql96win64_1.0.0');
    expect(result[1].components.length).to.equal(1);
  });
});
