

// 1. put JSON call in a function of its own and call it when document is loaded or when device has loaded - DONE
// 2. check if we are online or offline 



//$("#listview").append("<p>Something</p>");


function nothing()

{

}

    
demoP = document.getElementById("demo");

var count; 
count = 0;

   function saveToDb(item, index) {
    
    demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item.title + "<br>";
    
    //alert("index:"+index+" item:"+item.title);
    
    
    var sqltitle = item.title;
    var sqldesc = item.data_added;
    
   
       myDB.transaction(function(transaction) {
     
        var executeQuery = "INSERT INTO phonegap_pro (title, desc) VALUES (?,?)";             
        
        transaction.executeSql(executeQuery, [sqltitle,sqldesc]
            , function(tx, result) {
                 count +=1;//alert('Inserted: '+sqltitle);
            },
            function(error){
                 //alert('Error occurred: '+sqltitle); 
            });
            
           
            
                               });   // end of myDB.transaction
         
       
    
     alert('Rows: inserted: '+count);
    
    
    
    
     
}  
 


var myDB;

var title_string;
var title_array;
var objlength;
var proc_array =[];
var resulty=[];




function getPROC ()

{ 

 var url="http://www.kiosks.ie/poc_json.php";




    
$.getJSON(url,function(resulty){
 console.log(resulty);
 
             
     $.each(resulty, function(i, field){
     
     var title      = field.title;
     var desc = field.date_added;
     
    
     
     
     //$("#listview").append(i+" : "+title+" (" + desc+")");
     });
     


objlength = Object.keys(resulty).length;     // get number of elements
//alert("objlength="+objlength);


proc_array = $.map(resulty, function(value, index) {
    return [value];
            });


console.log(proc_array);


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
          transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, title text, desc text)', [],
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
            $("#TableData").html("");
            myDB.transaction(function(transaction) {
            transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
                 var len = results.rows.length, i;
                 $("#rowCount").html(len);
                 for (i = 0; i < len; i++){
                    $("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
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
  
   
   /*
   for (i = 0; i < 10; i++){
   
   title = proc_array[i].title;
   desc = proc_array[i].cname;
   
   $("#titlestring").append("<br>("+i+") "+title+" - " + desc);
     


     /*
     myDB.transaction(function(transaction) {
     
        var executeQuery = "INSERT INTO phonegap_pro (title, desc) VALUES (?,?)";             
        transaction.executeSql(executeQuery, [title,desc]
            , function(tx, result) {
                 alert('Inserted: '+title);
            },
            function(error){
                 alert('Error occurred: '+title); 
            });
            
           
            
    });   // end of myDB.transaction
        */
        
        
        
        
            //}    // end of loop
            
 
 
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




      
  