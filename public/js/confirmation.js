const Adate = document.getElementById('Adate')

var html = `<option value="" disabled selected>Select</option>`

for (var i = 1; i <= 5; i++) {
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + i);
    var addZeroMonth = "";
    var addZeroDays = "";

    if(tomorrow.getMonth()+1 < 10){
        addZeroMonth = "0"    
    }
    if(tomorrow.getDate() < 10){
        addZeroDays = "0"
    }
    var date1 = addZeroDays + tomorrow.getDate() + '-' + addZeroMonth + (tomorrow.getMonth() + 1) + '-' + tomorrow.getFullYear();
    var date1Val = tomorrow.getFullYear() + addZeroMonth + (tomorrow.getMonth()+1) + addZeroDays + tomorrow.getDate();
    // console.log(date1)
    html += `<option value="${date1Val}">${date1}</option>`
}

Adate.innerHTML = html;

var type = document.getElementById('type');
var units = document.getElementById('unit-div');
var formContainer = document.querySelector('#form-container');

type.addEventListener('change', ()=>{
    let user = type.value;

    if(user=='Donate'){
        formContainer.removeChild(units);
    }
    else if(user=='Purchase'){
        formContainer.appendChild(units);
    }
})


const Scode = document.getElementById('searchButton')
const m = Math;

let a = 1000;
let b = 10000;
let randomNo = m.round(a + (b - a) * m.random());

// Scode.innerHTML=`${randomNo}`;
Scode.value=`${randomNo}`;
