<?php
// Include your database connection code here

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Replace 'table_name' with the name of your table that stores the credentials
$sql = "SELECT * FROM table_name WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Username already exists!";
    // Redirect back to the signup page
    header("Refresh: 2; url=signup.html");
} else {
    // Insert new user
    $sql = "INSERT INTO table_name (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    
    if ($stmt->execute()) {
        echo "Signup successful!";
        // Redirect to the login page
        header("Location: login.html");
    } else {
        echo "Error: " . $stmt->error;
        // Redirect back to the signup page
        header("Refresh: 2; url=signup.html");
    }
}

$stmt->close();
$conn->close();
?>
