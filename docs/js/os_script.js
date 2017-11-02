$(document).ready(function(e){
    
    $('#startbutton').on('click', function(e){
        $('#appcontainerhoder').slideToggle();
    });
    $('#appcontainerhoder').focusout(function () {
        $('#appcontainerhoder').slideDown();
    });
});
