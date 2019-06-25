$(document).ready(function(e){
    
    $('.menubar li a').click(function(e){
        alert();
        return false;
        e.preventDefault();
        e.stopPropagation();
    });
});