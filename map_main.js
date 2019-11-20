var map;
var myLayers = [];
var activeFeatures; 
var activeFeature;
var edytujFeature;
var wyswietlWybranyFeature;
var geolocation;
var locationLayer;

var user_name = 'unknown';
var user_rights = 'unknown';

var wyswietlacInfo = 1;

var sloGminyJson = {};
var sloKategorieJson = {};
var sloGminy;
var sloKategorie;
var sloStabilizacja;

var sloStabilizacjaJson = {};

var sloStan = [];
var sloWizury = [];
sloStan.push('nieokreslony');
sloStan.push('niedostepny');
sloStan.push('uszkodzony');
sloStan.push('zniszczony');
sloStan.push('istniejacy');
sloWizury.push('nieokreślona');
sloWizury.push('dobra');
sloWizury.push('prawdopodobna');
sloWizury.push('mało prawdopodobna');
sloWizury.push('brak');
var sloKto = [];
sloKto.push('SN');
sloKto.push('MS');
sloKto.push('OK');
sloKto.push('PA');
sloKto.push('ŁP');
sloKto.push('ŁK');
sloKto.push('WS');
var sloOpis = [];
sloOpis.push('TAK');
sloOpis.push('NIE');
sloOpis.push('NOWY');
var sloGps = [];
sloGps.push('TAK');
sloGps.push('NIE');


var temp;
function czyMaszUprawnienia()
{
	if ((readCookie('osn_upr')) && (readCookie('osn_usr'))) {
			console.log("DM tu ustawiamy uprawnienia z cookies");
			user_name = readCookie('osn_usr');
			var osn_upr = readCookie('osn_upr');
			osn_upr = osn_upr.replace(/%7C/g, '|');
			osn_upr = osn_upr.replace(/%2C/g, ',');
			user_rights = new uprawnienia(osn_upr);
			return true;
	}
	else
	{
		user_name = 'unknown';
		user_rights = 'unknown';
		return false;
	}
	
	return false;
}


function pobierzSlowniki()
{
			
			//asynchroniczne pobieranie
			var httpRequest1 = new XMLHttpRequest();
			//httpRequest1.open('GET', 'php/dajSlownik.php?rodzaj=gmina', true); //async
			httpRequest1.open('GET', 'php/dajSlownik.php?rodzaj=stabilizacja', true); //async
			httpRequest1.onreadystatechange=function()
			{
			  if (httpRequest1.readyState==4 && httpRequest1.status==200)
				{
				   //document.getElementById("map").innerHTML=xmlhttp.responseText;
				   sloStabilizacja = httpRequest1.responseText;
				    		    //console.log(sloStabilizacja);
				   sloStabilizacjaJson = JSON.parse(sloStabilizacja);
				    		    //console.log(sloStabilizacjaJson);
				   //console.log(sloGminyJson);
				}
			}
			httpRequest1.send(null); // this blocks as request is async (true) or synchronous (false)

				   
}


function stabilizacjaKod2Nazwa(kod)
{			   
    var outString = "";
             $.each(sloStabilizacjaJson, function(i, item) {             
					 //console.log(item.id + " " + item.nazwakategorii);  
                    if (item.kod == kod)	
					{
					//console.log(item.nazwakategorii);					
					outString =  item.opis;
					}
			 });
	return outString;		 
}

function stabilizacjaNazwa2kod(nazwa)
{
    var outString = "";
			   $.each(sloStabilizacjaJson, function(i, item) {             
					 //console.log(item.id + " " + item.nazwakategorii);  
                    if (item.opis == nazwa)					 
					outString =  item.kod;
			 });
	return outString;			 
}


function kategoriaId2Nazwa(id)
{			   
    var outString = "";
             $.each(sloKategorieJson, function(i, item) {             
					 //console.log(item.id + " " + item.nazwakategorii);  
                    if (item.id == id)	
					{
					//console.log(item.nazwakategorii);					
					outString =  item.nazwakategorii;
					}
			 });
	return outString;		 
}

function kategoriaNazwa2Id(nazwa)
{
    var outString = "";
			   $.each(sloKategorieJson, function(i, item) {             
					 //console.log(item.id + " " + item.nazwakategorii);  
                    if (item.nazwakategorii == nazwa)					 
					outString =  item.id;
			 });
	return outString;			 
}

