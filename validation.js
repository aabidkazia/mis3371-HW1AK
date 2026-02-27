/*
  Program name: validation.js
  Author: Student Name
  Date created: February 27, 2026
  Date last edited: February 27, 2026
  Version: 1.0
  Description: Client-side form validation for patient-form.html.
               Validates all required fields before allowing form submission.
               Called via onsubmit event of the patientForm form.
*/

/* ── MAIN VALIDATION CONTROLLER ────────────────────────────────── */
function formValidation() {
  var frm = document.patientForm;

  // Run each validation in sequence; stop at first failure
  if (!validateUserID(frm.userid))          return false;
  if (!validatePassword(frm.passid,
                        frm.passid2))       return false;
  if (!validateName(frm.fname, "First Name")) return false;
  if (!validateName(frm.lname, "Last Name"))  return false;
  if (!validateDOB(frm.dob))                return false;
  if (!validateSSN(frm.ssn))                return false;
  if (!validateAddress(frm.addr1))          return false;
  if (!validateCity(frm.city))              return false;
  if (!validateState(frm.state))            return false;
  if (!validateZip(frm.zip))               return false;
  if (!validateEmail(frm.email))            return false;
  if (!validateRadioGroup("gender",        "Please select a gender."))       return false;
  if (!validateRadioGroup("vaccinated",    "Please indicate vaccination status.")) return false;
  if (!validateRadioGroup("insurance",     "Please indicate whether you have insurance.")) return false;
  return true;   // all passed — allow form to submit to thankyou.html
}

/* ── INDIVIDUAL FIELD VALIDATORS ────────────────────────────────── */

/* User ID: 5–20 alphanumeric characters */
function validateUserID(field) {
  var val = field.value.trim();
  if (val.length < 5 || val.length > 20) {
    alert("User ID must be between 5 and 20 characters.");
    field.focus();
    return false;
  }
  if (!/^[A-Za-z0-9_]+$/.test(val)) {
    alert("User ID may only contain letters, numbers, and underscores.");
    field.focus();
    return false;
  }
  return true;
}

/* Password: min 7 chars, must match re-enter */
function validatePassword(passField, pass2Field) {
  var p1 = passField.value;
  var p2 = pass2Field.value;
  if (p1.length < 7) {
    alert("Password must be at least 7 characters long.");
    passField.focus();
    return false;
  }
  if (p1 !== p2) {
    alert("Passwords do not match. Please re-enter.");
    pass2Field.focus();
    return false;
  }
  return true;
}

/* Name fields: letters, spaces, hyphens only */
function validateName(field, label) {
  var val = field.value.trim();
  if (val.length === 0) {
    alert(label + " is required.");
    field.focus();
    return false;
  }
  if (!/^[A-Za-z\s\-']+$/.test(val)) {
    alert(label + " must contain only letters, spaces, hyphens, or apostrophes.");
    field.focus();
    return false;
  }
  return true;
}

/* Date of Birth: MM/DD/YYYY */
function validateDOB(field) {
  var val = field.value.trim();
  if (val.length === 0) {
    alert("Date of Birth is required.");
    field.focus();
    return false;
  }
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
    alert("Date of Birth must be in MM/DD/YYYY format.");
    field.focus();
    return false;
  }
  return true;
}

/* SSN: not empty (content is masked) */
function validateSSN(field) {
  var val = field.value.trim();
  if (val.length < 9) {
    alert("Social Security Number is required (9–11 characters).");
    field.focus();
    return false;
  }
  return true;
}

/* Address: alphanumeric + spaces + common punctuation */
function validateAddress(field) {
  var val = field.value.trim();
  if (val.length === 0) {
    alert("Address Line 1 is required.");
    field.focus();
    return false;
  }
  return true;
}

/* City: letters and spaces only */
function validateCity(field) {
  var val = field.value.trim();
  if (val.length === 0) {
    alert("City is required.");
    field.focus();
    return false;
  }
  if (!/^[A-Za-z\s\-\.]+$/.test(val)) {
    alert("City must contain only letters and spaces.");
    field.focus();
    return false;
  }
  return true;
}

/* State: must not be blank */
function validateState(field) {
  if (field.value === "" || field.value === null) {
    alert("Please select a state.");
    field.focus();
    return false;
  }
  return true;
}

/* ZIP: 5-digit or ZIP+4 (NNNNN or NNNNN-NNNN) */
function validateZip(field) {
  var val = field.value.trim();
  if (!/^\d{5}(-\d{4})?$/.test(val)) {
    alert("ZIP Code must be 5 digits (e.g. 77496) or ZIP+4 (e.g. 77496-1234).");
    field.focus();
    return false;
  }
  return true;
}

/* Email: standard format name@domain.tld */
function validateEmail(field) {
  var val = field.value.trim();
  var re  = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,})+$/;
  if (!re.test(val)) {
    alert("Please enter a valid email address (name@domain.tld).");
    field.focus();
    return false;
  }
  return true;
}

/* Radio group: at least one option selected */
function validateRadioGroup(name, message) {
  var radios = document.getElementsByName(name);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return true;
  }
  alert(message);
  if (radios.length > 0) radios[0].focus();
  return false;
}

/* ── END OF VALIDATION.JS ────────────────────────────────────────── */
