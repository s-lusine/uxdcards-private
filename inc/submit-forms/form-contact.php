<?php
$results = array();
if(isset($_POST) && ($_POST['form-name'] == 'form-contact')){
	$user_name	=	$_POST['user-name'];
	$user_email	=	$_POST['user-email'];
	$message	=	$_POST['message'];
	include INC_PATH . '/send-email.php';
	//send to admin
	sendMail(EMAIL_ADMIN, array(EMAIL_ADMIN), 'UXD Contact Form', $message);

	//auto reply to user
	$message_user = file_get_contents(INC_PATH . '/email-templates/thankyou-template.html');
	$message_user = str_replace('{{user_name}}', $user_name, $message_user);
	sendMail(EMAIL_ADMIN, array($user_email), 'Thank you!', $message_user);
	$results['status'] = 'success';
	$results['message'] = 'Success!';
}else{
	$results['status'] = 'false';
	$results['message'] = 'Error!';
}
die(json_encode($results));