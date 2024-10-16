/* Add your custom JavaScript code */
(function ( $ ) {
//----------------------------------------------------/
// UTILITIES
//----------------------------------------------------/

//Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };
}( jQuery ));

//for backward compatability with owl carousel
$.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
}

var owlRtl = false;
var lang = $('html').attr("lang");
if (typeof(lang) != 'undefined' && lang != null && lang == 'ar') {
    owlRtl = true;
}

$(document).ready(function() {
    $('.merchants_tabs li a').on('click', function (event) {
        event.preventDefault()
        $('.merchants_tabs li a').each(function () {
            var currImage = $(this).find('img')
            var currDefault = currImage.attr('data-default')
            currImage.attr('src', currDefault)
        });
        var currImage = $(this).find('img')
        var currActive = currImage.attr('data-active')
        currImage.attr('src', currActive)
    });
    if ($("#owl-demo").exists()) {
        $('div[id^="owl-demo"]').each(function () {
            $(this).addClass("owl-carousel owl-theme");
            $(this).owlCarousel({
                rtl:owlRtl,
                items : 4,
                lazyLoad : true,
                nav : true,
                margin: 20,
                slideBy: 1,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1,
                        nav:true
                    },
                    767:{
                        items:3,

                    },
                    1000:{
                        items:4,

                    }
                }

            });
        });
    }

    if ($("#owl-slider").exists()) {
        $('div[id^="owl-slider"]').each(function () {
            $(this).addClass("owl-carousel owl-theme");
            $(this).owlCarousel({
                rtl:owlRtl,
                items : 3,
                lazyLoad : true,
                nav : true,
                margin: 20,
                slideBy: 1,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1,
                        nav:true
                    },
                    767:{
                        items:3,

                    },
                    1000:{
                        items:3,

                    }
                }

            });
        });
    }

    $('.latest-offers-slider').each(function () {
        if($(this).find('.product').length <= 4){
            if($(this).find(".owl-controls").length == 1){
                $(this).find(".owl-controls").hide();
                $(this).find(".text-center").css('padding-top','40px');
            }
        }
    });

//	if($('.latest-offers-slider .product').length <= 4){
//		if($('.latest-offers-slider .owl-controls').length == 1){
//			$(".latest-offers-slider .owl-controls").hide();
//			$(".latest-offers-slider .text-center").css('padding-top','40px');
//		}
//	}

});

function getOrHideYearTableForReports(year) {
    $(".year").hide();
    $(".report-table-hide").hide();
    $("[data-year='" + year + "']").show();
    $("tr[data-year='" + year + "']").closest("table").show();
}
$(document).ready(function() {
    if($(".reports-in-presentation").length > 0){
        getOrHideYearTableForReports($(".last-active-year").data("year"));
    }
    $('#financial-reports ul li a').on('click', function(){
        var selectedYear = $(this).data("year");
        getOrHideYearTableForReports(selectedYear);

    });

    function setCookie(cname, cvalue, exdays, path) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
        if(path !== "/"){
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path + ".html";
        }
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    $('#accordionCookies input[type="checkbox"]').each(function() {
        var cookieConsentStatus = getCookie("cookieconsent_status");
        if (cookieConsentStatus !== null) {
            if (!$(this).is(':checked') && !$(this).is(':disabled')) {
                if (cookieConsentStatus.split('|').includes($(this).val())) {
                    // Check the checkbox
                    $(this).prop('checked', true);
                } else if (cookieConsentStatus === "accept") {
                    $(this).prop('checked', true);
                }
            }
        }
    });

    $('#updateCookieSettings').click(function() {
        var cookieConsentValue = "";
        var CurrentCookieConsentStatus = getCookie("cookieconsent_status");
        $('#accordionCookies input[type="checkbox"]:checked').each(function() {
            cookieConsentValue = cookieConsentValue + $(this).val() + "|";
        });
        cookieConsentValue = cookieConsentValue.replace(/\|$/, '');
        if(cookieConsentValue === "strict"){
            cookieConsentValue = "reject";
        }
        if(CurrentCookieConsentStatus !== "reject") {
            clearAllCookies();
        }
        hideCookieBanner();
        if(cookieConsentValue !== "reject" || CurrentCookieConsentStatus !== "reject") {
            setCookie("cookieconsent_status", cookieConsentValue, 365, homePath);
            location.reload();
        }else{
            $('#cookiesModal').modal('hide');
        }
    })

    function clearAllCookies() {
        // Get all cookies
        let cookies = document.cookie.split(";");

        // Loop through all cookies and delete them
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

            // Set the cookie expiration date to a past date to delete it
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    $('#cookiePolicyManage').on('click', function(){
        $('#cookiesModal').modal('show');
    });

    $('#cookiePolicyAccept').on('click', function(){
        hideCookieBanner();
        setCookie("cookieconsent_status", "accept", 365, homePath);
        location.reload();
    });

    $('#cookiePolicyReject').on('click', function(){
        var CurrentCookieConsentStatus = getCookie("cookieconsent_status");
        if(CurrentCookieConsentStatus !== "reject") {
            clearAllCookies();
        }
        hideCookieBanner();
        if(CurrentCookieConsentStatus !== "reject") {
            setCookie("cookieconsent_status", "reject", 365, homePath);
            location.reload();
        }
    })

    function hideCookieBanner(){
        setCookie("cookieBanner", cookieBannerVersion, 365, homePath);
        $("#cookie-banner").hide();
        $("body").removeClass("has-cookie-bar");
    }


    var visited = getCookie("cookieBanner");
    if (visited == null) {
        $("#cookie-banner").show();
    }else {
        if(cookieBannerVersion.length > 0 && cookieBannerVersion !== visited){
            $("#cookie-banner").show();
        }else {
            $("#cookie-banner").hide();
            $("body").removeClass("has-cookie-bar")
        }
    }

    $('.cookie-banner-container a').on('click', function(){
        hideCookieBanner();
    });

    if(typeof homePopupID !== 'undefined' && homePopupID != ""){
        var viewedPopup = getCookie(homePopupID);
        if (viewedPopup == null) {
            var homePopupModal = new bootstrap.Modal(document.getElementById('homePopupModal'), {
                backdrop: 'static',
                keyboard: false
            });
            homePopupModal.show();
            disable_scroll();
        }
        $('#popupClose').on('click', function(){
            hideHomePopup();
        });
        $('#popupButton1').on('click', function(){
            hideHomePopup();
        });
        $('#popupButton2').on('click', function(){
            hideHomePopup();
        });
    }
    function hideHomePopup(){
        var homePopupModal = bootstrap.Modal.getInstance(document.getElementById('homePopupModal'));
        homePopupModal.hide();
        setCookie(homePopupID, true, 5, homePath);
        enable_scroll();
    }

    $("#owl-demo-promotion").addClass("owl-carousel owl-theme");
    $("#owl-demo-promotion").owlCarousel({
        rtl:owlRtl,
        items : 4,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:3,

            },
            1000:{
                items:4,

            }
        }

    });

    var homeChooseCarouselOptions = {
        rtl:owlRtl,
        items : 10,
        lazyLoad : true,
        navigation : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:3,
                margin: 10,
                nav:true
            },
            767:{
                items:4,

            },
            1000:{
                items:5,

            }
        }

    };

    $('div[id="home-choose"]').each(function () {

        $(this).addClass("owl-carousel owl-theme");
        if ($(this).parents('.home-choose-slider').length) {
            var homeChooseCarouselOptions2 = {
                rtl:owlRtl,
                items : 10,
                lazyLoad : true,
                nav : true,
                margin: 20,
                slideBy: 1,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:3,
                        margin: 10,
                        nav:true
                    },
                    767:{
                        items:4,

                    },
                    1000:{
                        items:5,

                    }
                }

            };
            var $homeChooseFixedItem = $(".home-choose-slider .home-choose-fixed-item");
            if($homeChooseFixedItem.length > 0){
                homeChooseCarouselOptions2.dotsContainer = "#home-choose-dots-container .owl-dots";
                homeChooseCarouselOptions2.responsive = {
                    0:{
                        items:2,
                        margin: 10,
                        nav:true
                    },
                    546:{
                        items:2,

                    },
                    648:{
                        items:3,

                    },
                    767:{
                        items:4,

                    },
                    1000:{
                        items:5,

                    }
                };

            }
            var owl = $(this).owlCarousel(homeChooseCarouselOptions2);
            owl.on('changed.owl.carousel', function (event) {
                if (event.item.count - event.page.size == event.item.index){
                    $('#home-choose-dots-container').find('.owl-dots div:last')
                        .addClass('active').siblings().removeClass('active');
                }
            });
        }else{
            var owl = $(this).owlCarousel(homeChooseCarouselOptions);
            owl.on('changed.owl.carousel', function (event) {
                if (event.item.count - event.page.size == event.item.index){
                    $(event.target).find('.owl-dots div:last')
                        .addClass('active').siblings().removeClass('active');
                }
            });
        }
    });
});

