


    
demoP = document.getElementById("demo");


function createTable() 
{

     myDB.transaction(function(transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, infoID integer, venue text, address text, short_info text, gps text, location integer, category integer, sub_category integer, info blob, imgbase64 blob)', [],
              function(tx, result) {
                  alert("Table created successfully");
              }, 
              function(error) {
                    alert("Error occurred while creating the table.");
              });
          });
          
        
}








function saveToDb(item, index) {
    
    //demoP.innerHTML = demoP.innerHTML + "Saving:  " + item.infoID + "  (" + item.info + ")<br>";
    
    
    
    var this_infoID             = item.infoID; 
    var this_venue              = item.venue;            // venue is the name of the element on the JSON feed from PROC
    var this_address            = item.address;
    var this_short_info         = item.short_info;
    var this_info               = item.info;
    
    var this_gps                = item.gps;
    var this_location           = item.location;
    var this_category           = item.category;
    var this_sub_category       = item.sub_category;
    
    var this_imgbase64          = item.base64;       // base64 is the name of the element on the JSON feed from PROC 
    
    
    //$("#listview").append(image);
    
    
    
      
       myDB.transaction(function(transaction) {
     
        var executeQuery = "INSERT INTO phonegap_pro (infoID, venue, address, gps, location, category, sub_category, short_info, info, imgbase64) VALUES (?,?,?,?,?,?,?,?,?,?)";             
        
        transaction.executeSql(executeQuery, [this_infoID, this_venue, this_address, this_gps, this_location, this_category, this_sub_category, this_short_info, this_info, this_imgbase64]
            , function(tx, result) {
                 //count +=1;//alert('Inserted: '+sqltitle);
            },
            function(error){
                 //alert('Error occurred: '+sqltitle); 
            });
            
           
            
                               });   // end of myDB.transaction
    
     
}  
 



function display_table(display_infoID)
{

var display_this_infoID= display_infoID;

alert("Going to show infoID="+display_this_infoID);
          
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
     
            //transaction.executeSql('SELECT * FROM phonegap_pro where venue LIKE ?', [kinlay], function (tx, results) {
            
            transaction.executeSql('SELECT * FROM phonegap_pro where infoID = ?', [display_this_infoID], function (tx, results) { 
            
            
    //$("#listview").append(image);
            
            
                 var len = results.rows.length, i;
                 $("#rowCount").html(len);
                 for (i = 0; i < len; i++){
                 
                 
                 var image = new Image();
                 image.src = results.rows.item(i).imgbase64;
                 image.width = 50;
                 //$("#listview").append(image);
                 
                 /*
                 var image = new Image();
                 image.src = results.rows.item(i).desc;
                 image.width = 50;
                  */
                 $("#TableData").append("<tr><td>"); 
                 $("#TableData").append(image);
                 $("#TableData").append("</td><td><a onClick='display_table("+results.rows.item(i).infoID+");'>"+results.rows.item(i).venue+"</a> (" + results.rows.item(i).infoID+")</td><td>"+results.rows.item(i).address+"</td></tr>"); 
                 
                    //$("#TableData").append(image+"<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
                    
                 }
              }, null);



} 

}// end of display this infoID

















var myDB;

var title_string;
var title_array;
var objlength;
var proc_array =[];
var resulty=[];




function getPROC ()

{ 

 // var url="http://www.kiosks.ie/poc_json.php";
 
 
 var url="http://www.peoplesrepublicofcork.com/eventguide/mobile/apps/json_visitcork.php?limit=15";




    
$.getJSON(url,function(resulty){
 console.log(resulty);
 
             
     $.each(resulty, function(i, field){
     
      var this_infoID        = field.infoID;
      var this_venue          = field.venue;
      var this_address        = field.address;
      
      var this_gps            = field.gps;
      var this_location       = field.location;
      var this_category       = field.category;
      var this_sub_category   = field.sub_category;
     
      var this_short_info     = field.short_info;
      var this_info           = field.info;
      
      var this_imgbase64      = field.base64;
     
      /*
      var image = new Image();
      image.src = this_imgbase64;
      image.width = 50;
      $("#listview").append(image);
      */
     
     //$("#listview").append(i+" : "+this_infoID+" ("+this_info+")");
     });
     
$("#listview").append("<br>--------- / end of getPROC() -----<br>");

objlength = Object.keys(resulty).length;     // get number of elements
//alert("objlength="+objlength);


proc_array = $.map(resulty, function(value, index) {
    return [value];
            });


//console.log(proc_array);

// create a table if it doesn't exist

createTable();


proc_array.forEach(saveToDb);    // now insert each object in the array into the database separately 
                                   // i.e. if there are 10 objects then saveToDb is called 10 times.  




 });    // end of GET.JSON
 


// Q: can I do a db insert here? 
// A: No, it has to be inside the JSON function for some reason.....
// because the code executes before the JSON response is finished (FFS! - asyncronise bs!)



} // end of PROC function 








