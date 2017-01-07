<?php

switch($_SERVER['REQUEST_METHOD']){
	case 'GET': $the_request = &$_GET; break;
	case 'POST': $the_request = &$_POST; break;
	default:
}

if(isset($the_request['rdata'])){
	echo "Server response back";
}else {
	echo "no data";
}




?>
