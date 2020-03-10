<?php

	include_once("includes/connection.php");
	include_once("includes/userData.php");

	session_start();

	$UserData = new UserData;

	if(isset($_SESSION['Username'])) {

		if($UserData->isAdmin($_SESSION['Username'])) {

			if(isset($_GET['id'])) {

				$query = $pdo->prepare("DELETE FROM articles WHERE article_id = ?");
				$query->bindValue(1, $_GET['id']);

				$query->execute();

				header("Location: index.php");

			} else { #No ID In URL
				echo "You must have an ID in the URL!";
			}
		} else { #Not Admin
			echo "You must be an Admin to do this! <a href='index.php'>Homepage</a>";
		}
	} else { #Isn't logged in
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