document.querySelector("#v-pills-stories-tab").classList.add("active");

var storyIndex = document.querySelector('.ASS')
var carouselStory = document.querySelectorAll('.carousel-item') //10
var expandedStory = document.querySelectorAll('.Story') //10
var backButtons = document.querySelectorAll('.back')

carouselStory.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        expandedStory[index].classList.add('open')
        storyIndex.classList.add('close')
        document.documentElement.scrollTop = 0;
    })

    backButtons[index].addEventListener('click', ()=>{
        expandedStory[index].classList.remove('open')
        storyIndex.classList.remove('close')
    })
})

