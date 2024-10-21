const ScrollLottie = function (obj) {
//const ScrollLottie = (obj) => {
  let anim = lottie.loadAnimation({
   container: document.querySelector(obj.target), 
   renderer: 'svg',
   loop: false,
   autoplay: false,
   path: obj.path 
 });
 
 let timeObj = {currentFrame: 0}
 let endString = (obj.speed === "slow") ? "+=2000" : (obj.speed === "medium") ? "+=1000" : (obj.speed === undefined) ? "+=1250" : "+=500";
 ScrollTrigger.create({
     trigger: obj.target, 
     scrub: true,
     pin: false, //"#fetch_phone_animator_row", //
     start: "top top",
     end: endString,
	 /*end: "bottom -10%",*/
   onUpdate: function (self) {
   //onUpdate: self => {
      if(obj.duration) {
       gsap.to(timeObj, {
        duration: obj.duration,
        currentFrame:(Math.floor(self.progress *  (anim.totalFrames - 1))),
        //onUpdate: () => {
        onUpdate: function () {  
         anim.goToAndStop(timeObj.currentFrame, true)
        },
        ease: 'expo'
       })
      } else {
        anim.goToAndStop(self.progress *  (anim.totalFrames - 1), true)
      }
     }
 });  

};
