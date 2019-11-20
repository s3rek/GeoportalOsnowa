function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

var interactionDrawNewCm;

var interactionLayerTree;
//
// Define knefel wstaw nowy obiekt
//
	
	// creates unique id's
	function uid(){
	  var id = 0;
	  return function() {
		if (arguments[0] === 0) {
		  id = 0;
		}
		return id++;
	  }
	}
	
	function przelaczLokalizacje()
	{
		
	   var button = document.getElementById('button-newfeature');
	
	   if (hasClass(button, 'button-notpressed'))
	   {
			geolocation.setTracking(true);
		   	button.classList.remove('button-notpressed');
			button.classList.add('button-pressed');
			locationLayer.setVisible(true);
	   }
	   else
	   {
			geolocation.setTracking(false);
   			button.classList.add('button-notpressed');
			button.classList.remove('button-pressed');
			locationLayer.setVisible(false);
	   }
	}
	
 	function wstawNowyFeatureCm()
	{
	
	   var button = document.getElementById('button-newfeature');
	
	   if (hasClass(button, 'button-notpressed'))
	   {
			interactionDrawNewCm = new ol.interaction.Draw({
                            type: 'Point',
                            //source: vectorLayerOsnowaXy.getSource()
							source: vectorSourceOsnowaXy
                        });
				
			 interactionDrawNewCm.on('drawend', function(event) {
				// create a unique id
				// it is later needed to delete features
				var id = uid();
				// give the feature this id
				event.feature.setId(id);
				// save the changed data
				//wstawionoNowyFeatureCm(event.feature); 
				console.log('Wstawiłem nowego ficzera');
	            console.log(event.feature);
	            edytujFeature(event.feature, true);
				
					button.classList.add('button-notpressed');
					button.classList.remove('button-pressed');
					map.addInteraction(selectMouseMove);
					map.addInteraction(selectSingleClick);
					map.removeInteraction(interactionDrawNewCm);
					wyswietlacInfo = 1;
				
			  });
			  
			wyswietlacInfo = 0;
			button.classList.remove('button-notpressed');
			button.classList.add('button-pressed');
			map.removeInteraction(selectMouseMove);
			map.removeInteraction(selectSingleClick);
            map.addInteraction(interactionDrawNewCm);
	
		}
		else
		{
			button.classList.add('button-notpressed');
			button.classList.remove('button-pressed');
			map.addInteraction(selectMouseMove);
			map.addInteraction(selectSingleClick);
            map.removeInteraction(interactionDrawNewCm);
			wyswietlacInfo = 1;
		}
						
	}
	

 
app.insertNewCmControl = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  button.innerHTML = 'f+';
  button.id = 'button-newfeature';
  button.classList.add('button-notpressed');
  
  var this_ = this;
  
  //var wstawNowyFeatureCm = function(e) {
    //to nowe zdarzenie
	//alert('Add new feature');

	
  //};

  //wstawianie nowego obiektu zmieniono na przełacznei lokalizacji 
  //button.addEventListener('click', wstawNowyFeatureCm, false);
  button.addEventListener('click', przelaczLokalizacje, false);
  //button.addEventListener('touchstart', wstawNowyFeatureCm, false);

  var element = document.createElement('div');
  element.className = 'insert-feature ol-control';
  
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};
ol.inherits(app.insertNewCmControl, ol.control.Control);


//knefel do warstw
function wyswietlLayerTree()
{
    var element = document.getElementById('div-display-layertree');
    if (hasClass(element, 'display-layertree-unselected'))
	   {
			element.classList.remove('display-layertree-unselected');
			element.classList.add('display-layertree-selected');
		}
		else
		{
			element.classList.remove('display-layertree-selected');
			element.classList.add('display-layertree-unselected');
		}
}

app.insertLayerTreeControl = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  //button.innerHTML = 'l';
  button.id = 'button-layertree';
  //button.classList.add('display-layertree');
  //button.classList.add('button-notpressed');
  
  //var this_ = this;
  
  //var wstawNowyFeatureCm = function(e) {
    //to nowe zdarzenie
	//alert('Add new feature');

	
  //};

  button.addEventListener('click', wyswietlLayerTree, false);
  //button.addEventListener('touchstart', wstawNowyFeatureCm, false);

  var element = document.createElement('div');
  element.id = 'div-display-layertree';
  element.className = 'display-layertree ol-control display-layertree-unselected';
  
  var legendaWarstw = document.createElement('div');
  legendaWarstw.id = 'legendaWarstw';
  
  element.appendChild(button);
  element.appendChild(legendaWarstw);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};
