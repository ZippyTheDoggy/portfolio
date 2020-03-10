<?php 
include_once("includes/connection.php"); #MySQL Connection

session_start(); #Start Session

?>

<?php
	if(isset($_POST['Submit']) && isset($_POST['username']) && isset($_POST['password'])) { #See if form is submitted

		$username = stripcslashes($_POST['username']); #Get Username form Form

		$password = stripcslashes($_POST['password']); #stripcslashes
		$password = md5($_POST['password']); #Get Password from Form, and encrypt it into MD5

		if (empty($_POST['username']) || empty($_POST['password'])) { #If either is empty,
			$error = "Username and Password is required!"; #Set error to "Username and Password is required!"
		} else { #Else, 

			$query = $pdo->prepare("SELECT * FROM users WHERE user_name = ? AND user_password = ?");
			#Prepare Query

			$query->bindValue(1, $username); #Bind Value 1 to Username
			$query->bindValue(2, $password); #Bind Value 2 to Password (ENCRYPTED, MD5)

			$query->execute(); #Execute Query

			$num = $query->rowCount(); #Get Row Count

			if($num >= 1) { #See if Account is valid
				$_SESSION['Auth'] = true; #Set Auth
				$_SESSION['Username'] = $username; #Set Username

				header("Location: index.php"); #Send to index.php

			} else { #If Account not found, 
				$error = "Invalid Credentials!"; #Set error to "Invalid Credintials!"
			}

		}
	}

	if(isset($_SESSION['Username'])) { #If already signed in, 
?>

<!DOCTYPE html>

	<head>
		<title>Already Logged In!</title>
		<link href='assets/style.css' rel='stylesheet' />
	</head>

	<body>
		<div class="container">
			<h2>Already Logged In!</h2>
			<small><a href="index.php">Homepage</a></small>
		</div>
	</body>

</html>

<?php
	} else { #If not logged in, show Form

?>

<!DOCTYPE html>

	<head>
		<title>CMS</title>
		<link rel="stylesheet" href="assets/style.css" />
	</head>

	<body>

		<div class="container">

			<a href="index.php">Homepage</a>

			<br><br>

			<?php

				if(isset($error)) {
					echo "<small style='color:#aa0000;'>".$error."</small>"; #Echo Error if set
				}

			?>

			<form action="" method="POST" autocomplete="off">

				<input type="text" name="username" placeholder="Username: " required>
				<input type="text" name="password" placeholder="Password: " required>
				<input type="submit" name="Submit" value="Log In">

			</form>

			<small><a href="register.php">Register</a></small>

		</div>

	</body>

</html>

<?php } ?>