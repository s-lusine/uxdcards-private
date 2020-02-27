<?php
$results = array();
if(isset($_POST) && ($_POST['form-name'] == 'form-suggest')){
	$title		=	$_POST['title'];
	$category	=	$_POST['category'];
	$card_desc	=	$_POST['card-desc'];
	$user_name	=	$_POST['user-name'];
	$user_email	=	$_POST['user-email'];
	include INC_PATH . '/send-email.php';
	//send to admin
	$message 	= '<div>';
	$message 	.= '<p><strong>User name:</strong></p>';
	$message 	.= '<p>'.$user_name.'</p>';
	$message 	.= '<p><strong>User email:</strong></p>';
	$message 	.= '<p>'.$user_email.'</p>';
	$message 	.= '<p><strong>Title:</strong></p>';
	$message 	.= '<p>'.$title.'</p>';
	$message 	.= '<p><strong>Category:</strong></p>';
	$message 	.= '<p>'.$category.'</p>';
	$message 	.= '<p><strong>Card description:</strong></p>';
	$message 	.= '<p>'.$card_desc.'</p>';
	$message 	.= '</div>';
	sendMail($user_email, array(EMAIL_ADMIN), 'Suggest a new UX card', $message);

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