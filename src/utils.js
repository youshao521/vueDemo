import shajs from 'sha.js';
import format from 'date-fns/esm/format';
import Cookies from 'js-cookie';
import { Message, MessageBox } from 'hui';
import HuiLocale from 'hui/lib/locale';
import { getLanguage } from './api/locale.js';
import { getMenus } from './api/menus.js';

export function getLanguageType() {
  return Cookies.get('_languageType');
}

// 定义各个菜单的位置关系
export const MENU_STRUCTURE = [
  // 首页
  {
    id: '0',
    _path: '/',
    _self: true,
    _i18n: 'homePage',
  },
  // 告警处理
  {
    id: '1',
    _path: '/alerts',
    _self: true,
    _i18n: 'alertsHandle',
  },
  // 状态监控
  {
    id: '2',
    _path: '/status',
    _self: true,
    _i18n: 'statusMonitoring',
  },
  // 系统维护
  {
    id: '_',
    _path: '/maintenances',
    _self: true,
    _i18n: 'systemMaintenance',
    children: [
      // 服务器管理
      {
        id: '18',
        icon: 'rm-server',
        _path: '/maintenances/servers',
        _self: true,
        _i18n: 'serverManagement',
      },
      // 安装部署
      {
        id: '_',
        icon: 'rm-setup',
        _path: '/maintenances/installation',
        _self: true,
        _i18n: 'installationManagement',
        children: [
          // 软件包管理
          {
            id: '3',
            icon: 'rm-package',
            _path: '/maintenances/packages',
            _self: true,
            _i18n: 'packageManage',
          },
          // 软件安装
          {
            id: '4',
            icon: 'rm-setup',
            _path: '/maintenances/installation/install',
            _self: true,
            _i18n: 'installManage',
          },
          // 资源管理
          {
            id: '23',
            icon: 'rm-setup',
            _path: '/maintenances/installation/resources',
            _self: true,
            _i18n: 'resourceManage',
          },
          // 系统检测
          {
            id: '17',
            icon: 'rm-setup',
            _path: '/maintenances/installation/system-check',
            _self: true,
            _i18n: 'systemCheck',
          },
        ],
      },
      // 参数配置
      {
        id: '_',
        icon: 'rm-gear',
        _path: '/maintenances/settings',
        _self: true,
        _i18n: 'paramConfiguration',
        children: [
          // 服务参数配置
          {
            id: '5',
            icon: 'rm-app',
            _path: '/maintenances/settings/components',
            _self: true,
            _i18n: 'componentParamConfig',
          },
          // 告警策略配置
          {
            id: '6',
            icon: 'rm-alarm',
            _path: '/maintenances/settings/alerts',
            _self: true,
            _i18n: 'alarmConfiguration',
          },
          // 防火墙策略配置
          {
            id: '14',
            icon: 'rm-alarm',
            _path: '/maintenances/settings/firewall',
            _self: true,
            _i18n: 'firewallConfiguration',
          },
          // 校时配置
          {
            id: '7',
            icon: 'rm-clock',
            _path: '/maintenances/settings/time',
            _self: true,
            _i18n: 'timingConfiguration',
          },
          // 多线路配置
          {
            id: '8',
            icon: 'rm-way_draw',
            _path: '/maintenances/settings/multiline',
            _self: true,
            _i18n: 'multilineConfiguration',
          },
        ],
      },
      // 集群管理
      {
        id: '9',
        icon: 'rm-group',
        _path: '/maintenances/cluster',
        _self: false,
        _i18n: 'clusterManage',
      },
      // 授权服务
      {
        id: '10',
        icon: 'rm-lisence',
        _path: '/maintenances/licenses',
        _self: false,
        _i18n: 'licenseManage',
      },
      // 服务管理
      {
        id: '11',
        icon: 'rm-server',
        _path: '/maintenances/service',
        _self: true,
        _i18n: 'serviceManagement',
      },
      // 备份还原
      {
        id: '_',
        icon: 'rm-gear',
        _path: '/maintenances/backup',
        _self: true,
        _i18n: 'backUpReduce',
        children: [
          // 备份设置
          {
            id: '15',
            icon: 'rm-gear',
            _path: '/maintenances/backup',
            _self: true,
            _i18n: 'backUp',
          },
          // 备份文件
          {
            id: '16',
            icon: 'rm-gear',
            _path: '/maintenances/backup-file',
            _self: true,
            _i18n: 'backUpFile',
          },
        ],
      },
    ],
  },
  // 日志分析
  {
    id: '_',
    _path: '/logs',
    _self: true,
    _i18n: 'logAnalysis',
    children: [
      // 系统日志
      {
        id: '19',
        icon: 'rm-log-system',
        _path: '/logs/system',
        _self: true,
        _i18n: 'systemLog',
      },
      // 操作日志
      {
        id: '20',
        icon: 'rm-log-app',
        _path: '/logs/business',
        _self: true,
        _i18n: 'businessLog',
      },
      // 视频服务
      // {
      //   id: '_',
      //   icon: 'rm-data',
      //   _path: '/logs/video',
      //   _self: true,
      //   _i18n: 'videoService',
      //   children: [
      //     // 视频预览
      //     {
      //       id: '?',
      //       icon: 'rm-data',
      //       _path: '/logs/video-previews',
      //       _self: true,
      //       _i18n: 'preview',
      //     },
      //     // 视频回放
      //     {
      //       id: '?',
      //       icon: 'rm-data',
      //       _path: '/logs/video-playbacks',
      //       _self: true,
      //       _i18n: 'playback',
      //     },
      //   ],
      // },
    ],
  },
  // 文档中心
  // {
  //   id: '?',
  //   _path: '/documents',
  //   _self: true,
  //   _i18n: 'documentCenter',
  // },
  // 知识库
  {
    id: '21',
    _path: '/faq',
    _self: true,
    _i18n: 'faq',
  },
  // 工具箱
  // {
  //   id: '?',
  //   _path: '/tools',
  //   _self: true,
  //   _i18n: 'tools',
  // },
  // 统计报表
  // {
  //   id: '_',
  //   _path: '/statistics',
  //   _self: true,
  //   _i18n: 'statisticsReport',
  //   children: [
  //     // 业务日志报表
  //     {
  //       id: '?',
  //       icon: 'rm-report-app',
  //       _path: '/statistics/business-report',
  //       _self: true,
  //       _i18n: 'businessReport',
  //     },
  //     // 接口日志报表
  //     {
  //       id: '?',
  //       icon: 'rm-report-api',
  //       _path: '/statistics/interface-report',
  //       _self: true,
  //       _i18n: 'interfaceReport',
  //     },
  //   ],
  // },
  // 系统管理
  {
    id: '_',
    _path: '/managements',
    _self: true,
    _i18n: 'systemManagement',
    children: [
      // 组织人员管理
      {
        id: '13',
        icon: 'rm-users',
        _path: '/managements/person',
        _self: true,
        _i18n: 'organizePersonManage',
      },
      // 用户管理
      {
        id: '12',
        icon: 'rm-user',
        _path: '/managements/users',
        _self: true,
        _i18n: 'userManagement',
      },
      // 菜单管理
      {
        id: '22',
        icon: 'rm-menu_app',
        _path: '/managements/product-menus',
        _self: true,
        _i18n: 'menuManage',
      },
    ],
  },
];

