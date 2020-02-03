// @flow

declare var BMap: Object;

declare type RouterConfig = {
  key?: string,
  children?: { key?: string, name?: string, path: string, component: any }[],
  router?: { path: string, component: any },
  image: React$Element<any>,
  name: string,
}[];

declare type disPromise<T> = (T) => Promise<*>;

declare type TimeoutID = number;
