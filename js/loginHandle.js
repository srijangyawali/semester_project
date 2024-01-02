document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateData()) {
    submitForm();
  }
});

function handleFailure(key) {
  let errorMsg = document.getElementById("failedLogin");
  document.getElementById(key).classList.add("errorClass");
  errorMsg.style.transform = "translateX(0)";
  setTimeout(function () {
    errorMsg.style.transform = "translateX(1000px)";
  }, 3000);
}

function submitForm() {
  let loginForm = document.getElementById("loginForm");

  let loginFormData = new FormData(loginForm);
  loginFormData.append(
    "doRemember",
    document.getElementById("remember").checked
  );
  fetch("../php/login.php", {
    method: "POST",
    body: loginFormData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // authentication successful, redirect the file to the page with all the data
        window.location.href = data.redirectURL;
      } else {
        if (data.error == "Incorrect Username") {
          handleFailure("username");
        } else {
          handleFailure("password");
        }
      }
    })
    .catch((error) => {
      document.getElementById("connectionFailure").innerHTML = error;
      handleSlide("connectionFailure");
    });
}

function isUsername(username) {
  return username.match(/^[a-zA-Z]+/);
}

function isPassword(password) {
  // atleast one uppercase one lowercase one digit and 8 characters long
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
}

function handleSlide(val) {
  let ele = document.getElementById(val);
  ele.style.transform = "translateX(0)";
  setTimeout(function () {
    ele.style.transform = "translateX(1000px)";
  }, 3000);
}

function validateData() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let errors = {
    username: false,
    password: false,
  };

  if (!username.value || !isUsername(username.value)) {
    errors.username = true;
  }

  if (!password.value || !isPassword(password.value)) {
    errors.password = true;
  }

  let valid = true;
  for (key in errors) {
    if (errors[key]) {
      valid = false;
      let errorMsg = document.getElementById("failedLogin");
      document.getElementById(key).classList.add("errorClass");
      errorMsg.style.transform = "translateX(0)";
      setTimeout(function () {
        errorMsg.style.transform = "translateX(1000px)";
      }, 3000);
    } else {
      document.getElementById(key).classList.remove("errorClass");
    }
  }
  return valid;
}
