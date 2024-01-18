var btn = document.getElementById('btn');
var clrBtn = document.getElementById('clr-btn');
function getValue() {
    btn.addEventListener('click', function () {
        btn.disabled = true;
        var loanInput = document.getElementById('loan');
        var interestInput = document.getElementById('interest');
        var yearInput = document.getElementById('years');
        var errorMsg = document.getElementById('error-msg');
        var loan = parseFloat(loanInput.value);
        var interest = parseFloat(interestInput.value);
        var year = parseFloat(yearInput.value);
        var P = loan;
        var r = interest / 1200;
        var n = year * 12;
        function calculate() {
            var numerator = r * Math.pow(1 + r, n);
            var denominator = Math.pow(1 + r, n) - 1;
            var monthly = P * (numerator / denominator);
            // Månatlig betalning
            function paymentSummary() {
                var loanSum = P;
                var result = [];
                var iterationCount = 1;
                var resultContainer = document.getElementById('result-container');
                // hör ska clear knappen va
                clrBtn.addEventListener('click', function () {
                    loanInput.value = '';
                    interestInput.value = '';
                    yearInput.value = '';
                    resultContainer.innerHTML = '';
                    errorMsg.innerHTML = '';
                    btn.disabled = false;
                });
                if (loan < 19999 || year > 60) {
                    errorMsg.innerText = 'Minimum loan amount: 20.000. Maximum years: 60 years!';
                }
                else if (loanSum > 19999) {
                    while (loanSum > 0) {
                        result.push({ month: iterationCount, loanSum: loanSum });
                        loanSum -= monthly;
                        console.log("Month ".concat(iterationCount, ": Your total current loan amount: ").concat(loanSum, ", Monthly paymnet: ").concat(monthly, ", Interest: ").concat(r));
                        iterationCount++;
                        if (loanSum <= monthly) {
                            var rest = Math.round(monthly - loanSum);
                            console.log("Last payment: ".concat(rest));
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        var display = document.createElement('p');
                        var tot = Math.round(monthly * result.length);
                        if (i === result.length - 1) {
                            var lastPayment = Math.round(result[i].loanSum);
                            display.innerHTML = "Month ".concat(result[i].month, ": Last payment: ").concat(Math.round(lastPayment), " SEK. Total paid amount: ").concat(tot);
                        }
                        else {
                            display.innerHTML = "Month ".concat(result[i].month, ": Current loan: ").concat(Math.round(result[i].loanSum), " SEK, Monthly payment: ").concat(Math.round(monthly), " SEK, Monthly interest: ").concat(r, "%. ");
                        }
                        resultContainer.appendChild(display);
                    }
                }
                else {
                    console.log('All paid :D');
                }
                ;
                result.push(loanSum);
                console.log(result);
            }
            ;
            paymentSummary();
        }
        ;
        calculate();
    });
}
;
getValue();
