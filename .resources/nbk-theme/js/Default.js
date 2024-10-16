/**
* Copyright (c) 2008, Impact Proximity
* All rights reserved.
* @author Jerome Conde <j.conde@impactbbdo.ae>
*/

$(function(){

	//global vars
	var locale = "en_gb";
	if(window.location.href.indexOf("ar_ae") > 0)
	locale = "ar_ae";
	
	var isIE = $.browser.msie;
	var isIE6 = isIE && ($.browser.version == 6.0);
	
	var swfEnabled = false;
	swfEnabled = typeof swfobject == "object" && swfobject.hasFlashPlayerVersion("8.0");
	
	if(typeof assetPath == "undefined") assetPath = "";
	if(typeof networkSWF == "undefined") networkSWF = "";
	if(typeof networkShell == "undefined") networkShell = "";
	
	//home page global sites
	$("div.LocalBanksWrap").each(function(){
		var $t = $(this);
		var $ul = $t.find(".OptionList");
		var $ulG = $t.find(".Global .OptionList");
		var $li = $ul.find("> li");
		var $div = $li.find('div div');
		
		//$div.height($ul.height()-20);
		//$ulG.find('div div').height($ulG.height()-20);
		//$ulG.find('li:first div div').height($ulG.height()+20);
		
		$li.hover(
			function(){
			 $(this).addClass('Selected');
			 $(this).find("> ul, > div").fadeIn();
			},
			function(){
			 $(this).removeClass('Selected');
				$(this).find("> ul, > div").fadeOut();
			}
		);
		
	});
	
	// news ticker handler
	$("div.NewsTicker").each(function(){
		var $t = $(this), $temp = $("h2",$t), $list = $(".TickerList",$t);
		var $lastLI = $("li:first",$list).clone();
		$lastLI.appendTo($list);
		
		/*$temp.bind('click',function(){
			$("li:visible:first",$list).animate({marginTop:-40},800,function(){
				$(this).css({display:'none'});
				if($("li:visible",$list).length == 1) $("li",$list).css({marginTop:0}).show();
			});
		});*/
		setInterval(function(){
			(function(){
				$("li:visible:first",$list).animate({marginTop:-40,opacity:0},800,function(){
					$(this).css({display:'none'});
					if($("li:visible",$list).length == 1) $("li",$list).css({marginTop:0,opacity:1}).show();
				});
			})();
		},4000);
	});
	
	// open link in a new window
	var externalLinks = function(){
 $('a[rel=external],a[rel=External]').bind('click',function(){$(this).attr('target','_blank')});
 }
 externalLinks();
	
	//sucker fish solution for ie6
	var sfhover = function(){
		$('ul.Nav2 > li,ul.Nav2 li ul > li').hover(
			function(){$(this).addClass('sfhover')},
			function(){$(this).removeClass('sfhover')}
		)
		;
	}
	sfhover();
	var hasChild = function(){
		$("ul.Nav2 li li ul").each(function(){
			$(this).parent().addClass("HasChild");			
		})
		;
	}
	hasChild();
	
	//swap active image on hover of main menu
	var swapImage = function(){
		$("ul.Nav2 > li").hover(
			function(){
				if($(this).hasClass("Selected")) return;
				var imgPath = $(this).find("img:first").attr("src");
				$(this).find("img:first").attr("src",imgPath.replace(".gif","Active.html"));
			},
			function(){
				if($(this).hasClass("Selected")) return;
				var imgPath = $(this).find("img:first").attr("src");
				$(this).find("img:first").attr("src",imgPath.replace("Active.html",".gif"));
			}
		);
		$("ul.Nav2 > li.Selected > a:first img").each(function(){
			var imgPath = $(this).attr("src");
			$(this).attr("src",imgPath.replace(".gif","Active.html"));
		});
	}
	swapImage();
	
	//add 'FirstChild' and sfhover class for ie6 */
	var firstChild = function(){
		$("li:first-child, td:first-child, th:first-child").addClass("FirstChild");
	}
	var lastChild = function(){
		$("li:last-child, td:last-child, th:last-child").addClass("LastChild");
	}
	lastChild();
	
	if($.browser.msie && $.browser.version == "6.0") {
		firstChild();
		sfhover();
		try { document.execCommand("BackgroundImageCache", false, true); } catch(err) {}
	}
	
	//auto text handler
	$("div.Header input.Textbox,div.FAQSearch input.Textbox")
	.each(function(){
		var autoText = "";
		var defaultText = $(this).val();
		$(this).bind('focus',function(){
		autoText = $(this).val();
		if(autoText == defaultText) $(this).val("");
		})
		.bind('blur',function(){
			if($(this).val() == "")
			$(this).val(defaultText);
		});
	});
	
	//scroll page up to have visual on main banner
	var scrollLimit = $(document).height() - $(window).height();
	var scrollPageDown = function(){
		setTimeout(function(){
			var top = $(window).scrollTop();
			if(top >= scrollLimit) return;
			$(window).scrollTop(top+10);
			scrollPageDown();
		},5);
	}
	
	//generic function to render swf captions
		var swfCaption = function($x,idPrefix,fontColor2){
			$x.each(function(){
				var $me = $(this);
				var i = $x.index($me);
				var _id = idPrefix + i;
				var _text = escape($me.text());
				var _size = parseInt($me.css("fontSize"));
				var _w = $me.width();
				var _h = $me.height();
				var attrs = {};
				var _params = {wmode:'transparent'};
				var fVars = {
					caption:_text,
					fontcolor:"#5b708c",
					fontcolor2:"#5b708c",
					bgcolor:"transparent",
					letterspacing:-.3,
					xposition:0,
					fontsize:_size,
					width:_w,
					height:_h
				};
				if(fontColor2) fVars.fontcolor2 = fontColor2;

				$me.wrapInner("<span class='AltText' />").find("span").css({display:'none'}).end()
				.append("<div class='SwfHolder' />").find(".SwfHolder").attr("id",_id);
				
				//embed swf caption control
				swfobject.embedSWF(captionControlPath, _id , _w, _h, "8.0","http://nbk.com/$Common/Flash/expressInstall.swf", fVars, _params, attrs);
			});
		}
		var headers = "div.Block h3";
		headers += ",div.Block5 h3";
		headers += ",div.CopyHeader h2";
		headers += ",div.CopyHeader h3";
		headers += ",div.TVCWrap h2 ";
		headers += ",div.Block1 h4";
		headers += ",div.Network h2";
		//headers += ",div.CopyHeader p";
  if(locale == "en_gb") swfCaption($(headers),"SwfCaption");
  
  // fancy select box
  var selectBox = function(){
  $('a.DropDown').each(function(){
   $(this).click(function(){
    $('ul.OptionList').not($(this).next()).slideUp(200);
    $(this).next().slideToggle(200);
    return false;
   });
  });
  $('ul.OptionList li a:first').click(function(){
   return false;
   //$(this).parent().parent().parent().find('span:first').text($(this).text());
   //$('ul.OptionList').slideUp(200);
  });
 }
 selectBox();
 
 // Sitemap show hide
 var sitemap = function(){
  var $sitemap = $('div.Sitemap div');
  var $status = true;
  var $sitemapH = $('div.Sitemap div').height();;
  var $button = $('p.ShowHide img');
  
  var hide = function(){
   $sitemap.animate({height:0},1000);
   $button.attr('src',$button.attr('src').replace('HideSitemap','ShowSitemap'));
   scrollLimit = $(document).height() - $(window).height();
   $status = false;
  }
  hide();
  
  var show = function(){
   $sitemap.animate({height:$sitemapH},1000);
   $button.attr('src',$button.attr('src').replace('ShowSitemap','HideSitemap'));
   scrollPageDown();
   $status = true;
  }
  
  $button.click(function(){
   if($status) hide();
   else show(); 
   return false;
  });
 }
 if($('div.Sitemap').length) sitemap();
 
 // Tabs show hide
 var tabs = function(){
  var $tabs = $('ul.Tabs li');
  var $pane = $('div.Pane');
  var tabIndex = parseInt($.qString({id:'tabIndex'},location));
  
  if(tabIndex && $tabs.eq(tabIndex).length){
   $tabs.removeClass('Selected');
   $pane.hide();
   $tabs.eq(tabIndex).addClass("Selected");
   $pane.eq(tabIndex).show(500);
  }
		else $tabs.find("li:first").addClass("Selected");
  
  var $index = $tabs.index($('ul.Tabs li.Selected'));
  $pane.eq($index).show(500);
  
  $tabs.each(function(){
   $(this).bind('click',function(){
    
    $index = $tabs.index($(this));
    var $cur = $pane.eq($index);
    var $H = $cur.height();
    
    $tabs.removeClass('Selected');
    $(this).addClass('Selected');
    $pane.hide();
    
    if(!isIE)$cur.fadeIn('slow');
    $cur.css({height:0});
    $cur.animate({height:$H},500,'easeOutQuad');
    
    return false;
   })   
  });
 }
 tabs();
 
 var showHideCountry = function(){
	 var $li = $('ul.List6 > li');
	 var $div = $('ul.List6 li div');
	 var tabIndex = parseInt($.qString({id:'tabIndex'},location));
	 
	 if(tabIndex && $li.eq(tabIndex).length){
   $li.removeClass('Selected');
	  $div.slideUp(500);
   $li.eq(tabIndex).addClass("Selected");
   $li.eq(tabIndex).find('div').fadeIn(500);
  }
		else $li.eq(0).addClass('Selected').find('div').fadeIn('slow');
	 
	 $li.find('a:first').bind('click',function(){
	  if($(this).parent().hasClass('Selected')) return;
	  $li.removeClass('Selected');
	  $div.slideUp(500);
	  $(this).parent().addClass('Selected'); 
	  $(this).parent().find('div').fadeIn(500);
	  return false;
	 })
	}
	showHideCountry();
 
 //Image Library
 var photos = function(){
  
  var $Preview = $('.Preview img:not(".Overlay")');
		var $Thumbs = $('.Thumbs li');
		var $leftButton = $('.Prev');
		var $rightButton = $('.Next');
		var $info = $('div.Preview p');
		
		$Preview.attr('src',$Thumbs.find('a:first').attr('href'));  
		$info.text($Thumbs.find('a:first').attr('rel'));  
		$('.Thumbs li:first')
		 .addClass('Selected')
		 .css({opacity:.4});;
		
		//initialize width of UL
		var $UL = $('.Thumbs ul');
		var LIs = $UL.find('li').length;
		var LIwidth = 95 + 10;
		$UL.css({width:LIs * LIwidth});
		
		// gallery click event handler
		$Thumbs.bind ('click',function(){
		 $Thumbs
		 .removeClass('Selected')
		 .css({opacity:1});
		 $(this).animate({opacity:.4},200);
		 $(this).addClass('Selected');
			$Preview.attr('src',$(this).find('a').attr('href'));
			$info.text($(this).find('a').attr('rel'))
			return false; 
		});
		
		//attach click event to scroll buttons
		$rightButton.bind('click',function(){
			//scroll UL to the left
			var currLeft = parseInt($UL.css('left'));
			var offset = 3 * 105;
			if($UL.width() - currLeft*-1 < 420) return false;
			$UL.animate({left:currLeft - offset},500);
		 return false;
		});
		$leftButton.bind('click',function(){
			var currLeft = parseInt($UL.css('left'));
			var offset = 3 * 105;
			if(currLeft >= 0) return false;
			$UL.animate({left:currLeft + offset},500);
			return false;
		});
 }
 photos();
 
 // NBK Network
 var network = function(){
  var flashvars = {
	 	width:945,
	 	height:368,
	 	decache:'090325A',
	  language:'English',
	  bgcolor:'transparent',
	  filepath:networkSWF
	 };
	 var params = {
	  wmode:'transparent'
	 };
	 var attributes = false;
	 $("#Network").empty().append('<div id="networkSWF" />');
	 swfobject.embedSWF(networkShell, 'networkSWF', 945, 368, '10.0','http://nbk.com/$Common/Flash/expressInstall.swf', flashvars, params, attributes);
 }
 network();
 
 // Homepage IVC
 var tvcHome = function(){
  var flashvars = {
	 	width:320,
	 	height:227,
	 	decache:'090330B',
	  filename:'Homepage/tvcHome_'+locale+'.flv'
	 };
	 var params = {
	  wmode:'transparent'
	 };
	 var attributes = false;
	 swfobject.embedSWF('http://nbk.com/$Common/Flash/videoplayer.swf?3', 'TVC', 320, 227, '8.0','http://nbk.com/$Common/Flash/expressInstall.swf', flashvars, params, attributes);
 }
 tvcHome();
 
 // About page Video
 var aboutVideo = function(){
  var flashvars = {
	 	width:320,
	 	height:227,
	  filename:'About/Dabdoub.flv'
	 };
	 var params = {
	  wmode:'transparent'
	 };
	 var attributes = false;
	 swfobject.embedSWF('http://nbk.com/$Common/Flash/Innervideoplayer.swf?3', 'Video', 320, 227, '8.0','http://nbk.com/$Common/Flash/expressInstall.swf', flashvars, params, attributes);
 }
 aboutVideo();
 
 if($('ul.Nav3 li').length <= 0) $('ul.Nav3').remove(); 
 
 if(window.location.href.indexOf("/Contact_") > 0 || window.location.href.indexOf("/contact_") > 0) $('div.Copy').addClass('Contact');
 if(window.location.href.indexOf("/ApplyNow_") > 0 || window.location.href.indexOf("/applynow_") > 0) $('div.Copy').addClass('Apply');
 
 // allow only numeric key strokes
	var numericFilter = function(e,func){
		//fix single quot bug
		if(e.charCode == 39 && e.keyCode == 0) {return false;}
		if(e.charCode == 39 && e.keyCode == 39 || e.charCode == null && e.keyCode == 39) {return false;}
		code = getCharCode(e);
		if(func && !func(code)) return false;
		var validKey = (code > 47 && code < 58);
		//validKey = validKey || (code > 95 && code < 106);
		validKey = validKey || code == 13 || code == 32 || code == 8 || code == 9 || code == 16 || code == 36 || code == 37 || code == 39 || code == 46;
		return validKey;
	}
	
	/*handler for Label - textbox overlap*/
	$(".Customer,.Vacancy").each(function(){
		var $c = $(this),$yes = $('input:radio:first',$c),$no = $('input:radio:eq(1)',$c),$overlap = $('.Overlap',$c),
			$txt = $(".Textbox",$overlap), $lbl = $("label",$overlap);
			
		if(!$yes.is(':checked')) $overlap.css({display:'none'});
		$yes.bind('click',function(){$overlap.show()});
		$no.bind('click',function(){$overlap.hide()});
		
		if($txt.val() != "") $lbl.css({display:'none'});
		
		$overlap.bind('click',function(){
			$lbl.css({display:'none'});
			$txt.focus();
		});
		$txt.bind('blur',function(){
			if($txt.val() == "") $lbl.css({display:'block'});
		});
		
	});
	
	//$master = $('<div class="Master" />');
	//$('div.Page,div.Sitemap,div.Footer').appendTo($master);
	//$master.appendTo('body');
	
	// Overlay video players
	$("ul.Video > li").each(function(){
		var $me = $(this),$first = $("a:first",$me), $third = $("a:eq(2)",$me);
		$first.bind('click',function(){
				//call video player
				overlayPlayer($(this));
				return false;
			});
		$third.bind('click',function(){$first.trigger('click');return false;});
	});
	var overlayPlayer = function($thumb){
		var pageH = $("body").innerHeight();
		var $overlay = $("<div class='Overlay' />").css({
			width:'100%',height:pageH,opacity:.8});
		$overlay.appendTo("body");
		var $player = $("<div class='Player' />").css({
			position:'absolute',left:($overlay.width()/2)-176,top:($thumb.offset().top)-100});
		$player.appendTo("body");
		
		var $title = $("<span class='Title' />").text($thumb.next('h5').text()).appendTo($player);
		var $close = $("<a class='Close' />").appendTo($player);
		var $flv = $("<div class='FlvPlayer' />").appendTo($player);
		$flv.append("<div id='FlvPlayer' />");
		
		
		var flashvars = {width:320,height:261,background:'#ddd000',filename:$thumb.get(0).href};
		var swfUrl = 'http://nbk.com/$Common/Flash/TVCplayer.swf';
		var express = 'http://nbk.com/$Common/Flash/expressInstall.swf';
		swfobject.embedSWF(swfUrl, 'FlvPlayer', flashvars.width, flashvars.height, '8.0', express, flashvars, {wmode:'transparent'}, {})
		
		
		$close.click(function(){removeOverlay()});
	}
	var removeOverlay = function(){
		$("div.Player,div.Overlay").remove();
	}
	
	var _PopUp = function(){
  $('a[rel=popup]').bind('click',function(){
   var left = (screen.width/2) - 335;
   var top = (screen.height/2) - 370;
   var popup;
   popup = window.open(this.href,'popup','width=720,height=740,scrollbars=no,left='+left+',top='+top+'','status=1,toolbar=0');
   return false;
   if(popup.name == "popup" && popup.focus) popup.focus();
   return false;
  })
 }
 _PopUp();
 
 if($('div.CopyHeader img').attr('src') == ''){
  $('div.CopyHeader img').remove();
  if(locale == 'en_gb') $('div.CopyHeader p').css({width:'100%','padding-right':0});
  else $('div.CopyHeader p').css({width:'100%','padding-left':0});
 }
 
 if($('div.CopyHeader p').text() == ''){
  $('div.CopyHeader p').remove();
 }
 
});

//Query String jQuery extension
(function($){$.qString=function(options){defaults={defaultvalue:"null"};options=$.extend(defaults,options);if(options.theURL){qs=options.theURL.split("?")[1];}else{qs=location.search.substring(1,location.search.length);}if(qs.length==0)return options.defaultvalue;qs=qs.replace(/\+/g,' ');var args=qs.split('&');for(var i=0;i<args.length;i++){var value;var pair=args[i].split('=');var name=unescape(pair[0]);if(pair.length==2){value=unescape(pair[1]);}else{value=name;}if(name==options.id||i==options.id-1){return value;}}return options.defaultvalue};})(jQuery);
