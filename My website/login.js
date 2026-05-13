// Simple dummy users for practice (not real accounts)
// In real apps, passwords are hashed on the server
var users = [
  { email: "gamer@playboy.com", password: "game123", name: "Rohan" },
  { email: "player@playboy.com", password: "play456", name: "Aisha" },
  { email: "tester@playboy.com", password: "test789", name: "Kabir" }
];

// Small helper object with methods
var authTools = {
  findUserByEmail: function (email, list) {
    return list.find(function (user) {
      return user.email === email;
    });
  },
  isPasswordMatch: function (user, password) {
    return user && user.password === password;
  }
};

// Simple object reference through another variable
var tools = authTools;

function getValue(input) {
  return input.value.trim();
}

function clearLoginForm(form) {
  var inputs = form.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

var loginForm = document.querySelector(".login-form");

if (loginForm) {
  var emailInput = loginForm.querySelector('input[type="email"]');
  var passwordInput = loginForm.querySelector('input[type="password"]');
  var noteText = loginForm.querySelector(".note");
  var defaultNote = noteText ? noteText.textContent : "";

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var emailValue = getValue(emailInput);
    var passwordValue = getValue(passwordInput);

    // Basic validation
    if (emailValue === "" || passwordValue === "") {
      alert("Please enter both email and password.");
      if (noteText) {
        noteText.textContent = defaultNote;
      }
      return;
    }
    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
      alert("Please enter a valid email address.");
      if (noteText) {
        noteText.textContent = defaultNote;
      }
      return;
    }

    var foundUser = tools.findUserByEmail(emailValue, users);
    var invalidMessage = "Invalid email or password.";

    if (!foundUser) {
      alert(invalidMessage);
      if (noteText) {
        noteText.textContent = defaultNote;
      }
      return;
    }

    if (!tools.isPasswordMatch(foundUser, passwordValue)) {
      alert(invalidMessage);
      if (noteText) {
        noteText.textContent = defaultNote;
      }
      return;
    }

    // Success
    if (noteText) {
      noteText.textContent = "Login successful! Welcome, " + foundUser.name + ".";
    }
    clearLoginForm(loginForm);
  });
}
