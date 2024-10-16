/**
 * Created by Miroslav Pashaliski on 8/16/2017.
 */

console.log("INFO -> UAE Right Account Script Loaded");

var ACCESS_MONEY = "access-money";
var SAVE_LONG_TERM = "save-long-term";
var SAVE_SHORT_TERM = "save-short-term";

var UAE_CURRENCY = "aed";
var FOREIGN_CURRENCY = "foreign";


var SUBMIT_BTN = "#right-account-uae";
var CURRENCY_OPTIONS_CLASS = ".uae-currency-options";
var CHECKBOOK_OPTIONS_CLASS = ".uae-checkbook-options";
var INTEREST_TYPE_CLASS = ".uae-interest-type";
var INTEREST_PAID_OPTIONS_CLASS = ".uae-interest-paid-options";
var INTEREST_EARN_CLASS = ".uae-earn-interest-options";
var TRANSFER_OPTIONS = ".uae-transfer-options";

$(document).ready(function () {

    $("#accountType").change(function(){
        var accountType = $(this).val();

        hideCheckBook();
        hideTypeOfInterest();
        hideInterestPaidOptions();
        hideTransferOptions();
        hideSubmitButton();

        uncheckInterestPaidRadioButton();
        uncheckCurrencyRadioButton();
        uncheckCheckbookRadioButton();
        uncheckTransferPaidRadioButton();
        uncheckInterestTypeRadioButton();
        if( accountType == ACCESS_MONEY ){
            console.log("INFO -> Access Money Option");

            ACCOUNT_TYPE = ACCESS_MONEY;

        }else if ( accountType == SAVE_LONG_TERM ){
            console.log("INFO -> Save Long Term");
            ACCOUNT_TYPE = SAVE_LONG_TERM;

        }else if ( accountType == SAVE_SHORT_TERM ){
            console.log("INFO -> Save Short Term");
            ACCOUNT_TYPE = SAVE_SHORT_TERM;
        }

        showCurrencyOptions();
    });

    $(document).on('click', '[name="accessMoneyCurrency"]', function () {
        var currency = $(this).val();
        uncheckCheckbookRadioButton();
        uncheckTransferPaidRadioButton();
        uncheckInterestTypeRadioButton();
        uncheckInterestPaidRadioButton();

        if( currency == FOREIGN_CURRENCY ){
            hideCheckBook();
            hideTypeOfInterest();
            hideInterestPaidOptions();
            hideTransferOptions();
            /*hide other steps */

            showSubmitButton();
        }else if( currency == UAE_CURRENCY ){
            hideInterestPaidOptions();
            hideSubmitButton();
            showCheckBook();

            if(ACCOUNT_TYPE == ACCESS_MONEY){
                hideTypeOfInterest();
                hideInterestPaidOptions();
                showCheckBook();
            }else if (ACCOUNT_TYPE == SAVE_SHORT_TERM){
                hideCheckBook();
                hideInterestPaidOptions();

                showTypeOfInterest();
            }else if (ACCOUNT_TYPE == SAVE_LONG_TERM){
                hideCheckBook();
                hideTypeOfInterest();

                showInterestPaidOptions();
            }
        }
    });

    $(document).on('click', '[name="checkBookOptions"]', function () {
        var checkBook = $(this).val();

        if( checkBook == "yes" ){
            hideTransferOptions();
            showSubmitButton();
        }else{
            showTransferOptions();
            hideSubmitButton();
        }

    });

    $(document).on('click', '[name="transferSalary"]', function () {
        showSubmitButton();
    });
    $(document).on('click', '[name="interestType"]', function () {
        showSubmitButton();
    });
    $(document).on('click', '[name="interestPaidOptions"]', function () {
        showSubmitButton();
    });
});

function showSubmitButton(){
    $(SUBMIT_BTN).removeClass("hide");
    $(SUBMIT_BTN).addClass("show");
}
function hideSubmitButton(){
    $(SUBMIT_BTN).removeClass("show");
    $(SUBMIT_BTN).addClass("hide");
}
function showCurrencyOptions(){
    $(CURRENCY_OPTIONS_CLASS).removeClass("hide");
    $(CURRENCY_OPTIONS_CLASS).addClass("show");
}
function hideCurrencyOptions(){
    $(CURRENCY_OPTIONS_CLASS).removeClass("show");
    $(CURRENCY_OPTIONS_CLASS).addClass("hide");
}
function showCheckBook(){
    $(CHECKBOOK_OPTIONS_CLASS).removeClass("hide");
    $(CHECKBOOK_OPTIONS_CLASS).addClass("show");
}
function hideCheckBook(){
    $(CHECKBOOK_OPTIONS_CLASS).removeClass("show");
    $(CHECKBOOK_OPTIONS_CLASS).addClass("hide");
}
function showTypeOfInterest(){
    $(INTEREST_TYPE_CLASS).removeClass("hide");
    $(INTEREST_TYPE_CLASS).addClass("show");
}
function hideTypeOfInterest(){
    $(INTEREST_TYPE_CLASS).removeClass("show");
    $(INTEREST_TYPE_CLASS).addClass("hide");
}
function showInterestPaidOptions(){
    $(INTEREST_PAID_OPTIONS_CLASS).removeClass("hide");
    $(INTEREST_PAID_OPTIONS_CLASS).addClass("show");
}
function hideInterestPaidOptions(){
    $(INTEREST_PAID_OPTIONS_CLASS).removeClass("show");
    $(INTEREST_PAID_OPTIONS_CLASS).addClass("hide");
}
function showInterestEarnOptions(){
    $(INTEREST_EARN_CLASS).removeClass("hide");
    $(INTEREST_EARN_CLASS).addClass("show");
}
function hideInterestEarnOptions(){
    $(INTEREST_EARN_CLASS).removeClass("show");
    $(INTEREST_EARN_CLASS).addClass("hide");
}
function showTransferOptions(){
    $(TRANSFER_OPTIONS).removeClass("hide");
    $(TRANSFER_OPTIONS).addClass("show");
}
function hideTransferOptions(){
    $(TRANSFER_OPTIONS).removeClass("show");
    $(TRANSFER_OPTIONS).addClass("hide");
}
function uncheckCurrencyRadioButton(){
    $('input[name=accessMoneyCurrency]').attr('checked',false);
}
function uncheckCheckbookRadioButton(){
    $('input[name=checkBookOptions]').attr('checked',false);
}
function uncheckInterestTypeRadioButton(){
    $('input[name=interestType]').attr('checked',false);
}
function uncheckInterestPaidRadioButton(){
    $('input[name=interestPaidOptions]').attr('checked',false);
}
function uncheckTransferPaidRadioButton(){
    $('input[name=transferSalary]').attr('checked',false);
}