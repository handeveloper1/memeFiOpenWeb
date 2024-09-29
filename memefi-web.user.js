// ==UserScript==
// @name         MemeFI web
// @version      1.6
// @description  Running MemeFI in a browser
// @match        https://tg-app.memefi.club/*
// @grant        none
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/29373.png
// ==/UserScript==

(function() {
    'use strict';

    const originalUrl = 'https://telegram.org/js/telegram-web-app.js';
    const newUrl = 'https://mudachyo.codes/universal/telegram-web-app.js';

    // Create a MutationObserver to watch for script tags being added to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT' && node.src === originalUrl) {
                    node.src = newUrl;
                }
            });
        });
    });

    // Function to check for connection error element
    function checkConnectionFailed() {
        const errorElement = document.querySelector('h3.MuiTypography-root.MuiTypography-h3.css-gwcfg4');
        const errorMessages = [
            'Connection Failed',
            'اتصال ناموفق'
        ];
        if (errorElement && errorMessages.includes(errorElement.textContent.trim())) {
            const messageEn = 'In order to fix this error, you need to install Resource Override and specify the necessary settings in it.';
            const replaceValuesMessageEn = 'You need to replace the values in Resource Override.';
            const updateDateEn = 'Instruction update date: 24.09.2024';
            const message = `${messageEn}<br><br>${replaceValuesMessageEn}<br><br>${updateDateEn}`;
            const div = document.createElement('div');
            div.innerHTML = message;
            div.style.position = 'fixed';
            div.style.top = '10px';
            div.style.left = '10px';
            div.style.backgroundColor = '#222';
            div.style.color = 'white';
            div.style.border = '1px solid #444';
            div.style.padding = '15px';
            div.style.borderRadius = '5px';
            div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            document.body.appendChild(div);
        }
    }

    // Run the connection check every second
    setInterval(checkConnectionFailed, 1000);
    
    // Start observing the document for script tags being added
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Override the appendChild method to replace the script URL
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child) {
        if (child.tagName === 'SCRIPT' && child.src === originalUrl) {
            child.src = newUrl;
        }
        return originalAppendChild.call(this, child);
    };

})();
