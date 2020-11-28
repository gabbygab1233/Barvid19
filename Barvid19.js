 // Making a map and tile
 const map = L.map('map', {zoomControl: false, condensedAttributionControl: false }).setView([14.5700, 121.0223], 11.5);
	
 const attribution =
   ' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://www.mapbox.com/">Mapbox</a> contributors' ;


 const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tileUrl2 = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
 const tiles = L.tileLayer(tileUrl, { attribution });
 tiles.addTo(map);




 grayscale   = L.tileLayer(tileUrl2, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: attribution})
 var info = L.control();
 var info_1 = L.control();
 var zoomHome = L.Control.zoomHome();
		   zoomHome.addTo(map);

		   var sidebar = L.control.sidebar('sidebar').addTo(map);
		   info.onAdd = function (map) {
this._div = L.DomUtil.create('div', 'info');
this.update();
return this._div;
};

info.update = function (props) {
   this._div.innerHTML = '<div style=\"color: blue\"> <p class="ex1">Barangay</p>' +  (props ?
	   '<b>' + props.Barangay + ", "+ '<br>' + props.City + '</b></div>' + '<div style=\"color: red\"> <p class="ex1">Confirmed Cases</p>'+ '<b>'  + props.Confirmed_Cases + '</div> '
	   : 'Hover over a barangay');
};

info.addTo(map);
//L.control.navbar().addTo(map);
// get color depending on confirmed cases value
function getColor(d) {
   return 	d > 30   ? '#cc0000':
		   d > 25  ? '#e60000':
		   d > 20  ? '#ff0000':
		   d > 15  ? '#ff4000' :
		   d > 10   ? '#ff8000' :
		   d > 5   ? '#ffbf00' :
		   d >= 1     ? '#ffff00 ':
						'green';
}

function style(feature) {
   return {
	   weight: 1.2,
	   opacity: 1,
	   color: 'black',
	   fillOpacity: 0.5,
	   fillColor: getColor(feature.properties.Confirmed_Cases)
   
   };
}

// ncr_barangay highlight feature
function highlightFeature_barangay(e) {
   var layer = e.target;

   layer.setStyle({
	   weight: 1.2,
	   color: 'black',
	   fillOpacity: 0.1
   });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	   layer.bringToFront();
   }
   info.update(layer.feature.properties);
}

// confirmed highlightfeature
function highlightFeature_confirmed(e) {
   var layer = e.target;

   layer.setStyle({
	   weight: 1.0,
	   color: 'black',
	   fillOpacity: 0.1
   });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	   layer.bringToFront();
   }
   info.update(layer.feature.properties);
}

// city highlightfeature
function highlightFeature_city(e) {
   var layer = e.target;

   layer.setStyle({
	   weight: 1.0,
	   color: 'black',
	   fillOpacity: 0.1
   });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	   layer.bringToFront();
   }
   info.update(layer.feature.properties);
}


//Areas Under GCQ and ECQ
function highlightFeature_GCQ(e) {
   var layer = e.target;

   layer.setStyle({
	   weight: 1.0,
	   color: 'black',
	   fillOpacity: 0.1
   });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	   layer.bringToFront();
   }
   info.update(layer.feature.properties);
}

//Barangay with Extreme Enchanced Community Quarantine
function highlightFeature_eecq(e) {
   var layer = e.target;

   layer.setStyle({
	   weight: 1.0,
	   color: 'black',
	   fillOpacity: 0.1
   });

   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	   layer.bringToFront();
   }
   info.update(layer.feature.properties);
}
var ncr_barangay;
var confirmed;
var ncr_city;
var hospitals;
var testingcenter;
var quarantinefacilities;
var Areas_ECQ_GCQ;
var eecq;




// ncr_barangay functions
function resetHighlight_barangay(e) {
ncr_barangay.resetStyle(e.target);
info.update();
}

function zoomToFeature(e) {
map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
layer.on({
   mouseover: highlightFeature_barangay,
   mouseout: resetHighlight_barangay,
   click: zoomToFeature
});
}

// confirmed functions

function resetHighlight_confirmed(e) {
confirmed.resetStyle(e.target);
info.update();
}


