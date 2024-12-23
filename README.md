Memory Matching Game:
Designed and developed a responsive web application featuring user authentication, an interactive memory card gameplay with a dynamic scoreboard and timer, and a gift card reward system. Built with HTML, CSS, and JavaScript, ensuring modular architecture and cross-browser compatibility. 
 
 Build the HTML Pages

Signup Page (signup.html):

Use a form with fields for name, email, password, and a "Sign Up" button.

Include validations for email format and password strength.

Login Page (login.html):

Create a form with fields for email and password.

Add a "Login" button with a link to sign up if the user doesn't have an account.

Game Page (index.html):

Create a grid layout for the memory cards using div elements.

Include a scoreboard section to display the user's score and a timer.

Gift Card Page (giftcard.html):

Display available gift cards and the criteria to unlock them.

Add a "Claim" button for each gift card.

 Style the Application (style.css)

Signup/Login Pages:

Use a clean layout with centered forms.

Add hover effects to buttons.

Game Page:

Use a grid display for the memory cards.

Include animations for card flips and matched pairs.

Gift Card Page:

Add a responsive layout to display gift cards as tiles.

 Add Functionality (script.js)

Signup/Login Logic:

Validate user input.

Store user credentials in localStorage or use a database (optional).

Redirect users to the game page after successful login.

Game Logic:

Shuffle and display cards.

Track user clicks and check for matches.

Update the scoreboard dynamically.

Gift Card Logic:

Check if the user's score meets the criteria.

Allow claiming gift cards by updating the user profile in localStorage.

 Test the Application

Browser Testing: Test the game on different browsers and screen sizes.

Error Handling: Ensure robust error handling for invalid inputs.
