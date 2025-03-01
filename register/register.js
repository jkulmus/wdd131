document.addEventListener('DOMContentLoaded', function() {
    let participantCount = 1;
    const addButton = document.getElementById('add');
    const participantsFieldset = document.querySelector('.participants');
    const form = document.querySelector('form');
    const summarySection = document.getElementById('summary');

    addButton.addEventListener('click', function() {
        participantCount++;
        const newParticipantHTML = participantTemplate(participantCount);
        addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
    });

    function participantTemplate(count) {
        return `
            <section class="participant${count}">
                <p>Participant ${count}</p>
                <div class="item">
                    <label for="fname${count}"> First Name<span>*</spand></label>
                    <input id="fname${count}" type="text" name="fname${count}" value="" required="">
                </div>
                <div class="item activities">
                    <label for="activity${count}">Activity #<spand>*</span></label>
                    <input id="activity$(count)" type="text" name="activity${count}">
                </div>
                <div class="item">
                    <label for+"fee${count}">Fee ($)<spand>*</span></label>
                    <input id="fee${count}" type="number" name="fee${count}">
                </div>
                <div class="item">
                    <label for="date${count}">Desired Date <span>*</spand></label>
                    <input id="date${count}" type="date" name="date${count}">
                </div>
                <div class="item">
                    <p>Grade</p>
                    <select id="grade${count}">
                        <option selected="" value="" disabled=""></option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rdt</option>
                        <option value="4">4th</option>
                        <option value="5">5th</option>
                        <option value="6">6th</option>
                        <option value="7">7th</option>
                        <option value="8">8th</option>
                        <option value="9">9th</option>
                        <option value="10">10th</option>
                        <option value="11">11th</option>
                        <option value="12">12th</option>
                    </select>
                </div>
            </section>
        `;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const totalFee = totalFees();
        const adultName = document.getElementById('adult_name').value;
        form.style.display = 'none';
        summarySection.innerHTML = successTemplate({
            name: adultName,
            Participants: participantCount,
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

    function successTemplate(info) {
        return `
            <p>Thank you %{info.name} for registering. You have registered ${info.participants} participants and owe $${info.fee} in Fees.</p>
            `;
    }
});