ol.inherits(app.insertLayerTreeControl, ol.control.Control);


/*
var vectorSource = new ol.source.ServerVector({
  format: new ol.format.GeoJSON(),
  loader: function(extent, resolution, projection) {
    var url = 'http://localhost:8080/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=Dm:polska&' +
        'outputFormat=text/javascript&format_options=callback:loadFeatures' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });
  },
  strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
    maxZoom: 22
  })),
  projection: 'EPSG:3857'
});

var loadFeatures = function(response) {
  vectorSource.addFeatures(vectorSource.readFeatures(response));
};

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  title: 'Wektor wfs testowy',
  //type: 'base',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(255, 0, 255, 0.7)',
      width: 2
    })
  })
});

myLayers.push(vectorLayer);		  


*/

//STYLE WARTSWY CIEKAWE MIEJSCA

var styleCmDefault = function(feature, resolution) {
    var size = feature.get('features').length;
	var style;
    //var style = styleCache[size];
    //if (!style) {
	
	//console.log(feature);
	//console.log(size);
	
	if (size>1)
	{
	style = [new ol.style.Style({
         image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: '#50f'
          }),
          fill: new ol.style.Fill({
            color: '#3399CC'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];

	}
	else	
	{
		stan = '_nieokreslony';
		typ = '';
		skala = 0.8;
		
		if (feature.values_.features[0].values_.typ == 'PUNKT GŁÓWNY')
		{
			typ = 'osnowa_poz';
			skala = 1;
		}
		else 		if (feature.values_.features[0].values_.typ == 'POBOCZNIK')
		{
			typ = 'osnowa_poz';
			skala = 0.6;
		}
		else if (feature.values_.features[0].values_.typ == 'REPER')
		{
			typ = 'osnowa_wys';
			skala = 1.0;
		}
		
		
		if (feature.values_.features[0].values_.stan == 'zniszczony')
		{
			stan = '_zniszczony';
		}
		else if (feature.values_.features[0].values_.stan == 'istniejacy')
		{
			stan = '_istniejacy';
		}
		else if (feature.values_.features[0].values_.stan == 'niedostepny')
		{
			stan = '_niedostepny';
		}
				else if (feature.values_.features[0].values_.stan == 'uszkodzony')
		{
			stan = '_uszkodzony';
		}
		else 
		{
			stan = '_nieokreslony';
		}
		
		
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  //src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  //src: 'icons/osnowa_01.png',
		  src: 'icons/' + typ + stan + '.png',
		  //scale: 0.6 + feature.values_.features[0].values_.ocena * feature.values_.features[0].values_.ocena * 0.007
		 scale: skala
		}),
		text: new ol.style.Text({
          //text: feature.values_.features[0].values_.numer,
		  text: '',
		  offsetX: 15,
		  offsetY: 15,
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
		
      })];
	 }

	 
    //  styleCache[size] = style;
    //}
    return style;
  }

  
  var styleCmDefaultWizury = function(feature, resolution) {
    
	var style;
	var kolor = '#fff';
	var grubosc = 0;

		
		if (feature.values_.stan == 'nieokreślona')
		{
			kolor = '#ff0000';
			grubosc = 3;
		}
		else if (feature.values_.stan == 'dobra')
		{
			kolor = '#33ff00';
			grubosc = 1;
		}
		else if (feature.values_.stan == 'prawdopodobna')
		{
			kolor = '#ffff00';
			grubosc = 1;
		}
				else if (feature.values_.stan == 'mało prawdopodobna')
		{
			kolor = '#33ffff';
			grubosc = 1;
		}
		else if (feature.values_.stan == 'brak')
		{
			kolor = '#00ffff';
			grubosc = 1;
		}
		else
		{
			kolor = '#ff0000';
			grubosc = 10;
		}
		
		
      style = [new ol.style.Style({
		stroke: new ol.style.Stroke({
          color: kolor,
          width: grubosc
          })
        })]
	 
    //  styleCache[size] = style;
    //}
    return style;
  }


   var styleCmHover = function(feature, resolution) {
    //var size = feature.get('features').length;
	var style;
	var size;
    //var style = styleCache[size];
    //if (!style) {
		
	//if (size>1)
	if (size==false)
	{
	style = [new ol.style.Style({
         image: new ol.style.Circle({
          radius: 12,
          stroke: new ol.style.Stroke({
            color: '#50f'
          }),
          fill: new ol.style.Fill({
            color: '#FF88BB'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];

	}
	else if (typeof feature.id_ == "undefined") {	
	{
		stan = '_nieokreslony';
		typ = '';
		skala = 1;
		
		if (feature.values_.features[0].values_.typ == 'PUNKT GŁÓWNY')
		{
			typ = 'osnowa_poz';
			skala = 1.2;
		}
		else 		if (feature.values_.features[0].values_.typ == 'POBOCZNIK')
		{
			typ = 'osnowa_poz';
			skala = 0.8;
		}
		else if (feature.values_.features[0].values_.typ == 'REPER')
		{
			typ = 'osnowa_wys';
			skala = 1.2;
		}
		
		
		if (feature.values_.features[0].values_.stan == 'zniszczony')
		{
			stan = '_zniszczony';
		}
		else if (feature.values_.features[0].values_.stan == 'istniejacy')
		{
			stan = '_istniejacy';
		}
		else if (feature.values_.features[0].values_.stan == 'niedostepny')
		{
			stan = '_niedostepny';
		}
				else if (feature.values_.features[0].values_.stan == 'uszkodzony')
		{
			stan = '_uszkodzony';
		}
		else 
		{
			stan = '_nieokreslony';
		}
	}
		
		/*if (typeof feature.id_ !== "undefined") {
			if (feature.values_.stan == 'dobra')
			{
			stan = '_dobra';
			}
			else if (feature.values_.features[0].values_.stan == 'brak')
			{
			stan = '_brak';
			}
		}*/
		
		
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  //src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  //src: 'icons/osnowa_01.png',
		  src: 'icons/' + typ + stan + '.png',
		  //scale: 0.6 + feature.values_.features[0].values_.ocena * feature.values_.features[0].values_.ocena * 0.007
		 scale: skala
		}),
		text: new ol.style.Text({
          text: feature.values_.features[0].values_.numer_skrocony,
		  offsetX: 15,
		  offsetY: 15,
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];
	 }

    //  styleCache[size] = style;
    //}
	
    return style;
  }
  
    var styleCmSelect = function(feature, resolution) {
    //var size = feature.get('features').length;
	var style;
	var size;
    //var style = styleCache[size];
    //if (!style) {
		
	//if (size>1)
	if (size==false)
	{
	style = [new ol.style.Style({
         image: new ol.style.Circle({
          radius: 12,
          stroke: new ol.style.Stroke({
            color: '#50f'
          }),
          fill: new ol.style.Fill({
            color: '#FF88BB'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];

	}
	else if (typeof feature.id_ == "undefined") {	
	{	
		stan = '_nieokreslony';
		typ = '';
		skala = 1.0;
		
		if (feature.values_.features[0].values_.typ == 'PUNKT GŁÓWNY')
		{
			typ = 'osnowa_poz';
			skala = 1.4;
		}
		else 		if (feature.values_.features[0].values_.typ == 'POBOCZNIK')
		{
			typ = 'osnowa_poz';
			skala = 0.8;
		}
		else if (feature.values_.features[0].values_.typ == 'REPER')
		{
			typ = 'osnowa_wys';
			skala = 1.2;
		}
		
		
		if (feature.values_.features[0].values_.stan == 'zniszczony')
		{
			stan = '_zniszczony';
		}
		else if (feature.values_.features[0].values_.stan == 'istniejacy')
		{
			stan = '_istniejacy';
		}
		else if (feature.values_.features[0].values_.stan == 'niedostepny')
		{
			stan = '_niedostepny';
		}
				else if (feature.values_.features[0].values_.stan == 'uszkodzony')
		{
			stan = '_uszkodzony';
		}
		else 
		{
			stan = '_nieokreslony';
		}
	}
		
	/*if (typeof feature.id_ !== "undefined") {
			if (feature.values_.stan == 'dobra')
			{
			stan = '_dobra';
			}
			else if (feature.values_.features[0].values_.stan == 'brak')
			{
			stan = '_brak';
			}
			else if (feature.values_.features[0].values_.stan == 'prawdopodobna')
			{
			stan = '_prawdopodobna';
			}
			else if (feature.values_.features[0].values_.stan == "mało prawdopodobna")
			{
			stan = "_mało prawdopodobna";
			}
			else
			{
			stan = "_nieokreślona";
			}
		}*/
		
		
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  //src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  //src: 'icons/osnowa_01.png',
		  src: 'icons/' + typ + stan + '.png',
		  //scale: 0.6 + feature.values_.features[0].values_.ocena * feature.values_.features[0].values_.ocena * 0.007
		 scale: skala
		}),
		text: new ol.style.Text({
          text: feature.values_.features[0].values_.numer,
		  offsetX: 15,
		  offsetY: 15,
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];
	 }

    //  styleCache[size] = style;
    //}
	
    return style;
  }
  
//SELECT FEATURES

var select = null;  // ref to currently selected interaction

// select interaction working on "singleclick"
var selectSingleClick = new ol.interaction.Select({
  style: styleCmSelect
});

// select interaction working on "click"
var selectClick = new ol.interaction.Select({
  condition: ol.events.condition.click,
  style: styleCmSelect
});


odznaczSelected = function() {
	selectSingleClick.dispatchEvent({type: 'clearSelections'});
}

// select interaction working on "mousemove"
var selectMouseMove = new ol.interaction.Select({
  condition: ol.events.condition.mouseMove,
  style: styleCmHover
});



// CIEKAWE MIEJSCA
/*
	var saveStrategyOsnowaXy = new OpenLayers.Strategy.Save({
		auto: true
	});
*/

var tileStrategyOsnowaXy = new ol.loadingstrategy.tile(new ol.tilegrid.createXYZ({
    maxZoom: 25
  }))

/*  
var vectorSourceOsnowaXy = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  loader: function(extent, resolution, projection) {
    var url = 'https://www.unimap.com.pl:1443/geoserver/wfs?service=WFS&' +
	//var url = 'https://www.unimap.com.pl:1443/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=osnowa:osnowaxy&' +
        'outputFormat=text/javascript&format_options=callback:loadFeaturesOsnowa' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });
  },
  strategy: tileStrategyOsnowaXy,
  projection: 'EPSG:3857'
});
*/

var formatWFS = new ol.format.WFS();
var formatWFSwizury = new ol.format.WFS();


var xs = new XMLSerializer();


var vectorSourceOsnowaXy = new ol.source.Vector({
	format: formatWFS,
    loader: function (extent) {
        $.ajax('https://map.unimap.com.pl:1443/geoserver/wfs', {
            type: 'GET',
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'osnowa:osnowaKatowice2019',
                srsname: 'EPSG:3857',
                bbox: extent.join(',') + ',EPSG:3857'
            }
        }).done(function (response) {
            vectorSourceOsnowaXy.addFeatures(formatWFS.readFeatures(filtrujObiekty(response)));
        });
    },
    //strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ()),
    strategy: ol.loadingstrategy.bbox,
    projection: 'EPSG:3857'
});


var vectorSourceWizury = new ol.source.Vector({
	format: formatWFS,
    loader: function (extent) {
        $.ajax('https://map.unimap.com.pl:1443/geoserver/wfs', {
            type: 'GET',
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'osnowa:wizuryKatowice2019',
                srsname: 'EPSG:3857',
                bbox: extent.join(',') + ',EPSG:3857'
            }
        }).done(function (response) {
			vectorSourceWizury.addFeatures(formatWFSwizury.readFeatures(response));
        });
    },
    strategy: ol.loadingstrategy.bbox,
    projection: 'EPSG:3857'
});

function filtrujObiekty(features) {

//console.log(features);  //dla WFS to response a nie features
/*
var f = [];
    //console.log(features);
    if (filtrOcena != 0)
	{
		for (i=0; i<features.length; i++)
		{
		  if (features[i].values_.ocena >= filtrOcena)
		  {
		   f.push(features[i]);
		  }
		}
	}
	else
	{
	  return features;
	}
	
return f;
*/
return features;

}

var interaction;

var interactionSelectPointerMove = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove
});

var interactionSelect = new ol.interaction.Select({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF2828'
        })
    })
});

var interactionSnap = new ol.interaction.Snap({
    //source: layerWFS.getSource()
	source: vectorSourceOsnowaXy
});


var formatGML = new ol.format.GML({
    //featureNS: 'https://www.unimap.com.pl:1443/geoserver/wfs',
	featureNS: 'osnowa',
    featureType: 'osnowaKatowice2019',
    srsName: 'EPSG:3857'
	//srsName: 'EPSG:4326'
});

var formatGMLwizury = new ol.format.GML({
    //featureNS: 'https://www.unimap.com.pl:1443/geoserver/wfs',
	featureNS: 'osnowa',
    featureType: 'wizuryKatowice2019',
    srsName: 'EPSG:3857'
	//srsName: 'EPSG:4326'
});


//wfs-t
var dirty = {};
var transactWFS = function (mode, f) {
    var node;
    switch (mode) {
        case 'insert':
            node = formatWFS.writeTransaction([f], null, null, formatGML);
            break;
        case 'update':
            node = formatWFS.writeTransaction(null, [f], null, formatGML);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
    }
	
	/*
	              var node = format.writeTransaction([feature], null, null, {
                    gmlOptions: {srsName: "EPSG:3857"},
                    featureNS: "fiware",
                    featureType: "fiware:fw_core"


                });
	*/
	
    var payload = xs.serializeToString(node);
	console.log(payload);
    
	$.ajax('https://www.unimap.com.pl:1443/geoserver/wfs', {
        type: 'POST', //'POST'
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload
    }).done(function() {
        vectorSourceOsnowaXy.clear(); //załadowanie featurów od nowa żeby była zgodność id
    });
};


var transactWFS2 = function (mode, f) {
    var node;
    switch (mode) {
        case 'insert':
            node = formatWFS.writeTransaction([f], null, null, formatGMLwizury);
            break;
        case 'update':
            node = formatWFS.writeTransaction(null, [f], null, formatGMLwizury);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGMLwizury);
            break;
    }
	
    var payload = xs.serializeToString(node);
	console.log(payload)
    
	$.ajax('https://www.unimap.com.pl:1443/geoserver/wfs', {
        type: 'POST', //'POST'
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload
    }).done(function() {
        vectorSourceWizury.clear(); //załadowanie featurów od nowa żeby była zgodność id
    });
};

//dla WFS na razie nieużywane
var loadFeaturesOsnowa = function(response, projection) {
	
		  var format = new ol.format.GeoJSON();
	  
      var features = format.readFeatures(response,
          {featureProjection: projection});
		  
  //vectorSourceOsnowaXy.addFeatures(vectorSourceOsnowaXy.readFeatures(response));
  vectorSourceOsnowaXy.addFeatures(filtrujObiekty(features));
};



var clusterSourceCmOsnowaXy = new ol.source.Cluster({
  distance: 15,
  source: vectorSourceOsnowaXy
});
		

var vectorLayerOsnowaXy = new ol.layer.Vector({
  //source: vectorSourceOsnowaXy,
  source: clusterSourceCmOsnowaXy,
  title: 'Osnowa Katowice 2019',
  name: 'Osnowa Katowice 2019',
  zIndex: 100,
  //type: 'base',
  style: styleCmDefault,
  layer_type: 'vector'
});

myLayers.push(vectorLayerOsnowaXy);		  


var vectorLayerWizury = new ol.layer.Vector({
  //source: vectorSourceOsnowaXy,
  source: vectorSourceWizury,
  title: 'Osnowa Katowice 2019 - wizury',
  name: 'Osnowa Katowice 2019 - wizury',
  zIndex: 90,
  //type: 'base',
  style: styleCmDefaultWizury,
  layer_type: 'vector'
});

myLayers.push(vectorLayerWizury);		  


