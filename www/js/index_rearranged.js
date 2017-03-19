demoP = document.getElementById("demo");
var proc_array =[];

 var d = new Date();
document.getElementById("date").innerHTML = d;    
var seconds = Math.round(d.getTime() / 1000);

seconds = Math.round(seconds);

var timeOfLastUpdate;

var createLastUpdateTable_success =0;




function status_bar(this_var)
{
var number = this_var;

//alert("status="+this_var);

        if (number==1)
        {
        $("#status").css('background', 'red');
        $("#status").html("<p>Updating content..</p>");
        
        
        }
        if (number==0)
        {
        $("#status").css('background', 'green');
        $("#status").html("<p>Ready</p>");  
         
        }

}



function createLastUpdateTable()

{

 var dfrd6 = $.Deferred();

myDB.transaction(function(transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS last_update_table (id integer primary key, time_of_last_update text)', [],
              function(tx, result) {
                  //alert("Table last_update created successfully");
                   $("#myconsole").append('<p>Last update Table created successfully (or it already exists!</p>');
                   createLastUpdateTable_success = 1;
                   dfrd6.resolve();
                  
              }, 
              function(error) {
                    $("#myconsole").append("<p>Error occurred while creating the lastupdate table.</p>");
                    dfrd6.resolve();
              });
              
              
              
          });
          
     

    return dfrd6.promise();
    
   
    
          
          
}



function insertLastUpdateTime()
{

 var dfrd5 = $.Deferred();


        // doing async stuff
   
      timeOfLastUpdate = seconds; // global variable
     
        myDB.transaction(function(transaction) {
          var executeQuery = "INSERT INTO last_update_table (time_of_last_update) VALUES (?)";             
          
        transaction.executeSql(executeQuery, [seconds]
            , function(tx, result) {
                  
                $("#myconsole").append('<p>Inserted: '+seconds+' into the last_update_table</p>');
                 dfrd5.resolve();
            },
            function(error){
                 $("#myconsole").append('<p>Error occurred trying to insert time: '+seconds+'</p>');
                  dfrd5.resolve(); 
            });
            
            
       
           
            });   // end of myDB.transaction
                
        
        $("#myconsole").append('<br><br>finished waiting in insert<br><br>');
        
}    
   
   
   
function updateLastUpdateTime()

