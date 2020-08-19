function showErrorMessage(
  form,
  input,
  { errorClass, inputErrorClass, ...rest }
) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

function toggleButtonState(inputs, button, { inactiveButtonClass, ...rest }) {
  const isValid = inputs.every((input) => input.validity.valid);

  if (isValid) {
    button.classList.remove(inactiveButtonClass);
  } else {
    button.classList.add(inactiveButtonClass);
  }
}

function hideErrorMessage(
  form,
  input,
  { errorClass, inputErrorClass, ...rest }
) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";
  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

function checkInputValidity(form, input, rest) {
  if (input.validity.valid) {
    hideErrorMessage(form, input, rest);
  } else {
    showErrorMessage(form, input, rest);
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  ...rest
}) {
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const inputs = [...document.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
    toggleButtonState(inputs, button, rest);

    inputs.forEach((input) => {
      console.log("for every input");
      input.addEventListener("input", () => {
        checkInputValidity(form, input, rest);
        toggleButtonState(inputs, button, rest);
      });
    });
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
});
