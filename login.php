<?php
session_start();

// Assuming you have a database connection set up as $conn
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) == 1) {
    $_SESSION['username'] = $username;
    header('Location: homepage.html');
} else {
    echo "<script>alert('Username or Password is incorrect.'); window.location.href='index.html';</script>";
}
?>
