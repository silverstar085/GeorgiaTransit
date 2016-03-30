function myFunction(t){var e,n=JSON.parse(t),r="<table>";for(e=0;e<n.length;e++)r+="<tr><th>Bus Number:</th><td>"+n[e].VEHICLE+"</td><th>Direction:</th><td>"+n[e].DIRECTION+"</td><th>ROUTE:</th><td>"+n[e].ROUTE+"</td><th>Bus Stop:</th><td>"+n[e].TIMEPOINT+"</td><th>Block ID:</th><td>"+n[e].BLOCKID+"</td><th>Time Difference:</th><td>"+n[e].ADHERENCE+" minutes</td><th>MSGTIME:</th><td>"+n[e].MSGTIME+"</td></tr>";r+="</table>",document.getElementById("id01").innerHTML=r;var o=idb.open("database",19,function(t){var r=t.createObjectStore("BUS",{keyPath:"VEHICLE"});for(r.createIndex("BusStationName","TIMEPOINT",{unique:!1}),e=0;e<n.length;e++)r.put(n[e])});o.onsucess=function(t){var e=t.transaction("BUS","readwrite"),r=e.objectStore("BUS");n.forEach(function(t){r.put(t)})}}!function(){function t(t){return Array.prototype.slice.call(t)}function e(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function n(t,n,r){var o,i=new Promise(function(i,u){o=t[n].apply(t,r),e(o).then(i,u)});return i.request=o,i}function r(t,e,r){var o=n(t,e,r);return o.then(function(t){return t?new a(t,o.request):void 0})}function o(t,e,n){n.forEach(function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]}})})}function i(t,e,r,o){o.forEach(function(o){o in r.prototype&&(t.prototype[o]=function(){return n(this[e],o,arguments)})})}function u(t,e,n,r){r.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})})}function c(t,e,n,o){o.forEach(function(o){o in n.prototype&&(t.prototype[o]=function(){return r(this[e],o,arguments)})})}function s(t){this._index=t}function a(t,e){this._cursor=t,this._request=e}function d(t){this._store=t}function p(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)}})}function h(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new p(n)}function f(t){this._db=t}o(s,"_index",["name","keyPath","multiEntry","unique"]),i(s,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(s,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(a,"_cursor",["direction","key","primaryKey","value"]),i(a,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(a.prototype[t]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,r),e(n._request).then(function(t){return t?new a(t,n._request):void 0})})})}),d.prototype.createIndex=function(){return new s(this._store.createIndex.apply(this._store,arguments))},d.prototype.index=function(){return new s(this._store.index.apply(this._store,arguments))},o(d,"_store",["name","keyPath","indexNames","autoIncrement"]),i(d,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getAllKeys","count"]),c(d,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),u(d,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new d(this._tx.objectStore.apply(this._tx,arguments))},o(p,"_tx",["objectStoreNames","mode"]),u(p,"_tx",IDBTransaction,["abort"]),h.prototype.createObjectStore=function(){return new d(this._db.createObjectStore.apply(this._db,arguments))},o(h,"_db",["name","version","objectStoreNames"]),u(h,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},o(f,"_db",["name","version","objectStoreNames"]),u(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[d,s].forEach(function(n){n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],o=(this._store||this._index)[e].apply(this._store,n.slice(0,-1));o.onsuccess=function(){r(o.result)}}})}),[s,d].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise(function(o){n.iterateCursor(t,function(t){return t?(r.push(t.value),void 0!==e&&r.length==e?void o(r):void t["continue"]()):void o(r)})})})});var l={open:function(t,e,r){var o=n(indexedDB,"open",[t,e]),i=o.request;return i.onupgradeneeded=function(t){r&&r(new h(i.result,t.oldVersion,i.transaction))},o.then(function(t){return new f(t)})},"delete":function(t){return n(indexedDB,"deleteDatabase",[t])}};"undefined"!=typeof module?module.exports=l:self.idb=l}();var currentdate=new Date,datetime="Last updated on: "+currentdate.getDate()+"/"+(currentdate.getMonth()+1)+"/"+currentdate.getFullYear()+" at "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds();document.getElementById("time").innerHTML=datetime;var xmlhttp=new XMLHttpRequest,url="https://jsonp.afeld.me/?url=http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus";"withCredentials"in xmlhttp&&(xmlhttp.open("GET",url,!0),xmlhttp.onreadystatechange=function(){4==xmlhttp.readyState&&200==xmlhttp.status&&myFunction(xmlhttp.responseText)},xmlhttp.send()),$(document).ready(function(){$("#id01").hide(),$("#filter").keyup(function(){var t=$(this).val(),e=0;$(".search tr").each(function(){$(this).text().search(new RegExp(t,"i"))<0?$(this).fadeOut():($(this).show(),e++)});$("#filter-count").text("Number of Buses = "+e)})}),$(document).ready(function(){$("#search").click(function(){$("#id01").show()})}),$(document).ready(function(){$(".button-collapse").sideNav()});