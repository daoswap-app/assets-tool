// 数值排序
export function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value2 - value1;
  };
}
