// -------------------------------------------return the new url with bayes data
// 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=sucio'
// var url = 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel='+nameH+'&termino='+termH;
// personal server
// http://mlh1415.ddns.net:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=sucio
function getBayesURL(cityH, nameH, terms) {
    var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/Results?city='+cityH+'&hotel='+nameH+'&termino='+terms;      
    return url;

}

// -------------------------------------------return name city from dropbutton
var city = '';
 $("#cities li").click(function() {
    city = $(this).text(); // gets text contents of clicked li
    // alert(city);
    return city;
});


//-------------------------------------------- check category from checkboxs
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
            $('#successB').html('<b>Resumen de valoraciones</b>');
            for (var item in jd.category) { 
                $('#successB').append('<p>' + jd.category[item].type +" "+ jd.category[item].value + '%</p>');
            }
            $('#successB').append('<b>Valoración Total</b>');
           
            $('#successB').append('<p>'+jd.totalResult+'</p>');
            $('#input-start').val( parseFloat(jd.totalResult));
            console.log(parseFloat(jd.totalResult));
            $('#progressStat').hide();
            $('#successB1').show();
        });
    }

  });
});