<?php

include_once("includes/userData.php");
include_once("includes/connection.php");

session_start();

$userData = new UserData;

if(isset($_SESSION['Username'])) {

	if($userData->isAdmin($_SESSION['Username'])) {

		$query = $pdo->prepare("DELETE FROM articles WHERE 1 = 1");
		$query->execute();

		header("Location: index.php");

	} else {
		echo "You must be an admin!";
	}

} else {
	echo "You must be logged in!";
}