/**
 * Created by Miroslav Pashaliski on 1/18/2017.
 */
var interestRate;
$(document).ready(function(){

	interestRate = $("#interestRate").val();
    //miles calculator click result
    $("#milesCalculator").validate({
        rules: {
            amountSpentLocally: {
                required: true,
                digits: true
            },
            amountSpentAbroad: {
                required: true,
                digits: true
            }
        },
        messages: {
            amountSpentLocally: {
                required: "The field is required",
                digits: "Please enter only digits"
            },
            amountSpentAbroad: {
                required: "The field is required",
                digits: "Please enter only digits"
            }
        },
        submitHandler: function(label) {

            var amountLocally = $('.miles-calculator #amount-spent-locally').val();
            var amountAboard = $('.miles-calculator #amount-spent-abroad').val();

            //local points ( 3 * locally amount spent)
            var localMilesPoints = amountLocally * 3;
            //international points
            var internationalMilesPoints = amountAboard * 5;
            //total points ( local + international )
            var totalPoints = localMilesPoints + internationalMilesPoints;

            $(".miles-calculator #local-nbk-miles-points").text(localMilesPoints);
            $(".miles-calculator #international-nbk-miles-points").text(internationalMilesPoints);
            $(".miles-calculator #total-nbk-miles-points").text(totalPoints);

            //show result
            $('.miles-calculator .miles-calculator-result').show();

            return false;
        }
    });
    
    $("#milesCalculatorPage").validate({
        rules: {
            amountSpentLocally: {
                required: true,
                digits: true
            },
            amountSpentAbroad: {
                required: true,
                digits: true
            }
        },
        messages: {
            amountSpentLocally: {
                required: "The field is required",
                digits: "Please enter only digits"
            },
            amountSpentAbroad: {
                required: "The field is required",
                digits: "Please enter only digits"
            }
        },
        submitHandler: function(label) {

            var amountLocally = $('.miles-calculator-page #amount-spent-locally').val();
            var amountAboard = $('.miles-calculator-page #amount-spent-abroad').val();

            //local points ( 3 * locally amount spent)
            var localMilesPoints = amountLocally * 3;
            //international points
            var internationalMilesPoints = amountAboard * 5;
            //total points ( local + international )
            var totalPoints = localMilesPoints + internationalMilesPoints;

            $(".miles-calculator-page #local-nbk-miles-points").text(localMilesPoints);
            $(".miles-calculator-page #international-nbk-miles-points").text(internationalMilesPoints);
            $(".miles-calculator-page #total-nbk-miles-points").text(totalPoints);

            //show result
            $('.miles-calculator-page .miles-calculator-result').show();

            return false;
        }
    });


    $("#generateIban").click(function(){
        GenerateIBAN($("#accountNumber").val());
    });
    $("#accountNumber").keypress(function (e) {
        if (e.keyCode == 13) {
            GenerateIBAN($("#accountNumber").val());
            return false;
        }
    });
    $("#calculateLoanRefinanceEgypt").click(function (e) {
        $("#loanRefinanceError").hide();
        $("#availableElegibly").hide();
        $("#notAvailableElegibly").hide();
        $("#notAvailableElegibly").find(".tmp").remove();
        $("#notEligibly").hide();

        var month = parseInt($("#loanRefinanceMonth option:selected").val());
        var year = parseInt($("#loanRefinanceYear option:selected").val());
        var loanTerm = parseInt($("#loanRefinancePeriod option:selected").val());

        var eligibleDate = new Date(year + 1 , month - 1, 1);
        var todayDate = new Date();

        if (new Date(year , month - 1, 1)> todayDate || isNaN(month)) {
            $("#loanRefinanceError").show();
        }else{
            $("#loanRefinanceError").hide();

            if(loanTerm == 12){
                $("#notEligibly").show();
            }else{
                if( eligibleDate > todayDate){

                    var month = ( eligibleDate.getMonth() + 1 );
                    $("#notAvailableElegibly").show().append("<span class='tmp'>" + month + " "+ eligibleDate.getUTCFullYear() +"</span>");
                }else{
                    $("#availableElegibly").show();
                }
            }
        }

    });
    $("#calculateLoanRefinance").click(function (e) {
        $(".loans-refinance-calculator #loanRefinanceError").hide();
        $(".loans-refinance-calculator #availableElegibly").hide();
        $(".loans-refinance-calculator #notAvailableElegibly").hide();
        var month = parseInt($(".loans-refinance-calculator #loanRefinanceMonth option:selected").val());
        var year = parseInt($(".loans-refinance-calculator #loanRefinanceYear option:selected").val());
        var loanTerm = parseInt($(".loans-refinance-calculator #loanRefinancePeriod option:selected").val());
        if (new Date(year, month - 1, 1) > new Date() || isNaN(month)) {
            $(".loans-refinance-calculator #loanRefinanceError").show();
        }else{
            $(".loans-refinance-calculator #loanRefinanceError").hide();
            var totalMonth = (new Date().getMonth() + 1) - month;
            var totalYear = ((new Date().getFullYear()) - year) * 12;
            var total = (totalYear + totalMonth);
            var eligibility = (total / loanTerm) * 100;
            eligibility = Math.floor(eligibility);
            if (eligibility >= 30) {
                $(".loans-refinance-calculator #notAvailableElegibly").hide();
                $(".loans-refinance-calculator #availableElegibly").show();
            }else{
                var eligible = (loanTerm * 0.3);
                eligible = Math.ceil(eligible);
                var eligibleDate = new Date(year, month, 1);
                eligibleDate.setMonth(eligibleDate.getMonth() + eligible - 1);
                $(".loans-refinance-calculator #availableElegibly").hide();
                $(".loans-refinance-calculator #notAvailableElegibly").find(".tmp").remove();
                var monthRes = parseInt(eligibleDate.getMonth());
                monthRes = monthRes + 1;
                if(monthRes<10){

                    monthRes = '0'+ monthRes
                }
                $(".loans-refinance-calculator #notAvailableElegibly").show().append("<span class='tmp'>" + $(".loans-refinance-calculator #loanRefinanceMonth option[value='"+monthRes+"']").text() +" "+ eligibleDate.getUTCFullYear() +"</span>");
            }
        }
    });
    
    
    $("#calculateLoanRefinancePage").click(function (e) {
        $(".loans-refinance-calculator-page #loanRefinanceError").hide();
        $(".loans-refinance-calculator-page #availableElegibly").hide();
        $(".loans-refinance-calculator-page #notAvailableElegibly").hide();
        var month = parseInt($(".loans-refinance-calculator-page #loanRefinanceMonth option:selected").val());
        var year = parseInt($(".loans-refinance-calculator-page #loanRefinanceYear option:selected").val());
        var loanTerm = parseInt($(".loans-refinance-calculator-page #loanRefinancePeriod option:selected").val());
        if (new Date(year, month - 1, 1) > new Date() || isNaN(month)) {
            $(".loans-refinance-calculator-page #loanRefinanceError").show();
        }else{
            $(".loans-refinance-calculator-page #loanRefinanceError").hide();
            var totalMonth = (new Date().getMonth() + 1) - month;
            var totalYear = ((new Date().getFullYear()) - year) * 12;
            var total = (totalYear + totalMonth);
            var eligibility = (total / loanTerm) * 100;
            eligibility = Math.floor(eligibility);
            if (eligibility >= 30) {
                $(".loans-refinance-calculator-page #notAvailableElegibly").hide();
                $(".loans-refinance-calculator-page #availableElegibly").show();
            }else{
                var eligible = (loanTerm * 0.3);
                eligible = Math.ceil(eligible);
                var eligibleDate = new Date(year, month, 1);
                eligibleDate.setMonth(eligibleDate.getMonth() + eligible - 1);
                $(".loans-refinance-calculator-page #availableElegibly").hide();
                $(".loans-refinance-calculator-page #notAvailableElegibly").find(".tmp").remove();
                var monthRes = parseInt(eligibleDate.getMonth());
                monthRes = monthRes + 1;
                if(monthRes<10){

                    monthRes = '0'+ monthRes
                }
                $(".loans-refinance-calculator-page #notAvailableElegibly").show().append("<span class='tmp'>" + $(".loans-refinance-calculator-page #loanRefinanceMonth option[value='"+monthRes+"']").text() +" "+ eligibleDate.getUTCFullYear() +"</span>");
            }
        }
    });

    //jawahara calculator
    $("#alJawhara").validate({
        submitHandler: function(label, event) {
            event.preventDefault();
            var depositAmount = $('.jawahara-calculator #deposit-amount').val();

            var mod = depositAmount  % 50;
            var division = depositAmount / 50;
            var flor = Math.floor(division);


            var yourChances = flor;
            var yourChancesNoWithdrawal = yourChances * 2;
            if(mod >= 25){
                yourChancesNoWithdrawal = yourChancesNoWithdrawal + 1;
            }

            $(".jawahara-calculator #your-chances").text(yourChances);
            $(".jawahara-calculator #your-chances-no-withdrawal").text(yourChancesNoWithdrawal);
            $(".jawahara-calculator .jawahara-calculator-result").show();

            return false;
        }
    });
    
    
  //jawahara calculator
    $("#alJawharaPage").validate({
        submitHandler: function(label, event) {
            event.preventDefault();
            var depositAmount = $('.jawahara-calculator-page #deposit-amount').val();

            var mod = depositAmount  % 50;
            var division = depositAmount / 50;
            var flor = Math.floor(division);


            var yourChances = flor;
            var yourChancesNoWithdrawal = yourChances * 2;
            if(mod >= 25){
                yourChancesNoWithdrawal = yourChancesNoWithdrawal + 1;
            }

            $(".jawahara-calculator-page #your-chances").text(yourChances);
            $(".jawahara-calculator-page #your-chances-no-withdrawal").text(yourChancesNoWithdrawal);
            $(".jawahara-calculator-page .jawahara-calculator-result").show();

            return false;
        }
    });
    
    
    //reward validation
    $("#reward").validate({
        rules: {
            partners: {
                required: true
            },
            totalAmountSpend: {
                required: true,
                digits: true
            }
        },
        submitHandler: function(label) {
            $('.reward-calculator .notEntitled').hide();
            $('.reward-calculator .rewards-calculator-result').show();

            var discountPercentage = $('.reward-calculator select.partners').find(':selected').val();
            var minSpendAmountRequired = $('.reward-calculator select.partners').find(':selected').data("min-amount");

            var amountSpend = $('.reward-calculator #totalAmountSpend').val();

            if(amountSpend < minSpendAmountRequired){
                $('.reward-calculator #discount-percentage').text("-");
                $('.reward-calculator #total-earned').text("-");
                $('.reward-calculator .notEntitled').show();
            }else{
                $('.reward-calculator #discount-percentage').text(discountPercentage);

                var totalPointEarned = ( amountSpend * discountPercentage ) / 100;

                $('.reward-calculator #total-earned').text(totalPointEarned);
            }

            return false;
        }
    });
    
    
    $("#rewardPage").validate({
        rules: {
            partners: {
                required: true
            },
            totalAmountSpend: {
                required: true,
                digits: true
            }
        },
        submitHandler: function(label) {
            $('.reward-calculator-page .notEntitled').hide();
            $('.reward-calculator-page .rewards-calculator-result').show();

            var discountPercentage = $('.reward-calculator-page  select.partners').find(':selected').val();
            var minSpendAmountRequired = $('.reward-calculator-page  select.partners').find(':selected').data("min-amount");

            var amountSpend = $('.reward-calculator-page  #totalAmountSpend').val();

            if(amountSpend < minSpendAmountRequired){
                $('.reward-calculator-page  #discount-percentage').text("-");
                $('.reward-calculator-page  #total-earned').text("-");
                $('.reward-calculator-page  .notEntitled').show();
            }else{
                $('.reward-calculator-page  #discount-percentage').text(discountPercentage);

                var totalPointEarned = ( amountSpend * discountPercentage ) / 100;

                $('.reward-calculator-page  #total-earned').text(totalPointEarned);
            }

            return false;
        }
    });


    $("#borrowType").click(function(){
        var loanTypeValue = $('#loanTypeEgypt option:selected').val();

        $(this).addClass("active");
        $(".loans-calculator .salaryInputWrapper").show();
        $(".loans-calculator .loanAmountInputWrapper").hide();
        $(".loans-calculator #loanAmountResultWrapper").show();
        $(".loans-calculator #resultForLoanAmount").text("");
        $(".loans-calculator #calcType").val($(this).data("value"));
        $(".loans-calculator #resultForEmi").text("");
        $(".loans-calculator #affordType").removeClass("active");
        callActionBasedOnCountry();
    });
    $("#affordType").click(function(){
        $(this).addClass("active");
        $(".loans-calculator .salaryInputWrapper").hide();
        $(".loans-calculator .loanAmountInputWrapper").show();
        $(".loans-calculator #calcType").val($(this).data("value"));
        $(".loans-calculator #resultForEmi").text("");
        $(".loans-calculator #loanAmountResultWrapper").hide();
        $(".loans-calculator #borrowType").removeClass("active");
        $(".loans-calculator .car-house").hide();
        callActionBasedOnCountry();

    });
    $("#loanType").change(function () {
       showLoanCalculatorSlider();
    });
    $("#loanCalcNationality").change(function () {
        showLoanCalculatorSlider();
        showOrHideStatusLoanCalculatorField(this.value);
    });
    function showLoanCalculatorSlider(){
        var natValue = $('.loans-calculator #loanCalcNationality option:selected').val();
        var loanTypeValue = $('.loans-calculator #loanType option:selected').val();
        if(natValue == "expatriate" && loanTypeValue == "installment"){
            $(".loans-calculator .slider-60-wrapper").hide();
            $(".loans-calculator .slider-180-wrapper").hide();
            $(".loans-calculator .slider-120-wrapper").show();
        }else if(natValue != "expatriate" && loanTypeValue == "installment"){
            $(".loans-calculator .slider-60-wrapper").hide();
            $(".loans-calculator .slider-180-wrapper").show();
            $(".loans-calculator .slider-120-wrapper").hide();
        }else{
            $(".loans-calculator .slider-60-wrapper").show();
            $(".loans-calculator .slider-180-wrapper").hide();
            $(".loans-calculator .slider-120-wrapper").hide();
        }
    }

    function showOrHideStatusLoanCalculatorField(value){
        if( value == "expatriate"){
            $('#loanCalculatorForm #dk_container_statusLoanCalculator').addClass("gd-disable");
            var label = $(".loans-calculator #statusLoanCalculator").find("option:first-child").text();
            $(".loans-calculator #statusLoanCalculator option").removeAttr("selected");
            $(".loans-calculator #statusLoanCalculator option:first-child").attr("selected");
            $(".loans-calculator #dk_container_statusLoanCalculator .dk_toggle.dk_label").text(label);
            $(".loans-calculator #dk_container_statusLoanCalculator .dk_options_inner li").removeClass("dk_option_current");
            $('.loans-calculator #dk_container_statusLoanCalculator .dk_options_inner li:first-child').addClass('dk_option_current');
        }else{
            $('#loanCalculatorForm #dk_container_statusLoanCalculator').removeClass("gd-disable");
        }
    }

    $("#loanCalculatorForm").validate({
        rules: {

            salary: {
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "borrow";
                    }
                },
                min: 400,
                number: true
            },
            loanAmountInput: {
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "afford";
                    }
                },
                min:1000,
                number: true,
                max: function () {
                    if($(".loans-calculator #loanType").val() == "installment"){
                        return 70000;
                    }else{
                        return 25000;
                    }
                }
            },
            salaryLebanon:{
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "borrow";
                    }
                },
                number: true,
                min: function () {
                    if($("#loanTypeLebanon").val() == "personal"){
                        return 1200;
                    }else if ($("#loanTypeLebanon").val() == "housing"){
                        return 2000;
                    }
                },

            },
            salaryEgypt:{
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "borrow";
                    }
                },
                number: true,
                min: function (){
                    return $("#loanTypeEgypt option:selected").data("min-salary");
                }

            },
            loanAmIBG:{
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "afford";
                    }
                },
                number: true
            },
            salaryUAE:{
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "borrow";
                    }
                },
                min: 15000,
                number: true
            },

            salaryJordan:{
                required:{
                    depends: function(element) {
                        return $(".loans-calculator #calcType").val() == "borrow";
                    }
                },
                min: function () {
                    if($("#loanTypeJordan").val() == "personal"){
                        return 500;
                    }else if ($("#loanTypeJordan").val() == "mortgage"){
                        return 1500;
                    }
                },
                number: true
            },
            downPayment:{
                number: true,
                max: function () {
                    return parseInt($(".loans-calculator #propertyValue").val());
                },
                min: function () {
                    var minValue = $(".loans-calculator #down-payment").attr("data-minvalue");
                    if(!isNaN(minValue) && minValue){
                        return parseInt(minValue);
                    }else{
                        return parseInt(minValue);
                    }

                },

                required:true
            },
            carHousePrice:{
                required:true,
                number: true
            },
        },
        submitHandler: function(label,event) {
            event.preventDefault();
            var country = $(".loans-calculator #calcForCountry").val();

            if(country == "egypt"){
                calculateLoanWithEgyptParams();
            }else if(country == "jordan") {
                calculateLoanWithJordanParams();
            }else if(country == "lebanon"){
                calculateLoanWithLebanonParams();
            }else if(country == "london"){
                calculateLoanWithLondonParams();
            }
            else if(country == "uae"){
                calculateLoanWithUAEParams();
            }
            else {
                $(".loans-calculator .checked").removeClass("checked");
                $(".loans-calculator .last-period").addClass("checked");
                var natValue = $('.loans-calculator #loanCalcNationality option:selected').val();
                var calcType =  $(".loans-calculator #calcType").val();
                var loanType = $(".loans-calculator #loanType option:selected").val();
                var statusValueForMMI = $(".loans-calculator #statusLoanCalculator option:selected").val();
                if (calcType == 'borrow') {
                    if(natValue == "expatriate" && loanType == "installment"){
                        setValuesForEmiAndLoanAmount(120, 70000);
                    }else if(natValue != "expatriate" && loanType == "installment"){
                        setValuesForEmiAndLoanAmount(180, 70000);
                    }else{
                        setValuesForEmiAndLoanAmount(60, 25000);
                    }
                }else if (calcType == 'afford') {
                    if(natValue == "expatriate" && loanType == "installment"){
                        setValuesForEmiForAffordType(120, 70000);
                    }else if(natValue != "expatriate" && loanType == "installment"){
                        setValuesForEmiForAffordType(180, 70000);
                    }else{
                        setValuesForEmiForAffordType(60, 25000);
                    }
                }
            }
        }
    });
    $(".loans-calculator .repayment-month ul li").click(function(){
        var selectedPeriod = parseInt($(this).data("value"));
        $('.loans-calculator .repayment-month ul li.checked').not(this).removeClass('checked');
        $(this).addClass('checked');
        var calcType = $(".loans-calculator #calcType").val();
        var country = $(".loans-calculator #calcForCountry").val();
        var loanType = $(".loans-calculator #loanType option:selected").val();
        if(country == "egypt"){
            calculateLoanWithEgyptParams();
        }else if(country == "jordan") {
            calculateLoanWithJordanParams();
        }else if(country == "lebanon") {
            calculateLoanWithLebanonParams();
        }else if(country == "london"){
            calculateLoanWithLondonParams();
        }else if(country == "uae"){
            calculateLoanWithUAEParams();
        }
        else {
            if(calcType == "borrow"){
                if(selectedPeriod > 60 || loanType == "installment"){
                    setValuesForEmiAndLoanAmount(selectedPeriod,70000);
                }else{
                    setValuesForEmiAndLoanAmount(selectedPeriod, 25000)
                }
            }else if(calcType == "afford"){
                if(selectedPeriod > 60  || loanType == "installment" ){
                    setValuesForEmiForAffordType(selectedPeriod,70000);
                }else{
                    setValuesForEmiForAffordType(selectedPeriod, 25000)
                }
            }
        }
    });

    function callActionBasedOnCountry() {
        var country = $("#calcForCountry").val();
        if(country == 'egypt'){
            actionsEgypt();
        }else if(country == 'lebanon'){
            actionsLebanon();
        }else if(country == 'london'){
            actionsLondon();
        }else if(country == 'jordan'){
            actionsJordan();
        }else if(country == 'uae'){
            actionsUAE();
        }
    }

    function actionsLebanon() {
        var loanTypeValue = $('#loanTypeLebanon option:selected').val();
//        if (loanTypeValue == "personal") {
//            $(".slider-72-wrapper-lebanon").show();
//            $(".slider-240-wrapper-lebanon").hide();
//        } else if (loanTypeValue == "housing") {
//            $(".slider-72-wrapper-lebanon").hide();
//            $(".slider-240-wrapper-lebanon").show();
//
//        }
        if (loanTypeValue == "auto"){ 
        	$(".slider-month-personal-wrapper-lebanon").hide();
        	$(".slider-year-wrapper-lebanon").hide();
        	$(".slider-month-auto-wrapper-lebanon").show();
        }
        else if(loanTypeValue == "personal") {
        	$(".slider-month-personal-wrapper-lebanon").show();
        	$(".slider-month-auto-wrapper-lebanon").hide();
        	$(".slider-year-wrapper-lebanon").hide();
        } else if (loanTypeValue == "housing") {
        	$(".slider-year-wrapper-lebanon").show();
        	$(".slider-month-auto-wrapper-lebanon").hide();
        	$(".slider-month-personal-wrapper-lebanon").hide();
        }
        if($('.loans-calculator #borrowType').hasClass('active')){
            if(loanTypeValue == "personal"){
                $(".car-house").hide();
            }else{
                $(".car-house").show();
            }
        }
        $(".loans-calculator .repayment-month ul li").removeClass("checked");
        $(".loans-calculator .repayment-month ul li.defaultValueForSlider").addClass("checked");
    }


    $("#loanTypeLebanon").change(function() {
        actionsLebanon();
    });



    function actionsEgypt() {
        var loanTypeValue = $('#loanTypeEgypt option:selected').val();
//        if (loanTypeValue == "auto") {
//            $(".slider-72-wrapper-egypt").show();
//            $(".slider-180-wrapper-egypt").hide();
//            $(".slider-96-wrapper-egypt").hide();
//
//        } else if (loanTypeValue == "mortgage") {
//            $(".slider-180-wrapper-egypt").show();
//            $(".slider-72-wrapper-egypt").hide();
//            $(".slider-96-wrapper-egypt").hide();
//
//        } else if (loanTypeValue = "personal") {
//            $(".slider-180-wrapper-egypt").hide();
//            $(".slider-72-wrapper-egypt").hide();
//            $(".slider-96-wrapper-egypt").show();
//
//        }
        
        if (loanTypeValue == "auto"){
        	$(".slider-month-auto-wrapper-egypt").show();
        	$(".slider-month-personal-wrapper-egypt").hide();
    		$(".slider-year-wrapper-egypt").hide();
    	} else if (loanTypeValue == "personal") {
        	$(".slider-month-personal-wrapper-egypt").show();
        	$(".slider-month-auto-wrapper-egypt").hide();
        	$(".slider-year-wrapper-egypt").hide();
        } else if (loanTypeValue == "mortgage") {
        	$(".slider-month-auto-wrapper-egypt").hide();
        	$(".slider-month-personal-wrapper-egypt").hide();
        	$(".slider-year-wrapper-egypt").show();
        }
        checkSliderForEgypt();
    }

    $("#loanTypeEgypt").change(function() {
        actionsEgypt();
    });
    function actionsJordan(){
        var loanTypeValue = $('#loanTypeJordan option:selected').val();
        $(".loans-calculator .repayment-month ul li").removeClass("checked");
        $(".loans-calculator .repayment-month ul li:last-child").addClass("checked");
//        if(loanTypeValue == "personal") {
//            $(".slider-96-wrapper-jordan").show();
//            $(".slider-180-wrapper-jordan").hide();
//        }else{
//            $(".slider-96-wrapper-jordan").hide();
//            $(".slider-180-wrapper-jordan").show();
//        }
        if($('.loans-calculator #borrowType').hasClass('active')){
            if(loanTypeValue == "personal") {
                $(".car-house").hide();
            } else if(loanTypeValue == "mortgage"){
                $(".car-house").show();
            }
        }
        
        if (loanTypeValue == "auto"){
        	$(".slider-month-auto-wrapper-jordan").show();
        	$(".slider-month-personal-wrapper-jordan").hide();
        	$(".slider-year-wrapper-jordan").hide();
        }
        else if(loanTypeValue == "personal") {
        	$(".slider-month-personal-wrapper-jordan").show();
        	$(".slider-month-auto-wrapper-jordan").hide();
        	$(".slider-year-wrapper-jordan").hide();
        } else if (loanTypeValue == "mortgage") {
        	$(".slider-month-personal-wrapper-jordan").hide();
        	$(".slider-month-auto-wrapper-jordan").hide()
        	$(".slider-year-wrapper-jordan").show();
        }
    }

    $("#loanTypeJordan").change(function () {
        actionsJordan();
    });
    
    
    
    $("#borrowTypePage").click(function(){

        $(this).addClass("active");
        $(".loans-calculator-page .salaryInputWrapper").show();
        $(".loans-calculator-page .loanAmountInputWrapper").hide();
        $(".loans-calculator-page #loanAmountResultWrapper").show();
        $(".loans-calculator-page #resultForLoanAmount").text("");
        $(".loans-calculator-page #calcType").val($(this).data("value"));
        $(".loans-calculator-page #resultForEmi").text("");
        $(".loans-calculator-page #affordTypePage").removeClass("active");
    });
    $("#affordTypePage").click(function(){
        $(this).addClass("active");
        $(".loans-calculator-page .salaryInputWrapper").hide();
        $(".loans-calculator-page .loanAmountInputWrapper").show();
        $(".loans-calculator-page #calcType").val($(this).data("value"));
        $(".loans-calculator-page #resultForEmi").text("");
        $(".loans-calculator-page #loanAmountResultWrapper").hide();
        $(".loans-calculator-page#borrowTypePage").removeClass("active");
        $(".loans-calculator-page .car-house").hide();

    });
    
    $("#loanTypePage").change(function () {
        showLoanCalculatorSliderPage();
     });
     $("#loanCalcNationalityPage").change(function () {
         showLoanCalculatorSliderPage();
         showOrHideStatusLoanCalculatorFieldPage(this.value);
     });
     function showLoanCalculatorSliderPage(){
         var natValue = $('.loans-calculator-page #loanCalcNationalityPage option:selected').val();
         var loanTypeValue = $('.loans-calculator-page #loanTypePage option:selected').val();
         if(natValue == "expatriate" && loanTypeValue == "installment"){
             $(".loans-calculator-page .slider-60-wrapper").hide();
             $(".loans-calculator-page .slider-180-wrapper").hide();
             $(".loans-calculator-page .slider-120-wrapper").show();
         }else if(natValue != "expatriate" && loanTypeValue == "installment"){
             $(".loans-calculator-page .slider-60-wrapper").hide();
             $(".loans-calculator-page .slider-180-wrapper").show();
             $(".loans-calculator-page .slider-120-wrapper").hide();
         }else{
             $(".loans-calculator-page .slider-60-wrapper").show();
             $(".loans-calculator-page .slider-180-wrapper").hide();
             $(".loans-calculator-page .slider-120-wrapper").hide();
         }
     }

     function showOrHideStatusLoanCalculatorFieldPage(value){
         if( value == "expatriate"){
             $('#loanCalculatorFormPage #dk_container_statusLoanCalculator').addClass("gd-disable");
             var label = $(".loans-calculator-page #statusLoanCalculator").find("option:first-child").text();
             $(".loans-calculator-page #statusLoanCalculator option").removeAttr("selected");
             $(".loans-calculator-page #statusLoanCalculator option:first-child").attr("selected");
             $(".loans-calculator-page #dk_container_statusLoanCalculator .dk_toggle.dk_label").text(label);
             $(".loans-calculator-page #dk_container_statusLoanCalculator .dk_options_inner li").removeClass("dk_option_current");
             $('.loans-calculator-page #dk_container_statusLoanCalculator .dk_options_inner li:first-child').addClass('dk_option_current');
         }else{
             $('#loanCalculatorFormPage #dk_container_statusLoanCalculator').removeClass("gd-disable");
         }
     }
    
    $("#loanCalculatorFormPage").validate({
        rules: {

            salary: {
                required:{
                    depends: function(element) {
                        return $(".loans-calculator-page #calcType").val() == "borrow";
                    }
                },
                min: 400,
                number: true
            },
            loanAmountInput: {
                required:{
                    depends: function(element) {
                        return $(".loans-calculator-page #calcType").val() == "afford";
                    }
                },
                min:1000,
                number: true,
                max: function () {
                    if($(".loans-calculator-page #loanTypePage").val() == "installment"){
                        return 70000;
                    }else{
                        return 25000;
                    }
                }
            },
            downPayment:{
                number: true,
                max: function () {
                    return parseInt($(".loans-calculator-page #propertyValue").val());
                },
                min: function () {
                    var minValue = $(".loans-calculator-page #down-payment").attr("data-minvalue");
                    if(!isNaN(minValue) && minValue){
                        return parseInt(minValue);
                    }else{
                        return parseInt(minValue);
                    }

                },

                required:true
            },
            carHousePrice:{
                required:true,
                number: true
            },
        },
        submitHandler: function(label,event) {
            event.preventDefault();
	        $(".loans-calculator-page .checked").removeClass("checked");
	        $(".loans-calculator-page .last-period").addClass("checked");
	        var natValue = $('.loans-calculator-page #loanCalcNationalityPage option:selected').val();
	        var calcType =  $(".loans-calculator-page #calcType").val();
	        var loanType = $(".loans-calculator-page #loanTypePage option:selected").val();
	        var statusValueForMMI = $(".loans-calculator-page #statusLoanCalculator option:selected").val();
	        if (calcType == 'borrow') {
	            if(natValue == "expatriate" && loanType == "installment"){
	                setValuesForEmiAndLoanAmountPage(120, 70000);
	            }else if(natValue != "expatriate" && loanType == "installment"){
	                setValuesForEmiAndLoanAmountPage(180, 70000);
	            }else{
	                setValuesForEmiAndLoanAmountPage(60, 25000);
	            }
	        }else if (calcType == 'afford') {
	            if(natValue == "expatriate" && loanType == "installment"){
	                setValuesForEmiForAffordTypePage(120, 70000);
	            }else if(natValue != "expatriate" && loanType == "installment"){
	                setValuesForEmiForAffordTypePage(180, 70000);
	            }else{
	                setValuesForEmiForAffordTypePage(60, 25000);
	            }
	        }
        }
    });
    $(".loans-calculator-page .repayment-month ul li").click(function(){
        var selectedPeriod = parseInt($(this).data("value"));
        $('.loans-calculator-page .repayment-month ul li.checked').not(this).removeClass('checked');
        $(this).addClass('checked');
        var calcType = $(".loans-calculator-page #calcType").val();
        var country = $(".loans-calculator-page #calcForCountry").val();
        var loanType = $(".loans-calculator-page #loanTypePage option:selected").val();
        if(calcType == "borrow"){
            if(selectedPeriod > 60 || loanType == "installment"){
                setValuesForEmiAndLoanAmountPage(selectedPeriod,70000);
            }else{
                setValuesForEmiAndLoanAmountPage(selectedPeriod, 25000)
            }
        }else if(calcType == "afford"){
            if(selectedPeriod > 60  || loanType == "installment" ){
                setValuesForEmiForAffordTypePage(selectedPeriod,70000);
            }else{
                setValuesForEmiForAffordTypePage(selectedPeriod, 25000)
            }
        }
    });
    
    
    
    
    if ( $(".termDeposit-calculator #currencyForTermDeposit").length > 0){
        retrieveTermsForCurrency();
    }
    $(".termDeposit-calculator #currencyForTermDeposit").change(function(){
        retrieveTermsForCurrency();
        var minInitialValue = $(this).find(':selected').attr("data-minInitialDeposit");
        $(".termDeposit-calculator #minInitialDepositLabel").text(minInitialValue).thousandFormatting();
        $(".termDeposit-calculator #minInitialDeposit").val(parseInt(minInitialValue));
    });
    
    $(".termDeposit-calculator #currencyAmount").change(function(){
        $(".termDeposit-calculator #currencyField").val("from");
    });
    
    $(".termDeposit-calculator #resultForCurrencyAmmount").change(function(){
        $(".termDeposit-calculator #currencyField").val("to");
    });
    
    
    if ( $(".termDeposit-calculator-page #currencyForTermDepositPage").length > 0){
    	retrievePageTermsForCurrency();
    }
    $(".termDeposit-calculator-page #currencyForTermDepositPage").change(function(){
        retrievePageTermsForCurrency();
        var minInitialValue = $(this).find(':selected').attr("data-minInitialDeposit");
        $(".termDeposit-calculator-page #minInitialDepositLabel").text(minInitialValue).thousandFormatting();
        $(".termDeposit-calculator-page #minInitialDepositPage").val(parseInt(minInitialValue));
    });
    
    $(".termDeposit-calculator-page #currencyAmount").change(function(){
        $(".termDeposit-calculator-page #currencyField").val("from");
    });
    
    $(".termDeposit-calculator-page #resultForCurrencyAmmount").change(function(){
        $(".termDeposit-calculator-page #currencyField").val("to");
    });

    $("#currencyConvertorForm").validate({
        rules: {
            currencyAmount: {
                //required: true,
                number: true

            },
            resultForCurrencyAmmount: {
                number: true
            }
        },
        submitHandler: function(label,event) {
            event.preventDefault();
            //$("#resultForCurrencyAmmount").text("");
            var currencyField = $(".currency-calculator #currencyField").val();
            var currencyFrom = $('.currency-calculator #currencyFrom').val().split('+')[1];
            var currencyTo = $('.currency-calculator #currencyTo').val().split('+')[1];
            var amount = $(".currency-calculator #currencyAmount").val();
            
            $(".currency-calculator #currencyConverterText").hide();
            
            if(currencyField.length != 0 && currencyField == "to"){
            	currencyFrom = $('.currency-calculator #currencyTo').val().split('+')[1]; //$('#currencyTo option:selected').attr('data-buyrate');
                currencyTo = $('.currency-calculator #currencyFrom').val().split('+')[1];//$('#currencyFrom option:selected').attr('data-sellingrate');
            	amount = $(".currency-calculator #resultForCurrencyAmmount").val();
            	
            	if(amount.length <=0){
            		amount = "0";
            	}
            	
            	$(".currency-calculator #currencyAmount").val("");
            	
            	/*$("#fromCurrencyResult").text("");
            	$("#toCurrencyResult").text("");
            	
            	if($('#currencyTo option:selected').text() == $('#currencyFrom option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
                	$("#fromCurrencyResult").text($('#currencyTo option:selected').text() + " - Buy Rate: " + $('#currencyTo option:selected').attr('data-buyrate') + ", Sell Rate: " + $('#currencyTo option:selected').val());
                	$("#toCurrencyResult").text("");
            	}else{
            		$("#fromCurrencyResult").text($('#currencyTo option:selected').text() + " - Buy Rate: " + $('#currencyTo option:selected').attr('data-buyrate') + ", Sell Rate: " + $('#currencyTo option:selected').val());
            		$("#toCurrencyResult").text($('#currencyFrom option:selected').text() + " - Buy Rate: " + $('#currencyFrom option:selected').val() + ", Sell Rate: " + $('#currencyFrom option:selected').attr('data-sellingrate'));
            	}*/
            	
            	if($('.currency-calculator #currencyTo option:selected').text() == $('.currency-calculator #currencyFrom option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
            	}
            	
                var tmp = parseFloat(amount) *parseFloat(currencyFrom);
                var res = tmp / parseFloat(currencyTo);
                $(".currency-calculator #currencyAmount").val(Math.round(res * 100) / 100);
                
            }else{
            	
            	$(".currency-calculator #resultForCurrencyAmmount").val("");
            	
            	if(amount.length <=0){
            		amount = "0";
            	}
            	
            	if($('.currency-calculator #currencyTo option:selected').text() == $('.currency-calculator #currencyFrom option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
            	}
            	
            	var tmp = parseFloat(amount) *parseFloat(currencyFrom);
                var res = tmp / parseFloat(currencyTo);
                $(".currency-calculator #resultForCurrencyAmmount").val(Math.round(res * 100) / 100);
            }
            
            if($('.currency-calculator #currencyFrom option:selected').text() == $('.currency-calculator #currencyTo option:selected').text())
        	{
            	/*currencyFrom = 1;
            	currencyTo = 1;*/
            	$(".currency-calculator #fromCurrencyResult").text($('.currency-calculator #currencyFrom option:selected').text() + " - Buy Rate: " + $('.currency-calculator #currencyFrom option:selected').val() + ", Sell Rate: " + $('.currency-calculator #currencyFrom option:selected').attr('data-sellingrate'));
            	$(".currency-calculator #toCurrencyResult").text("");
        	}else{
        		$(".currency-calculator #fromCurrencyResult").text($('.currency-calculator #currencyFrom option:selected').text() + " - Buy Rate: " + $('.currency-calculator #currencyFrom option:selected').val() + ", Sell Rate: " + $('.currency-calculator #currencyFrom option:selected').attr('data-sellingrate'));
                $(".currency-calculator #toCurrencyResult").text($('.currency-calculator #currencyTo option:selected').text() + " - Buy Rate: " + $('.currency-calculator #currencyTo option:selected').attr('data-buyrate') + ", Sell Rate: " + $('.currency-calculator #currencyTo option:selected').val());
        	}
            
            
            //var currencyEquivalent = Math.round((parseFloat(currencyFrom)/parseFloat(currencyTo)) * 100) / 100;
            //$("#resultForOneCurrencyAmmount").text("1 " + $('#currencyFrom option:selected').text() + " = " + currencyEquivalent + " " + $('#currencyTo option:selected').text());
            $(".currency-calculator #currencyConverterText").show();
        }
    });
    
    
    $("#currencyConvertorFormPage").validate({
        rules: {
            currencyAmount: {
                //required: true,
                number: true

            },
            resultForCurrencyAmmount: {
                number: true
            }
        },
        submitHandler: function(label,event) {
            event.preventDefault();
            //$("#resultForCurrencyAmmount").text("");
            var currencyField = $(".currency-calculator-page #currencyField").val();
            var currencyFrom = $('.currency-calculator-page #currencyFromPage').val().split('+')[1];
            var currencyTo = $('.currency-calculator-page #currencyToPage').val().split('+')[1];
            var amount = $(".currency-calculator-page #currencyAmount").val();
            
            $(".currency-calculator-page #currencyConverterText").hide();
            
            if(currencyField.length != 0 && currencyField == "to"){
            	currencyFrom = $('.currency-calculator-page #currencyToPage').val().split('+')[1]; //$('#currencyTo option:selected').attr('data-buyrate');
                currencyTo = $('.currency-calculator-page #currencyFromPage').val().split('+')[1];//$('#currencyFrom option:selected').attr('data-sellingrate');
            	amount = $(".currency-calculator-page #resultForCurrencyAmmount").val();
            	
            	if(amount.length <=0){
            		amount = "0";
            	}
            	
            	$(".currency-calculator-page #currencyAmount").val("");
            	
            	/*$("#fromCurrencyResult").text("");
            	$("#toCurrencyResult").text("");
            	
            	if($('#currencyTo option:selected').text() == $('#currencyFrom option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
                	$("#fromCurrencyResult").text($('#currencyTo option:selected').text() + " - Buy Rate: " + $('#currencyTo option:selected').attr('data-buyrate') + ", Sell Rate: " + $('#currencyTo option:selected').val());
                	$("#toCurrencyResult").text("");
            	}else{
            		$("#fromCurrencyResult").text($('#currencyTo option:selected').text() + " - Buy Rate: " + $('#currencyTo option:selected').attr('data-buyrate') + ", Sell Rate: " + $('#currencyTo option:selected').val());
            		$("#toCurrencyResult").text($('#currencyFrom option:selected').text() + " - Buy Rate: " + $('#currencyFrom option:selected').val() + ", Sell Rate: " + $('#currencyFrom option:selected').attr('data-sellingrate'));
            	}*/
            	
            	if($('.currency-calculator-page #currencyToPage option:selected').text() == $('.currency-calculator-page #currencyFromPage option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
            	}
            	
                var tmp = parseFloat(amount) *parseFloat(currencyFrom);
                var res = tmp / parseFloat(currencyTo);
                $(".currency-calculator-page #currencyAmount").val(Math.round(res * 100) / 100);
                
            }else{
            	
            	$(".currency-calculator-page #resultForCurrencyAmmount").val("");
            	
            	if(amount.length <=0){
            		amount = "0";
            	}
            	
            	if($('.currency-calculator-page #currencyToPage option:selected').text() == $('.currency-calculator-page #currencyFromPage option:selected').text())
            	{
                	currencyFrom = 1;
                	currencyTo = 1;
            	}
            	
            	var tmp = parseFloat(amount) *parseFloat(currencyFrom);
                var res = tmp / parseFloat(currencyTo);
                $(".currency-calculator-page #resultForCurrencyAmmount").val(Math.round(res * 100) / 100);
            }
            
            if($('.currency-calculator-page #currencyFromPage option:selected').text() == $('.currency-calculator-page #currencyToPage option:selected').text())
        	{
            	/*currencyFrom = 1;
            	currencyTo = 1;*/
            	$(".currency-calculator-page #fromCurrencyResult").text($('.currency-calculator-page #currencyFromPage option:selected').text() + " - Buy Rate: " + $('.currency-calculator-page #currencyFromPage option:selected').val() + ", Sell Rate: " + $('.currency-calculator-page #currencyFromPage option:selected').attr('data-sellingrate'));
            	$(".currency-calculator-page #toCurrencyResult").text("");
        	}else{
        		$(".currency-calculator-page #fromCurrencyResult").text($('.currency-calculator-page #currencyFromPage option:selected').text() + " - Buy Rate: " + $('.currency-calculator-page #currencyFromPage option:selected').val() + ", Sell Rate: " + $('.currency-calculator-page #currencyFromPage option:selected').attr('data-sellingrate'));
                $(".currency-calculator-page #toCurrencyResult").text($('.currency-calculator-page #currencyToPage option:selected').text() + " - Buy Rate: " + $('.currency-calculator-page #currencyToPage option:selected').attr('data-buyrate') + ", Sell Rate: " + $('.currency-calculator-page #currencyToPage option:selected').val());
        	}
            
            
            //var currencyEquivalent = Math.round((parseFloat(currencyFrom)/parseFloat(currencyTo)) * 100) / 100;
            //$("#resultForOneCurrencyAmmount").text("1 " + $('#currencyFrom option:selected').text() + " = " + currencyEquivalent + " " + $('#currencyTo option:selected').text());
            $(".currency-calculator-page #currencyConverterText").show();
        }
    });


    $("#termDepositForm").validate({
        rules: {
            initialDeposit: {
                required: true,
                number: true,
                min: function () {
                    return parseInt($('.termDeposit-calculator #minInitialDeposit').val());
                }

            }
        },
        submitHandler: function(label,event) {
            event.preventDefault();

            var rootPageName = $(".termDeposit-calculator #rootPageName").val();
            var formData = {
                'currencyCode': $(".termDeposit-calculator #currencyForTermDeposit").val(),
                'initialDeposit': $(".termDeposit-calculator #initialDeposit").val(),
                'period': $(".termDeposit-calculator #periodForTermDeposit").val()
            };

            $.ajax({
                type: 'POST',
                url: contextPath + "/.rest/nbk/calculateTermDeposit?country=" + rootPageName,
                data: JSON.stringify(formData),
                encode: true,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $(".termDeposit-calculator #termDepositCalculatorResult").text(result.result).thousandFormatting();
                },
                error: function (data) {
                    $(".termDeposit-calculator #termDepositCalculatorResult").text($('.termDeposit-calculator #initialDeposit').val()).thousandFormatting();
                },
                complete: function () {

                }
            });
        }
    });
    function retrieveTermsForCurrency(){
        var formData = {
            'currencyCode': $('.termDeposit-calculator #currencyForTermDeposit').val()
        };
        var daysLabel = $('.termDeposit-calculator #periodForTermDeposit').data("label");
        var rootPageName = $(".termDeposit-calculator #rootPageName").val();
        
        var language = document.documentElement.lang;
        
        var weeksLabel = "week";
        var monthsLabel = "month";
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/nbk/periodsForCurrency?country=" + rootPageName,
            data: JSON.stringify(formData),
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('.termDeposit-calculator #periodForTermDeposit').empty();
                var defaultValue = "";
                var textval = '';
                var optionTextValue = "";
                for(var i=0; i<result.length; i++){
                    defaultValue = "";
                    optionTextValue = "";
                    
                    if(language && language == "ar"){
                    	
                        if(result[i] < 7){
                        	if(result[i] == 1){
                        		optionTextValue = "\u064a\u0648\u0645";
                        	}else if(result[i] == 2){
                        		optionTextValue = "\u064a\u0648\u0645\u0627\u0646";
                        	}
	                    	optionTextValue = result[i] + " " + "\u0627\u064a\u0627\u0645";
	                    }else if(result[i] < 30){
	                    	if(parseInt(result[i] / 7) == 1){
	                    		optionTextValue =  "\u0627\u0633\u0628\u0648\u0639";
	                    	}else if(parseInt(result[i] / 7) == 2){
	                    		optionTextValue =  "\u0627\u0633\u0628\u0648\u0639\u0627\u0646";
	                    	}else{
	                    		optionTextValue = parseInt(result[i] / 7) + " " + "\u0627\u0633\u0627\u0628\u064a\u0639";
	                    	}
	                    }else{
	                    	if(parseInt(result[i] / 30) == 1){
	                    		optionTextValue = "\u0634\u0647\u0631";
	                    	}else if(parseInt(result[i] / 30) == 2){
	                    		optionTextValue =  "\u0634\u0647\u0631\u0627\u0646";
	                    	}else if(parseInt(result[i] / 30) > 2 && parseInt(result[i] / 30) < 11){
	                    		optionTextValue = parseInt(result[i] / 30) + " " + "\u0627\u0634\u0647\u0631";
	                    	}else{
	                    		optionTextValue = parseInt(result[i] / 30) + " " + "\u0634\u0647\u0631";
	                    	}
	                    }
                        
                    }else{
                    
	                    if(result[i] < 7){
	                    	optionTextValue = result[i] + " " + daysLabel;
	                    }else if(result[i] < 30){
	                    	if(parseInt(result[i] / 7) > 1){
	                    		weeksLabel = "weeks";
	                    	}
	                    	optionTextValue = parseInt(result[i] / 7) + " " + weeksLabel;
	                    }else{
	                    	if(parseInt(result[i] / 30) > 1){
	                    		monthsLabel = "months";
	                    	}
	                    	optionTextValue = parseInt(result[i] / 30) + " " + monthsLabel;
	                    }
                    }
                    
                    if(i == 0){
                        defaultValue = "selected='selected'";
                      //textval = result[i] + " " + daysLabel;
                        textval = optionTextValue;
                    }
                    $(".termDeposit-calculator #periodForTermDeposit").append("<option value='" + result[i] + "'" + defaultValue + ">" + optionTextValue + "</option>");
                }

                //$(".termDeposit-calculator #periodForTermDeposit").dropkick().select(1);
                $('.termDeposit-calculator #periodForTermDeposit').dropkick('refresh');
                $('.termDeposit-calculator #periodForTermDeposit').parent().find('.dk_label').text(textval);
                //$("#periodForTermDeposit").dropkick().select(1);
            },
            error: function (data) {
                //alert("error");

            },
            complete: function () {
            }
        });
    }
    
    
    
    function retrievePageTermsForCurrency(){
        var formData = {
            'currencyCode': $('.termDeposit-calculator-page #currencyForTermDepositPage').val()
        };
        var daysLabel = $('.termDeposit-calculator-page #periodForTermDeposit').data("label");
        var rootPageName = $(".termDeposit-calculator-page #rootPageName").val();
        
        var language = document.documentElement.lang;
        
        var weeksLabel = "week";
        var monthsLabel = "month";
        $.ajax({
            type: 'POST',
            url: contextPath + "/.rest/nbk/periodsForCurrency?country=" + rootPageName,
            data: JSON.stringify(formData),
            encode: true,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $('.termDeposit-calculator-page #periodForTermDeposit').empty();
                var defaultValue = "";
                var textval = '';
                var optionTextValue = "";
                for(var i=0; i<result.length; i++){
                    defaultValue = "";
                    optionTextValue = "";
                    
                    if(language && language == "ar"){
                    	
                        if(result[i] < 7){
                        	if(result[i] == 1){
                        		optionTextValue = "\u064a\u0648\u0645";
                        	}else if(result[i] == 2){
                        		optionTextValue = "\u064a\u0648\u0645\u0627\u0646";
                        	}
	                    	optionTextValue = result[i] + " " + "\u0627\u064a\u0627\u0645";
	                    }else if(result[i] < 30){
	                    	if(parseInt(result[i] / 7) == 1){
	                    		optionTextValue =  "\u0627\u0633\u0628\u0648\u0639";
	                    	}else if(parseInt(result[i] / 7) == 2){
	                    		optionTextValue =  "\u0627\u0633\u0628\u0648\u0639\u0627\u0646";
	                    	}else{
	                    		optionTextValue = parseInt(result[i] / 7) + " " + "\u0627\u0633\u0627\u0628\u064a\u0639";
	                    	}
	                    }else{
	                    	if(parseInt(result[i] / 30) == 1){
	                    		optionTextValue = "\u0634\u0647\u0631";
	                    	}else if(parseInt(result[i] / 30) == 2){
	                    		optionTextValue =  "\u0634\u0647\u0631\u0627\u0646";
	                    	}else if(parseInt(result[i] / 30) > 2 && parseInt(result[i] / 30) < 11){
	                    		optionTextValue = parseInt(result[i] / 30) + " " + "\u0627\u0634\u0647\u0631";
	                    	}else{
	                    		optionTextValue = parseInt(result[i] / 30) + " " + "\u0634\u0647\u0631";
	                    	}
	                    }
                        
                    }else{
                    
	                    if(result[i] < 7){
	                    	optionTextValue = result[i] + " " + daysLabel;
	                    }else if(result[i] < 30){
	                    	if(parseInt(result[i] / 7) > 1){
	                    		weeksLabel = "weeks";
	                    	}
	                    	optionTextValue = parseInt(result[i] / 7) + " " + weeksLabel;
	                    }else{
	                    	if(parseInt(result[i] / 30) > 1){
	                    		monthsLabel = "months";
	                    	}
	                    	optionTextValue = parseInt(result[i] / 30) + " " + monthsLabel;
	                    }
                    }
                    
                    if(i == 0){
                        defaultValue = "selected='selected'";
                      //textval = result[i] + " " + daysLabel;
                        textval = optionTextValue;
                    }
                    $(".termDeposit-calculator-page #periodForTermDeposit").append("<option value='" + result[i] + "'" + defaultValue + ">" + optionTextValue + "</option>");
                }

                //$(".termDeposit-calculator-page #periodForTermDeposit").dropkick().select(1);
                $('.termDeposit-calculator-page #periodForTermDeposit').dropkick('refresh');
                $('.termDeposit-calculator-page #periodForTermDeposit').parent().find('.dk_label').text(textval);
                //$("#periodForTermDeposit").dropkick().select(1);
            },
            error: function (data) {
                //alert("error");

            },
            complete: function () {
            }
        });
    }
    
    
    $("#termDepositFormPage").validate({
        rules: {
            initialDeposit: {
                required: true,
                number: true,
                min: function () {
                    return parseInt($('.termDeposit-calculator-page #minInitialDepositPage').val());
                }

            }
        },
        submitHandler: function(label,event) {
            event.preventDefault();

            var rootPageName = $(".termDeposit-calculator-page #rootPageName").val();
            var formData = {
                'currencyCode': $(".termDeposit-calculator-page #currencyForTermDepositPage").val(),
                'initialDeposit': $(".termDeposit-calculator-page #initialDeposit").val(),
                'period': $(".termDeposit-calculator-page #periodForTermDeposit").val()
            };

            $.ajax({
                type: 'POST',
                url: contextPath + "/.rest/nbk/calculateTermDeposit?country=" + rootPageName,
                data: JSON.stringify(formData),
                encode: true,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $(".termDeposit-calculator-page #termDepositCalculatorResult").text(result.result).thousandFormatting();
                },
                error: function (data) {
                    $(".termDeposit-calculator-page #termDepositCalculatorResult").text($('#initialDeposit').val()).thousandFormatting();
                },
                complete: function () {

                }
            });
        }
    });
    
    
    
    $.fn.thousandFormatting = function() {
	  return this.each(function() {
		  $(this).text($(this).text().replace(/,/g,'').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		  $(this).val($(this).val().replace(/,/g,'').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	  })
	}
    
    $.fn.clearFormatting = function() {
  	  return this.each(function() {
  		  $(this).text($(this).text().replace(/,/g,''));
  		  $(this).val($(this).val().replace(/,/g,''));
  	  })
  	}

    $("#propertyValue").focusout(function(){
        var country = $("#calcForCountry").val();
        if(country != "kuwait"){
            var userInputVal = $(this).val();
            if(!isNaN(userInputVal) && userInputVal){
                var interestRateDefault = 0;
                if(country == "egypt") {
                    interestRateDefault = $("#loanTypeEgypt option:selected").data("downpayment");
                }else if (country == "jordan"){
                    interestRateDefault = 25;
                }else if(country == 'lebanon'){
                    interestRateDefault = 25;
                }else if(country == 'uae'){
                    interestRateDefault = 25;
                }else if(country == 'london'){
                    interestRateDefault = 30;
                }
                var result = parseInt($(this).val()) * interestRateDefault / 100;
                $("#down-payment").val(Math.round(result));
                $("#down-payment").attr("data-minvalue", Math.round(result));
            }
        }
    });
    
    $("#generateIbanPage").click(function(){
    	GenerateIBANPage($("#accountNumberIban").val());
    });
    $("#accountNumberIban").keypress(function (e) {
        if (e.keyCode == 13) {
        	GenerateIBANPage($("#accountNumberIban").val());
            return false;
        }
    });
});
/*IBAN FUNCTIONS START*/
function GenerateIBAN(accountNumber)
{
    //check if input is only digits
    if($.isNumeric(accountNumber) && (accountNumber.indexOf(".")==-1))
    {
        var userInputAllowed = parseInt($("#ibanConfig").data("user-input-allowed"));
        var countryCode = $("#ibanConfig").data("country-code");
        if (countryCode === "EG") {
            var bankCodeEG = $("#ibanConfig").data("bank-code-eg");
            var bankCodeEGString =  bankCodeEG.toString();
            var bankCodeEGLength = bankCodeEGString.length;
        }
        iraqBranches = {
            '8001': '861',
            '8011': '867',
            '8012': '870',
            '8014': '875',
            '8015': '877',
            '8016': '876',
            '8000': '000'
        };
        var eQbranchCode = accountNumber.substring(0,4);
        var branchNumber = iraqBranches[eQbranchCode];
        $('.iban #digitsValidation').hide();

        if(accountNumber.length != userInputAllowed)
        {
            $(".iban .hideLabelForWrongIban").hide();
            var errorText =  "'" + accountNumber + "'" + $(".iban #wrongIbanMessage").val();
            $(".iban #ibanResult").hide();
            $(".iban #ibanResultWrong").text(errorText);
            $(".iban #ibanResultWrong").show();
            $(".iban #ibanResultWrapper").show();
        }else if($("#ibanConfig").data("country-code") == "IQ" && branchNumber == undefined){
            $(".iban .hideLabelForWrongIban").hide();
            var errorText =  "'" + accountNumber + "'" + $(".iban #wrongIbanMessage").val();
            $(".iban #ibanResult").hide();
            $(".iban #ibanResultWrong").text(errorText);
            $(".iban #ibanResultWrong").show();
            $(".iban #ibanResultWrapper").show();
        }else if(countryCode === 'EG' && bankCodeEG === undefined) {
            var errorTextEG = $(".iban #invalidBankCodeEg").val();
            $(".iban .hideLabelForWrongIban").hide();
            $(".iban #ibanResult").hide();
            $(".iban #ibanResultWrong").text(errorTextEG);
            $(".iban #ibanResultWrong").show();
            $(".iban #ibanResultWrapper").show();
        }else if(countryCode === 'EG' && bankCodeEGLength !== 4) {
            var errorTextEG = $(".iban #invalidBankCodeEg").val();
            $(".iban .hideLabelForWrongIban").hide();
            $(".iban #ibanResult").hide();
            $(".iban #ibanResultWrong").text(errorTextEG);
            $(".iban #ibanResultWrong").show();
            $(".iban #ibanResultWrapper").show();
        }else{
            var swiftCode = $("#ibanConfig").data("swift-code");
            var length = parseInt($("#ibanConfig").data("iban-length"));
            var fullAccountNumber = fill0(accountNumber, length);

            // CALCULATE CHECK AFTER REPLACING ALL ALPHA NUMERIC CHARACTERS
            var iban = "";

            if(countryCode == 'IQ'){
                iraqBranches = {
                    '8001': '861',
                    '8011': '867',
                    '8012': '870',
                    '8014': '875',
                    '8015': '877',
                    '8016': '876',
                    '8000': '000'
                };
                //Country Code” + “Check Digits” + “Swift Code” + “CBI Branch Number” + “Filler” + “Account Number” + “Account Suffix”
                var eQbranchCode = accountNumber.substring(0,4);
                var fillers = eQbranchCode.substring(1,4);
                var branchNumber = iraqBranches[eQbranchCode];
                var checksum = ChecksumIBAN(countryCode + "00" + swiftCode + branchNumber + fillers + accountNumber.substring(4));

                iban = countryCode + checksum + swiftCode + branchNumber + fillers + accountNumber.substring(4);
            }else if(countryCode == 'GB'){
                //NBOK40518854020281
                var calculatedAccountNo = accountNumber.substring(1,2) + accountNumber.substring(4,10) + accountNumber.substr(accountNumber.length - 1);
                var checkSumForLondon = ChecksumIBAN(countryCode + "00" + swiftCode +  "405188" + calculatedAccountNo);
                iban = countryCode + checkSumForLondon + swiftCode + "405188" +  calculatedAccountNo;
            }else if(countryCode == 'JO'){
                var checkSumForLondon = ChecksumIBAN(countryCode + "00" + swiftCode + "0001" + fullAccountNumber);
                iban = countryCode + checkSumForLondon + swiftCode + "0001" + fullAccountNumber;
            }else if(countryCode === 'EG') {
                var branchCodeEG = "00" + accountNumber.substring(0,2);
                var defNumEG = "141600";
                var accountNumEG = "0" + accountNumber;
                var digitEG = bankCodeEG + branchCodeEG + accountNumEG + defNumEG;
                var checkDigitEG = 98 - mod97(digitEG);
                if (checkDigitEG < 10) {
                    checkDigitEG = "0" + checkDigitEG;
                }
                iban = countryCode + checkDigitEG + bankCodeEG + branchCodeEG + accountNumEG;
            }else{
                var checksum = ChecksumIBAN(countryCode + "00" + swiftCode + fullAccountNumber);
                iban = countryCode + checksum + swiftCode + fullAccountNumber;
            }


            $(".iban .hideLabelForWrongIban").show();
            $(".iban #ibanResultWrong").hide();
            $(".iban #ibanResult").text(iban);
            $(".iban #ibanResult").show();
            $(".iban #ibanResultWrapper").show();
        }
    }else{
        $(".iban .hideLabelForWrongIban").hide();
        $(".iban #ibanResultWrong").hide();
        $(".iban #ibanResult").hide();
        $('.iban #ibanResultWrapper').show();
        $('.iban #digitsValidation').show();
    }
}

