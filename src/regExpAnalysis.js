// http://mlh.fdi.ucm.es:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=8
// personal server
// http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=8
function getExpRegURL(cityH, nameH, scanNum) {
   // var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?search=Hotel%20'+cityH+'%20'+nameH+'&scan='+scanNum;
   // var url = 'http://localhost:8080/SystemRecommendations/TermWebs?search=Hotel%20Madrid%20Palace&scan=20';            
  var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?city=Madrid&nameHotel=Palace&scan=8';
  //var url = 'http://mlh1415.ddns.net:8080/SystemRecommendations/TermWebs?city='+Madrid+'&nameHotel='+Palace+'&scan='+8;

  return url;

}

// -------------------------------------------return name city from dropbutton
  var city = 0;
  $("select").change(function(){
    city =  $( "select option:selected" ).text();
    // alert(city);
 });
// ------------------------------------- show expReg method results
$(document).ready(function() {
    $("#expR").click(function(event){         
        var nameH = document.getElementById('hn-input').value;
        if(nameH != '' && city != 0){
            // call the progress animation
            onLoadProgress('#progressReg');
            $('#progressReg').show();

            $.getJSON(getExpRegURL(city, nameH, 20), function(jd) {
                // total value
                $('#successB3').html('<div class="alert alert-info" role="alert"><b>Valoración Total (sobre 5)</b></div>');
                setTotalValueExp(parseFloat(jd.stars));
                $('#input-star1').attr( "value",parseFloat(jd.stars));
                $('#input-star1').rating('update', parseFloat(jd.stars));
                // resumen values
                $('#divCollapse').html('<div class="alert alert-info" role="alert"><b>Resumen de valoraciones</b></div>');

                $('#divCollapse').append('<div class="container"><div class="panel-group" id="accordion" role="tablist" aria-multiselectable="false">');

                for (var item in jd.terminsWebs) {

                    $('#accordion').append('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading'+item+'">'+
                      '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+item+'" aria-expanded="false"'+
                      'aria-controls="collapse'+item+'"><b class="web">web:' + jd.terminsWebs[item].url + 
                      '</b></a></div><div id="collapse'+item+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+item+
                      '"><div class="panel-body"><div class="list-group" id="terms'+item+'"></div>');
                    $('#terms'+item).html('<h4>Resultados</h4>');
                    // positve words list
                    if(jd.terminsWebs[item].positiveWord > 0){
                      $('#terms'+item).append('<li class= "list-group-item list-group-item-success"><b>Lista de palabras positivas (+)</b>');
                      for (var i = 0; i < jd.terminsWebs[item].positiveWord; i++) {
                        $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd.terminsWebs[item].PositiveWordList[i].value+'</span>' + jd.terminsWebs[item].PositiveWordList[i].type);
                      };
                      $('#terms'+item).append('</li>');
                    }
                    /*else{
                      $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe palabras positivas (!)</b></li>');
                    }*/
                    // negative word list
                    if(jd.terminsWebs[item].negativeWord > 0){
                      $('#terms'+item).append('<li class= "list-group-item list-group-item-danger"><b>Lista de palabras negativas (-)</b>');
                      for (var i = 0; i < jd.terminsWebs[item].negativeWord; i++) {
                        $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd.terminsWebs[item].NegativeWordList[i].value+'</span>' + jd.terminsWebs[item].NegativeWordList[i].type);
                      };
                      $('#terms'+item).append('</li>');
                    }
                    /*else{
                    $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe palabras negativas (!)</b></li>');
                    }*/

                    // positive regular expressions list  
                    if(jd.terminsWebs[item].positiveRegularExpresion > 0){
                      $('#terms'+item).append('<li class= "list-group-item list-group-item-success"><b>Lista de expresiones regulares positivas (+)</b>');
                      for (var i = 0; i < jd.terminsWebs[item].positiveRegularExpresion; i++) {
                        $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd.terminsWebs[item].positiveRegularExpresionList[i].value+'</span>' + jd.terminsWebs[item].positiveRegularExpresionList[i].type);
                      };
                      $('#terms'+item).append('</li>');                                  
                    }
                    /*else{
                      $('#terms'+item).append('<li href="#" class="list-group-item list-group-item-info"><b>No existe exp. reg. positivas (!)</b></li>');
                    }*/
                    // negative regular expressions list
                    if(jd.terminsWebs[item].negativeRegularExpresion > 0){
                      $('#terms'+item).append('<li class= "list-group-item list-group-item-danger"><b>Lista de expresiones regulares negativas (-)</b>');
                      for (var i = 0; i < jd.terminsWebs[item].negativeRegularExpresion; i++) {
                        $('#terms'+item).append('<li class= "list-group-item"><span class="badge">'+jd.terminsWebs[item].negativeRegularExpresionList[i].value+'</span>' + jd.terminsWebs[item].negativeRegularExpresionList[i].type);
                      };
                      $('#terms'+item).append('</li>');
                      }
                    if(jd.terminsWebs[item].positiveWord == 0 && jd.terminsWebs[item].negativeWord == 0 &&
                      jd.terminsWebs[item].positiveRegularExpresion == 0 && jd.terminsWebs[item].negativeRegularExpresion == 0){
                      $('#terms'+item).append('<p style="color: red"><b>No existe expresiones regulares compatibles en ésta web(!)</b><p>');
                    }

                    $('#accordion').append('</div></div></div>');
                }; // end for

                $('#divCollapse').append('</div></div>');
                $('#progressReg').hide();
                $('#successB4').show();
            }); // end getJSON
            
         }
    });
});

//------------------------------------------------ show values porcents
function setTotalValueExp(value){
  if(value > 0 && value < 1.6){
    $('#successB3').append('<p class="fiveS" style="color:#d9534f;">'+value+'</p>');
  }
  else if(value >= 1.6 && value < 3.6){
    $('#successB3').append('<p class="fiveS" style="color:#f0ad4e;">'+value+'</p>');
  }
  else{
    $('#successB3').append('<p class="fiveS" style="color:#5cb85c;">'+value+'</p>');
  }
}