<?php
require_once ('../db/db.php');

session_start();
global $conn;
$login = $_POST['email'];
$pass = $_POST['pass'];
$name = $_POST['name'];

$_SESSION['pass'] = $pass;
$_SESSION['login'] = $login;
$_SESSION['name'] = $name;
$result = $conn->query("SELECT name FROM `users` WHERE name = '$name'");
$name = upcaseString($name);
if ($result->num_rows) {
    if (strlen($name) > 14) {
        $_SESSION['regErr'] = "Пользователь с именем\n" . $name . "\nуже существует";
    } else {
        $_SESSION['regErr'] = 'Пользователь с именем ' . $name . "\nуже существует";
    }
    header("Location: " . '/public/login.php');
    die();
} else {

    $_SESSION['regErr'] = "";

    if (!empty($name) and !empty($pass) and !empty($login)) {
        $pass = password_hash($pass, PASSWORD_DEFAULT);
        $conn->query("INSERT INTO `users` (login,password,name) VALUES ('$login','$pass','$name')");
        $_SESSION['pass'] = '';
        $_SESSION['login'] = '';
        $_SESSION['name'] = '';
        $_SESSION['passlog'] = '';
        $_SESSION['namelog'] = '';
        $_SESSION['userName'] = upcaseString(($name));

        header("Location: " . '/public/result.php');
        die();

    } else {
        $_SESSION['regErr'] = "Неверно заполнены поля";
        header("Location: " . '/public/login.php');
        die();

    }
}
;
function upcase($string)
{
    $string = mb_strtolower($string, "utf-8");
    print_r(mb_detect_encoding($string));
    $char = mb_strtoupper(substr($string, 0, 2), "utf-8");
    $string[0] = $char[0];
    $string[1] = $char[1];
    return $string;

}
function upcaseString($string)
{
    if (mb_detect_encoding($string) == 'ASCII') {
        return ucwords(strtolower($string));
    } else {
        $newArray = array_map('upcase', explode(' ', $string));
        $newString = implode(' ', $newArray);
        return $newString;
    }

}