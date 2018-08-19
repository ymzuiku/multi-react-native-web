import * as React from 'react';
import { createMemoryHistory } from 'history';
import {
  Route,
  Router,
  Prompt,
  Redirect,
  Switch,
  withRouter,
} from 'react-router';

let position = '#';
let history = createMemoryHistory();

interface INowHistory {
  index: number;
  length: number;
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string | undefined;
}

let nowHistory: INowHistory = {
  index: 0,
  length: 1,
  pathname: '/',
  search: '',
  hash: '',
  state: undefined,
  key: '',
};

let historyListenFuncs: any = {};
let historyListenFuncsLength = 0;
let historyAddListen = (func: Function) => {
  historyListenFuncsLength += 1;
  historyListenFuncs[historyListenFuncsLength] = func;
  return historyListenFuncsLength;
};
let historyRemoveListen = (i: number) => {
  historyListenFuncs[i] = undefined;
};
history.listen(e => {
  try {
    if (nowHistory.key !== e.key) {
      nowHistory = {
        index: history.index,
        length: history.length,
        pathname: e.pathname,
        search: e.search,
        hash: e.hash,
        state: e.state,
        key: e.key,
      };
      if (window.location) {
        window.location.href = position + e.pathname;
      }
    }
    for (let key in historyListenFuncs) {
      if (historyListenFuncs[key]) {
        historyListenFuncs[key](history, e);
      }
    }
  } catch (err) {
    // err
  }
});

//监听触发操作
function hashChange() {
  try {
    let pathname = window.location.href.split(position)[1];
    // 当使用系统的返回按钮时(包括右滑)
    if (pathname !== nowHistory.pathname) {
      const pathname = history.entries[history.length - 2].pathname;
      for (let i = 0; i < history.length; i++) {
        if (history.index > 1) {
          history.goBack();
        }
      }
      history.push(pathname);
    }
  } catch (err) {
    // err
  }
}

if (!window.location) {
  window.location = {
    href: '',
    hash: '',
    pathname: '',
    hostname: '',
    port: '',
  };
}

try {
  //url变化监听器
  if (
    'onhashchange' in window &&
    (typeof document.documentMode === 'undefined' ||
      document.documentMode === 8)
  ) {
    // 浏览器支持 onhashchange 事件
    window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
  } else {
    let oldHash = window.location.hash;

    const isHashChanged = () => {
      return oldHash === window.location.hash;
    };

    // 不支持则用定时器检测的办法
    setInterval(function() {
      // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
      var ischanged = isHashChanged();
      if (ischanged) {
        // 对应新的hash执行的操作函数
        hashChange();
      }
    }, 350);
  }
} catch (err) {}

let goToHome = function() {
  const pathname = history.entries[1].pathname;
  for (let i = 0; i < history.length; i++) {
    if (history.index > 1) {
      history.goBack();
    }
  }
  history.push(pathname);
};
export {
  history,
  Route,
  Router,
  Prompt,
  Redirect,
  Switch,
  nowHistory,
  withRouter,
  hashChange,
  historyAddListen,
  historyRemoveListen,
  position,
  goToHome,
};
