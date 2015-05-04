// ------------------------------------- show nearly hoteles parsing the JSON
//function getNearlyHotels(lat, lng){
    $(document).ready(function() {
        $("#nearlyHotels").click(function(event){
          $.getJSON(getLatLngURL(500,map.getCenter().lat(),map.getCenter().lng()), function(jd) {
            for (var item in jd) { 
              var myLatlng = new google.maps.LatLng(jd[item].latitude,jd[item].longitude);
              // call to create markers method
              createMarker(myLatlng, jd[item].name);
            };map.setZoom(15);
          });
        });
      
   });
//}

// -------------------------------------------return the new url with lat and lng onclick
// var url = 'http://mlh.fdi.ucm.es:8080/Backend/SearchHotel?radio=500&lat='+lat+'&lon='+lng;
// personal server
// http://mlh1415.ddns.net:8080/SystemRecommendations/SearchHotel?radio=500&lat=40.43&lon=-3.70
function getLatLngURL(rad, lat, lng) {
    //var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/SearchHotel?radio='+rad+'&lat='+lat+'&lon='+lng;            
    var url = 'http://mlh.fdi.ucm.es:8080/Backend/SearchHotel?radio='+rad+'&lat='+lat+'&lon='+lng;
    return url;

}

// ------------------------------------------- create hotels markers on the map
function createMarker(location, nameH) {
    var hpin = 'img/png/ubed.png';
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: hpin,
    });

    google.maps.event.addListener(marker, 'click', function() {
        $("#hn-input").val(nameH); // update input hotel name
        $("#hn-input").addClass("changeColour");
      var infowindowH = new google.maps.InfoWindow({
    content: nameH
  });

      infowindowH.open(map, this);
    });
  }