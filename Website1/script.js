const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//jab mouse move ho toh humlog skew kr paye aur max and min skew define kar paye, jab mouse move ho toh chepta ki value badhe aur jb mouse move hona band ho jaye toh chapta ki value hata do

var timeout;

function circleOvalKaro(){
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

 window.addEventListener("mousemove",function(dets){
  this.clearTimeout(timeout);
  var xdiff = dets.clientX - xprev;
  var ydiff = dets.clientY - yprev;
  xscale = gsap.utils.clamp(.8,1.2,xdiff);
  yscale = gsap.utils.clamp(.8,1.2,ydiff);
  xprev = dets.clientX;
  yprev = dets.clientY;

  circleMouseFollower(xscale , yscale);

  timeout = this.setTimeout(function(){
   document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
  }, 100);
 });
}

function firstPageAnim(){
 var tl=gsap.timeline();
 tl.from("#nav",{
  y: -10,
  opacity:0,
  duration: 1.5,
  ease: Expo.easeInOut
 })
 .to(".boundingelem",{
  y: 0,
  opacity:100,
  ease: Expo.easeInOut,
  duration: 2,
  stagger: .2,
  delay:-1
 })
 .from("#herofooter",{
  y: -10,
  opacity: 0,
  duration: 1.5,
  ease: Expo.easeInOut,
  delay: -1
 })
}

function circleMouseFollower(xscale , yscale){
 window.addEventListener("mousemove", function(dets){
  this.document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
 })
}
circleMouseFollower();
firstPageAnim();
circleOvalKaro();

//tine element ko select karo , uske baad tino par ek mousemove laga lo aur jab mousemove ho toh ye pata karo ki mouse kaha par hai jiska matlb h mouse ki x and y position pta karo. Ab mouse ki x y position k badle us image ko show karo and us image ko move karo, move krte waqt rotate karo and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem){
 var rotate = 0;
 var diff1 = 0;

 elem.addEventListener("mouseleave",function(dtes){
  gsap.to(elem.querySelector("img"),{
   opacity: 0,
   ease: Power3
  });
 });
 
 elem.addEventListener("mousemove",function(dets){
  var diff = dets.clientY - elem.getBoundingClientRect().top;
  diff1 = dets.clientX - rotate;
  rotate = dets.clientX;
   
  gsap.to(elem.querySelector("img"),{
   opacity:1,
   ease:Power1,
   top: diff,
   left: dets.clientX,
   rotate: gsap.utils.clamp(-20,20,diff1)
  });
  console.log(dets.clientX , dets.clientY);
 });
});