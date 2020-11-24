<?php
$_dbHost = "localhost";
$_dbName = "u135101938_indianYoga_DB";
$_dbUser = "u135101938_admin";
$_dbPassword = "FlyAwayBaby@2kRoot";


//echo $filed;
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');



$response = array();

//echo "iam awesome";
$_conn = mysqli_connect($_dbHost,$_dbUser,$_dbPassword,$_dbName);

//Check Connection
if(!$_conn){
  echo 'connection error : '. mysqli_connect_error();  
}
else{
    
   
     //echo $response;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
     $sql = "INSERT INTO `REGISTER`( `NAME`, `CLASS`, `DOB`, `SEX`, `GUARDIAN`, `OCCUPATION`, `PHONENO`, `WHATSAPPNO`, `EMAIL`, `ADDRESS`, `COURSE`, `DANCEDET`, `CREATED_DATE`, `FLAG`) VALUES 
  ('{$data['Name']}','{$data['Class']}','{$data['Dob']}','{$data['Sex']}','{$data['Guardian']}','{$data['Occupation']}','{$data['Phone']}','{$data['WPhone']}','{$data['Email']}','{$data['Address']}','{$data['Course']}','{$data['DanceDetails']}','{$date}',0)";
  
  //echo $sql;
  
    if(mysqli_query($_conn,$sql)){
        $response =  "success";
        echo $response;
    }
    
}


$conn = null;
?>