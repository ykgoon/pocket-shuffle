// ==UserScript==
// @name         Pocket Shuffle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Randomized article order
// @author       Y.K. Goon
// @match        https://getpocket.com/my-list
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const initTimer = setInterval(start, 3000);

    function start(){
        // Look for posts to show up
        var posts = document.getElementsByTagName('article');

        // If there's no post loaded we quit and wait some more
        if (posts.length == 0) return;

        // Add Shuffle button to navigation
        var nav = document.getElementsByTagName('nav');
        var shuffleBtn = nav[1].childNodes[1].cloneNode(false);
        shuffleBtn.innerHTML = '<span class="igxbmuu icon side-nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/><path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/></svg></span>';
        shuffleBtn.appendChild(document.createTextNode("Shuffle"));
        nav[1].insertBefore(shuffleBtn, nav[1].childNodes[1]);

        shuffleBtn.onclick = function shuffle(){
            var articleParent = posts[0].parentNode;
            var list = articleParent, i;
            for (i = list.children.length; i >= 0; i--) {
                list.appendChild(list.children[Math.random() * i | 0]);
            }
        }

        clearInterval(initTimer);
    }
})();
