const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

// Codes
const countryCode = '^(1\\s?)?';
const areaCode = '(\\([0-9]{3}\\)[\\s\\-?]?|[0-9]{3}[\\s\\-?]?)';
const phoneNumber = '([0-9]{3}[\\s\\-?]?[0-9]{4})$';
const regexNumber = new RegExp(`${countryCode}${areaCode}${phoneNumber}`);

function checkNumber(input) {
  if(input == '') {
    alert("Please provide a phone number");
  }
  else {

    const aResult = document.createElement("p");
    aResult.classList.add("aResult");

    if(regexNumber.test(input)) {
      aResult.innerHTML = `<span class="validInput">Valid US number: <strong>${input}</strong></span>`;
      results.appendChild(aResult);
    }
    else {
      aResult.innerHTML = `<span class="invalidInput">Invalid US number: <strong>${input}</strong></span>`;
      results.appendChild(aResult);
    }
  }
}
function clear() {
  results.textContent = '';
}
console.log(regexNumber.test(input.value))
checkBtn.addEventListener("click", () => checkNumber(input.value));
clearBtn.addEventListener("click", clear);
