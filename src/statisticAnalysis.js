// -------------------------------------------return the new url with bayes data
// 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=sucio'
// var url = 'http://mlh.fdi.ucm.es:8080/SystemRecommendations/Results?city=Madrid&hotel='+nameH+'&termino='+termH;
// personal server
// http://mlh1415.ddns.net:8080/SystemRecommendations/Results?city=Madrid&hotel=Palace&termino=servicios
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
            // total value
            $('#successB').html('<div class="alert alert-info" role="alert"><b>Valoración Total (sobre 5)</b></div>');
            setTotalValue(parseFloat(jd.totalResult));
            $('#input-star').attr( "value",parseFloat(jd.totalResult));
            $('#input-star').rating('update', parseFloat(jd.totalResult));
            // resumen values
            $('#successB2').html('<div class="alert alert-info" role="alert"><b>Resumen de valoraciones</b></div>');
            $('#successB2').append('<div id="vertgraph">');
            $('#vertgraph').html('<dl>');
            for (var item in jd.category) {
                setTermsPercents(jd.category[item]);
            }
            $('#vertgraph').append('</dl>');
            $('#successB2').append('</div>');
            // hide & show div's
            $('#progressStat').hide();
            $('#successB1').show();
        });
    }

  });
});

//------------------------------------------------ show terms porcents
function setTermsPercents(term){
  var percent = term.value +20;
  if(parseFloat(term.value) > 0 && parseFloat(term.value) <= 30){
    $('#vertgraph dl').append('<dd class"termTitle">'+term.type+': <b>'+term.term+'</b></dd>'+'<dd class="critical" style="width:'+percent+'px;">'+term.value+'%</dd>');
  }
  else if(parseFloat(term.value) > 30 && parseFloat(term.value) <= 65){
    $('#vertgraph dl').append('<dd class"termTitle">'+term.type+': <b>'+term.term+'</b><dd class="medium" style="width:'+percent+'px;">'+term.value+'%</dd>');
  }
  else{
    $('#vertgraph dl').append('<dd class"termTitle">'+term.type+': <b>'+term.term+'</b><dd class="high" style="width:'+percent+'px;">'+term.value+'%</dd>');
  }
}

//------------------------------------------------ show values porcents
function setTotalValue(value){
  if(value > 0 && value < 1.6){
    $('#successB').append('<p class="fiveS" style="color:#d9534f;">'+value+'</p>');
  }
  else if(value >= 1.6 && value < 3.6){
    $('#successB').append('<p class="fiveS" style="color:#f0ad4e;">'+value+'</p>');
  }
  else{
    $('#successB').append('<p class="fiveS" style="color:#5cb85c;">'+value+'</p>');
  }
}