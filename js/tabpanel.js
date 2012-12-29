(function ($, document, window) {
    'use strict';

    var domReady,
        tabPanels;

    /* Check if DOM is finished loading from document.readyState */
    domReady = function ready(e){/in/.test(document.readyState)?setTimeout(function(){ready(e)},40):e()}

    tabPanels = function () {
        var dropdown = $('.dropdown')[0],
            tabs = $('.masthead a'),
            panels = $('.panel'),
            masthead = $('.masthead')[0],
            activePanel;

        function togglePanel (panel) {
            if (panel.className.indexOf('active') > -1) {
                closePanel(panel);
            }
            else {
                openPanel(panel);
            }
        }

        function closePanel (panel) {
            panel.className = 'panel';
            panel.setAttribute('aria-hidden', 'true');
            activePanel = undefined;
            toggleDropdown();
        }

        function openPanel (panel) {
            closeAllPanels();
            panel.className = 'panel active';
            panel.setAttribute('aria-hidden', 'false');
            activePanel = panel;
            toggleDropdown();
            setHeightOfDropdown(panel.offsetHeight);
        }

        function closeAllPanels () {
            for (var i = panels.length - 1; i >= 0; i--) {
                panels[i].className = 'panel';
                panels[i].setAttribute('aria-hidden', 'true');
            }
            activePanel = undefined;
        }

        function toggleDropdown () {
            if ($('.active')[0] === undefined) {
                closeDropdown();
            }
            else {
                openDropdown();
            }
        }

        function closeDropdown () {
            masthead.className = 'masthead';
            dropdown.style.height = 0;
        }

        function openDropdown () {
            masthead.className = 'masthead open';
        }

        function setHeightOfDropdown (panelHeight) {
            dropdown.style.height = panelHeight + 'px';
        }

        function handleTabClick (tab, e) {
            togglePanel($('#' + tab.getAttribute('aria-controls'))[0]);
            e.preventDefault();
            e.returnValue = false;
        }

        function handleResize () {
            setHeightOfDropdown(activePanel.offsetHeight);
        }

        function bindClickEvent (tab) {
            tab.addEventListener("click", function (e) {
                handleTabClick(this, e);
            });
        }

        return {
            bindEvents: function () {
                for (var i = tabs.length - 1; i >= 0; i--) {
                    bindClickEvent(tabs[i]);
                }
                window.addEventListener('resize', function () {
                    handleResize();
                });
                window.addEventListener('orientationchange', function () {
                    handleResize();
                });
            }
        };
    };

    domReady(function () {
        tabPanels().bindEvents();
    });
    
})(window.Sizzle, document, window);