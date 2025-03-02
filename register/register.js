import { participantTemplate, successTemplate } from './Templates.js';

let participantCount = 1;
const addButton = document.getElementById('add');
const form = document.querySelector('form');
const summarySection = document.getElementById('summary');

addButton.addEventListener('click', function() {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const totalFee = totalFees();
    const adultName = document.getElementById('adult_name').value;
    form.style.display = 'none';
    summarySection.innerHTML = successTemplate({
        name: adultName,
        participants: participantCount,
        fee: totalFee
    });
});

function totalFees() {
    let feeElements = document.querySelectorAll('[id^=fee]');
    feeElements = [...feeElements];
    return feeElements.reduce((total, element) => {
        const feeValue = parseFloat(element.value) || 0;
        return total + feeValue;
    }, 0);
}