function gminaId2Nazwa(id)
{
var outString = "";

			   $.each(sloGminyJson, function(i, item) { 
                    //console.log(id);			   
					 //console.log(item.id + " " + item.nazwakategorii);  
                    if (item.id == id)
					{	
					//console.log(item.nazwa_gminy + ", powiat " + item.powiat);
					outString = item.nazwa_gminy + ", powiat " + item.powiat;
					}
			 });
	return outString;
}

	    function flyTo(location, done) {
			var duration = 2000;
			var zoom = mainView.getZoom();
			var parts = 2;
			var called = false;
			function callback(complete) {
			  --parts;
			  if (called) {
				return;
			  }
			  if (parts === 0 || !complete) {
				called = true;
				done(complete);
			  }
			}
			mainView.animate({
			  center: location,
			  duration: duration
			}, callback);
			mainView.animate({
			  zoom: zoom - 1,
			  duration: duration / 2
			}, {
			  zoom: zoom,
			  duration: duration / 2
			}, callback);
      }
	  
	  

function sendFile1() {
  var imgs = document.getElementById("fileList1");
  	var numerIMG = document.getElementById('numer');
	var numerIMG = numerIMG.textContent.replace(/\./g,'_').substring(14) + "_01.jpg";
    new FileUpload(imgs.files[0], numerIMG, '01');
}

function sendFile2() {
  var imgs = document.getElementById("fileList2");
  	var numerIMG = document.getElementById('numer');
	var numerIMG = numerIMG.textContent.replace(/\./g,'_').substring(14) + "_02.jpg";
    new FileUpload(imgs.files[0], numerIMG, '02');
}

function sendFile3() {
  var imgs = document.getElementById("fileList3");
  	var numerIMG = document.getElementById('numer');
	var numerIMG = numerIMG.textContent.replace(/\./g,'_').substring(14) + "_03.jpg";
    new FileUpload(imgs.files[0], numerIMG, '03');
}


function FileUpload(file, fileName, photoNumber) {
	var reader = new FileReader();

	reader.onloadend = function () {
		processFile(reader.result, file.type, fileName, photoNumber);
	}

	reader.onerror = function () {
		alert('There was an error reading the file!');
	}

	//console.log(file);

	reader.readAsDataURL(file);
}

function processFile(dataURL, fileType, fileName, photoNumber) {
	var maxWidth = 1600;
	var maxHeight = 1600;

	
	var image = new Image();
	image.src = dataURL;

	image.onload = function () {
		var width = image.width;
		var height = image.height;
		var shouldResize = (width > maxWidth) || (height > maxHeight);

		if (!shouldResize) {
			sendFile(dataURL, fileName, photoNumber);
			return;
		}

		var newWidth;
		var newHeight;

		if (width > height) {
			newHeight = height * (maxWidth / width);
			newWidth = maxWidth;
		} else {
			newWidth = width * (maxHeight / height);
			newHeight = maxHeight;
		}

		var canvas = document.createElement('canvas');

		canvas.width = newWidth;
		canvas.height = newHeight;
		

		var context = canvas.getContext('2d');

		context.drawImage(this, 0, 0, newWidth, newHeight);

		dataURL = canvas.toDataURL(fileType);
		
		sendFile(dataURL, fileName, photoNumber);
	};

	image.onerror = function () {
		alert('There was an error processing your file!');
	};
}


function sendFile(fileData, fileName, photoNumber) {
	var formData = new FormData();

	console.log("send file " + fileName);
	
	formData.append('imageData', fileData);

	$.ajax({
		type: 'POST',
		url: 'submit_image.php',
		data: { 
		base64data : fileData,
		imageName : fileName,
		},
		dataType: 'text',
		error: function (data) {
			alert('There was an error uploading your filex1!');
		}
	});
	
	$("#photo"+photoNumber).attr('alt1', "img_" + fileName);
	
	console.log("#photo" + photoNumber);
	console.log('<img src="photo//img_'+ fileName + '" alt="' + fileName + '" height="150" width="150">');
	
	$.get("photo//img_" +  fileName)
				.done(function() { 
				$("#photo" + photoNumber).html('<img src="photo//img_'+ fileName +'?cachebuster='+new Date().getTime() + '" alt="img_' + fileName + '" height="150" width="150">');
				}).fail(function() {})
}



