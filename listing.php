<?php 
$out = array();
$file = fopen("list.json", 'w');
foreach (glob('music/*.mp3') as $filename) {
    $p = pathinfo($filename);
    $out[] = $p['filename'] ;
}
$output = "{ \"list\":" . json_encode($out) . "}";
fwrite($file,$output);
?>