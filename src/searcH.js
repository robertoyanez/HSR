var map;
      var geocoder;
      var clickLat = 40.41349604970198;
      var clickLng = -3.7051391601562;
     
        function initialize() {
          var latlng = new google.maps.LatLng(clickLat,clickLng);
          var mapDiv = document.getElementById('map_canvas');
          var mapOptions = {
            zoom: 12,
            center: latlng,
            //panControl: true,
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(mapDiv, mapOptions);
          geocoder = new google.maps.Geocoder();
          // new button

          var geoDiv = document.createElement('div');
          var centerControl = new CenterControl(geoDiv, map);
          geoDiv.index = 1;
          map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(geoDiv);

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

        // geolocation event
        function CenterControl(controlDiv, map) {

              // Set CSS for the control border
              var controlUI = document.createElement('div');
              controlUI.style.backgroundColor = '#fff';
              controlUI.style.border = '2px solid #fff';
              controlUI.style.borderRadius = '3px';
              controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
              controlUI.style.cursor = 'pointer';
              controlUI.style.marginBottom = '28px';
              controlUI.style.textAlign = 'center';
              controlUI.title = 'Muestra tu ubicación';
              controlDiv.appendChild(controlUI);

              // Set CSS for the control interior
              var controlText = document.createElement('div');
              controlText.style.color = 'rgb(25,25,25)';
              controlText.style.fontFamily = 'Roboto';
              controlText.style.fontSize = '16px';
              controlText.style.lineHeight = '50px';
              controlText.style.paddingLeft = '5px';
              controlText.style.paddingRight = '5px';
              controlText.innerHTML = '<div class="geo"><img src="img/png/geolocation.png" class="img-responsive"></div>';
              controlUI.appendChild(controlText);

              // Setup the click event listeners: simply set the map to
              // Chicago
              google.maps.event.addDomListener(controlUI, 'click', function() {
                geolocation();
              });

            }

        google.maps.event.addDomListener(window, 'load', initialize);
        // --------------------------------------------------------------------------*
        var city = 0;
        // ------------------------------------------ geolocalitation
        function geolocation(){
            if(!!navigator.geolocation) {            
                navigator.geolocation.getCurrentPosition(function(position) {
                
                    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    
                    placeMarker(geolocate);                    
                    map.setCenter(geolocate);
                  // get city with current position;
                   geocoder.geocode({'latLng': geolocate}, function(results, status)
                    {
                        //alert("Else loop1");
                        if (status == google.maps.GeocoderStatus.OK)
                         {
                            if (results[0])
                            {
                              var add= results[0].formatted_address ;
                              var  value=add.split(",");

                              count=value.length;
                              country=value[count-1];
                              state=value[count-2];
                              city=value[count-3];
                              // alert("city name is: " + city);
                            }
                            else 
                            {
                              alert("address not found");
                            }
                        }else
                        {
                        //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                        //alert("Geocoder failed due to: " + status);
                        }
                    });
                    
                });
                
            } 
            else {
                document.getElementById('map_canvas').innerHTML = 'No Geolocation Support.';
            }
        }

        // ------------------------------------------------ place autocompleted
        function placeAutocompleted(){
          var input = /** @type {HTMLInputElement} */(
              document.getElementById('hn-input'));
                
          var autocomplete = new google.maps.places.Autocomplete(input);

          autocomplete.bindTo('bounds', map);

          var infowindowA = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
          });

          google.maps.event.addListener(autocomplete, 'place_changed', function() {
            infowindowA.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
              return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            infowindowA.setContent('<div><strong>' + place.name + '</strong><br>');
            infowindowA.open(map, marker);
          });
        }

        
        // -----------------------------------------------------------------------
        
        // ------------------------------------ show latlng on the map with a click (you are here!!)
        function placeMarker(location) {
        var pin = 'img/png/mapUs.png';
          var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: pin,
          });

          map.setCenter(location);
          var infowindow = new google.maps.InfoWindow({
            //content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
            content: 'Ud está aquí!!'
          });
          // call to listeners events to the map
          // setupEvents();

          // call to write lat and lng method
          //writeLatLng(location.lat(), location.lng());

          infowindow.open(map,marker);
        }

        

        // ------------------------------------setup the listeners events to the map  
        function setupEvents() {
            google.maps.event.addListener(map, 'zoom_changed', function() {
              map.getZoom();
            });
            // --------------------------------------change the center 
           // google.maps.event.addListener(map, 'center_changed', centerChanged);

           /* google.maps.event.addDomListener(document.getElementById('show_latlng'),'dblclick', function() {
               map.setZoom(map.getZoom() + 1);
            });*/
        }

        // -------------------------------------------write lat and lng
        function writeLatLng(lat, lng){
          document.getElementById('latitude').innerHTML = lat;
          document.getElementById('longitude').innerHTML = lng;
        }

        

        
        // -----------------------------------------------------------------------------------