<?php

$data = $_POST['base64data'];
$name = $_POST['imageName'];

if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
    $data = substr($data, strpos($data, ',') + 1);
    $type = strtolower($type[1]); // jpg, png, gif

    if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new \Exception('invalid image type');
    }

    $data = base64_decode($data);

    if ($data === false) {
        throw new \Exception('base64_decode failed');
    }
} else {
    throw new \Exception('did not match data URI with image data');
}

file_put_contents("photo/img_{$name}", $data);

//if (!file_exists("photo/img_{$name}_01.{$type}")) {
//	file_put_contents("photo/img_{$name}_01.{$type}", $data);
//}else{
//	file_put_contents("photo/img_{$name}_02.{$type}", $data);
//}
?>