function ChecksumIBAN(iban)
{
    var code     = iban.substring(0, 2);
    var checksum = iban.substring(2, 4);
    var bban     = iban.substring(4);
    //bban = "CBIQ8610018558200";
    //var bban = "NBOK0001000007000100004001";


    // ASSEMBLE DIGIT STRING
    var digits = "";
    for (var i = 0; i < bban.length; ++i)
    {
        var ch = bban.charAt(i).toUpperCase();
        if ("0" <= ch && ch <= "9")
            digits += ch;
        else
            digits += capital2digits(ch);
    }
    for (var i = 0; i < code.length; ++i)
    {
        var ch = code.charAt(i);
        digits += capital2digits(ch);
    }
    digits += checksum;

    // CALCULATE CHECKSUM
    checksum = 98 - mod97(digits);
    return fill0("" + checksum, 2);
}

// CONVERT A CAPITAL LETTER INTO DIGITS: A -> 10 ... Z -> 35 (ISO 13616).
function capital2digits(ch)
{
    var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < capitals.length; ++i)
        if (ch == capitals.charAt(i))
            break;
    return i + 10;
}

// FILL THE STRING WITH LEADING ZEROS UNTIL LENGTH IS REACHED
function fill0(s, l)
{
    while (s.length < l)
        s = "0" + s;
    return s;
}

