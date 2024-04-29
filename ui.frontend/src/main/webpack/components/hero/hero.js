"use strict";

$(function() {
    const SELECTORS = {
        "heroWrapper": ".cmp-hero__wrapper",
        "slickPrevArrow": ".slick-arrow.left",
        "slickNextArrow": ".slick-arrow.right"
    };

    const responsive = [
        {
          breakpoint: 1024,
          settings: {
            arrows: true,
            dots: true
          }
        },
        {
            breakpoint: 1023,
            settings: {
              arrows: false,
              dots: false,
            }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            dots: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: false,
          }
        }
    ];
    
    function init(el) {
        $(el).data("initialized", true);
        $(el).slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            adaptiveHeight: true,
            prevArrow: $(SELECTORS.slickPrevArrow),
            nextArrow: $(SELECTORS.slickNextArrow),
            responsive: responsive
        });
    }

    $(SELECTORS.heroWrapper).each(function() {
        if(!$(this).data("initialized")) {
            init($(this));
        }
    });

});
