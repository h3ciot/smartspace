
// IPv4
export const REGEXP_IPv4 = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
export const REGEXP_IPv4_EXAMPLE = '0.0.0.0~255.255.255.255';

// IPv6 支持短格式
export const REGEXP_IPv6 = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
export const REGEXP_IPv6_EXAMPLE = 'XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX';

// URL
export const REGEXP_URL = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

// 邮箱
export const REGEXP_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 手机号
export const REGEXP_PHONE = /^1(3|4|5|7|8)\d{9}$/;

// 座机
export const REGEXP_LANDLINE = new RegExp('^((\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$');

// 中英文，正整数和下划线
export const REGEXP_CNENNUM = /^[a-zA-Z0-9\u4e00-\u9fa5\_]+$/;

// 中英文，正整数和特殊符号_ - （且必须以中文、英文或数字开头）
export const REGEXP_NAME = /^[a-zA-Z0-9\u4e00-\u9fa5]+[a-zA-Z0-9\u4e00-\u9fa5\_\-]*$/;

// 中英文，正整数和特殊符号_ -
export const REGEXP_NAME1 = /^[a-zA-Z0-9\u4e00-\u9fa5\_\-]*$/;

// 中英文，数字和特殊符号_ - .(且必须以中文、英文或数字开头)
export const REGEXP_NAME2 = /^[a-zA-Z0-9\u4e00-\u9fa5]+[a-zA-Z0-9\u4e00-\u9fa5\_\-\.]*$/;

// 英文，数字和特殊符号/ : _ - .
export const REGEXP_NORMAL = /^[a-zA-Z0-9\_\/\:\-\.]+$/;

// 英文、数字和特殊符号 _ -
export const REGEXP_NORMAL1 = /^[a-zA-Z0-9\_\-]+$/;

// 英文、数字和特殊符号 _ （且必须以英文或数字开头）
export const REGEXP_NORMAL2 = /^[a-zA-Z0-9]+[a-zA-Z0-9\_]*$/;

// 整数
export const REGEXP_INT = /^-?[1-9]\d*$/;

// 正整数
export const REGEXP_POSINT = /^[1-9]\d*$/;

// 自然数
export const REGEXP_NATURE = /^\d*$/;

// 十六进制数
export const REGEXP_CODE16 = /^[a-fA-F\d]*$/;

// 浮点数
export const REGEXP_FLOAT = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;

// 正浮点数
export const REGEXP_POSFLOAT = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;

// 身份证号
export const REGEXP_IDCARD = /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/;

// MAC地址
export const REGEXP_MAC = /^([A-Fa-f\d]{2}[-:]?){5}[A-Fa-f\d]{2}$/;
export const REGEXP_MAC_EXAMPLE = 'XX-XX-XX-XX-XX-XX';

// DEVEUI
export const REGEXP_DEVEUI = /^([A-Fa-f\d]{2}[-:]?){7}[A-Fa-f\d]{2}$/;
export const REGEXP_DEVEUI_EXAMPLE = 'XX-XX-XX-XX-XX-XX-XX-XX';

// SN
export const REGEXP_SN = /^([A-Fa-f\d]{2}[-:]?){7}[A-Fa-f\d]{2}$/;
export const REGEXP_SN_EXAMPLE = 'XX-XX-XX-XX-XX-XX-XX-XX';

// IMEI
export const REGEXP_IMEI15 = /^[\d]{15}$/;
export const REGEXP_IMEI15_EXAMPLE = '15位数字';
export const REGEXP_IMEI16 = /^[\d]{16}$/;
export const REGEXP_IMEI16_EXAMPLE = '16位数字';
export const REGEXP_IMEI17 = /^[\d]{17}$/;
export const REGEXP_IMEI17_EXAMPLE = '17位数字';

// 10的倍数
export const REGEXP_TEN = /^[1-9][0-9]*0$/;

// 0-7
export const REGEXP0_7 = /^([0-7])$/;

// 0-10
export const REGEXP0_10 = /^([0-9]|10)$/;

// 1-10
export const REGEXP1_10 = /^([1-9]|10)$/;

// 0-23
export const REGEXP0_23 = /^([0-9]|1[0-9]|2[0-3])$/;

// 0-27
export const REGEXP0_27 = /^([0-9]|1[0-9]|2[0-7])$/;

// 0-30
export const REGEXP0_30 = /^([0-9]|[1-2][0-9]|30)$/;

// 1-30
export const REGEXP1_30 = /^([1-9]|[1-2][0-9]|30)$/;

// 1-31
export const REGEXP1_31 = /^([1-9]|[1-2][0-9]|3[0-1])$/;

// 0-59
export const REGEXP0_59 = /^([0-9]|[1-5][0-9])$/;

// 5-59
export const REGEXP5_59 = /^([5-9]|[1-5][0-9])$/;

// 10-59
export const REGEXP10_59 = /^([1-5][0-9])$/;

// 1-247
export const EXGEXP1_247 = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-3][0-9]|24[0-7])$/;

// 1-1440
export const EXGEXP1_1440 = /^([1-9][\d]{0,2}|1[0-3][\d]{2}|14[0-3][\d]|1440)$/;

// 版本号
export const REGEXP_VERSION = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[0-9])|0{1,3}\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[0-9])|0{1,3}\.0{1,3}\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0{0,1}[1-9]{1}[0-9]{1}|0{0,2}[1-9]))$/;