function onEachFeature_confirmed(feature, layer) {
layer.on({
   mouseover: highlightFeature_confirmed,
   mouseout: resetHighlight_confirmed,
   click: zoomToFeature
});
}


// ncr_city functions
function resetHighlight_city(e) {
ncr_city.resetStyle(e.target);
info.update();
}


function onEachFeature_city(feature, layer) {
layer.on({
   mouseover: highlightFeature_city,
   mouseout: resetHighlight_city,
   click: zoomToFeature
});
}

// Areas Under ECQ and GCQ until may 31
function resetHighlight_GCQ(e) {
Areas_ECQ_GCQ.resetStyle(e.target);
info.update();
}

function onEachFeature_GCQ(feature, layer) {

   layer.bindPopup('<strong style="color: darkred;"> '+ feature.properties.Region + '</strong><br/>');

layer.on({
   mouseover: highlightFeature_GCQ,
   mouseout: resetHighlight_GCQ,
   click: zoomToFeature
});
}

// Barangay with Extreme Enhanced Community Quarantine
function resetHighlight_eecq(e) {
eecq.resetStyle(e.target);
info.update();
}


function onEachFeature_eecq(feature, layer) {
layer.on({
   mouseover: highlightFeature_eecq,
   mouseout: resetHighlight_eecq,
   click: zoomToFeature
});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ncr geojson
ncr_barangay = L.geoJson(barangay_js, {
style: style,
onEachFeature: onEachFeature,

}).addTo(map)

//confirmed geojson

confirmed = L.geoJson(barangay_js, {
style: function(feature){
   var fillColor,
   confirmed = feature.properties.Confirmed_Cases;
   if (confirmed >= 1) fillColor ='red';
   else if (confirmed == 0) fillColor ='green';
   else fillColor='black';
   return { color:'black', weight:1.2, fillColor:fillColor, fillOpacity:0.5}
},
onEachFeature: onEachFeature_confirmed

})

// ncr_city geojson
ncr_city= L.geoJson(city_geo, {
style: function(feature){
   var fillColor,
   confirmed = feature.properties.Confirmed_Cases;
   if (confirmed > 500) fillColor ='#cc0000';
   else if (confirmed > 400) fillColor ='#e60000';
   else if (confirmed > 300) fillColor ='#ff0000';
   else if (confirmed > 200) fillColor ='#ff4000';
   else if (confirmed > 100) fillColor ='#ff8000';
   else if (confirmed > 1) fillColor ='#ffbf00';
   else if (confirmed == 0) fillColor ='#ffff00 ';
   else fillColor='black';
   return { color:'black', weight:1.2, fillColor:fillColor, fillOpacity:0.5}
},
onEachFeature: onEachFeature_city,

})

// Areas under GCQ & ECQ until may 31
Areas_ECQ_GCQ = L.geoJson(AreasECQGCQ, {
style: function(feature){
   var fillColor,
   Class = feature.properties.Class;
   if (Class >= 3) fillColor ='red';
   else if (Class >= 2) fillColor ='yellow';
   else if (Class >= 1) fillColor = 'green';
   
   else fillColor='black';
   return { color:'black', weight:1.2, fillColor:fillColor, fillOpacity:0.5};

   
},
onEachFeature: onEachFeature_GCQ,

})

// Barangay with Extreme Enhanced Community Quarantine

eecq = L.geoJson(EECQ, {
style: function(feature){
   var fillColor,
   confirmed = feature.properties.Confirmed_Cases;
   if (confirmed >= 1) fillColor ='red';
   else fillColor='black';
   return { color:'black', weight:1.2, fillColor:fillColor, fillOpacity:0.5};

   
},
onEachFeature: onEachFeature_eecq,

})




// Hospital
var hosticon = L.icon({
iconUrl: 'https://www.shareicon.net/data/512x512/2016/04/21/753224_hospital_512x512.png',
iconSize: [30,30],
});
hospital = L.geoJson(ncr_hospitals,{
pointToLayer:function(feature, latlng){
   var marker = L.marker(latlng, {icon: hosticon});
   marker.bindPopup('<b>Hospital:</b> <strong style="color: green;"> '+ feature.properties.Hospitals + '</strong><br/>' + '<b>Address:</b> <span style=\"color": green;"> ' + feature.properties.Address + '<br/>' + '<b>Status:</b> <strong style="color: orange;"> ' + feature.properties.Status + '</strong>');
   return marker;
}
})


var cluster = L.markerClusterGroup({});
cluster.addLayer(hospital);

//Testing Center
var centericon = L.icon({
iconUrl: 'testing_center.png',
iconSize: [30,30],

});

testingcenter= L.geoJson(testing_center,{
pointToLayer:function(feature, latlng){
   var marker = L.marker(latlng, {icon: centericon});
   marker.bindPopup('<b>Hospital:</b> <strong style="color: green;"> '+ feature.properties.testing_center + '</strong><br/>' + '<b>Address:</b> <span style=\"color": green;"> ' + feature.properties.Address + '<br/>' + '<b>Number of Test:</b> <strong style="color: orange;"> ' + feature.properties.Test + '</strong>');
   return marker;
}
})

var cluster_center = L.markerClusterGroup({});
cluster_center.addLayer(testingcenter);


// Quarantine facilities
var quarantineicon = L.icon({
iconUrl: 'quarantinefacilities.png',
iconSize: [30,30],

});

quarantinefacilities = L.geoJson(facilities_js,{
pointToLayer:function(feature, latlng){
   var marker = L.marker(latlng, {icon: quarantineicon});


   marker.bindPopup('<b>Quarantine Center:</b> <strong style="color: green;"> '+ feature.properties.Facilities + '</strong><br/>' + '<b>Address:</b> <span style=\"color": green;"> ' + feature.properties.Address + '<br/>' + '<b>Capacity:</b> <strong style="color: red;"> ' + feature.properties.Capacity + '</strong>');
   return marker;
}
})


var cluster_quarantine= L.markerClusterGroup({});
cluster_quarantine.addLayer(quarantinefacilities);






var baseMaps = {
"<b>Open Street Map</b>": tiles,
"<b>Gray Scale</b>": grayscale,



};

var groupedOverlays = {
"ECQ & GCQ":{
   "Areas Under ECQ & GCQ Until May 31":Areas_ECQ_GCQ
},
 "COVID-19 Case/s": {
   "Barangay View": ncr_barangay,
	 "City View": ncr_city,
	 "Barangay with confirmed and no case/s": confirmed,
	 "Barangay with Extreme Enhanced Community Quarantine": eecq
	 
 },
 "COVID-19 Health Facilities": {
   "<img src='https://www.shareicon.net/data/512x512/2016/04/21/753224_hospital_512x512.png' height='25' width='25'  /> <span class='my-layer-item'>Hospital</span>": cluster,
	 "<img src='testing_center.png' height='25' width='25'  /> <span class='my-layer-item'>Testing Center</span>": cluster_center,
	 "<img src='quarantinefacilities.png' height='25' width='25'  /> <span class='my-layer-item'>Quarantine Center</span>": cluster_quarantine
 }
};

//L.control.layers(baseMaps, groupedOverlays).addTo(map)
L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);