function mapaStart()
{

pobierzSlowniki();
	
		
//POPUP  
var container = document.getElementById('popupPanel');
container.addChildElement;

var popup = new ol.Overlay({
  element: container,
  positioning: 'bottom-center',
  offset: [0,-20]
});

popup.addEventListener("pointerdown",touchStart, true);
popup.addEventListener("pointermove",touchChange, true);
popup.addEventListener("pointerup",touchEnd, true);

function touchStart(e){
	alert("Hello! I am an alert box1!!");
	e.preventDefault();
    fontsize = parseInt($('#popupPanel').css('font-size'));
}

function touchChange(e){
	alert("Hello! I am an alert box2!!");
	e.preventDefault();
	scale = e.scale;
    var tempWidth = fontsize * scale;
	
	if (tempWidth > max) tempWidth = max;
    if (tempWidth < min) tempWidth = min;
	
	  $('#popupPanel').css({
        'font-size': tempWidth + 'px',
    });
}

function touchEnd(e){
	e.preventDefault();
	alert("Hello! I am an alert box3!!");
    _width = parseInt($('#popupPanel').css('font-size'));
}

var findFeatures = function(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  });
  return features;
};

var showFeature2 = function (feature) { //dla 1 feature, gdy klaser to wysyłamy konkretny
	activeFeature = feature;
	container.style.display = 'block';
	container.innerHTML = '<div><h5>Id:' + feature.values_.uid +'</h5></div>';
	var html = '<div><form id="edycjaCm" action="zapiszZmiany2()"><fieldset><h5>Edycja obiektu: </h5>';
	html += 'wizura: <select id="formEdit_wizura" name="stan">';

				 $.each(sloWizury, function(i, item) {             
						 
						 html += '<option value="' + item + '"';
						if (item == feature.values_.stan)	
						{
						   html += ' selected="selected"';
						}
						
						html += '>' + item + '</option>'; 
				 });

	html += '</select><br/>';
	html += '<br/><br/><div class="editLinia"><button type="button" onclick="zapiszZmiany2()">Zapisz zmiany</buttn><input type="reset" value="Anuluj zmiany"></div>';
	html += '</fieldset></form></div>';
	container.innerHTML = html;
	container.style.display = 'block';
}
	

var showFeature = function (feature) { //dla 1 feature, gdy klaser to wysyłamy konkretny


            ////pobranie zdjec ...
			activeFeature = feature;

           container.style.display = 'block';
		   
		   container.innerHTML = '<div><hidden>Id:' + feature.values_.uid +'</hidden></div>';
		   container.innerHTML += '<div id="numer"><h4><b><p>Numer: ' + feature.values_.numer +'</p></b></h4></div>';
		   //container.innerHTML += '<p>Numer skrócony: ' + feature.values_.numer_skrocony +'</p>';
		   //container.innerHTML += '<p>Numer inny: ' + feature.values_.numer_inny +'</p>';
		   container.innerHTML += '<p>Rodzaj punktu: ' + feature.values_.typ +'</p>';
		   container.innerHTML += '<p>Stan punktu: ' + feature.values_.stan +'</p>';
		   
		   if (feature.values_.stabilizacja == undefined)
			 container.innerHTML += '<p>Stabilizacja: wartość z poza słownika</p>';   
		   else
		     container.innerHTML += '<p>Stabilizacja: ' + stabilizacjaKod2Nazwa(feature.values_.stabilizacja) +'</p>';
		   
		   container.innerHTML += '<div><p>Uwagi:' + feature.values_.uwagi +'</p></div>';
			
			container.innerHTML += '<div id="photo01"><p>zdjęcie 1</p></div>';
		    container.innerHTML += '<div id="photo02"><p>zdjęcie 2</p></div>';
			//container.innerHTML += '<div id="photo03"><p>zdjęcie 3</p></div>';
			
			console.log(feature.values_.foto_1);
			console.log(feature.values_.foto_2);
			//console.log(feature.values_.foto_3);
			
			if (feature.values_.foto_1 != undefined) {
			$.get("photo/" + feature.values_.foto_1)
				.done(function() { 
					$("#photo01").html('<img src="photo/'+feature.values_.foto_1+ '" alt="zdjęcie 1" height="150" width="150">');
				}).fail(function() {
					$("#photo01").html('<p>tu powinno być zdjęcie 1</p>');
				})
			}
			else
			{
				$("#photo01").html('<p>tu powinno być zdjęcie 1</p>');
			}
			
			if (feature.values_.foto_2 != undefined) {
			$.get("photo/" + feature.values_.foto_2)
				.done(function() { 
					$("#photo02").html('<img src="photo/'+feature.values_.foto_2+ '" alt="zdjęcie 2" height="150" width="150">');
				}).fail(function() {
					$("#photo02").html('<p>tu powinno być zdjęcie 2</p>');
				})
			}
			else
			{
				$("#photo02").html('<p>tu powinno być zdjęcie 2</p>');
			}
			
			/*if (feature.values_.foto_3 != undefined) {
			$.get("photo/" + feature.values_.foto_3)
				.done(function() { 
					$("#photo03").html('<img src="photo/'+feature.values_.foto_3+ '" alt="zdjęcie 3" height="150" width="150">');
				}).fail(function() {
					$("#photo03").html('<p>tu powinno być zdjęcie 3</p>');
				})
			}
			else
			{
				$("#photo03").html('<p>tu powinno być zdjęcie 3</p>');
			}*/
			
		   container.innerHTML += '<div><button type="button" onclick="edytujWybranyFeature()">Edytuj</button></div>';
		   return feature
		   
}

