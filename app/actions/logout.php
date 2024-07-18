<?php
session_start();
$_SESSION['userName'] = '';
header("Location: " . '/public/result.php');
die();