<?php

session_start(); #Start Session

include("includes/connection.php"); #MySQL Connection

if(isset($_POST['Submit'])) { #See if form was submitted
	$username = $_POST['username']; #Get Username from Form
	$password = $_POST['password']; #Get Password from Form

	$username = stripcslashes($username); #stripcslashes
	$password = stripcslashes($password); #stripcslashes


	$q = $pdo->prepare("SELECT * FROM users WHERE user_name = ?"); #Select all users with Username from Form

	$q->bindValue(1, $username); #Bind 1st value to Username

	$q->execute(); #Execute Query

	$num = $q->rowCount(); #Get Row Count

	if($num >= 1) { #Is row count 1 or greater?
		$error = "<br><br>Username already taken!"; #Set error to say "Username already taken!"
	} else { #If it's not taken,

		$pass2 = md5($password); #MD5 Encrypt password.  (Will change to more secure encryption later)

		$query = $pdo->prepare("INSERT INTO users (user_id, user_name, user_password, user_admin) VALUES (null, ?, ?, 0);");
		#Get Query Ready; The user_admin is set to 0 by default.  Read adminInfo.txt for more Information

		$query->bindValue(1, $username); #Bind 1st value to the Username
		$query->bindValue(2, $pass2); #Bind 1st value to the Password

		$query->execute(); #Execute Query

		echo "Account Created! <a href='login.php'>Login!</a>"; #Successful Account Creation, send to login.
	}
}

if(isset($_SESSON['Username'])) { #Is user already signed in?
?>

<!DOCTYPE html>

	<head>
		<title>Currently Logged In!</title>
		<link href='assets/style.css' rel='stylesheet' />
	</head>

	<body>
		<div class="container">
			<h2>Currently Logged In!</h2>
			<small><a href="index.php">Homepage</a></small>
		</div>
	</body>

</html>
<?php
} else { #If they're not already logged in, show form:
?>

<!DOCTYPE html>

	<head>

		<title>Register An Account</title>
		<link href='assets/style.css' rel='stylesheet'>

	</head>

	<body>

		<div class="container">

			<a href='index.php' id='logo'>Homepage</a>

			<?php

				if(isset($error)) {
					echo "<small style='color:#aa0000;'>".$error."</small>"; #Post error if there is one
				}

			?>

			<br><br>

			<form action="" method="POST" autocomplete="off">

				<input type="text" name="username" placeholder="Username" required>
				<input type="text" name="password" placeholder="Password" required>

				<input type="submit" name="Submit" value="Register Account">

			</form>

			<small><a href="login.php">Log In</a></small>

		</div>

	</body>

</html>

<?php } ?>