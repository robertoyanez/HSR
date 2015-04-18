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
            panControl: true,
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
              controlUI.style.marginBottom = '24px';
              controlUI.style.textAlign = 'center';
              controlUI.title = 'Muestra tu ubicación';
              controlDiv.appendChild(controlUI);

              // Set CSS for the control interior
              var controlText = document.createElement('div');
              controlText.style.color = 'rgb(25,25,25)';
              controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
              controlText.style.fontSize = '16px';
              controlText.style.lineHeight = '38px';
              controlText.style.paddingLeft = '5px';
              controlText.style.paddingRight = '5px';
              controlText.innerHTML = '<div class="geo"><img src="img/png/geolocation.png"></div>';
              controlUI.appendChild(controlText);

              // Setup the click event listeners: simply set the map to
              // Chicago
              google.maps.event.addDomListener(controlUI, 'click', function() {
                geolocation();
              });

            }

        google.maps.event.addDomListener(window, 'load', initialize);
        // --------------------------------------------------------------------------*

        // ------------------------------------------ geolocalitation
        function geolocation(){
            if(!!navigator.geolocation) {            
                navigator.geolocation.getCurrentPosition(function(position) {
                
                    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    
                    placeMarker(geolocate);                    
                    map.setCenter(geolocate);
                    
                });
                
            } else {
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

        // ------------------------------------ search city
        function searchCity(city){
          var infowindowC = new google.maps.InfoWindow();
          var pyrmont = 0;
          var shieldCity = 0;
              switch(city) {
                case "Madrid":{
                    pyrmont = new google.maps.LatLng(40.416775400000000000, -3.703790199999957600);
                    shieldCity = 'img/madrid.png';
                    break;}
                case "Toledo":{
                    pyrmont = new google.maps.LatLng(39.862831600000000000, -4.027323099999990000);
                    shieldCity = 'img/toledo.png';
                    break;}
                case "Salamanca":{
                    pyrmont = new google.maps.LatLng(40.970103900000000000, -5.663539700000001000);
                    shieldCity = 'img/salamanca.png';
                    break;}
                case "Burgos":{
                    pyrmont = new google.maps.LatLng(42.343992500000000000, -3.696906000000012700);
                    shieldCity = 'img/burgos.png';
                    break;}
                case "Bilbao":{
                    pyrmont = new google.maps.LatLng(43.263012600000000000, -2.934985200000028300);
                    shieldCity = 'img/bilbao.png';
                    break;}
                case "Granada":{
                    pyrmont = new google.maps.LatLng(37.177336300000000000, -3.598557099999993600);
                    shieldCity = 'img/granada.png';
                    break;}
                case "Zaragoza":{
                    pyrmont = new google.maps.LatLng(41.648822600000000000 , -0.889085300000033400);
                    shieldCity = 'img/zaragoza.png';
                    break;}
                case "Alicante":{
                    pyrmont = new google.maps.LatLng(38.345996300000000000, -0.490685500000040500);
                    shieldCity = 'img/alicante.png';
                    break;}
                case "Palma de Mallorca":{
                    pyrmont = new google.maps.LatLng(39.566667, 2.649722);
                    shieldCity = 'img/baleares.png';
                    break;}
                case "Sevilla":{
                    pyrmont = new google.maps.LatLng(37.389092400000000000, -5.984458899999936000);
                    shieldCity = 'img/sevilla.png';
                    break;}
                case "Donostia - San Sebastián":{
                    pyrmont = new google.maps.LatLng(43.318334000000000000, -1.981231299999990400);
                    shieldCity = 'img/sanSebastian.png';
                    break;}
                case "Santiago de Compostela":{
                    pyrmont = new google.maps.LatLng(42.878213200000000000, -8.544844499999954000);
                    shieldCity = 'img/sanCompostela.png';
                    break;}
                case "Barcelona":{
                    pyrmont = new google.maps.LatLng(41.3825, 2.176944);
                    shieldCity = 'img/barcelona.png';
                    break;}
                case "Girona":{
                    pyrmont = new google.maps.LatLng(41.983333, 2.816667);
                    shieldCity = 'img/girona.png';
                    break;}
                case "Valencia":{
                    pyrmont = new google.maps.LatLng(39.469907500000000000, -0.376288100000010700);
                    shieldCity = 'img/valencia.png';
                    break;}
                case "Santa Cruz de Tenerife":{
                    pyrmont = new google.maps.LatLng(28.466667, -16.25);
                    shieldCity = 'img/canarias.png';
                    break;}
                default:{
                    alert("default");
                    pyrmont = new google.maps.LatLng(40.416775400000000000, -3.703790199999957600);
                    shieldCity = 'img/madrid.png';}
              }

              var info = '<div id="sm">'+
                            '<h3>'+city+'</h3>'+
                            '<div id="ssm">' +
                                '<p><a href="http://es.wikipedia.org/wiki/'+city+'" target="_blank">'+
                                    '<img src="'+shieldCity+'" alt="shield city" height="42" width="42"></a></p>'+
                            '</div>'+
                        '</div>';

              var marker = new google.maps.Marker({
                map: map,
                position: pyrmont,
                content: info
              });

              google.maps.event.addListener(marker, 'click', function() {
                infowindowC.setContent(info);
                infowindowC.open(map, this);
              });

              map.setCenter(pyrmont);
              map.setZoom(14);
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

        // -------------------------------------------return the new url with lat and lng onclick
        // var url = 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/SearchHotel?radio=500&lat='+lat+'&lon='+lng;
        // personal server
        // http://mlh1415.ddns.net:8080/SystemRecommendations/SearchHotel?radio=500&lat=40.43&lon=-3.70
        function getLatLngURL(rad, lat, lng) {
            var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/SearchHotel?radio='+rad+'&lat='+lat+'&lon='+lng;            
            return url;
        
        }

        // -------------------------------------------return the new url with bayes data
        // 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=sucio'
        // var url = 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel='+nameH+'&termino='+termH;
        // personal server
        // http://mlh1415.ddns.net:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=sucio
        function getBayesURL(cityH, nameH, terms) {
            var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/Results?city='+cityH+'&hotel='+nameH+'&termino='+terms;      
            return url;
        
        }

        // -------------------------------------------return the new url with bayes data
        // http://mlh.fdi.ucm.es:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=8
        // personal server
        // http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=8
        function getExpRegURL(cityH, nameH, scanNum) {
           // var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?search=Hotel%20'+cityH+'%20'+nameH+'&scan='+scanNum;
            var url = 'http://localhost:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=20';            
            return url;
        
        }


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


        var city = '';
         $("#cities li").click(function() {
            city = $(this).text(); // gets text contents of clicked li
            // alert(city);
            return city;
        });

         // ------------------------------------- show bayes method result
            $(document).ready(function() {

              $("#bayes").click(function(event){

                var nameHotel= document.getElementById('hn-input').value;
                
                if( nameHotel != ''){
                    // call the progress animation
                    onLoadProgress('#progressStat');
                    $('#progressStat').show();
                    var url = getBayesURL(city,nameHotel,checkCategory());
                    // alert(url);
                    $.getJSON(url, function(jd) {
                        $('#successB').html(1+'<li><b>Resultados:</b></li><h1>'+jd.nameHotel+'</h1><p>'+jd.totalResult+'</p>');
                        for (var item in jd.category) { 
                            $('#successB').append( "<li id='" + jd.category[item].type + "'>" +jd.category[item].type +" "+ jd.category[item].value + "</li>" );
                        }
                        $('#progressStat').hide();
                    });
                }

              });
           });

        function checkCategory(){
          var termH1 = '';
          var termH2 = '';
          var termH3 = '';
          if($("#precio").is(':checked')){
              termH1 = $("#precio").attr('id');
          }else{termH1 = '';}
          if($("#ubicacion").is(':checked')){
              termH2 = $("#ubicacion").attr('id');
          }else{termH2 = '';}
          if($("#servicios").is(':checked')){
              termH3 = $("#servicios").attr('id');
          }else{termH3 = '';}
          
          var terminos = '';
          if(termH1 != ''){
              terminos += ','+termH1;
              if(termH2 != ''){
                  terminos += ','+termH2;
              }
              if(termH3 != ''){
                  terminos += ','+termH3;
              }
          }
          else if(termH2 != ''){
              terminos += ','+termH2;
              if(termH3 != ''){
                  terminos += ','+termH3;
              }
          }
          else if(termH3 != ''){
              terminos += ','+termH3;
          }
          else{$('#successB').hide();
                alert("seleccionar categoría");
                }
              
          var terms = terminos.substring(1);
          return terms;
        }
        // -----------------------------------------------------------------------------------

        // ------------------------------------- show expReg method results
            $(document).ready(function() {
                $("#expR").click(function(event){
                    $("#cities li").click(function() {
                        var city = $(this).text(); // gets text contents of clicked li
                    });         
                    var nameH = document.getElementById('hn-input').value;
                    if(nameH != ''){
                        // call the progress animation
                        onLoadProgress('#progressReg');

                        $('#progressReg').show();
                       // $('#loadText').html('Cargando...');
                        $.getJSON(getExpRegURL(city, nameH, 20), function(jd) {

                            $('#divCollapse').html('<div class="container"><div class="panel-group col-lg-6" id="accordion" role="tablist" aria-multiselectable="true">');

                            for (var item in jd) {

                                $('#divCollapse').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading'+item+'"><p class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse'+item+'" aria-expanded="true" aria-controls="collapse'+item+'"><li class= "list-group-item list-group-item-default"><b class="web">web:</b> ' + jd[item].url + '</li></a></p></div><div id="collapse'+item+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+item+'"><div class="panel-body"><div class="list-group" id="terms'+item+'"></div>');
                                    $('#terms'+item).html('<h4>Resultados</h4>');
                                // positve words list
                                  if(jd[item].positiveWord > 0){
                                        $('#terms'+item).append('<li class= "list-group-item list-group-item-success"><b>Lista de palabras positivas (+)</b>');
                                          for (var i = 0; i < jd[item].positiveWord; i++) {
                                          $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd[item].PositiveWordList[i].value+'</span><ul><li>' + jd[item].PositiveWordList[i].type + '</li></ul>');
                                            };
                                            $('#terms'+item).append('</li>');
                                    }
                                    else{
                                    $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe palabras positivas (!)</b></li>');
                                    }
                                    // negative word list
                                    if(jd[item].negativeWord > 0){
                                             $('#terms'+item).append('<li class= "list-group-item list-group-item-danger"><b>Lista de palabras negativas (-)</b>');
                                              for (var i = 0; i < jd[item].negativeWord; i++) {
                                              $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd[item].NegativeWordList[i].value+'</span><ul><li>' + jd[item].NegativeWordList[i].type + '</li></ul>');
                                             };
                                             $('#terms'+item).append('</li>');
                                    }
                                    else{
                                    $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe palabras negativas (!)</b></li>');
                                    }

                                // positive regular expressions list  
                                  if(jd[item].positiveRegularExpresion > 0){
                                     $('#terms'+item).append('<li class= "list-group-item list-group-item-success"><b>Lista de expresiones regulares positivas (+)</b>');
                                      for (var i = 0; i < jd[item].positiveRegularExpresion; i++) {
                                      $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd[item].positiveRegularExpresionList[i].value+'</span><ul><li>' + jd[item].positiveRegularExpresionList[i].type + '</li></ul>');
                                        };
                                        $('#terms'+item).append('</li>');                                  
                                  }
                                  else{
                                    $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe exp. reg. positivas (!)</b></li>');
                                  }
                                  // negative regular expressions list
                                  if(jd[item].negativeRegularExpresion > 0){
                                         $('#terms'+item).append('<li class= "list-group-item list-group-item-danger"><b>Lista de expresiones regulares negativas (-)</b>');
                                          for (var i = 0; i < jd[item].negativeRegularExpresion; i++) {
                                          $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd[item].negativeRegularExpresionList[i].value+'</span><ul><li>' + jd[item].negativeRegularExpresionList[i].type + '</li></ul>');
                                        };
                                        $('#terms'+item).append('</li>');
                                    }

                                  else{
                                    $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe exp. reg. negativas (!)</b></li>');
                                  }
                                  $('#divCollapse').append('</div></div></div>');
                            }; // end for

                            $('#divCollapse').append('</div></div>');
                            $('#loadText').hide();
                            $('#progressReg').hide();
                        }); // end getJSON
                        
                     }
                });
            });
        // -----------------------------------------------------------------------------------