$(document).ready(function() {

    $("#owl-demo-international").addClass("owl-carousel owl-theme");
    $("#owl-demo-international").owlCarousel({
        rtl:owlRtl,
        items : 4,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:3,

            },
            1000:{
                items:4,

            }
        }

    });
});

$(document).ready(function() {

    $("#owl-demo2").addClass("owl-carousel owl-theme");
    $("#owl-demo2").owlCarousel({
        rtl:owlRtl,
        items : 5,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:4,

            },
            1000:{
                items:5,

            }
        }

    });
});

$(document).ready(function() {

    $("#owl-demo3").addClass("owl-carousel owl-theme");
    $("#owl-demo3").owlCarousel({
        rtl:owlRtl,
        items : 2,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:1,

            },
            1000:{
                items:2,

            }
        }

    });
});

$(document).ready(function() {

    $("#relation-carousel").addClass("owl-carousel owl-theme");
    $("#relation-carousel").owlCarousel({
        rtl:owlRtl,
        items : 1,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:1

            },
            1000:{
                items:1

            }
        }

    });
});

$(document).ready(function(){
    $(".login-btn").click(function(){
        $(".country-dropdown").fadeOut();
        $(".notification-dropdown.res").fadeOut();
        $(".login-menu").slideToggle();
    });
});

$(document).ready(function(){
    $(".notification a img").click(function(){
        $(".login-menu").fadeOut();
        $(".mobile-menu-btn").fadeOut;
        $(".notification-dropdown.res").slideToggle();
    });
});

$(document).ready(function(){
    $(".notifications span img").click(function(){
        $(".notification-dropdown").slideToggle();

    });
    $(".notification-dropdown ul li").addClass('read');
    $(".notification-dropdown ul li").click(function(){
        $(this).removeClass('read');

    });
});

$(document).ready(function(){
    $(".flag").click(function(){
        $(".login-menu").fadeOut();
        $("#multiple").fadeOut();
        $(".notification-dropdown.res").fadeOut();
        $(".country-dropdown").slideToggle();
    });
});

$(document).ready(function(){
    $(".how-help span i").click(function(){
        $(".how-help span").toggleClass("drop");
        $(".saving-account").slideToggle();
    });
});

$(document).ready(function(){
    $(".mobile-menu-btn a").click(function(){
        $("#multiple").slideToggle();
        $(".nbk-tool-sec").css("z-index", "999999");
    });

    $(".main-links button").click(function () {
        $(".nbk-tool-sec").css("z-index", "999999");
    });
});