// MODULO 97 FOR HUGE NUMBERS GIVEN AS DIGIT STRINGS
function mod97(digit_string)
{
    var m = 0;
    for (var i = 0; i < digit_string.length; ++i)
        m = (m * 10 + parseInt(digit_string.charAt(i))) % 97;
    return m;
}
/*IBAN FUNCTIONS END*/
function calculateLoansBasedOnMainEmi(interestRate, period, mainEmi) {
    var rate = interestRate / 1200;
    var nMultiplier = Math.pow((1 + rate), period);
    var res = (mainEmi - (nMultiplier * mainEmi)) / ((rate * nMultiplier) * -1);
    return res;
}
function calculateEMIBasedOnLoan (interestRate, period, totalLoan) {
    var rate = interestRate / 1200;

    var nMultiplier = Math.pow((1 + rate), period);
    var nPayment = ((rate * (nMultiplier * totalLoan)) / (-1 + nMultiplier));
    return nPayment;
}
function setValuesForEmiAndLoanAmount(period, maxValue){
    var multiple = getMultipleValueBasedOnUserSelection();

    var statusValueForMMI = $(".loans-calculator #statusLoanCalculator option:selected").val()
    var salary = $(".loans-calculator #salary").val();
    var maxEMI = salary * (statusValueForMMI) / 100;
    maxLoanAmount = ((salary * multiple < maxValue) ? salary * multiple : maxValue);
    $(".loans-calculator #resultForEmi").text(maxEMI);
    loan = calculateLoansBasedOnMainEmi(interestRate, period, maxEMI);
    if (loan > maxLoanAmount) {
        loan = maxLoanAmount;
        $(".loans-calculator #resultForEmi").text(Math.round(calculateEMIBasedOnLoan(interestRate, period, loan))).thousandFormatting();
    }
    $(".loans-calculator .loanAmmountValidationMessage").hide();
    if(loan == maxValue){
        $(".loans-calculator #loanAmmountValidationMessage" + maxValue).show();
    }
    $(".loans-calculator #resultForLoanAmount").text(Math.round(loan)).thousandFormatting();
}

