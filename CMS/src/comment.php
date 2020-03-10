<?php

	session_start();

	include_once("includes/connection.php");
	include_once("includes/Markdown.php");

	$mkdown = new Parsedown;

	if("POST" == $_SERVER['REQUEST_METHOD']) {

		$content = $_POST['content'];

		$username = $_SESSION['Username'];

		$id = $_POST['id'];

		$mkd = $mkdown->text($content);

		$query = $pdo->prepare("INSERT INTO comments (Content, CommentTime, Username, article_id, c_id) VALUES (?,?,?,?,?)");

		$query->bindValue(1, $mkd);
		$query->bindValue(2, time());
		$query->bindValue(3, $username);
		$query->bindValue(4, $id);
		$query->bindValue(5, uniqid());

		$query->execute();

		header("Location: article.php?id=".$id);

	}
?>