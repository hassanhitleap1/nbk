/**
 * Created by Miroslav Pashaliski on 1/31/2017.
 */
$(document).ready(function(){
    const YEAR_VAL_LESS_THAN21 = "lessThan21";
    const YEAR_VAL_OVER21 = "over21";
    const OWNER_VAL_GIFT = "asGift";
    const OWNER_VAL_MYSELF = "forMyself";
    var $yearForCard = $("#yearForCard");
    var $salaryForCard = $("#salaryForCard");
    var $prepaidCardOwnerShip = $("#prepaidCardOwnerShip");
    var $prepaidCardNationality = $("#prepaidCardNationality");
    var $prepaidCardUsage = $("#prepaidCardUsage");
   // var $selectedRewards = $('input:checked.creditcardReward');
    var $rightCardWrapperButton = $("#right-card-wrapper-button");
    var $prepaidCardWrapper = $("#prepaidCardWrapper");
    var $creditCardWrapper = $("#creditCardWrapper");
    showCreditOrPrepaidQuestion();
    $yearForCard.change(function () {
        var selectedYear = this.value;
        if (selectedYear == YEAR_VAL_LESS_THAN21){
            $salaryForCard.attr('disabled', 'disabled');
            $salaryForCard.closest(".selectz").addClass("disabled");
        }else{
            $salaryForCard.removeAttr("disabled");
            $salaryForCard.closest(".selectz").removeClass("disabled");
        }
        showCreditOrPrepaidQuestion();
        if($salaryForCard.val() == "250-399"){
            $("#travelRewards").attr("disabled", "disabled");
            $("#internationalLounges").attr("disabled", "disabled");
        }

    });
    disableCheckboxesBasedOnSalary();
    showCreditCardMessage();
    $salaryForCard.change(function () {
        var yearForCardValue = $yearForCard.val();
        var selectedSalary = this.value;
        showCreditOrPrepaidQuestion();
        disableCheckboxesBasedOnSalary();
        showCreditCardMessage();

    });

    showPrepaidCardQuestionBasedOnOwnerShip();
    $prepaidCardOwnerShip.change(function () {
        showPrepaidCardQuestionBasedOnOwnerShip();
    });
    showHideButton();
    disableShababiBaseOnNationality();
    $prepaidCardNationality.change(function () {
        disableShababiBaseOnNationality();
        showHideButton();
    });
    $prepaidCardUsage.change(function () {
        showHideButton();
    });
    function showCreditOrPrepaidQuestion(){
        if($yearForCard.val()){
            if($yearForCard.val() == YEAR_VAL_LESS_THAN21){
                $salaryForCard.attr('disabled', 'disabled');
                $salaryForCard.closest(".selectz").addClass("disabled");
                $creditCardWrapper.hide();
                $('#creditCardWrapper :input').attr('disabled', 'disabled');
                $prepaidCardWrapper.show();
                $('#prepaidCardWrapper :input').removeAttr('disabled');
            }else if($yearForCard.val() == YEAR_VAL_OVER21 && $salaryForCard.val() == "lessThan250"){
                $("#creditCardWrapper").hide();
                $('#creditCardWrapper :input').attr('disabled', 'disabled');
                $prepaidCardWrapper.show();
                $('#prepaidCardWrapper :input').removeAttr('disabled');
            }else if ($salaryForCard.val()){
                $creditCardWrapper.show();
                $('#creditCardWrapper :input').removeAttr('disabled');
                $prepaidCardWrapper.hide();
                $('#prepaidCardWrapper :input').attr('disabled', 'disabled');
            }else if ($yearForCard.val() == YEAR_VAL_OVER21 && !$salaryForCard.val()){
                $creditCardWrapper.hide();
                $('#creditCardWrapper :input').attr('disabled', 'disabled');
                $prepaidCardWrapper.hide();
                $('#prepaidCardWrapper :input').attr('disabled', 'disabled');
            }
            showHideButton();

        }
    }

    function showPrepaidCardQuestionBasedOnOwnerShip(){
        var ownershipVal = $prepaidCardOwnerShip.val();
        if(ownershipVal){
            if(OWNER_VAL_GIFT == ownershipVal){
                $rightCardWrapperButton.show();
                $("#prepaidCardNationalityWrapper").hide();
                $("#prepaidCardUsageWrapper").hide();
            }else {
                $("#prepaidCardNationalityWrapper").show();
                $("#prepaidCardUsageWrapper").show();
                showHideButton();
            }
        }
    }
    function showHideButton(){
        var prepaidCardUsageVal = $prepaidCardUsage.val();
        var prepaidCardNationalityVal = $prepaidCardNationality.val();
        if($prepaidCardWrapper.is(':visible')){
            if(prepaidCardNationalityVal && prepaidCardUsageVal){
                $rightCardWrapperButton.show();
            }else{
                $rightCardWrapperButton.hide();
            }
        }else if ($creditCardWrapper.is(':visible')){
            var yearVal = $yearForCard.val();
            var salaryVal = $salaryForCard.val();
            if(yearVal && salaryVal){
               $rightCardWrapperButton.show();
            }else{
                $rightCardWrapperButton.hide();
            }
        }
    }
    function disableCheckboxesBasedOnSalary(){

        if(($salaryForCard.val() == "250-399") || ($salaryForCard.val() == "400-599")){
            $(".hideForSpecificSalaryWrapper").hide();
            $("#travelRewards").attr("disabled", "disabled");
            $('#travelRewards').attr('checked', false);
            $("#internationalLounges").attr("disabled", "disabled");
            $('#internationalLounges').attr('checked', false);
        }else{
            $(".hideForSpecificSalaryWrapper").show();
            $("#travelRewards").removeAttr("disabled");
            $("#internationalLounges").removeAttr("disabled");
        }
    }
    $('#rightCardForm').submit(function() {
        var arr=[];
        $('input:checked.creditcardReward').each(function(){
            arr.push($(this).val());
        });
        $('input:checked.creditcardReward').attr('disabled', 'disabled');
        $('#selectedRewards').val(arr.join(';'));

    });
    function disableShababiBaseOnNationality(){
        if($prepaidCardNationality.val() == "non-kuwait"){
            $("#dk_container_prepaidCardUsage ul.dk_options_inner li:last-child").addClass("usageNotAvailable")
        }else{
            $("#dk_container_prepaidCardUsage ul.dk_options_inner li:last-child").removeClass("usageNotAvailable")
        }
    }
    function showCreditCardMessage(){
        if($salaryForCard.val()=="over3000"){
            $("#showTextForCreditCard3000").show();
            $("#showTextForOtherCreditCard").hide();
            $(".hidden-for-3000").hide();
        }else{
            $("#showTextForOtherCreditCard").show();
            $("#showTextForCreditCard3000").hide();
            $(".hidden-for-3000").show();

        }
    }
    if($(".el-result").length > 0){
        setTimeout(function() {
            $('html, body').animate({scrollTop:$('.el-result').position().top}, 'slow')
        }, 2000 );
    }

});
