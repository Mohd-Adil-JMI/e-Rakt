const toggle = document.querySelector(".toggle")
const navbar = document.querySelector(".navbar")
const items = document.querySelectorAll(".item")
const contents = document.querySelectorAll(".content")

toggle.addEventListener('click', ()=>{
    toggle.classList.toggle('close')
    navbar.classList.toggle('close')
})
let prv = contents[0];
items.forEach((item,index)=>{
    if (index==6) {
        return;
    }
    item.addEventListener('click',()=>{
        prv.classList.remove('active')
        contents[index].classList.add('active')
        prv = contents[index]
    })
})

//media query
function changeNav(x) {
    if (x.matches) {
        toggle.classList.add('close')
        navbar.classList.add('close')
    }
    else{
        toggle.classList.remove('close')
        navbar.classList.remove('close')
    }
  }
  
  // Create a MediaQueryList object
  const mediaObj = window.matchMedia("(max-width: 500px)")
  
  // Call the match function at run time:
  changeNav(mediaObj);
  
  // Add the match function as a listener for state changes:
  mediaObj.addListener(changeNav)