edytujWybranyFeature = function()
{
	        //console.log('poczatek edycji');
	        //console.log(activeFeature);
		    edytujFeature(activeFeature, false);		
}

zapiszZmiany2 = function(){
	console.log(activeFeature)
	activeFeature.values_.stan = document.getElementById('formEdit_wizura').value;
	transactWFS2('update', activeFeature);
	odznaczSelected();
	vectorSourceWizury.removeFeature(activeFeature);
	container.style.display = 'none';
}

Wczytajdate = function()
{
	$(document).ready(function(){
		$.ajax({
			url: "php/wczytajdate.php",
			cache: false
		})
		.done(function(serverDate){
			console.log(serverDate);
			//$("#datainw").html('<input type="date" value='+serverDate+'>');
			document.getElementById('datainw').value=serverDate;
		});
	});
}

zapiszZmiany = function()
{
	//console.log(activeFeature);


	activeFeature.values_.uwagi = document.getElementById('form1TextUwaga0').value;
	activeFeature.values_.numer = document.getElementById('form1TextNumer').value;
	//activeFeature.values_.numer_inny = document.getElementById('form1TextNumerOld').value;
	//activeFeature.values_.numer_skrocony = document.getElementById('form1TextNumerSkrocony').value;
	activeFeature.values_.stan = document.getElementById('formEdit_stan').value;
	activeFeature.values_.stabilizacja = document.getElementById('formEdit_stab').value;
	activeFeature.values_.kto = document.getElementById('formEdit_kto').value;
	activeFeature.values_.opis = document.getElementById('formEdit_opis').value;
	activeFeature.values_.gps = document.getElementById('formEdit_gps').value;
	activeFeature.values_.data = document.getElementById('datainw').value;
	if ($("#photo01").attr('alt1') != 'brak')
		activeFeature.values_.foto_1 = $("#photo01").attr('alt1');
	
	if ($("#photo02").attr('alt1') != 'brak')
		activeFeature.values_.foto_2 = $("#photo02").attr('alt1');

	//if ($("#photo03").attr('alt1') != 'brak')
	//	activeFeature.values_.foto_3 = $("#photo03").attr('alt1');
	
	
	console.log(activeFeature);
	
	transactWFS('update', activeFeature);
	
	loging(1);
	odznaczSelected();
	vectorSourceOsnowaXy.removeFeature(activeFeature);
	container.style.display = 'none';
	
}