var searchControl = new L.Control.Search( {
layer: ncr_barangay,
propertyName: 'Barangay',
textPlaceholder: 'Search for Barangay',

marker: false,
moveToLocation: function(latlng, title, map) {
	   //map.fitBounds( latlng.layer.getBounds() );
	   var zoom = map.getBoundsZoom(latlng.layer.getBounds());
		 map.setView(latlng, zoom); // access the zoom
   }
});


searchControl.on('search:locationfound', function(e) {
   
   //console.log('search:locationfound', );

   //map.removeLayer(this._markerSearch)

   e.layer.setStyle({fillOpacity: 0.1, color: 'black'});
   if(e.layer._popup)
	   e.layer.openPopup();

}).on('search:collapsed', function(e) {

   featuresLayer.eachLayer(function(layer) {	//restore feature color
	   featuresLayer.resetStyle(layer);
   });	
});

map.addControl( searchControl ); 



map.attributionControl.addAttribution('<a href="https://www.linkedin.com/in/gabriel-joshua-miguel/">Developer</a> Last update July 19')




map.addControl(L.control.locate({
   setView:'always',
strings: {
   title: "Show my location"
},
  locateOptions: {
		  maxZoom: 200,
		  enableHighAccuracy: true
}}));


var barangay_legend = L.control({position: 'bottomright'});
var confirmed_legend = L.control({position: 'bottomright'});
var city_legend = L.control({position: 'bottomright'})
var GCQ_ECQ_legend = L.control({position:'bottomright'});

