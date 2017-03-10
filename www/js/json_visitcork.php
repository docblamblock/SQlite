

<?php


header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

error_reporting(0);
date_default_timezone_set('Europe/Dublin'); 
 

//$locale = $_GET['locale'];
$locale = $_SESSION['lang'];


setlocale(LC_ALL, $locale);
    
// ALTER
//include("dbinfo.inc.php");
include("db_kiosk.inc.php");

$mysqli = new mysqli($hostname, $username, $password, $dbName);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
//print "<p>connected";


/// get kiosk gps coords

$kiosk_name_search = "imperial";

$one = 1;


$limit = $_GET['limit'];

$query = "SELECT infoID, venue, address, gps, location, category, sub_cat, short_info, info, short_info_ga_IE, info_ga_IE, features, web, open, youtube, contact, img, added, active, position, distance_from_city_centre  FROM tourist_info where active=? order by category, infoID limit $limit"; 

//echo $query_gps;

if ($stmt = $mysqli->prepare($query)) {
    
    // bind the parameters
    $stmt->bind_param("i", $one);
    
  
    
        
    /* execute statement */
    $stmt->execute();

    /* bind result variables */
    $stmt->bind_result($infoID, $venue, $address, $gps, $location, $category, $sub_category, $short_info,
                       $info, $short_info_ga_IE, $info_ga_IE, $features, $web, $open, $youtube, $contact, 
                       $img, $added, $active, $position, $distance_from_city_centre);
    
    
  

    /* fetch values */
    while ($stmt->fetch()) {
       
 
  //echo "<br>*Id: $venue, Username: $address<br>";

        //$kiosk_array['name'] = $kiosk_name;
        //$kiosk_array['gps'] = $kiosk_gps;
        
        $content_array[$i]['infoID']              = $infoID;
        $content_array[$i]['venue']               = $venue;
        $content_array[$i]['address']             = $address;
        $content_array[$i]['gps']                 = $gps;
        $content_array[$i]['location']            = $location;
        
        $content_array[$i]['category']            = $category;
        $content_array[$i]['sub_category']        = $sub_category;
        $content_array[$i]['short_info']          = $short_info;
        $content_array[$i]['info']                = $info;
        //$content_array[$i]['short_info_ga_IE']    = $short_info_ga_IE;
         
        //$content_array[$i]['info_ga_IE']          = $info_ga_IE;
        $content_array[$i]['features']            = $features;
        $content_array[$i]['web']                 = $web;
        $content_array[$i]['open']                = $open;
        $content_array[$i]['youtube']             = $youtube;
    
        $content_array[$i]['contact']             = $info_ga_IE;
        $content_array[$i]['img']                 = $img;
        $content_array[$i]['added']               = $added;
        $content_array[$i]['active']              = $active;
        $content_array[$i]['position']            = $position;
    
        //$infoID, $venue, $address, $gps, $location, $category, $sub_category, $short_info, $info, $short_info_ga_IE, $info_ga_IE, $features, $web, $open, $youtube, $contact, $img, $added, $active, $position, $distance_from_city_centre
    
        
       
        $path = "http://www.peoplesrepublicofcork.com/eventguide/uploads/$img";
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
     
        $content_array[$i]['base64']                 = $base64;
    
        //print "<br>$venue, $img ".$content_array[$i]['base64']."<img src=\"http://www.peoplesrepublicofcork.com/eventguide/uploads/$img\">";
        
    
        //print "$infoID, $venue, $address, $gps, $location, $category, $sub_category, $short_info, $info, $short_info_ga_IE, $info_ga_IE, $features, $web, $open, $youtube, $contact, $img, $added, $active, $position, $distance_from_city_centre<br>";
        $i++;
    }

    /* close statement */
    $stmt->close();
}
else
  print "prepare fail";

  //print_r($content_array);
  
  
$myJSON = json_encode($content_array);

echo $myJSON;  