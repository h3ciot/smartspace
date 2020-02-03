/**
 * @flow
 */

// 转换汉字为两个字符
export function getStringByteLength(str: string) {
  return str ? str.replace(/[^\x00-\xff]/g, 'ci').length : 0;
}

function segmentsIntr(a, b, c, d) {
  /** 解线性方程组, 求线段交点. **/

  // 如果分母为0 则平行或共线, 不相交
  const denominator = (b[1] - a[1]) * (d[0] - c[0]) - (a[0] - b[0]) * (c[1] - d[1]);
  if (denominator === 0) {
    return false;
  }

  // 线段所在直线的交点坐标 (x , y)
  const x =
    ((b[0] - a[0]) * (d[0] - c[0]) * (c[1] - a[1]) +
      (b[1] - a[1]) * (d[0] - c[0]) * a[0] -
      (d[1] - c[1]) * (b[0] - a[0]) * c[0]) /
    denominator;
  const y =
    -(
      (b[1] - a[1]) * (d[1] - c[1]) * (c[0] - a[0]) +
      (b[0] - a[0]) * (d[1] - c[1]) * a[1] -
      (d[0] - c[0]) * (b[1] - a[1]) * c[1]
    ) / denominator;

  /** 判断交点是否在两条线段上 **/

  if (
    // 交点在线段1上
    (x - a[0]) * (x - b[0]) <= 0 &&
    (y - a[1]) * (y - b[1]) <= 0 &&
    // 且交点也在线段2上
    (x - c[0]) * (x - d[0]) <= 0 &&
    (y - c[1]) * (y - d[1]) <= 0
  ) {
    return true;
  }
  //否则不相交
  return false;
}

export function isIntersect(arr: Array<any>) {
  if (arr.length <= 3) {
    return false;
  }
  for (let i = 0; i < arr.length - 2; i++) {
    const p1 = arr[i];
    const p2 = arr[i + 1];
    for (let j = i + 2; j < arr.length; j++) {
      const p3 = arr[j];
      let p4 = [];
      if (j >= arr.length - 1) {
        p4 = arr[0];
      } else {
        p4 = arr[j + 1];
      }
      if (JSON.stringify(p1) === JSON.stringify(p4)) {
        continue;
      }
      if (segmentsIntr(p1, p2, p3, p4)) {
        return true;
      }
    }
  }
  return false;
}

export function isOutOfRange(arr: Array<any>) {
  if (arr.length < 2) {
    return true;
  }
  const radius = Math.sqrt(Math.pow(arr[1][0] - arr[0][0], 2) + Math.pow(arr[1][1] - arr[0][1], 2));
  return radius > arr[0][1] || radius > arr[0][0];
}
export function isLine(arr: Array<any>) {
  if (arr.length < 2) {
    return false;
  }
  let xInline = true;
  let yInline = true;
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    if (arr[0][0] !== arr[i][0]) {
      xInline = false;
    }
    if (arr[0][1] !== arr[i][1]) {
      yInline = false;
    }
  }
  return xInline || yInline;
}