function setValuesForEmiAndLoanAmountPage(period, maxValue){
    var multiple = getMultipleValueBasedOnUserSelectionPage();

    var statusValueForMMI = $(".loans-calculator-page #statusLoanCalculator option:selected").val()
    var salary = $(".loans-calculator-page #salary").val();
    var maxEMI = salary * (statusValueForMMI) / 100;
    maxLoanAmount = ((salary * multiple < maxValue) ? salary * multiple : maxValue);
    $(".loans-calculator-page #resultForEmi").text(maxEMI);
    loan = calculateLoansBasedOnMainEmi(interestRate, period, maxEMI);
    if (loan > maxLoanAmount) {
        loan = maxLoanAmount;
        $(".loans-calculator-page #resultForEmi").text(Math.round(calculateEMIBasedOnLoan(interestRate, period, loan))).thousandFormatting();
    }
    $(".loans-calculator-page .loanAmmountValidationMessage").hide();
    if(loan == maxValue){
        $(".loans-calculator-page #loanAmmountValidationMessage" + maxValue).show();
    }
    $(".loans-calculator-page #resultForLoanAmount").text(Math.round(loan)).thousandFormatting();
}

function getMultipleValueBasedOnUserSelection(){
    //30% is used for retired
    //40% is used for employed
    var loanType = $(".loans-calculator #loanType option:selected").val();
    var nationality = $(".loans-calculator #loanCalcNationality option:selected").val();
    var statusLoanCalculator = $(".loans-calculator #statusLoanCalculator option:selected").val();
    
    if(loanType == "installment"){
    	if(nationality == "expatriate"){
            return 35.55;
        }
    	else{
    		if(statusLoanCalculator == 40){
                return 47.40;
            } else if(statusLoanCalculator == 30){
                return 35.55;
            }
    	}
    }else{
    	if(nationality == "kuwait"){
    		return 25;
    	} else{
    		return 15;
    	}
    }
}

