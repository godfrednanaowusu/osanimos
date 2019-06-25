var cascadestatus = 'true';


$(document).ready(function (e) {
    // This waits for the dom to complete before displaying the body
    $('#mainbody').show();    

    // This maximizes the screen if not maximized already
    addEventListener("click", function() {
        var el = document.documentElement; 
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
        rfs.call(el);
    }); 

    // Start Button
    $('#startbutton').on('click', function (e) {        
        if ($('#startmenu').is(':visible')) {
            startmenu_close();
        } else {
            startmenu_open();
        }               
    });

    // Side Bar Button
    $('#sidebarbutton').on('click', function (e) {
        if ($('#sidebar').is(':visible')) {
            sidebar_close();
        } else {
            sidebar_open();
        }
    });

    // App link on click
    $('.applink').on('click', function (e) {
        var apppath = $(this).data("path");
        loadapp(this, apppath);
        // $.ajax({
        //     dataType: "json",
        //     url: apppath + 'manifest.json',
        //     success: loadapp
        // });
        e.preventDefault();
        return false;
    });

});
// End of Document Ready

// $(document).click(function(e)	{
//     var elem = $(e.target).attr('id');	
//     console.log(elem);	
//     if(elem == 'windowholder' || elem == 'iconsholder' || elem == 'taskbar')
//     {	
//         console.log('start menu or startbutton clicked');
//         if($('#startmenu').is(':visible'))
//         {
//             console.log('start menu is visible');
//             $('#controlsdiv').removeClass('anim_slideup');
//             $('#controlsdiv').addClass('anim_slidedown');
//             $('#contentdiv').removeClass('anim_slideup');
//             $('#contentdiv').addClass('anim_slidedown');
//             setTimeout(function (e) {
//                 $('#startmenu').hide();
//             }, 1000);            
//         }else{
//             console.log('start menu is not visible');
//         }

//     }else if(elem != 'sidebar' || elem != 'sidebarbutton')
//     {	
//         console.log('not sidebar and sidebarbutton clicked');
//         if($('#sidebar').is(':visible'))
//         {
//             console.log('sidebar is visible');
//             $('#sidebar').removeClass('anim_slideleft');
//             $('#sidebar').addClass('anim_slideright');
//             $('#sidebar .icon').removeClass('anim_slideleft');
//             $('#sidebar .icon').addClass('anim_slideright');
//             setTimeout(function (e) {
//                 $('#sidebar').hide();
//             }, 1000);            
//         }else{
//             console.log('sidebar is not visible');
//         }
//     }                           
// });


// This opens the start menu div
function startmenu_open() {
    $('#controlsdiv').removeClass('anim_slidedown');
    $('#controlsdiv').addClass('anim_slideup');
    $('#contentdiv').removeClass('anim_slidedown');
    $('#contentdiv').addClass('anim_slideup');
    $('#startmenu').show();
}

// This closes the start menu div
function startmenu_close() {
    if ($('#startmenu').is(':visible')) {
        $('#controlsdiv').removeClass('anim_slideup');
        $('#controlsdiv').addClass('anim_slidedown');
        $('#contentdiv').removeClass('anim_slideup');
        $('#contentdiv').addClass('anim_slidedown');
        setTimeout(function (e) {
            $('#startmenu').hide();
        }, 1000);
    }
}

// This closes the start menu div instantly
function startmenu_closeinstantly() {
    if ($('#startmenu').is(':visible')) {
        $('#startmenu').hide();
    }
}

// This opens the sidebar
function sidebar_open() {
    $('#sidebar').removeClass('anim_slideright');
    $('#sidebar').addClass('anim_slideleft');
    $('#sidebar .icon').removeClass('anim_slideright');
    $('#sidebar .icon').addClass('anim_slideleft');
    $('#sidebar').show();
}

// This closes the sidebar
function sidebar_close() {
    if ($('#sidebar').is(':visible')) {
        $('#sidebar').removeClass('anim_slideleft');
        $('#sidebar').addClass('anim_slideright');
        $('#sidebar .icon').removeClass('anim_slideleft');
        $('#sidebar .icon').addClass('anim_slideright');
        setTimeout(function (e) {
            $('#sidebar').hide();
        }, 1000);
    }
}

// This closes the sidebar instantly
function sidebar_closeinstantly() {
    if ($('#sidebar').is(':visible')) {
        $('#sidebar').hide();
    }
}

// This opens a specific window
function window_open(object, windowid, apppath){
    $('#windowframe_'+mainzindex+' .windowframecontent').load(apppath);
    $('#windowframe_'+mainzindex).addClass('anim_zoomIn');
    startmenu_closeinstantly();
    sidebar_closeinstantly();

    $(object).addClass('active');
    $(object).addClass(windowid);
}

// This closes a specific window
function window_close(windowid){
    $('#appcontainerholder').hide();
    $(windowid).addClass('anim_zoomOut');
    setTimeout(function (e) {
        $(windowid).empty();
        $(windowid).remove();
        var d_windowid = "."+($(windowid).attr('id'));
        // alert($(windowid).attr('id'));
        $(d_windowid).removeClass('active');
        $(d_windowid).removeClass(d_windowid);
    }, 1000);
    
}

// This cascades a specific window
function window_cascade(windowid){
    mainzindex = (parseInt(mainzindex) + 1).toString();
    if (cascadestatus == 'true') {
        $(windowid).css({ width: '500px', height: '400px', position: 'absolute', left: '35%', top: '15%', 'z-index': mainzindex });
        $(windowid).removeClass('windowmaximised');
        $(windowid).addClass('windowcascaded');
        cascadestatus = 'false';
        $(windowid).resizable({
            iframeFix: true,
            start: function (e, ui) {
                $(windowid).removeClass('windowcascaded');
                $(windowid).removeClass('windowmaximised')
            },
            resize: function (e, ui) {
                $(windowid).removeClass('windowcascaded');
                $(windowid).removeClass('windowmaximised')
            }
        });
    } else {
        $(windowid).css({ width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', right: '0px', 'z-index': mainzindex });
        $(windowid).removeClass('windowcascaded');
        $(windowid).addClass('windowmaximised');
        cascadestatus = 'true';
        $(windowid).removeClass('ui-draggable');
        $(windowid).removeClass('ui-resizable');
        $(windowid).removeClass('ui-draggable-handle');

    }
}

// This maximizes a specific window 
function window_minimize(windowid){
    window_cascade(windowid);
}

// This maximizes a specific window
function window_maximize(windowid){

}

// This is activated when a window is dragged
function window_ondragstart(windowid) {
    $(windowid).removeClass('windowcascaded');
    $(windowid).removeClass('windowmaximised');
    $(windowid).draggable({ containment: '', iframeFix: true });
    $(windowid).resizable({
        iframeFix: true,
        start: function (e, ui) {
            $(windowid).removeClass('windowcascaded');
            $(windowid).removeClass('windowmaximised')
        },
        resize: function (e, ui) {
            $(windowid).removeClass('windowcascaded');
            $(windowid).removeClass('windowmaximised')
        }
    });
}

// This is activated when a window is clicked
function window_onclick(windowid) {
    mainzindex = (parseInt(mainzindex) + 1).toString();
    $(windowid).css({zIndex: mainzindex });
    // console.log(mainzindex);
}

// This is activated when window is doubleclicked
function window_ondoubleclick(windowid) {
    window_cascade(windowid);
}

// This closes all windows
function window_closeall(){

}

// This clears the desktop screen
function desktop_clearscreen(){
    startmenu_close();
    sidebar_close();
    window_closeall();
}