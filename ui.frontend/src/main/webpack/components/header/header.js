"use strict";

$(function() {
    const SELECTORS = {
        "NAV_MAIN": ".pcd-nav",
        "NAV_MENUITEMS": ".pcd-nav__menuitems",
        "NAV_MENUITEMSWRAPPER": ".pcd-nav__menu",
        "NAV_MENUITEM": ".menuitem",
        "NAV_SUBNAV": ".pcd-nav__subnav",
        "ACTIVE_SUBNAV": "active",
        "DROPDOWNBTN": ".pcd-nav__subnav--dropdown",
        "MOBILE_HMBG": ".hamburger"
    };
    
    function init(el) {
        let $el = $(el);

        $el.data("initialized", true);
        
        let $menuItems = $el.find(SELECTORS.NAV_MENUITEMS);
        
        if($menuItems.length) {
            initSubnavDropdown($menuItems);
        }

        let $hamburger = $(SELECTORS.MOBILE_HMBG);

        $hamburger.on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass(SELECTORS.ACTIVE_SUBNAV);

            let $menu = $el.find(SELECTORS.NAV_MENUITEMSWRAPPER);
            $(this).hasClass(SELECTORS.ACTIVE_SUBNAV) ?  $menu.slideDown() : $menu.slideUp();
        });
    }

    function initSubnavDropdown($menuItems) {
        if(!$menuItems.length) { return; }

        let $menuItem = $menuItems.find(SELECTORS.NAV_MENUITEM);

        $menuItem.each(function() {
            let $subNavItem = $(this).find(SELECTORS.NAV_SUBNAV);
            
            if(!$subNavItem.length) { return; }
            let $dropDownBtn = $(this).find(SELECTORS.DROPDOWNBTN);

            $(this).on('click', function() {
                $subNavItem.toggleClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.toggleClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.attr("aria-expanded", !($dropDownBtn.attr("aria-expanded") === "true"));
            });

            $(this).on('mouseenter mouseover', function() {
                $subNavItem.addClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.addClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.attr("aria-expanded", true);
            });

            $(this).on('mouseleave mouseout', function() {
                $subNavItem.removeClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.removeClass(SELECTORS.ACTIVE_SUBNAV);
                $dropDownBtn.attr("aria-expanded", false);
            });
        });
    }
    $(SELECTORS.NAV_MAIN).each(function() {
        if(!$(this).data("initialized")) {
            init($(this));
        }
    });

});
