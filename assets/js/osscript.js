// this defines main zindex of items
mainzindex = 10;

$(document).ready(function (e) {       

    // Operating Device 
    var isMobile = {
        Android: function () { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
        any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
    };

    if (isMobile.any()) {
        
        // It is mobile
        // $('#statusbar').show();
        // $('#bottomrightbar').hide();
        // $('#mainbar').css({top:'20px'});
    } else {
        // $('#statusbar').hide();
        // $('#bottomrightbar').show();
    }

    //  BATTERY FUNCTIONS    
    navigator.getBattery().then((battery) => {
        $('.batterypercentage').text(Math.round(battery.level * 100) + '%');
        battery.addEventListener('levelchange', function () {
            $('.batterypercentage').text(Math.round(battery.level * 100) + '%');
        });
        battery.ondischargingtimechange = (event) => {
            $('.batterypercentage').text(Math.round(event.target.level * 100) + '%');
        }
        battery.onchargingtimechange = (event) => {
            $('.batterypercentage').text(Math.round(event.target.level * 100) + '%');
        }
    });


    

    





});