loging = function(CzyEdycja)
{
//console.log(document.getElementById('form1TextNumer').value);
var numerpkt=document.getElementById('form1TextNumer').value;
var uwg0=document.getElementById('form1TextUwaga0').value;
//var uwg1=document.getElementById('form1TextUwaga1').value;
var uwg1 = 'a';
//var nmrold=document.getElementById('form1TextNumerOld').value;
if (CzyEdycja===1)
{
	$.ajax({
      type:"POST",
      data: {
		  //numerpkt:numerpkt,uwaga0:uwg0, uwaga1:uwg1,numerold:nmrold,enterpocz:"",enter:""
		  numerpkt:numerpkt,uwaga0:uwg0, uwaga1:uwg1,enterpocz:"",enter:""
		  },
      url: "loging.php",
    });
}
else{
	$.ajax({
      type:"POST",
      data: {
		  numerpkt:numerpkt,uwaga0:uwg0, uwaga1:uwg1,enter:" --------------------> ",enterpocz:"\r\n"
	  },
      url: "loging.php",
    });
}
}




edytujFeature = function(feature, isNewFeature) {

var html = '<div><form id="edycjaCm" action="zapiszZmiany()"><fieldset><h5>Edycja obiektu: </h5>';
//console.log(feature);


if (isNewFeature)
{
html += '<div class="editLinia">Id: <input type="hidden" name="id" value="-1"></div>';
}
else
{
html += '<div id="numer"><h4><b><p>Numer punktu: ' + feature.values_.numer +'</p></b></h4></div>';
//html += '<div class="editLinia">Id: <input type="text" name="gid" value="' + feature.values_.uid+ '" readonly></div>';
html += '<div class="editLinia">Numer: <input type="text" id="form1TextNumer" name="id" value="' + feature.values_.numer + '" readonly></div>';
//html += '<div class="editLinia">Numer stary: <input type="text" id="form1TextNumerOld" name="nr_inny" value="' + feature.values_.numer_inny+ '"></div>';
//html += '<div class="editLinia">Numer skrócony: <input type="text" id="form1TextNumerSkrocony" name="nr_skrocony" value="' + feature.values_.numer_skrocony+ '"></div>';
};
	

	html += 'Stan: <select id="formEdit_stan" name="stan">';

				 $.each(sloStan, function(i, item) {             
						 
						 html += '<option value="' + item + '"';
						 //console.log(item.id + " " + item.nazwakategorii);  
						 //console.log(i);
						 //console.log(item);
						if (item == feature.values_.stan)	
						{
						   //tu dodać watość wybraną (domyslną) 
						   //console.log(feature.values_.kategoria_id);
						   html += ' selected="selected"';
						}
						
						html += '>' + item + '</option>'; 
				 });

	html += '</select><br/>';
	
	//data
	html += '<td><div class="editLinia">Data: <input type="date" id="datainw" name="datainw" value="' + feature.values_.data + '"></div><div class="editLinia"><button type="button" onclick="Wczytajdate()">wczytaj date</buttn></div></td>';

	 //kto
		html += 'Kto: <select id="formEdit_kto" name="kto">';
		
				 $.each(sloKto, function(i, item) {             
						 
						 html += '<option value="' + item+ '"';
						 //console.log(item.id + " " + item.nazwakategorii);  
						 //console.log(i);
						 //console.log(item);
						if (item == feature.values_.kto)	
						{
						   //tu dodać watość wybraną (domyslną) 
						   //console.log(feature.values_.kategoria_id);
						   html += ' selected="selected"';
						}
						
						html += '>' + item + '</option>'; 
				 });

	html += '</select><br/>';			
	
	 //opis
		html += 'Opis Topograficzny: <select id="formEdit_opis" name="opis">';
		
				 $.each(sloOpis, function(i, item) {             
						 
						 html += '<option value="' + item+ '"';
						 //console.log(item.id + " " + item.nazwakategorii);  
						 //console.log(i);
						 //console.log(item);
						if (item == feature.values_.opis)	
						{
						   //tu dodać watość wybraną (domyslną) 
						   //console.log(feature.values_.kategoria_id);
						   html += ' selected="selected"';
						}
						
						html += '>' + item + '</option>'; 
				 });

	html += '</select><br/>';

	 //GPS
		html += 'GPS: <select id="formEdit_gps" name="gps">';
		
				 $.each(sloGps, function(i, item) {             
						 
						 html += '<option value="' + item+ '"';
						 //console.log(item.id + " " + item.nazwakategorii);  
						 //console.log(i);
						 //console.log(item);
						if (item == feature.values_.gps)	
						{
						   //tu dodać watość wybraną (domyslną) 
						   //console.log(feature.values_.kategoria_id);
						   html += ' selected="selected"';
						}
						
						html += '>' + item + '</option>'; 
				 });
		
	html += '</select><br/>';
				 
	 //stabilizacja
		html += 'Stabilizacja: <select id="formEdit_stab" name="stab">';
		
				 $.each(sloStabilizacjaJson, function(i, item) {             
						 
						 html += '<option value="' + item.kod + '"';
						 //console.log(item.id + " " + item.nazwakategorii);  
						//console.log(i);
						//console.log(item);
						if (item.opis == stabilizacjaKod2Nazwa(feature.values_.stabilizacja))	
						{
						   //tu dodać watość wybraną (domyslną) 
						   //console.log(feature.values_.kategoria_id);
						   html += ' selected="selected"';
						}
						
						html += '>' + item.opis + '</option>'; 
				 });
	html += '</select><br/>';
	
			html += '<div id="photo01" alt1="brak"><p></p></div>';
			html += '<div>Zmień zdjęcie 1: <input id="fileList1" type="file" name="image1" accept="image/*" capture="camera" onchange="sendFile1(this.files)"></div>';
			
			
		    html += '<div id="photo02" alt1="brak"><p></p></div>';
			html += '<div>Zmień zdjęcie 2: <input id="fileList2" type="file" name="image2" accept="image/*" capture="camera" onchange="sendFile2(this.files)"></div>';
			
			//html += '<div id="photo03" alt1="brak"><p></p></div>';
		    //html += '<div>Zmień zdjecie 3: <input id="fileList3" type="file" name="image3" accept="image/*" capture="camera" onchange="sendFile3(this.files)"></div>';
		   
		   	$.get("photo//" + feature.values_.foto_1)
				.done(function() { 
				//$("#photo01").html('<img src="photo//'+$( "photo01" ).attr("alt1")+'" alt="to jest miejsce na zdjęcie 1" height="150" width="150">');
				$("#photo01").html('<img src="photo//'+ feature.values_.foto_1 +'" alt="to jest miejsce na zdjęcie 1" height="150" width="150">');
				}).fail(function() {})
			
			$.get("photo//" + feature.values_.foto_2)
				.done(function() { 
				$("#photo02").html('<img src="photo//'+feature.values_.foto_2+ '" alt="to jest miejsce na zdjęcie 2" height="150" width="150">');
				}).fail(function() {})			
			
			/*$.get("photo//" + feature.values_.foto_3)
				.done(function() { 
				$("#photo03").html('<img src="photo//'+feature.values_.foto_3+ '" alt="to jest miejsce na zdjęcie 3" height="150" width="150">');
				}).fail(function() {})*/
			
	
html += 'Uwagi: <textarea id="form1TextUwaga0" name="uwaga" rows="2" cols="50">' + feature.values_.uwagi+ '</textarea>';


 html += '<br/><br/><div class="editLinia"><button type="button" onclick="zapiszZmiany()">Zapisz zmiany</buttn><input type="reset" value="Anuluj zmiany"></div>';

html += '</fieldset></form></div>';

container.innerHTML = html;
container.style.display = 'block';

loging(0);
}

