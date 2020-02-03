/* eslint-disable prettier/prettier */
/**
 * @flow
 */
//转换时间格式
export function exchangeDate(time: string) {
    const timeString = new Date(time);
    return (
      timeString.getFullYear() +
      '-' +
      (timeString.getMonth() + 1) +
      '-' +
      timeString.getDate() +
      ' ' +
      (timeString.getHours() <= 9
        ? '0' + timeString.getHours()
        : timeString.getHours()) +
      ':' +
      (timeString.getMinutes() <= 9
        ? '0' + timeString.getMinutes()
        : timeString.getMinutes()) +
      ':' +
      (timeString.getSeconds() <= 9
        ? '0' + timeString.getSeconds()
        : timeString.getSeconds())
    );
  }
  