$(document).ready(function(){
    $(".flags").click(function(){
        $(".countrys-dropdown").slideToggle();
    });
});
/*Flags*/


$(document).ready(function(){
    $("#header-2 .search").click(function(){
        $(".search-section").slideToggle();
    });
    $(".share-btn a").click(function(){
        $(".social-share").slideToggle();
    });
});

$(document).ready(function(){
    $(".deop-flag").click(function(){
        $(this).toggleClass('toggle');
        $(".country-dropdownzz").slideToggle();
    });
});

/*$(document).ready(function(){

 $(".openAccordion").click(function(){
 $(this).parent().toggleClass('toggle');
 $(this).parent().find(".full-description-info").slideToggle();

 });
 });*/

$(document).ready(function(){
    $(".tool-toggle-btn").click(function(){
        $(".nbk-tool").toggleClass('out');
        $("body").toggleClass('scroll');
        $(".tool-box-wrapper").show();
        $(".loans-calculator").hide();
        $(".currency-calculator").hide();
        $(".weather").hide();
        $(".prayer-timing").hide();
        $(".termDeposit-calculator").hide();
        //miles calculator
        $(".miles-calculator").hide();
        $(".miles-calculator-result").hide();
        //jawahara calculator
        $(".jawahara-calculator").hide();
        $(".jawahara-calculator-result").hide();
        $(".iban").hide();
        $(".loans-refinance-calculator").hide();
        //reward calculator
        $('.reward-calculator').hide();
        $('.rewards-calculator-result').hide();
        //currency calculator
        $('#currencyConverterText').hide();
    });

    $(".nbk-tool h3 i").click(function(){
        $("body").removeClass('scroll');
        $(".nbk-tool").removeClass('out');
        $(".tool-box-wrapper").show();
        $(".loans-calculator").hide();
        $(".currency-calculator").hide();
        $(".weather").hide();
        $(".termDeposit-calculator").hide();
        $(".prayer-timing").hide();

    });

});



