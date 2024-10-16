jQuery(document).ready(function(){


	var isToolVisible = $(".nbk-tool-sec").length;
	$(".iconTeaser .post-description p").addClass("vertical-ellipsis-5-lines");

	$(".dropdown.mega-menu-item").on("touchend", function(e){
		if($(this).data("is-open")){
		}else{
			e.preventDefault();
			$(".dropdown.mega-menu-item[data-is-open]").removeAttr("data-is-open");
			$(this).data("is-open", "true")
		}
	});

	changeClearfixClass();
	$(window).resize(function() {
		changeClearfixClass();
	});
	$(".search-now").click(function(){
		$("#notFoundSearchForm").submit()
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.help-you ul li a').addClass('text-ellipsis-how-can-help');

	if(window.self !== window.top) {
		// debugger;
		$('#pageWrapper')[0].style.opacity='1';
	}

	//disable reports filters

	//treasuty reports
	// all fiters after selecting period need to enabled
	if( dayTreasury != "null" ){
		/*$('.treasutyReportsFilter .country-input #dk_container_period').addClass("gd-disable");
         $('.treasutyReportsFilter .month #dk_container_month').addClass("gd-disable");
         $('.treasutyReportsFilter .year #dk_container_year').addClass("gd-disable");
         $(".search-form.reports-filters").css("opacity", "0.6");*/
		$(".search-form.reports-filters input").prop("disabled", true);
	}
	if( monthTreasury != "null" ){
		/*$('.treasutyReportsFilter .country-input #dk_container_period').addClass("gd-disable");
         $('.treasutyReportsFilter .day #dk_container_day').addClass("gd-disable");
         $('.treasutyReportsFilter .year #dk_container_year').addClass("gd-disable");
         $(".search-form.reports-filters").css("opacity", "0.6");*/
		$(".search-form.reports-filters input").prop("disabled", true);
	}
	if( yearTreasury != "null" ){
		/*$('.treasutyReportsFilter .country-input #dk_container_period').addClass("gd-disable");
         $('.treasutyReportsFilter .day #dk_container_day').addClass("gd-disable");
         $('.treasutyReportsFilter .month #dk_container_month').addClass("gd-disable");
         $(".search-form.reports-filters").css("opacity", "0.6");*/
		$(".search-form.reports-filters input").prop("disabled", true);

	}
	if( periodTreasury != "null" ){
		/*$('.treasutyReportsFilter .year #dk_container_year').addClass("gd-disable");
         $('.treasutyReportsFilter .day #dk_container_day').addClass("gd-disable");
         $('.treasutyReportsFilter .month #dk_container_month').addClass("gd-disable");
         $(".search-form.reports-filters").css("opacity", "0.6");*/
		$(".search-form.reports-filters input").prop("disabled", true);

	}
	if( searchTextTreasury != "null" ){
		/*$('.treasutyReportsFilter .country-input #dk_container_period').addClass("gd-disable");
         $('.treasutyReportsFilter .year #dk_container_year').addClass("gd-disable");
         $('.treasutyReportsFilter .day #dk_container_day').addClass("gd-disable");
         $('.treasutyReportsFilter .month #dk_container_month').addClass("gd-disable");*/
	}
	//financial reports financialReportsFilter
	if( yearFinancial != "null" ){
		/*$('.financialReportsFilter .country-input #dk_container_issuingPeriod').addClass("gd-disable");
         $('.financialReportsFilter .month #dk_container_month').addClass("gd-disable");
         $(".search-form.reports-filters input").prop("disabled", true);
         $(".search-form.reports-filters").css("opacity", "0.6");*/
	}
	if( monthFinancial != "null" ){
		/*$('.financialReportsFilter .country-input #dk_container_issuingPeriod').addClass("gd-disable");
         $('.financialReportsFilter .year #dk_container_year').addClass("gd-disable");
         $(".search-form.reports-filters input").prop("disabled", true);
         $(".search-form.reports-filters").css("opacity", "0.6");*/
	}
	if( issuingPeriod != "null" ){
		/*$('.financialReportsFilter .year #dk_container_year').addClass("gd-disable");
         $('.financialReportsFilter .month #dk_container_month').addClass("gd-disable");
         $(".search-form.reports-filters input").prop("disabled", true);
         $(".search-form.reports-filters").css("opacity", "0.6");*/
	}
	if( searchTextFinancial != "null" ){/*
     $('.financialReportsFilter .year #dk_container_year').addClass("gd-disable");
     $('.financialReportsFilter .month #dk_container_month').addClass("gd-disable");
     $('.financialReportsFilter .country-input #dk_container_issuingPeriod').addClass("gd-disable");*/
	}
	$(".treasury-reports-filter, .economic-reports-filter, .financial-reports-filter, .knowledge_center_filter").change(function () {
		$(this).closest('form').submit();
	});

	jQuery.validator.addMethod("civilID", function(value, element) {
		return this.optional( element ) || /^(1|2|3)((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229)(\d{5})$/.test( value );
	}, 'Please enter a valid civil id.');
	$.validator.addMethod("lettersonly", function(value, element) {
		var reg = /[0-9]/;
		if(reg.test(value)){
			return false;
		}else{
			return true;
		}
		//return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
	});
	if($(".comboDateBox").length > 0 ){
		$(".comboDateBox").dateDropdowns({
			// Identifies the "Day" dropdown
			dayLabel: $(".comboDateBox").attr("data-day-label"),
			monthLabel: $(".comboDateBox").attr("data-month-label"),
			yearLabel: $(".comboDateBox").attr("data-year-label"),
			wrapperClass: "",
			dropdownClass: "date-dropdown",
			submitFieldName: "dateOfBirth",
			defaultDateFormat: "dd/mm/yyyy",
			monthLongValues: $(".monthLabels").val().split(','),
			submitFormat: "dd/mm/yyyy",
			defaultDate: $(".comboDateBox").attr("data-default-value"),
			daySuffixes: false
		});
		$(".date-dropdown").dropkick();
	}
	checkSelectedEconomicFilter($("#ecoFilterType").val());
	$("#ecoFilterType").change(function(){
		var selectedEcoType = this.value;
		checkSelectedEconomicFilter(selectedEcoType);
	});
	$("#controls .play").click(function(){
		$(this).hide();
		$("#controls .pause").show();
	});
	$("#controls .pause").click(function(){
		$(this).hide();
		$("#controls .play").show();
	});

	$(".account-box").matchHeight();
	$(window).resize(function () {
		$(".account-box").matchHeight();
	});
	$(".presentation-item").matchHeight();
	$(".reports .product").matchHeight();
	$(".iconTeaser .post-description").matchHeight();
	$(".iconTeaser .post-content-details").matchHeight();
	$(".card-box h3").matchHeight();
	$(".checkboxProduct, .base-match-height").matchHeight();
	$("ol.moving-steps li").matchHeight();

	$(".reward-list li .box-reward-style").matchHeight();
	$(".carousel .product .post-item .post-content-details").matchHeight();
	/***** contact us teasers ******/
	$(".product.contact .post-item .post-content-details").matchHeight();
	/***** homepage TRAVELING ABROAD group ******/
	$(".post-item.normalize-style .post-content-details").matchHeight();

	$(".account-box p").matchHeight();

	/*match height for compare tavble body*/
	$(".compare-paragraph .col-lg-3,.compare-paragraph .col-lg-4,.compare-paragraph .col-lg-6,.compare-paragraph .col-lg-12").matchHeight();
	$(".compare-price .col-lg-3,.compare-price .col-lg-4,.compare-price .col-lg-6,.compare-price .col-lg-12").matchHeight();
	$(".small-videos").matchHeight();
	$(".small-interviews").matchHeight();

	if($('.fancybox-media').length > 0){

		$('.fancybox-media')
		.attr('rel', 'media-gallery')
		.magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
    }
	var mark = function() {
		var filter = $(this).val();
		if(filter !== "") {
			// Loop through the list
			$('.main-links').each(function () {
				// If the list item does not contain the text phrase fade it out
				if ($(this).text().search(new RegExp(filter, "i")) < 0) {
					$(this).removeClass("open");
					$(this).addClass("no-result");
					$(this).children("div").css("max-height","0px");
					$(this).css("display", "none");
				} else {
					$(this).addClass("open");
					$(this).removeClass("no-result");
					$(this).children("div").css("max-height","1000px");
					$(this).css("display", "block");
					var currentParent = $(".tab-pane .fade .active .in");
					var elements = $(".currentParent .open").length;
					if(elements == 0){
						$('.tab-content .tab-pane').removeClass('active');
						$('.tab-content .tab-pane').removeClass('show');
						$('ul.nav-tabs li a').removeClass('active');

						$(this).parent().addClass('active');
						$(this).parent().addClass('show');
						var elementid = $(this).parent().attr('id');
						var child = $("a[href$='" + elementid + "']");
						$(child).addClass('active');
					}


				}
			});

		} else {
			$('.main-links').each(function () {
				/*hide all elements*/
				$(this).removeClass("open");
				$(this).children("div").css("max-height","0px");
				$(this).addClass("no-result");
				/*$(this).css("display", "block");*/
				$('.main-links.no-result').css("display", "none");
				$('.tab-pane.fade').removeClass('active');
				$('.tab-pane.fade').removeClass('show');

				/*get hash tag*/
				var hash = window.location.hash;
				if(!hash){
					hash = "#0";
				}

				/*make active tab depending on hash tag*/
				$('ul.nav-tabs li a').removeClass('active');
				var child = $("a[href$='" + hash + "']");
				$(child).addClass('active');

				/*show questions bellow active tab*/
				$(hash).addClass("active");
				$(hash).addClass("show");
				$(".main-links").removeClass('no-result');
				$(".main-links").css("display", "block");
			});
		}

		// Read the keyword
		var keyword = $("#faqLiveSearch").val();

		// Determine selected options
		var options = {};
		$("input[name='opt[]']").each(function() {
			options[$(this).val()] = $(this).is(":checked");
		});

		// Remove previous marked elements and mark
		// the new keyword inside the context
		$(".main-links").unmark({
			done: function() {
				$(".main-links").mark(keyword, options);
			}
		});
	};
	$("#faqLiveSearch").on("input", mark);
	$(".selectedCountryImage").hide();

	$("#code").change(function () {
		$(this).closest("form").submit();
	});

	$( ".countryLink" ).on("click","li.changeCountryLink", function(event) {
		var link = $(this).data("link");
		var title = $(this).data("title");
		var image = $(this).data("image");
		$(".changeCountryLink").attr("href", link);
		$(".selectedCountry").text(title);
		$(".selectedCountryImage").attr("src", image);
		$(".selectedCountryImage").show();
	});

	var numSelectedCards = $("#numberOfselectedCards").text();
	if(parseInt(numSelectedCards) > 0){
		$("#numberOfselectedCards").show();
		if(parseInt(numSelectedCards) >= 2){
			$("#compareLink").removeClass("disabled-link");
		}else{
			$("#compareLink").addClass("disabled-link");
		}
	}else{
		$("#numberOfselectedCards").hide();
		$("#compareLink").addClass("disabled-link");
	}
	var sliderContainer =  $('#slider');
	if(sliderContainer.children().length> 1){
		$(sliderContainer).addClass("owl-carousel owl-theme");
		$(sliderContainer).owlCarousel({
			rtl:owlRtl,
			items:1,
			merge:true,
			loop:true,
			video:true,
			lazyLoad:true,
			center:true,
			videoHeight: 300,
			videoWidth: 600,
			responsive:{
				480:{
					items:1
				},
				600:{
					items:1
				}
			}
		});
	}
	//$('.default').dropkick();
	$('#multiple [data-accordion]').accordion({
		singleOpen: false
	});

	stickyOffset = 200;
	compareCardsStickyOffset = 535;

	if($(".term-nav").length > 0) {
		stickyOffset = $(".term-nav").offset().top;
	} else if ($(".credic-cart-section").length > 0) {
		stickyOffset = $(".credic-cart-section").offset().top;
	}

	if($("#compareCardsMenu").length > 0) {
		compareCardsStickyOffset = $("#compareCardsMenu").offset().top;
	}

	$( window ).resize(function() {
		if($(".term-nav").length > 0) {
			stickyOffset = $(".term-nav").offset().top;
		} else if ($(".credic-cart-section").length > 0) {
			stickyOffset = $(".credic-cart-section").offset().top;
		}

		if($("#compareCardsMenu").length > 0) {
			compareCardsStickyOffset = $("#compareCardsMenu").offset().top;
		}
	});

	$(window).scroll(function() {
		var scroll = $(window).scrollTop();

		if (scroll >= stickyOffset) {
			$(".term-nav, .credic-cart-section").addClass("sticky");
			$(".term-res-menu").addClass("sticky");
			$(".card-box h3").matchHeight({ remove: true });
			$(".term-reports, .term-reports.term-res-menu").removeClass("sticky");
		} else {
			$(".term-nav, .credic-cart-section, .term-res-menu").removeClass("sticky");
			$("#compareCardsMenu").removeClass("sticky");
			$(".card-box h3").matchHeight();
		}

		if (scroll >= compareCardsStickyOffset) {
			$("#compareCardsMenu").addClass("sticky");
		} else {
			$("#compareCardsMenu").removeClass("sticky");
		}
	});
	checkAnnouncementCookie();
	$("li.any-announcement").click(function(){
		//var allAnnouncements = getAllAnnouncements();
		var announcementsFromCookie = getAnnouncementsFromCookie();
		var selectedAnnouncementId = $(this).data('id');
		if (announcementsFromCookie.indexOf(selectedAnnouncementId) == -1) {
			announcementsFromCookie.push(selectedAnnouncementId);
			setCookie("announcements", announcementsFromCookie, 365, homePath);
			checkAnnouncementCookie();
		}
	});

	//card compare
	var cardsComparePage = $("#compareLink").data("link");
	var maxCardForSelect = 4;
	$('.selectCardForCompare').on("change", function() {
		var aHrefVals = [];
		$('.selectCardForCompare').filter(":checked").each(function() {
			if(aHrefVals.length >= 4){
				this.checked = false;
			}else{
				aHrefVals.push($(this).val());
			}
			if(aHrefVals.length >=2){
				$("#compareLink").removeClass("disabled-link");
			}else{
				$("#compareLink").addClass("disabled-link");
			}
			if(aHrefVals.length >= 4){
				$("input:checkbox:not(:checked)").parent().hide();
			}else{
				$("input:checkbox:not(:checked)").parent().show();
			}
		});
		$("#compareLink").attr("href", cardsComparePage + aHrefVals.join(","));
		if(aHrefVals.length > 0){
			$("#numberOfselectedCards").text(aHrefVals.length);
			$("#numberOfselectedCards").show();
		}else{
			$("#numberOfselectedCards").text(aHrefVals.length);
			$("#numberOfselectedCards").hide();
		}

	});


	$(".language-switch").click(function(){
		setCookie("locale", $(this).data("locale"), 365, "/");
	});

	$("#categories").change(function() {
		$(this).closest('form').submit();
	});
	var searchPath = $("#searchPath").val();
	var lang = $("#lang").val();
	$("#nav-search").autocomplete({

		source: contextPath + "/.rest/nbk/search?path=" + searchPath + "&lang=" + lang,
		minLength: 2,
		select: function(event, ui) {
			var url = ui.item.id;
			if(url != '#') {
				location.href = url;
			}
		},

		html: true, // optional (jquery.ui.autocomplete.html.js required)

		// optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			$(".ui-autocomplete").css("z-index", "1000000000000000000");
			$(".ui-autocomplete li.ui-menu-item").each(function() {
				if (this.scrollHeight > this.clientHeight ) {
					$(this).css('height', '44px'); // Update the height to 44px
				}
			});
		}
	});

	$("#nav-mob-search").autocomplete({

		source: contextPath + "/.rest/nbk/search?path=" + searchPath + "&lang=" + lang,
		minLength: 2,
		select: function(event, ui) {
			var url = ui.item.id;
			if(url != '#') {
				location.href = url;
			}
		},

		html: true, // optional (jquery.ui.autocomplete.html.js required)

		// optional (if other layers overlap autocomplete list)
		open: function(event, ui) {
			$(".ui-autocomplete").css("z-index", "1000000000000000000");
			$(".ui-autocomplete").css("top", "110px");
			$(".ui-autocomplete").css("width", $("#nav-mob-search").innerWidth());
			$(".ui-autocomplete li.ui-menu-item").each(function() {
				if (this.scrollHeight > this.clientHeight ) {
					$(this).css('height', '44px'); // Update the height to 44px
				}
			});
		}
	});

	/**
	 * newsletter subscription form validation
	 */
	jQuery("#CP").validate({
		submitHandler: function(form) {
			jQuery(form).submit();
		}
	});



	//generic owl for multiple sliders in rewards
	$(".two-items-slider").on('initialized.owl.carousel resized.owl.carousel', function(e) {
		$(e.target).toggleClass('hide-nav', e.item.count <= e.page.size);
	});
	$(".two-items-slider").addClass("owl-carousel owl-theme");
	$(".two-items-slider").owlCarousel({
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
				items:1
			},
			1000:{
				items:2
			}
		}

	});
	$(".five-items-slider").on('initialized.owl.carousel resized.owl.carousel', function(e) {
		$(e.target).toggleClass('hide-nav', e.item.count <= e.page.size);
	});
	$(".five-items-slider").addClass("owl-carousel owl-theme");
	$(".five-items-slider").owlCarousel({
		rtl:owlRtl,
		items : 5,
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
			420:{
				items:3,
				nav:true
			},
			767:{
				items:4

			},
			1000:{
				items:5

			}
		}

	});
	$(".owl-generic").on('initialized.owl.carousel resized.owl.carousel', function(e) {
		$(e.target).toggleClass('hide-nav', e.item.count <= e.page.size);
	});
	$(".owl-generic").addClass("owl-carousel owl-theme");
	$(".owl-generic").owlCarousel({
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
				items:3

			},
			1000:{
				items:4

			}
		}

	});
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 500) {
			$(".account-fixed").addClass("sticky");
		} else {
			$(".account-fixed").removeClass("sticky");
		}
	});
	$('.clickableParent').off('click');
	$('#only-one [data-accordion]').accordion();

	$('#multiple [data-accordion]').accordion({
		singleOpen: false
	});

	$('#single[data-accordion]').accordion({
		transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
		transitionSpeed: 200
	});
	$('#only-one [data-accordion]').accordion();


	var hash = window.location.hash;
	var hashValues = hash.split("--");
	if(hashValues[1]){
		var $accToOpen = $(hashValues[0] + " section#" + hashValues[1]);
		$accToOpen.addClass("open");
		$('html, body').animate({
			scrollTop: $accToOpen.offset().top
		}, 2000);

	}else if(hashValues[0] && (hashValues[0] === "#split-transfer-manage" || hashValues[0] === "#split-transfer-manage-desktop")){
		if ($(window).width() > 1024) {
			window.location.hash = '#split-transfer-manage-desktop';
		}else{
			window.location.hash = '#split-transfer-manage';
		}
	}
	hashValues[0] && $('ul.nav a[href="' + hashValues[0] + '"]').tab('show');

	$('.nav-tabs a').click(function (e) {
		$(this).tab('show');
		if($(this).data("hash-url") != "disable"){
			window.location.hash = this.hash;
			hashValues[1] = "";
		}

	});
	$('.nav-tabs a').on('shown.bs.tab', function(){
		if(hashValues[1]){
			$(window).trigger("resize");
			$('html, body').animate({
				scrollTop: $accToOpen.offset().top
			}, 2000);
		}
	});



	$('#multi [data-accordion]').accordion({
		singleOpen: false
	});


	$('#single').accordion({
		transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
		transitionSpeed: 200
	});
	$(function() {
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
	$('#only-one [data-accordion]').accordion();

	$('#multiple [data-accordion]').accordion({
		singleOpen: false
	});

	$('#single[data-accordion]').accordion({
		transitionEasing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
		transitionSpeed: 200
	});
	//time praying
	// commenting out to avoid unnecessary requests on page load
	// if(isToolVisible){
	// 	$.ajax({
	// 		url: buildPrayerTimingURL(),
	// 		cache: false,
	// 		success: function(result){
	// 			var timings = result.data.timings;
	// 			var localTime = new Date().toLocaleTimeString();
	// 			var localHours = new Date().getHours();
	// 			var localMinutes = new Date().getMinutes() + 1;
	// 			var currentYear = new Date().getFullYear();
	// 			var m = new Date().getMonth() + 1;
	// 			var day  = new Date().getDate();
	// 			var d = new Date(result.data.date.timestamp * 1000);
	// 			/*
    //              var ulWrapper = $("#prayer-timing-list");
    //              not dynamically at this moment
    //              for (var key in timings) {
    //              if (timings.hasOwnProperty(key)) {
    //              ulWrapper.append('<li><p class="pull-left">' + key + '</p><p class="pull-right">' + timings[key] + '</p></li>');
    //              }
    //              }*/
	// 			var fajr = timings['Fajr'].split(":");
	// 			var dhuhr = timings['Dhuhr'].split(":");
	// 			var asr = timings['Asr'].split(":");
	// 			var maghrib = timings['Maghrib'].split(":");
	// 			var isha = timings['Isha'].split(":");
	// 			/*var imsak = timings['Imsak'].split(":");*/
	// 			var testDates = [
	// 				new Date( currentYear, m, day, fajr[0], fajr[1] ),
	// 				new Date( currentYear, m, day, dhuhr[0], dhuhr[1] ),
	// 				new Date( currentYear, m, day, asr[0], asr[1] ),
	// 				new Date( currentYear, m, day, maghrib[0], maghrib[1] ),
	// 				new Date( currentYear, m, day, isha[0], isha[1] )
	// 				/*new Date( currentYear, m, day, imsak[0], imsak[1] )*/
	//
	// 				];
	//
	// 			var index =  nextDate( new Date( currentYear, m, day, localHours, localMinutes ), testDates );
	//
	// 			$("#timePrayerDateShow").text(d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear());
	// 			$("#fajrTimeValue").text(timings['Fajr']);
	// 			$("#dhuhrTimeValue").text(timings['Dhuhr']);
	// 			$("#asrTimeValue").text(timings['Asr']);
	// 			$("#maghribTimeValue").text(timings['Maghrib']);
	// 			$("#ishaTimeValue").text(timings['Isha']);
	// 			$("#imsakTimeValue").text(timings['Imsak']);
	// 			if( index == 0 && index != -1){
	// 				$( "#fajrTimeValue" ).wrapInner( "<span></span>");
	// 				$( "#fajr" ).wrapInner( "<span></span>");
	// 			}
	// 			if( index == 1 && index != -1){
	// 				$( "#dhuhrTimeValue" ).wrapInner( "<span></span>");
	// 				$( "#dhuhr" ).wrapInner( "<span></span>");
	// 			}
	// 			if( index == 2 && index != -1){
	// 				$( "#asrTimeValue" ).wrapInner( "<span></span>");
	// 				$( "#asr" ).wrapInner( "<span></span>");
	// 			}
	// 			if( index == 3 && index != -1){
	// 				$( "#maghribTimeValue" ).wrapInner( "<span></span>");
	// 				$( "#maghrib" ).wrapInner( "<span></span>");
	// 			}
	// 			if( index == 4 && index != -1 ){
	// 				$( "#ishaTimeValue" ).wrapInner( "<span></span>");
	// 				$( "#isha" ).wrapInner( "<span></span>");
	// 			}
	// 		}
	// 	});
	// }
	$(".direct-form-submit").change(function() {
		$(this).closest('form').submit();
	});

	$('input.tutorial').change(function() {
		var selectedVideosSize = $('input.tutorial:checked').length;
		if(selectedVideosSize > 0 && selectedVideosSize <=2){
			$("#open-dialog").removeClass("no-link");
		}else{
			$("#open-dialog").addClass("no-link");
		}
		if(selectedVideosSize >= 2){
			$("input.tutorial:checkbox:not(:checked)").each(function () {
				$(this).closest(".hideIfMoreThanTwoSelected").hide();
			});
		}else{
			$(".hideIfMoreThanTwoSelected").show();
		}
	});
	$("#open-dialog").click(function(){
		var selectedVideos = $('.tutorial:checked');

		if(selectedVideos.length <= 2){
			$("#attach1UUID").val($(selectedVideos[0]).val());
			$("#attach1title").val($(selectedVideos[0]).data("title"));
			if(selectedVideos[1]){
				$("#attach2UUID").val($(selectedVideos[1]).val());
				$("#attach2title").val($(selectedVideos[1]).data("title"));
			}
		}
	});
	$("#shareTutorial").validate();

	checkSelectedMainCategoryFilter($("#mainCategoryFilter").val());
	$("#mainCategoryFilter").change(function(){
		var selectedCategory = this.value;
		checkSelectedMainCategoryFilter(selectedCategory);
	});

	jQuery.validator.addMethod("egmobnum", function(value, element) {
		return this.optional( element ) || new RegExp('^(01)[0-9]{9}$', 'i').test(value);
	}, 'The mobile number must be in the format 01xxxxxxxxx');

});
function nextDate( startDate, dates ) {
	var startTime = +startDate;
	var nearestDate, nearestDiff = Infinity;
	var index = -1;
	for( var i = 0, n = dates.length;  i < n;  ++i ) {
		var diff = +dates[i] - startTime;
		if( diff > 0  &&  diff < nearestDiff ) {
			nearestDiff = diff;
			nearestDate = dates[i];
			index = i;
		}
	}
	return index;
}

