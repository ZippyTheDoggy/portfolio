<?php

	session_start();

	include_once("includes/connection.php");

	if("POST" == $_SERVER['REQUEST_METHOD']) {

		$query = $pdo->prepare("DELETE FROM comments WHERE c_id=?");

		$query->bindValue(1, $_POST['c_id']);

		$query->execute();

		header("Location: article.php?id=".$_POST['id']);

	}

?>