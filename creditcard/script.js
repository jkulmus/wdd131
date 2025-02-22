document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const cardHolder = document.getElementById('card-holder').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber.length !== 16) {
        alert('Invalid card number');
    } else if (cardHolder === '') {
        alert('Card holder name is required');
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Invalid expiry date');
    } else if (cvv.length < 3 || cvv.length > 4) {
        alert('Invalid CVV');
    } else {
        alert('Payment Successful!');
    }
});