document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const cardHolder = document.getElementById('card-holder').value.trim();
    const cardExpiration = document.getElementById('card-expiration').value.trim();
    const cardCVC = document.getElementById('card-cvc').value.trim();

    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;  // Matches MM/YY format

    if (!/^\d{16}$/.test(cardNumber)) {
        showError('Invalid card number');
    } else if (cardHolder === '') {
        showError('Card holder name is required');
    } else if (!expirationRegex.test(cardExpiration)) {
        showError('Invalid expiry date (MM/YY)');
    } else if (!/^\d{3,4}$/.test(cardCVC)) {
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
    document.getElementById('form-errors').classList.add('hidden');
    const successContainer = document.querySelector('.card-success');
    successContainer.classList.remove('hidden');
    successContainer.querySelector('p').textContent = message;
}