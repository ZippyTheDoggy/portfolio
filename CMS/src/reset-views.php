<?php

session_start();

include_once("includes/connection.php");
include_once("includes/userData.php");

$UserData = new UserData;

if(isset($_SESSION['Username'])) {

	if($UserData->isAdmin($_SESSION['Username'])) {

		if(isset($_GET['id'])) {

			$query = $pdo->prepare("UPDATE articles SET views = ? WHERE article_id = ?");

			$query->bindValue(1, 0);
			$query->bindValue(2, $_GET['id']);

			$query->execute();

			header("Location: article.php?id=".$_GET['id']);

		} else { #No ID in URL
			echo "You must have an ID in the URL! (And be Indexed)";
		}

	} else { #Isn't an Admin
		echo "You must be an Admin to do this! <a href='index.php'>Homepage</a>";
	}

} else { #Not Signed In
?>

<!DOCTYPE html>

	<head>
		<title>Must Be Logged In!</title>
		<link href='assets/style.css' rel='stylesheet' />
	</head>

	<body>
		<h1 style="text-align: center;">You must be logged in!</h1>
		<h3 style="text-align: center;"><a href='login.php'>Click to Log In</a></h3>
	</body>

</html>

<?php
}
?>