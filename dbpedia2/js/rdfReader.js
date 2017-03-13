var dbJsonBase = "http://de.dbpedia.org/resource/";
var dbJsonSuffix = "?output=application/rdf+json"; 
var dbJson = "";
var subjectHeader; 
var loadingLabel = "<span class='loading'> loading ... </span>";
var contentRdf; 

$(document).ready(function(){

	if (window.location.href.split('#')[1]) {
		jQuery('#rdfURI').val(window.location.href.split('#')[1]);
		$("#readRdf").trigger("click");
		
	}

	$("#readRdf").click(function(){
		var input = $('#rdfURI').val();
		parseInput2DbJson(input); 	
		readInputJson();
	});
	contentRdf = $('#rdf');
});


/**
 * Pesquisa Wikipedia. 
 * */
$(document).on("keyup","#searchfield",function(){
	var s = $("#searchfield").val();
        $.getJSON("http://wikipedia.org/w/api.php?callback=?",
        {
          srsearch: s, action: "query", list: "search", format: "json"
        },
        function(data) {
          $("#searchresults").empty();
          $.each(data.query.search, function(i,item){
            $("#searchresults").append('<div><a class="uriresult" href="#http://dbpedia.org/resource/' + item.title.replace(/ /g,"_") + '">' + item.title + '</a><br/>' + item.snippet + '</div>');
          });
 
 	});

});

/**
 * Wikipedia search result clicked. 
 * loads uri in  input field and trigger readRdf click event
 * */
$(document).on("click",".uriresult",function(){
	jQuery('#rdfURI').val($(this).attr("href").substr(1));
	$("#readRdf").trigger("click");
});


$(document).on("click","#showfulluri",function(){
	$("#readRdf").trigger("click");
 });

function parseInput2DbJson(input){
	var inputArr = input.split("/"); 
	var inputLength = inputArr.length; 
	if((inputArr[inputLength - 2] == "wiki")||(inputArr[inputLength - 2] == "resource")){
		dbJson = dbJsonBase + inputArr[inputLength -1] + dbJsonSuffix; 
	}else{
		dbJson = input;
	}
}

function readInputJson(){
	storeSubjectName();
	encoded = encodeURI(dbJson);
	console.log(encoded);
	jQuery.ajax({
		beforeSend	: clearRdf(),
		crossDomain	: true,
		method		: "GET",
		url		: encoded,
		dataType : "json",
	}).done(function(msg){
		parseRdf(msg);
	});
	
}
/*
 * funcao para limpar o conteudo RDF da div
 * */
function clearRdf(){
	contentRdf.html(loadingLabel);
}

/**
 * passagem o formato Json RDF. 
 * */
function parseRdf(json){
	contentRdf.html("<h3>The Result is: </h3> ");
	for(property in json){
		console.log(property);
		
		contentRdf.append(createTripleDiv(property, json[property]));
		}
}

function isSubject(subject){
	return splitURI(subject) == subjectHeader;
}
/**
 * criando a div do container
 * subject - predicate - object
 * */
function createTripleDiv(rdfObject, property){
	var tripleDiv = ""; 
	tripleDiv += createContentDivs(rdfObject,property); 
	return tripleDiv;
}
/*
 * criando o conteudo
 * div subject 
 * div predicate 
 * div object 
 * */
function createContentDivs(subject, predicate){
	
	var retString = ""; 
	for(property in predicate){
	 var pred = splitURI(property);
	 var object = predicate[property][0];
	 var val = setObjectValue(property, object);
	 setLabel(pred, val); 
	 retString += "<div class='triple'>"; 
	 retString += "<div class='subject'>" + splitURI(subject) + "</div>";
	 retString += "<div class='predicate'>" + niceuri(property) + "</div>";	
	 retString += "<div class='object "+object.type+" '> "

	 if (object.type=="uri") {
		if($('#showfulluri').is(':checked')) {
			var uritoshow = niceuri(object.value);
		 } else {
			var uritoshow = splitURI(object.value);
		 }
		if (object.value.search("")>0) {
			retString += '<a class="uriresult" href="#'+niceuri(object.value)+'">'+uritoshow+'</a>';
		} else {
			retString += uritoshow;
		}

	 } else {
		retString += val;
	 }

	 retString += "</div>";
	 retString += "</div>";
	}
	return retString; 
}

/*
 * Verifica se o tipo do objeto é uri ou literal. 
 * se for URI, Ele se divide para obter apenas o identificador. 
 * */
function setObjectValue(predicate, object){
	var val = object.value; 

	if(object.type == "uri"){
	 	val = splitURI(val);
	}
	 return val;
}

/*
 * Define um novo cabeçalho se a propriedade label estiver definida
 * */
function setLabel(pred, val){

	 if(pred.indexOf("label") > -1){
	 	jQuery('h3').html("The result for " + val + " is: ");
	 }
}

function createParagraph(paragraphContent){
	var par = "<p>";
	par += paragraphContent;
	par += "</p>";
	return par; 
}

/*
 * Retorna o identificador de um URI. 
 *O identificador é o literal após o rejeito / do sujeito.
 * */
function splitURI(uri){
	var urlArr = uri.split('/');
	return urlArr[urlArr.length -1 ]
}
/**
 * Armazena o subjectName como SubjectHeader. 
 * */
function storeSubjectName(){

	subjectHeader = splitURI(dbJson).split('.')[0];
}

function niceuri(uri) {
	var uristr = uri;	
	uristr = uristr.replace("de.dbpedia.imp.fu-berlin.de:49156","dbpedia.org");
	return uristr;
}




