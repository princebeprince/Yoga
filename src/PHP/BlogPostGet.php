<?php
$_dbHost = "localhost";
$_dbName = "u135101938_indianYoga_DB";
$_dbUser = "u135101938_admin";
$_dbPassword = "FlyAwayBaby@2kRoot";

$filed = $_REQUEST['filedir'];
$dir = "./assets/img/".$filed."/";

//echo $filed;
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$response = array();
// Open a directory, and read its contents


$_conn = mysqli_connect($_dbHost,$_dbUser,$_dbPassword,$_dbName);

//Check Connection
if(!$_conn){
  echo 'connection error : '. mysqli_connect_error();  
}
else{
  //create sql query
  $sql = 'SELECT * FROM `Blog_Post` order by date desc';
  //Getting Data
  $result = mysqli_query($_conn,$sql);
  
  //fetch each data
  $response = mysqli_fetch_all($result,MYSQLI_ASSOC);
  
  echo $BlogPost;
  
}
echo json_encode($response,JSON_PRETTY_PRINT);

//$myJSON = json_encode($data);
	
//Access-Control-Allow-Origin header with wildcard.

//$response['status_code_header'] = 'HTTP/1.1 200 OK';
//$response['body'] = json_encode($myJSON);
//return $response; 
//echo "success";
?>