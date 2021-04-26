// to see the dataset available we can go to the website below

// https://developers.google.com/earth-engine/datasets/catalog

/// to find these dataset, use searchbar on the top


//print(L8.size());

// SO, now if i want images only from patuakhali and with only less than 1% cloud
// coverage and images from 2017

// steps drawing polygon on the map

var fil_reg = L8.filterBounds(region);
print(fil_reg.size())

// now we want to apply less than 1% cloud cover filter
// this is done by filter metadata 

// filter metadata needs three params - name (property), operator and value

var fil_date = fil_reg.filterDate('2017-01-01', '2020-01-01');
var fil = fil_date.filterMetadata('CLOUD_COVER', 'less_than', 1);

print(fil.size())

// there will be many images after the filtration. So we pick the median image

var median_image = fil.median();
Map.addLayer(median_image);
