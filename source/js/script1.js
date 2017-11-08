 $(document).ready(function() 
        {
	      $(".button-collapse").sideNav();
        });
        
//________________

var xmlhttp = new XMLHttpRequest();
var url = "https://cors.io/?http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=9b3fd45f-5b07-481c-8b3a-74b5e987d7fd";
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
function myFunction(response) {
    var arr = JSON.parse(response);
    var i;
    var out = "<table>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><th>Train ID:</th><td>" + 
        arr[i].TRAIN_ID +
        "</td><th>Destination:</th><td>" +
        arr[i].DESTINATION +
        "</td><th>Line:</th><td>" +
        arr[i].LINE +
        "</td><th>Station:</th><td>" +
        arr[i].STATION +
        "</td><th>Waiting time:</th><td>" +
        arr[i].WAITING_TIME +
        "</td><th>Direction:</th><td>" +
        arr[i].DIRECTION +
        "</td><th>Event Time:</th><td>" +
        arr[i].EVENT_TIME +
        "</td></tr>";
        
    }
    out += "</table>";
    document.getElementById("id01").innerHTML = out;
    
    var dbPromise = idb.open('tdatabase', 8, function(upgradeDb)
    {
        var keyValStore = upgradeDb.createObjectStore('TRAIN', 
        {
            keyPath: 'WAITING_SECONDS',
            autoIncrement: false
        });
        
        keyValStore.createIndex('StationName', 'STATION', {unique:false, multientry:true})
        
        for(i=0; i<arr.length; i++)
        {
               keyValStore.put(arr[i]); 
        }
    });
    dbPromise.onsucess = (function(db)
    {
    var tx = db.transaction('TRAIN', 'readwrite');
    var store = tx.objectStore('TRAIN');
    arr.forEach(function(message)
    {
       store.put(message); 
    });
});
}
//_________________

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
        $("#filter-count").text("Number of Trains = "+count);
        
    });
     
});   

//_____________________

$(document).ready(function(){
        $( "#search" ).click(function() {
        $('#id01').show();
        });
        });
//______________________
