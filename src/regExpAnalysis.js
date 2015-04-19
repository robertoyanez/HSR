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
var city = '';
 $("#cities li").click(function() {
    city = $(this).text(); // gets text contents of clicked li
    // alert(city);
    return city;
});

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