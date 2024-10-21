/**
 * Created by Miroslav Pashaliski on 1/31/2017.
 */
$(document).ready(function(){
    $buttonWrapper = $("#right-account-button-wrapper");
    $("#loanTypeEligibility").change(function () {
        var nationality = $("#loanNationality").val();

        if(nationality != null){
            $('.rightLoan').css("display", "block");
        }
    });

    $("#loanNationality").change(function () {
        var loanType = $("#loanTypeEligibility").val();

        if(loanType != null){
            $('.rightLoan').css("display", "block");
        }
    });

    var interestRadio = $('input[type=radio][name="interest"]');
    var shortTermCurrencyValue = $("input[name='saveShortTermCurrency']:checked").val();
    disableRadioButton(shortTermCurrencyValue, interestRadio, "interest", "normal", "#interestType-eligibility");

    var checkBookRadio = $('input[type=radio][name="checkbook"]');
    var accessMoneyValue = $("input[name='accessMoneyCurrency']:checked").val();
    disableRadioButton(accessMoneyValue, checkBookRadio, "checkbook", "true", "#checkbook-eligibility");

    var interestPayd = $('input[type=radio][name="regularly"]');
    var longTermCurrencyValue = $("input[name='saveLongTermCurrency']:checked").val();
    disableRadioButton(longTermCurrencyValue, interestPayd, "regularly", "regularly", "#selectedMaturity-eligibility");

    $('input[type="radio"][name="accessMoneyCurrency"]').on('click change', function(e) {
        disableRadioButton(this.value, checkBookRadio, "checkbook", "true", "#checkbook-eligibility");
    });

    $('input[type="radio"][name="saveShortTermCurrency"]').on('click change', function(e) {
        disableRadioButton(this.value, interestRadio, "interest", "normal", "#interestType-eligibility");
    });

    $('input[type="radio"][name="saveLongTermCurrency"]').on('click change', function(e) {
        disableRadioButton(this.value, interestPayd, "regularly", "regularly", "#selectedMaturity-eligibility");
    });


    $("#checkbookYES").change(function () {
        if ($("#checkbookYES").is(":checked")) {
            $("#salaryTransfer").hide();
            $("input[name='transfer']").attr('disabled', 'disabled');
        }
    });
    $("#checkbookNO").change(function () {
        if ($("#checkbookNO").is(":checked")) {
            $("#salaryTransfer").show();
            $("input[name='transfer']").removeAttr('disabled');
        }
    });
    $("#accountType").change(function () {
        //$("#right-account-button-wrapper").show();
        var selectedAccountType = $(this).val();
        showHideRightAccountButton(selectedAccountType);
        $(".secondary-menu").hide();
        $(".secondary-menu").removeClass("show");
        $("." + selectedAccountType).show();
    });

    $(".resetAccountResult").click(function(){
        window.location = window.location.pathname;
    });


    $("#occupation").change(function () {
        showHideStepThreeForPackages();
        /*var selectedOccupation = $(this).val();
        if(selectedOccupation == "looking-for-job" || selectedOccupation == "employed"){
            $(".salary").removeClass("secondary-menu");
            $(".salary select").prop('required', true);
        }else{
            $(".salary").addClass("secondary-menu");
            $(".salary select").prop('required', false);
            $("#right-package-button-wrapper").show();
        }*/

    });
    $("#salaryPackages").change(function () {
        var selectedSalary = $(this).val();
        if(selectedSalary){
            $("#right-package-button-wrapper").show();
        }
    });
    showHideStepThreeForPackages();
    $("#age").change(function () {
        showHideStepThreeForPackages();
        /*if(age == "0-14"){
            $(".step-three-right-package").hide();
            $("#right-package-button-wrapper").show();
            $(".step-three-right-package #occupation").prop("required", false);
        }else{
            $(".step-three-right-package").show();
            $("#right-package-button-wrapper").hide();
            $(".step-three-right-package #occupation").prop("required", true);
        }*/
    });
    $("#nationality").change(function () {
        showHideStepThreeForPackages();
    });
    $('.right-account input[type=radio]').change(function() {
        showHideRightAccountButton($("#accountType").val());
    });
    function showHideStepThreeForPackages(){
        var ageValue = $("#age").val();
        var nationalityValue = $("#nationality").val();
        var occupationValue = $("#occupation").val();
        var salaryValue = $("#salaryPackages").val();
        if(ageValue && nationalityValue){
            if(ageValue != "0-14"){
                $(".step-three-right-package").show();
                if(!occupationValue){
                    $("#right-package-button-wrapper").hide();
                }else{
                    if(occupationValue == "looking-for-job" || occupationValue == "employed"){
                        $(".step-four-package").show();
                        if(salaryValue){
                            $("#right-package-button-wrapper").show();
                        }else{
                            $("#right-package-button-wrapper").hide();
                        }
                    }else{

                        $(".step-four-package").hide();
                        $("#right-package-button-wrapper").show();
                    }
                }
            }else{
                $(".step-three-right-package").hide();
                $(".step-four-package").hide();
                $("#right-package-button-wrapper").show();
            }
        }else{
            $(".step-three-right-package").hide();
            $(".step-four-package").hide();
        }
        if(!$('.step-three-right-package').is(':visible'))
        {
            $(".step-three-right-package select").attr("disabled", "disabled");
        }else{
            $(".step-three-right-package select").removeAttr("disabled");
        }
        if(!$('.step-four-package').is(':visible'))
        {
            $(".step-four-package select").attr("disabled", "disabled");
        }else{
            $(".step-four-package select").removeAttr("disabled");
        }
    }
    function showHideRightAccountButton(accountTypeVal){

        if(accountTypeVal == "chance-to-win"){
            $buttonWrapper.show()
        }else if(accountTypeVal == "access-money"){
            var accessMoneyVal = $("input[name='accessMoneyCurrency']:checked").val();
            if(accessMoneyVal){
                if(accessMoneyVal == "foreign"){
                    $buttonWrapper.show()
                }else if(accessMoneyVal == "kuwaiti"){
                    var checkbookVal = $("input[name='checkbook']:checked").val();
                    if(checkbookVal){
                        if(checkbookVal == "true"){
                            $buttonWrapper.show();
                        }else if(checkbookVal == "false"){
                            var salaryTransferVal = $("input[name='transfer']:checked").val();
                            if(salaryTransferVal){
                                $buttonWrapper.show();
                            }else{
                                $buttonWrapper.hide();
                            }
                        }
                    }else{
                        $buttonWrapper.hide();
                    }
                }else{
                    $buttonWrapper.hide();
                }
            }else{
                $buttonWrapper.hide();
            }
        }else if(accountTypeVal == "save-short-term"){
            var saveShortTermCurrencyVal = $("input[name='saveShortTermCurrency']:checked").val();
            if(saveShortTermCurrencyVal) {
                if (saveShortTermCurrencyVal == "foreign") {
                    $buttonWrapper.show()
                } else if (saveShortTermCurrencyVal == "kuwaiti") {
                    var interestVal = $("input[name='interest']:checked").val();
                    if (interestVal) {
                        $buttonWrapper.show();
                    } else {
                        $buttonWrapper.hide();
                    }

                }
            }else{
                $buttonWrapper.hide();
            }
        }else if(accountTypeVal == "save-long-term"){
            var saveLongTermCurrencyVal = $("input[name='saveLongTermCurrency']:checked").val();
            if(saveLongTermCurrencyVal){
                if(saveLongTermCurrencyVal == "foreign"){
                    $buttonWrapper.show();
                }else if(saveLongTermCurrencyVal == "kuwaiti"){
                    var regularlyVal = $("input[name='regularly']:checked").val();
                    if(regularlyVal){
                        $buttonWrapper.show();
                    }else{
                        $buttonWrapper.hide();
                    }
                }
            }else{
                $buttonWrapper.hide();
            }
        }

    }
});
function disableRadioButton(selectedValue, radio, name, value, id){
    if(selectedValue == "foreign" || !selectedValue){
        $(radio).prop('checked', false);
        $(radio).attr('disabled', true);
        $(id).css("display", "none");
    }else{
        $(radio).attr('disabled', false);
        $(id).css("display", "block");
        if(name == "checkbook" && checkbookChecked == "false"){
            value = "false";
        }else if(name == "regularly" && selectedMaturity == "maturity"){
            value = "maturity";
        }else if(name == "interest" && interestType == "higher"){
            value = "higher";
        }
        /*        if(selectedValue){
         $('input[type=radio][name="' + name + '"][value="' + value + '"]').prop('checked', true);
         }*/

    }
}

