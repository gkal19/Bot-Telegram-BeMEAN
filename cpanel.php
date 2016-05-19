<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>BeMEAN Bot</title>
	<link href='https://fonts.googleapis.com/css?family=Roboto:500' rel='stylesheet' type='text/css'>
	<style>
		body{
			background-color: #5C5C5C;
			font-family: 'Roboto', sans-serif;
		}
		.panel{
			position: fixed;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-o-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #CACACA;
			padding-left: 20px;
			padding-right: 20px;
			padding-bottom: 15px;
			border-radius: 15px;
			text-align: center;
		}
		.online{
			color: #0DB51C;
		}
		.stopped{
			color: #FFEE06;
		}
		.errored{
			color: #FF4545;
		}
	</style>
</head>
<body>
	<?php
	if(isset($_POST['action'])){
		switch ($_POST['action']) {
			case 'start':
			exec("/usr/bin/pm2 start BeMean-bot");
			break;

			case 'stop':
			exec('/usr/bin/pm2 stop BeMean-bot');
			break;

			case 'restart':
			exec('/usr/bin/pm2 restart BeMean-bot');
			break;
		}
	}

	exec("pm2 jlist", $info);
	$info = json_decode($info[0], true);
	$count = count($info);
	foreach ($info as $p) {
		if($p['name'] == "BeMean-bot"){
			$process = $p;
		}
	}
	?>

	<div class="panel">
		<h1>BeMEAN Bot</h1>
		<div>
			Status: <b class="<?= $process['pm2_env']['status'] ?>"><?= $process['pm2_env']['status'] ?></b><br>
			Restarts: <?= $process['pm2_env']['restart_time'] ?>
		</div>
		<br>
		<form action="" method="POST">
			<div class="buttons">
				<button class="btn" name="action" value="start">Start</button>
				<button class="btn" name="action" value="stop">Stop</button>
				<button class="btn" name="action" value="restart">Restart</button>
			</div>
		</form>
	</div>
</body>
</html>