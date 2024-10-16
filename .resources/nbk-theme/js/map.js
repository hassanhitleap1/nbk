$('document').ready(function() {
 
 $('.pulse.small').click(function() {
  $(this).parent().find('.country-map').fadeIn('');
 });
 $('.pulse.small').hover(
  function() {
   //$(this).next('.tool-tip').show().stop(true, false);
  }
 );
 $('.newyork').click(function() {
  $('.usa').fadeIn();
 });
 $('.unitedkingdom').click(function() {
  $('.uk').fadeIn();
 });
 $('.france').click(function() {
  $('.fr').fadeIn();
 });
 $('.geneva').click(function() {
  $('.ch').fadeIn();
 });
 $('.turkey').click(function() {
  $('.tr').fadeIn();
 });
 $('.egypt').click(function() {
  $('.eg').fadeIn();
 });
 $('.jordan').click(function() {
  $('.jo').fadeIn();
 });
 $('.lebanon').click(function() {
  $('.lb').fadeIn();
 });
 $('.iraq').click(function() {
  $('.iq').fadeIn();
 });
 $('.kuwait').click(function() {
  $('.kw').fadeIn();
 });
 $('.bahrain').click(function() {
  $('.bh').fadeIn();
 });
 $('.qatar').click(function() {
  $('.qa').fadeIn();
 });
 $('.uae').click(function() {
  $('.ae').fadeIn();
 });
 $('.saudia').click(function() {
  $('.ksa').fadeIn();
 });
 $('.uae').click(function() {
  $('.ae').fadeIn();
 });
 $('.china').click(function() {
  $('.cn').fadeIn();
 });
 $('.singapore').click(function() {
  $('.sg').fadeIn();
 });
 $('.vietnam').click(function() {
  $('.vn').fadeIn();
 });
 $('.usa .back-btn').click(function() {
  $('.details').fadeOut();
  $('.usa').fadeOut();
 });
 $('.ae .back-btn').click(function() {
  $('.details').fadeOut();
  $('.ae').fadeOut();
 });
 $('.kw .back-btn').click(function() {
  $('.details').fadeOut();
  $('.kw').fadeOut();
 });
 $('.jo .back-btn').click(function() {
  $('.details').fadeOut();
  $('.jo').fadeOut();
 });
 $('.iq .back-btn').click(function() {
  $('.details').fadeOut();
  $('.iq').fadeOut();
 });
 $('.bh .back-btn').click(function() {
  $('.details').fadeOut();
  $('.bh').fadeOut();
 });
 $('.lb .back-btn').click(function() {
  $('.details').fadeOut();
  $('.lb').fadeOut();
 });
 $('.eg .back-btn').click(function() {
  $('.details').fadeOut();
  $('.eg').fadeOut();
 });

 $('.qa .back-btn').click(function() {
  $('.details').fadeOut();
  $('.qa').fadeOut();
 });
 $('.uae .back-btn').click(function() {
  $('.details').fadeOut();
  $('.uae').fadeOut();
 });
 $('.ksa .back-btn').click(function() {
  $('.details').fadeOut();
  $('.ksa').fadeOut();
 });
 $('.uk .back-btn').click(function() {
  $('.details').fadeOut();
  $('.uk').fadeOut();
 });
 $('.fr .back-btn').click(function() {
  $('.details').fadeOut();
  $('.fr').fadeOut();
 });
 $('.tr .back-btn').click(function() {
  $('.details').fadeOut();
  $('.tr').fadeOut();
 });
 $('.ch .back-btn').click(function() {
  $('.details').fadeOut();
  $('.ch').fadeOut();
 });
 $('.sg .back-btn').click(function() {
  $('.details').fadeOut();
  $('.sg').fadeOut();
 });
 $('.cn .back-btn').click(function() {
  $('.details').fadeOut();
  $('.cn').fadeOut();
 });
 $('.vn .back-btn').click(function() {
  $('.details').fadeOut();
  $('.vn').fadeOut();
 });
 /* */
 $('.kuwait').hover(function() {
  $('.countries .kuwait .tool-tip').stop().fadeToggle()
 });
 $('.jordan').hover(function() {
  $('.countries .jordan .tool-tip').stop().fadeToggle()
 });
 $('.iraq').hover(function() {
  $('.countries .iraq .tool-tip').stop().fadeToggle()
 });
 $('.bahrain').hover(function() {
  $('.countries .bahrain .tool-tip').stop().fadeToggle()
 });
 $('.lebanon').hover(function() {
  $('.countries .lebanon .tool-tip').stop().fadeToggle()
 });
 $('.egypt').hover(function() {
  $('.countries .egypt .tool-tip').stop().fadeToggle()
 });
 $('.qatar').hover(function() {
  $('.countries .qatar .tool-tip').stop().fadeToggle()
 });
 $('.uae').hover(function() {
  $('.countries .uae .tool-tip').stop().fadeToggle()
 });
 $('.saudia').hover(function() {
  $('.countries .saudia .tool-tip').stop().fadeToggle()
 });
 $('.unitedkingdom').hover(function() {
  $('.countries .unitedkingdom .tool-tip').stop().fadeToggle()
 });
 $('.france').hover(function() {
  $('.countries .france .tool-tip').stop().fadeToggle()
 });
 $('.turkey').hover(function() {
  $('.countries .turkey .tool-tip').stop().fadeToggle()
 });
 $('.geneva').hover(function() {
  $('.countries .geneva .tool-tip').stop().fadeToggle()
 });
 $('.newyork').hover(function() {
  $('.countries .newyork .tool-tip').stop().fadeToggle()
 });
 $('.china').hover(function() {
  $('.countries .china .tool-tip').stop().fadeToggle()
 });
 $('.singapore').hover(function() {
  $('.countries .singapore .tool-tip').stop().fadeToggle()
 });
 $('.vietnam').hover(function() {
  $('.countries .vietnam .tool-tip').stop().fadeToggle()
 });
/* */
 $('.mena').hover(
  function() {
   $('.continents .mena').toggleClass('active');
  },
  function() {
   $('.continents .mena').toggleClass('active');
  }
 );
 $('.right-pane ul li.mena span, .continents .mena').click(
  function() {
   $('.countries .mena').fadeToggle();
   $('.countries .europe, .countries .americas, .countries .asia').fadeOut();
   $('.right-pane ul li.europe .subnav, .right-pane ul li.america .subnav, .right-pane ul li.asia .subnav').slideUp();
   $('.right-pane ul li.mena .subnav').slideToggle();
  }
 );
 $('.europe').hover(
  function() {
   $('.continents .europe').toggleClass('active');
  },
  function() {
   $('.continents .europe').toggleClass('active');
  }
 );
 $('.right-pane ul li.europe span, .continents .europe').click(
  function() {
   $('.countries .europe').fadeToggle();
   $('.countries .mena, .countries .americas, .countries .asia').fadeOut();
   $('.right-pane ul li.mena .subnav, .right-pane ul li.america .subnav, .right-pane ul li.asia .subnav').slideUp();
   $('.right-pane ul li.europe .subnav').slideToggle();
  }
 );
 $('.america').hover(
  function() {
   $('.continents .americas').toggleClass('active');
  },
  function() {
   $('.continents .americas').toggleClass('active');
  }
 );
 $('.right-pane ul li.america span, .continents .americas').click(
  function() {
   $('.countries .americas').fadeToggle();
   $('.countries .mena, .countries .europe, .countries .asia').fadeOut();
   $('.right-pane ul li.mena .subnav, .right-pane ul li.europe .subnav, .right-pane ul li.asia .subnav').slideUp();
   $('.right-pane ul li.america .subnav').slideToggle();
  }
 );
 $('.asia').hover(
  function() {
   $('.continents .asia').toggleClass('active');
  },
  function() {
   $('.continents .asia').toggleClass('active');
  }
 );
 $('.right-pane ul li.asia span, .continents .asia').click(
  function() {
   $('.countries .asia').fadeToggle();
   $('.countries .mena, .countries .europe, .countries .americas').fadeOut();
   $('.right-pane ul li.mena .subnav, .right-pane ul li.europe .subnav, .right-pane ul li.america .subnav').slideUp();
   $('.right-pane ul li.asia .subnav').slideToggle();
  }
 );


 $('.pulse.small').hover(function() {
  $('.pulse').toggleClass("two");
 });
 $('.right-pane ul li span').click(function() {
  $(this).toggleClass('active');
  $('.right-pane ul li span').removeClass('active');
 });
 //$('.uae .tool-tip').fadeOut()
});