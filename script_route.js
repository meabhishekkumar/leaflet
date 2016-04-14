(function() {



  //map 2
  var routemap = L.map('routemap').setView([10.0, 0.0], 2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoibWVhYmhpc2hla2t1bWFyIiwiYSI6ImNpbXhja2lpZjAzbGl2aG00c2R2bHdpMzQifQ.9YWg14IU9DsXNbfru1g7Sw'
  }).addTo(routemap);


  queue()
    .defer(d3.csv, "final_routes.csv")
    .await(ready);

  function ready(error, data) {
    if (error) throw error;
    //var sampled = _.sampleSize(data, [n = 3500])

    _.forEach(data, function(d) {
      d.Source_Latitude = +d.Source_Latitude;
      d.Source_Longitude = +d.Source_Longitude;

      d.Destination_Latitude = +d.Destination_Latitude;
      d.Destination_Longitude = +d.Destination_Longitude;

      if (! isNaN(d.Source_Latitude) && ! isNaN(d.Source_Longitude) && ! isNaN(d.Destination_Latitude) && ! isNaN(d.Destination_Longitude))
      {
        L.Polyline.Arc([d.Source_Latitude, d.Source_Longitude], [d.Destination_Latitude, d.Destination_Longitude], {color: '#FFDF00', weight:1, opacity: 0.1 }).addTo(routemap);

      }
    });


  }


})();
