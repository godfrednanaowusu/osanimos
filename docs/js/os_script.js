$(document).ready(function(e){

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
        alert();
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
    $('#appcontainerhoder').slideToggle();
}

function goto_app(path){
        $('#appcontainerhoder').hide();
        $('#windowframe').show();
        $('#windowframe').empty();

        $('#windowframe').append('<iframe src="'+path+'" style="width:100%; height:calc(100% - 20px); border:none; position:absolute; top:20px; right:0; bottom:0; left:0;"></iframe>');
        $('#windowframe').append('<div class="titlebar" draggable="true"><p id="title">Window Frame</p><button id="closebut" type="button" onclick="close_app()" ></button> <button type="button" id="cascadebut" ></button> <button type="button" id="maximizebut" ></button>  </div>')
    
}

function close_app(){
    $('#appcontainerhoder').hide();
    $('#windowframe').empty();
    $('#windowframe').hide();
    
}
