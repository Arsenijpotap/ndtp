<?php
session_start();
$language = $_POST['language'];
$accuracy = $_POST['accuracy'];
$time = $_POST['time'];
$speed = $_POST['speed'];
$answer = $_POST['answer'];
$correctAnswer = $_POST['correctAnswer'];
$mistake = $_POST['mistake'];
$name = $_SESSION['userName'];
require_once ('../db/db.php');
$comparsion = $accuracy * $speed * 100;
switch ($language) {
    case "java":
        $language = "Java";
        break;
    case "cpp":
        $language = "C++";
        break;
    case "ch":
        $language = "C#";
        break;
    case "c":
        $language = "C";
        break;
    case "python":
        $language = "Python";
        break;
    case "css":
        $language = "CSS";
        break;
    case "js":
        $language = "JavaScript";
        break;
    case "html":
        $language = "HTML";
        break;
    case "sql":
        $language = "SQL";
        break;
    case "php":
        $language = "PHP";
        break;
}
;
global $conn;
if ($name) {
    $conn->query("INSERT INTO `results` (name,language,accuracy,time,speed,answer,correctAnswer,mistake,comparsion) VALUES ('$name','$language','$accuracy','$time','$speed','$answer','$correctAnswer','$mistake','$comparsion')");
}
die();