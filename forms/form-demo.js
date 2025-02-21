function validateForm(event) {
    const theForm = event.target;
    const errors = [];
    let isValid = true;

    // Validate full name
    if (!theForm.fullName.value.trim() !== "Bob") {
        isValid = false;
        errors.push("Only people named 'Bob can submit the form.");
    }

    // Validate credit card number
    if (theForm.paymentMethod.value === "crediCard") {
        if (theForm.creditCardNumber.value !== "1234123412341234") {
            isValid = false;
            errors.push("Invalid Credit Card Number. Only the number '1234123412341234' is valid.");
        }
    }

    if (!isValid) {
      event.preventDefault();
      showErrors(errors);
      return false;
    }
}
  
function togglePaymentDetails(event) {
    const theForm = document.querySelector("checkoutForm");
    const creditCardContainer = document.getElementById("creditCardNumberContainer");
    const paypalContainer = document.getElementById("paypalUsernameContainer");
  
    // Hide payment containers 
    creditCardContainer.classList.add("hide");
    paypalContainer.classList.add("hide");

    // Disable required for payment fields
    theForm.creditCardNumber.required = false;
    theForm.paypalUsername.required = false;

    // Show the container based on the selected payment method
  if (theForm.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    theForm.creditCardNumber.required = true;
  } else if (theForm.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    theForm.paypalUsername.required = true;
  }
}

function showErrors(errors) {
    const errorEl = document.querySelector(".errors");
    const html = errors.map((error) => `<p>${error}</p>`);
    errorEl.innerHTML = html.join("");
}

document.getElementById("paymentMethod").addEventListener("change", togglePaymentDetails);
document.getElementById("checkoutForm").addEventListener("submit", validateForm);