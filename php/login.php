<?php

session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $result = isset($_SESSION[$username]) || $username == "admin" && $password == "User@2024";

    if ($result) {
        $remember = $_POST["doRemember"];
        if ($remember && !isset($_SESSION[$username])) {
            $_SESSION["username"] = $username;
            $_SESSION["password"] = $password;
        }
        $response = [
            'success' => true,
            'redirectURL' => "../php/dataLayout.php",
        ];
    } else {
        if ($username != 'admin') {
            $response = [
                "success" => false,
                'error' => "Incorrect Username",
            ];
        } else {
            $response = [
                "success" => false,
                'error' => "Incorrect Password",
            ];
        }
    }

    header('Content-Type: application/json');

    echo json_encode($response);
}
