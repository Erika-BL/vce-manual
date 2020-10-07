<?php header("Content-type: text/plain; charset=windows-1252"); error_reporting(0);
if($_GET["t"] == 0) {
	echo "CACHE: " . (file_exists("manual.txt") ? filemtime("manual.txt") : 1);
}
else if($_GET["t"] == 1) {
	if(file_exists("manual.txt")) {
		$handle = fopen("manual.txt", "r");
		if ($handle) {
			while (($line = fgets($handle)) !== false) {
				echo $line;
			}

			fclose($handle);
		}
		else
			die("ERROR: Error opening manual.txt");
	}
	else
		die("ERROR: manual.txt is missing");
}
