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
    var d = new Date();
    var uid = d.getTime();
    $('#appcontainerholder').css({'z-index': uid});
    $('#appcontainerholder').toggle();
    // $('#appscontainer').toggle();
    
    
    
}

function togglePowerMenu(){
    var d = new Date();
    var uid = d.getTime();
    $('#powercontainerholder').slideToggle('fast');
    $('#powercontainerholder').css('z-index', uid);
    
}

function goto_app(path, title){
        $('#appcontainerholder').hide();        
        var d = new Date();
        var uid = d.getTime();
        var windowid = 'windowframe_'+uid;
        $('#mainbar').append('<div id="'+windowid+'" class="windowframe ui-widget-content" ondragstart="onwindowdrag('+windowid+')" onmousedown="onwindowclick('+windowid+')" ondblclick="onwindowdblclick('+windowid+')" style="position:absolute; z-index:'+uid+'"> </div>');
        $('#windowframe_'+uid).append('<div class="titlebar" ><p id="title">'+title+'</p><button id="closebut" type="button" onclick="close_app('+windowid+')" ></button> <button type="button" id="minimizebut" onclick="minimize_app('+windowid+')"></button> <button type="button" id="cascadebut" onclick="cascade_app('+windowid+');"></button> </div>');
        $('#windowframe_'+uid).append('<iframe class="windowframecontent" frameborder="0" style="width:calc(100% - 2px); height:calc(100% - 21px); border:none; position:absolute; top:20px; right:1px; bottom:1px; left:1px; background:#fff; "></iframe>');
        $('#windowframe_'+uid+' .windowframecontent').contents().find('head').append('<link href="/css/ui.css" rel="stylesheet" type="text/css" />');
        // $('#windowframe_'+uid+' .windowframecontent').contents().find('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
        $('#windowframe_'+uid+' .windowframecontent').contents().find('head').append('<script src="/js/ui.js"></script>');
        $('#windowframe_'+uid+' .windowframecontent').contents().find('body').load(path);
        // $('#windowframe_'+uid+' .windowframecontent' ).load(path, function(){
            // alert('loaded')
        // });
        
        // $('#windowframe_'+uid).append('<object data="'+path+'" style="width:calc(100% - 2px); height:calc(100% - 21px); border:none; position:absolute; top:20px; right:1px; bottom:1px; left:1px; background:#fff; "></object>');
     
}


function cascade_app(windowid){
    var d = new Date();
    var uid = d.getTime();
    if(cascadestatus == 'true'){
        $(windowid).css({width:'500px', height:'400px', position:'absolute',  left:'35%', top:'15%', 'z-index':uid});
        $(windowid).removeClass('windowmaximised');
        $(windowid).addClass('windowcascaded');
        cascadestatus = 'false';
        $(windowid).resizable({
            iframeFix: true,
            start: function(e, ui) {
                $(windowid).removeClass('windowcascaded');
                $(windowid).removeClass('windowmaximised')
            },
            resize: function(e, ui) {
                $(windowid).removeClass('windowcascaded');
                $(windowid).removeClass('windowmaximised')
            }
        });
    }else{
        $(windowid).css({width:'100%', height:'100%', position:'absolute', left:'0px', top:'0px', right:'0px', 'z-index':uid});
        $(windowid).removeClass('windowcascaded');
        $(windowid).addClass('windowmaximised');
        cascadestatus = 'true';
        $(windowid).removeClass('ui-draggable');
        $(windowid).removeClass('ui-resizable');
        $(windowid).removeClass('ui-draggable-handle');
        
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
    $(windowid).resizable({
        iframeFix: true,
        start: function(e, ui) {
            $(windowid).removeClass('windowcascaded');
            $(windowid).removeClass('windowmaximised')
        },
        resize: function(e, ui) {
            $(windowid).removeClass('windowcascaded');
            $(windowid).removeClass('windowmaximised')
        }
    });
}

function onwindowclick(windowid){    
    var d = new Date();
    var uid = d.getTime();    
    $(windowid).css({'z-index': uid});
}

function onwindowdblclick(windowid){
    cascade_app(windowid);
}
