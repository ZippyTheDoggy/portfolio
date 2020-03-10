<?php

include_once("connection.php");

class UserData {
	public function isAdmin($username) {

		global $pdo;

		$query = $pdo->prepare("SELECT user_admin FROM users WHERE user_name = ?");
		$query->bindValue(1, $username);

		$query->execute();

		$res = $query->fetch();

		if($res['user_admin'] == '1') {
			return true;
		} else {
			return false;
		}

	}

}

?>