function buildMenus(menus = [], availableMenus, $i18n) {
  return menus
    .map((menu) => {
      const aMenu = availableMenus.find(am => am.id === menu.id);
      return Object.assign(
        {
          name: $i18n.t(menu._i18n),
          _available: !!aMenu,
        },
        aMenu,
        menu,
        { children: buildMenus(menu.children, availableMenus, $i18n) },
      );
    })
    .filter(menu => menu._available || menu.children.length);
}

export function setMenus({ store, i18n }) {
  return getMenus()
    .then(({ data }) => data.menus)
    /* 默认展示：首页、告警处理、状态监控、日志分析（系统日志、操作日志）、知识库 */
    .catch(() => ['0', '1', '2', '19', '20', '21'].map(id => ({ id })))
    .then(availableMenus => buildMenus(MENU_STRUCTURE, availableMenus, i18n))
    .then(menus => store.commit('UPDATE', { menus }));
}

export function setTitle({ store, i18n }) {
  const { name } = store.state.meta.system;
  const title = i18n.t('title');
  document.title = name || title;
}

export function sha256(text) {
  return shajs('sha256').update(text).digest('hex');
}

export function pwdStrength(pwd) {
  // 不对是否为用户名或者用户名的倒写进行校验
  // if (
  //   username && (
  //     username === pwd ||
  //     username === pwd.split('').reverse().join('')
  //   )
  // ) {
  //   return 0;
  // }
  const rules = [
    /\d/,
    /[a-z]/,
    /[A-Z]/,
    /[^0-9a-zA-Z]/,
  ];
  let level = rules.reduce((x, rule) => x + rule.test(pwd), 0);
  if (level === 1) {
    level = 0;
  }
  if (level === 2 && rules[0].test(pwd) && !rules[3].test(pwd)) {
    level = 1;
  }
  if (level === 4) {
    level = 3;
  }
  return level;
}