$(document).ready(function(){
    $(".prayer-timing-link").click(function(){
        $(".prayer-timing").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    $(".iban-link").click(function(){
        $(".iban").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    $(".loan-refinance-link").click(function(){
        $(".loans-refinance-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    $(".weather-link").click(function(){
        $(".weather").fadeIn();
        $(".tool-box-wrapper").hide();
    });

    $(".loan-link").click(function(){
        $(".loans-calculator").fadeIn();
        $(".hide").show();
        $(".tool-box-wrapper").hide();
    });

    //miles calculator
    $(".miles-calculator-link").click(function(){
        $(".miles-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    //jawhara calculator
    $(".jawhara-calculator-link").click(function(){
        $(".jawahara-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    $(".term-deposit-link").click(function(){
        $(".termDeposit-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    $(".currency-calculator-link").click(function(){
        $(".currency-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });
    //rewards calculator
    $(".reward-calculator-link").click(function(){
        $(".reward-calculator").fadeIn();
        $(".tool-box-wrapper").hide();
    });

    $(".nbk-tool .go-to-back h4 i").click(function(){
        $(".tool-box-wrapper").fadeIn();
        $(".loans-calculator").hide();
        $(".weather").hide();
        $(".prayer-timing").hide();
        $(".miles-calculator").hide();
        $(".termDeposit-calculator").hide();
        $(".iban").hide();
        $(".loans-refinance-calculator").hide();
        $(".jawahara-calculator").hide();
        $(".reward-calculator").hide();
        $(".currency-calculator").hide();

    });


    $(".news-headlines li").click(function(){
        $(this).toggleClass('tick');
    });

});


$(document).ready(function(){
    $(".term-res-menu i").click(function(){
        $(this).toggleClass('toggle');
        $(".term-nav ul").slideToggle();
    });


    $(".actual-font a").click(function(){
        $('body').css('zoom', '100%');
        $('body').css('zoom', '1.0');
        $('body').css('overflow-x', "hidden");
        $(".fix-width-for-zoom").removeClass("width100p");
    });

    $(".medium-font a").click(function(){
        $('body').css('zoom', '110%');
        $('body').css('zoom', '1.1');
        $('body').css('overflow-x', "scroll");
        $(".fix-width-for-zoom").addClass("width100p");
    });

    $(".large-font a").click(function(){
        $('body').css('zoom', '120%');
        $('body').css('zoom', '1.2');
        $('body').css('overflow-x', "scroll");
        $(".fix-width-for-zoom").addClass("width100p");
    });
    $(".term-nav.about-nav ul li a").click(function(e){
        $('.sticky-span-title').text($(this).text());
        if($('.term-res-menu i').hasClass("toggle")) {
            $(".term-res-menu i").toggleClass('toggle');
            $(".term-nav ul").slideToggle();
        }
    });

    $(document).on('touchstart', function(e) {
        if (!$(".term-nav").is(e.target) && $(".term-nav").has(e.target).length == 0){
            if($('.term-res-menu i').hasClass("toggle")){
                $(".term-res-menu i").toggleClass('toggle');
                $(".term-nav ul").slideToggle();
            }
        }
    });

});


$(window).resize(function () {
    var viewportWidth = $(window).width();
    if (viewportWidth < 992) {
        $(".addClearFix").addClass("clearfix");
    } else {
        $(".addClearFix").removeClass("clearfix");
    }
});
/*$(document).ready(function(){
 $(".repayment-month ul li").click(function(){
 $('.repayment-month ul li.checked').not(this).removeClass('checked');
 $(this).toggleClass('checked');
 })
 });*/
var owl;
$(document).ready(function(){
    $(".play-video img").click(function(){
        $(this).parents().eq(6).addClass( "video-item");
        if(owl){
            owl.trigger('stop.owl.autoplay');
        }
        var controlId = $(this).data('id');
        var iframe = $('.video-item').find('#video-sec[data-id=' + controlId + '] iframe');
        //var videoUrl = $('.video-item').find('#video-sec[data-id=' + controlId + '] iframe').attr("data-src") + '?showinfo=0&modestbranding=1&rel=0&autoplay=1';
        var videoUrl = iframe.attr("data-src") + '?showinfo=0&modestbranding=1&rel=0&autoplay=1';
        //var videoUrl = 'http://www.youtube.com/embed/geTgZcHrXTc?showinfo=0&modestbranding=1&rel=0&autoplay=1';

        iframe.attr('src', videoUrl);
        //$('.video-item').find('#video-sec[data-id=' + controlId + '] iframe').show();
        iframe.show();
        $('.video-item').find('#video[data-id=' + controlId + ']').addClass('show');
        //alert($('.video-item').find('#pause-button[data-id=' + controlId + ']'));
        $('.video-item').find('#pause-button[data-id=' + controlId + ']').addClass('show');
        $("#slider .owl-stage-outer").addClass('z-index');
    });
    $("#pause-button img").click(function(){
        var controlId = $(this).data('id');
        $('.video-item').find('#video-sec[data-id=' + controlId + '] iframe').attr('src', '');
        $('.video-item').find('#video-sec[data-id=' + controlId + '] iframe').hide();
        $('.video-item').find('#video[data-id=' + controlId + ']').removeClass('show');
        $('.video-item').find('#pause-button[data-id=' + controlId + ']').removeClass('show');
        $("#slider .owl-stage-outer").removeClass('z-index');
        if(owl){
            owl.trigger('play.owl.autoplay',10000);
        }
        $('.video-item').removeClass( "video-item");
    });
});


$(function () {

    $('.default').dropkick();



    $('.black').dropkick({

        theme : 'black'

    });



    $('.change').dropkick({

        change: function (value, label) {

            alert('You picked: ' + label + ':' + value);

        }

    });



    $('.existing_event').dropkick();



    $('.custom_theme').dropkick({

        theme: 'black',

        change: function (value, label) {

            $(this).dropkick('theme', value);

        }

    });



    $('.dk_container').first().focus();

});



$(document).ready(function(){
    $(".search-result-listing").slice(0, 4).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        $(".search-result-listing:hidden").slice(0, 4).slideDown();
        if ($(".search-result-listing:hidden").length == 0) {
            $("#load").fadeOut('slow');
            $("#loadMore").hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });

    $('.reports-listing').slice(0, 4).show();
    $("#loadMoreReports").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        $(".reports-listing:hidden").slice(0, 4).slideDown();
        if ($(".reports-listing:hidden").length == 0) {
            $("#load").fadeOut('slow');
            $("#loadMoreReports").hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);*/
    });

    $('.presentation-listing').slice(0, 3).show();
    $("#loadMorePresentations").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        $(".presentation-listing:hidden").slice(0, 3).slideDown();
        if ($(".presentation-listing:hidden").length == 0) {
            $("#load").fadeOut('slow');
            $("#loadMorePresentations").hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });

    $('.presentation-items').each(function(i, obj) {
        $(obj).find(".presentation-item").slice(0, 3).show();
    });

    $(".loadMoreInvestorPresentations").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        var cssClass ="." + $(this).data("id");
        $(cssClass + ":hidden").slice(0, 3).slideDown();
        if ($(cssClass + ":hidden").length == 0) {
            // $("#load").fadeOut('slow');
            $(this).hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });

    $('.offers-by-category').each(function(i, obj) {
        $(obj).find(".offer-by-category").slice(0, 6).show();
    });

    $(".loadMoreOffersByCategory").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        var cssClass ="." + $(this).data("id");
        $(cssClass + ":hidden").slice(0, 6).slideDown();
        if ($(cssClass + ":hidden").length == 0) {
            // $("#load").fadeOut('slow');
            $(this).hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });


    $('.treasury-cat').each(function(i, obj) {
        $(obj).find(".tr-report").slice(0, 4).show();
    });
    $(".loadMore").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        var cssClass ="." + $(this).data("id")
        $(cssClass + ":hidden").slice(0, 4).slideDown();
        if ($(cssClass + ":hidden").length == 0) {
            //$("#load").fadeOut('slow');
            $(this).hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });

    $('.small-videos').slice(0, 12).show();
    $("#loadMoreVideos").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        $(".small-videos:hidden").slice(0, 8).slideDown();
        if ($(".small-videos:hidden").length == 0) {
            $("#load").fadeOut('slow');
            $("#loadMoreVideos").hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });

    $('.small-interviews').slice(0, 20).show();
    $("#loadMoreInterviews").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
        $(".small-interviews:hidden").slice(0, 8).slideDown();
        if ($(".small-interviews:hidden").length == 0) {
            $("#load").fadeOut('slow');
            $("#loadMoreInterviews").hide();
        }
        /*
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 800);
         */
    });
});

$(document).ready(function() {
    $('.term-nav a[href^="#"]').click(function(e) {
        var hash = decodeURIComponent(this.hash).substring(1);
        var scroll = $(window).scrollTop();
        setTimeout(function(){
            if(scroll >= stickyOffset){
                $('html,body').animate({ scrollTop: jQuery('[id="' + hash + '"]').offset().top-30}, 1000);
            }
            else{
                $('html,body').animate({ scrollTop: jQuery('[id="' + hash + '"]').offset().top-110}, 1000);
            }
        },300);
        return false;
        e.preventDefault();
    });
    $(".applyNowProductDetails").click(function(e) {
        if(!$(this).hasClass("regular-link")) {
            $('html, body').animate({
                scrollTop: $("#apply").offset().top - 30
            }, 2000);
        }
    });
});

$(document).click(function (e)
{
    if (!$(".notifications").is(e.target) && $(".notifications").has(e.target).length == 0)
    {
        $(".notifications .notification-dropdown").fadeOut();
    }
});
$(document).click(function (e)
{
    if (!$(".notification").is(e.target) && $(".notification").has(e.target).length == 0)
    {
        $(".notification .notification-dropdown").fadeOut();
    }
});

$(document).click(function (e)
{
    if (!$(".coutries").is(e.target) && $(".coutries").has(e.target).length == 0)
    {
        $(".coutries .country-dropdown").fadeOut();
    }
});

$(document).click(function (e)
{
    if (!$(".header-bar").is(e.target) && $(".header-bar").has(e.target).length == 0 && !$(".main-links button").is(e.target) && $(".main-links button").has(e.target).length == 0)
    {
        $("#multiple").fadeOut();
    }
});
$(document).click(function (e)
{
    if (!$(".login").is(e.target) && $(".login").has(e.target).length == 0)
    {
        $(".login .login-menu").fadeOut();
    }
});

$(document).click(function (e)
{
    if (!$(".signature-dropdown").is(e.target) && $(".signature-dropdown").has(e.target).length == 0)
    {
        $(".signature-dropdown ul").removeClass("display-block");
        $(".signature-dropdown ul").addClass("display-none");
    }
});

$(document).click(function (e)
{
    if (!$(".share-btn").is(e.target) && $(".share-btn").has(e.target).length == 0)
    {
        $(".share-btn .social-share").fadeOut();
    }
});

$(document).click(function (e)
{
    if ($(".mobile-menu-btn a").is(e.target) && $(".mobile-menu-btn a").has(e.target).length == 0)
    {
        $(".nbk-tool-sec").css("z-index", "");
    }
});

$(document).click(function (e)
{
    if ($(".nbk-tool a").is(e.target) && $(".nbk-tool a").has(e.target).length == 0)
    {
        $(".nbk-tool-sec").css("z-index", "");
    }
});


$(document).click(function (e)
{
    if ($(".main-links button").is(e.target) && $("#multiple .main-links button").has(e.target).length == 0)
    {
        $(".nbk-tool-sec").css("z-index", "999999");
    }
});



$(document).click(function (e)
{
    if (!$(".search,.search-section").is(e.target) && $(".search,.search-section").has(e.target).length == 0)
    {
        $(".search-section").fadeOut();
    }
});


/*----------------Start js changes adnan-----------------------*/
$(document).ready(function(){
    $(".age span i").click(function(){
        $(".age span").toggleClass("drop");
        $(".age-info").slideToggle();
    });
    if($(".hide-title-from-cat").length > 0){
        $(".hide-title-from-cat").prev().prev().hide();
    }
});

$(document).ready(function(){
    $(".salary span i").click(function(){
        $(".salary span").toggleClass("drop");
        $(".salary-info").slideToggle();
    });
});
/*---------------JS end--------------------*/


$(document).ready(function(){
    $(".filter-text.visible-xs").click(function(){ //TODO: change on migration??
        $("#branch_form").slideToggle();
    });
});



$(document).ready(function(){
    $("#dk_container_day").hover(function(){
        $("#dk_container_day label.error").addClass('remove-border')
    });
});

$(document).ready(function(){
    $("#dk_container_year").hover(function(){
        $("#dk_container_year label.error").addClass('remove-border')
    });
});

$(document).ready(function(){
    $("#dk_container_month").hover(function(){
        $("#dk_container_month label.error").addClass('remove-border')
    });
});

$(document).ready(function(){
    $("#dk_container_nationality").hover(function(){
        $("#dk_container_nationality label.error").addClass('remove-border')
    });
});

$(document).ready(function(){
    $(".togglez span").click(function(){
        $(this).toggleClass('move');
        $(".toggle-container").slideToggle()
    });
});

$(document).ready(function(){
    $(".togglez span").click(function(){
        $(".reward-cards").toggleClass('cards-padding-reduce');
    });
});

$(document).ready(function(){
    var cardsCompareRewardsPage = $("#rewardCardCompare").data("link");
    var searchOffersByCard = $("#searchOffersByCard").data("link");
    var maxCardForSelect = 4;
    var cardsVals = [];

    jQuery('.active-border').each(function() {
        var currentElement = $(this);

        var selectedCard = currentElement.data("value");
        cardsVals.push(selectedCard);
    });
    $("#rewardCardCompare").attr("href", cardsCompareRewardsPage + cardsVals.join(","));
    $("#searchOffersByCard").attr("href", searchOffersByCard + cardsVals.join(","));
    if(cardsVals.length >=2 && cardsVals.length <= 4){
        $("#rewardCardCompare").removeClass("disabled-link");
    }else{
        $("#rewardCardCompare").addClass("disabled-link");
    }

    if(cardsVals.length > 4){
        $("#maxitemnotif").removeClass("hide");
    } else{
        $("#maxitemnotif").addClass("hide");
    }

    if(cardsVals.length >= 1){
        $("#searchOffersByCard").removeClass("disabled-link");
    }else{
        $("#searchOffersByCard").addClass("disabled-link");
    }
    $(".reward-cards .cardz ul li").click(function(){
        $(this).toggleClass('active-border');
        selectedCard = $(this).data("value");
        if ($(this).hasClass('active-border')){
            cardsVals.push(selectedCard);
        }else{
            var index = cardsVals.indexOf(selectedCard);
            cardsVals.splice(index, 1);
        }
        $("#rewardCardCompare").attr("href", cardsCompareRewardsPage + cardsVals.join(","));
        $("#searchOffersByCard").attr("href", searchOffersByCard + cardsVals.join(","));
        if(cardsVals.length >=2 && cardsVals.length <= 4){
            $("#rewardCardCompare").removeClass("disabled-link");
        }else{
            $("#rewardCardCompare").addClass("disabled-link");
        }

        if(cardsVals.length > 4){
            $("#maxitemnotif").removeClass("hide");
        } else{
            $("#maxitemnotif").addClass("hide");
        }


        if(cardsVals.length >= 1){
            $("#searchOffersByCard").removeClass("disabled-link");
        }else{
            $("#searchOffersByCard").addClass("disabled-link");
        }

    });
});

$(document).ready(function(){
    $(".heart-icon").click(function(){
        $(this).toggleClass('active');
    });
});

$(document).ready(function(){
    $("button.pull-right.right").click(function(){
        $(".selectz label.error").removeClass('remove-border')
    });

    $(".close-mobile-wrapper").click(function(e){
        $(".mobile-app-wrapper").hide();
    });
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        console.log("Android");
        $(".google-store").show();
        $(".android-link").show();
        $(".ios-store").hide();
        $(".ios-link").hide();
    }else if(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        console.log("iOS");
        $(".google-store").hide();
        $(".android-link").hide();
        $(".ios-store").show();
        $(".ios-link").show();
    }else{
        console.log("not mobile app, hide wrapper");
        $(".mobile-app-wrapper").hide();
    }

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();

        if( scroll > 150 ){
            $(".mobile-app-wrapper").addClass("mobile-wrapper-sticky");
        }else{
            $(".mobile-app-wrapper").removeClass("mobile-wrapper-sticky");
        }
    });


    $('.tutorial-search-form').on('submit',function(){return false;});
    $('.tutorial-search-form button').on('click', function(e){
        var query = $.trim($(this).prevAll('.search-query').val()).toLowerCase();
        $('div.tutorialBox .reports-details').each(function(){
            var $this = $(this);
            if($this.text().toLowerCase().indexOf(query) === -1){
                $this.closest('div.reports-custom').parent().fadeOut();
            }
            else{
                $this.closest('div.reports-custom').parent().fadeIn();
            }
        });
        setTimeout(function(){
            if ($('div.tutorialBox .reports-details:visible').length == 0) {
                $(".no-tutorial").fadeIn();
            } else {
                $(".no-tutorial").fadeOut();
            }
        }, 500);
    });

});

