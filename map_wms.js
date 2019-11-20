//warstwa Messtichblatów BW

var layerMesstichblatt25kbw = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		//preload: Infinity,
		url: 'https://www.unimap.com.pl:1443/geoserver/wms',
		serverType:'geoserver',
		params:{
			'LAYERS':"dm_workspace:messtichblat_bw",
			'VERSION' : '1.1',
			'TILED':true
		}
	}),
    type: 'overlay',
	title: 'Messtichblatt 25k (bw)',
	name: 'Messtichblatt 25k (bw)',
	visible: false
});


/*
//MapQuest Orto
	var layerMapQuest = new ol.layer.Tile({
		source: new ol.source.MapQuest({layer: 'sat'}),
		title: 'Satelitarne z MapQuest',
		type: 'base',
		name: 'MapQuest Orto',
        visible: false
	})
*/

 //wartwa OpenStreetMap
 
       var openStreetMapLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
		title: 'Open Street Map',
		name: 'OpenStreet Map',
		visible: false
      });
	  
	  

 //wartwa OpenCyclemap	  
 
var openCycleMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM({
    attributions: [
      new ol.Attribution({
        html: 'All maps &copy; ' +
            '<a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
      }),
      ol.source.OSM.ATTRIBUTION
    ],
    url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
  }),
  type: 'base',
  title: 'Open Cycle Map',
  name: 'OpenCycle Map',
  visible: false
});

// WARSTWA ORTOFOTOMAPY GEOPORTALU
	
	
	//var wmsSourceGeoportal = new ol.source.TileWMS({
	//  url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?',
	//  params: {
	//	  'LAYERS': 'Raster',
	//	  'VERSION' : '1.3'
	//	  },
	//  serverType: 'mapserver'
	//  //serverType: 'geoserver'  ORTOFOTOMAPA:
	//});

	
		var wmsSourceGeoportal = new ol.source.TileWMS({
	  //url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?',
	  //url: 'proxy.php?http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer??',
	  url: 'https://map.unimap.com.pl:1443/mapproxy/service?version=1.3.0&',
	  params: {
		  'LAYERS': 'Raster',
		  'VERSION' : '1.3'
		  },
	  crossOrigin: 'Anonymous',
	  serverType: 'mapserver'
	  //serverType: 'geoserver'  ORTOFOTOMAPA:
	});

	
	
	var wmsLayerOrtoGeoportal = new ol.layer.Tile({
	  source: wmsSourceGeoportal,
	  html: '&copy; ' +
            '<a href="http://geoprtal.gov.pl' +
            'Mapy GEOPORTAL</a>',
	  title: 'Ortofotomapa z Geoportalu',
	  type: 'base',
	  name: 'Geoportal orto',
      visible: true,
	  layer_type: 'raster'
	});

	
		var wmsSourceKatowiceOrto = new ol.source.TileWMS({
	  //url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?',
	  //url: 'proxy.php?http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer??',
	  //url: 'https://map.unimap.com.pl:1443/mapproxy/service?version=1.3.0&',
	  //url: 'http://emapa.katowice.eu/arcgis/services/orto2018/MapServer/WMSServer?',
	  url: 'https://map.unimap.com.pl:1443/mapproxy/service?version=1.3.0&',
	  params: {
		  'LAYERS': 'Kato',
		  'VERSION' : '1.3'
		  },
	  crossOrigin: 'Anonymous',
	  serverType: 'mapserver'
	  //serverType: 'geoserver'  ORTOFOTOMAPA:
	});

	
	
	var wmsLayerOrtoKatowice = new ol.layer.Tile({
	  source: wmsSourceKatowiceOrto,
	  html: '&copy; ' +
            '<a href="http://geoprtal.gov.pl' +
            'Mapy GEOPORTAL</a>',
	  title: 'Ortofotomapa z UM Katowice',
	  type: 'base',
	  name: 'Katowice orto 2018',
      visible: false,
	  layer_type: 'raster'
	});

	
	
	// WARSTWA MAPY TOPOGRAFICZNEJ GEOPORTALU
	
	//var wmsSourceGeoportalTopo = new ol.source.TileWMS({
	// url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/TOPO/MapServer/WMSServer?',
	//  params: {
	//	  'LAYERS': 'Raster',
	//	  'VERSION' : '1.3'
	//	  },
	//  serverType: 'mapserver'
	//  //serverType: 'geoserver'  ORTOFOTOMAPA:
	//});

		var wmsSourceGeoportalTopo = new ol.source.TileWMS({
	  //url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/TOPO/MapServer/WMSServer?',
	  url: 'https://map.unimap.com.pl:1443/mapproxy/service?version=1.3.0&',
	  
	  params: {
		  'LAYERS': 'Topo',
		  'VERSION' : '1.3'
		  },
	  //crossOrigin: "Anonymous",
	  serverType: 'mapserver'
	  //serverType: 'geoserver'  ORTOFOTOMAPA:
	});

	
	var wmsLayerGeoportalTopo = new ol.layer.Tile({
	  source: wmsSourceGeoportalTopo,
	  html: '&copy; ' +
            '<a href="http://geoprtal.gov.pl' +
            'Mapy GEOPORTAL</a>',
	  title: 'Topografki z Geoportalu',
	  type: 'base',
	  name: 'Geoportal topo',
      visible: false,
	  layer_type: 'raster'
	});
	
//



//WARSTWA BING LAYERS

var layerBingMaps = new ol.layer.Tile({
            source: new ol.source.BingMaps({
              imagerySet: 'aerial', //aerial, aerial with labels, birdseye, Road
              key: 'Ano9rySgzRHC4IG3kLSMq6IjhgeKYTRtDwFMW-Y8TKtTeiCg6aAtSitfFoL5coiv'
            }),
			title: 'Ortoobrazy z BING-a',
			type: 'base',
			name: 'BingMaps Orto',
            visible: false,
			layer_type: 'raster'
          })

var layerBingMapsRoad = new ol.layer.Tile({
            source: new ol.source.BingMaps({
              imagerySet: 'Road', //aerial, aerial with labels, birdseye, Road
              key: 'Ano9rySgzRHC4IG3kLSMq6IjhgeKYTRtDwFMW-Y8TKtTeiCg6aAtSitfFoL5coiv'
            }),
			title: 'Mapa z BING-a',
			type: 'base',
			name: 'BingMaps Map',
            visible: false,
			layer_type: 'raster'
          })
		  //


var podkladReferencyjny = new ol.layer.Group({
  layers: [openStreetMapLayer, openCycleMapLayer, wmsLayerOrtoGeoportal, wmsLayerOrtoKatowice, wmsLayerGeoportalTopo, layerBingMapsRoad, layerBingMaps],
  name: 'Warstwy referencyjne:',
  layer_type: 'group'
});		  

myLayers.push(podkladReferencyjny);		
//myLayers.push(layerMesstichblatt25kbw);
//myLayers.push(wmsLayerGeoportalTopo);
//myLayers.push(wmsLayerOrtoGeoportal);		  
//myLayers.push(layerBingMaps);		  
//myLayers.push(layerMapQuest);		  
