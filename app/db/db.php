<?php

$servername = 'localhost';
$user = 'root';
$pass = '';
$dbname ='test';
$conn = mysqli_connect($servername,$user,$pass,$dbname);
if (!$conn){
    die();
}