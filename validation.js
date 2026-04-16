/*
  validation.js
  name: Aabid Kazia

  handles form validation for patient-form.html

  idea:
  - check each field one by one
  - stop as soon as something is wrong
  - show alert + focus on the problem field
*/


/* MAIN FUNCTION  */
function formValidation() {

  var form = document.patientForm; // shortcut

  // go in order (easier to debug this way)
  if (!checkUser(form.userid)) return false;

  if (!checkPassword(form.passid, form.passid2)) return false;

  if (!checkName(form.fname, "First Name")) return false;
  if (!checkName(form.lname, "Last Name")) return false;

  if (!checkDOB(form.dob)) return false;
  if (!checkSSN(form.ssn)) return false;

  if (!checkAddress(form.addr1)) return false;
  if (!checkCity(form.city)) return false;

  if (!checkState(form.state)) return false;
  if (!checkZip(form.zip)) return false;

  if (!checkEmail(form.email)) return false;

  // radio buttons
  if (!checkRadio("gender", "Please select gender")) return false;
  if (!checkRadio("vaccinated", "Select vaccination status")) return false;
  if (!checkRadio("insurance", "Select insurance option")) return false;

  // if everything passes
  return true;
}


/*  USER ID  */
function checkUser(field) {

  var val = field.value.trim();

  // length check first
  if (val.length < 5 || val.length > 20) {
    alert("User ID must be 5–20 characters.");
    field.focus();
    return false;
  }

  // only letters + numbers + underscore
  var pattern = /^[A-Za-z0-9_]+$/;

  if (!pattern.test(val)) {
    alert("User ID can only use letters, numbers, or _");
    field.focus();
    return false;
  }

  return true;
}


/*  PASSWORD  */
function checkPassword(p1Field, p2Field) {

  var p1 = p1Field.value;
  var p2 = p2Field.value;

  if (p1.length < 7) {
    alert("Password must be at least 7 characters.");
    p1Field.focus();
    return false;
  }

  // comparing both
  if (p1 !== p2) {
    alert("Passwords do not match.");
    p2Field.focus();
    return false;
  }

  return true;
}


/*  NAME  */
function checkName(field, label) {

  var val = field.value.trim();

  if (val === "") {
    alert(label + " is required.");
    field.focus();
    return false;
  }

  // allows letters, spaces, hyphens, apostrophes
  if (!/^[A-Za-z\s\-']+$/.test(val)) {
    alert(label + " has invalid characters.");
    field.focus();
    return false;
  }

  return true;
}


/* DOB  */
function checkDOB(field) {

  var val = field.value.trim();

  if (val === "") {
    alert("DOB is required.");
    field.focus();
    return false;
  }

  // basic format check only (not checking real date)
  var re = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!re.test(val)) {
    alert("Use MM/DD/YYYY format.");
    field.focus();
    return false;
  }

  return true;
}


/* SSN  */
function checkSSN(field) {

  var val = field.value.trim();

  // not super strict here
  if (val.length < 9) {
    alert("SSN seems too short.");
    field.focus();
    return false;
  }

  return true;
}


/*  ADDRESS  */
function checkAddress(field) {

  var val = field.value.trim();

  if (val.length === 0) {
    alert("Address is required.");
    field.focus();
    return false;
  }

  // could add regex here but skipping for now
  return true;
}


/*  CITY  */
function checkCity(field) {

  var val = field.value.trim();

  if (val === "") {
    alert("City is required.");
    field.focus();
    return false;
  }

  // simple check
  var re = /^[A-Za-z\s\-\.]+$/;

  if (!re.test(val)) {
    alert("City looks invalid.");
    field.focus();
    return false;
  }

  return true;
}


/*  STATE  */
function checkState(field) {

  // dropdown check
  if (field.value === "" || field.value == null) {
    alert("Please select a state.");
    field.focus();
    return false;
  }

  return true;
}


/*  ZIP  */
function checkZip(field) {

  var val = field.value.trim();

  var zipPattern = /^\d{5}(-\d{4})?$/;

  if (!zipPattern.test(val)) {
    alert("Invalid ZIP code.");
    field.focus();
    return false;
  }

  return true;
}


/*  EMAIL  */
function checkEmail(field) {

  var val = field.value.trim();

  // copied from somewhere (works though)
  var re = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,})+$/;

  if (!re.test(val)) {
    alert("Enter a valid email.");
    field.focus();
    return false;
  }

  return true;
}


/*  RADIO  */
function checkRadio(name, msg) {

  var radios = document.getElementsByName(name);

  // loop through options
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }

  alert(msg);

  // focus first one (not perfect but works)
  if (radios.length > 0) {
    radios[0].focus();
  }

  return false;
}


/* end of file */
