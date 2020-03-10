<?php

session_start(); #Start Session

include_once("includes/connection.php"); #MySQL Connection

include_once("includes/Markdown.php");

$Markdown = new Parsedown(); #Markdown Parser

if(isset($_POST['Submit'])) { #Is Form Submitted?

	$title = $_POST['title']; #Get Title from Form
	$content = nl2br($_POST['content']); #Get Content from Form, and use nl2br (New Line to <br>)

	if(empty($title) || empty($content)) { #Is either empty?
		$error = "Title and Content fields are Required!"; #Set Error
	} else { #If it's not empty, 
		$query = $pdo->prepare("INSERT INTO articles (article_title, article_content, article_timestamp, username, views) VALUES (?,?,?,?,0)"); #Prepare Query

		$timestamp = time();

		$query->bindValue(1, $title); #Bind Value 1 to the Title
		$query->bindValue(2, $Markdown->text($content)); #Bind Value 2 to Markdown Parsed content(content -> nl2br)
		$query->bindValue(3, $timestamp); #Bind Value 3 to current time (Time Article is posted)
		$query->bindValue(4, $_SESSION["Username"]); #Bind Value 4 to User's Username

		$query->execute(); #Execute Query

		$getTitle = $pdo->prepare("SELECT * FROM articles WHERE article_title = ? and article_content = ? and article_timestamp = ? and username = ?");

		$getTitle->bindValue(1, $title);
		$getTitle->bindValue(2, $Markdown->text($content));
		$getTitle->bindValue(3, $timestamp);
		$getTitle->bindValue(4, $_SESSION['Username']);

		$getTitle->execute();

		$id = $getTitle->fetch()['article_id'];

		header("Location: article.php?id=".$id); #Redirect to index.php

	}
}

if(isset($_SESSION['Username'])) { #Is user Logged In?
?>


<!DOCTYPE html>

	<head>
		<title>Create Article</title>
		<link href="assets/style.css" rel="stylesheet" />
	</head>

	<body>

		<div class="container">
			<a href="index.php" id="logo">CMS</a><br><br>

			<?php

				if(isset($error)) {
					echo "<br><small style='color:#aa0000;'>".$error."</small><br>"; #Display Error if set
				}

			?>

			<form action="" method="POST" autocomplete="off">

				<input id="title" type="text" name="title" placeholder="Title" required><br><br>
				<textarea id="content" rows="15" cols="70" name="content" placeholder="Content"required></textarea><br>

				<input type="submit" name="Submit" value="Create" />

			</form>

		</div>

	</body>

</html>


<?php

} else { #If not signed in, say user has to be signed in.

?>

<!DOCTYPE html>

	<head>
		<title>Must Be Signed In</title>
		<link href="assets/style.css" rel="stylesheet" />
	</head>

	<body>
		<div class="container">

			<h2>You must be signed in to do this!</h2>
			<br>
			<h3><a href="login.php">Log In</a> or <a href="register.php">Register</a></h3>

		</div>
	</body>

</html>

<?php
}

?>