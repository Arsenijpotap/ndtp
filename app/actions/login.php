<?php
require_once ('../db/db.php');

session_start();
global $conn;

$pass = $_POST['pass'];
$name = $_POST['name'];

$_SESSION['passlog'] = $pass;
$_SESSION['namelog'] = $name;
$result = $conn->query("SELECT password FROM `users` WHERE name = '$name'");
if ($result->num_rows != 0) {
        foreach ($result as $row) {
                if (password_verify($pass, $row['password'])) {
                        $_SESSION['pass'] = '';
                        $_SESSION['login'] = '';
                        $_SESSION['name'] = '';
                        $_SESSION['passlog'] = '';
                        $_SESSION['namelog'] = '';
                        $_SESSION['logErr'] = '';
                        $_SESSION['userName'] = upcaseString(($name));
                        header("Location: " . '/public/result.php');
                        die();
                } else {
                        $_SESSION['logErr'] = "Неверый пароль";
                        header("Location: " . '/public/login.php');
                        die();

                }
        }
} else {
        $_SESSION['logErr'] =
                "Нет пользователя с таким
именем";
        header("Location: " . '/public/login.php');
        die();
}
function upcase($string)
{
        $string = mb_strtolower($string, "utf-8");
        $char = mb_strtoupper(substr($string, 0, 2), "utf-8");
        $string[0] = $char[0];
        $string[1] = $char[1];

        // $string[1] = $char[1];
        return $string;
}
function upcaseString($string)
{
        $newArray = array_map('upcase', explode(' ', $string));
        $newString = implode(' ', $newArray);
        return $newString;
}