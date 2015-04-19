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