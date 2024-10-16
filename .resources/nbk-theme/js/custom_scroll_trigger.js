$( document ).ready(function() {

	setTimeout(function() {
  ScrollTrigger.config({ limitCallbacks: true })
  

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  "(max-width: 1024px)": function() {
    document.querySelectorAll('#sh_go_crazy_mob .left_sc_img1').forEach(section => {
      gsap.from(section.querySelector('.card_img'), {
        x: 150,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });

    document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content1').forEach(section => {
      gsap.from(section.querySelector('h2'), {
        x: 100,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });
    document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content1').forEach(section => {
      gsap.from(section.querySelector('ul'), {
        x: 100,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });

    document.querySelectorAll('#sh_go_crazy_mob .left_sc_img2').forEach(section => {
      gsap.from(section.querySelector('.card_img2'), {
        x: 150,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });

    document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content2').forEach(section => {
      gsap.from(section.querySelector('h2'), {
        x: 100,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });
    document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content2').forEach(section => {
      gsap.from(section.querySelector('ul'), {
        x: 100,
        // y: 200,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });

    document.querySelectorAll('.ppcs_list li').forEach(section => {
      gsap.from(section.querySelector('.ppcs_list_content'), {
        x: -100,
        // y: 100,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        delay: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          once: true
        },
      })
    });
    document.querySelectorAll('.split-transfer-manage .stm_left').forEach(section => {
      gsap.from(section.querySelector('.stm_box'), {
        x: 100,
        // y: 200,
        autoAlpha: 0,
        ease: "power3.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });
  },

  "(min-width:1025px)": function(){
	  document.querySelectorAll('#shabab-listing-1.ppcs_list li').forEach(section => {
		  gsap.from(section.querySelector('#shabab-listing-1 .ppcs_list_content'), {
			  x: -100,
			  // y: 100,
			  autoAlpha: 0,
			  ease: "power1.inOut",
			  duration: 1,
			  delay: 1,
			  pinSpacing: false,
			  scrollTrigger: {
				  trigger: section,
				  start: '10% 60%',
				  once: true
			  },
		  })
	  });
	  document.querySelectorAll('#shabab-listing-2.ppcs_list li').forEach(section => {
		  gsap.from(section.querySelector('#shabab-listing-2 .ppcs_list_content'), {
			  x: -100,
			  // y: 100,
			  autoAlpha: 0,
			  ease: "power1.inOut",
			  duration: 1,
			  delay: 0,
			  scrollTrigger: {
				  trigger: section,
				  start: '10% 98%',
				  once: true
			  },
		  })
	  });
    //console.log('min-width:1024px')
  },
  "(min-width: 960px)": function() {


    // gsap.utils.toArray(".what_we_do_section ul, .ppcs_section ul").forEach(section => {
    //   gsap.from(section.querySelectorAll("li"), {
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //     ease: "power1.inOut",
    //     autoAlpha: 0,
    //     x: -100,
    //     delay: 1,
    //     duration: 1,
    //     // toggleActions: "play pause resume reset",
    //     //stagger: 0.30
    //   });
    // });
    
    
    const headings_right = gsap.utils.toArray(".fall_animate.animate_init_right.desktop");
    
    headings_right.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top",
          end: "bottom",
          scrub: true,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass:  "animate_right",
          once: true
        }
      })
    });
    
    const headings_left = gsap.utils.toArray(".fall_animate.animate_init_left.desktop");
    
    headings_left.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top",
          end: "bottom",
          scrub: true,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass:  "animate_left",
          once: true
        }
      })
    });
    
    const headings_top = gsap.utils.toArray(".fall_animate.animate_init_top.desktop");
    
    headings_top.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top",
          end: "bottom",
          scrub: true,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass:  "animate_top",
          once: true
        }
      })
    });
    const headings_down = gsap.utils.toArray(".fall_animate.animate_init_down.desktop");
    
    headings_down.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top",
          end: "bottom",
          toggleActions: 'play pause pause reset',
          scrub: true,
          duration: 1,
          markers: false,
          toggleClass:  "animate_down",
          once: true
        }
      })
    });
    
  const tlCards = gsap.timeline({
    scrollTrigger: {
      trigger: ".pincer_animate",
      scrub: true,
      pin: true,
      duration: 1,
      pinSpacing: true,
      start: "top top",
      end: "+=100%",
    },
  });
  
  tlCards.to(".left_img_shadow", {
    ease: Linear.easeNone,
    duration: 1,
    opacity: 0,
    delay: 1,
  })
    .to(".right_img_shadow", {
      ease: Linear.easeNone,
      duration: 1,
      opacity: 0,
    })
    .to(".sh_go_crazy_sep", {
      width: "0",
      height: "0",
      ease: Linear.easeNone,
      duration: 1,
      opacity: 0,
    })
    .to(".sh_crazy_left", {
      width: "26%",
      left: "48%",
      rotation: "106",
      scale: 0.7,
      top: "0",
      transformOrigin: "left center",
      ease: Linear.easeNone,
      opacity: 1,
      duration: 2,
    })
    .to(".sh_crazy_right", {
      width: "26%",
      right: "51%",
      rotation: "-120",
      scale: 0.7,
      top: "90",
      transformOrigin: "right center",
      ease: Linear.easeNone,
      opacity: 1,
      duration: 2,
      delay: -2,
    }).to('.go_crazy_content_left', {
      opacity: 1,
      marginTop: '110px',
      visibility: 'visible',
      transition: 'all 0.7s',
      duration: 2,
    }).to('.go_crazy_content_right', {
      opacity: 1,
      marginTop: '235px',
      marginBottom: '-235px',
      visibility: 'visible',
      transition: 'all 0.7s',
      duration: 2,
      delay: -2
    })




  // Scroll Scenes 
  const scenes = gsap.utils.toArray('.scene');
  if(scenes.length > 0){
    hasTimeLine = true;
  }

  // maybe use dymanic height for pin/scroll ends?
  const height = (scenes.length) == 1 ?(((scenes.length) * 100) + '%'):(((scenes.length - 1) * 100) + '%');

  // Scenes Timeline
  const pinTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scenes__items",
      pin: ".scenes",
      start: "center center",
      end: `+=${height}`,
      // onEnterBack: () => startVideo(scenes[scenes.length - 1]),
      scrub: true,
    },
    onComplete: function() {
      if (!timelineInitialized) {
        timelineInitialized = true;
        if(window.location.hash) {
          var targetSection = $(window.location.hash);
          if(targetSection.length) {
            var offset = targetSection.offset().top;
            $('html, body').animate({
              scrollTop: offset
            }, 1000);
          }
        }
      }
    }
  });

  // Set scenes wrapper to absolute
  gsap.set(scenes, { position: "absolute", top: 0 });

  // Loop over scenes
  scenes.forEach(function (elem, i) {

    // Vid start / pause logic
    pinTl.add(() => pinTl.scrollTrigger.direction > 0 ? startVideo(elem, i) : stopVideo(elem, i), i + 0.001);

    if (i != 0) {
      // Scene Enter animations
      pinTl.from(elem.querySelector('.scene__figure'), {
        autoAlpha: 0
      }, i
      )

      pinTl.from(elem.querySelector('.scene__header'), {
        autoAlpha: 0,
        translateY: 100
      }, i
      )
    }

    // Scene Exit animations
    if (i != scenes.length - 1) {
      pinTl.to(elem.querySelector('.scene__header'), {
        autoAlpha: 0,
        translateY: -100
      }, i + 0.75
      )
      pinTl.to(elem.querySelector('.scene__figure'), {
        autoAlpha: 0
      }, i + 0.75
      )
    }

    // Vid start / pause logic
    pinTl.add(() => pinTl.scrollTrigger.direction > 0 ? stopVideo(elem, i) : startVideo(elem, i), i + 1.25);

  });

  // add a tiny amount of empty space at the end of the timeline so that the playhead trips the final callback in both directions
  pinTl.to({}, { duration: 0.001 });

  /** 
   * Start Video 
   * @param {HTML ELement} - element containing video
   */
  function startVideo(vidScene, i) {
    const vid = vidScene.querySelector('video');
    console.log("start", i);
    if (vid) {
      // console.log("Start Vid", vid)
      vid.play();
      vid.currentTime = 0;
    }
  }


  /** 
   * Stop Video 
   * @param {HTML ELement} - element containing video
   */
  function stopVideo(vidScene, i) {
    const vid = vidScene.querySelector('video');
    console.log("stop", i);
    if (vid) {
      // console.log("end vid", vid)
      vid.pause();
    }
  }
  },


  "(max-width: 500px)": function(){


  
  
      $('.desktop_loadmore .light_btn').click(function () {
        $('.animate__left').addClass('active');
        $('.animate_yesit').addClass('active');
  
  
  
      const buttons156 = gsap.utils.toArray('.animate_yesit.active');
      buttons156.forEach((btn) => {
        gsap.from(btn, {
          scrollTrigger: {
            start: 'top bottom',
            end: 'bottom top',
            trigger: btn,
            toggleClass: 'from__bottom_init',
            once: true,
          }
        });
      });
      const buttons125 = gsap.utils.toArray('.animate__left.active');
      buttons125.forEach((btn) => {
        gsap.from(btn, {
          scrollTrigger: {
            start: 'top bottom',
            end: 'bottom top',
            trigger: btn,
            toggleClass: 'from__left_init',
            once: true,
          }
        });
      });
  
      ScrollTrigger.refresh();
  });

  
  
  
  
  $('.desktop_loadmore .light_btn').click(function () {
    $('.mobile_tooltip_boxes').addClass('active');
  });
   
    ScrollTrigger.config({ limitCallbacks: true })
  
    // document.querySelectorAll('.ppcs_list li').forEach(section => {
    //   gsap.from(section.querySelector('.ppcs_list_content'), {
    //     x: -100,
    //     // y: 100,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     delay: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });

    // document.querySelectorAll('.what_we_do_section .ppcs_list li').forEach(section => {
    //   gsap.from(section.querySelector('.ppcs_list_content'), {
    //     x: -100,
    //     // y: 100,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     delay: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
  
    document.querySelectorAll('.title_block_awedeal').forEach(section => {
      gsap.from(section.querySelector('h2'), {
        //x: 100,
        y: 100,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });
  
    document.querySelectorAll('.title_block_awedeal').forEach(section => {
      gsap.from(section.querySelector('p'), {
        //x: 100,
        y: 100,
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: '20% 75%',
          once: true
        },
      })
    });
  
  
      document.querySelectorAll('.animate_yesit').forEach(section => {
        gsap.from(section.querySelector('h2'), {
          //x: 100,
          y: 100,
          autoAlpha: 0,
          ease: "power1.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: '20% 75%',
            once: true
          },
        })
      });
  
    // document.querySelectorAll('#sh_go_crazy_mob .left_sc_img1').forEach(section => {
    //   gsap.from(section.querySelector('.card_img'), {
    //     x: 150,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
    //
    // document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content1').forEach(section => {
    //   gsap.from(section.querySelector('h2'), {
    //     x: 100,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
    // document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content1').forEach(section => {
    //   gsap.from(section.querySelector('ul'), {
    //     x: 100,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
    //
    // document.querySelectorAll('#sh_go_crazy_mob .left_sc_img2').forEach(section => {
    //   gsap.from(section.querySelector('.card_img2'), {
    //     x: 150,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
    //
    // document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content2').forEach(section => {
    //   gsap.from(section.querySelector('h2'), {
    //     x: 100,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
    // document.querySelectorAll('#sh_go_crazy_mob .go_crazy_content2').forEach(section => {
    //   gsap.from(section.querySelector('ul'), {
    //     x: 100,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power1.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });

  
    // document.querySelectorAll('.split-transfer-manage .stm_left').forEach(section => {
    //   gsap.from(section.querySelector('.stm_box'), {
    //     x: 100,
    //     // y: 200,
    //     autoAlpha: 0,
    //     ease: "power3.inOut",
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: section,
    //       start: '20% 75%',
    //       once: true
    //     },
    //   })
    // });
 
    const headings_right = gsap.utils.toArray(".fall_animate.animate_init_right");
  
    headings_right.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top bottom",
          //end: "bottom",
          scrub: false,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass: "animate_right",
          once: true
        }
      })
    });
  
    const headings_left = gsap.utils.toArray(".fall_animate.animate_init_left");
  
    headings_left.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top bottom",
          //end: "bottom",
          scrub: false,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass: "animate_left",
          once: true
        }
      })
    });
  
    const headings_top = gsap.utils.toArray(".fall_animate.animate_init_top");
  
    headings_top.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top bottom",
          //end: "bottom",
          scrub: false,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass: "animate_top",
          once: true
        }
      })
    });
    const headings_down = gsap.utils.toArray(".fall_animate.animate_init_down");
  
    headings_down.forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top bottom",
          //end: "bottom",
          scrub: false,
          duration: 1,
          toggleActions: 'play pause pause reset',
          markers: false,
          toggleClass: "animate_down",
          once: true
        }
      })
    });
  
  },
  
  "(min-width: 1920px)": function() {
	  const tlCards = gsap.timeline({
		  scrollTrigger: {
			  trigger: ".pincer_animate",
			  scrub: true,
			  pin: true,
			  duration: 1,
			  pinSpacing: true,
			  start: "top top",
			  end: "+=98%",
		  },
	  });

	  tlCards.to(".left_img_shadow", {
		  ease: Linear.easeNone,
		  duration: 1,
		  opacity: 0,
		  delay: 1,
	  })
	  .to(".right_img_shadow", {
		  ease: Linear.easeNone,
		  duration: 1,
		  opacity: 0,
	  })
	  .to(".sh_go_crazy_sep", {
		  width: "0",
		  height: "0",
		  ease: Linear.easeNone,
		  duration: 1,
		  opacity: 0,
	  })
	  .to(".sh_crazy_left", {
		  width: "26%",
		  left: "48%",
		  rotation: "106",
		  scale: 0.7,
		  top: "0",
		  transformOrigin: "left center",
		  ease: Linear.easeNone,
		  opacity: 1,
		  duration: 2,
	  })
	  .to(".sh_crazy_right", {
		  width: "26%",
		  right: "51%",
		  rotation: "-120",
		  scale: 0.7,
		  top: "90",
		  transformOrigin: "right center",
		  ease: Linear.easeNone,
		  opacity: 1,
		  duration: 2,
		  delay: -2,
	  }).to('.go_crazy_content_left', {
		  opacity: 1,
		  marginTop: '110px',
		  visibility: 'visible',
		  transition: 'all 0.7s',
		  duration: 2,
	  }).to('.go_crazy_content_right', {
		  opacity: 1,
		  marginTop: '235px',
		  marginBottom: '-235px',
		  visibility: 'visible',
		  transition: 'all 0.7s',
		  duration: 2,
		  delay: -2
	  })
  },

    "all": function() {
      ScrollTrigger.config({ limitCallbacks: true })


      document.querySelectorAll('.title_block_crazy').forEach(section => {
        gsap.from(section.querySelector('h2'), {
          //x: 100,
          y: 100,
          autoAlpha: 0,
          ease: "power1.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: '20% 75%',
            once: true
          },
        })
      });
    }

}); 

	}, (window.outerWidth <= 767) ? 1500 : 3000);

});


