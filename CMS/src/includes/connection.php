<?php

$host = "localhost";
$dbname = "cms";
$username = "root";
$password = "";

try {
	$pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $username, $password);
	 //Changing "dbname=" will RESET ALL DATA.  So will changing the "host=" unless you have the data already transfered from the first host to the one you're changing it to.
} catch (PDOException $e) {
	exit("DB Error.");
}

?>