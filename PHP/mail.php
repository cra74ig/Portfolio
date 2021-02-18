<?php
    $emailErr =0;
    $nameErr =0;
    $subjectErr =0;
    $messageErr =0;
    $from = "cbutton@craigbutton.co.uk";
    $to = $_REQUEST['Email'];
    $subject = $_REQUEST['Subject'];
    $message = $_REQUEST['Message'];

    $headers = "From:" . $from. "\r\n" .  "BCC: ctbutton44@gmail.com";
    if (empty($name)) {
        $nameErr = "Name is Required";
        $output['status']['code'] = "500";
        $output['status']['name'] = "Fail";
        $output['status']['description'] = $nameErr . ", ";
    }
    if(empty($to)){
        $emailErr = "Email is Required";
        $output['status']['code'] = "500";
        $output['status']['name'] = "Fail";
        $output['status']['description'] = $output['status']['description'] . $emailErr . ", ";
    }
    elseif (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format";
        $output['status']['code'] = "500";
        $output['status']['name'] = "Fail";
        $output['status']['description'] = $output['status']['description'] . $emailErr . ", ";
        
        
    }
    if (empty($subject)) {
        $subjectErr = "Subject is Required";
        $output['status']['code'] = "500";
        $output['status']['name'] = "Fail";
        $output['status']['description'] = $output['status']['description'] . $subjectErr . ", ";
    }
    if (empty($message)) {
        $messageErr = "Message is Required";
        $output['status']['code'] = "500";
        $output['status']['name'] = "Fail";
        $output['status']['description'] = $output['status']['description'] . $messageErr;
    }
    
    if($emailErr === 0 && $nameErr === 0 && $subjectErr === 0 && $messageErr === 0){
        if(mail($to,$subject,$message, $headers)) {
            
            $output['status']['code'] = "200";
            $output['status']['name'] = "ok";
            $output['status']['description'] = "success";
            
        } else {
            
            $output['status']['code'] = "500";
            $output['status']['name'] = "Fail";
            $output['status']['description'] = "Delivery Failed";
            
        }
    }
    echo json_encode($output); 
?>