wyswietlWybranyFeature = function(gid)
{
       for (i=0; i<activeFeatures.length; i++)
	   {
		 if (activeFeatures[i].values_.gid == gid)
		 {
			 activeFeature = activeFeatures[i]
		    showFeature(activeFeatures[i]);
			//edytujFeature(activeFeatures[i]);
		 }
	   }
}

var displayFeatureInfo = function(pixel, coordinate) {
  
  var features = findFeatures(pixel);
  var htmlString = '';
  console.log(features)
	
	if (features.length ==0) //nie wybrano zadnego ficzera
	{
	   container.style.display = 'none';
	}
	//else if (features[0].values_.features.length ==1)
	else if (features.length ==1)
	{
	       var feature = features[0];
		   if (typeof feature.id_ == "undefined") {
			showFeature(feature.values_.features[0]);
			popup.setPosition(coordinate);
		  }
		  else
		  {
			showFeature2(feature);
			popup.setPosition(coordinate);
		  }
	}
	else
	{
	   var feature = features[0];
	   container.style.display = 'block';
	   popup.setPosition(coordinate);
	   
	   //console.log(feature.values_.features);
	   activeFeatures = feature.values_.features; // obiekty do zmiennej globalnej do wyświetlenia właściwego po id

	   htmlString = '<div>';
	   htmlString += '<h5>Wybrano więcej niż jeden obiekt:</h5><table style="width:100%">';

	   for (i=0; i<features[0].values_.features.length; i++)
	   {
		 //console.log(i);
	    htmlString += '<tr>';		
		htmlString += '<td>'+ (i+1) +'.</td>';
		if (feature.values_.features[i].values_.numer_old == undefined)
		{
			htmlString += '<td>'+ feature.values_.features[i].values_.numer + " - id:" + feature.values_.features[i].values_.gid + '</td>';
		}
		else
		{
			htmlString += '<td>'+ feature.values_.features[i].values_.numer + " ("+ feature.values_.features[i].values_.numer_old + ") - id:" + feature.values_.features[i].values_.gid + '</td>';
		}
		
		htmlString += '<td><button class="button-rozwin" onclick="wyswietlWybranyFeature('+ feature.values_.features[i].values_.gid + ')">...</button></td>';
		htmlString += '</tr>';
	   }
	   
	   htmlString += '</table></div>';
	   container.innerHTML = htmlString;
	 }
};
	
	
	var fullScreenControl = new ol.control.defaults().extend([
    new ol.control.FullScreen(), 
    ])
	

   var mainView = new ol.View({
	//center: ol.proj.transform([18.992, 50.211], 'EPSG:4326', 'EPSG:3857'), katowice
	//Katowice 50.238221, 19.024906
	center: ol.proj.transform([19.02, 50.23], 'EPSG:4326', 'EPSG:3857'),
	//3857 to odwzorowanie googla ...
	zoom: 12, //18
	minZoom: 5,
    maxZoom: 25
	})

