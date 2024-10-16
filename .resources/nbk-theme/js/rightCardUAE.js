$(document).ready(function(){
    var $yearForUAEField = $("#yearForCardUAE");
    var $salaryForUAEField = $("#salaryForCardUAE");
    var $submitButton = $("#buttonForUAECard");
    enableSalaryQuestion();
    showCardInfoText();
    $yearForUAEField.change(function () {
        enableSalaryQuestion();
        showCardInfoText();
    });

    $salaryForUAEField.change(function () {
        showCardInfoText();
        $submitButton.show();

    });

    if( $yearForUAEField.val() != null || $salaryForUAEField.val() != null){
        $submitButton.show();
    }else{
        $submitButton.hide();
    }

    function enableSalaryQuestion() {
        if($yearForUAEField.val() !== "21-58" || $yearForUAEField.val() == null){
            $salaryForUAEField.attr('disabled', 'disabled');
            $salaryForUAEField.closest(".selectz").addClass("disabled");

            $submitButton.show();
        }else{
            $submitButton.hide();

            $salaryForUAEField.removeAttr("disabled");
            $salaryForUAEField.closest(".selectz").removeClass("disabled");

        }
    }

    function showCardInfoText() {
        $(".hideAnyInfoText").hide();
        if($yearForUAEField.val() == "lessThan21") {
            $("#showPrepaidCardText").show();
        } else if($yearForUAEField.val() == "21-58") {
            if($salaryForUAEField.val() == "10000-15000" || $salaryForUAEField.val() == "15000-30000"){
                $("#showCreditCardText").show();
            }else if($salaryForUAEField.val() == "over30000"){
                $("#showTextForCreditCard3000").show();
            }
        }
    }

});