
const URL  = "https://latest.currency-api.pages.dev/v1/currencies";;

const dropdownSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (select of dropdownSelect) { //to add options from the countryList to the dropdown
    for (code in countryList) {
        console.log(code, countryList[code]);
        const newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => { //change the flag logic 
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let imgSrc = element.parentElement.querySelector("img"); //access the flag 
imgSrc.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{ //change the amount logic 
evt.preventDefault(); //prevents the browser frrom performing any default actions 
let amount = document.querySelector(".amount input");
let amntVal = amount.value;
if(amntVal == "" || amntVal <0){   
    amntVal = 1;
    amount.value = 1;
}  else if( isNaN(amntVal)){
    alert("you can only enter a numeric input");
    return ; //stop here, dont proceed to console function if its a string. 
}
console.log(amntVal);

const BASE_URL = `${URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(BASE_URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; //performs "from"-"to" conversion 


let finalAmount = amntVal * rate;
let msg = `${amntVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;
console.log(msg);
});
