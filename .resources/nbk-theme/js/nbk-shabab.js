var timelineInitialized = false;
var hasTimeLine = false;
$( document ).ready(function() {
    
	if ($(window).width() > 767) {
		$('.sh_offers_toggle_icon').click(function (e, element) {
	        var event_horizen = $(this).parent().hasClass('active');
	        var p = $(this);
	        e.preventDefault();
	        $('.sh_offers').removeClass('active');
	        $('.sh_offers .sh_offers_content').removeClass('active');
	
	        if (event_horizen != true) {
	            p.closest('.sh_offers').addClass('active');
	            p.closest('.sh_offers').find('.sh_offers_content').addClass('active');
	        }
	
	    });
	}
	
	if ($(window).width() <= 767) {
        $('.sh_offers_toggle_icon a').click(function () {
        	var sh_offer = $(this).parent().parent();
        	$('#offersModal').find('.modal_content').html($(sh_offer).find('.sh_after_details').html());
        	$('#offersModal').addClass('in').removeClass("fade");
            $('.backgroundOverlay').fadeIn(100);
            //$('body').addClass('modal-open');
            disable_scroll();
        })
        $('#offersModal .close').click(function () {
        	$('#offersModal').find('.modal_content').html('');
            $(this).parents('#offersModal').addClass("fade").removeClass('in')
            $('.backgroundOverlay').fadeOut();
            //$('body').removeClass('modal-open');
            enable_scroll();
        })
    }
	
	$(document).ready(function ($) {

        $(
            '.form-input-sec select.form-select',
        ).change(function () {
            if ($(this).val() == '' || $(this).val() == 'default')
                $(this).css({color: '#bbb'})
            else $(this).attr('style', 'color: #212121 !important')
        })
    });

    
    
    if ($(window).width() <= 1024) {
        $('.mobile_tooltip_boxes .sh_awedeal_logo_box').click(function () {
         	$('#AwesomeModal').find('.modal_content').html($(this).find('.sh_awedeal_hover_box').html());
            $('#AwesomeModal').addClass('in').removeClass("fade");
            $('.backgroundOverlay').fadeIn(100);
            //$('body').addClass('modal-open');
            disable_scroll();
        })
        $('#AwesomeModal .close').click(function () {
        	$('#AwesomeModal').find('.modal_content').html('');
            $(this).parents('#AwesomeModal').addClass("fade").removeClass('in')
            $('.backgroundOverlay').fadeOut();
            //$('body').removeClass('modal-open');
            enable_scroll();
        })
    }

    var logoHide = true;
    $(document).on('click', function(event) { //console.log(logoHide)
        if (logoHide == true){
            if (!$(event.target).parents().addBack().is('.sh_awedeal_hover_box')) {
                $('.sh_awedeal_logo_box').removeClass('active');
                $('.awadeel_sh_wrapper .mCSB_container').animate({'padding-bottom':0},1000);
            }
        }
        logoHide = true;
    });

    $('body').on('click', '.sh_awedeal_logo_box .sh_awedeal_logo_img', function (e) {
        e.preventDefault();
        var self = $(this).closest('.sh_awedeal_logo_box');
        if (self.hasClass('active')) {
            $('.sh_awedeal_logo_box').removeClass('active');
            $('.awadeel_sh_wrapper .mCSB_container').animate({'padding-bottom':0},1000);
            return false;
        }
        $('.sh_awedeal_logo_box').removeClass('active');
        self.toggleClass('active');
        logoHide = false;
        $('.awadeel_sh_wrapper .mCSB_container').css('paddingBottom','180px');
    });


    $('.sh_awedeal_hover_box .close').click(function (e, element) {
        e.preventDefault();
        $('.awadeel_sh_wrapper .mCSB_container').animate({'padding-bottom':0},1000);
        $('.sh_awedeal_logo_box').removeClass('active');
        //$(this).addClass('active');
        logoHide = true;
    });

    $('.load_more_shabab .light_btn').click(() =>  {
        if ($(".viewed_box_awadeal:not(.active)").length) {
            $('.viewed_box_awadeal:not(.active)').each(function (ix) { //console.log(ix)
                $(this).addClass('active');
                return (ix < 9)
            })
        }else{
            $('.load_more_shabab').addClass('d-none');
        }
    })
    $(window).scrollTop(0);
    $('html,body').scrollTop();
    $(".play_icon_cls_shabab img").click(function(){		
		var controlId = $(this).data('id');
		var iframe = $(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + '] iframe');
		var videoUrl = iframe.attr("data-src") + '?showinfo=0&modestbranding=1&rel=0&autoplay=1';

		iframe.attr('src', videoUrl);
		iframe.show();
		iframe.addClass('show');
		//alert($('.video-item').find('#pause-button[data-id=' + controlId + ']'));
		$(this).parents().eq(2).find('#pause-button-shabab[data-id=' + controlId + ']').addClass('show');
		$(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + ']').addClass('z-index');
	});
    $("#pause-button-shabab img").click(function(){
		var controlId = $(this).data('id');
		$(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + '] iframe').attr('src', '');
		$(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + '] iframe').hide();
		$(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + ']').removeClass('show');
		$(this).parents().eq(2).find('#pause-button-shabab[data-id=' + controlId + ']').removeClass('show');
		$(this).parents().eq(2).find('.video-iframe-shabab[data-id=' + controlId + ']').removeClass('z-index');
	});
    setTimeout(function() {
        if (hasTimeLine && !timelineInitialized) {
            timelineInitialized = true;
            if(window.location.hash) {
                var targetSection = $(window.location.hash);
                if(targetSection.length) {
                    var offset = targetSection.offset().top;
                    $('html, body').animate({
                        scrollTop: offset
                    }, 1000);
                }
            }
        }
    }, 4000);
});
//$(window).on('resize',function(){
//    location.reload();
//    $(window).scrollTop(0);
//    $('html,body').scrollTop()
//});