{


 var dfrd5 = $.Deferred();
 var one = 1;  // time will be kept in the first row with id=1

        // doing async stuff
        timeOfLastUpdate = seconds; 
     
        myDB.transaction(function(transaction) {
          var executeQuery = "UPDATE last_update_table set time_of_last_update=? where id=?";             
          //                  UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
        transaction.executeSql(executeQuery, [seconds, one]
            , function(tx, result) {
                  
                $("#myconsole").append('<p>Updated the last_update_table with "+ seconds +"</p>');
                 dfrd5.resolve();
            },
            function(error){
                 $("#myconsole").append('<p>Error occurred trying to update time: '+seconds+'</p>');
                  dfrd5.resolve(); 
            });
            
            
       
           
            });   // end of myDB.transaction
                
        
        $("#myconsole").append('<br><br>finished waiting in updateLastUpdateTime<br><br>');
        
         return dfrd5.promise();
}        







 
    









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
             
    
    //$("#listview").append('<p>'+this_venue+'</p>');
    
   $("#myconsole").append("<p>Save To Database " + this_venue + "</p>"); 
    
       /*
       myDB.transaction(function(transaction) {
     
        var executeQuery = "INSERT INTO phonegap_pro (venue, imgbase64) VALUES (?,?)";             
        
        bvnmtransaction.executeSql(executeQuery, [this_venue,  this_imgbase64]
        
        
        
            , function(tx, result) {
                $("#myconsole").append("<p>Done: ("+this_infoID+")" + this_venue + "</p>"); 
            },
            function(err){
                 $("#myconsole").append("<p>Error: " + this_venue + " " + err.message + " Code:" + err.code + "</p>"); 
            });
            
           
            
            });   // end of myDB.transaction
           
             // [this_infoID, this_venue, this_address, this_gps, this_location, this_category, this_sub_category, this_short_info, this_info, this_imgbase64]
            */ 
    
    var affected;         
           
      myDB.transaction(function(transaction) {
    
    // new entry
        //var executeQuery = "INSERT INTO phonegap_pro (infoID, venue, address, gps, location, category, sub_category, short_info, info, imgbase64) VALUES (?,?,?,?,?,?,?,?,?,?)";             
    
    // update existing entry
    
       var executeQuery = "UPDATE phonegap_pro set venue=?, address=?, gps=?, location=?, category=?, sub_category=?, short_info=?, info=?, imgbase64=? where infoID=?";             
     
                                                                                                                                                                                          
        transaction.executeSql(executeQuery, [this_venue, this_address, this_gps, this_location, this_category, this_sub_category, this_short_info, this_info, this_imgbase64, this_infoID]
            , function(tx, result) {
            
                 //var len = result.rows.length;
                 affected = result.rowsAffected;
                 $("#myconsole").append("<p>Updated..:" + this_venue + " (affected="+affected+"</p>");
                
                 if (affected==2)
                  $("#myconsole").append("<p>Nice one but in the loop</p>");
 
                 if (affected==0)
                    saveNewtoDB(affected, this_infoID);
                
                  
            },
            function(error){
                 alert('Error occurred: '+this_venue+ " "); 
            });
            
           
            
    });   // end of myDB.transaction
      
      $("#myconsole").append("<p>Outside loop..:" + this_venue + " (affected="+affected+"</p>");
                
            
      if (affected==2)
           $("#myconsole").append("<p>Nice one</p>");

        
         if (affected<1)
                  {
                  
                  
                  myDB.transaction(function(transaction) {
                  
                  
                  $("#myconsole").append("<p>Did not update as does not exist:" + this_venue + " (aff="+affected+"</p>");
                  
                  var executeQuery = "INSERT INTO phonegap_pro (infoID, venue, address, gps, location, category, sub_category, short_info, info, imgbase64) VALUES (?,?,?,?,?,?,?,?,?,?)"; 
                  
                  transaction.executeSql(executeQuery, [this_venue, this_address, this_gps, this_location, this_category, this_sub_category, this_short_info, this_info, this_imgbase64, this_infoID]
            , function(tx2, result2) {
            
                 var len = result2.rows.length;
                 //var affected = result.rowsAffected;
                 $("#myconsole").append("<p>Inserted:" + this_venue + " (rows="+len+")</p>");
                 },
            function(error2){
                 alert('Error occurred inserting: '+this_venue+ " "); 
                     });
                  
                });    
                  
                  }    // end of insert condition
       






             
     
}  
 

function saveNewtoDB(affected, this_infoID)
{
$("#myconsole").append("<p>saveNewtoDB:" + this_infoID + "</p>");
}


function display_table(display_infoID)
{

var display_this_infoID= display_infoID;

alert("Going to show infoID="+display_this_infoID);
           
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
     
            
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
                 $("#TableData").append("</td><td>**"+results.rows.item(i).venue+"<br>"+results.rows.item(i).short_info+"</td></tr>"); 
                 
                    //$("#TableData").append(image+"<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
                    
                 }
              }, null);



 });
          
}// end of display this infoID


function getLastUpdatetime()

{

var dfrd7 = $.Deferred();

$("#myconsole").append("<p>Inside getLastUpdatetime()</p>");
           
           
         
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
     
            
            transaction.executeSql('SELECT * FROM last_update_table', [], function (tx, results) { 
            
            
            
            $("#myconsole").append("<p>Inside the getLastUpdatetime transaction</p>");
            
            
                 var len = results.rows.length, i;
                 $("#rowCount").html(len);
                 for (i = 0; i < len; i++){
                 
                 timeOfLastUpdate = results.rows.item(i).time_of_last_update; 
                                                              
                 $("#myconsole").append("getLastUpdatetime loop: "+ results.rows.item(i).time_of_last_update); 
                 
                  
                 }
                 dfrd7.resolve();  
              }, null);

             

 });       

return dfrd7.promise();
}



 function display_last_update_table()
{

alert("Going to show last update table");
           
           
         
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
     
            
            transaction.executeSql('SELECT * FROM last_update_table', [], function (tx, results) { 
            
            
            $("#myconsole").append("Inside the last_update_table transaction");
            
            
                 var len = results.rows.length, i;
                 $("#rowCount").html(len);
                 for (i = 0; i < len; i++){
                                                              
                 $("#TableData").append("<tr><td>id:"+results.rows.item(i).id+" item:"+ results.rows.item(i).time_of_last_update); 
                 
                // $("#TableData").append("</td><td>"+results.rows.item(i).id+"<br>"+results.rows.item(i).time_of_last_update); 
                 $("#TableData").append("</td></tr>");
                 
                    //$("#TableData").append(image+"<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
                    
                 }
              }, null);



 });           
          
}// end of display this infoID