function getAllAnnouncements(){
	var allAnnouncements = [];

	$('li.any-announcement').each(function() {
		allAnnouncements.push($(this).data('id'));
	});
	return allAnnouncements;
}
function getAnnouncementsFromCookie(){
	var announcements = getCookie("announcements");
	var dataInCookie = [];
	if(announcements){
		dataInCookie = announcements.split(",");
	}else{
		setCookie("announcements", [], 365, homePath);
	}
	return dataInCookie;
}
function setCookie(cname, cvalue, exdays, path) {
	var cookieConsentStatus = getCookie("cookieconsent_status");
	if(cname === "announcements" && cookieConsentStatus !== null && !announcementCookieRegex.test(cookieConsentStatus)){
		return;
	}
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
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
function checkAnnouncementCookie() {
	var notifHolder = $("#announcmentUnreadNumber");
	var notifHolderMob = $("#announcmentUnreadNumberMob");
	var allAnnouncements = getAllAnnouncements();
	var announcementsFromCookie = getAnnouncementsFromCookie();
	var res = 0;



	$('.notification-dropdown.desk li.any-announcement').each(function() {
		if(announcementsFromCookie.indexOf($(this).data('id')) > -1){
			$(this).removeClass("read");
		}else{
			res++;
		}
	});
	$('.notification-dropdown.res li.any-announcement').each(function() {
		if(announcementsFromCookie.indexOf($(this).data('id')) > -1){
			$(this).removeClass("read");
		}
	});

	notifHolder.text(res);
	notifHolderMob.text(res);
	if(res == 0){
		notifHolder.css("visibility", "hidden");
		notifHolderMob.css("visibility", "hidden");
	}

}
function buildPrayerTimingURL(){
	var res = "";
	var configWrapper = $("#prayerTimingConfig");
	res = configWrapper.data("url");
	res = res + Math.floor(Date.now() / 1000);
	res = res + "?" + configWrapper.data("latitude");
	res = res + "&" + configWrapper.data("longitude");
	res = res + "&" + configWrapper.data("timezone");
	res = res + "&" + configWrapper.data("method");
	return res;

}

function changeClearfixClass(){
	var width = $(window).width();
	console.log(width);
	if(width > 991){
		$(".thirdFromItem").addClass("clearfix");
		$(".secondFromItem").removeClass("clearfix");
		$(".firstFromItem").removeClass("clearfix");
	}else if (width < 991 && width > 767){
		$(".thirdFromItem").removeClass("clearfix");
		$(".secondFromItem").addClass("clearfix");
		$(".firstFromItem").removeClass("clearfix");
	}else{
		$(".thirdFromItem").removeClass("clearfix");
		$(".secondFromItem").removeClass("clearfix");
		$(".firstFromItem").addClass("clearfix");
	}
}

function checkSelectedEconomicFilter(value){
	if(value){
		$("#ecoYearWrapper").show();
		$("#ecoMonthWrapper").show();
	}else{
		$("#ecoYearWrapper").hide();
		$("#ecoMonthWrapper").hide();
	}

	if(value == "country"){
		$("#countryFilterWrapper").show();
		$("#countryFilterWrapper select").attr("disabled", false);
		$("#publicationFilterWrapper").hide();
		$("#publicationFilterWrapper select").attr("disabled", true);
		$("#marketFilterWrapper").hide();
		$("#marketFilterWrapper select").attr("disabled", true);
	}else if(value == "market"){
		$("#marketFilterWrapper").show();
		$("#marketFilterWrapper select").attr("disabled", false);
		$("#countryFilterWrapper").hide();
		$("#countryFilterWrapper select").attr("disabled", true);
		$("#publicationFilterWrapper").hide();
		$("#publicationFilterWrapper select").attr("disabled", true);
	}else if(value == "publication"){
		$("#publicationFilterWrapper").show();
		$("#publicationFilterWrapper select").attr("disabled", false);
		$("#countryFilterWrapper").hide();
		$("#countryFilterWrapper select").attr("disabled", true);
		$("#marketFilterWrapper").hide();
		$("#marketFilterWrapper select").attr("disabled", true);
	}else{
		$("#publicationFilterWrapper").hide();
		$("#publicationFilterWrapper select").attr("disabled", true);
		$("#countryFilterWrapper").hide();
		$("#countryFilterWrapper select").attr("disabled", true);
		$("#marketFilterWrapper").hide();
		$("#marketFilterWrapper select").attr("disabled", true);
	}
}

function checkSelectedMainCategoryFilter(value){
	var selected;
	$("#subCategory1FilterWrapper select > option").each(function() {
		if(!($(this).val() == "all")){
			if(value){
				if($(this).attr('parent') == value){
					$("#subCategory1FilterWrapper li:eq("+$(this).index()+")").show()
				} else{
					$("#subCategory1FilterWrapper li:eq("+$(this).index()+")").hide()
					$(this).removeAttr('selected');
				}
			}else{
				$("#subCategory1FilterWrapper li:eq("+$(this).index()+")").show()
			}
			if(this.selected){
				selected = this;
			}
		}
		else{
			if(!selected){
				selected = this;
			}
			
		}
	});
	if(selected){
		$("#subCategory1FilterWrapper .dk_label").html($(selected).html());
	}
}

$(function() {
	$( '#exTab1 a[data-bs-toggle="tab"]' ).click(function() {
		$( '#exTab1 li' ).removeClass("active");
		$(this).parent().addClass("active");
	});
});