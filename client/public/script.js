
// Handling login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email && password) {
      alert(`Welcome back, ${email}!`);
      // Add logic to handle authentication with the backend here
    } else {
      alert("Please fill in all the fields!");
    }
  });
  