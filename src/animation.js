/*animation to load results*/
function onLoadProgress(x) {
    var circle = new ProgressBar.Circle(x, {
        color: '#4caf50',
        trailColor: '#eee',
        strokeWidth: 10,
        duration: 73000,
        //easing: 'easeInOut'
    });

    // $('#progress').show();
    // $('#loadText').html('Cargando...');

    circle.set(0.05);

    setTimeout(function() {
        circle.animate(0.2);
    }, 5000);

    setTimeout(function() {
        circle.animate(0.4);
    }, 5000);
    setTimeout(function() {
        circle.animate(0.6);
    }, 5000);

    setTimeout(function() {
        circle.animate(0.8);
    }, 5000);

    setTimeout(function() {
        circle.animate(1);
        setTimeout(function(){
          //  $('#loadText').hide();
          //  $('#progress').hide();
            circle.set(0.05);
            onLoadProgress(x);
            }, 73000)
        
    }, 33000);
};

/*remove class to input name hotel*/
function rmClass(){
    $("#hn-input").removeClass("changeColour");
}