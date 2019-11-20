<?php 

$numerpkt = $_POST['numerpkt'];
$uwaga0 = $_POST['uwaga0'];
$uwaga1 = $_POST['uwaga1'];
$numerold = $_POST['numerold'];
$enter = $_POST['enter'];
$enterpocz = $_POST['enterpocz'];


$date = new DateTime();
$datelog = $date->format('d.m.Y h:i:s');


$file = fopen("log.txt","a");
echo fwrite($file,$enterpocz);
echo fwrite($file,$datelog." - ");
echo fwrite($file,$numerpkt.", ");
echo fwrite($file,$numerold.", ");
echo fwrite($file,$uwaga0.", ");
echo fwrite($file,$uwaga1);
echo fwrite($file,$enter);
fclose($file); 