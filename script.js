// JavaScript for handling form submission on the contact page
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Example: Log the form data to the console
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);

    // You can add code here to send the form data to a server or display a confirmation message
});
