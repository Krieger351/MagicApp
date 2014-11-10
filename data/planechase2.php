<?php
  header('Content-Type: application/json');

  $output = [];

  $img_address = "http://gatherer.wizards.com/";
  $url_address = "http://gatherer.wizards.com/pages/";

  $planechase_url = 'http://gatherer.wizards.com/Pages/Search/Default.aspx?output=spoiler&method=visual&action=advanced&special=true&type=%7c%5b%22Plane%22%5d%7c%5b%22Phenomenon%22%5d+!%5b%22Planeswalker%22%5d';//'http://gatherer.wizards.com/Pages/Search/Default.aspx?output=spoiler&method=visual&type=+%40(+%5bPlane%5d)&special=true';

  $page_content = file_get_contents($planechase_url);
  $page_content = str_replace("../../",$img_address,$page_content);
  $page_content = str_replace("../",$url_address,$page_content);

  preg_match_all("#<a\sid.+\/></a>#",$page_content,$cards);

//print_r($cards);
  foreach($cards[0] as $card){
  //  echo $card;
    preg_match('/<img[^>]+>/i',$card, $img);
    preg_match('/src=("[^"]*")/i',$img[0], $src_l);
    preg_match('/id=("[^"]*")/i',$img[0], $id_l);
    preg_match('/"[^"]*"/',$src_l[0],$src);
    $output[] = substr($src[0],strpos($src[0],"multiverseid=")+13,6);//str_replace('amp;','',str_replace('"','',$src[0]));
  }

  echo json_encode($output);
