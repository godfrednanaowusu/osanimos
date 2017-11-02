$(document).ready(function(e){
    
    $('#startbutton').on('click', function(e){
        $('#appcontainerhoder').slideToggle();
    });
    $('#appcontainerhoder').on('focusout', function(e) {
        $('#appcontainerhoder').slideDown();
    });
});
