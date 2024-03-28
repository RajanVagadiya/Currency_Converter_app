const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeIcon = document.querySelector(".dropdown .icon");

let i = 0;
for(let select of dropdown){
   for(currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if (select.name ==="from" && currCode === "USD") {
        newOption.selected ="selected";

       }
       else if (select.name ==="to" && currCode === "INR") {
        newOption.selected ="selected";
       }
       select.append(newOption);
   }
   select.addEventListener("change",(evt)=>{
      console.log(evt.target);
       updateFlag(evt.target);
   });
}


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const updateExchangeRate = ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
      if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amtValue.value = "1";
      }

  msg.innerText = "Getting exchange rate";
  const URL = `https://v6.exchangerate-api.com/v6/723cc656ad007ed8f4396c7a/latest/${fromCurr.value.toLowerCase()}`;
  fetch(URL)
    .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      console.log(result);
    let exchangeRate = result.conversion_rates[toCurr.value];
    console.log(exchangeRate);
    let finalAmount = (amtValue * exchangeRate).toFixed(2);
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    })
    .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    msg.innerText = "Somthing Went Wrong";
  });

}

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load",()=>{
  updateExchangeRate();
});

exchangeIcon.addEventListener("click",(evt)=>{
  let tempCode = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempCode;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
});