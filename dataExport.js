
var marine_rect = ee.FeatureCollection("users/nahian_ahmed/bgd_marine_rect");

// Map.addLayer(marine_rect);

Map.setCenter(90.768, 21.296, 8);
// Sentinel-2 Level-2A images
var sentinel_2 = ee.ImageCollection("COPERNICUS/S2_SR");


// bangladesh area with marine cover
var bgd = ee.FeatureCollection("users/nahian_ahmed/bgd_marine");


// Sentinel-2 Level-2A images covering Bangladesh
var spatial = sentinel_2.filterBounds(bgd);

// Sentinel-2 Level-2A images covering Bangladesh
// with less than 1% cloud coverage and quality checking
var filtered = spatial.filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',2)
  .filterMetadata('GENERAL_QUALITY','equals','PASSED')
  .filterMetadata('SENSOR_QUALITY','equals','PASSED')
  .filterMetadata('RADIOMETRIC_QUALITY','equals','PASSED')
  .filterMetadata('GEOMETRIC_QUALITY','equals','PASSED');
  
var feature_bands = ['B2','B3','B4'];

// Images for  nov_dec of 2018
var fil_2018_nov_dec = filtered.filterDate('2018-11-01','2019-12-30')
                           .mean()
                           .select(feature_bands)
                           .clip(dec18);
                           

// Images for  jan_feb of 2019
var fil_2019_jan_feb = filtered.filterDate('2019-01-01','2019-02-28')
                           .mean()
                           .select(feature_bands)
                           .clip(jan19);
                           
                           
                           
// Images for  nov_dec of 2019
var fil_2019_nov_dec = filtered.filterDate('2019-11-01','2019-12-30')
                           .mean()
                           .select(feature_bands)
                           .clip(dec19);
                           
                           
                           
// Images for  jan_feb of 2020
var fil_2020_jan_feb = filtered.filterDate('2020-01-01','2020-02-28')
                           .mean()
                           .select(feature_bands)
                           .clip(jan20);
                           
                           


var palette = [
  'F6BDC0', // no sediment (class 0)  // spanish pink
  'F07470', // low sediment (class 1)  // begonia
  'EA4C46', // moderate sediment (class 2)  // carmine red
  'DC1C13', // high sediment (class 3)  // maximum red
  '696969', // land/terrestrial (class 4)  // dimgrey
];


var labels_dec18 = ee.FeatureCollection(dec18).reduceToImage({
    properties: ['FID'],
    reducer: ee.Reducer.first()
});

var labels_jan19 = ee.FeatureCollection(jan19).reduceToImage({
    properties: ['FID'],
    reducer: ee.Reducer.first()
});

var labels_dec19 = ee.FeatureCollection(dec19).reduceToImage({
    properties: ['FID'],
    reducer: ee.Reducer.first()
});

var labels_jan20 = ee.FeatureCollection(jan20).reduceToImage({
    properties: ['FID'],
    reducer: ee.Reducer.first()
});



fil_2018_nov_dec = fil_2018_nov_dec.addBands(labels_dec18.select(['first'],['classes']).int());


fil_2019_jan_feb = fil_2019_jan_feb.addBands(labels_jan19.select(['first'],['classes']).int());


fil_2019_nov_dec = fil_2019_nov_dec.addBands(labels_dec19.select(['first'],['classes']).int());


fil_2020_jan_feb = fil_2020_jan_feb.addBands(labels_jan20.select(['first'],['classes']).int());




// Visualization parameters
var visualization = {
  gain: '0.1', 
  scale:10
};




// Map.addLayer(bgd);

// Map.addLayer(fil_2018_nov_dec.select(['B4','B3','B2']), visualization, 'image_dec2018',1);

// Map.addLayer(fil_2018_nov_dec.select(['classes']),{min: 0, max: 4, palette: palette},'label_dec2018');



// Map.addLayer(fil_2019_jan_feb.select(['B4','B3','B2']), visualization, 'image_jan2019',1);

// Map.addLayer(fil_2019_jan_feb.select(['classes']),{min: 0, max: 4, palette: palette},'label_jan2019');



// Map.addLayer(fil_2019_nov_dec.select(['B4','B3','B2']), visualization, 'image_dec2019',1);

// Map.addLayer(fil_2019_nov_dec.select(['classes']),{min: 0, max: 4, palette: palette},'label_dec2019');



Map.addLayer(fil_2020_jan_feb.select(['B4']), visualization, 'image_jan2020',1);

Map.addLayer(fil_2020_jan_feb.select(['classes']),{min: 0, max: 4, palette: palette},'label_jan2020');

Map.addLayer(marine_rect);

// converting band type

fil_2018_nov_dec = fil_2018_nov_dec.toFloat();
fil_2019_jan_feb = fil_2019_jan_feb.toFloat();
fil_2019_nov_dec = fil_2019_nov_dec.toFloat();
fil_2020_jan_feb = fil_2020_jan_feb.toFloat();

//getting the bandNames
print(fil_2020_jan_feb)

//Export image to drive

// Export.image.toDrive({
//   image: fil_2018_nov_dec,
//   description: 'DEC2018_data',
//   folder: 'Dec18',
//   scale: 10, // for 10 m resolution
//   maxPixels: 1019067777,
//   region: marine_rect
// });

// Export.image.toDrive({
//   image: fil_2019_jan_feb,
//   description: 'JAN2019',
//   folder: 'marine_sediment_Jan19',
//   scale: 10, // for 10 m resolution
//   maxPixels: 1019067777,
//   region: marine_rect
// });

// Export.image.toDrive({
//   image: fil_2019_nov_dec,
//   description: 'DEC2019',
//   folder: 'marine_sediment_dec19',
//   scale: 10, // for 10 m resolution
//   maxPixels: 1019067777,
//   region: marine_rect
// });


// Export.image.toDrive({
//   image: fil_2020_jan_feb,
//   description: 'JAN2020',
//   folder: 'marine_sediment',
//   scale: 10, // for 10 m resolution
//   maxPixels: 1019067777,
//   region: marine_rect
// });




