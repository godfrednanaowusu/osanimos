function loadapp(object, apppath){  
    if(apppath === undefined){
        alert('path is undefined')
    }  
    var app_name = '';
    var result = '';
    $.getJSON(apppath+'manifest.json', function(data){
        result = data;
    })
    .done(function() {         
        mainzindex = (parseInt(mainzindex) + 1).toString();
        var windowid = 'windowframe_'+mainzindex;
        var title = 'Window Title';
        
        $('#windowholder').append('<div id="'+windowid+'" class="windowframe ui-widget-content" ondragstart="window_ondragstart('+windowid+')" onmousedown="window_onclick('+windowid+')" ondblclick="window_ondoubleclick('+windowid+')" style="position:absolute; z-index:'+mainzindex+'"> </div>');
        
        $('#windowframe_'+mainzindex).append('<div class="titlebar" ><p id="title">'+result.name+'</p><button id="closebut" type="button" onclick="window_close('+windowid+')" ><i class="fa fa-close"></i></button> <button type="button" id="minimizebut" onclick="window_minimize('+windowid+')"><i class="fa fa-restor"></i></button> <button type="button" id="cascadebut" onclick="window_cascade('+windowid+');"><i class="fa fa-minus"></i></button> </div>');
        $('#windowframe_'+mainzindex).append('<div class="windowframecontent"></div>');
        $('#windowframe_'+mainzindex+' .windowframecontent').contents().find('head').append('<link href="../assets/css/ui.css" rel="stylesheet" type="text/css" />');
        $('#windowframe_'+mainzindex+' .windowframecontent').contents().find('head').append('<script src="../assets/js/ui.js"></script>');
        
        window_open(object, windowid, apppath);

        
        // alert('getJSON request succeeded!'); 
    })
    .fail(function() { 

        alert('getJSON request failed! '); 
    })
    .always(function() { 

        // alert('getJSON request ended!'); 
    });

        
        

    
}