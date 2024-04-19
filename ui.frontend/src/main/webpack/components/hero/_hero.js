"use strict";

$(function() {
    const SELECTORS = {
        "heroWrapper": ".pm-hero-wrapper",
        "heroItem": ".pm-hero-item"
    };
    
    function init(el) {
        $(el).data("initialized", true);
        $(el).slick({arrows: false});
        console.log("Initialized hero: ");
        console.log($(el));
        console.log("This is a small change for me, a great leap for this project.");
    }

    $(SELECTORS.heroWrapper).each(function() {
        if(!$(this).data("initialized")) {
            init($(this));
        }
    });

});