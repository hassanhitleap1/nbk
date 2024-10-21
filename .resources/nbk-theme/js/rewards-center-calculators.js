var interestRateAuto;
$(document).ready(function(){
    interestRateAuto = $("#interestRateAuto").val();

    $("#borrowTypeAuto").click(function(){
        var loanTypeValue = $('#loanTypeEgypt option:selected').val();

        $(this).addClass("active");
        $(".salaryInputWrapperAuto").show();
        $(".loanAmountInputWrapperAuto").hide();
        $("#loanAmountResultWrapperAuto").show();
        $("#resultForLoanAmountAuto").text("");
        $("#calcTypeAuto").val($(this).data("value"));
        $("#resultForEmiAuto").text("");
        $("#affordTypeAuto").removeClass("active");
    });
    $("#affordTypeAuto").click(function(){
        $(this).addClass("active");
        $(".salaryInputWrapperAuto").hide();
        $(".loanAmountInputWrapperAuto").show();
        $("#calcTypeAuto").val($(this).data("value"));
        $("#resultForEmiAuto").text("");
        $("#loanAmountResultWrapperAuto").hide();
        $("#borrowTypeAuto").removeClass("active");
        $(".car-house").hide();
    });


    $("#loanCalcNationalityAuto").change(function () {
        showOrHideStatusLoanCalculatorFieldAuto(this.value);

    });



    function showOrHideStatusLoanCalculatorFieldAuto(value){
        if( value == "expatriate"){
            $('.loans-calculator #loanCalculatorFormAuto #dk_container_statusLoanCalculatorAuto').addClass("gd-disable");
            var label = $("#statusLoanCalculatorAuto").find("option:first-child").text();
            $("#statusLoanCalculatorAuto option").removeAttr("selected");
            $("#statusLoanCalculatorAuto option:first-child").attr("selected");
            $("#dk_container_statusLoanCalculatorAuto .dk_toggle.dk_label").text(label);
            $("#dk_container_statusLoanCalculatorAuto .dk_options_inner li").removeClass("dk_option_current");
            $('#dk_container_statusLoanCalculatorAuto .dk_options_inner li:first-child').addClass('dk_option_current');
        }else{
            $('.loans-calculator #loanCalculatorFormAuto #dk_container_statusLoanCalculatorAuto').removeClass("gd-disable");
        }
    }

    $("#loanCalculatorFormAuto").validate({
        rules: {

            salaryAuto: {
                required:{
                    depends: function(element) {
                        return $("#calcTypeAuto").val() == "borrow";
                    }
                },
                min: 400,
                number: true
            },
            loanAmountInputAuto: {
                required:{
                    depends: function(element) {
                        return $("#calcTypeAuto").val() == "afford";
                    }
                },
                min:1000,
                number: true,
                max: 25000
            }
        },
        submitHandler: function(label,event) {
            event.preventDefault();
            
                $(".checkedAuto").removeClass("checked");
                $(".last-period-auto").addClass("checked");
                var natValue = $('#loanCalcNationalityAuto option:selected').val();
                var calcType =  $("#calcTypeAuto").val();
                var statusValueForMMI = $("#statusLoanCalculatorAuto option:selected").val();
                if (calcType == 'borrow') {
                    setValuesForEmiAndLoanAmountAuto(60, 25000);
                }else if (calcType == 'afford') {
                    setValuesForEmiForAffordTypeAuto(60, 25000);
                }
            
        }
    });

    $(".loans-calculator-auto .repayment-month ul li").click(function(){
        var selectedPeriod = parseInt($(this).data("value"));
        $('.loans-calculator-auto .repayment-month ul li.checkedAuto').not(this).removeClass('checkedAuto checked');
        $(this).addClass('checkedAuto checked');
        var calcType = $("#calcTypeAuto").val();
            if(calcType == "borrow"){
                setValuesForEmiAndLoanAmountAuto(selectedPeriod, 25000)

            }else if(calcType == "afford"){
                setValuesForEmiForAffordTypeAuto(selectedPeriod, 25000)
            }
    });
});

function setValuesForEmiAndLoanAmountAuto(period, maxValue){
    var multiple = getMultipleValueBasedOnUserSelectionAuto();

    var statusValueForMMI = $("#statusLoanCalculatorAuto option:selected").val()
    var salary = $("#salaryAuto").val();
    var maxEMI = salary * (statusValueForMMI) / 100;
    maxLoanAmount = ((salary * multiple < maxValue) ? salary * multiple : maxValue);
    $("#resultForEmiAuto").text(maxEMI);
    loan = calculateLoansBasedOnMainEmiAuto(interestRate, period, maxEMI);
    if (loan > maxLoanAmount) {
        loan = maxLoanAmount;
        $("#resultForEmiAuto").text(Math.round(calculateEMIBasedOnLoanAuto(interestRate, period, loan))).thousandFormatting();
    }
    $(".loanAmmountValidationMessageAuto").hide();
    if(loan == maxValue){
        $("#loanAmmountValidationMessageAuto" + maxValue).show();
    }
    $("#resultForLoanAmountAuto").text(Math.round(loan)).thousandFormatting();
}

function getMultipleValueBasedOnUserSelectionAuto(){
    //30% is used for retired
    //40% is used for employed

    var nationality = $("#loanCalcNationalityAuto option:selected").val();
    var statusLoanCalculator = $("#statusLoanCalculatorAuto option:selected").val();
    if(nationality == "kuwait"){
		return 25;
	} else{
		return 15;
	}
}

function setValuesForEmiForAffordTypeAuto(period, maxValue){
    //var rate = 5.25;
    var loanAmountInput = $("#loanAmountInputAuto").val();
    $("#resultForEmiAuto").text(Math.round(calculateEMIBasedOnLoan(interestRate, period, loanAmountInput))).thousandFormatting();
}

function calculateLoansBasedOnMainEmiAuto(interestRate, period, mainEmi) {
    var rate = interestRate / 1200;
    var nMultiplier = Math.pow((1 + rate), period);
    var res = (mainEmi - (nMultiplier * mainEmi)) / ((rate * nMultiplier) * -1);
    return res;
}

function calculateEMIBasedOnLoanAuto (interestRate, period, totalLoan) {
    var rate = interestRate / 1200;

    var nMultiplier = Math.pow((1 + rate), period);
    var nPayment = ((rate * (nMultiplier * totalLoan)) / (-1 + nMultiplier));
    return nPayment;
}
