// ==UserScript==
// @name        慕课，自动互评
// @match       https://www.icourse163.org/learn/*
// @grant       none
// @version     1.0
// @author      yrh
// @description 2022/3/19 21:09:54
// @license gpl-3.0
// ==/UserScript==

(function() {
    'use strict';

    window.pingfen = function() {
        var items = ["好，挺不错的","不错加油!", "再接再厉"];
        alert("即将互评当前页面打开的某人的作业！")
        var a = document.getElementsByClassName('s')
        for (let i = 0; i < a.length; ++i)
        {
            a[i].children[a[i].children.length-1].children[0].checked = true
        }
        var b = document.getElementsByTagName("textarea")
        for (let i = 0; i < b.length; ++i) {
            b[i].value = items[Math.floor(Math.random()*items.length)];
        }
    }

    function createButtonElement() {
        let button = document.createElement('button');
        button.innerText = '自动互评';
        button.className = 'floating-button';
        button.onclick = window.pingfen;

        return button;
    }

    function addFloatingButton() {
        let courseLearnInnerBox = document.querySelector('#courseLearn-inner-box');
        let floatingButton = createButtonElement();
        courseLearnInnerBox.appendChild(floatingButton);
        updateFloatingButtonPosition();
    }

    function updateFloatingButtonPosition() {
        let floatingButton = document.querySelector('.floating-button');
        let rect = floatingButton.getBoundingClientRect();
        let courseLearnInnerBox = document.querySelector('#bottombtnwrap f-cb j-btnwrap');
        let innerBoxRect = courseLearnInnerBox.getBoundingClientRect();
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

        let maxTop = innerBoxRect.height - rect.height;

        floatingButton.style.top = Math.min(maxTop, scrollTop + innerBoxRect.top) + 'px';
        floatingButton.style.right = (scrollLeft + 10) + 'px'; 
    }

    function runWhenReady(readySelector, callback) {
      var numAttempts = 0;
      var tryNow = function() {
          var elem = document.querySelector(readySelector);
          if (elem) {
              callback(elem);
          } else {
              numAttempts++;
              if (numAttempts >= 34) {
                  console.warn('Giving up after 34 attempts. Could not find: ' + readySelector);
              } else {
                  setTimeout(tryNow, 250 * Math.pow(1.1, numAttempts));
              }
          }
      };
      tryNow();
    }

    runWhenReady("#courseLearn-inner-box", addFloatingButton);


    window.addEventListener('scroll', updateFloatingButtonPosition);
})();
