$(document).ready(function(e){
    
    $('#startbutton').on('touchstart', function(e){
        $('#appcontainerhoder').slideToggle();
    });

    $('div.icon').on('click', function(e){
        $('#appcontainerhoder').slideUp();
    });
    
});
