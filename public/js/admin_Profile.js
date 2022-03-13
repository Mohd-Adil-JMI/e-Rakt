const topLine = document.querySelector(".admin_dashboard");
const secondLine=document.querySelector(".Blood_banks");
const thirdLine=document.querySelector(".add_donor");
const fourthLine=document.querySelector(".view_details");
const fifthLine=document.querySelector(".edit_details");
const sixthLine=document.querySelector(".admins");
const seventhLine=document.querySelector(".contact");




const dash= document.querySelector('#button1');
const bank= document.querySelector('#button2');
const add= document.querySelector('#button3');
const view= document.querySelector('#button4');
const edit= document.querySelector('#button5');
const admi= document.querySelector('#button6');
const cont= document.querySelector('#button7');

dash.addEventListener('click', ()=>{
    topLine.style.display="flex"
    secondLine.style.display="none"
    thirdLine.style.display="none"
    fourthLine.style.display="none"
    fifthLine.style.display="none"
    sixthLine.style.display="none"
    seventhLine.style.display="none"
})
bank.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="flex"
    thirdLine.style.display="none"
    fourthLine.style.display="none"
    fifthLine.style.display="none"
    sixthLine.style.display="none"
    seventhLine.style.display="none"
}) 
add.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="none"
    thirdLine.style.display="flex"
    fourthLine.style.display="none"
    fifthLine.style.display="none"
    sixthLine.style.display="none"
    seventhLine.style.display="none"
}) 
view.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="none"
    thirdLine.style.display="none"
    fourthLine.style.display="flex"
    fifthLine.style.display="none"
    sixthLine.style.display="none"
    seventhLine.style.display="none"
}) 
edit.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="none"
    thirdLine.style.display="none"
    fourthLine.style.display="none"
    fifthLine.style.display="flex"
    sixthLine.style.display="none"
    seventhLine.style.display="none"
}) 
admi.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="none"
    thirdLine.style.display="none"
    fourthLine.style.display="none"
    fifthLine.style.display="none"
    sixthLine.style.display="flex"
    seventhLine.style.display="none"
}) 
cont.addEventListener('click', ()=>{
    topLine.style.display="none"
    secondLine.style.display="none"
    thirdLine.style.display="none"
    fourthLine.style.display="none"
    fifthLine.style.display="none"
    sixthLine.style.display="none"
    seventhLine.style.display="flex"
}) 