

// 1. put JSON call in a function of its own and call it when document is loaded or when device has loaded - DONE
// 2. 



$("#listview").append("<p>Something</p>");



function getPROC ()

{ 

 var url="http://www.kiosks.ie/poc_json.php";


var title_string;
var title_array;
var objlength;
var proc_array;

    
$.getJSON(url,function(resulty){
 console.log(resulty);
 
             
     $.each(resulty, function(i, field){
     
     var title      = field.title;
     var desc = field.date_added;
     
    
     
     
     $("#listview").append(i+" : "+title+" (" + desc+")");
     });
     


objlength = Object.keys(resulty).length;     // get number of elements
//alert("objlength="+objlength);


proc_array = $.map(resulty, function(value, index) {
    return [value];
            });


console.log(proc_array);

 });    // end of GET.JSON
 
 
// can I do an db insert here? 
 
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){

 alert("inside deviceReady. something from outside = " +something);     // this works. you can take a variable from just above this and display it above.
                                                       // but it wont take the array proc_array because it hasnt been created
 
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});

} 
 
 
 
 
 

} // end of PROC function thing 



/* 
------------------------------------------------------------
------------------ on document ready -------------------------
------------------------------------------------------------
 */


$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});



function onDeviceReady() {
    alert("Device is Ready");     // this works. you can take a variable from just above this and display it above.
                                                       // but it wont take the array proc_array because it hasnt been created
getPROC();
}


   