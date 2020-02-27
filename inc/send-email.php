<?php
function sendMail( $from='', $to=array(), $subject='', $message='' ){
	$to      	= implode(', ', $to);
	$subject 	= $subject;
	$message 	= $message;
	// To send HTML mail, the Content-type header must be set
	$headers 	= array();
	$headers[] 	= 'From: ' . $from;
	$headers[] 	= 'MIME-Version: 1.0';
	$headers[]	= 'Content-type: text/html; charset=iso-8859-1';
	$headers[] 	= 'X-Mailer: PHP/'.phpversion();

	mail($to, $subject, $message, implode("\r\n", $headers));
}