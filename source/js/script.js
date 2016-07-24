    var currentdate = new Date(); 
    var datetime = "Last updated on: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
document.getElementById("time").innerHTML = datetime;

//____________________________

var xmlhttp = new XMLHttpRequest();
var url = "https://crossorigin.me/http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus";
if('withCredentials' in xmlhttp)
{    
xmlhttp.open("GET", url, true);  
xmlhttp.onreadystatechange=function() 
{
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.send();
}
//Help take from W3c
function myFunction(response) 
    {
    var arr = JSON.parse(response);
    var i;
    var out = "<table>";
    for(i = 0; i < arr.length; i++) 
    {
        out += "<tr><th>Bus Number:</th><td>" + 
        arr[i].VEHICLE +
        "</td><th>Direction:</th><td>" +
        arr[i].DIRECTION +
        "</td><th>ROUTE:</th><td>" +
        arr[i].ROUTE +
        "</td><th>Bus Stop:</th><td>" +
        arr[i].TIMEPOINT +
        "</td><th>Block ID:</th><td>" +
        arr[i].BLOCKID +
        "</td><th>Time Difference:</th><td>" +
        arr[i].ADHERENCE + " minutes" +
        "</td><th>MSGTIME:</th><td>" +
        arr[i].MSGTIME +
        "</td></tr>";      
    }
    out += "</table>";
    document.getElementById("id01").innerHTML = out;
    
    var dbPromise = idb.open('database', 19, function(upgradeDb)
    {
        var keyValStore = upgradeDb.createObjectStore('BUS', 
        {
            keyPath: 'VEHICLE'
        });
        
        keyValStore.createIndex('BusStationName', 'TIMEPOINT', {unique:false})
        
        for(i=0; i<arr.length; i++)
        {
               keyValStore.put(arr[i]); 
        }
    });
    dbPromise.onsucess = (function(db)
    {
    var tx = db.transaction('BUS', 'readwrite');
    var store = tx.objectStore('BUS');
    arr.forEach(function(message)
    {
       store.put(message); 
    });
});
}
//_________________________

$(document).ready(function(){
     $('#id01').hide();
    $("#filter").keyup(function(){
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
        
        // Loop through the comment list
        $(".search tr").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        $("#filter-count").text("Number of Buses = "+count);
             
    });
     
});   
//____________________

$(document).ready(function(){
        $( "#search" ).click(function() {
        $('#id01').show();
         });
         });
//_____________________

 $(document).ready(function() 
        {
	      $(".button-collapse").sideNav();
        });
        
