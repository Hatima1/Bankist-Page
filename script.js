'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(a=>a.addEventListener("click",openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
 
let btnsc=document.querySelector(".btn--scroll-to")
let sec1=document.querySelector("#section--1");
btnsc.addEventListener("click",function(e){

  sec1.scrollIntoView({behavior:"smooth"})
})

//smoth

document.querySelector(".nav__links").addEventListener("click",function(e){
  e.preventDefault()
  
  if(e.target.classList.contains("nav__link")){
    console.log(e.target);
 
const id=e.target.getAttribute('href');


document.querySelector(id).scrollIntoView({behavior:"smooth"})

  }
})
////////slid
const tab=document.querySelectorAll(".operations__tab")
const con=document.querySelector(".operations__tab-container")
const content=document.querySelectorAll(".operations__content")
con.addEventListener("click",function(e){
  
  let clicked=e.target.closest(".operations__tab")

  if(!clicked)return
  //
tab.forEach(a=>a.classList.remove("operations__tab--active"))
  clicked.classList.add("operations__tab--active")
//constent
content.forEach(a=>a.classList.remove("operations__content--active"))
 document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
 
})
///opa
let nav=document.querySelector("nav")
let mous=function(e,op){
  if(e.target.classList.contains("nav__link")){
    let link=e.target
    let other=link.closest(".nav").querySelectorAll(".nav__link")
    let log=document.querySelector(".img")
    other.forEach(a=>{
     if (a!==link){
       a.style.opacity=op;
     }
    })
    
  
    }

}
nav.addEventListener("mouseover",function(e){
  mous(e,0.5)
  //or mous.bind(0.5)
  
})
nav.addEventListener("mouseout",function(e){
  mous(e,1)
  
})
////heder scrol
let heder=document.querySelector(".header")
let as=function(ent){
  let [t]=ent
  if(!t.isIntersecting)nav.classList.add("sticky");
  else nav.classList.remove("sticky")
   
  
}

const hederobs=new IntersectionObserver(as,{
  root:null,
  threshold:0
})
hederobs.observe(heder)

///section enm
let sec=document.querySelectorAll(".section")//allsec
let ok=function(ent,ob){
 const [entr]=ent
 
 if(!entr.isIntersecting) return
 else
  entr.target.classList.remove("section--hidden")
}
let sectionObserver=new IntersectionObserver(ok,{
  root:null,
  threshold:0.15
})
sec.forEach(a=>{
  sectionObserver.observe(a)
  a.classList.add("section--hidden")
  
})  



///img blur
let allimg=document.querySelectorAll("img[data-src]")
let img=function(ent,ob){
  const [entr]=ent

  if(!entr.isIntersecting)return
  else
  
  entr.target.src=entr.target.dataset.src
  entr.target.addEventListener("load",function(){
    entr.target.classList.remove("lazy-img")
  })
  ob.unobserve(entr.target)
}
let imgObserver=new IntersectionObserver(img,{
  root:null,
  threshold:0.80
})
allimg.forEach(a=>{
  imgObserver.observe(a)
  
  
})









///img slider
let curSlide=0
let btnleft=document.querySelector(".slider__btn--left")
let btnRight=document.querySelector(".slider__btn--right")
let slider=document.querySelector(".slider")
let slids=document.querySelectorAll(".slide")
let maxSlide=slids.length
const dotContainer = document.querySelector('.dots');



// slider.style.transform="scale(0.4) translateX(-600px)"
// slider.style.overflow="visible"

const createDots = function () {
  slids.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots()

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const goToSlide=function(sl){
  slids.forEach((a,i)=>{
    a.style.transform=`translateX(${100*(i-sl)}%)`
  })
     }
     ///biging
     goToSlide(0)

////
let nextSlide=function(){
      if(curSlide===maxSlide-1){
        curSlide=0
      }
      else{
        curSlide++
      }
      goToSlide(curSlide)

     }
const prevSlide=function(){
  if(curSlide===0){
    curSlide=maxSlide-1
  }
  else{
    curSlide--
  }
  goToSlide(curSlide)
}     
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

btnRight.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(e.target);
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

 

  

