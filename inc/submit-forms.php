<?php
	include dirname(__FILE__) . '/config.php';
	if(isset($_POST) && !empty($_POST['form-name'])){
		if($_POST['form-name'] == 'form-contact'){
			include dirname(__FILE__) . '/submit-forms/form-contact.php';
		}
		if($_POST['form-name'] == 'form-suggest'){
			include dirname(__FILE__) . '/submit-forms/form-suggest.php';
		}
		if($_POST['form-name'] == 'form-notify'){
			include dirname(__FILE__) . '/submit-forms/form-notify.php';
		}
	}else{
		echo 'not available';
		exit;
	}
?>