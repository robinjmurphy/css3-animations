(function($){
    'use strict'

    var domReady,
        tabPanels;

    /* Check if DOM is finished loading from document.readyState */
    domReady = function ready(e){/in/.test(document.readyState)?setTimeout(function(){ready(e)},40):e()}

    tabPanels = function () {
        var dropdown = $('.dropdown')[0],
            tabs = $('.masthead a'),
            pages = $('.page'),
            masthead = $('.masthead')[0];

        function togglePage (page) {
            if (page.className.indexOf('active') > -1) {
                closePage(page);
            }
            else {
                openPage(page);
            }
        }

        function openPage (page) {
            closeAllPages();
            page.className = 'page active';
            page.setAttribute('aria-hidden', 'false');
            toggleDropdown();
            setHeightOfDropdown(page.offsetHeight);
        }

        function closePage (page) {
            page.className = 'page';
            page.setAttribute('aria-hidden', 'true');
            toggleDropdown();
        }

        function closeAllPages () {
            for (var i = pages.length - 1; i >= 0; i--) {
                pages[i].className = 'page';
                pages[i].setAttribute('aria-hidden', 'true');
            };
        }

        function toggleDropdown () {
            if ($('.active')[0] === undefined) {
                closeDropdown();
            }
            else {
                openDropdown();
            }
        }

        function openDropdown () {
            masthead.className = 'masthead open';
        }

        function closeDropdown () {
            masthead.className = 'masthead';
            dropdown.style.height = 0;
        }

        function setHeightOfDropdown (pageHeight) {
            dropdown.style.height = pageHeight + 'px';
        }

        return {
            bindEvents: function () {
                for (var i = tabs.length - 1; i >= 0; i--) {
                    tabs[i].addEventListener("click", function(e){
                        togglePage($('#' + e.srcElement.getAttribute('aria-controls'))[0]);
                        e.returnValue = false;
                    });
                }
            }
        }
    }

    domReady(function(){
        tabPanels().bindEvents();
    });
})(window.Sizzle);