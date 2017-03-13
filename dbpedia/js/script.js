	 function setDataToSubjectArticle(title,desc,pic){

			var imgHTML = document.getElementById("subject-pic");
			var titleHTML = document.getElementById("subject-title");
			var descHTML = document.getElementById("subject-description");

			imgHTML.src = pic;
			imgHTML.style.height = '200px';
	   		imgHTML.style.width = '300px';
	   		imgHTML.style.border= '8px solid white';
	   		imgHTML.style.boxShadow = '5px 5px 10px #888888';
			titleHTML.innerHTML = title;
			descHTML.innerHTML = desc;
		}
		$(document).ready(function(){
			$(document).ajaxStart(function(){
	    			$("body").addClass("loading"); 
			 	}).ajaxStop(function(){
	    			$("body").removeClass("loading"); 
	 		});

			window.offset =0;

			$('.banner').on('unslider.change', function(event, index, slide) {
			scrollSbj();

		});
		var nb =  $("#itemsNumber").val();
		var sbj = $("#criteria").val();
		var enter = false;
		$("#itemsNumber").focusout(function(){
			
			if(this.value == "" || this.value < 10 ){
				//this.value =10;
				enter =true;
			}
			else if(this.value >50){
				this.value =50;
				enter =true;
			}
			if(enter == true){
	 			offset=0;

				makeAjaxCall($("#criteria").val(),this.value);
			
			}
		});
	 	 function makeAjaxCall(sbj,nb){
				 	$.ajax({
							  type: "GET",
							  url: "getData.php",
							  dataType: "json",
							  data: {"sbj": sbj , "nb": nb,"offnb":0,"first":'true'},
							  success: function(data) {
							  	document.getElementById('slider-id').innerHTML ='<div class="banner"><ul id="ul-id"></ul></div>';


										  for (var i = 0 ;; i++) {									  			
											  	if(i==0){

													setDataToSubjectArticle(data[0].Title,data[0].Description,data[0].Picture);
											  	}else{										  	
			 											document.getElementById('ul-id').innerHTML += '<li>'+ 
											  			 '<div class="row"><div class="col-md-1"></div><div class="col-md-8"><h3 class="heading">'+data[i].Name+'</h2><p>'+data[i].Description+'</p></div><div class="col-md-3"><p><img style="opacity: 0.7;margin-top: 15px;border: 8px;border-color: white;border-style: solid;" width="273px" height="200px" src="'+data[i].Picture +'"/></p><p><h4>Origin : '+data[i].Origin+'</h4></p></div></div></li>';										  	
											  	}
											  	if(i==nb)
											  		break;
										    }
										

								    $('.banner').unslider({
								    	keys : true,
								    	selcetors:false,
								    	dots:false,
								    	arrows: {

													prev: '<button type="button" onclick="this.blur();" class="btn btn-link"><span class="glyphicon glyphicon-circle-arrow-left fa-2x"></span></button>',
													next: '<button type="button" onclick="this.blur();" class="pull-right btn btn-link"><span class="glyphicon glyphicon-circle-arrow-right fa-2x"></span></button>',
													prevK: '<button type="button" onclick="this.blur();" class="btn btn-link disabled id="prevK"><span class="glyphicon glyphicon-backward fa-2x"></span></button>',
													nextK:'<button type="button" onclick="clickedNext();" class="pull-right btn btn-link" id="nextK"><span class="glyphicon glyphicon-forward fa-2x"></span></button>'
												}
											})
								    if(data['off'] == 'false'){
								   		document.getElementById('nextK').className += " " + 'disabled';
								   	}
								   
								  		
								     scrollSbj();
								     scrollSld();

							    }
							    ,
					          error: function(data) {
				          	 		alert("Connection Error");
								}
							});}

		makeAjaxCall(sbj,nb);

		$("nav").remove();
		
		$body = $("body");


		$(".btn").mousedown(function(e){ e.preventDefault();});

		 $("html body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove hover", function(){
	       $(this).stop();
	   });
		function scrollSld(){$("html, body").delay(1000).animate({scrollTop: $('#slider-id').offset().top }, 2000);}
		function scrollSbj(){$("html, body").delay(1000).animate({scrollTop: $('#sbj').offset().top }, 2000);}

	 $("#criteria").on("change", function() {
	 	offset=0;
		var sbj = this.value;
		var nb = $("#itemsNumber").val();
				makeAjaxCall(sbj,nb); 
			
		});
	 

	 $("#itemsNumber").on("change", function() {
			enter = true;
		});

	 	 window.ajaxOffset = function (sbj,nb,offnb){
	 	 	
	 	 	$.ajax({
							  type: "GET",
							  url: "getData.php",
							  dataType: "json",
							  data: {"sbj": sbj , "nb": nb,"offnb" :offnb,"first":'false'},
							  success: function(data) {
							  	document.getElementById('slider-id').innerHTML ='<div class="banner"><ul id="ul-id"></ul></div>';

								  			

								  			for(var i=0 ;; i++){
								  				console.log(i);
								  													  		
										  		if(data['Type']){
											  			 document.getElementById('ul-id').innerHTML += '<li>'+ 
											  			 '<div class="row"><div class="col-md-1"></div><div class="col-md-8"><h3 class="heading">'+data[i].Name+'</h2><p>'+data[i].Description+'</p></div><div class="col-md-2"><p><img style="opacity: 0.7;margin-top: 15px;border: 8px;border-color: white;border-style: solid; width:273px; height:165px;" src="'+data[i].Picture +'"/></p><p><h4>Length : '+data[i].Length+' (m)</h4></p><p><h4>Weight : '+data[i].Weight+' (g)</h4></p></div><div class="col-md-1"></div></div></li>';
														
										  		}
										  		
										  		else{
		 										
		 											document.getElementById('ul-id').innerHTML += '<li>'+ 
										  			 '<div class="row"><div class="col-md-1"></div><div class="col-md-8"><h3 class="heading">'+data[i].Name+'</h2><p>'+data[i].Description+'</p></div><div class="col-md-2"><p><img style="opacity: 0.7;margin-top: 15px;border: 8px;border-color: white;border-style: solid;" width="273px" height="200px" src="'+data[i].Picture +'"/></p><p><h4>Origin : '+data[i].Origin+'</h4></p></div><div class="col-md-1"></div></div></li>';
										  			
										  		}
										  		if(i==nb-1)
									  					break;
									  	
								    }


								    $('.banner').unslider({
								    	keys : true,
								    	selcetors:false,
								    	dots:false,
								    	arrows: {

													prev: '<button type="button" onclick="this.blur();" class="btn btn-link"><span class="glyphicon glyphicon-circle-arrow-left fa-2x"></span></button>',
													next: '<button type="button" onclick="this.blur();" class="pull-right btn btn-link"><span class="glyphicon glyphicon-circle-arrow-right fa-2x"></span></button>',
													prevK: '<button type="button" onclick="clickedPrev();" class="btn btn-link disabled" id="prevK"><span class="glyphicon glyphicon-backward fa-2x"></span></button>',
													nextK:'<button type="button" onclick="clickedNext();" class="pull-right btn btn-link" id="nextK"><span class="glyphicon glyphicon-forward fa-2x"></span></button>'
												}
											})
								    	if(data['off'] == 'false'){
								  				document.getElementById('nextK').className += " " + 'disabled';
								  			}
								  		if(offnb !=0)
								  			$('#prevK').removeClass("disabled");
								  		else if(offnb == 0)
								  			document.getElementById('prevK').className += " " + 'disabled';
							    }
							    ,
					          error: function(data) {
				          	 		alert("Something went badly wrong!");

								}
							});

	 	 }

		});
	function clickedNext(){
	 	if(!document.getElementById("nextK").classList.contains('disabled')){
	 	
		document.getElementById("nextK").blur();
	 	 	var nb =  $("#itemsNumber").val();
			var sbj = $("#criteria").val();
				 	 	offset= parseInt(offset) + parseInt(nb);
	 	 	ajaxOffset(sbj,nb,offset);
	 	 }

	}
	function clickedPrev(){
	 	if(!document.getElementById("prevK").classList.contains('disabled')){
	 		document.getElementById("prevK").blur();
	 	 	var nb =  $("#itemsNumber").val();
			var sbj = $("#criteria").val();

			offset= parseInt(offset) -parseInt(nb);
			if(offset <0 )
				offset = 0;
	 	 	ajaxOffset(sbj,nb,offset);
	 	}
		
	}	