function getMultipleValueBasedOnUserSelectionPage(){
    //30% is used for retired
    //40% is used for employed
    var loanType = $(".loans-calculator-page #loanTypePage option:selected").val();
    var nationality = $(".loans-calculator-page #loanCalcNationalityPage option:selected").val();
    var statusLoanCalculator = $(".loans-calculator-page #statusLoanCalculator option:selected").val();
    
    if(loanType == "installment"){
    	if(nationality == "expatriate"){
            return 35.55;
        }
    	else{
    		if(statusLoanCalculator == 40){
                return 47.40;
            } else if(statusLoanCalculator == 30){
                return 35.55;
            }
    	}
    }else{
    	if(nationality == "kuwait"){
    		return 25;
    	} else{
    		return 15;
    	}
    }
}

function setValuesForEmiForAffordType(period, maxValue){
    //var rate = 5.25;
    var loanAmountInput = $(".loans-calculator #loanAmountInput").val();
    $(".loans-calculator #resultForEmi").text(Math.round(calculateEMIBasedOnLoan(interestRate, period, loanAmountInput))).thousandFormatting();
}

function setValuesForEmiForAffordTypePage(period, maxValue){
    //var rate = 5.25;
    var loanAmountInput = $(".loans-calculator-page #loanAmountInput").val();
    $(".loans-calculator-page #resultForEmi").text(Math.round(calculateEMIBasedOnLoan(interestRate, period, loanAmountInput))).thousandFormatting();
}