export function flatten(items = [], key) {
  return [].concat(
    ...items.map(item => [
      item,
      ...flatten(item[key], key),
    ]),
  );
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const ID_CARD_REGEX = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

export const IP_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const NAME_REGEX = /^[\u4E00-\u9FA5A-Za-z0-9.]+$/;

export const NAME_NOSTRICT = /^[\u4E00-\u9FA5A-Za-z0-9.@/\\]+$/;

export const ASCII_UN_USE = /[\\/:*?<|'%>"]+/;

export const DISK_PATH = /^[a-zA-Z]:([\\/][0-9a-zA-Z\u4e00-\u9fa5-.'_@#$%[\]{}!+=^&()\s]+)*[\\/]{0,1}$/;

export const DISK_PATH_LINUX = /^([/][^/]+)*[/]{0,1}$/;

// 去除最后的\
export function clearLastSlash(s) {
  return s.replace(/((\\)*$)/g, '');
}

/**
 * 解析带本地时区格式的时间
 * @param  {String} str 带本地时区格式的时间
 * @return {Date}       Date 对象
 */
export function parseTimezoneString(str) {
  const p = str.replace('T', ' ').match(/(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d)\.(\d{3})(.+)/);
  const baseDate = p[1].replace(/-/g, '/');
  const ms = p[2] * 1;
  const tz = p[3];
  const tzSign = tz[0] === '-' ? 1 : -1;
  const tzHour = tz === 'Z' ? 0 : tz.match(/\d\d/g)[0] * 1;
  const tzMinute = tz === 'Z' ? 0 : tz.match(/\d\d/g)[1] * 1;
  const tzo = tzSign * (tzHour * 60 + tzMinute);
  const date = new Date(baseDate);
  const timestamp = +date + ms - (date.getTimezoneOffset() - tzo) * 6e4;
  return new Date(timestamp);
}

/**
 * 将时间转换为带本地时区的格式
 * @param  {String|Date} dt 可以作为 new Date() 参数的字符串或 Date 对象
 * @return {String} 带本地时区的格式
 * @example '2017-06-06 09:00:00+08:00'
 * @example '2017-06-06 01:00:00Z'
 */
export function toTimezoneString(dt) {
  const date = new Date(dt);
  if (date.toString() === 'Invalid Date') {
    return '';
  }
  // UTC+8 会返回 -480
  const tzo = date.getTimezoneOffset();
  const tzSign = tzo > 0 ? '-' : '+';
  const tzHour = String(Math.abs(tzo / 60) | 0);
  const tzMinute = String(Math.abs(tzo % 60) | 0);
  const timezone = tzo === 0 ? '+Z' : `${tzSign}${tzHour}:${tzMinute}`;
  return (
    // eslint-disable-next-line prefer-template
    [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ].join('-') +
    ' ' +
    [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ].join(':') +
    '.' + `000${date.getMilliseconds()}`.slice(-3) +
    timezone
  ).replace(/\b\d\b/g, '0$&').replace(/\+Z/, 'Z').replace(/\s/, 'T');
}

/**
 * 格林时间转本地时间
 * @dateStr  格林时间，字符串
 * @return {本地时间，Date类型}
 */
export function showLookTime(str) {
  return format(parseTimezoneString(str), 'yyyy-MM-dd HH:mm:ss');
}

export function formatNumber(row, column, cellValue) {
  return cellValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function showMessage(data) {
  const { code, msg } = data;
  if (msg) {
    const state = code === '0' ? 'success' : 'error';
    Message[state]({ message: msg, showClose: true });
  }
  return data;
}

/**
 * 弹框提示
 * @param  {Object} vm           vm 实例
 * @param  {String} type         成功 success、信息 info、警告 warning、错误 error、确认 confirm
 * @param  {String} [title='']   内部轻量标题
 * @param  {String} message      信息
 * @param  {String} suggestion   建议
 * @return {Promise}             confirm 类型取消会 catch
 */
export function showMessageBox(vm, { type, title = '', msg, _suggestion = '' }) {
  const h = vm.$createElement;
  const isConfirm = type === 'confirm';
  return MessageBox({
    type: isConfirm ? 'question' : type,
    title: '',
    message: h('div', { style: 'word-wrap:break-word;' }, [
      title && h('div', { style: 'font-size:14px;font-weight:bold;line-height:22px;margin-bottom:8px;' }, title),
      h('div', { style: 'font-size:12px;line-height:16px;margin-bottom:16px;' }, msg),
      h('div', { style: 'font-size:12px;line-height:16px;' }, _suggestion),
    ]),
    closeOnClickModal: false,
    showConfirmButton: isConfirm,
    showCancelButton: true,
    confirmButtonText: vm.$t('confirm'),
    cancelButtonText: isConfirm ? vm.$t('cancel') : vm.$t('close'),
  });
}


/**
 * 将ztree中的简单树结构转为标准树结构
 * @simpleTree  简单树结构{id, parentId, name}
 * @return 标准树结构{id, name, children:[]}
 */
export function transSimpleToNormal(simpleTree) {
  const nodeMap = Object.create(null);
  simpleTree.forEach((menu) => {
    nodeMap[menu.id] = Object.assign({ children: [] }, menu);
  });
  Object.values(nodeMap).forEach((node) => {
    if (nodeMap[node.parentId]) {
      nodeMap[node.parentId].children.push(node);
    }
  });
  return simpleTree.filter(m1 => !simpleTree.find(m2 => m1.parentId === m2.id))
    .map(menu => nodeMap[menu.id]);
}

export const isIE = (
  /MSIE (\d+\.\d+);/.test(navigator.userAgent) ||
  ~navigator.userAgent.indexOf('Trident/')
);

export function setLanguage(code, $i18n) {
  try {
    // 兼容以前的情况，当前运管中心未使用
    window.localStorage.setItem('locale', code);
  } catch (e) {
    // console.log(e);
  }
  Cookies.set('_languageType', code, { expires: new Date(~(1 << 31) * 1e3) });
  return (
    Object.keys($i18n.getLocaleMessage(code)).length
      ? Promise.resolve()
      : getLanguage(code).then((data) => {
        $i18n.setLocaleMessage(code, data);
      })
  ).then(() => {
    /* eslint-disable no-param-reassign */
    $i18n.locale = null;
    $i18n.locale = code;
    /* eslint-enable */
    HuiLocale.i18n((key, value) => $i18n.t(key, value));
    document.title = $i18n.t('title');
  });
}

export function detectBrowser() {
  const ua = window.navigator.userAgent;
  if (/chrome\/\d+\./i.test(ua)) {
    const [, version] = ua.match(/chrome\/(\d+)\./i);
    return { name: 'chrome', version: version * 1 };
  }
  if (/firefox\/\d+\./i.test(ua)) {
    const [, version] = ua.match(/firefox\/(\d+)\./i);
    return { name: 'firefox', version: version * 1 };
  }
  if (isIE) {
    const [, version] = (
      ua.match(/Trident\/.*rv:(\d+)/) ||
      ua.match(/MSIE\s(\d+)/)
    );
    return { name: 'ie', version: version * 1 };
  }
  return { name: 'unknown', version: null };
}

// 多语言字典
export const I18NKeys = [
  'zh_CN',
  'zh_HK',
  'zh_SG',
  'zh_TW',
  'en_US',
  'en_AU',
  'en_BZ',
  'en_CA',
  'en_GB',
  'en_IE',
  'en_JM',
  'en_NZ',
  'en_TT',
  'en_ZA',
  'en',
  'af',
  'ar_AE',
  'ar_BH',
  'ar_DZ',
  'ar_EG',
  'ar_IQ',
  'ar_JO',
  'ar_KW',
  'ar_LB',
  'ar_LY',
  'ar_MA',
  'ar_OM',
  'ar_QA',
  'ar_SA',
  'ar_SY',
  'ar_TN',
  'ar_YE',
  'be',
  'bg',
  'ca',
  'cs',
  'da',
  'de',
  'de_AT',
  'de_CH',
  'de_LI',
  'de_LU',
  'el',
  'es',
  'es_AR',
  'es_BO',
  'es_CL',
  'es_CO',
  'es_CR',
  'es_DO',
  'es_EC',
  'es_GT',
  'es_HN',
  'es_MX',
  'es_NI',
  'es_PA',
  'es_PE',
  'es_PR',
  'es_PY',
  'es_SV',
  'es_UY',
  'es_VE',
  'et',
  'eu',
  'fa',
  'fi',
  'fo',
  'fr',
  'fr_BE',
  'fr_CA',
  'fr_CH',
  'fr_LU',
  'gd',
  'gd_IE',
  'he',
  'hi',
  'hr',
  'hu',
  'in',
  'is',
  'it',
  'it_CH',
  'ja',
  'ji',
  'ko',
  'ko',
  'lt',
  'lv',
  'mk',
  'ms',
  'mt',
  'nl',
  'nl_BE',
  'no',
  'pl',
  'pt',
  'pt_BR',
  'rm',
  'ro',
  'ro_MO',
  'ru',
  'ru_MO',
  'sb',
  'sk',
  'sl',
  'sq',
  'sr',
  'sv',
  'sv_FI',
  'sx',
  'sz',
  'th',
  'tn',
  'tr',
  'ts',
  'uk',
  'ur',
  've',
  'vi',
  'xh',
  'zu',
];

// 格式化数据，将简单格式数据转化为tree需要使用的格式
export function parseData(data, { pId = 'pId', id = 'id', children = 'children' }) {
  const target = [];
  // 递归操作
  const traverse = (parent) => {
    data.forEach((child) => {
      if (child[pId] === parent[id]) {
        if (!parent[children]) {
          const p = parent;
          p[children] = [];
        }
        const c = child;
        c.level = parent.level + 1;
        parent[children].push(child);
        traverse(child);
      }
    });
  };
  // 先找出根节点，对根节点进行递归操作
  data.forEach((child) => {
    if (child[pId] === '0') {
      const c = child;
      c.level = 1;
      target.push(child);
      traverse(child);
    }
  });
  return target;
}

export function validateFileType(vm, file, type) {
  if (file.name) {
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
    if (ext.toLowerCase() !== type.toLowerCase()) {
      Message.error({
        message: vm.$t('fileTypeError', { type }),
        showClose: true,
      });
      return false;
    }
  }
  return true;
}
