const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

const checkPalindrome = (input) => {
  if(input == "") {
    alert("Please input a value");
    return;
  }
  else {
    const inputCopy = input.replace(/[_\W]/g,'').toLowerCase().split('');

    if(inputCopy.join('') == inputCopy.reverse().join('') ){
      result.innerHTML = `<span><i>${input}</i> <strong>is</strong> a palindrome.</span>`;
    }
    else {
      result.innerHTML = `<span><i>${input}</i> <strong>is not</strong> a palindrome</span>`;
    }
  }
}

button.addEventListener("click", () => checkPalindrome(input.value));
