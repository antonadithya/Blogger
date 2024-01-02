 'use strict';





/**
 * Add event listener  on multiple element
 */

const addEventOnElements =  function(elements, eventType, callback) {
  for( let i = 0 , len = elements.length ; i < len ; i++ ) {
    elements[i].addEventListener(eventType,callback);
  }
  
}

/** 
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active")
  document.body.classList.toggle("nav-active")
};

addEventOnElements(navTogglers, "click" , toggleNav);


/**
 * Header animation
 * when scrolled down to 100px will be active
 */

const header = document.querySelector("[data-header]");
const backToBtn = document.querySelector("[data-back-top-btn]")

window.addEventListener("scroll", () =>{
  if(window.scrollY > 100){
    header.classList.add("active")
     backToBtn.classList.add("active")
  }else {
    header.classList.remove("active")
    backToBtn.classList.remove("active")

  }
});


/**
 * Slider
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));

let totalSlidableItems =  sliderContainer.childElementCount - totalSliderVisibleItems ;

let currentSlidPos = 0;

const moveSliderItem = function (){
  sliderContainer.style.transform = `translateX(-${  sliderContainer.children[ currentSlidPos].offsetLeft}px)`;
}

/**
 * Next Slide
 */

const slideNext = function (){
  const slideEnd = currentSlidPos >= totalSlidableItems

  if(slideEnd){
    currentSlidPos = 0 
  }else{
    currentSlidPos++
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);


/**
 * Preview Slide
 */

const slidePrev = function (){

  if(currentSlidPos <= 0){
    currentSlidPos = totalSlidableItems; 
  }else{
    currentSlidPos--
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);


/**
 * responsive
 */

window.addEventListener("resize", function (){
   totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));

  totalSlidableItems =  sliderContainer.childElementCount - totalSliderVisibleItems ;
  
  moveSliderItem()
});