var myDB;

var title_string;
var title_array;
var objlength;
var proc_array =[];
var resulty=[];

function getPROC_new()

{

var dfrd3 = $.Deferred();
    
        
        var url="http://www.peoplesrepublicofcork.com/eventguide/mobile/apps/json_visitcork.php?limit=15";

        var jsonPromise = $.getJSON(url);
        
        jsonPromise.done(function(data) {
        console.log('jsonPromise is done!'+ data[1].venue);
        $("#myconsole").append('<br>jsonPromise is done!'+ data[1].venue);
        
        console.log(data);
        console.log('task 1 in getPROC is done!');
        
        proc_array = $.map(data, function(value, index) {
        return [value];
            });
        
        dfrd3.resolve();
         });
      

    return dfrd3.promise();



}


function getPROC ()

{ 

var url="http://www.peoplesrepublicofcork.com/eventguide/mobile/apps/json_visitcork.php?limit=150";

status_bar(1);


    
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


    // end of GET.JSON
 

 }).then(function() {
  status_bar(0);
});   
  




// Q: can I do a db insert here? 
// A: No, it has to be inside the JSON function for some reason.....
// because the code executes before the JSON response is finished (FFS! - asyncronise bs!)



} // end of PROC function 




var networkState;



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

    //alert('Connection type: ' + states[networkState]);
    
    // if we are connected then 
    
    return networkState;
 
    
}



function function1(){
    var dfrd1 = $.Deferred();
    var dfrd2= $.Deferred();

    setTimeout(function(){
        // doing async stuff
        
        networkState = navigator.connection.type;

   

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
    
        //alert('Connection type: ' + states[networkState]);
        
        // if we are connected then 
        
        
        
        
        $("#myconsole").append('task 1 in function1 is done!' + networkState);
        dfrd1.resolve();
    }, 1000);

    setTimeout(function(){
        // doing more async stuff
        
        $("#myconsole").append('task 2 in function1 is done!');
        dfrd2.resolve();
    }, 750);
    
    
    
    

    return $.when(dfrd1, dfrd2).done(function(){
        $("#myconsole").append('both tasks in function1 are done');
        // Both asyncs tasks are done
    }).promise();
}



function function3(){
    
    
    var dfrd3 = $.Deferred();
    
        
        var url="http://www.peoplesrepublicofcork.com/eventguide/mobile/apps/json_visitcork.php?limit=15&lastUpdate="+timeOfLastUpdate;

        $("#myconsole").append('<p>timeOfLastUpdate='+timeOfLastUpdate+' AND url='+url+'</p>');

        var jsonPromise = $.getJSON(url);
        
        jsonPromise.done(function(data) {
        console.log('jsonPromise is done!'+ data[1].venue);
        $("#myconsole").append('<p>jsonPromise is done! '+ data[1].venue + '</p>');
        
        
        proc_array = $.map(data, function(value, index) {
        return [value];
            });
        
        dfrd3.resolve();
         });
      

    return dfrd3.promise();

}






var last_update_table_exists = "";

function function2()                // check if last_update_table exists
{
  var dfrd3 = $.Deferred();
    setTimeout(function(){
        
          myDB.transaction(function(transaction) {
          
          transaction.executeSql('SELECT name FROM sqlite_master WHERE type=?', ['table'], function (tx, results) { 
       
                 var len = results.rows.length, i;
                 $("#myconsole").append('len='+len);
                 for (i = 0; i < len; i++){
             
                 var this_string = results.rows.item(i).name;
                 var this_table = 'last_update_table';
                 
                 $("#myconsole").append('<br>Table result: ' + results.rows.item(i).name);
                 
                 if(this_string.localeCompare(this_table)==0)
                    {
                    last_update_table_exists = 1;
                    $("#myconsole").append('<br>Last Update table exists: ' + last_update_table_exists);
                    }
                    else
                    {
                    $("#myconsole").append('<p>Last Update table does not exists: ' + last_update_table_exists);
                   
                   // if the last_update_table doesnt exist we need to create it
                    }
                   
                    
                    
                    
                 }  // end of for loop
                
                
               // if the table does exist then we need to check the last time it was updated 
                
               // this function needs to be like function1 in the example where two tasks need to be completed BEFORE the promise gets returned 
                
                
                
                
                
                
                 $("#myconsole").append('Task Wan (1) in function2 is done!');
              dfrd3.resolve(); 
                 
              }, null);
              
             
              
            });
                 
        
        
        
        
        
        
    }, 100);
    return dfrd3.promise();

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
          transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, infoID integer, venue text, address text, short_info text, gps text, location integer, category integer, sub_category integer, info blob, imgbase64 blob)', [],
              function(tx, result) {
                  alert("New phonegap_pro table created successfully");
              }, 
              function(error) {
                    alert("Error occurred while creating the table.");
              });
              
              
              
          });
          
      
      
         /*
          myDB.transaction(function(transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, venue text, imgbase64 blob)', [],
              function(tx, result) {
                  alert("Table created successfully");
              }, 
              function(error) {
                    alert("Error occurred while creating the table.");
              });
          });
          
          */
          
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
                 //$("#TableData").append(image);
                 $("#TableData").append("</td><td><a href='javascript: void(0);' onClick='display_table("+results.rows.item(i).infoID+");'>"+results.rows.item(i).venue+"</a> (" + results.rows.item(i).gps+")</td><td>"+results.rows.item(i).category+"</td></tr>"); 
                 
                    //$("#TableData").append(image+"<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
                    
                 }
              }, null);
            });
            
            
          });
                
                
                
                
                
      
      
