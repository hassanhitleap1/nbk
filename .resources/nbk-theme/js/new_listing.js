$(document).ready(function () {
	var arabic_ver = $('html').attr('lang') == 'ar';
	if(arabic_ver == true) {
		var dir_rtl = true;
	}else {
		var dir_rtl = false;
	}
	if ($(".added_featuers_slider").length) {
		$(".added_featuers_slider").slick({
			slidesToShow: 3,
			loop: true,
			slidesToScroll: 1,
			nav: true,
			rtl: dir_rtl,
			margin: 10,
			dots: false,
			infinite: false,
			// arrows: true,
			responsive: [{
				breakpoint: 4500,
				settings: {
					slidesToShow: 3,
					dots: false,
				}
			}, {
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					margin: 10,
					dots: false,
				}
			}]
		});
	}

	$("#searchBrandNames").on('input', function () {

		var searchTerm = $(this).val().trim().toLowerCase();
		if(searchTerm == ''){
			$('.partner-listing').each(function(){
				$(this).find(".brand-names-bx").css("display", 'none');
				$(this).find(".brand-names-bx").slice(0, 32).css("display", '');
			});
			$('.loadmore-brand-wrap').each(function(){
				if($(this).data('hidden')){
					$(this).css("display", 'none');
				}else{
					$(this).css("display", '');
				}
			});
			$("div #brand_name_no_records").each(function(){
				$(this).css("display", 'none')
			});
		}else{

			var html = '';
			var brandNames = [];

			var nameTags = $('#brandNames a.brand-names-bx');

			var m = 0;
			$.each(nameTags , function(indx, val) {
				var elemt_val = $(this).html().trim().toLowerCase();

				if( elemt_val.includes(searchTerm) ){
					$(this).css("display", '');
					m++;
				}else{
					$(this).css("display", "none");
				}

			});
			if(m >0){
				$('.loadmore-brand-wrap').css("display", 'none');
				$("div #brand_name_no_records").each(function(){
					$(this).css("display", 'none')
				});
			}else{
				$("div #brand_name_no_records").each(function(){
					$(this).css("display", '')
				});
				$('.loadmore-brand-wrap').css("display", 'none');
			}
		}

	}); //end search


	$('#only-one [data-accordion]').accordion();

	$('#multiple [data-accordion]').accordion({
		singleOpen: false
	});

	$('#single[data-accordion]').accordion({
		transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
		transitionSpeed: 200
	});

	var minMonthlySpendGlobal = parseFloat($("#reward_min_monthly_spend").val());
	var maxCashbackGlobal = parseFloat($("#reward_max_cashback_global").val());

	$('input.shoping-cart-checkbx').on('click', function (e) {
		var newSrc = '';
		var oldSrc = '';
		var price = parseFloat($("#fetch_shoping_cart_net_pricing").html());
		// console.log($(this).is(':checked'));

		var __this = this;
		// if($(this).is(':checked') && $("input.shoping-cart-checkbx:checked").length > 1 && $('#fetch_shoping_cart_net_pricing').hasClass('d-none') ) {
		// 	//if the category is selected but price is not entered yet and another category is selected
		// 	e.preventDefault();
		// }else{
			var image = $(__this).parent().find('.rest_drop_icon_img');
			var newSrc = image.attr('data-src');
			image.attr('data-src', image.attr('src'));
			image.attr('src', newSrc);
			var categoryTitle = $(this).parent().find('.category-title').text();
			$("#shoping_cart_category").html(categoryTitle);

			if ($(this).is(':checked')) {
				$("input.shoping-cart-checkbx:unchecked").each(function() {
					$(this).attr('disabled','true');
				});
				$(this).addClass('current-checked')
				if (price > 0) {
					$("#fetch_shoping_cart_net_pricing").addClass('d-none')
					$(".shoping_cart_pricing_sar").addClass('d-none')
					$(".form_grp_pricing").removeClass('d-none')
					$("#shoping_cart_spend_text").removeClass('d-none');
					$("#shoping_cart_save_text").addClass('d-none')
					$(".submit_price").removeClass('d-none');
					$(".disclaimer_2").addClass('d-none');
					$(".disclaimer_1").removeClass('d-none');
				} else {
					$("#fetch_shoping_cart_net_pricing").addClass('d-none');
					$(".shoping_cart_pricing_sar").addClass('d-none')
					$("#fetch_net_pricing_section_1").removeClass("d-none");
					$("#fetch_net_pricing_section_2").addClass("d-none");
					$(".form_grp_pricing").removeClass('d-none');
					$("#shoping_cart_spend_text").removeClass('d-none');
					$("#shoping_cart_save_text").addClass('d-none');
					$(".submit_price").removeClass('d-none');
					$(".disclaimer_2").addClass('d-none');
					$(".disclaimer_1").removeClass('d-none');
				}
			} else {
				$(this).removeClass('current-checked');
				var net_input_amount = calcNetInputAmount();
				if(net_input_amount >= minMonthlySpendGlobal) {
					price = calcNetCashback(net_input_amount);
				}else{
					price = 0;
				}

				if(maxCashbackGlobal !== 0 && price > maxCashbackGlobal){
					price = maxCashbackGlobal;
				}

				$("#fetch_shoping_cart_net_pricing").html(price.toFixed(2));
				price = parseFloat(price.toFixed(2));
				if (price <= 0 && $("input.shoping-cart-checkbx:checked").length === 0) {
					$("#fetch_net_pricing_section_1").addClass("d-none");
					$("#fetch_net_pricing_section_2").removeClass("d-none");
					$("#fetch_shoping_cart_net_pricing").addClass('d-none');
					$(".shoping_cart_pricing_sar").addClass('d-none');
					$(".form_grp_pricing").removeClass('d-none');
					$(".submit_price").removeClass('d-none');
				}else{
					$("#fetch_shoping_cart_net_pricing").removeClass('d-none');
					$(".shoping_cart_pricing_sar").removeClass('d-none')
					$(".form_grp_pricing").addClass('d-none')
					$(".submit_price").addClass('d-none')
					$('.input_price').val('');
					$("#shoping_cart_spend_text").addClass('d-none');
					$("#shoping_cart_save_text").removeClass('d-none');
					$(".disclaimer_1").addClass('d-none');
					$(".disclaimer_2").removeClass('d-none');
				}
				$(this).val(0);
				$("input.shoping-cart-checkbx:unchecked").each(function() {
					$(this).removeAttr('disabled');
				});
			}
		// }

	});



	$('.submit_price').click(function () {

		if($('.input_price').val() == ""){
			$('.input_price').addClass('error');
		}else{
			$('.input_price').removeClass('error');
			$('.current-checked').val($('.input_price').val());
			var net_check_amount = 0;
			var net_input_amount = calcNetInputAmount();
			if(net_input_amount >= minMonthlySpendGlobal) {
				net_check_amount = parseFloat(calcNetCashback(net_input_amount));
			}

			if(maxCashbackGlobal !== 0 && net_check_amount > maxCashbackGlobal){
				net_check_amount = maxCashbackGlobal;
			}

			$("input.shoping-cart-checkbx:unchecked").each(function() {
				$(this).removeAttr('disabled');
			});

			$("#fetch_shoping_cart_net_pricing").removeClass('d-none').html(net_check_amount.toFixed(2))
			$(".shoping_cart_pricing_sar").removeClass('d-none');
			$(".form_grp_pricing").addClass('d-none');
			$(".submit_price").addClass('d-none');
			$('.input_price').val('');
			$('.current-checked').addClass('latest-checked').removeClass('current-checked');
			$("#shoping_cart_spend_text").addClass('d-none');
			$("#shoping_cart_save_text").removeClass('d-none')
			$(".disclaimer_1").addClass('d-none');
			$(".disclaimer_2").removeClass('d-none');
		}
	})

	function calcNetCashback(net_input_amount){
		var net_check_amount = 0;
		$("input.shoping-cart-checkbx:checked").each(function () {
			var reward_percent;
			var reward_percent_type = $(this).parent().find('input#reward_percent_type').val();
			var maxCashbackForCategory = parseFloat($(this).parent().find('input#reward_max_cashback_category').val());
			if (reward_percent_type === "single") {
				reward_percent = parseFloat($(this).parent().find('input#reward_percent').val());
				var cashbackForCategory = (parseFloat($(this).val()) * (reward_percent / 100));
				if(maxCashbackForCategory !== 0 && cashbackForCategory > maxCashbackForCategory){
					cashbackForCategory = maxCashbackForCategory;
				}
				net_check_amount += cashbackForCategory;
			} else {
				reward_percent = 0;
				var inputValue = parseFloat($(this).val());
				$(this).parent().find('input#reward_percent').each(function () {
					if ((net_input_amount >= parseInt($(this).data("lowerLimit"))) && (net_input_amount <= parseInt($(this).data("upperLimit")))) {
						reward_percent = parseFloat($(this).val());
						return false;
					} else if ((net_input_amount >= parseInt($(this).data("lowerLimit"))) && (parseInt($(this).data("upperLimit")) == -1)) {
						reward_percent = parseFloat($(this).val());
						return false;
					}
				});
				var cashbackForCategory = (inputValue * (reward_percent / 100));
				if(maxCashbackForCategory !== 0 && cashbackForCategory > maxCashbackForCategory){
					cashbackForCategory = maxCashbackForCategory;
				}
				net_check_amount += cashbackForCategory;
			}
		});
		return net_check_amount;
	}

	function calcNetInputAmount(){
		var net_input_amount = 0;
		$("input.shoping-cart-checkbx:checked").each(function () {
			net_input_amount += parseFloat($(this).val());
		});
		return net_input_amount;
	}

	$('.rest_drop_icon').click(function () {
		var inputID = $(this).attr('data-id');
		$(inputID).trigger('click')
	});

	$(".back_btn_arrow_icon").click(function (){
		window.history.back();
	});

	$(".table_detail_cashback table").each(function(tbIndex, tbItem){
		$(tbItem).addClass("table details_calculator_table responsive");
		$(tbItem).find("thead tr").each(function(trIndex, trItem){
			$(trItem).addClass("table_row_deatil");
			var thCount = $(trItem).find("th").length;
			$(trItem).find("th").each(function(thIndex, thItem){
				if(thIndex == 0){
					$(thItem).addClass("table_heading_detail border-rad-thead");
				}else if(thIndex == (thCount-1)){
					$(thItem).addClass("table_heading_detail border-rad-right");
				}else{
					$(thItem).addClass("table_heading_detail");
				}
			});
		});
		$(tbItem).find("tbody").each(function(tbdIndex, tbdItem){
			$(tbdItem).addClass("data-table-body");
			var trCount = $(tbdItem).find("tr").length;
			$(tbdItem).find("tr").each(function(trIndex, trItem){
				if(trIndex == (trCount-1)){
					$(trItem).addClass("pad_detail_ins data-bottom-rounded");
				}else{
					$(trItem).addClass("pad_detail_ins");
				}
				$(trItem).find("td").each(function(tdIndex, tdItem){

					if(tdIndex == 0){
						$(tdItem).replaceWith('<th row-header="'+$($(tbItem).find("thead th")[tdIndex]).text()+'" scope="row">' + $(tdItem).html() + '</th>');
					}else{
						$(tdItem).attr("row-header", $($(tbItem).find("thead th")[tdIndex]).text());
					}
				});
			});
		});
	});

	if ($(".slick_brand_hrm").length) {
		$(".slick_brand_hrm").slick({
			slidesToShow: 1,
			nav: true,

		});
	}

	if ($(".slick_detail_hrm").length) {
		$(".slick_detail_hrm").slick({
			slidesToShow: 2,
			loop: true,
			slidesToScroll: 4,
			nav: false,
			margin: 10,
			infinite: true,
			// arrows: true,  
			dots: true,
			responsive: [{
				breakpoint: 4500,
				settings: {
					slidesToShow: 4,
					dots: true
				}
			}, {
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true,
				}
			},{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					margin: 10,
					dots: true,
				}
			}]
		});
	}

	$('.cashback-faqs').each(function(i, obj) {
		$(obj).find(".faq-item").slice(0, 3).show();
		if ($(".faq-item:hidden").length == 0) {
			$(".loadMoreFaqs").hide();
		}
	});

	$('.listing-items-wrap').each(function(i, obj) {
		$(obj).find(".mobile_slider_item").slice(0, 4).show();
		if ($(".mobile_slider_item:hidden").length == 0) {
			if ($("#mobile-listing .listing-loadmorebtn-wrap a.custom_load_more").length > 0) {
				$(".listing-loadmorebtn-wrap a.custom_load_more").hide();
			}
		}
	});

	$(".loadMoreFaqs").on('click', function (e) {
		e.preventDefault();
		$(".faq-item:hidden").slice(0, 3).slideDown();

		$('html,body').animate({
			scrollTop: ($(this).offset().top-120)
		}, 800);
		if ($(".faq-item:hidden").length == 0) {
			$(this).hide();
		}
	});

	$(".play_icon_cls img").click(function(){
		var controlId = $(this).data('id');
		var iframe = $(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + '] iframe');
		var videoUrl = iframe.attr("data-src") + '?showinfo=0&modestbranding=1&rel=0&autoplay=1';

		iframe.attr('src', videoUrl);
		iframe.show();
		iframe.addClass('show');
		//alert($('.video-item').find('#pause-button[data-id=' + controlId + ']'));
		$(this).parents().eq(2).find('#pause-button[data-id=' + controlId + ']').addClass('show');
		$(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + ']').addClass('z-index');
	});
	$("#pause-button img").click(function(){
		var controlId = $(this).data('id');
		$(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + '] iframe').attr('src', '');
		$(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + '] iframe').hide();
		$(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + ']').removeClass('show');
		$(this).parents().eq(2).find('#pause-button[data-id=' + controlId + ']').removeClass('show');
		$(this).parents().eq(2).find('.video-iframe[data-id=' + controlId + ']').removeClass('z-index');
	});

	/* mobile  listing-loadmorebtn starts */
	if ($("#mobile-listing .listing-loadmorebtn-wrap a.custom_load_more").length > 0) {
		$(".listing-loadmorebtn-wrap a.custom_load_more").click(function (e) {
			e.preventDefault();
			const topValue = $(this).offset().top;
			$(".mobile_slider_item:hidden").slice(0, 4).slideDown();
			$('html,body').animate({
				scrollTop: topValue
			}, 800);
			if ($(".mobile_slider_item:hidden").length == 0) {
				$(this).hide();
			}
		});
	}
	/* mobile listing-loadmorebtn starts */

});