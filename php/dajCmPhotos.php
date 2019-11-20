<?php
//header('Content-type: text/html; charset=windows-1250');
header('Content-type: text/html; charset=utf-8');
//header('Content-type: text/txt; charset=utf-8');
$conn = pg_connect("host=127.0.0.1 port=5432 dbname=osnowaKatowice2019 user=postgres password=MalBry2015");
if (!$conn) {
		echo "{rows:[{\"gid\": \"1\", \"nazwa\": \"B³¹d pod³¹czenia do bazy\"}]}";
		exit;
}

$id = $_GET['id'];
$html = "<div class='photoPopupPanel'><br/>";
$dir = 'photos_cm';
$ext = '.jpg';

  $result = pg_query($conn, 'SELECT id, miejsce_id, photo_nr, photo_opis, folder, file_name, status FROM ciekawe_miejsca_photos WHERE miejsce_id='.$id.' ORDER BY photo_nr');

  
if (pg_num_rows($result) > 0)
{
	
	while ($row = pg_fetch_row($result))
	{
	
			//$maska = "../".$dir . "/" . $row[1] . "-" . $row[2] . "_*" . $ext;
			//$html = $maska;
			//echo "<script type=\"text/javascript\">window.alert('$maska');</script>\";";
			//get all image files with a .jpg extension.
			//$files = glob("$maska");
			//sort($files);
			 
			//if (!$files) {
			//  echo 'Nic nie ma w katalogu: ' . $dir;
			//  echo $directory;
			//  exit;
			//}
			
			//foreach ($files as $file)
			//{
			
			   //$html = $html. '<p>' . $file . "\n</p>";
			   
			   $html = $html.'<a target="_blank" href="'.$dir.'/'.$row[4].'/'.$row[5].'">';
			   $html = $html.'<p><center><img src="'.$dir.'/'.$row[4].'/thumb/'.$row[5].'" width="300"></center></p></a>';
			   $html = $html.'<p>'.$row[3].'<br/></p>';
			//}

	//$html = $html. '<p>' . "photos_cm/" . + $id . "-" . $row[0]. "-" . $row[1]. "-" . $row[2]. "\n</p>";
	
	}

	$html = $html."</div>";
	echo $html;		

}

//echo '{rows:'.json_encode($arr).'}';
?> 