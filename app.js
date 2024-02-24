const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const formBtn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (code in countryList){  //countryList is a variable in codes.js
//     console.log(code);
// }
for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);  //It is showing the current element in which change has occured
        });
    }
    const updateFlag = (element) =>{
        let currCode = element.value;
        let countryCode = countryList[currCode];  //INR,USD,KWD...
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };
    formBtn.addEventListener("click",(evt)=>{
        evt.preventDefault();
        updateExchangeRate();
    });
    
    const updateExchangeRate = async ()=>{
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if(amtVal ==="" || amtVal<1){
            amtVal = 1;
            amount.value = 1;
        }
        // console.log(amtVal);
        // console.log(fromCurr.value);
        // console.log(toCurr.value);
        const URL = `${Base_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        //console.log(rate);
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})