function actionsLondon() {
	var loanTypeValue = $('#loanTypeLondon option:selected').val();
	if (loanTypeValue == "auto") {
		$(".slider-month-auto-wrapper-london").show();
		$(".slider-month-personal-wrapper-london").hide();
		$(".slider-year-wrapper-london").hide();

	} else if (loanTypeValue == "mortgage") {
		$(".slider-year-wrapper-london").show();
		$(".slider-month-auto-wrapper-london").hide();
		$(".slider-month-personal-wrapper-london").hide();

	} else if (loanTypeValue = "personal") {
		$(".slider-month-auto-wrapper-london").hide();
		$(".slider-year-wrapper-london").hide();
		$(".slider-month-personal-wrapper-london").show();
	}
    $(".repayment-month ul li").removeClass("checked");
    if($('#borrowType').hasClass('active')) {
        $(".car-house").show();
        $(".repayment-month ul li:nth-child(5)").addClass("checked");
    }else{
        $(".car-house").hide();
        $(".repayment-month ul li:last-child").addClass("checked");
    }
}
function actionsUAE() {
	var loanTypeValue = $('#loanTypeUae option:selected').val();
	if (loanTypeValue == "auto") {
		$(".slider-month-auto-wrapper-uae").show();
		$(".slider-month-personal-wrapper-uae").hide();
		$(".slider-year-wrapper-uae").hide();

	} else if (loanTypeValue == "mortgage") {
		$(".slider-year-wrapper-uae").show();
		$(".slider-month-auto-wrapper-uae").hide();
		$(".slider-month-personal-wrapper-uae").hide();

	} else if (loanTypeValue = "personal") {
		$(".slider-month-auto-wrapper-uae").hide();
		$(".slider-year-wrapper-uae").hide();
		$(".slider-month-personal-wrapper-uae").show();
	}
    $(".repayment-month ul li").removeClass("checked");

    if($('#borrowType').hasClass('active')) {
        $(".repayment-month ul li.defaultValueSlider").addClass("checked");
        $(".car-house").show();
    }else{
        $(".repayment-month ul li.defaultValueSliderForAfford").addClass("checked");
        $(".car-house").hide();
    }
}
function calculateInterestRate(initialInterestRate){
    return ( initialInterestRate / 100 ) / 12;
}
function calculateMultiplier(interestRate, period){
    return Math.pow(1 + interestRate, period);
}
function calculateEMIForAfford(interestRate, multiplier, loanAmn){
    return (interestRate * ( multiplier * loanAmn )) / (-1 + multiplier );
}
function calculateMAXEMI(salary, dsr){
    return ( parseInt(salary) / 100 ) * dsr;
}
function calculateLoanAmountWithEmi(maxEMI, multiplier, interestRate){
    return ( maxEMI - (multiplier * maxEMI )) / (-1 * (multiplier * interestRate));
}
function calculateLoanAmountWithDownPayment(propertyValue, downPayment){
    return (propertyValue - ( ( propertyValue / 100 ) * downPayment ));
}
function calculateEMIForBorrow(interestRate, multiplier, loanAmn){
    return (interestRate * ( multiplier * loanAmn )) / (-1 + multiplier );
}



