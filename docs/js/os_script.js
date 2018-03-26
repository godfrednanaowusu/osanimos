var cascadestatus = 'true';
var zindex = 100;



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

     $('#mainbar').on('click', function(e){
        $('.taskbarholders').hide();
     });


    //  BATTERY FUNCTIONS
    
     navigator.getBattery().then((battery) => {
        $('.batterypercentage').text(Math.round(battery.level * 100)+ '%');
         battery.addEventListener('levelchange', function(){
            $('.batterypercentage').text(Math.round(battery.level * 100)+ '%');
         });
         battery.ondischargingtimechange = (event) =>{
            $('.batterypercentage').text(Math.round(event.target.level * 100)+ '%');
         }
         battery.onchargingtimechange = (event) =>{
            $('.batterypercentage').text(Math.round(event.target.level * 100)+ '%');
        }

     });
     

     

});

function toggleStartMenu(){
    var uid = new Date().valueOf();
    $('#appcontainerholder').slideToggle('fast');
    $('#appcontainerholder').css('z-index', uid);
    
}

function togglePowerMenu(){
    var uid = new Date().valueOf();
    $('#powercontainerholder').slideToggle('fast');
    $('#powercontainerholder').css('z-index', uid);
    
}

function goto_app(path, title){
        $('#appcontainerholder').hide();        
        var uid = new Date().valueOf();
        var windowid = 'windowframe_'+uid;
        $('#mainbar').append('<div id="'+windowid+'" class="windowframe ui-widget-content" ondragstart="onwindowdrag('+windowid+')" onmousedown="onwindowclick('+windowid+')" ondblclick="onwindowdblclick('+windowid+')" style="position:absolute; z-index:'+parseInt(uid)+'"> </div>');
        $('#windowframe_'+uid).append('<iframe src="'+path+'" style="width:calc(100% - 2px); height:calc(100% - 21px); border:none; position:absolute; top:20px; right:1px; bottom:1px; left:1px; background:#fff; "></iframe>');
        $('#windowframe_'+uid).append('<div class="titlebar" ><p id="title">'+title+'</p><button id="closebut" type="button" onclick="close_app('+windowid+')" ></button> <button type="button" id="cascadebut" onclick="cascade_app('+windowid+');"></button> <button type="button" id="minimizebut" onclick="minimize_app('+windowid+')"></button>  </div>');
        
       
        
}


function cascade_app(windowid){
    var uid = new Date().valueOf();
    if(cascadestatus == 'true'){
        $(windowid).css({width:'500px', height:'400px', position:'absolute',  left:'35%', top:'15%', 'z-index':uid});
        $(windowid).removeClass('windowmaximised');
        $(windowid).addClass('windowcascaded');
        cascadestatus = 'false';
    }else{
        $(windowid).css({width:'100%', height:'100%', position:'absolute', left:'0px', top:'0px', right:'0px', 'z-index':uid});
        $(windowid).removeClass('windowcascaded');
        $(windowid).addClass('windowmaximised');
        cascadestatus = 'true';
    }   
}

function minimize_app(windowid){
    cascade_app(windowid); 
}

function close_app(windowid){
    $('#appcontainerholder').hide();
    $(windowid).empty();
    $(windowid).remove();    
}

function onwindowdrag(windowid){
    $(windowid).removeClass('windowcascaded');
    $(windowid).removeClass('windowmaximised');
    $(windowid).draggable({containment:'', iframeFix: true});
    $(windowid).resizable();
}

function onwindowclick(windowid){    
    var uid = new Date().valueOf();    
    $(windowid).css({'z-index': parseInt(uid)});
}

function onwindowdblclick(windowid){
    cascade_app(windowid);
}
