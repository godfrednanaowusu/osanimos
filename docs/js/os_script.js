$(document).ready(function(e){
    $('#base').show();

    // Operating Device 
    var isMobile = {
        Android: function() { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
        any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
    };

    if(isMobile.any()) {
        // It is mobile
        $('#statusbar').show();
        $('#bottomrightbar').hide();
        $('#mainbar').css({top:'20px'});
     }else{
        $('#statusbar').hide();
        $('#bottomrightbar').show();
     }

     $('.titlebar').click(function(e){
alert();
     });

    
    // $('#startbutton').on('touchstart', function(e){
    //     $('#appcontainerhoder').slideToggle();
    // });

    // $('div.icon').on('click', function(e){
    //     $('#appcontainerhoder').hide();
    //     $('.windowframe').show();
    // });
    
});

function toggleStartMenu(){
    $('#appcontainerhoder').slideToggle('fast');
}

function goto_app(path){
        $('#appcontainerhoder').hide();
        $('#windowframe').show();
        $('#windowframe').empty();

        $('#windowframe').append('<iframe src="'+path+'" style="width:100%; height:calc(100% - 20px); border:none; position:absolute; top:20px; right:0; bottom:0; left:0;"></iframe>');
        $('#windowframe').append('<div class="titlebar" draggable="true"><p id="title">Window Frame</p><button id="closebut" type="button" onclick="close_app()" ></button> <button type="button" id="cascadebut" onclick="cascade_app()"></button> <button type="button" id="maximizebut" onclick="close_app()"></button>  </div>')
    
}

function cascade_app(){
    // $('#appcontainerhoder').hide();
    $('#windowframe').css({width:'500px', height:'400px', 'margin':'5% auto 0'});
    // $('#windowframe').hide();
    
}
function close_app(){
    $('#appcontainerhoder').hide();
    $('#windowframe').empty();
    $('#windowframe').hide();
    
}
