const inputWrapper = document.getElementById("input-wrapper");
const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const privacyCheckbox = document.getElementById("privacy-checkbox");

//modal
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");

const showModal = (state = true) => {
  modal.classList.toggle("active", state);
  document.body.classList.toggle("active", state);
};

modalClose.onclick = () => {
  showModal(false);
};
modal.onclick = ({ target }) => {
  if (target === modal) showModal(false);
};

const validateEmail = (email) => {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
};

const showErrorMessage = (message, show = true) => {
  inputWrapper.classList.toggle("error", show);
  errorMessage.innerText = message;
};
const onSuccess = () => {
  showModal();
};

submitBtn.onclick = () => {
  if (emailInput.value === "") {
    showErrorMessage("This field can not be empty");
    return;
  }
  if (!validateEmail(emailInput.value)) {
    showErrorMessage("Please enter valid email");
    return;
  }
  if (!privacyCheckbox.checked) {
    showErrorMessage("Please accept our privacy and policy before procide!");
    return;
  }

  //   fetch(form.action, {method:'post', body: new URLSearchParams(new FormData(form))});
  fetch(form.action, { method: "post", body: new FormData(form) }).then(() =>
    onSuccess()
  );
};
emailInput.oninput = () => {
  showErrorMessage("", false);
};
privacyCheckbox.onchange = () => {
  showErrorMessage("", false);
};

console.log("emailInput ", emailInput);
