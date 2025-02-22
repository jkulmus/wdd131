document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const cardHolder = document.getElementById('card-holder').value;
    const cardMonth = document.getElementById('card-month').value;
    const cardYear = document.getElementById('card-year').value;
    const cardCVC = document.getElementById('card-cvc').value;

    if (cardNumber.length !== 16) {
        showError('Invalid card number');
    } else if (cardHolder === '') {
        showError('Card holder name is required');
    } else if (!/^\d{2}$/.test(cardMonth) || !/^\d{2}$/.test(cardYear)) {
        showError('Invalid expiry date');
    } else if (cardCVC.length < 3 || cardCVC.length > 4) {
        showError('Invalid CVC');
    } else {
        showSuccess('Payment Successful!');
    }
});

function showError(message) {
    const errorContainer = document.getElementById('form-errors');
    errorContainer.classList.remove('hidden');
    document.getElementById('card-error').textContent = message;
}

function showSuccess(message) {
    const successContainer = document.querySelector('.card-success');
    successContainer.classList.remove('hidden');
    successContainer.querySelector('p').textContent = message;
}