$(document).ready(function() {
    $("#product_slider").addClass("owl-carousel owl-theme");
    $("#product_slider").owlCarousel({
        rtl:owlRtl,
        items : 2,
        lazyLoad : true,
        nav : true,
        margin: 20,
        slideBy: 1,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
                nav:true
            },

            767:{
                items:6,
            },

            1000:{
                items:8,
            }
        }
    });
});


function initMap(element) {

    var markers = [];

    var zoomLevel = 7;
    var zoomLat = 47.363;
    var zoomLong = 8.544;

    //START OLD CODE - retrocompatibility
    if (!element) {
        element = document.getElementById('map');
    }
    //END OLD CODE - retrocompatibility

    var map = new google.maps.Map(element, {
        zoom: zoomLevel,
        center: {lat: zoomLat, lng: zoomLong}
    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    infowindow = new google.maps.InfoWindow();

    var marker, i;
    if (typeof(locations) != 'undefined' && locations != null)
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][0], locations[i][1]),
                map: map,
                icon: contextPath + '/.resources/nbk-theme/images/nbk/rewards-detail/location.png'
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent("");
                    infowindow.open(map, marker);
                }
            })(marker, i));

            markers.push(marker);
        }

    function AutoCenter() {
        var bounds = new google.maps.LatLngBounds();
        $.each(markers, function (index, marker) {
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }

    AutoCenter();
}

$(document).ready(function() {
    if(typeof google  !== "undefined"){
        $("#map").each(function (index, element) {
            google.maps.event.addDomListener(window, 'load', initMap(this));
        });
    }
});


$(document).ready(function(){


    $("#controls .play").click(function(){


        $(this).hide();


        $("#controls .pause").show();

    });



    $("#controls .pause").click(function(){

        $(this).hide();

        $("#controls .play").show();


    });

});


$(document).ready(function(){

    $(".signature-dropdown .visa-sec").click(function(){
        if($(".signature-dropdown ul").hasClass("display-none")){
            $(".signature-dropdown ul").removeClass( "display-none" ).addClass( "display-block" );
        }else if($(".signature-dropdown ul").hasClass("display-block")){
            $(".signature-dropdown ul").removeClass( "display-block" ).addClass( "display-none" );
        }
    });

});



$(document).ready(function(){

    $(".suggest-outlet > a").click(function(){
        $(".subscribe-poup").hide();
        $(this).prev().fadeToggle();

    });

});

$(document).ready(function(){
    $(".close-form i").click(function(){
        $(this).parents(".subscribe-poup").fadeOut();
    });

});

$(document).ready(function(){
    $(".heart-icon").click(function(){
        $(this).toggleClass('active');
    });
});

$(document).ready(function(){
    $(".reward-res-tab.visible-xs").click(function(){ //TODO: change on migration??
        $(".reward-center-tab .tab-btns ").slideToggle();
    });
});

$(document).ready(function() {

    $('#only-one [data-accordion]').accordion();

    $('#multi [data-accordion]').accordion({

        singleOpen: false

    });

    $('#single[data-accordion]').accordion({

        transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

        transitionSpeed: 200

    });

});


$("#reset").click(function () {

    $('form').find('input:text, input:password, input:tel, select, textarea').val('');

    $(".holder").show();

    $(".form-control").removeClass('error');



});




$(document).ready(function() {
    $(function() {


        $(".holder + input, .holder + textarea").each(function (index, item) {
            if($(item).val().length) {
                $(item).prev('.holder').hide();
            } else {
                $(item).prev('.holder').show();
            }
        });
        $(".holder + input, .holder + textarea").keyup(function() {
            if($(this).val().length) {
                $(this).prev('.holder').hide();
            } else {
                $(this).prev('.holder').show();
            }
        });
        $(".holder").click(function() {
            $(this).next().focus();
        });
    });
});
$(document).ready(function(){
    $(".fav-form").click(function(){
        $(".subscribe-poup").hide();
        $(".subscribe-poup.lifestyle-form").fadeIn();
    });
});

$(document).ready(function(){
    $(".reward-center-tab .tab-btns.visible-mobile li a").click(function(){
        $(".reward-center-tab .tab-btns.visible-mobile").fadeOut();
    });
});

$( document ).ready(function() {
    $(".refresh-captcha").click(function (event) {
        event.preventDefault();
        captcha.update();
    });


    window.captcha = {
        update: function () {
            var captchaImage = $(".captcha-img");
            captchaImage.attr("src", contextPath + "/.jcaptcha?cache=" + Math.random());
        }
    };
});

$(document).ready(function(){
    var tagVals = [];

    $(".favorite-tags.in-form ul li").click(function(){
        $(this).toggleClass('active');
        selectedTag = $(this).data("value");
        if ($(this).hasClass('active')){
            tagVals.push(selectedTag);
        }else{
            var index = tagVals.indexOf(selectedTag);
            tagVals.splice(index, 1);
        }
        $("#tags").attr("value", tagVals.join(","));
    });

    //login register
    $(document).on('click', '.reg-submit', function(e){
        e.preventDefault();
        var form = $(this).closest("form");
        var email = form.find('input[name="email"]').val();
        var phonenumber = form.find('input[name="phonenumber"]').val();
        var pageid = form.find('input[name="pageid"]').val();
        var language = form.find('input[name="language"]').val();
        var valres = validateNumberAndEmail(form, email, phonenumber);
        if(valres === ""){
            $.ajax({
                type: 'POST',
                url: contextPath + "/.rest/rewards/loginOrRegister?email=" + email + "&phonenumber=" + phonenumber+"&pageid=" + pageid+ "&language=" + language,
                encode: true,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    window.location.reload();
                },
                error: function (data) {
                    if(data.status == "417"){
                        $(".invalidEmailOrPhone").show();
                    }else{
                        $(".loginErrorServer").show();
                    }

                }
            });
        }
    });

    //suggest outlet
    $(document).on('click', '.suggestOutletBtn', function(e){
        e.preventDefault();
        var form = $(".suggest-outlet-form");
        var email = $("#email").val();
        var fullname = $("#fullname").val();
        var contentid = $("#contentid").val();
        var message = $("#message").val();
        $(".loginError").hide();
        valResult = true;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email === ""){
            $('.suggestOutletEmptyEmail').show();
            valResult = false;
            return;
        }else if(!re.test(String(email).toLowerCase())) {
            $('.suggestOutletInvalidEmail').show();
            valResult = false;
            return;
        }
        if(fullname === ""){
            $('.suggestOutletEmptyName').show();
            valResult = false;
            return;
        }

        if(message ===""){
            $(".suggestOutletEmptyMessage").show();
            valResult = false;
            return;
        }

        if(valResult){
            $.ajax({
                type: 'POST',
                url: contextPath + "/.rest/rewards/suggestOutlet?fullname=" + fullname + "&email=" + email+"&contentid=" + contentid + "&message=" + message,
                encode: true,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    window.location.reload();
                },
                error: function (data) {
                    $(".suggestOutletloginErrorServer").show();
                }
            });
        }

    });


    function validateNumberAndEmail(form, email, phonenumber) {
        $(".loginError").hide();
        if(email === "" && phonenumber === ""){
            form.find('.loginErrorEmptyFormFields').show();
            return null;
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === ""){
            form.find('.emptyEmail').show();
            return "emptyemail";
        } else if(!re.test(String(email).toLowerCase())){
            form.find('.invalidEmail').show();
            return "invalidemail";
        }

        if(phonenumber === ""){
            form.find('.emptyPhoneNumber').show();
            return "emptyphonenumber";
        }

        return "";
    }


    //add to favorites
    $(document).on('click', '.addToFavorite', function(e){
        var offerid = $(this).attr("data-offer-id");
        var $button = $(this);
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/rewards/addToFavorites?offerId=" + offerid,
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $button.removeClass("addToFavorite").addClass("removeFromFavorite");
            },
            error: function (data) {

            }
        });

    });
    $(document).on('click', '.removeFromFavorite', function(e){
        var offerid = $(this).attr("data-offer-id");
        var $button = $(this);
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/rewards/removeFromFavorites?offerId=" + offerid,
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $button.removeClass("removeFromFavorite").addClass("addToFavorite");
            },
            error: function (data) {

            }
        });
    });

    $(document).on('click', '.likeOffer', function(e){
        var offerid = $(this).attr("data-offer-id");
        var $button = $(this);
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/rewards/likeOffer?offerId=" + offerid,
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $button.removeClass("likeOffer").addClass("unlikeOffer");
                var totalNumberOfLikes = parseInt($(".numberOflikes").text()) + 1;
                $(".numberOflikes").text(totalNumberOfLikes)
            },
            error: function (data) {

            }
        });
    });


    $(document).on('click', '.unlikeOffer', function(e){
        var offerid = $(this).attr("data-offer-id");
        var $button = $(this);
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/rewards/unlikeOffer?offerId=" + offerid,
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $button.removeClass("unlikeOffer").addClass("likeOffer");
                var totalNumberOfLikes = parseInt($(".numberOflikes").text()) - 1;
                $(".numberOflikes").text(totalNumberOfLikes)
            },
            error: function (data) {

            }
        });
    });

    $('.starrr').starrr({
        rating: parseInt($(".rating-offer").data("average-rating")),
    });
    $('.starrr').on('starrr:change', function(e, value){
        var offerid = $(".starrr").attr("data-offer-id");
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/rewards/rateOffer?rate=" + value + "&offerId=" + offerid,
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $(".starrr").hide();
                $(".thanks-for-rating").show();

            },
            error: function (data) {

            }
        });
    });
    $('.starrr-result').starrr({
        rating: parseInt($(".rating-offer").data("average-rating")),
        readOnly: true
    });
    $('.starrr-result-anonymous').starrr({
        rating: parseInt($(".rating-offer").data("average-rating"))
    });
    $('.starrr-result-anonymous').on('starrr:change', function(e, value){
        $(".subscribe-poup").hide();
        $(this).prev().addClass("rating-login-form-position").fadeToggle();
    });
    $(".thanks-for-rating").click(function () {
        $('.starrr-result').show();
        $(this).hide();
    });

    $(".facebook-likes.login-with-button-wrapper > a").click(function(){
        $(".subscribe-poup").hide();
        $(this).prev().addClass("like-login-form-position").fadeToggle();

    });

    $(".wish-list > a").click(function(){
        $(".subscribe-poup").hide();
        $(this).prev().addClass("my-fav-login-form-position").fadeToggle();

    });


    //add tags
    $(document).on('click', '.addTagsAction', function(e){

        var $button = $(this);
        e.preventDefault();
        var values = $("#tags").val();

        var email = $("#emailLifetime").val();
        var phone = $("#phoneLifetime").val();
        var valres = validateNumberAndEmail($("#lifeTimeSubscriptionForm"), email, phone);
        if(values == ""){
            $(".noTagsSelected").show();
        }else{
            $(".noTagsSelected").hide();
        }
        if(valres === "") {
            $.ajax({
                type: 'POST',
                url: contextPath + "/.rest/rewards/addTags?selectedTag=" + values + "&email=" + email + "&phone=" + phone,
                encode: true,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#ltsubsuccess").slideDown();

                },

                error: function (data) {
                    $(".loginErrorServer").show();
                }
            });
            return false;
        }
    });


    $(".favorite-tags .btn.btn-default.pull-left.addTagsAction").on("click", function () {
        $(this).parents(".subscribe-poup").fadeOut();
    });

    $(".add-favorite.login-with-button-wrapper > a").click(function(){
        $(".subscribe-poup").hide();
        $(this).prev().addClass("favorite-login-form-position").fadeIn();
    });
    $(".showLoginFormFromOfferList").click(function(){
        $(".list-offers-login").fadeIn();
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".list-offers-login").offset().top
        }, 2000);

    });

    $(document).ready(function(){
        $(".reward-center-tab .tab-btns li:first-child").click(function(){
            $(".featured-sel").fadeIn();
            $(".expiring-sel").hide();
            $(".near-sel").hide();
            $(".recently-sel").hide();
        });
        $(".reward-center-tab .tab-btns li:nth-child(2)").click(function(){
            $(".featured-sel").hide();
            $(".expiring-sel").fadeIn();
            $(".near-sel").hide();
            $(".recently-sel").hide();
        });
        $(".reward-center-tab .tab-btns li:nth-child(3)").click(function(){
            $(".featured-sel").hide();
            $(".expiring-sel").hide();
            $(".near-sel").fadeIn();
            $(".recently-sel").hide();
        });
        $(".reward-center-tab .tab-btns li:nth-child(4)").click(function(){
            $(".featured-sel").hide();
            $(".expiring-sel").hide();
            $(".near-sel").hide();
            $(".recently-sel").fadeIn();
        });
    });
});
var xmlvar;

