<!DOCTYPE html>
<html>
	<head>
		<title>Search In DB-Pedia</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/mystyle.css"> 
	 	<script src="js/jquery-3.1.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/bootstrap-select.min.css">
		<script src="js/bootstrap-select.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/unslider-dots.css">
		<script src="js/unslider-min.js"></script>
		<script src="js/script.js"></script>
		<link rel="stylesheet" type="text/css" href="css/unslider.css">
		<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	</head>

	<body>
		<div>
			<header class="header" class="col-md-12">
				<h3 class="titulo">Search In DB-Pedia</h3>
			</header>
		</div>
		<div class="container">							
		<hr/>
		<div class="row">			
			<div  class="col-md-12">
				<div class="centerSelect">
					<label class="criteriaNBLB">Enter search: </label>
					<input type="text" name="" id="criteria" value="People" />
				</div>
			</div>
			<div  class="col-md-4" >
				<form class="centerSelect form-inline">
					<label class="criteriaNBLB" for="itemsNumber">Number of items: </label>
					 <input type="number" class="form-control" name="quantity" min="1" id="itemsNumber" max="3" value="2">

				</form>
			</div>
			<div  class="col-md-2"></div>
			<hr/>
		</div>

		<div class="modal"><img id="loadingImg" src="./imgs/ajax-loader.gif"></div>

		<hr>
		<div class="row sbj" id="sbj">					
		        <div class="col-md-4"><hr><img src="" id="subject-pic" class="img-responsive img-circle" ><hr></div>
		        <div class="col-md-8">
		          <h2 class="title" id="subject-title"></h3>
		          <p id="subject-description"></p>	  
		        </div>
				<div class="col-md-1"></div>	
		</div>

	<div class="row sld" id="sld">
		<div class="col-md-12" id="slider-id">
			<div class="banner" id="banner">
				<ul id="ul-id">
				</ul>
			</div>

		</div>
	</div>
	</div>

	</body>

	<footer class="col-md-12 col-sm-12 col-xs-12">
		<div class="row">
		  <p class="Copyright">Developed in 2017</p>
		</div>
	</footer>

</html>