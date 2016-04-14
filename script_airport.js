(function() {


  var airportmap = L.map('airportmap').setView([10.0, 0.0], 2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoibWVhYmhpc2hla2t1bWFyIiwiYSI6ImNpbXhja2lpZjAzbGl2aG00c2R2bHdpMzQifQ.9YWg14IU9DsXNbfru1g7Sw'
  }).addTo(airportmap);


  queue()
    .defer(d3.csv, "airport.csv")
    .await(ready);

  function ready(error, data) {
    if (error) throw error;
    var sampled = _.sampleSize(data, [n = 800])
    //due to bug with more number of sample, we are getting a background tint layer
    _.forEach(sampled, function(d) {
      d.Latitude = +d.Latitude;
      d.Longitude = +d.Longitude;
      //console.log(d.Latitude);
      var circle = L.circle([d.Latitude, d.Longitude], 50, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(airportmap);

    });

  }




})();
