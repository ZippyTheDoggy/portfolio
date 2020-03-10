<?php

include_once("includes/connection.php"); #MySQL Connection
include_once("includes/article.php"); #Article class
include_once("includes/userData.php"); #UserData class

$article = new Article; #Variable for the Article class, includes/article.php

$articles = $article->fetch_all(); #Get all articles in Database

session_start(); #Start Session

$userData = new UserData;

$IS_SEARCH = false;

if(isset($_GET['q'])) {
	$IS_SEARCH = true;
}

?>

<!DOCTYPE html>

	<head>
		<title>CMS</title>

		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    	<!-- Bootstrap CSS -->
    	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">


	</head>

	<body>

		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    	<div class='container'>
    		<nav class='navbar navbar-expand-lg navbar-light bg-light'>

    		<a class='navbar-brand' href='index.php' style='border-bottom: 0px;'>CMS</a>

    		<button class='navbar-toggler' type='button' data-toggle='collapse' data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    			<span class='navbar-toggler-icon'></span>
    		</button>

    		<div class='collapse navbar-collapse' id='navbarNavDropdown'>
    			<ul class='navbar-nav'>
    				<li class='navbar-item active' style='border-bottom: 0px;'>
    					<a class='nav-link' href='index.php'>Posts <span class='sr-only'>(Current)</span></a>
    				</li>
    				<li class='navbar-item' style='border-bottom: 0px;'>
    					<a class='nav-link' href='#'>#1</a>
    				</li>
    				<li class='navbar-item' style='border-bottom: 0px;'>
    					<a class='nav-link' href='#'>#2</a>
    				</li>

    				<?php

    				if(isset($_SESSION['Username'])) {
    					if($userData->isAdmin($_SESSION['Username'])) {?>

    				<li class='nav-item dropdown'>
    					<a class='nav-link dropdown-toggle' href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    						ADMIN
    					</a>

    					<div class='dropdown-menu' area-labelledby='navbarDropdownMenuLink'>
    						<a class='dropdown-item' href='delete_all.php'>Delete All</a>
    						<a class='dropdown-item'>#2</a>
    						<a class='dropdown-item'>#3</a>
    					</div>

    				</li><?php }} ?>

    				<form action='' method='get' class="form-inline" style='position: absolute; right: 1rem;'>
						<input name='q' class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>

    			</ul>
    		</div>

    	</nav>

		<div style='text-align: center; margin-top: 3rem;'>
				
				<?php

				if(isset($_SESSION['Username']) && $_SESSION['Auth'] == true) { #If user is signed in,
					if($userData->isAdmin($_SESSION['Username'])) {
						echo "Signed In As <span style='color:red;'>".$_SESSION['Username']."</span> - <a href='logout.php'>Log Out</a> - <a href='create.php'>Create Article</a>"; //If user is admin, their username is Red.
					} else {
						echo "Signed In As <span style='color:blue;'>".$_SESSION['Username']."</span> - <a href='logout.php'>Log Out</a> - <a href='create.php'>Create Article</a>"; //If user isn't admin, their username is blue.
					}
				} else { #If not signed in, 
					echo "<a href='login.php'>Log In</a><span> - </span><a href='register.php'>Register</a>"; #Link to Sign In or Register
				}

				?>

			<ol>

				<?php

					foreach($articles as $article) { #For each Article in the Database (Fetched from Article class)

				?>

				<li style='list-style-type:none; margin-top: 1rem;'>
					<?php if($IS_SEARCH) {
						if(strpos($article['article_title'], $_GET['q']) !== false) {?>

							<a href="article.php?id=<?php echo $article['article_id'].'&ix=1'; ?>">
								<?php echo $article['article_title']; #Article Title
							?></a>

							 - <small>Posted <?php

							 echo date("l jS", $article['article_timestamp']); #Monday, January 1st 
							 #Post Date it was created

							 $userData = new UserData; #UserData class, includes/userData.php

							 $UsernameChecked = $article['username'];

							 if($userData->isAdmin($article['username'])) { #Is the Article Poster an admin?  If so, change color

							 	$UsernameChecked = "<span style='color: red'>".$article['username']."</span>";

							 }

							 echo " - By ".$UsernameChecked." (id-".$article['article_id'].");";
							 #Post Username and the ID.

							 if(isset($_SESSION['Username'])) { #Is User Signed In?

								if($userData->isAdmin($_SESSION['Username'])) { #Check if they're an admin
									echo "<span> - </span><small><a href='delete.php?id=".$article['article_id']."'>(Admin) DELETE</a></small>"; 
									#Creates Link to delete post
								}

							}

							?></small><?php
						}
					} else { ?>
					<a href="article.php?id=<?php echo $article['article_id'].'&ix=1'; ?>">
						<?php echo $article['article_title']; #Article Title
					?></a>

					 - <small>Posted <?php

					 echo date("l jS", $article['article_timestamp']); #Monday, January 1st 
					 #Post Date it was created

					 $userData = new UserData; #UserData class, includes/userData.php

					 $UsernameChecked = $article['username'];

					 if($userData->isAdmin($article['username'])) { #Is the Article Poster an admin?  If so, change color

					 	$UsernameChecked = "<span style='color: red'>".$article['username']."</span>";

					 }

					 echo " - By ".$UsernameChecked." (id-".$article['article_id'].");";
					 #Post Username and the ID.

					 if(isset($_SESSION['Username'])) { #Is User Signed In?

						if($userData->isAdmin($_SESSION['Username'])) { #Check if they're an admin
							echo "<span> - </span><small><a href='delete.php?id=".$article['article_id']."'>(Admin) DELETE</a></small>"; 
							#Creates Link to delete post
						}

					}

					?></small>
				</li>

				<?php }} ?>

			</ol></div>

		</div>

	</body>

</html>