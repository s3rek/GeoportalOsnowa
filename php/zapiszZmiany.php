<?php
ini_set('display_errors', 1); 
ini_set('log_errors', 1); 
ini_set('error_log', dirname(__FILE__) . 'error_log.txt'); 
error_reporting(E_ALL);

header('Content-type: text/txt; charset=utf-8');

$conn = pg_connect("host=127.0.0.1 port=5432 dbname=osnowaKatowice2019 user=postgres password=MalBry2015");

if (!$conn) {
		echo "B³¹d pod³¹czenia do bazy";
		exit;
}

$id = $_GET['id'];

$B = $_GET['cB'];
$L = $_GET['cL'];
$mslink = $_GET['mslink'];
$opis_krotki = $_GET['opis_krotki'];
$opis_dlugi = $_GET['opis_dlugi'];
$miejscowosc = $_GET['miejscowosc'];
$kategoria_id = $_GET['kategoria_id'];
$gmina_id = $_GET['gmina_id'];
$opis_mapa = $_GET['opis_mapa'];
$czy_muzeum = $_GET['czy_muzeum'];
$czy_tylko_topografia = $_GET['czy_tylko_topografia'];
$czy_ciekawe = $_GET['czy_ciekawe'];
$ocena=  $_GET['ocena'];



//echo  $_GET['opis_krotki'];
if ($id == -1)
{
$sql = "INSERT INTO ciekawe_miejsca
        (id, 
		geom,
		mslink, 
		miejscowosc,
		kategoria_id, 
		gmina_id, 
		opis_krotki, 
		opis_dlugi, 
		opis_mapa, 
		czy_ciekawe, 
		czy_muzeum, 
		czy_tylko_topografia,
		ocena) 
        VALUES
		("."(SELECT max(id) from ciekawe_miejsca)+1".",".
		"ST_GeomFromText('POINT(".$B." ".$L.")', 4326),".
		"(SELECT max(mslink) from ciekawe_miejsca)+1".",'".
		$miejscowosc."',".
		$kategoria_id.",".
		$gmina_id.",'".
		$opis_krotki."','".
		$opis_dlugi."','".
		$opis_mapa."',".
		$czy_ciekawe.",".
		$czy_muzeum.",".
		$czy_tylko_topografia.",".
		$ocena.
	   ")";
}
else
{
$sql = "UPDATE ciekawe_miejsca SET 
                    opis_krotki='".$opis_krotki."',
					opis_dlugi='".$opis_dlugi."',
					opis_mapa='".$opis_mapa."',
					miejscowosc='".$miejscowosc."',
					kategoria_id=".$kategoria_id.",
					gmina_id=".$gmina_id.",
					czy_ciekawe='".$czy_ciekawe."',
                    czy_muzeum='".$czy_muzeum."',
					czy_tylko_topografia='".$czy_tylko_topografia."',
					ocena=".$ocena." 
					WHERE id=".$id;
}

echo $sql;
$result = pg_query($conn, $sql);

//echo pg_num_rows($result);

if (pg_num_rows($result) > 0) {
		while ($obj = pg_fetch_object($result)) {
				echo $obj;
		}
}

//echo $czy_ciekawe, "  ", $_GET['czy_ciekawe'], "  ",  $opis_krotki;
//echo $sql;

//if ($conn->query($sql) === TRUE) {
//    echo "Record updated successfully";
//} else {
//    echo "Error updating record: " . $conn->error;
//}

//$conn->close();

?>

