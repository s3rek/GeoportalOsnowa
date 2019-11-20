<?php
//header('Content-type: text/html; charset=windows-1250');
header('Content-type: text/html; charset=utf-8');
$conn = pg_connect("host=127.0.0.1 port=5432 dbname=osnowaKatowice2019 user=postgres password=MalBry2015");
if (!$conn) {
		echo "{rows:[{\"gid\": \"1\", \"nazwa\": \"B³¹d pod³¹czenia do bazy\"}]}";
		exit;
}
switch ($_GET['rodzaj']){
	case "kategoria":
		$result = pg_query($conn, "SELECT id, nazwakategorii, nazwasymbolu  FROM slo_kat_obiektu");
	break;
	case "gmina":
		$result = pg_query($conn, "SELECT id, nazwa_gminy, powiat, wojewodztwo  FROM slo_gminy ORDER BY nazwa_gminy");
	break;
	case "stabilizacja":
		$result = pg_query($conn, "SELECT uid, kod, opis FROM slo_stabilizacja ORDER BY opis");
	break;
	default:
		echo "{}";
		exit;
	break;
}
if (pg_num_rows($result) > 0) {
		while ($obj = pg_fetch_object($result)) {
				$arr[] = $obj;
		}
}

//echo '{rows:'.json_encode($arr, JSON_UNESCAPED_UNICODE).'}';
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

?> 