$("#showLastUpdateTable").click(function(){
          
            display_last_update_table();
         
                    
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
    
    
    
           $("#DropTableLastUpdate").click(function(){
           
           alert("dropping the table");
              
          myDB.transaction(function(transaction) {
              var executeQuery = "DROP TABLE  IF EXISTS last_update_table";
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
     
        var executeQuery = "INSERT INTO phonegap_pro (venue, address, imgbase64) VALUES (?,?,?)";             
        transaction.executeSql(executeQuery, [this_title, this_address, this_imgbase64]
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
    //alert("Device is Ready time = " +seconds);    
    
    $("#myconsole").append("Device is Ready time = " +seconds);

if (checkConnection() == "none" ) {
        connectionStatus = 'offline'; 
    } 
    
    
else {
        connectionStatus = 'online';
        
        $("#myconsole").append('<br>Status: ('+ connectionStatus+')<br>');

        // get todays date
        
        
        //alert("going to getPROC now");

        //getPROC();
        
        
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
  


$(function(){
    function1().done(function(){
    
    
        // function1 is done, we can now call function2
        $("#myconsole").append('<br>function 1 is done ('+ networkState+')<br>');

        function2().done(function(){    // checks if last_update_table exists
            //function2 is done
            $("#myconsole").append('function2 is deanta! last_update_table_exists=' + last_update_table_exists);
            
            // if last_update_table is not = 1
            // then create the table
            
            if (last_update_table_exists==1)
            {
            // get the last time the database was updated. 
            
            
            
            }
            else
            {
            $("#myconsole").append('<p>Table does not exist. Must create!</p>');
            createLastUpdateTable();
            insertLastUpdateTime();
            
            $("#myconsole").append('<p>Created table function is finished</p>');
            
            
              
           
            
            }
           
            
          getLastUpdatetime().done(function(){    // get time of the last update from Sqlite
            
            $("#myconsole").append('<p>getLastUpdatetime() is done.</p>');
            
           
            
                     function3().done(function(){      // do the JSON call with the time of the last update  
                     
                     $("#myconsole").append('<p>JSON is Done.</p>');
                     
                         proc_array.forEach(saveToDb); 
                         
                     
                     // after JSON is done insert the latest update time into last_update_table
                     
                              updateLastUpdateTime().done(function(){
                             
                             display_last_update_table(); 
                             
                             $("#myconsole").append('<p>updateLastUpdateTime() done. Finished everything.</p>');
                             
                              
                             
                            
                              
                               });    // end of function
                      
                       });    // end of function
            
         });   // end of function3    
            
            
        });
    });
});

       }



var lastUpdate;

// this is where I finished on Fri 10th March.
// Absolute frustration because the code here isnt waiting for
// getLastUpdateTime() to return the last time the db was updated.
// its just returned undefined because its not fucking waiting!!

// check the code in test.html which might help resolve this
// but best to try to mimic the dB call with a timeout func first
// instead of continualy compiling. 

/*
lastUpdate = function(timeSuccess, getLastUpdateTime()).then(function() {
      alert("then.done");
    });
*/



//alert("Time is now " + lastUpdate);  












}  // end of onDeviceReady



function test(i)

  {
  var somearray = ['Apple', 'Banana'];
  
  i=i+5;
  alert("test func i="+i)
  return somearray;  
  }