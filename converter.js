

const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const drops = document.querySelectorAll(".drop select")
const selector = document.getElementById("selector")
const btn = document.getElementById("submit")
const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const msg = document.getElementById("msg")




// for( code in countryList ){
//     console.log (code,countryList[code]);}

for(let  selectes of drops){
    for (code in countryList){
        let new_option = document.createElement("option");
        new_option.innerText = code;
        new_option.value = code;
        selectes.append(new_option);
        // if ( select.name==="from"&& code==="USD"){
        //     new_option.selected="selected"
        // }
        // else if ( select.name==="to" && code==="PKR"){
        //     new_option.selected="selected"
        // }
        selectes.addEventListener("change",(evt)=>{

            update_flag(evt.target)
        })
    }
}

//------------------ chat gpt code for defualt values---------->..>>>



if (fromSelect) {
    fromSelect.value = "USD"; 
}

if (toSelect) {
    toSelect.value = "PKR"; 
}
//------------------ -------------------------------------------->..>>>

const update_flag=(element)=>{
let code = element.value;
let country_code = (countryList[code].toLowerCase());//change countery code text in lowere case from upper because of error in url 
let new_link = `https://flagcdn.com/w320/${country_code}.png`;
let img = element.parentElement.querySelector("img");
 img.src=new_link;
}



btn.addEventListener("click",async(event)=>{
    event.preventDefault();//its for page could not refreshed atoumaticly

    const input = document.querySelector("input").value;
  if(
    input===""||input <1
  ){ input.value="1" }

//--------------------DAT FECTHING code---------------->>>>

  let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromSelect.value.toLowerCase()}.json`);
  let data = await response.json()

const fromRate = data[fromSelect.value.toLowerCase()];
const toRate = fromRate ? fromRate[toSelect.value.toLowerCase()] : undefined;
const total_rate = input*toRate
  msg.innerText =( `${input},${fromSelect.value} is equal=${Math.round(total_rate)},${toSelect.value}`);

});