// NOWA MAPA
   map = new ol.Map({
    controls: fullScreenControl,
	target: 'map',
	layers: myLayers,
	//overlays: [overlay],
	//renderer: exampleNS.getRendererFromQueryString(),
	view: mainView
	});

	map.getLayerGroup().set('name', 'Warstwy:');
	map.getLayerGroup().set('layer_type', 'group');
	
	//dodanie paska zoomu - zmieniany styl przez css
	var zoomSliderControl = new ol.control.ZoomSlider();
    map.addControl(zoomSliderControl);

	var scaleLine = new ol.control.ScaleLine();
	map.addControl(scaleLine);
	
	var insertCmControl =  new app.insertNewCmControl();
	map.addControl(insertCmControl);
	
	// kontrolka do wyswietlenia warstw
	var insertLayerTreeControlIcon =  new app.insertLayerTreeControl();
	map.addControl(insertLayerTreeControlIcon);
	

	map.addInteraction(selectSingleClick);
    map.addInteraction(selectMouseMove);

	map.addOverlay(popup);


map.on('singleclick', function(evt) {
    var pixel = evt.pixel;
    var coordinate = evt.coordinate;
    if (wyswietlacInfo == 1)
	{
		displayFeatureInfo(pixel, coordinate);
	}
});
	
