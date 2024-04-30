<?php
session_start();
// Include your database connection code here

$username = $_POST['username'];
$password = $_POST['password'];

// Replace 'table_name' with the name of your table that stores the credentials
$sql = "SELECT * FROM table_name WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verify the password (assuming you have hashed passwords stored in your database)
    if (password_verify($password, $user['password'])) {
        // Password is correct, redirect to homepage
        header("Location: homepage.html");
        exit();
    } else {
        // Password is not correct
        echo "The username or password is incorrect.";
        // Redirect back to the login page
        header("Refresh: 2; url=login.html");
    }
} else {
    // No user found with that username
    echo "The username or password is incorrect.";
    // Redirect back to the login page
    header("Refresh: 2; url=login.html");
}
$conn->close();
?>
