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

	function wstawionoNowyFeatureCm(feature)
	{
	   console.log('Wstawiłem nowego ficzera');
	   console.log(feature);
	   
	   
	}
	
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
 	function wstawNowyFeatureCm()
	{
	
	    var button = document.getElementById('button-newfeature');
	
	   if (hasClass(button, 'button-notpressed'))
	   {
			interactionDrawNewCm = new ol.interaction.Draw({
                            type: 'Point',
                            //source: vectorLayerCm.getSource()
							source: vectorSourceCm
                        });
						
			 interactionDrawNewCm.on('drawend', function(event) {
				// create a unique id
				// it is later needed to delete features
				var id = uid();
				// give the feature this id
				event.feature.setId(id);
				// save the changed data
				wstawionoNowyFeatureCm(event.feature); 
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

  button.addEventListener('click', wstawNowyFeatureCm, false);
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
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  scale: 0.7
		}),
		text: new ol.style.Text({
          text: feature.values_.features[0].values_.opis_mapa,
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


   var styleCmHover = function(feature, resolution) {
    var size = feature.get('features').length;
	var style;
    //var style = styleCache[size];
    //if (!style) {
		
	if (size>1)
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
	else	
	{
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  scale: 1.2
		}),
		text: new ol.style.Text({
          text: feature.values_.features[0].values_.opis_krotki,
		  font: 'Italic 15px sans-serif',
		  textAlign: 'left',
		  offsetX: 20,
		  offsetY: -20,
          fill: new ol.style.Fill({
            color: '#eef'
          })
		})  
      })];
	 }

    //  styleCache[size] = style;
    //}
	
    return style;
  }
  
    var styleCmSelect = function(feature, resolution) {
    var size = feature.get('features').length;
	var style;
    //var style = styleCache[size];
    //if (!style) {
		
	if (size>1)
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
	else	
	{
      style = [new ol.style.Style({
		image: new ol.style.Icon({
		  src: 'icons/' + feature.values_.features[0].values_.kategoria_id + '.png',
		  scale: 1.0
		}),
		text: new ol.style.Text({
          text: '',
		  fontFamily: 'sans-serif',
          fontSize: 20,
		  textAlign: 'left',
		  offsetX: 20,
		  offsetY: -20,
          fill: new ol.style.Fill({
            color: '#eef'
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

// select interaction working on "mousemove"
var selectMouseMove = new ol.interaction.Select({
  condition: ol.events.condition.mouseMove,
  style: styleCmHover
});



// CIEKAWE MIEJSCA

var vectorSourceCm = new ol.source.ServerVector({
  format: new ol.format.GeoJSON(),
  loader: function(extent, resolution, projection) {
    //var url = 'http://localhost:8081/geoserver/wfs?service=WFS&' +
	var url = 'http://unimap.homenet.org:8081/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=dm_workspace:ciekawe_miejsca&' +
        'outputFormat=text/javascript&format_options=callback:loadFeaturesCm' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });
  },
  strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
    maxZoom: 25
  })),
  projection: 'EPSG:3857'
});

var loadFeaturesCm = function(response) {
  vectorSourceCm.addFeatures(vectorSourceCm.readFeatures(response));
};


var clusterSourceCm = new ol.source.Cluster({
  distance: 30,
  source: vectorSourceCm
});
		

var vectorLayerCm = new ol.layer.Vector({
  //source: vectorSourceCm,
  source: clusterSourceCm,
  title: 'POLSKA - ciekawe miejsca',
  name: 'Ciekawe miejsca',
  //type: 'base',
  style: styleCmDefault,
  layer_type: 'vector'
});

myLayers.push(vectorLayerCm);		  





