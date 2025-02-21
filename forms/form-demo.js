function validateForm(event) {
    const theForm = event.target;
    const errors = [];
    let isValid = true;

    // Add validation  here,
    if (!theForm.fullName.value.trim()) {
        isValid = false;
        errors.push("Full Name is required.");
    }

    if (!isValid) {
      event.preventDefault();
      showErrors(errors);
      return false;
    }
}
  
  function togglePaymentDetails(event) {
    // get a reference to the form
    const theForm = event.target.form;
    // reference to the credit card and PayPal containers
    const creditCardContainer = document.getElementById("creditCardContainer");
    const paypalContainer = document.getElementById("paypalContainer");
  
    // Hide payment containers 
    creditCardContainer.classList.add("hide");
    paypalContainer.classList.add("hide");

    // Disable required for payment fields
    creditCardContainer.querySelector("input").removeAttribute("required");
    paypalContainer.querySelector("input").removeAttribute("required");
  
    // Show the container based on the selected payment method
  if (event.target.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    creditCardContainer.querySelector("input").setAttribute("required", "required"); 
  } else if (event.target.value === "paypal") {
    paypalContainer.classList.remove("hide");
    paypalContainer.querySelector("input").setAttribute("required", "required");
  }
}
  
  // helper function to display our errors.
  function showErrors(errors) {
    const errorEl = document.querySelector(".errors");
    const html = errors.map((error) => `<p>${error}</p>`);
    errorEl.innerHTML = html.join("");
  }

  document.getElementById("paymentMethod").addEventListener("change", togglePaymentDetails);
  document.getElementById("checkoutForm").addEventListener("submit", validateForm);