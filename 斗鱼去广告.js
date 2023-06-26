// ==UserScript==
// @name         斗鱼去广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除部分斗鱼播放器广告
// @author       You
// @match        https://www.douyu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  //Mutation Event version
  function remvoeNodeFromContainerME(containerSelector, nodeSelector) {
    let node = document.querySelector(nodeSelector);
    node && node.remove();

    let container = document.querySelector(containerSelector);
    container &&
      container.addEventListener('DOMNodeInserted', function () {
        let node = container.querySelector(
          `${containerSelector} ${nodeSelector}`
        );
        if (node) {
          node.remove();
        }
      });
  }

  //Mutation Observer version
  function remvoeNodeFromContainerMO(containerSelector, nodeSelector) {
    //remove node initially
    const node = document.querySelector(`${containerSelector} ${nodeSelector}`);
    node && node.remove();

    const container = document.querySelector(containerSelector);
    const config = { childList: true, subtree: true };
    const callback = function () {
      const childNode = container.querySelector(
        `${containerSelector} ${nodeSelector}`
      );
      if (childNode) {
        childNode.remove();
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(container, config);

    //observer.disconnect();
  }

  function removeNodeDirectly(selector) {
    const node = document.querySelector(selector);
    node && node.remove();
  }

  removeNodeDirectly('#js-room-activity');
  remvoeNodeFromContainerMO('#js-player-video', '.ScreenBannerAd');
})();