function loanCalculatorAny(period, salary, affordLoanAmount, maxLoanAmn, propertyValue, downPayment, initialInterestRate, dsr){
    $("#messageMaxBankProvided").hide();
    var finalLoanAmn = null;
    var finalEmiAmn = null;

    var interestRate = calculateInterestRate(initialInterestRate);
    var multiplier = calculateMultiplier(interestRate, period);

    if( $("#borrowType").hasClass("active")) {

        var maxEMI = calculateMAXEMI(salary, dsr);
        var loanAmn = calculateLoanAmountWithEmi(maxEMI, multiplier, interestRate);

        if (downPayment != null) {
            var loanAmnBasedOnDownpayment = calculateLoanAmountWithDownPayment(propertyValue, downPayment);
            if(loanAmn > loanAmnBasedOnDownpayment){
                loanAmn = loanAmnBasedOnDownpayment;
            }
            if (salary  === undefined){
                loanAmn = loanAmnBasedOnDownpayment;
            }
        }



        if (loanAmn > maxLoanAmn) {
            finalLoanAmn = maxLoanAmn;
        } else {
            finalLoanAmn = loanAmn;
        }

        finalEmiAmn = calculateEMIForBorrow(interestRate, multiplier, finalLoanAmn);

    }else{
        if(affordLoanAmount > maxLoanAmn){
            affordLoanAmount = maxLoanAmn;
        }
        finalEmiAmn = calculateEMIForAfford(interestRate, multiplier, affordLoanAmount);
    }
    if(isNaN(finalLoanAmn)){
        finalLoanAmn = 0;
    }
    if(isNaN(finalEmiAmn)){
        finalEmiAmn = 0;
    }
    if((finalLoanAmn == maxLoanAmn) || (affordLoanAmount == maxLoanAmn)){
        $("#messageMaxBankProvided").show();
    }
    $("#resultForLoanAmount").text(Math.round(finalLoanAmn)).thousandFormatting();
    $("#resultForEmi").text(finalEmiAmn.toString().split(".")[0]).thousandFormatting();
}
function calculateLoanWithEgyptParams() {
    var loanTypeEgypt = $("#loanTypeEgypt option:selected").val();
    var salary = $("#salary").val();
    var period = parseInt($("#slider-month-personal .checked").data("value"));
    var initialInterestRate = $("#interestRatePersonal").val();
    var maxAmount = 2000000;
    var loanAmountComputation = 50;
    var downPayment = null;
    var loanAmn = null;
    var propertyValue = $("#propertyValue").val();
    if(loanTypeEgypt == "auto"){
        period =  parseInt($("#slider-month-auto .checked").data("value"));
        downPayment = calculateDownPayment(10);
        maxAmount = 1500000;
        initialInterestRate = $("#InterestRateAuto").val();
    }else if(loanTypeEgypt == "mortgage"){
        period =  parseInt($("#slider-year .checked").data("value"));
        maxAmount = 4000000;
        loanAmountComputation = 40;
        downPayment = calculateDownPayment(20);
        initialInterestRate = $("#InterestRateMortgage").val();
    }else{
        downPayment = null;
        propertyValue = null;
    }

    var affordLoanAmount = $("#loanAmountInput").val();
    loanCalculatorAny(period, salary, affordLoanAmount, maxAmount, propertyValue, downPayment, initialInterestRate, loanAmountComputation);
}
function checkSliderForEgypt() {
    var loanTypeValue = $('#loanTypeEgypt option:selected').val();
    $(".repayment-month ul li").removeClass("checked");
    if($('#borrowType').hasClass('active')){
        $(".repayment-month ul li:last-child").addClass("checked");
        if(loanTypeValue == "personal"){
            $(".car-house").hide();
        }else{
            $(".car-house").show();
        }
    }else{
        $(".repayment-month ul li.defaultValueForSlider").addClass("checked");
    }
}
function calculateLoanWithJordanParams() {
   // var selectedPeriod = parseInt($(".checked").data("value"));
    var propertyValue = $("#propertyValue").val();
    var salary = $("#salary").val();
    var loanTypeJordan = $("#loanTypeJordan option:selected").val();
    var affordLoanAmount = $("#loanAmountInput").val();
    var downPayment = null;
    var initialInterestRate = $("#interestRatePersonal").val();
    var period = parseInt($("#slider-month-personal .checked").data("value"));
    if(loanTypeJordan == "auto"){
    	period = parseInt($("#slider-month-auto .checked").data("value"));
    }
    else if(loanTypeJordan == "mortgage"){
        period =  parseInt($("#slider-year .checked").data("value"));
        initialInterestRate = $("#InterestRateMortgage").val();
        downPayment = calculateDownPayment(25);
    }

    loanCalculatorAny(period, salary, affordLoanAmount, 500000, propertyValue, downPayment, initialInterestRate, 40);
}
function calculateLoanWithLebanonParams() {
    period = parseInt($("#slider-month-personal .checked").data("value"));;
    salary = $("#salary").val();
    affordLoanAmount = $("#loanAmountInput").val();
    var loanTypeLebanon = $("#loanTypeLebanon option:selected").val();
    var maxLoanAmount = 30000;
    propertyValue = $("#propertyValue").val();
    initialInterestRate = $("#interestRatePersonal").val();
    downPayment = null;
    if(loanTypeLebanon == "auto"){
    	period = parseInt($("#slider-month-auto .checked").data("value"));
    }else if(loanTypeLebanon == "housing"){
        period = parseInt($("#slider-year .checked").data("value"));
        maxLoanAmount = 1500000;
        initialInterestRate = $("#InterestRateMortgage").val();
        downPayment = calculateDownPayment(25);
    }


    loanCalculatorAny(period, salary, affordLoanAmount, maxLoanAmount, propertyValue, downPayment, initialInterestRate, 35);
}
function calculateLoanWithLondonParams() {
    salary = $("#salary").val();
    period =  parseInt($("#slider-year .checked").data("value"));
    maxLoanAmount = 10000000000;
    var loanTypeLondon = $("#loanTypeLondon option:selected").val();
    affordLoanAmount = $("#loanAmountInput").val();
    propertyValue = $("#propertyValue").val();
    downPayment = calculateDownPayment(30);
    initialInterestRate = $("#InterestRateMortgage").val();
    
    if(loanTypeLondon == "auto"){
    	period = parseInt($("#slider-month-auto .checked").data("value"));
    }else if(loanTypeLondon == "personal"){
    	period = parseInt($("#slider-month-personal .checked").data("value"));
    }


    loanCalculatorAny(period, salary, affordLoanAmount, maxLoanAmount, propertyValue, downPayment, initialInterestRate, 35);
}
function calculateLoanWithUAEParams() {
    salary = $("#salary").val();
    period = parseInt($("#slider-year .checked").data("value"));
    maxLoanAmount = 10000000000;
    var loanTypeUae = $("#loanTypeUae option:selected").val();
    affordLoanAmount = $("#loanAmountInput").val();
    propertyValue = $("#propertyValue").val();
    downPayment = calculateDownPayment(30);
    initialInterestRate = $("#InterestRateMortgage").val();
    if(loanTypeUae == "auto"){
    	period = parseInt($("#slider-month-auto .checked").data("value"));
    }else if(loanTypeUae == "personal"){
    	period = parseInt($("#slider-month-personal .checked").data("value"));
    }
    loanCalculatorAny(period, salary, affordLoanAmount, maxLoanAmount, propertyValue, downPayment, initialInterestRate, 50);
}
function calculateDownPayment(defaultValue){
    var downPaymentByUser = $("#down-payment").val();
    var propertyValue = $("#propertyValue").val();
    var propertyValueInPercentage = propertyValue / 100;
    var res = defaultValue;
    if( propertyValueInPercentage * defaultValue > parseInt(downPaymentByUser)){
        res = defaultValue;
    }else{
        res = downPaymentByUser / propertyValueInPercentage;
    }
    return res;
}





