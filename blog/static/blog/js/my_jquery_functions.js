
;(function ($,window,document,undefined){

	$.fn.extend({
	
		ripple:function(){     // ripple animation 

			return this.each(function(){
				var me=$(this);
				me.on("click",function(e) {
					var x=e.pageX,
						y=e.pageY;

					x=x-me.offset().left;
					y=y-me.offset().top;

					console.log(x,y);

					var ripple=$("<span class='ripple'></span>");

					ripple.css({
						left:x-2,
						top:y-2
					});
					$(".nav-pills")[0].style.overflow="hidden";
					me.append(ripple);

					ripple.on("animationend",function(){
							ripple.remove();
							$(".nav-pills")[0].style.overflow="visible";
						}
					);
				});

				
			});
		}
	});
})(jQuery,window,document);

$("document").ready(function(){
	console.log("1:"+document.body.scrollHeight+"!!!")
	var $grid=$('.dkContainer');
	//var currentUrl="";
	$(".rip").ripple();
	//$grid.ripple();

	function pushState(data,url){
		var state = {
	            url: window.location.pathname,
	            title: null,
	            html: data
	        };
		history.pushState(state,null,url);
		//console.log(history.state.url+"and"+window.location.href);
		console.log("\npushState:  CurrentUrl"+window.location.pathname+"  state.url="+history.state.url+"  nextUrl: "+url+" historylength: " +window.history.length);
	}

	function replaceState(data,url){
		var state = {
	            url: window.location.pathname,
	            title: null,
	            html: data
	        };
		history.replaceState(state,null,url);
		//console.log(history.state.url+"and"+window.location.href);
		console.log("\nreplaceState:  CurrentUrl"+window.location.pathname+"  state.url="+history.state.url+"  nextUrl: "+url+" historylength: " +window.history.length);
	}




	var $masonry=$grid.masonry({
	  itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true,
		//fitWidth:true,
		gutter:10,
		//resize:false;
		//containerStyle:{},

	});
	imgLoad($(".dkContainer"));
	//console.log(window.location.href);
	/*
	if(window.location.href==="http://127.0.0.1/blog/"){
		pushState($(".container").html(),window.location.href);
	}*/
	//history.replaceState($(".container").html(),window.location.pathname);


	console.log("\ninitialState:  CurrentUrl"+window.location.pathname+" historylength: " +window.history.length);


	/*$("#btn").click(function(){
		$.get('/blog/next').done(function(html){
			var $items=$(html)
	    	grid.append($items)
	    		.masonry( 'appended', $items);

		});
	});*/
		
	$grid.infinitescroll({

	    navSelector  : ".navigation",            
	                   // selector for the paged navigation (it will be hidden)
	    nextSelector : ".navigation a:first",    
	                   // selector for the NEXT link (to page 2)
	    itemSelector : ".grid-item",          
	                   // selector for all items you'll retrieve
		//debug:true,

		//animate:true,

		},function(html){
			console.log("infinitescroll!!!");
			//$(window).unbind('.infscr');
			//$(document).trigger('retrieve.infscr');
			var $items=$(html);

			imgLoad($items);
			

	});
	function imgLoad(items){
	  	var imgLength,
	      	count=0;
	      	imgLength=items.find("img").length;
	      	console.log("imgLength="+imgLength);
	      	if(imgLength==0){
	      		$grid.append(items)
	      			.masonry( 'appended', items);
	      		return;
	      	}
	      	items.find("img").on("load",function(){
	      		count++;
	      		if(count==imgLength){
	      			$grid.append(items)
	      				.masonry( 'appended', items);

	      		}

	      	});
	  }





	$grid.on("click",".grid-item",function(){
		var html="";
		href=$(this).children("a").eq(0).attr("href");
		console.log("this="+$(this).children("a").attr("href")+"!!!");
		console.log("href="+href+"!!!");
		//pushState(htmlNow,href);
		replaceState($grid.html(),window.location.pathname);
		
		var jqxhr=$.get(href).done(function(rtn){
			html=rtn;
		}).fail(function(){
			html="<p>failed!</p>"
		}).always(function(){
			
			//console.log("htmlNow:\n"+htmlNow);
			$grid.html(html);
			$("img").addClass("img-responsive");
			$grid.infinitescroll('unbind');
			//$("#navigation").removeClass("navigation");
			//$("#navigation").remove();
			//console.log("!!!html:"+$("img"));
			pushState(html,href);
			scroll(0,0);
			console.log("2:"+document.body.scrollHeight+"!!!")
			//currentUrl=href;
			//console.log("\nPushstate:"+history.state.url+" and "+window.location.pathname);
		});
	});


	window.addEventListener("popstate",function(event){
		
		
		if(event.state==null){
			alert("state null!!!");
			return;
		}
		$grid.html(event.state.html);
		console.log("rtnPathname:"+event.state.url+"  pathname:"+window.location.pathname);

		if(window.location.pathname==="/blog/" || window.location.pathname==="/blog/index/" || window.location.pathname==="/"){
			$grid.infinitescroll('bind');
			console.log("bind ok!");
		}
		else{
			$grid.infinitescroll('unbind');
			console.log("unbind infinitescroll!!!");
			console.log(window.location.pathname);
			window.location.pathname
		}

		//$grid.masonry();
		//console.log("\npopstate:"+history.state.url+" historylength: "+window.history.length);
		
	});

});
	

	






