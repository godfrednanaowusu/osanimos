$(document).ready(function(e){
    
    $('img#startbutton').on('touchstart', function(e){        
        // $('#appcontainerhoder').show();
        // $('#appcontainerhoder').addClass('animated slideInUp');        
        //     //wait for animation to finish before removing classes
        //     window.setTimeout( function(){
        //         $('#appcontainerhoder').removeClass('animated slideInUp');
        //     }, 2000);         
  
        
        $('#appcontainerhoder').fadeToggle();
    });
});
