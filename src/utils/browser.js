/**
 * @flow
 */

// 浏览器名称
export const OPERA = 'Opera'; // Opera
export const IE = 'IE'; // IE
export const EDGE = 'Edge'; // Edge
export const FIREFOX = 'Firefox'; // Firefox
export const SAFARI = 'Safari'; // Safari
export const CHROME = 'Chrome'; // Chrome
export const IE11PLUS = 'IE11'; // IE>=11
export const UNKONWN = 'Unkonwn'; // Unkonwn
/**
 * 获取浏览器名称
 */
let getExploreName = () => {
  const { userAgent } = navigator;
  let name;
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    name = OPERA;
  } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
    name = IE;
  } else if (userAgent.indexOf('Edge') > -1) {
    name = EDGE;
  } else if (userAgent.indexOf('Firefox') > -1) {
    name = FIREFOX;
  } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    name = SAFARI;
  } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
    name = CHROME;
  } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    name = IE11PLUS;
  } else {
    name = UNKONWN;
  }
  getExploreName = () => {
    return name;
  };
  return name;
};

function downLoadFile(url) {
  const a = document.createElement('a');
  a.hidden = true;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
export { getExploreName, downLoadFile };
