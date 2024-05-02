document.addEventListener('DOMContentLoaded', function() {
    // Your existing code for dashboard functionality

    // Logout function
    function logout() {
        // Implement your logout logic here
        alert("Logged out successfully!"); // Placeholder alert, replace with actual logic
    }

    // Delete Account function
    function deleteAccount() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Implement your delete account logic here
            alert("Account deleted!"); // Placeholder alert, replace with actual logic
        }
    }
});
