<?php
const DB_HOST = "localhost";
const DB_USER = "srijan";
const DB_PASS = "123456";
const DB_NAME = "semester_project";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die("Connection failed " . $connect->error);
}

function handleStringValidation($value, $type, &$errors)
{
    if (!$value) {
        $errors[$type] = 'Invalid ' . $type . ' provided';
    } else {
        return filter_var($value, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["firstName"])) {
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $course = $_POST["course"];
        $university = $_POST["university"];
        $college = $_POST["college"];
        $rollNo = $_POST["rollNo"];
        $regNo = $_POST["regNo"];
        $state = $_POST["state"];
        $district = $_POST["district"];
        $city = $_POST["city"];
        $street = $_POST["street"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
    }

    $errors = [];
    // sanitazation and validation
    $firstName = handleStringValidation($firstName, "firstName", $errors);
    $lastName = handleStringValidation($lastName, "lastName", $errors);
    $course = handleStringValidation($course, "course", $errors);
    $university = handleStringValidation($university, "university", $errors);
    $college = handleStringValidation($college, "college", $errors);
    $state = handleStringValidation($state, "state", $errors);
    $regNo = handleStringValidation($regNo, "regNo", $errors);
    $district = handleStringValidation($district, "district", $errors);
    $city = handleStringValidation($city, "city", $errors);
    $street = handleStringValidation($street, "street", $errors);
    $phone = handleStringValidation($phone, "phone", $errors);

    if (!$rollNo) {
        $errors['rollNo'] = "Invalid rollNo provided";
    } else {
        $rollNo = filter_var($rollNo, FILTER_VALIDATE_INT);
    }

    if (!$email) {
        $errors["email"] = "Invalid email provided";
    } else {
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    if (count($errors) == 0) {
        $sql = "INSERT INTO student_form (First_Name, Last_Name, Course, University, College, Roll_No,Reg_No, State, District, City, Street, Phone, Email) VALUES ('$firstName', '$lastName', '$course', '$university', '$college', '$rollNo', '$regNo', '$state', '$district', '$city', '$street', '$phone', '$email')";

        if (mysqli_query($conn, $sql)) {
            $response = [
                "success" => true,
                "message" => "Successfully inserted data",
            ];
        } else {
            $response = [
                "success" => false,
                "message" => "Error inserting data",
            ];
        }
    } else {
        $response = [
            "success" => false,
            "message" => "Data not valid",
        ];
    }

    header('Content-Type: application/json');

    echo json_encode($response);
}
