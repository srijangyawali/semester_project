document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm()) {
    submitForm();
  }
});

function submitForm() {
  let myForm = document.getElementById("studentForm");
  let myFormData = new FormData(myForm);
  fetch("../php/dataSubmission.php", {
    method: "POST",
    body: myFormData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        handleSlide("successSubmit");
      } else {
        handleSlide("submitFailure");
      }
    })
    .catch((error) => {
      document.getElementById("connectionFailure").innerHTML = error;
      handleSlide("connectionFailure");
    });
}

function isString(value) {
  return value.match(/^[a-zA-Z]+( )*[a-zA-Z]+$/);
}

function isPhoneNumber(value) {
  return value.length == 10 && value.match(/^9[0-9]+$/);
}

function isNumber(value) {
  return value.match(/^[0-9]+$/);
}

function isRegNo(value) {
  return value.match(/^([0-9]+-)+[0-9]+$/);
}

function isAlphaNumeric(value) {
  return value.match(/^[0-9a-zA-Z]+[0-9a-zA-Z ]*[0-9a-zA-Z]+$/);
}

function isEmail(value) {
  let atpos = value.indexOf("@");
  let dotpos = value.indexOf(".");

  return !(atpos < 1) && !(dotpos - atpos < 2);
}

function validateStringAndAddError(errors, variable, dataName) {
  if (!variable || !isString(variable)) {
    errors[dataName] = true;
  }
}

function handleSlide(val) {
  let ele = document.getElementById(val);
  ele.style.transform = "translateX(0)";
  setTimeout(function () {
    ele.style.transform = "translateX(1000px)";
  }, 3000);
}

function validateForm() {
  // gathering the data
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let course = document.getElementById("course");
  let university = document.getElementById("university");
  let college = document.getElementById("college");
  let rollNo = document.getElementById("rollNo");
  let regNo = document.getElementById("regNo");
  let state = document.getElementById("state");
  let district = document.getElementById("district");
  let city = document.getElementById("city");
  let street = document.getElementById("street");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let isChecked = document.getElementById("agree");

  let errors = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    street: false,
    state: false,
    district: false,
    city: false,
    course: false,
    agree: false,
    university: false,
    college: false,
    rollNo: false,
    regNo: false,
  };

  validateStringAndAddError(errors, firstName.value, "firstName");
  validateStringAndAddError(errors, lastName.value, "lastName");
  validateStringAndAddError(errors, course.value, "course");
  validateStringAndAddError(errors, university.value, "university");
  validateStringAndAddError(errors, state.value, "state");
  validateStringAndAddError(errors, district.value, "district");
  validateStringAndAddError(errors, city.value, "city");

  if (!rollNo.value || !isNumber(rollNo.value)) {
    errors["rollNo"] = true;
  }

  if (!regNo.value || !isRegNo(regNo.value)) {
    errors["regNo"] = true;
  }

  if (street.value && !isAlphaNumeric(street.value)) {
    errors["street"] = true;
  }

  if (!college.value && !isAlphaNumeric(college.value)) {
    errors["college"] = true;
  }

  if (!phone.value || !isPhoneNumber(phone.value)) {
    errors["phone"] = true;
  }

  if (!email.value || !isEmail(email.value)) {
    errors["email"] = true;
  }

  if (!isChecked.checked) {
    errors["agree"] = true;
  }

  let valid = true;
  for (key in errors) {
    if (errors[key]) {
      valid = false;
      if (key == "agree") {
        handleSlide("notAgreed");
      } else {
        document.getElementById(key).classList.add("errorClass");
        handleSlide("submitFailure");
      }
    } else {
      document.getElementById(key).classList.remove("errorClass");
    }
  }
  // if (valid) {
  //   let success = document.getElementById("successSubmit");
  //   success.style.transform = "translateX(0)";
  //   setTimeout(function () {
  //     success.style.transform = "translateX(1000px)";
  //   }, 3000);
  // }
  return valid;
}
