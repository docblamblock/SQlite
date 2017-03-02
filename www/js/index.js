

var cars = ["Saab", "Volvo", "BMW"];




$("#listview").append("<p>Something</p>");


 var url="http://www.kiosks.ie/poc_json.php";


var title_string;
var title_array;
var objlength;
var proc_array;



    
$.getJSON(url,function(result){
 console.log(result);
 
             
     $.each(result, function(i, field){
     
     var title      = field.title;
     var desc = field.date_added;
     
    
     
     
     $("#listview").append(i+" : "+title+" (" + desc+")");
     });
     


objlength = Object.keys(result).length;     // get number of elements
//alert("objlength="+objlength);


proc_array = $.map(result, function(value, index) {
    return [value];
            });


console.log(proc_array);



/* 
------------------------------------------------------------
------------------ on document ready -------------------------
------------------------------------------------------------
 */


$(document).ready(function(){

//alert("document ready->" + proc_array[1].title );   // this works here on line 68
 

 
 
 

var something = "4"; 

alert("this thing->" + something ); 

//alert("inside device ready->" + proc_array[1].title );      // is the device ready before the document is ready??

//alert(JSON.stringify(result, null, 4));
 




alert("Outside all functions: cars-0"+proc_array[2].title);
//Open Database Connection



var something = "3";







/* 
------------------------------------------------------------
------------------ on device ready -------------------------
------------------------------------------------------------
 */




var myDB;


//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){

 alert("inside deviceReady. something from outside = " +something);     // this works. you can take a variable from just above this and display it above.
                                                       // but it wont take the array proc_array because it hasnt been created
 
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});

}



/* 
-------------------------------------------------------------------
----------------- / end of device ready ---------------------------
-------------------------------------------------------------------
 */  




//Create new table
$("#createTable").click(function(){
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



//insert new data

var something = "sumit";

//Insert New Data
$("#insert").click(function(){
 
 
 //var title=proc_array[1].title;
  var desc="blahdeblah"; 
    
 alert("insert:"+proc_array[1].title+" length:"+objlength);
 
   for (i = 0; i < objlength; i++){
   
   title = proc_array[i].title;
   desc = proc_array[i].cname;
   
   $("#titlestring").append(", "+title+" - " + desc);
   
     myDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO phonegap_pro (title, desc) VALUES (?,?)";             
        transaction.executeSql(executeQuery, [title,desc]
            , function(tx, result) {
                 alert('Inserted');
            },
            function(error){
                 alert('Error occurred'); 
            });
    });
   
   
   
   }
  
  
  
  
 

   

 
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

//Delete Data from Database
$(document.body).on('click', '.delete' ,function(){
  var id=this.id;
  myDB.transaction(function(transaction) {
    var executeQuery = "DELETE FROM phonegap_pro where id=?";
    transaction.executeSql(executeQuery, [id],
      //On Success
      function(tx, result) {alert('Delete successfully');},
      //On Error
      function(error){alert('Something went Wrong');});
  });
});


//Delete Tables
$("#update").click(function(){
  var id=$("#id").text();
  var title=$("#title").val();
  var desc=$("#desc").val()
  myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE phonegap_pro SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
      //On Success
      function(tx, result) {alert('Updated successfully');},
      //On Error
      function(error){alert('Something went Wrong');});
  });
});

$("#DropTable").click(function(){
    myDB.transaction(function(transaction) {
        var executeQuery = "DROP TABLE  IF EXISTS phonegap_pro";
        transaction.executeSql(executeQuery, [],
            function(tx, result) {alert('Table deleted successfully.');},
            function(error){alert('Error occurred while droping the table.');}
        );
    });
});


 });    // end of document.ready

          });    // end of GET.JSON