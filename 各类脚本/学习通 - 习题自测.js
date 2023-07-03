// ==UserScript==
// @name         复习 - 隐藏超星答案
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       mslxl<i@mslxl.com>
// @match        https://mooc1.chaoxing.com/mooc2/work/view*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaoxing.com
// @grant        none
// ==/UserScript==


(function(){
     'use strict';
    function hideAll(event) {
        const tips = '<a style="text-decoration: underline;">点击显示答案</a>';
        const resetBtn = '<button onclick="__hide_all(event);">隐藏所有答案</button>';
        const item = document.querySelectorAll('.mark_answer');
        for(let t of item){
            if(!t.hasAttribute('inner')){
                let content = btoa(encodeURIComponent(resetBtn + t.innerHTML));
                t.setAttribute('inner', content);
                t.setAttribute('style', 'border: 1px solid black');
            }

            t.setAttribute('show', false);
            t.innerHTML = tips;
        }
        if(event){
            event.stopPropagation();
        }
        return false;
    }

    function register() {
        hideAll();
        window.__hide_all = hideAll;
        document.title = document.querySelector('.mark_title').innerText + ' - 作业详情';

        const tips = '<a style="text-decoration: underline;">点击显示答案</a>';
        const item = document.querySelectorAll('.mark_answer');
        for(let t of item){
            t.addEventListener('click', (node)=>{
                t.setAttribute('show', t.getAttribute('show') != 'true');
                if(t.getAttribute('show')=='false'){
                    t.innerHTML = tips;
                }else{
                    t.innerHTML = decodeURIComponent(atob(t.getAttribute('inner')));
                }
            });
        }
    }
    setTimeout(register,1000);
})()
