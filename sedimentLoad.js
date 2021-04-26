// 1. No sedimentation (0)
// 2. Low sedimentation (1)

// 3. Moderate sedimentation (2)

// 4. High sedimentation (3)
var marine_rect = ee.FeatureCollection("users/nahian_ahmed/bgd_marine_rect");

print(marine_rect)
print(cor)

Map.addLayer(marine_rect);

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
  
// Images for  nov_dec of 2018
var fil_2018_nov_dec = filtered.filterDate('2018-11-01','2019-12-30')
                           .mean()
                           .select('B4', 'B3', 'B2')
                           .clip(bgd);
                           

// Images for  jan_feb of 2019
var fil_2019_jan_feb = filtered.filterDate('2019-01-01','2019-02-28')
                           .mean()
                           .select('B4', 'B3', 'B2')
                           .clip(bgd);
                           
                           
                           
// Images for  nov_dec of 2019
var fil_2019_nov_dec = filtered.filterDate('2019-11-01','2019-12-30')
                           .mean()
                           .select('B4', 'B3', 'B2')
                           .clip(bgd);
                           
                           
                           
// Images for  jan_feb of 2020
var fil_2020_jan_feb = filtered.filterDate('2020-01-01','2020-02-28')
                           .mean()
                           .select('B4', 'B3', 'B2')
                           .clip(bgd);
                           
                           
// Images for  nov_dec of 2020
var fil_2020_nov_dec = filtered.filterDate('2020-11-01','2020-12-15')
                           .mean()
                           .select('B4', 'B3', 'B2')
                           .clip(bgd);
                           
                           
// Visualization parameters
var visualization = {
  gain: '0.1, 0.1, 0.1', 
  scale:10
};





// Map.addLayer(bgd);

Map.addLayer(fil_2018_nov_dec, visualization, 'nov_dec_2018',0);

// Map.addLayer(fil_2019_jan_feb, visualization, 'jan_feb_2019',1);

// Map.addLayer(fil_2019_nov_dec, visualization, 'dec_2019',0);

// Map.addLayer(fil_2020_jan_feb, visualization, 'jan_feb_2020',0);


// taking the diffrence between two geom
// var diff1 = no_sediment_jan2019.difference(low_sediment_jan2019, ee.ErrorMargin(1));
// Map.addLayer(diff1, {color: 'FFFF00'}, 'diff1');


// Export.table.toDrive({
//   collection: ee.FeatureCollection(bgd),
//   description:'basemap',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment'
// });


// // exporting jan2019
// Export.table.toDrive({
//   collection: ee.FeatureCollection(no_sed_jan2019),
//   description:'no_sed_jan2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2019'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(low_sed_jan2019),
//   description:'low_sed_jan2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2019'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(mod_sed_jan2019),
//   description:'mod_sed_jan2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2019'
// });


// // exporting dec2019
// Export.table.toDrive({
//   collection: ee.FeatureCollection(no_sediment_dec2019),
//   description:'no_sediment_dec2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2019'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(low_sediment_dec2019),
//   description:'low_sediment_dec2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2019'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(moderate_sediment_dec2019),
//   description:'moderate_sediment_dec2019',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2019'
// });


// // exporting jan2020
// Export.table.toDrive({
//   collection: ee.FeatureCollection(no_sediment_jan2020),
//   description:'no_sediment_jan2020',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2020'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(low_sediment_jan2020),
//   description:'low_sediment_jan2020',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2020'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(moderate_sediment_jan2020),
//   description:'moderate_sediment_jan2020',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_jan2020'
// });


// // exporting dec2018
// Export.table.toDrive({
//   collection: ee.FeatureCollection(no_sediment_dec2018),
//   description:'no_sediment_dec2018',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2018'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(low_sediment_dec2018),
//   description:'low_sediment_dec2018',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2018'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(moderate_sediment_dec2018),
//   description:'moderate_sediment_dec2018',
//   fileFormat: 'SHP',
//   folder: 'labels_marine_sediment_dec2018'
// });


// Export.table.toDrive({
//   collection: ee.FeatureCollection(marine_rect),
//   description:'marine_rect',
//   fileFormat: 'SHP',
//   folder: 'TAHMID'
// });

