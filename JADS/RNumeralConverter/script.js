const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");
const romanNumbers = [["M",1000],
                      ["CM", 900], ["D", 500], ["CD", 400], ["C", 100],
                      ["XC", 90], ["L", 50], ["XL", 40], ["X", 10],
                      ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];

const convertNumeral = (input) => {
  output.innerText = '';
  let result = [];

  if(input == ''){
 output.innerHTML = `<span>Please enter <i>a valid number</i></span>`;
  }
  else if(input <= 0){
    output.innerHTML = `<span>Please enter a number <i>greater than or equal</i> to 1</span>`;
  }
  else if (input >= 4000){
      output.innerHTML = `<span>Please enter a number <i>less than or equal</i> to 3999</span>`;
  }
  else {
    romanNumbers.forEach((romanNumber) => {
      while(input >= romanNumber[1]) {
        result.push(romanNumber[0]);
        input -= romanNumber[1];
      }
    });
    output.innerText = `${result.join('')}`;
    console.log(result.join(''));
  }
}

button.addEventListener("click", () => convertNumeral(input.value));
