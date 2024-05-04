let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE",55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const moneyUnit = [100,20,10,5,1,0.25,0.1,0.05,0.01];
const resultDiv = document.getElementById("results-div");
let reverseCid = [...cid].reverse();

const inputCash = document.getElementById("cash");
const priceDisplay = document.getElementById("price");
const purchaseBtn = document.getElementById("purchase-btn");
const change = document.getElementById("change-due");
const drawer = document.getElementById("drawer");
let result = {status: "", changeTypes: []};
let totalCid = cid.map((type) => type[1]).reduce((accumulator, current) => accumulator + current);

function updateCID () {
  drawer.innerHTML = `
                    <ul>
                        ${cid.map(money => `<li>${money[0]}: $${parseFloat(money[1])}</li>`).join('')}
                    </ul>`;

 }

function updateChangeDue (status = "", changeTypes = []) {
  change.innerHTML = `<p id="${status}">Status: ${status.toUpperCase()}${changeTypes.map(money => ` ${money[0]}: $${parseFloat(money[1].toFixed(2))}</p>`).join(' ')}`;

  console.log(change.innerText);

}


function calculateChange (changeDue) {
  inputCash.value = '';
  let i = 0;
  reverseCid.forEach((denomination) => {
    let perUnit = 0.0;
    console.log((changeDue >= moneyUnit[i])/* && (parseFloat(denomination[1]) >= changeDue)*/ && (parseFloat(totalCid) >= changeDue));
    while((changeDue >= moneyUnit[i])  && (parseFloat(denomination[1]) > 0) && (parseFloat(totalCid) >= changeDue)) {
      changeDue = parseFloat(changeDue -= moneyUnit[i]).toFixed(2);
      denomination[1]  = parseFloat(denomination[1] -= moneyUnit[i]).toFixed(2);
      perUnit += moneyUnit[i];
    }
    if(perUnit != 0) {
      result.changeTypes.push([denomination[0],perUnit]);
    }
console.log(changeDue);
    i ++;
  });

  return changeDue;
}

function purchase (inputCash) {
  let totalCid = cid.map((type) => type[1]).reduce((accumulator, current) => accumulator + current).toFixed(2);
  result.changeTypes = [];
  const changeDue = parseFloat((inputCash - price)).toFixed(2);
  if(inputCash == '') {
    return;
  }
  else if(inputCash < price) {
    alert("Customer does not have enough money to purchase the item");
  }
  else if(inputCash == price) {
    change.innerHTML = `<p>No change due - Customer paid with exact cash</p>`;
    return;
  }
  else {

    if (changeDue == totalCid){
      result.status = "CLOSED"
      calculateChange(changeDue);
      updateChangeDue(result.status, result.changeTypes);
    }
    else {
      if(calculateChange(changeDue) != 0){
        result.status = "insufficient-funds";
        change.innerHTML = `<p id="${result.status}">Status: INSUFFICIENT_FUNDS</p>`;
        return;
      }
      else {
        result.status = "open";
        updateChangeDue(result.status, result.changeTypes);
      }
    }
  }
}


purchaseBtn.addEventListener("click", () => purchase(inputCash.value));
updateCID();
priceDisplay.innerHTML = `<p>Price: ${price}</p>`;
