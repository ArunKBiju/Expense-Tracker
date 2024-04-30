<?php
// Assuming you have a database connection set up as $conn
$username = $_POST['username'];
$password = $_POST['password'];

$query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
$result = mysqli_query($conn, $query);

if($result) {
    echo "<script>alert('Signup successful.'); window.location.href='login.html';</script>";
} else {
    echo "<script>alert('Error during signup.'); window.location.href='signup.html';</script>";
}
?>
