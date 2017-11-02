$(document).ready(function(e){
    
    $('#startbutton').on('touchstart', function(e){
        $('#appcontainerhoder').slideToggle();
    });

    // $('div.icon').on('click', function(e){
    //     $('#appcontainerhoder').hide();
    //     $('.windowframe').show();
    // });
    
});

function goto_app(path){
        $('#appcontainerhoder').hide();
        $('#windowframe').show();
        $('#windowframe').empty();

        $('#windowframe').append('<iframe src="'+path+'" style="width:100%; height:100%; border:none;"></iframe>');
        $('#windowframe').append('<div class="bottombar"><img src="images/android_gear.png" onclick="close_app()" style="height:100%; display:block; float:left; margin:0 3px;"/></div>')
    
}

function close_app(){
    $('#appcontainerhoder').hide();
    $('#windowframe').empty();
    $('#windowframe').hide();
    
}
