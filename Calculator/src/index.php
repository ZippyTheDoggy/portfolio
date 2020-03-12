<!DOCTYPE html>

	<head><title>This worked out way better than I expected.</title>

		<style>

			button {
				margin-right: 10px;
				margin-bottom: 10px;
			}

			html {

				background: linear-gradient(to bottom, #cc66ff 0%, #ff3399 100%);
				background-repeat: no-repeat;
				background-size: cover;

				width: 100%;
				height: 100%;

			}

		</style>

	</head>

	<body>

		<script>

			var Equation = "";

			var Showing = false;

			var LastClicked = "";

			var decimalIn = false;

			function Update() {

				document.getElementById("Showing").innerHTML = "<h1 id='Showing'>" + Equation + "</h1>";

			}

			function addNumber(num) {

				if(Showing == true) {

					Equation = "";

					Showing = false;

				}

				Equation += num;

				Update();

			}

			function addPlus() {

				if(Showing == true) {

					Equation = eval(Equation);

					Showing = false

				}

				if(LastClicked == "+") {
					return;
				}

				LastClicked = "+";

				decimalIn = false;

				Equation += "+";
				Update();
			}

			function addTimes() {

				if(Showing == true) {

					Equation = eval(Equation);

					Showing = false;

				}

				if(LastClicked == "*") {
					return;
				}

				LastClicked = "*";

				decimalIn = false;

				Equation += "*";
				Update();

			}

			function divide() {

				if(Showing == true) {

					Equation = eval(Equation);

					Showing = false;

				}

				if(LastClicked == "/") {
					return;
				}

				LastClicked = "/";

				decimalIn = false;

				Equation += "/";
				Update();

			}

			function minus() {

				if(Showing == true) {

					Equation = eval(Equation);

					Showing = false;

				}

				if(LastClicked == "-") {
					return;
				}

				LastClicked = "-";

				decimalIn = false;

				Equation += "-";
				Update();

			}

			function decimal() {

				if(decimalIn == true) {
					return;
				}

				if(Showing == true) {

					return;

				}

				decimalIn = true;

				Equation += ".";
				Update();

			}

			function show() {

				document.getElementById("Showing").innerHTML = "<h1 id='Showing'>" + eval(Equation) + "</h1>";

				Showing = true;

			}

			function back(){

				Equation = Equation.slice(0, -1);

				Update();

			}

		</script>

		<h1 id='Showing'></h1>

		<style>

			.buttons { 
			  width: 10%;
			  table-layout: fixed;
			  border-collapse: collapse;
			}
			.buttons button { 
			  width: 100%;
			}

		</style>

		<table class='buttons'>
	<tbody>
		<tr>
			<td><button type='button' onclick='addNumber("1")'>1</button></td>
			<td><button type='button' onclick='addNumber("2")'>2</button></td>
			<td><button type='button' onclick='addNumber("3")'>3</button></td>
			<td><button type='button' onclick='addPlus()'>+</button></td>
		</tr>
		<tr>
			<td><button type='button' onclick='addNumber("4")'>4</button></td>
			<td><button type='button' onclick='addNumber("5")'>5</button></td>
			<td><button type='button' onclick='addNumber("6")'>6</button></td>
			<td><button type='button' onclick='addTimes()'>x</button></td>
		</tr>
		<tr>
			<td><button type='button' onclick='addNumber("7")'>7</button></td>
			<td><button type='button' onclick='addNumber("8")'>8</button></td>
			<td><button type='button' onclick='addNumber("9")'>9</button></td>
			<td><button type='button' onclick='addNumber("0")'>0</button></td>
		</tr>

		<tr>

			<td><button type='button' onclick='show()'>=</button></td>
			<td><button type='button' onclick='divide()'>/</button></td>
			<td><button type='button' onclick='minus()'>-</button></td>
			<td><button type='button' onclick='decimal()'>.</button></td>

		</tr>

		<tr>

			<td><button type='button' onclick='back()'><</button></td>

		</tr>

		<br>

	</tbody>
</table>

	</body>

</html>