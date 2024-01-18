const btn = document.getElementById('btn') as HTMLButtonElement;
const clrBtn = document.getElementById('clr-btn') as HTMLButtonElement;

function getValue() {
    btn.addEventListener('click', function () {

        btn.disabled = true;

        let loanInput = document.getElementById('loan') as HTMLInputElement;
        let interestInput = document.getElementById('interest') as HTMLInputElement;
        let yearInput = document.getElementById('years') as HTMLInputElement;

        let errorMsg = document.getElementById('error-msg') as HTMLDivElement;

        let loan = parseFloat(loanInput.value);
        let interest = parseFloat(interestInput.value);
        let year = parseFloat(yearInput.value);


        let P = loan;
        let r = interest / 1200;
        let n = year * 12;

        function calculate() {

            let numerator = r * Math.pow(1 + r, n);
            let denominator = Math.pow(1 + r, n) - 1;
            let monthly = P * (numerator / denominator);

            // Månatlig betalning
            function paymentSummary() {
                let loanSum = P;
                let result = [];
                let iterationCount = 1;

                let resultContainer = document.getElementById('result-container') as HTMLDivElement;

                // hör ska clear knappen va
                clrBtn.addEventListener('click', function () {
                    loanInput.value = '';
                    interestInput.value = '';
                    yearInput.value = '';
                    resultContainer.innerHTML = '';
                    errorMsg.innerHTML = '';

                    btn.disabled = false;
                })


                if (loan < 19999 || year > 60) {
                        errorMsg.innerText = 'Minimum loan amount: 20.000. Maximum years: 60 years!'
                    }
                else if (loanSum > 19999) {
                    while (loanSum > 0) {
                        result.push({ month: iterationCount, loanSum });
                        loanSum -= monthly;

                        
                        console.log(`Month ${iterationCount}: Your total current loan amount: ${loanSum}, Monthly paymnet: ${monthly}, Interest: ${r}`);
                        iterationCount++;


                        if (loanSum <= monthly) {
                            let rest = Math.round(monthly - loanSum);
                            console.log(`Last payment: ${rest}`);
                        }
                    }

                    for (let i = 0; i < result.length; i++) {
                        let display = document.createElement('p');
                        let tot = Math.round(monthly * result.length);

                        if (i === result.length - 1) {

                            let lastPayment = Math.round(result[i].loanSum);
                            display.innerHTML = `Month ${result[i].month}: Last payment: ${Math.round(lastPayment)} SEK. Total paid amount: ${tot}`;
                        } else {
                            
                            display.innerHTML = `Month ${result[i].month}: Current loan: ${Math.round(result[i].loanSum)} SEK, Monthly payment: ${Math.round(monthly)} SEK, Monthly interest: ${r}%. `;
                        }
                        resultContainer.appendChild(display);
                    }
                } else {
                    console.log('All paid :D')
                };

                result.push(loanSum);
                console.log(result);
            };
            paymentSummary();
        };
        calculate();
    });
};

getValue();
