// ==UserScript==
// @name         斗鱼送鱼丸
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douyu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  fetch('https://www.douyu.com/japi/prop/backpack/web/v1?rid=5110403', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
    },
    referrer:
      'https://www.douyu.com/5110403?dyshid=205656-c1419c27ba9f326f695e593f00061601&dyshci=2',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(async (rsp) => {
    const response = await rsp.json();
    if (response.msg == 'success') {
      if (response.data.list.length != 0) {
        showIcon();
      }
    }
  });

  function showIcon() {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.style.backgroundColor = 'red';
    div.style.backgroundImage =
      'url(https://apic.douyucdn.cn/upload/avanew/face/201709/03/15/2958546e2f2e4d7c0bf0238759521ff8_big.jpg)';
    div.style.backgroundRepeat = 'round';
    div.style.borderRadius = '15px';
    div.style.cursor = 'pointer';
    div.id = 'sherlock-custom-icon';
    div.onclick = function () {
      douyuYuwan();
    };
    document.body.appendChild(div);
  }

  async function douyuYuwan() {
    //edit data here in the following format: [roomId, amount];
    const list = [['69023', 1], ['3168536']];
    let defaultNum = 1;

    while (list.length > 0) {
      let [roomId, number] = list.shift();
      number = number || defaultNum;
      //console.log(`正在送出鱼丸${number}`);
      await douyuFetch(roomId, number).then(async (rsp) => {
        const response = await rsp.json();
        if (response.msg == 'success') {
          //console.log(`送出鱼丸${number || defaultNum}`);
          defaultNum = response.data.list[0].count;
          //console.log(`defaultNum set to ${defaultNum}`);
        }
      });
    }
  }

  function douyuFetch(roomid, amount) {
    return fetch('https://www.douyu.com/japi/prop/donate/mainsite/v1', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `propId=268&propCount=${amount}&roomId=${roomid}&bizExt=%7B%22yzxq%22%3A%7B%7D%7D`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
  }
})();