$(function() {
    $(".match-col").matchHeight();
    $( window ).resize(function() {
        $(".match-col").matchHeight();
    });
});

//DESKTOP


//PREVENT DEFAULT HANDLER
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}
//PREVENT SCROLL KEYS
//spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
//left: 37, up: 38, right: 39, down: 40,
//(Source: http://stackoverflow.com/a/4770179)
function keydown(e) {
    var keys = [32,33,34,35,36,37,38,39,40];
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}
//PREVENT MOUSE WHEEL
function wheel(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}
//DISABLE SCROLL
function disable_scroll() {
    if (document.addEventListener) {
        document.addEventListener('wheel', wheel, false);
        document.addEventListener('mousewheel', wheel, false);
        document.addEventListener('DOMMouseScroll', wheel, false);
    }
    else {
        document.attachEvent('onmousewheel', wheel);
    }
    document.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;

    x = window.pageXOffset || document.documentElement.scrollLeft,
        y = window.pageYOffset || document.documentElement.scrollTop,
        window.onscroll = function() {
            window.scrollTo(x, y);
        };
//	document.body.style.overflow = 'hidden'; // CSS
    disable_scroll_mobile();
}
//ENABLE SCROLL
function enable_scroll() {
    if (document.removeEventListener) {
        document.removeEventListener('wheel', wheel, false);
        document.removeEventListener('mousewheel', wheel, false);
        document.removeEventListener('DOMMouseScroll', wheel, false);
    }
    document.onmousewheel = document.onmousewheel = document.onkeydown = null;
    window.onscroll = function() {};
//	document.body.style.overflow = 'auto'; // CSS
    enable_scroll_mobile();
}

//MOBILE
function disable_scroll_mobile(){
    document.addEventListener('touchmove', preventDefault, false);
}
function enable_scroll_mobile(){
    document.removeEventListener('touchmove', preventDefault, false);
}