"use strict";

$(function() {
    const SELECTORS = {
        "heroWrapper": ".cmp-hero__wrapper",
        "slickPrevArrow": ".slick-arrow.left",
        "slickNextArrow": ".slick-arrow.right"
    };
    
    function init(el) {
        $(el).data("initialized", true);
        $(el).slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: $(SELECTORS.slickPrevArrow),
            nextArrow: $(SELECTORS.slickNextArrow)
        });
    }

    $(SELECTORS.heroWrapper).each(function() {
        if(!$(this).data("initialized")) {
            init($(this));
        }
    });

});