function checkConnection() {
    
    
    var networkState = navigator.connection.type;

   

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
    
    // if we are connected then 
    
    return networkState;
    
    
}




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
    



 
   


    


  // --------------------------------
      //Create new table
      
      $("#createTable").click(function(){
      
       alert("creating table");
      
      
          myDB.transaction(function(transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, venue text, imgbase64 blob)', [],
              function(tx, result) {
                  alert("Table created successfully");
              }, 
              function(error) {
                    alert("Error occurred while creating the table.");
              });
          });
      });
      
      
      
                //Display Table Data
          $("#showTable").click(function(){
          
          
          alert("Going to display table..");
          
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
            
            var kinlay = "%Sheila%";
            //transaction.executeSql('SELECT * FROM phonegap_pro where venue LIKE ?', [kinlay], function (tx, results) {
            
            transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) { 
            
            
    //$("#listview").append(image);
            
            
                 var len = results.rows.length, i;
                 $("#rowCount").html(len);
                 for (i = 0; i < len; i++){
                 
                 
                 var image = new Image();
                 image.src = results.rows.item(i).imgbase64;
                 image.width = 50;
                 //$("#listview").append(image);
                 
                 /*
                 var image = new Image();
                 image.src = results.rows.item(i).desc;
                 image.width = 50;
                  */
                 $("#TableData").append("<tr><td>"); 
                 $("#TableData").append(image);
                 $("#TableData").append("</td><td><a onClick='open_this_info("+results.rows.item(i).infoID+");'>"+results.rows.item(i).venue+"</a> (" + results.rows.item(i).infoID+")</td><td>"+results.rows.item(i).address+"</td></tr>"); 
                 
                    //$("#TableData").append(image+"<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
                    
                 }
              }, null);
            });
            
            
          });
                
      
      
      
      
      
      
      // --------------------------------
    
           $("#DropTable").click(function(){
           
           alert("dropping the table");
              
          myDB.transaction(function(transaction) {
              var executeQuery = "DROP TABLE  IF EXISTS phonegap_pro";
              transaction.executeSql(executeQuery, [],
                  function(tx, result) {alert('Table deleted successfully.');},
                  function(error){alert('Error occurred while droping the table.');}
                  );
              });
           });
    
    
    
    
    $("#insert").click(function(){
 
 
 //var title=proc_array[1].title;
  var desc="blahdeblah"; 
  
  
  var somevar;
  
  somearray = test(8);
  
  alert("Insert function" + somearray[1]);
    
 //alert("insert:"+proc_array[1].title+" length:"+objlength);
                      // objlength
  
   var this_title = "hard wired";
   var this_imgbase64 = "set in func";

     myDB.transaction(function(transaction) {
     
        var executeQuery = "INSERT INTO phonegap_pro (venue, imgbase64) VALUES (?,?)";             
        transaction.executeSql(executeQuery, [this_title,this_imgbase64]
            , function(tx, result) {
                 alert('Inserted: '+title);
            },
            function(error){
                 alert('Error occurred: '+title); 
            });
            
           
            
    });   // end of myDB.transaction
     
        
        
        
  
            
 
 
        });    // end of insert
    
    
    
    
 // use this for debugging on computer. delete before compiling!   
 //getPROC();
    
});      // end of doc ready








function onDeviceReady() {
    alert("Device is Ready");    



myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});


// if connected to the internet then get db from PROC

//

// if no connection then tell us




    if (checkConnection() == "none" ) {
        connectionStatus = 'offline'; 
    } else {
        connectionStatus = 'online';
        
        alert("going to getPROC now");

        getPROC();
        
        
    }










}  // end of onDeviceReady



function test(i)

  {
  var somearray = ['Apple', 'Banana'];
  
  i=i+5;
  alert("test func i="+i)
  return somearray;  
  }




      
  