const Adate = document.getElementById('Adate')

var html = `<option value="" disabled selected>Select</option>`

for (var i = 1; i <= 5; i++) {
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + i);;
    var date1 = tomorrow.getDate() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getFullYear();
    console.log(date1)
    html += `<option value="${date1}">${date1}</option>`
}

Adate.innerHTML = html;

var type = document.getElementById('type');
var units = document.getElementById('unit-div');
let user;

type.addEventListener('change', ()=>{
    user = type.value;
    console.log(user);

    if(user!='Purchase'){
        units.classList.toggle('hidden');
    }
})



const Scode = document.getElementById('searchButton')
const m = Math;

let a = 1000;
let b = 10000;
let randomNo = m.round(a + (b - a) * m.random());

// Scode.innerHTML=`${randomNo}`;
Scode.value=`${randomNo}`;
