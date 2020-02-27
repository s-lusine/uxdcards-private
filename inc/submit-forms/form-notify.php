<?php
$results = array();
if(isset($_POST) && ($_POST['form-name'] == 'form-notify')){
	include INC_PATH . '/send-email.php';
	include INC_PATH . '/add-list-mailchimp.php';

	$user_name	=	$_POST['FNAME'];
	$user_email	=	$_POST['EMAIL'];
	$category	=	$_POST['category'];

	$data = [
	    'email'     => $user_email,
	    'status'    => 'subscribed',
	    'username'	=> $user_name,
	    'category'	=> $category
	];

	$httpCode = addMailchimp($data);
	
	if($httpCode == 200){
		//auto reply to user
		$message = file_get_contents(INC_PATH . '/email-templates/welcome-template.html');
		//$message = str_replace('{{user_name}}', $user_name, $message_user);
		sendMail(EMAIL_ADMIN, array($user_email), 'UX Cards Launch List', $message);
		$results['status'] = 'success';
		$results['message'] = 'Success!';
	}else{
		$results['status'] = 'false';
		$results['message'] = 'Error!';
	}
	
}else{
	$results['status'] = 'false';
	$results['message'] = 'Error!';
}
die(json_encode($results));