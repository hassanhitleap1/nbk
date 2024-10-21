(function ($) {
    const LIMIT = 9;
    var offset = 0;
    const lang = $('html').attr('lang');
    var direction = (lang === "ar" ? "rtl" : "ltr");
    var $rewardsContainer = $('#rewards-container');
    var $resultCount = $('.showing-text');
    var $categoriesCount = $('#categories-count');
    var $removeMobFilters= $('#remove-all-selected-mob');
    var $rewardsSearchInput = $('#rewards-search');
    var $rewardsSearchButton = $('#rewards-search-submit');
    var $brandsSearchInput = $('#brands-search');
    var $loadMoreBrandsLi = $('.load-more-items');
    var $loadMoreBrandsButton = $('#load-more-rewards-brands');
    var $rewardsSort = $('.rewards-sort');
    var $rewardsBrandsBtnGroup= $(".rewards-brands-btn-group button");
    var emptyResultsText = $('#empty-results-text').html();
    var waypoint;

    var isAnimating = false;

    const filterParameters = {};
    const selectedCategories = [];
    const selectedOfferTypes = [];
    const selectedCards = [];
    const selectedPackages = [];
    const selectedBrands = [];
    const sortOptionDefault = "def";
    var sortOption = sortOptionDefault;
    var offerIDforFilter="";
    var refreshTotalResultCount = true;
    var refreshCategoryCounts = true;
    var rewardsScrollToTop = false;

    let searchInputEventTriggered = false;

    //Initial Loading
    initQueryStringFilters();
    loadData();

    // $(document).ajaxSend(function() {
    //     $("#rewards-loading").show();
    // });

    function initWaypoints() {
        if(!disableAutoLoad) {
            waypoint = new Waypoint({
                element: document.getElementById('waypoint-trigger'),
                handler: function (direction) {
                    if (direction === 'down') {
                        offerIDforFilter="";
                        refreshTotalResultCount = false;
                        refreshCategoryCounts = false;
                        loadData();
                    }
                },
                offset: 50
            })
        }
    }
    function loadData() {
        if(selectedCategories.length > 0){
            filterParameters.cat = selectedCategories.join(",");
        }else{
            delete filterParameters.cat;
        }
        if(selectedOfferTypes.length > 0){
            filterParameters.ot = selectedOfferTypes.join(",");
        }else{
            delete filterParameters.ot;
        }
        if(selectedCards.length > 0){
            filterParameters.cards = selectedCards.join(",");
        }else{
            delete filterParameters.cards;
        }
        if(selectedPackages.length > 0){
            filterParameters.pkgs = selectedPackages.join(",");
        }else{
            delete filterParameters.pkgs;
        }
        if(selectedBrands.length > 0){
            filterParameters.brands = selectedBrands.join(",");
        }else{
            delete filterParameters.brands;
        }
        if(offerIDforFilter.length > 0){
            filterParameters.offerid = offerIDforFilter;
        }else{
            delete filterParameters.offerid;
        }
        filterParameters.orderBy = sortOption;
        // Make an AJAX call to your REST API
        var urlData = $.extend({}, filterParameters, {
            limit: LIMIT,
            offset: offset,
            expDays: expiringDays,
            lang: lang
        });
        $.ajax({
            url: contextPath + "/.rest/rewards/v2/filterOffers",
            method: 'GET',
            data: urlData,
            beforeSend: function() {
                $("#rewards-loading").show();
            },
            success: function (data) {
                if(data.rewards.length > 0) {
                    $(data.rewards).each(function (idx, el) {
                        if (el.validDate) {
                            el.validDate.month = monthLabels[el.validDate.month];
                        }
                        var $rendered = $(Mustache.render(OFFER_ITEM_TEMPLATE_NO_LOGGED_IN, el));
                        // Append the rendered HTML to the container
                        $rewardsContainer.append($rendered);
                        if(rewardsScrollToTop && window.matchMedia("(max-width: 767px)").matches){
                            isAnimating = true;
                            $([document.documentElement, document.body]).stop(true).animate({
                                scrollTop: $(".container-rewards").offset().top
                            }, 2000, function() { isAnimating = false; });
                            rewardsScrollToTop = false;
                        }
                    });
                }else if(offset === 0){
                    $rewardsContainer.append(emptyResultsText);
                }
                if(refreshCategoryCounts) {
                    $categoriesCount.empty();
                    if(data.filterResultCounts.length > 0) {
                        $categoriesCount.append(REMOVE_ALL_TEMPLATE);
                        $(data.filterResultCounts).each(function (idx, el) {
                            var $rendered = $(Mustache.render(SELECT_FILTER_COUNT_TEMPLATE, el));
                            $categoriesCount.append($rendered);
                        });
                        $removeMobFilters.attr('disabled', false);
                        $removeMobFilters.removeClass('disabled');
                    }else if(offerIDforFilter.length > 0){
                        $categoriesCount.append(REMOVE_ALL_TEMPLATE);
                        $removeMobFilters.attr('disabled', true);
                        $removeMobFilters.addClass('disabled');
                        offerIDforFilter = "";
                    }
                    else{
                        $removeMobFilters.attr('disabled', true);
                        $removeMobFilters.addClass('disabled');
                    }
                }
                if(refreshTotalResultCount){
                    $resultCount.empty();
                    var $rendered =Mustache.render(RESULT_COUNT_TEMPLATE, { totalResultCount: data.totalResultCount });
                    $resultCount.append($rendered);
                }
                offset = offset + 9;
                var currentTrigger = $rewardsContainer.find('#waypoint-trigger');
                if(currentTrigger.length > 0) {
                    currentTrigger.removeAttr('id');
                }
                if (typeof waypoint !== 'undefined') {
                    waypoint.destroy();
                }
                if(data.rewards.length === LIMIT) {
                    var newTrigger = $rewardsContainer.children().last();
                    newTrigger.attr('id', 'waypoint-trigger');
                    initWaypoints();
                }
            },
            error: function (error) {
                console.error('Error loading data:', error);
            },
        }).done(function() {
            $("#rewards-loading").hide();
        });
    }

    function initQueryStringFilters(){
        if (categoriesFromQueryString !== undefined && categoriesFromQueryString !== null && categoriesFromQueryString.trim() !== "") {
            let categoriesArray = categoriesFromQueryString.split(',');
            categoriesArray.forEach(function(category) {
                $('.category-checkbox-list input[type="checkbox"]').each(function () {
                    var checkboxValue = $(this).data('qvalue');
                    if (checkboxValue === category) {
                        $(this).prop('checked', true);
                        selectedCategories.push($(this).val());
                    }
                });
            });
        }

        if (offerTypesFromQueryString !== undefined && offerTypesFromQueryString !== null && offerTypesFromQueryString.trim() !== "") {
            let categoriesArray = offerTypesFromQueryString.split(',');
            categoriesArray.forEach(function(category) {
                $('.offer-types-checkbox-list input[type="checkbox"]').each(function () {
                    var checkboxValue = $(this).data('qvalue');
                    if (checkboxValue === category) {
                        $(this).prop('checked', true);
                        selectedOfferTypes.push($(this).val());
                    }
                });
            });
        }

        if (cardsFromQueryString !== undefined && cardsFromQueryString !== null && cardsFromQueryString.trim() !== "") {
            let categoriesArray = cardsFromQueryString.split(',');
            categoriesArray.forEach(function(category) {
                $('.cards-checkbox-list input[type="checkbox"]').each(function () {
                    var checkboxValue = $(this).data('qvalue');
                    if (checkboxValue === category) {
                        $(this).prop('checked', true);
                        selectedCards.push($(this).val());
                    }
                });
            });
        }

        if (packagesFromQueryString !== undefined && packagesFromQueryString !== null && packagesFromQueryString.trim() !== "") {
            let categoriesArray = packagesFromQueryString.split(',');
            categoriesArray.forEach(function(category) {
                $('.packages-checkbox-list input[type="checkbox"]').each(function () {
                    var checkboxValue = $(this).data('qvalue');
                    if (checkboxValue === category) {
                        $(this).prop('checked', true);
                        selectedPackages.push($(this).val());
                    }
                });
            });
        }

        if (brandsFromQueryString !== undefined && brandsFromQueryString !== null && brandsFromQueryString.trim() !== "") {
            let categoriesArray = brandsFromQueryString.split(',');
            categoriesArray.forEach(function(category) {
                $('.brands-checkbox-list input[type="checkbox"]').each(function () {
                    var checkboxValue = $(this).data('qvalue');
                    if (checkboxValue === category) {
                        $(this).prop('checked', true);
                        selectedBrands.push($(this).val());
                    }
                });
            });
        }
    }

    $('.category-checkbox-list input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
            if(!selectedCategories.includes($(this).val())){
                selectedCategories.push($(this).val());
            }
        }else{
            const indexToRemove = selectedCategories.indexOf($(this).val());
            if (indexToRemove !== -1) {
                selectedCategories.splice(indexToRemove, 1);
            }
        }
        rewardsScrollToTop = true;
        refreshAndReload();

    });
    $('.offer-types-checkbox-list input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
            if(!selectedOfferTypes.includes($(this).val())){
                selectedOfferTypes.push($(this).val());
            }
        }else{
            const indexToRemove = selectedOfferTypes.indexOf($(this).val());
            if (indexToRemove !== -1) {
                selectedOfferTypes.splice(indexToRemove, 1);
            }
        }
        rewardsScrollToTop = true;
        refreshAndReload();

    });
    $('.packages-checkbox-list input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
            if(!selectedPackages.includes($(this).val())){
                selectedPackages.push($(this).val());
            }
        }else{
            const indexToRemove = selectedPackages.indexOf($(this).val());
            if (indexToRemove !== -1) {
                selectedPackages.splice(indexToRemove, 1);
            }
        }
        rewardsScrollToTop = true;
        refreshAndReload();
    });
    $('.cards-checkbox-list input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
            if(!selectedCards.includes($(this).val())){
                selectedCards.push($(this).val());
            }
        }else{
            const indexToRemove = selectedCards.indexOf($(this).val());
            if (indexToRemove !== -1) {
                selectedCards.splice(indexToRemove, 1);
            }
        }
        rewardsScrollToTop = true;
        refreshAndReload();
    });
    $('.brands-checkbox-list input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
            if(!selectedBrands.includes($(this).val())){
                selectedBrands.push($(this).val());
            }
        }else{
            const indexToRemove = selectedBrands.indexOf($(this).val());
            if (indexToRemove !== -1) {
                selectedBrands.splice(indexToRemove, 1);
            }
        }
        rewardsScrollToTop = true;
        refreshAndReload();
    });

    $categoriesCount.on('click', '#remove-all-selected', function(event) {
        event.preventDefault();
        resetFilters();
        refreshAndReload();
    });

    function uncheckAllFilters() {
        $('.rewards-checkbox-list').each(function () {
            $(this).find('input[type="checkbox"]:checked').prop('checked', false);
        });
    }

    function resetFilters() {
        selectedCategories.length = 0;
        selectedOfferTypes.length = 0;
        selectedCards.length = 0;
        selectedPackages.length = 0;
        selectedBrands.length = 0;
        uncheckAllFilters();
    }

    $removeMobFilters.click(function(event) {
        event.preventDefault();
        if (!$(this).hasClass('disabled')) {
            resetFilters();
            refreshAndReload();
        }
    });

    function refreshAndReload(){
        offerIDforFilter="";
        $rewardsSearchInput.val('');
        searchInputEventTriggered = false;
        refresh();
    }

    function refresh(){
        refreshTotalResultCount = true;
        refreshCategoryCounts = true;
        $rewardsContainer.empty();
        offset = 0;
        loadData();
    }

    $rewardsSearchInput.autocomplete({

        source: contextPath + "/.rest/rewards/v2/searchOffers?lang=" + lang,
        minLength: 3,
        select: function(event, ui) {
            offerIDforFilter = ui.item.id;
            refresh();
        },

        html: true, // optional (jquery.ui.autocomplete.html.js required)

        // optional (if other layers overlap autocomplete list)
        open: function(event, ui) {
            $(".ui-autocomplete").css("z-index", 100001);
            $(".ui-autocomplete li.ui-menu-item").each(function() {
                if (this.scrollHeight > this.clientHeight ) {
                    $(this).css('height', '44px'); // Update the height to 44px
                }
            });
        }
    });

    $rewardsSearchInput.on("input", function() {
        if(!searchInputEventTriggered) {
            resetFilters();
            refresh();
            searchInputEventTriggered = true;
            $rewardsSearchButton.prop('disabled', false);
        }else{
            if ($(this).val() === "") {
                refreshAndReload();
                $rewardsSearchButton.prop('disabled', true);
            }
        }
    });

    $brandsSearchInput.on('input', function() {
        var searchString = $(this).val().toLowerCase();
        if(searchString === "") {
            $('.brands-checkbox-list .brand-item').each(function (index) {
                $(this).show();
            });
        }else{
            $loadMoreBrandsLi.hide();
            $('.brands-checkbox-list .brand-item').each(function () {
                var checkboxValue = $(this).text().trim().toLowerCase();
                if (checkboxValue.includes(searchString)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    $rewardsBrandsBtnGroup.on("click", function() {
    //$('#rewards-brands-btn-slider').on('click', '.btn', function() {
        var buttonText = $(this).text().trim();
        var buttonAltText = $(this).data('alt');
        $loadMoreBrandsLi.hide();
        $('.brands-checkbox-list .brand-item').each(function () {
            var checkboxValue = $(this).text().trim().toLowerCase();
            if(buttonText === "#"){
                if(startsWithNumberOrSpecialChar(checkboxValue)){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            }else {
                if (checkboxValue.startsWith(buttonText.toLowerCase()) || (typeof buttonAltText !== 'undefined' && checkboxValue.startsWith(buttonAltText.trim().toLowerCase()))) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }
        });
        $rewardsBrandsBtnGroup.removeClass("active");
        $(this).addClass("active");
    });

    function startsWithNumberOrSpecialChar(str) {
        var regex = /^[0-9!@#$%^&*()_+-=]/;
        return regex.test(str);
    }

    // $loadMoreBrandsButton.on('click', function() {
    //     $('.brands-checkbox-list .brand-item:hidden:lt(4)')
    //         .slideDown('slow', function() {
    //             $(".rewards-sidebar .brands-accordion-body-scroll").mCustomScrollbar("scrollTo", "bottom");
    //             if($('.brands-checkbox-list .brand-item:hidden').length === 0){
    //                 $loadMoreBrandsLi.hide();
    //             }
    //         });
    // });

    $rewardsContainer.on('click', '.showLoginFormFromOfferList', function(event) {
        event.preventDefault();
        $(".list-offers-login").fadeIn();
        isAnimating = true;
        $([document.documentElement, document.body]).stop(true).animate({
            scrollTop: $(".list-offers-login").offset().top
        }, 2000, function() { isAnimating = false; });
    });

    $rewardsSort.on("change", function() {
        var selectedValue = $(this).val();
        if (selectedValue !== '') {
            sortOption = selectedValue;
            rewardsScrollToTop = true;
            refreshAndReload();
        }else if(sortOption !== sortOptionDefault){
            sortOption = sortOptionDefault;
            rewardsScrollToTop = true;
            refreshAndReload();
        }
    });

    /*$(".rewards-sidebar .accordion-body-scroll").mCustomScrollbar({
        setHeight:300,
        advanced:{
            autoScrollOnFocus: false,
        }
    });
    $(".rewards-sidebar .brands-scroll").mCustomScrollbar({
        setHeight:275,
        advanced:{
            autoScrollOnFocus: false,
        }
    });*/
    $('.rewards-sidebar .accordion-body-scroll').each(function() {
        new SimpleBar($(this)[0], { autoHide: false, forceVisible: true, clickOnTrack: false, direction: direction });
    });
    new SimpleBar($(".rewards-sidebar .brands-scroll")[0], { autoHide: false, forceVisible: true, clickOnTrack: false, direction: direction });


    /*$("#rewards-brands-btn-slider").mCustomScrollbar({
        axis: "x", // horizontal scrolling
        advanced: { autoExpandHorizontalScroll: true }, // expand to fit content width
        scrollButtons: { enable: true }, // enable scroll buttons
        keyboard: { enable: true }, // enable keyboard scrolling
        mouseWheel: { enable: false }, // disable mouse wheel scrolling
        snapAmount: $(".btn").outerWidth(true), // snap to button width
        snapOffset: 0 // snap offset
    });*/
    $(".mobile-floating").stick_in_parent({
        offset_top: 0,
        parent: "body"
    });

    var $goToTop = $('#totop'),
        scrollOffsetFromTop = $rewardsContainer.offset().top + 300;

    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollOffsetFromTop) {
            $goToTop.fadeIn("slow");
        } else {
            $goToTop.fadeOut("slow");
        }
    });

    $('body,html').on('touchstart', function() {
        if (isAnimating) {
            $('body,html').stop(true, false); // Stop the animation without jumping to the end
            isAnimating = false; // Update flag
        }
    });

    $goToTop.on("click", function () {
        isAnimating = true;
        $('body,html').stop(true).animate({
            scrollTop: $(".container-rewards").offset().top
        }, 1500, 'easeInOutExpo', function() {
            isAnimating = false;
        });
        return false;
    });

    $('#accordion-sidebar').on('show.bs.collapse', function(e) {
        $(this).find('.collapse.show').collapse('hide');
    });


})(jQuery);

function removeSelected(clickedElement,event) {
    event.preventDefault();
    const dataIdValue = $(clickedElement).data('id');
    $('input[type="checkbox"][value="' + dataIdValue + '"]').prop('checked', false).trigger('change');
}