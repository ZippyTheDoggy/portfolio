<?php

session_start();

include_once("includes/connection.php"); #MySQL Connection
include_once("includes/article.php"); #Article class
include_once("includes/userData.php"); #UserData class

include_once("includes/Markdown.php"); #Markdown Parser

$article = new Article;

$Markdown = new Parsedown();

function resetViews($id1) {
	$query = $pdo->prepare("UPDATE articles SET views = 0 WHERE article_id = ?");
	$query->bindValue(1, $id1);
	$query->execute();
}

if(isset($_GET['id'])) { #See if ID is inputted.  url?id=<Article ID - Number>

		$id = $_GET['id']; #Get ID
		$data = $article->fetch_data($id); #Fetch article from ID

		if(isset($_GET['ix'])) {

			$cv = $pdo->prepare("SELECT views FROM articles WHERE article_id = ?");

			$cv->bindValue(1, $id); #Bind Value 1 to the Article ID

			$cv->execute(); #Executes Query

			$cv_temp = $cv->fetch();

			$cv_temp = $cv_temp['views'];

			$currentViews = (int)$cv_temp + 1;

			$query = $pdo->prepare("UPDATE articles SET views = ? WHERE article_id = ?");

			$query->bindValue(1, $currentViews); #Bind Value 1 to the Current Views + 1
			$query->bindValue(2, $id); #Bind Value 2 to the Article ID

			$query->execute();

			header("Location: article.php?id=".$id);

		}

	?>

<!DOCTYPE html>

	<head>
		<title>CMS</title>

		<link rel="stylesheet" href="assets/style.css" />

	</head>

	<body>

		<div class="container">

			<h4><?php $UsernameChecked = $data['username']; $ud = new UserData; if($ud->isAdmin($data['username'])) {$UsernameChecked = '<span style="color: Red;">'.$data['username'].'</span>';} echo $data['article_title']; ?></h4> - <small>Posted <?php echo date("l jS", $data['article_timestamp']); ?><?php echo " - By ".$UsernameChecked; ?></small> - <small>Views: <?php echo $data['views']; ?> </small>


			<p class="content-post">

				<?php
					$content = $data['article_content'];
					echo $Markdown->text($content);
				?>

			</p>

			<a href="index.php">&larr; Back</a>

			<?php

				if(isset($_SESSION['Username'])) {

					$userData = new UserData;

					if($userData->isAdmin($_SESSION['Username'])) {
						echo "<span> - </span><a href='delete.php?id=".$data['article_id']."'>(Admin) DELETE</a>";
						echo "<span> <strong>-</strong> </span><a href='reset-views.php?id=".$data['article_id']."'>(Admin) Reset Views</a>";
					}

					?>
					<br><br><br>
					<form action="comment.php" method="POST" autocomplete="off">

						<input type="hidden" name="id" value="<?php echo $data['article_id']; ?>">

						<textarea id="content" rows="5" cols="70" name="content" placeholder="Comment" required></textarea><br>

						<input type="submit" id="Submit" value="Create Comment">

					</form>

					<?php

				} else {

					

				}

			?>

			<div id="comments">
				<!-- Comments Section -->

				<?php

					$ud = new UserData;

					$query = $pdo->prepare("SELECT * FROM comments WHERE article_id = ?");

					$query->bindValue(1, $data['article_id']);

					$query->execute();

					$res = $query->fetchAll();

					foreach($res as $r) {

						echo "<br><div style='border: 4px Green solid;'>";

						echo "Username: ".$r['Username'];

						if(isset($_SESSION['Username'])) {

							$isOwner = false;

							if($_SESSION['Username'] == $r['Username'] || $_SESSION['Username'] == $data['username']) {

								$a = $r['c_id'];
								echo " - <form action='delete_comment.php' method='POST'><input type='hidden' name='c_id' value='".$a."'><input type='hidden' name='id' value='".$r['article_id']."'><input type='submit' value='Delete Post'></form><br>";

								$isOwner = true;
							}

							if($ud->isAdmin($_SESSION['Username'])) {

								if($isOwner == false) {

									echo "<form action='delete_comment.php' method='POST'><input type='hidden' name='c_id' value='".$r['c_id']."'><input type='hidden' name='id' value='".$r['article_id']."'><input type='submit' value='(ADMIN) Delete Post'></form><br>";

								}
							}

						}

						echo "<br>";

						echo "Comment: <br> ".$r['Content'];

						echo "</div>";

					}

				?>

			</div>

		</div>

	</body>

</html>

	<?php

} else {
	echo "ID Required!";
}

?>