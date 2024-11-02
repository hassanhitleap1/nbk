<?php

function sendtEmail($data){
    $to = "recipient@example.com";
    $subject = "Test Email";
    $message="";
    foreach($data as $key=>$msg){
        $message.= "$key :  $msg\n";
    }
    $headers = "From: sender@example.com\r\n";
    $headers .= "Reply-To: sender@example.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}

?>
