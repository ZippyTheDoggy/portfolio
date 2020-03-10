<?php

session_start(); #Start Session

unset($_SESSION['Auth']); #Unset Auth
unset($_SESSION['Username']); #Unset Username

header("Location: index.php"); #Redirect to index.php (Homepage)

?>