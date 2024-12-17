const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/usd.json";

const dropdown = document.querySelectorAll('.conversion select');
const btn = document.querySelector(".convertbutton button");
const fromCurr = document.querySelector(".firstflagholder select");
const toCurr = document.querySelector(".secondflagholder select");
const output = document.getElementById("outputValue");

for(let select of dropdown){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerHTML = code;
        newoption.value = code;
        if(select.name === "from" && code === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "to"  && code === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// preventing the defualt things form happening when any button is pressed
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".actualbox input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value.toLowerCase());
    const URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    // console.log(URL);
    let rate;
    try{
        let response = await fetch(URL);
        if (!response.ok) throw new Error("response not working");

        let data = await response.json();
        rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        // console.log(rate);
    }
    catch(error){
        alert("Failed to fetch exchange rate :(");
    }
    let finalVal = rate * amtVal;
    // console.log(finalVal);
    output.innerHTML = finalVal.toFixed(2);
});