 var map;
      var geocoder;
      var clickLat = 40.41349604970198;
      var clickLng = -3.7051391601562;
     
        function initialize() {
          var latlng = new google.maps.LatLng(clickLat,clickLng);
          var myOptions = {
            zoom: 12,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
          geocoder = new google.maps.Geocoder();

          // call place autocompleted method
          placeAutocompleted();

          google.maps.event.addListener(map, 'click', function(event) {
            
            // call a creator marker method
            placeMarker(event.latLng);

            clickLat = event.latLng.lat();
            clickLng = event.latLng.lng();

            // call getNearlyHotels method
           // getNearlyHotels(clickLat, clickLng);

          });
        }

        google.maps.event.addDomListener(window, 'load', initialize);