barangay_legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');
//labels = ['<strong>Confirmed Cases</strong>'];
div.innerHTML += '<strong>Confirmed Cases</strong><br>';
div.innerHTML += '<i style="background: green"></i><span>No Case/s</span><br>';
div.innerHTML += '<i style="background: #ffbf00"></i><span>1-5</span><br>';
div.innerHTML += '<i style="background: #ff8000"></i><span>5-10</span><br>';
div.innerHTML += '<i style="background: #ff4000"></i><span>10-15</span><br>';
div.innerHTML += '<i style="background: #ff0000"></i><span>15-20</span><br>';
div.innerHTML += '<i style="background:  #e60000"></i><span>20-25</span><br>';
div.innerHTML += '<i style="background: #cc0000"></i><span>30+</span><br>';
return div;
};


confirmed_legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');

div.innerHTML += '<i style="background: red"></i><span>Confirmed Case/s</span><br>';
div.innerHTML += '<i style="background: green"></i><span>No Confirmed Case/s</span><br>';

return div;
};

barangay_legend.addTo(map);

city_legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');

div.innerHTML += '<strong>Confirmed Cases</strong><br>';
div.innerHTML += '<i style="background: green"></i><span>No Case/s</span><br>';
div.innerHTML += '<i style="background: #ffbf00"></i><span>1-100</span><br>';
div.innerHTML += '<i style="background: #ff8000"></i><span>100-200</span><br>';
div.innerHTML += '<i style="background: #ff4000"></i><span>200-300</span><br>';
div.innerHTML += '<i style="background: #ff0000"></i><span>300-400</span><br>';
div.innerHTML += '<i style="background:  #e60000"></i><span>400-500</span><br>';
div.innerHTML += '<i style="background: #cc0000"></i><span>500+</span><br>';
//labels = ['<strong>Confirmed Cases</strong>'];


return div;
};


GCQ_ECQ_legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');
//labels = ['<strong>Confirmed Cases</strong>'];

div.innerHTML += '<i style="background: green"></i><span>Minimum Health Standards No ECQ or GCQ</span><br>';
div.innerHTML += '<i style="background: yellow"></i><span>General Community Quarantine</span><br>';
div.innerHTML += '<i style="background: red"></i><span>Modified Enchanced Community Quarantine</span><br>';

return div;
};



map.on('overlayadd', function (eventLayer) {
// Switch to the Population legend...
if (eventLayer.name == 'Barangay View') {
   this.removeControl(confirmed_legend);
   this.removeControl(city_legend);
   this.removeControl(GCQ_ECQ_legend);
   barangay_legend.addTo(this);
   
} else if  (eventLayer.name =='Barangay with confirmed and no case/s') { // Or switch to the Population Change legend...
   this.removeControl(barangay_legend);
   this.removeControl(city_legend);
   this.removeControl(GCQ_ECQ_legend);
   confirmed_legend.addTo(this);

} else if  (eventLayer.name =='City View') { // Or switch to the Population Change legend...
   this.removeControl(barangay_legend);
   this.removeControl(confirmed_legend);
   this.removeControl(GCQ_ECQ_legend);
   city_legend.addTo(this);
   
} else if  (eventLayer.name =='Areas Under ECQ & GCQ Until May 31') { // Or switch to the Population Change legend...
this.removeControl(barangay_legend);
this.removeControl(confirmed_legend);
this.removeControl(city_legend);
GCQ_ECQ_legend.addTo(this);
}
else {
   this.removeControl(barangay_legend);
   this.removeControl(confirmed_legend);
   this.removeControl(city_legend);
   this.removeControl(GCQ_ECQ_legend);
}
});

L.control.fullscreen(
		   {"forceSeparateButton": true, "position": "topright", "title": "Expand me", "titleCancel": "Exit me"}
	   ).addTo(map);
	   map.on('enterFullscreen', function(){
console.log('entered fullscreen');
});

map.on('exitFullscreen', function(){
console.log('exited fullscreen');
});

// you can also toggle fullscreen from map object
//map.toggleFullScreen();




