const toggle = document.querySelector(".toggle")
const navbar = document.querySelector(".admin-navbar")
const items = document.querySelectorAll(".item")
const contents = document.querySelectorAll(".content")

toggle.addEventListener('click', ()=>{
    toggle.classList.toggle('close')
    navbar.classList.toggle('close')
})
let prv = contents[0];
items.forEach((item,index)=>{
    if (index==5) {
        return;
    }
    item.addEventListener('click',()=>{
        console.log('clicked');
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


  const barLabels = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];

const barData = {
    labels: barLabels,
    datasets: [{
        label: '2021',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45, 10, 8, 11, 30, 23],
    }]
};

const barConfig = {
    type: 'line',
    data: barData,
    options: {}
};

const data = {
    labels: [
        'Donations',
        'Purchased',
        'Null'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 100, 60],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: data,
};

const barChart = new Chart(
    document.getElementById('barChart'),
    barConfig
);

const pieChart = new Chart(
    document.getElementById('pieChart'),
    config
);