//****************************************************************
//****************     LOCATION - pozycja GPS    *****************
//****************************************************************

 geolocation = new ol.Geolocation({
        projection: mainView.getProjection()
      });

      function el(id) {
        return document.getElementById(id);
      }

      el('track').addEventListener('change', function() {
		var trackingwasalreadyon = geolocation.getTracking();
		if(trackingwasalreadyon){ 
        geolocation.setTracking(false);
		}
		else
		{
        geolocation.setTracking(true);
		}
      });

      // update the HTML page when the position changes.
      geolocation.on('change', function() {
		el('position').innerText = geolocation.getPosition();
        el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
        el('altitude').innerText = geolocation.getAltitude() + ' [m]';
        el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
        el('heading').innerText = geolocation.getHeading() + ' [rad]';
        el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
							//te dwioe linie skopiowane
					var p = geolocation.getPosition();
					mainView.setCenter([parseFloat(p[0]), parseFloat(p[1])]);
      });

      // handle geolocation error.
      geolocation.on('error', function(error) {
        var info = document.getElementById('info');
        info.innerHTML = error.message;
        info.style.display = '';
      });

      var accuracyFeature = new ol.Feature();
      geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

      var positionFeature = new ol.Feature();
      
	  positionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: '#3399CC'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
          })
        })
      }));

      geolocation.on('change:position', function() {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
		//mainView.setCenter(coordinates);
		mainView.setZoom(19);
      });

      locationLayer = new ol.layer.Vector({
        map: map,
		name: 'aktywna lokalizacja',
		zIndex: -1,
        source: new ol.source.Vector({
          //features: [accuracyFeature, positionFeature]
		  features: [accuracyFeature, positionFeature]
        })
      });	  

	  
	  myLayers.push(locationLayer);	
	  
	
////// tu definicja legendy warstw

            function buildLayerTree(layer) {
                var elem;
                
				//console.log(layer);
								
				var name = layer.get('name') ? layer.get('name') : "Group";
				
                var div = "<li data-layerid='" + name + "'>" +
                        "<span>" + layer.get('name') + "</span>";

					 
					 //tylko do warstw nie do grup
					 if (layer.values_.layer_type != 'group')
					 {
					  div = div + "<i class='glyphicon ";
						if (layer.values_.visible == true)
						{
						   div += "glyphicon-check";
						}
						else
						{
						  div += "glyphicon-unchecked";
						}
						div = div + "'></i> ";
						div += '<div id="slider" style="width:80px;" class="slider"></div>'; 
					 }
					 else
					 {
					    
					 }
							
				if (layer.getLayers) {
                    var sublayersElem = ''; 
                    var layers = layer.getLayers().getArray(),
                            len = layers.length;
                    for (var i = len - 1; i >= 0; i--) {
                        sublayersElem += buildLayerTree(layers[i]);
                    }
                    elem = div + " <ul>" + sublayersElem + "</ul></li>";
                } else {
                    elem = div + " </li>";
                }
				
				//console.log(elem);
                return elem;
            }


            function initializeTree() {

                var elem = buildLayerTree(map.getLayerGroup());
                
				// $('#legend').empty().append(elem);
                $('#legendaWarstw').empty().append(elem);
				
                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                $('.tree li.parent_li > span').on('click', function(e) {
                    var children = $(this).parent('li.parent_li').find(' > ul > li');
                    if (children.is(":visible")) {
                        children.hide('fast');
                        $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
                    } else {
                        children.show('fast');
                        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
                    }
                    e.stopPropagation();
                });
				
            }

            function findBy(layer, key, value) {
                if (layer.get(key) === value) {
                    return layer;
                }

                // Find recursively if it is a group
                if (layer.getLayers) {
                    var layers = layer.getLayers().getArray(),
                            len = layers.length, result;
                    for (var i = 0; i < len; i++) {
                        result = findBy(layers[i], key, value);
                        if (result) {
                            return result;
                        }
                    }
                }

                return null;
            }



                initializeTree();

                $('.slider').slider({
				  orientation: "horizontal",
				  max: 1.0,
				  min: 0.0,
				  step: 0.05,
				  value: 1.0,
				  
				});
				
				$('.slider').slider().on('slide', function( event, ui) {
				    var layername = $(this).closest('li').data('layerid');
					//console.log(layername);
                    var layer = findBy(map.getLayerGroup(), 'name', layername);
					//console.log(ui.value);
                    layer.setOpacity(ui.value);
                });


                // Handle visibility control
                $('i').on('click', function() {
                    var layername = $(this).closest('li').data('layerid');
                    var layer = findBy(map.getLayerGroup(), 'name', layername);

                    layer.setVisible(!layer.getVisible());

                    if (layer.getVisible()) {
                        $(this).removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                    } else {
                        $(this).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                    }
                });
}