/*IBAN FUNCTIONS START*/
function GenerateIBANPage(accountNumber)
{
    //check if input is only digits
    if($.isNumeric(accountNumber) && (accountNumber.indexOf(".")==-1))
    {
        var userInputAllowed = parseInt($("#ibanConfigPage").data("user-input-allowed"));
        var countryCode = $("#ibanConfigPage").data("country-code");
        if (countryCode === "EG") {
            var bankCodeEG = $("#ibanConfigPage").data("bank-code-eg");
            var bankCodeEGString =  bankCodeEG.toString();
            var bankCodeEGLength = bankCodeEGString.length;
        }
        iraqBranches = {
            '8001': '861',
            '8011': '867',
            '8012': '870',
            '8014': '875',
            '8015': '877',
            '8016': '876',
            '8000': '000'
        };
        var eQbranchCode = accountNumber.substring(0,4);
        var branchNumber = iraqBranches[eQbranchCode];
        $('.ibangenerator #digitsValidation').hide();

        if(accountNumber.length != userInputAllowed)
        {
            $(".ibangenerator .hideLabelForWrongIban").hide();
            var errorText =  "'" + accountNumber + "'" + $(".ibangenerator #wrongIbanMessage").val();
            $(".ibangenerator #ibanResult").hide();
            $(".ibangenerator #ibanResultWrong").text(errorText);
            $(".ibangenerator #ibanResultWrong").show();
            $(".ibangenerator #ibanResultWrapper").show();
        }else if($("#ibanConfigPage").data("country-code") == "IQ" && branchNumber == undefined){
            $(".ibangenerator .hideLabelForWrongIban").hide();
            var errorText =  "'" + accountNumber + "'" + $("#wrongIbanMessage").val();
            $(".ibangenerator #ibanResult").hide();
            $(".ibangenerator #ibanResultWrong").text(errorText);
            $(".ibangenerator #ibanResultWrong").show();
            $(".ibangenerator #ibanResultWrapper").show();
        }else if(countryCode === 'EG' && bankCodeEG === undefined) {
            var errorTextEG = $(".ibangenerator #invalidBankCodeEg").val();
            $(".ibangenerator .hideLabelForWrongIban").hide();
            $(".ibangenerator #ibanResult").hide();
            $(".ibangenerator #ibanResultWrong").text(errorTextEG);
            $(".ibangenerator #ibanResultWrong").show();
            $(".ibangenerator #ibanResultWrapper").show();
        }else if(countryCode === 'EG' && bankCodeEGLength !== 4) {
            var errorTextEG = $(".ibangenerator #invalidBankCodeEg").val();
            $(".ibangenerator .hideLabelForWrongIban").hide();
            $(".ibangenerator #ibanResult").hide();
            $(".ibangenerator #ibanResultWrong").text(errorTextEG);
            $(".ibangenerator #ibanResultWrong").show();
            $(".ibangenerator #ibanResultWrapper").show();
        }else{
            var countryCode = $("#ibanConfigPage").data("country-code");
            var swiftCode = $("#ibanConfigPage").data("swift-code");
            var length = parseInt($("#ibanConfigPage").data("iban-length"));
            var fullAccountNumber = fill0(accountNumber, length);

            // CALCULATE CHECK AFTER REPLACING ALL ALPHA NUMERIC CHARACTERS
            var iban = "";

            if(countryCode == 'IQ'){
                iraqBranches = {
                    '8001': '861',
                    '8011': '867',
                    '8012': '870',
                    '8014': '875',
                    '8015': '877',
                    '8016': '876',
                    '8000': '000'
                };
                //Country Code” + “Check Digits” + “Swift Code” + “CBI Branch Number” + “Filler” + “Account Number” + “Account Suffix”
                var eQbranchCode = accountNumber.substring(0,4);
                var fillers = eQbranchCode.substring(1,4);
                var branchNumber = iraqBranches[eQbranchCode];
                var checksum = ChecksumIBAN(countryCode + "00" + swiftCode + branchNumber + fillers + accountNumber.substring(4));

                iban = countryCode + checksum + swiftCode + branchNumber + fillers + accountNumber.substring(4);
            }else if(countryCode == 'GB'){
                //NBOK40518854020281
                var calculatedAccountNo = accountNumber.substring(1,2) + accountNumber.substring(4,10) + accountNumber.substr(accountNumber.length - 1);
                var checkSumForLondon = ChecksumIBAN(countryCode + "00" + swiftCode +  "405188" + calculatedAccountNo);
                iban = countryCode + checkSumForLondon + swiftCode + "405188" +  calculatedAccountNo;
            }else if(countryCode == 'JO'){
                var checkSumForLondon = ChecksumIBAN(countryCode + "00" + swiftCode + "0001" + fullAccountNumber);
                iban = countryCode + checkSumForLondon + swiftCode + "0001" + fullAccountNumber;
            }else if(countryCode === 'EG') {
                var branchCodeEG = "00" + accountNumber.substring(0,2);
                var defNumEG = "141600";
                var accountNumEG = "0" + accountNumber;
                var digitEG = bankCodeEG + branchCodeEG + accountNumEG + defNumEG;
                var checkDigitEG = 98 - mod97(digitEG);
                if (checkDigitEG < 10) {
                    checkDigitEG = "0" + checkDigitEG;
                }
                iban = countryCode + checkDigitEG + bankCodeEG + branchCodeEG + accountNumEG;
            }else{
                var checksum = ChecksumIBAN(countryCode + "00" + swiftCode + fullAccountNumber);
                iban = countryCode + checksum + swiftCode + fullAccountNumber;
            }


            $(".ibangenerator .hideLabelForWrongIban").show();
            $(".ibangenerator #ibanResultWrong").hide();
            $(".ibangenerator #ibanResult").text(iban);
            $(".ibangenerator #ibanResult").show();
            $(".ibangenerator #ibanResultWrapper").show();
        }
    }else{
        $(".ibangenerator .hideLabelForWrongIban").hide();
        $(".ibangenerator #ibanResultWrong").hide();
        $(".ibangenerator #ibanResult").hide();
        $('.ibangenerator #ibanResultWrapper').show();
        $('.ibangenerator #digitsValidation').show();
    }
}

