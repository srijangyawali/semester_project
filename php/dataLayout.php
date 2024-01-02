<?php

const DB_HOST = "localhost";
const DB_USER = "srijan";
const DB_PASS = "123456";
const DB_NAME = "semester_project";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
  die("Connection Failed" . $conn->connect_error);
}

$sql = "SELECT * FROM student_form";
$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Data Layout</title>
  <link rel="stylesheet" href="../css/tableLayout.css">
</head>

<body>
  <div class="outerLayoutContainer">
    <div class="heading">Student's Detail Table</div>
    <table id="layoutTable">
      <tr id="headingRow">
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Course</th>
        <th>Univerity</th>
        <th>College</th>
        <th>Roll No</th>
        <th>Registration No</th>
        <th>State</th>
        <th>District</th>
        <th>City</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
      <?php $count = 0 ?>
      <?php foreach ($data as $person) : ?>
        <tr class="<?php echo ($count++ % 2 == 0) ? "evenRow" : "oddRow"
                    ?>">
          <td><?php echo $person["ID"] ?></td>
          <td><?php echo $person["First_Name"] ?></td>
          <td><?php echo $person["Last_Name"] ?></td>
          <td><?php echo $person["Course"] ?></td>
          <td><?php echo $person["University"] ?></td>
          <td><?php echo $person["College"] ?></td>
          <td><?php echo $person["Roll_No"] ?></td>
          <td><?php echo $person["Reg_No"] ?></td>
          <td><?php echo $person["State"] ?></td>
          <td><?php echo $person["District"] ?></td>
          <td><?php echo $person["City"] ?></td>
          <td><?php echo $person["Phone"] ?></td>
          <td><?php echo $person["Email"] ?></td>
        </tr>
      <?php endforeach; ?>
    </table>
  </div>

</body>

</html>